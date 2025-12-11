import {
    DeleteObjectCommand,
    GetObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import { s3 } from "../../connections/aws";
import mongoClient from "../../connections/mongo";
import { envVariables, jwtProtectedRoute } from "../../globals";
import { createPutObjectCommand, optimizeImage } from "../../utils";
import { IBackendSong, IBackendUser } from "../types";

const SongRouter = express.Router();
const multerMemStorage = multer.memoryStorage();
const multerMemStorageInstance = multer({ storage: multerMemStorage });
const songUploadMiddleWare = multerMemStorageInstance.fields([
    { name: "image", maxCount: 1 }, 
    { name: "audio", maxCount: 1 }
])

// ========================================
// Get Songs
// ========================================
SongRouter.get("/all", async(req, res) => {
    const collection = mongoClient.collection<IBackendSong>("song");
    const query = req.query;
    let data = "search" in req.query 
        ? await collection.find({ title: { $regex: `^${query.search}`, $options: "i" } }).toArray()
        : await collection.find({}).toArray();

    for(const song of data as IBackendSong[]) {
        const command = new GetObjectCommand({ Bucket: envVariables.awsBucketName, Key: song.image });
        song.image = await getSignedUrl(s3, command);
    }

    res.status(200).send(data);
});

SongRouter.get("/favorites", jwtProtectedRoute, async(req, res) => {
    const authUser = (req as any).auth as IBackendUser;
    const songCollection = mongoClient.collection<IBackendSong>("song");
    const user = await mongoClient.collection<IBackendUser>("user")
        .findOne({ username: authUser.username }) as IBackendUser;

    const ids: ObjectId[] = user.favorites.map(x => new ObjectId(x));
    const query = req.query;
    let data = "search" in req.query 
        ? await songCollection.find({ _id: { $in: ids },  title: { $regex: `^${query.search}`, $options: "i" } }).toArray()
        : await songCollection.find({ _id: { $in: ids }}).toArray();

    for(const song of data as IBackendSong[]) {
        const command = new GetObjectCommand({ Bucket: envVariables.awsBucketName, Key: song.image });
        song.image = await getSignedUrl(s3, command);
    }

    res.status(200).send(data);
});


// ========================================
// Get/Delete Song
// ========================================
SongRouter.get("/song/:id", async(req, res) => {
    const { id } = req.params as { id: string };
    if(!ObjectId.isValid(id))
        return res.status(400).send({ error: `Song with id of <${id}> is invalid` });

    const song = await mongoClient.collection<IBackendSong>("song")
        .findOne({ _id: new ObjectId(id) });

    if(!song)
        return res.status(404).send({ error: `Song with id of <${id}> not found` });

    const imageCommand = new GetObjectCommand({ Bucket: envVariables.awsBucketName, Key: song.image });
    const audioCommand = new GetObjectCommand({ Bucket: envVariables.awsBucketName, Key: song.audio });
    song.image = await getSignedUrl(s3, imageCommand);
    song.audio = await getSignedUrl(s3, audioCommand);

    res.status(200).send(song);
});

SongRouter.delete("/:id", jwtProtectedRoute, async(req, res) => {
    const { id } = req.params as { id: string };
    if(!ObjectId.isValid(id))
        return res.status(400).send({ error: `<${id}> is not a valid id` });

    const song = await mongoClient.collection<IBackendSong>("song")
        .findOneAndDelete({ _id: new ObjectId(id) })!;

    if(!song)
        return res.status(404).send({ "message": `Song with id of <${id}> not found` });

    const imageCommand = new DeleteObjectCommand({ Bucket: envVariables.awsBucketName, Key: song.image });
    const audioCommand = new DeleteObjectCommand({ Bucket: envVariables.awsBucketName, Key: song.audio });
    await s3.send(imageCommand);
    await s3.send(audioCommand);

    res.status(200).send({ tok: true });
});


// ========================================
// Edit/Post Song
// ========================================
SongRouter.post("/upload", jwtProtectedRoute, songUploadMiddleWare, async(req, res) => {
    const collection = mongoClient.collection<IBackendSong>("song");

    try {
        const data: IBackendSong = { ...req.body };
        if(!(req.files && "image" in req.files && "audio" in req.files))
            throw new Error("Missing files");

        const imageBuffer = await optimizeImage(req.files.image[0].buffer)
        const [imageCommand, imageKey] = createPutObjectCommand(
            imageBuffer, 
            envVariables.awsSongImageBucketName, 
            req.files.image[0]
        );
        const [audioCommand, audioKey] = createPutObjectCommand(
            req.files.audio[0].buffer, 
            envVariables.awsSongAudioBucketName, 
            req.files.audio[0]
        );

        await s3.send(imageCommand);
        await s3.send(audioCommand);

        data["image"] = imageKey;
        data["audio"] = audioKey;
        data.createdAt = new Date();

        const song = await collection.insertOne(data);
        res.status(200).send({ insertedId: song.insertedId, ok: true });
    } catch(err: any) {
        res.status(400).send({ error: err.message });
    }
});

SongRouter.put("/edit/:id", jwtProtectedRoute, songUploadMiddleWare, async(req, res) => {
    const { id } = req.params as { id: string };
    if(!ObjectId.isValid(id))
        return res.status(400).send({ error: `<${id}> is not a valid id` });

    const collection = mongoClient.collection<IBackendSong>("song");
    const song = await collection.findOne({ _id: new ObjectId(id) });

    if(!song)
        return res.status(404).send({ "message": `Song with id of <${id}> not found` });
        
    try {
        const data = { ...req.body };
        if(req.files && "image" in req.files) {
            const imageBuffer = await optimizeImage(req.files.image[0].buffer);
            const [imageCommand, imageKey] = createPutObjectCommand(
                imageBuffer, 
                envVariables.awsSongImageBucketName, 
                req.files.image[0]
            );
            
            data["image"] = imageKey;
            await s3.send(imageCommand);
        };

        if(req.files && "audio" in req.files) {
            const [audioCommand, audioKey] = createPutObjectCommand(
                req.files.audio[0].buffer, 
                envVariables.awsSongAudioBucketName, 
                req.files.audio[0]
            );
    
            data["audio"] = audioKey;
            await s3.send(audioCommand);
        };


        await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
        res.status(200).send({ ok: true });
    } catch(err: any) {
        res.status(400).send({ message: err.message });
    }
});

export default SongRouter;
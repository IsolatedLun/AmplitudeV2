import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import morgan from "morgan";
import { s3 } from "./connections/aws";
import mongoClient from "./connections/mongo";
import SongRouter from "./routes/song/song";
import { IBackendSong, IBackendUser } from "./routes/types";
import UserRouter from "./routes/user/user";
import { createDeleteObjectCommand } from "./utils";

// ========================================
// Options
// ========================================
const FRONTEND_PORT = process.env.FRONTEND_PORT || 8000;
const PORT = process.env.PORT || 3000;
const app = express();
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5mins
    limit: 120, // 120 requests every 5mins
    standardHeaders: "draft-8",
    legacyHeaders: true,
    ipv6Subnet: 52
});

app.use(morgan("common"));
app.use(limiter);
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}));

// ========================================
// Routes
// ========================================
app.use("/songs", SongRouter);
app.use("/users", UserRouter);

app.delete("/reset", async(req, res) => {
    const userCollection = mongoClient.collection<IBackendUser>("user");
    const songCollection = mongoClient.collection<IBackendSong>("song");

    const songs = await songCollection.find({}).toArray();
    for(const song of songs) {
        const [imageCommand, imageKey] = createDeleteObjectCommand(song.image);
        const [audioCommand, audioKey] = createDeleteObjectCommand(song.audio);

        await s3.send(imageCommand);
        await s3.send(audioCommand);
    }

    await userCollection.deleteMany({});
    await songCollection.deleteMany({});

    res.status(200).send({ ok: true });
});

app.listen(PORT, () => {
    console.log(`[Ampl] Server started listening on http://localhost:${PORT}`);
});
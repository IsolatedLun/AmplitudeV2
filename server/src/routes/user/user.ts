import bcrypt from "bcrypt";
import express from "express";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import mongoClient from "../../connections/mongo";
import { envVariables, jwtProtectedRoute } from "../../globals";
import { IBackendUser } from "../types";
import { editUserValidationSchema, loginValidationSchema, signUpValidationSchema } from "./schemas";

const UserRouter = express.Router();
const saltRounds = 10;

UserRouter.get("/", async(req, res) => {
    const userList = await mongoClient.collection<IBackendUser>("user")
        .find({}).project({ password: 0 }).toArray();

    res.status(200).send(userList);
});

// ========================================
// Verify/Login/Signup/Edit/Logout
// ========================================
UserRouter.post("/verify", jwtProtectedRoute, async(req, res) => {
    res.status(200).send({ user: (req as any).auth });
})

UserRouter.post("/login", async(req, res) => {
    const { value, error } = loginValidationSchema.validate(req.body);
    if(error) return res.status(400).send({ error: error.message });
    
    const { username, password } = value;
    const user = await mongoClient.collection<IBackendUser>("user")
        .findOne({ username });
    
    if(!user)
        return res.status(400).json({ error: "Incorrect username/password" });

    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    if(!doPasswordsMatch) return res.status(400).send({ error: "Incorrect username/password" });

    const tok = jwt.sign(
        { username: user.username, password: user.password }, 
        envVariables.jwtSecretKey, 
        { expiresIn: "7d" }
    );
    res.status(200).send({ user, token: tok });

});

UserRouter.post("/signup", async(req, res) => {
    const { value, error } = signUpValidationSchema.validate(req.body);
    if(error) return res.status(400).send({ error: error.message });
    
    const collection = mongoClient.collection<IBackendUser>("user");
    const { username, password } = value;
    const user = await collection.findOne({ username });
    if(user)
        return res.status(400).send({ error: "Username already exists" });

    bcrypt.hash(password, saltRounds, async(err, hash) => {
        await collection.insertOne({ 
            _id: new ObjectId(), 
            username, 
            password: hash, 
            profile: "", 
            favorites: [], 
            createdAt: new Date()
        });
        res.status(200).send({ ok: true });
    });
});

UserRouter.put("/edit", jwtProtectedRoute,  async(req, res) => {
    const authUser: IBackendUser = (req as any).auth;
    const { value, error } = editUserValidationSchema.validate(req.body);
    if(error)
        return res.status(400).send({ error: error.message });
    
    const collection = mongoClient.collection<IBackendUser>("user");
    const { username, password } = value;
    const user = await collection.findOne({ username: authUser.username });
    if(!user)
        return res.status(404).send({ error: `User with username <${username}> not found` });

    if(authUser.username != username) {
        const existingUser = await collection.findOne({ username });
        if(existingUser)
            return res.status(400).send({ error: `User with username <${username}> already exists` });
    }

    bcrypt.hash(password, saltRounds, async(err, hash) => {
        await collection.updateOne(
            { _id: new ObjectId(user._id) },
            { $set: { username, password: hash } }
        );

        res.status(200).send({ ok: true });
    });
})

export default UserRouter;
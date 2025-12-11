import { ObjectId } from "mongodb";

export interface IBackendUser {
    _id: ObjectId,
    username: string,
    password: string,
    profile: string,
    favorites: string[]

    createdAt: Date
}

export interface IBackendSong {
    _id: ObjectId,
    title: string,
    author: string,
    audio: string,
    image: string,

    createdAt: Date
}
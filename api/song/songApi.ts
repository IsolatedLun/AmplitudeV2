import { SERVER_URL } from "@/globals";
import axios from "axios";
import { RGetSongById_Ok, RGetSongs_Ok } from "./types";

const SongApiInstance = axios.create({
    baseURL: SERVER_URL + "/songs"
});

export const SongApi_GetSongs = () => SongApiInstance.get<RGetSongs_Ok>("/");
export const SongApi_GetSongById = (id: string) => SongApiInstance.get<RGetSongById_Ok>(`/${id}`); 
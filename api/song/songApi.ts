import { SERVER_URL } from "@/globals";
import { createAuthHeader } from "@/utils/funcs";
import axios from "axios";
import { RDeleteSong_Ok, RGetSongById_Ok, RGetSongs_Ok } from "./types";

const SongApiInstance = axios.create({
    baseURL: SERVER_URL + "/songs"
});

export const SongApi_GetSongs = (tok: string) => SongApiInstance.get<RGetSongs_Ok>("/all", { headers: createAuthHeader(tok) });
export const SongApi_GetFavoriteSongs = (tok: string) => SongApiInstance.get<RGetSongs_Ok>("/favorites", { headers: createAuthHeader(tok) });
export const SongApi_GetSongById = (id: string) => SongApiInstance.get<RGetSongById_Ok>(`/song/${id}`);
export const SongApi_DeleteSong = (id: string, tok: string) => SongApiInstance.delete<RDeleteSong_Ok>(`/delete/${id}`, { headers: createAuthHeader(tok) });

export const SongApi_UploadSong = (data: FormData, tok: string) => fetch(
    SERVER_URL + "/songs/upload", 
    { method: "POST", body: data, headers: createAuthHeader(tok) }
);

export const SongApi_EditSong = (id: string, data: FormData, tok: string) => fetch(
    SERVER_URL + `/songs/edit/${id}`,
    { method: "POST", body: data, headers: createAuthHeader(tok) }
);
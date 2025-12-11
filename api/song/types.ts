import { IFrontendSongFull, IFrontendSongPreview, IResponse_Err } from "../types";

export type RGetSongs_Ok = IFrontendSongPreview[];
export type RGetSongs_Err = IResponse_Err;

export type RGetSongById_Ok = IFrontendSongFull;
export type RGetSongById_Err = IResponse_Err;
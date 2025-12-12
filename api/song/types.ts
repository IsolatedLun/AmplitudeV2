import * as Yup from "yup";
import { IFrontendSongFull, IFrontendSongPreview, IResponse_Err, IResponse_Ok } from "../types";
import { Yup_SongValidationSchema } from "./schemas";

export type TSongForm = Yup.InferType<typeof Yup_SongValidationSchema>;

export type RGetSongs_Ok = IFrontendSongPreview[];
export type RGetSongs_Err = IResponse_Err;

export type RGetSongById_Ok = IFrontendSongFull;
export type RGetSongById_Err = IResponse_Err;

export type RUploadSong_Ok = { insertedId: string } & IResponse_Ok;
export type RUploadSong_Err = IResponse_Err;

export type RDeleteSong_Ok = { deletedId: string } & IResponse_Ok;
export type RDeleteSong_Err = IResponse_Err;
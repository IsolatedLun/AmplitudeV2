import { S3Client } from "@aws-sdk/client-s3";

const ACCESS_KEY = process.env.ACCESS_KEY || "";
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || "";

export const BUCKET_NAME = process.env.BUCKET_NAME || "";
export const BUCKET_REGION = process.env.BUCKET_REGION || "";
export const SONG_IMAGE_FOLDER = process.env.SONG_IMAGE_FOLDER_PATH || "";
export const SONG_AUDIO_FOLDER = process.env.SONG_AUDIO_FOLDER_PATH || "";

export const s3 = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    },
});
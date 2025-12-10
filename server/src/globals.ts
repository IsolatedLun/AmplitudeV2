import { expressjwt } from "express-jwt";

export const envVariables = {
    mongoUri: process.env.MONGO_URI!,

    awsAccessKey: process.env.ACCESS_KEY!,
    awsSecretKey: process.env.SECRET_ACCESS_KEY!,
    awsBucketName: process.env.BUCKET_NAME!,
    awsBucketRegion: process.env.BUCKET_REGION!,
    awsSongImageBucketName: process.env.SONG_IMAGE_FOLDER_PATH!,
    awsSongAudioBucketName: process.env.SONG_AUDIO_FOLDER_PATH!,

    frontendPort: process.env.FRONTEND_PORT!,
    localIP: process.env.LOCAL_IP!,
    port: process.env.PORT!,

    jwtSecretKey: process.env.JWT_SECRET!
}

export const jwtProtectedRoute = expressjwt({ secret: envVariables.jwtSecretKey, algorithms: ["HS256"] });
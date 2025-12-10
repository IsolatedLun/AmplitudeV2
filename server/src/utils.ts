import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { BUCKET_NAME } from "./connections/aws";

export function generateUUID(): string {
    return crypto.randomUUID();
}

export function generateRandomUUID(bytes: number = 32): string {
    return crypto.randomUUID();
}

export function optimizeImage(buf: Buffer<ArrayBufferLike>): Promise<Buffer<ArrayBufferLike>> {
    return sharp(buf)
        .resize({ width: 1024, height: 1024, fit: "contain" })
        .jpeg()
        .toBuffer();
}

// ========================================
// AWS helpers
// ========================================
export function createPutObjectCommand(
        buf: Buffer<ArrayBufferLike>, 
        path: string, 
        file: any // Express.Multer.File
): [PutObjectCommand, string] {
    const key = path + generateRandomUUID();
    return [
        new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: buf,
            ContentType: file.mimetype,
        }),
        key
    ]
};

export function createDeleteObjectCommand(
        key: string, 
): [DeleteObjectCommand, string] {
    return [
        new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        }),
        key
    ]
};
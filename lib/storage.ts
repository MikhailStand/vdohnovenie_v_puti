import "server-only";
import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function storageConfig() {
  const endpoint = process.env.S3_ENDPOINT;
  const bucket = process.env.S3_BUCKET;
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL;
  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey || !publicBaseUrl) {
    throw new Error("S3 is not configured");
  }
  return { endpoint, bucket, accessKeyId, secretAccessKey, publicBaseUrl };
}

export async function uploadImage(file: File) {
  if (!allowedTypes.has(file.type)) throw new Error("UNSUPPORTED_IMAGE");
  if (file.size > 8 * 1024 * 1024) throw new Error("IMAGE_TOO_LARGE");
  const config = storageConfig();
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const key = `site/${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${extension}`;
  const client = new S3Client({
    endpoint: config.endpoint,
    region: process.env.S3_REGION || "ru-1",
    forcePathStyle: true,
    credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
  });
  await client.send(new PutObjectCommand({
    Bucket: config.bucket,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    CacheControl: "public, max-age=31536000, immutable",
  }));
  return `${config.publicBaseUrl.replace(/\/$/, "")}/${key}`;
}

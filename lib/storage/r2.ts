import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

let s3ClientInstance: S3Client | null = null;

function getBucketName(): string {
  return process.env.R2_BUCKET_NAME || "ieeebracu-media";
}

export function getS3Client(): S3Client {
  if (s3ClientInstance) return s3ClientInstance;

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "Missing Cloudflare R2 credentials. Please set CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY."
    );
  }

  s3ClientInstance = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return s3ClientInstance;
}

export async function putMedia(
  key: string,
  body: Uint8Array | Buffer,
  contentType: string
): Promise<void> {
  const s3 = getS3Client();
  const bucket = getBucketName();
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
}

export async function getMedia(key: string) {
  const s3 = getS3Client();
  const bucket = getBucketName();
  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
    return {
      body: response.Body,
      contentType: response.ContentType,
      etag: response.ETag,
      contentLength: response.ContentLength,
    };
  } catch (error: any) {
    if (error?.name === "NoSuchKey" || error?.$metadata?.httpStatusCode === 404) {
      return null;
    }
    throw error;
  }
}

export async function deleteMedia(key: string): Promise<void> {
  const s3 = getS3Client();
  const bucket = getBucketName();
  await s3.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );
}

export function getMediaUrl(key: string): string {
  const cleanKey = key.replace(/^\/+/, "");
  const publicBaseUrl = process.env.R2_PUBLIC_URL;
  if (publicBaseUrl) {
    return `${publicBaseUrl.replace(/\/+$/, "")}/${cleanKey}`;
  }
  return `/api/media/${cleanKey.split("/").map(encodeURIComponent).join("/")}`;
}

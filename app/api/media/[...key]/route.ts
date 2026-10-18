import { getMedia } from "@/lib/storage/r2";

interface MediaParams {
  params: Promise<{ key: string[] }>;
}

function getContentTypeFromExtension(filename: string): string | null {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "avif":
      return "image/avif";
    default:
      return null;
  }
}

export async function GET(
  request: Request,
  context: MediaParams
) {
  let objectKey = "";

  if (context?.params) {
    const resolvedParams = await context.params;
    const rawKey = resolvedParams?.key;
    if (Array.isArray(rawKey)) {
      objectKey = rawKey.map(decodeURIComponent).join("/");
    } else if (typeof rawKey === "string") {
      objectKey = decodeURIComponent(rawKey);
    }
  }

  // Fallback: extract directly from request pathname
  if (!objectKey) {
    const pathname = new URL(request.url).pathname;
    const prefix = "/api/media/";
    const idx = pathname.indexOf(prefix);
    if (idx !== -1) {
      objectKey = decodeURIComponent(pathname.slice(idx + prefix.length));
    }
  }

  // Strip leading slashes and any residual template tokens
  objectKey = objectKey
    .replace(/^\/+/, "")
    .replace(/\{\{IMAGE_BASE_URL\}\}\/?/gi, "")
    .replace(/%7B%7BIMAGE_BASE_URL%7D%7D\/?/gi, "");

  if (!objectKey) {
    return new Response("Image not found", { status: 404 });
  }

  // If a public R2 CDN / domain is configured, redirect directly to save Vercel bandwidth
  const publicBaseUrl = process.env.R2_PUBLIC_URL;
  if (publicBaseUrl) {
    const cleanUrl = `${publicBaseUrl.replace(/\/+$/, "")}/${objectKey}`;
    return Response.redirect(cleanUrl, 308);
  }

  const media = await getMedia(objectKey);

  if (!media || !media.body) {
    return new Response("Image not found", {
      status: 404,
    });
  }

  const headers = new Headers();

  if (media.etag) {
    headers.set("etag", media.etag);
  }

  if (media.contentLength) {
    headers.set("content-length", media.contentLength.toString());
  }

  const contentType =
    media.contentType ||
    getContentTypeFromExtension(objectKey) ||
    "application/octet-stream";

  headers.set("content-type", contentType);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  const stream =
    typeof (media.body as any).transformToWebStream === "function"
      ? (media.body as any).transformToWebStream()
      : (media.body as any);

  return new Response(stream, {
    headers,
  });
}
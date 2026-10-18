import { randomUUID } from "node:crypto";
import { auth } from "@/lib/auth";
import { putMedia, getMediaUrl } from "@/lib/storage/r2";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB

const SIGNATURES: Array<{ ext: string; mime: string; check: (b: Uint8Array) => boolean }> = [
  { ext: "png", mime: "image/png", check: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: "jpg", mime: "image/jpeg", check: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: "gif", mime: "image/gif", check: (b) => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 },
  {
    ext: "webp",
    mime: "image/webp",
    check: (b) =>
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
];

function sniff(bytes: Uint8Array) {
  return SIGNATURES.find((s) => s.check(bytes)) ?? null;
}

export async function POST(request: Request) {
  // 1. Auth check — reject anyone without a valid webmaster session.
  const session = await auth.api.getSession({ headers: request.headers });
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session?.user ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Basic shape checks before touching the bytes.
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BYTES) {
    return Response.json({ error: "File too large (max 5MB)" }, { status: 413 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_BYTES) {
    return Response.json({ error: "File too large or empty" }, { status: 413 });
  }

  // 3. Verify it's actually an image by magic bytes, not by trusting
  //    file.type or the filename extension.
  const buf = new Uint8Array(await file.arrayBuffer());
  const sig = sniff(buf.subarray(0, 16));
  if (!sig) {
    return Response.json({ error: "Unsupported or invalid image file" }, { status: 415 });
  }

  // 4. Generate the key ourselves — never trust a client-supplied path
  //    (path traversal, collisions, overwriting other posts' images).
  const key = `posts/content_images/${randomUUID()}.${sig.ext}`;

  await putMedia(key, buf, sig.mime);

  // App serves media via getMediaUrl(key)
  const url = getMediaUrl(key);

  return Response.json({ url, key });
}

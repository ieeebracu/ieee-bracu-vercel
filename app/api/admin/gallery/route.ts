import { randomUUID } from "node:crypto";
import { auth } from "@/lib/auth";
import { createGalleryPhoto, getGalleryPhotos, getGalleryFilterMeta } from "@/lib/gallery/queries";
import { putMedia, getMediaUrl } from "@/lib/storage/r2";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB limit for high-res gallery photos

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

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session?.user ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "50", 10);
  const year = url.searchParams.get("year") || "All";
  const category = url.searchParams.get("category") || "All";
  const search = url.searchParams.get("q") || "";

  const [{ items, total, hasMore }, meta] = await Promise.all([
    getGalleryPhotos({ page, limit, year, category, search }),
    getGalleryFilterMeta(),
  ]);

  return Response.json({
    items: items.map((p) => ({
      ...p,
      imageUrl: getMediaUrl(p.imageKey),
    })),
    total,
    page,
    limit,
    hasMore,
    years: meta.years,
    categories: meta.categories,
  });
}

export async function POST(request: Request) {
  // 1. Auth check
  const session = await auth.api.getSession({ headers: request.headers });
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session?.user ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Length check
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BYTES) {
    return Response.json({ error: "File too large (max 10MB)" }, { status: 413 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const title = (form.get("title") as string | null)?.trim();
  const year = (form.get("year") as string | null)?.trim() || new Date().getFullYear().toString();
  const category = (form.get("category") as string | null)?.trim() || "General";
  const description = (form.get("description") as string | null)?.trim() || "";
  const aspect = (form.get("aspect") as string | null)?.trim() || "wide";

  if (!file || !(file instanceof File)) {
    return Response.json({ error: "Missing image file" }, { status: 400 });
  }

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  if (file.size === 0 || file.size > MAX_BYTES) {
    return Response.json({ error: "File too large or empty (max 10MB)" }, { status: 413 });
  }

  // 3. Sniff magic bytes
  const buf = new Uint8Array(await file.arrayBuffer());
  const sig = sniff(buf.subarray(0, 16));
  if (!sig) {
    return Response.json({ error: "Unsupported image format. Use JPG, PNG, WebP or GIF." }, { status: 415 });
  }

  // 4. Save to R2 under gallery/
  const id = randomUUID();
  const key = `gallery/${id}.${sig.ext}`;

  await putMedia(key, buf, sig.mime);

  // 5. Insert into D1
  const createdAt = Math.floor(Date.now() / 1000);
  await createGalleryPhoto({
    id,
    title,
    description: description || undefined,
    category,
    year,
    imageKey: key,
    aspect,
    createdAt,
  });

  const imageUrl = getMediaUrl(key);

  return Response.json({
    success: true,
    photo: {
      id,
      title,
      description,
      category,
      year,
      imageKey: key,
      imageUrl,
      aspect,
      createdAt,
    },
  });
}

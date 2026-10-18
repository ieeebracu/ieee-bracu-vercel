import type { Metadata } from "next";
import { getGalleryPhotos, getGalleryFilterMeta } from "@/lib/gallery/queries";
import { GalleryClient, GalleryPhotoItem } from "./GalleryClient";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Photo Gallery | IEEE BRAC University Student Branch",
  description:
    "Explore photo memories, technical seminars, industrial tours, ceremonies, and milestones across the IEEE BRAC University Student Branch.",
};

function formatImageUrl(imageKey: string): string {
  if (imageKey.startsWith("http://") || imageKey.startsWith("https://") || imageKey.startsWith("/")) {
    return imageKey;
  }
  return `/api/media/${imageKey
    .replace(/^\/+/, "")
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

export default async function GalleryPage() {
  const [{ items, total, hasMore }, meta] = await Promise.all([
    getGalleryPhotos({ page: 1, limit: 12 }),
    getGalleryFilterMeta(),
  ]);

  const initialPhotos: GalleryPhotoItem[] = items.map((photo) => ({
    id: photo.id,
    title: photo.title,
    description: photo.description || "",
    category: photo.category,
    year: photo.year,
    imageKey: photo.imageKey,
    imageUrl: formatImageUrl(photo.imageKey),
    aspect: (photo.aspect as "wide" | "tall" | "square") || "wide",
    createdAt: photo.createdAt,
  }));

  return (
    <GalleryClient
      initialPhotos={initialPhotos}
      initialTotal={total}
      initialHasMore={hasMore}
      availableYears={["All", ...meta.years]}
      availableCategories={["All", ...meta.categories]}
    />
  );
}

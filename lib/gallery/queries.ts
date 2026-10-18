import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { galleryPhotos } from "@/db/schema/gallery";

export interface GalleryPhotoItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  year: string;
  imageKey: string;
  aspect: string;
  createdAt: number;
}

export interface GetGalleryPhotosOptions {
  page?: number;
  limit?: number;
  year?: string;
  category?: string;
  search?: string;
}

export async function getGalleryPhotos(options: GetGalleryPhotosOptions = {}) {
  const page = Math.max(1, options.page ?? 1);
  const limit = Math.max(1, Math.min(100, options.limit ?? 12));
  const offset = (page - 1) * limit;

  const conditions = [];

  if (options.year && options.year !== "All") {
    conditions.push(eq(galleryPhotos.year, options.year));
  }

  if (options.category && options.category !== "All") {
    conditions.push(eq(galleryPhotos.category, options.category));
  }

  if (options.search && options.search.trim()) {
    const q = `%${options.search.trim()}%`;
    conditions.push(
      or(
        like(galleryPhotos.title, q),
        like(galleryPhotos.description, q),
        like(galleryPhotos.category, q)
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, totalResult] = await Promise.all([
    db
      .select()
      .from(galleryPhotos)
      .where(whereClause)
      .orderBy(desc(galleryPhotos.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(galleryPhotos)
      .where(whereClause),
  ]);

  const total = Number(totalResult[0]?.count ?? 0);
  const hasMore = offset + items.length < total;

  return {
    items,
    total,
    page,
    limit,
    hasMore,
  };
}

export async function getGalleryFilterMeta() {
  const [yearsResult, categoriesResult] = await Promise.all([
    db
      .selectDistinct({ year: galleryPhotos.year })
      .from(galleryPhotos)
      .orderBy(desc(galleryPhotos.year)),
    db
      .selectDistinct({ category: galleryPhotos.category })
      .from(galleryPhotos)
      .orderBy(galleryPhotos.category),
  ]);

  const years = yearsResult.map((r) => r.year).filter(Boolean);
  const categories = categoriesResult.map((r) => r.category).filter(Boolean);

  return {
    years,
    categories,
  };
}

export async function getGalleryPhotoById(id: string) {
  const results = await db
    .select()
    .from(galleryPhotos)
    .where(eq(galleryPhotos.id, id))
    .limit(1);

  return results[0] ?? null;
}

export async function createGalleryPhoto(data: {
  id: string;
  title: string;
  description?: string;
  category: string;
  year: string;
  imageKey: string;
  aspect: string;
  createdAt: number;
}) {
  return db.insert(galleryPhotos).values({
    id: data.id,
    title: data.title,
    description: data.description ?? null,
    category: data.category,
    year: data.year,
    imageKey: data.imageKey,
    aspect: data.aspect,
    createdAt: data.createdAt,
  });
}

export async function deleteGalleryPhoto(id: string) {
  return db.delete(galleryPhotos).where(eq(galleryPhotos.id, id));
}

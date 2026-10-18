import { getGalleryPhotos, getGalleryFilterMeta } from "@/lib/gallery/queries";

export const dynamic = "force-dynamic";
export const revalidate = 60;

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

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "12", 10);
    const year = url.searchParams.get("year") || "All";
    const category = url.searchParams.get("category") || "All";
    const search = url.searchParams.get("q") || "";

    const [{ items, total, hasMore }, meta] = await Promise.all([
      getGalleryPhotos({ page, limit, year, category, search }),
      getGalleryFilterMeta(),
    ]);

    const formattedItems = items.map((photo) => ({
      id: photo.id,
      title: photo.title,
      description: photo.description || "",
      category: photo.category,
      year: photo.year,
      imageKey: photo.imageKey,
      imageUrl: formatImageUrl(photo.imageKey),
      aspect: photo.aspect,
      createdAt: photo.createdAt,
    }));

    return Response.json(
      {
        items: formattedItems,
        total,
        page,
        limit,
        hasMore,
        availableYears: ["All", ...meta.years],
        availableCategories: ["All", ...meta.categories],
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch gallery photos:", error);
    return Response.json(
      { error: "Failed to fetch gallery photos" },
      { status: 500 }
    );
  }
}

import { HeroCarousel } from "@/components/home/HeroCarousel";
import { AboutSection } from "@/components/home/AboutSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { ChaptersGrid } from "@/components/home/ChaptersGrid";
import { GallerySection, GalleryMarqueePhoto } from "@/components/home/GallerySection";
import { ExecutiveBody } from "@/components/home/ExecutiveBody";
import { MembersCount } from "@/components/home/MembersCount";
import { LatestNews } from "@/components/home/LatestNews";
import { DailyQuote } from "@/components/home/DailyQuote";
import { getGalleryPhotos } from "@/lib/gallery/queries";

export const revalidate = 60;

function getImageUrl(key: string | null) {
  if (!key) return "";
  if (key.startsWith("http://") || key.startsWith("https://")) return key;
  return `/api/media/${key.replace(/^\/+/, "").split("/").map(encodeURIComponent).join("/")}`;
}

export default async function HomePage() {
  let galleryPhotos: GalleryMarqueePhoto[] = [];

  try {
    const { items } = await getGalleryPhotos({ limit: 16 });
    if (items && items.length > 0) {
      galleryPhotos = items.map((p) => ({
        id: p.id,
        src: getImageUrl(p.imageKey),
        title: p.title,
        category: p.category,
        year: p.year,
        desc: p.description || "",
      }));
    }
  } catch {
    // Graceful fallback if database is not reachable during build/ISR
  }

  return (
    <main className="overflow-x-clip">
      <HeroCarousel />
      <AboutSection />
      <AchievementsSection />
      <ChaptersGrid />
      <GallerySection photos={galleryPhotos} />
      <ExecutiveBody />
      <MembersCount />
      <LatestNews />
      <DailyQuote />
    </main>
  );
}
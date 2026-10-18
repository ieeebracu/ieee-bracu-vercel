import Link from "next/link";
import type { Metadata } from "next";
import ChapterContent from "@/components/Chaptercontent";
import { chaptersDetailData, getChapterBySlug } from "@/data/site/chapters";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return chaptersDetailData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const ch = getChapterBySlug(resolved.slug);
  return {
    title: ch ? `${ch.name} — IEEE BRACU SB` : "Chapter — IEEE BRACU SB",
    description: ch?.desc[0] ?? "IEEE BRACU Student Branch Technical Chapter",
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const resolved = await Promise.resolve(params);
  const ch = getChapterBySlug(resolved.slug);

  if (!ch) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F5F3EE] font-[family-name:var(--font-sans)]">
        <h1 className="mb-4 font-[family-name:var(--font-serif)] text-[32px] font-semibold text-[#191B1E]">
          Chapter not found
        </h1>
        <Link href="/" className="text-[14px] font-semibold text-[#00629B] hover:underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F3EE] font-[family-name:var(--font-sans)]">
      <ChapterContent ch={ch} />
    </main>
  );
}

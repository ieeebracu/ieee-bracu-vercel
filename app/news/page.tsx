import { getPosts } from "@/lib/news/queries";
import { NewsFeed, FormattedNewsItem } from "@/components/news/NewsFeed";
import { formatDate } from "@/lib/formatters";

export const dynamic = "force-dynamic";
export const revalidate = 60;

function getImageUrl(key: string | null) {
  if (!key) return null;

  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }

  return `/api/media/${key
    .replace(/^\/+/, "")
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

export const metadata = {
  title: "News & Events — IEEE BRAC University Student Branch",
  description:
    "Seminars, workshops, industry tours, and announcements from IEEE BRAC University Student Branch and its technical societies.",
};

export default async function NewsPage() {
  const posts = await getPosts();

  const formattedPosts: FormattedNewsItem[] = posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    image: getImageUrl(post.featuredImage),
    date: formatDate(post.publishedAt),
    chapter: post.chapter || "Student Branch",
    tag: "News",
  }));

  return (
    <main className="min-h-screen bg-[#F5F3EE] font-sans">
      {/* Editorial Page Header */}
      <div className="relative overflow-hidden bg-[#0A2540]">
        {/* Background ambient lighting */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #3E9BD6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #00629B 0%, transparent 50%)",
          }}
        />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-32 w-32 rounded-full border border-white/[0.05]" />
        <div className="pointer-events-none absolute -right-16 top-0 h-32 w-32 rounded-full border border-white/[0.05]" />

        <div className="relative mx-auto max-w-[1320px] px-8 pb-16 pt-20">
          <div className="mb-5 flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#7FB4DA]">
            <span className="inline-block h-0.5 w-[26px] bg-[#7FB4DA]" />
            What&rsquo;s happening
          </div>
          <h1 className="m-0 font-serif text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            News &amp; Events
          </h1>
          <p className="m-0 mt-4 max-w-[52ch] text-[16px] leading-[1.6] text-white/60">
            Seminars, workshops, industry tours, and everything else from the IEEE
            BRAC University Student Branch and its six technical chapters.
          </p>
        </div>
      </div>

      {/* Interactive Filters & Articles Grid Feed */}
      <NewsFeed posts={formattedPosts} />
    </main>
  );
}
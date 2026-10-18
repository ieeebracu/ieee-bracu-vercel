import Link from "next/link";
import Image from "next/image";
import { getLatestPosts } from "@/lib/news/queries";
import { formatDate } from "@/lib/formatters";

interface NewsItem {
  slug: string;
  image: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

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

export async function LatestNews() {
  let displayPosts: NewsItem[] = [];

  try {
    // Dynamically fetch the latest 4 news items from the database
    const dbPosts = await getLatestPosts(4);
    if (dbPosts && dbPosts.length > 0) {
      displayPosts = dbPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || "",
        image: getImageUrl(p.featuredImage) || "",
        date: formatDate(p.publishedAt),
        tag: p.chapter || "News",
      }));
    }
  } catch {
    // Graceful handling when DB is unavailable
  }

  if (displayPosts.length === 0) {
    return (
      <section className="bg-[#F5F3EE] py-20 font-sans">
        <div className="mx-auto max-w-[1320px] px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-10">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
                <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
                Latest from the branch
              </div>
              <h2 className="m-0 font-serif text-[clamp(26px,3vw,38px)] font-semibold tracking-[-0.02em] text-[#191B1E]">
                News
              </h2>
            </div>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#0A2540] transition-colors hover:text-[#00629B]"
            >
              View all news
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E3DFD5] bg-white px-6 py-16 text-center shadow-xs">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF1F6] text-[#00629B]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="m-0 font-serif text-lg font-bold text-[#191B1E]">No news available</h3>
            <p className="mt-2 max-w-md text-sm text-[#6E7178]">
              There are no announcements or articles published at the moment. Please check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featured = displayPosts[0];
  const sidePosts = displayPosts.slice(1, 4);

  return (
    <section className="bg-[#F5F3EE] py-24 font-sans">
      <div className="mx-auto max-w-[1320px] px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-10">
          <div>
            <div className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#00629B]">
              <span className="inline-block h-0.5 w-[26px] bg-[#00629B]" />
              Latest from the branch
            </div>
            <h2 className="m-0 font-serif text-[clamp(26px,3vw,38px)] font-semibold tracking-[-0.02em] text-[#191B1E]">
              News
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#0A2540] transition-colors hover:text-[#00629B]"
          >
            View all news
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Featured Card + Side Cards Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Featured Large Card — Spans 3 columns */}
          {featured && (
            <Link
              href={`/news/${featured.slug}`}
              prefetch={true}
              className="group col-span-1 flex flex-col overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#00629B]/35 hover:shadow-[0_16px_40px_rgba(0,98,155,0.09)] cursor-pointer lg:col-span-3"
            >
              <div className="relative h-[320px] w-full overflow-hidden bg-[#0A2540]">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00629B] to-[#0A2540] text-white">
                    <span className="font-serif text-3xl font-bold opacity-30">
                      IEEE BRACU
                    </span>
                  </div>
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(10,37,64,0.45), transparent 50%)",
                  }}
                />
                <span className="absolute left-5 top-5 rounded-md bg-white/95 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#00629B] shadow-xs backdrop-blur">
                  {featured.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="mb-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#6E7178]">
                  {featured.date}
                </span>
                <h3 className="m-0 mb-3 font-serif text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                  {featured.title}
                </h3>
                <p className="m-0 line-clamp-3 text-[14.5px] leading-[1.65] text-[#6E7178]">
                  {featured.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-[#0A2540] transition-colors group-hover:text-[#00629B]">
                  Read more
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                  >
                    <path
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          {/* Side Stack — Up to 3 Cards Spanning 2 columns */}
          {sidePosts.length > 0 && (
            <div className="col-span-1 flex flex-col gap-6 lg:col-span-2">
              {sidePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/news/${p.slug}`}
                  prefetch={true}
                  className="group flex gap-5 overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#00629B]/35 hover:shadow-[0_12px_32px_rgba(0,98,155,0.08)] cursor-pointer"
                >
                  <div className="relative h-[120px] w-[140px] shrink-0 overflow-hidden rounded-xl bg-[#0A2540]">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="140px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00629B] to-[#0A2540] text-white">
                        <span className="font-serif text-xs font-bold opacity-30">
                          IEEE
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-center py-1">
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="rounded bg-[#EAF1F6] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#00629B]">
                        {p.tag}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#B0B4B9]">
                        {p.date}
                      </span>
                    </div>
                    <h3 className="m-0 line-clamp-2 font-serif text-[15.5px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                      {p.title}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#0A2540] transition-colors group-hover:text-[#00629B]">
                      Read more
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                      >
                        <path
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;

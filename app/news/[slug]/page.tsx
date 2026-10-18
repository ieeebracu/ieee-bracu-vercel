import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getPostBySlug, getPosts } from "@/lib/news/queries";
import { formatLongDate as formatDate, formatShortDate } from "@/lib/formatters";
import { NewsBackLink } from "@/components/news/NewsBackLink";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
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

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found — IEEE BRACU SB",
    };
  }

  return {
    title: `${post.seoTitle || post.title} — IEEE BRACU SB`,
    description: post.metaDescription || post.excerpt || undefined,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch all posts to select related articles
  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      image: getImageUrl(p.featuredImage),
      chapter: p.chapter || "Student Branch",
      date: formatShortDate(p.publishedAt),
    }));

  const coverImage = getImageUrl(post.featuredImage);
  const primaryTag = post.tags?.[0]?.name || "Event";
  const dateFormatted = formatDate(post.publishedAt);

  const markdown = post.content.replace(
    /\{\{IMAGE_BASE_URL\}\}/g,
    "/api/media"
  );

  return (
    <main className="min-h-screen bg-[#F5F3EE] font-sans">
      {/* 1. Hero Image / Title Banner */}
      <div className="relative h-[50vh] min-h-[380px] w-full overflow-hidden bg-[#0A2540] animate-fade-in">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#00629B] to-[#0A2540]" />
        )}

        {/* Navy Scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,37,64,.88) 0%, rgba(10,37,64,.45) 45%, rgba(10,37,64,.2) 100%)",
          }}
        />

        {/* Back Link Overlay */}
        <div className="absolute left-0 right-0 top-0 z-10">
          <div className="mx-auto max-w-[1320px] px-8 pt-6">
            <NewsBackLink />
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 animate-article-entrance">
          <div className="mx-auto max-w-[1320px] px-8 pb-10">
            <div className="max-w-[820px]">
              <div className="mb-4 flex flex-wrap items-center gap-2.5">
                <span className="rounded-md bg-[#00629B] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                  {primaryTag}
                </span>
                {post.chapter && (
                  <span className="rounded-md bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/80 backdrop-blur-xs">
                    {post.chapter}
                  </span>
                )}
                <span className="text-[13px] text-white/70">{dateFormatted}</span>
              </div>
              <h1 className="m-0 font-serif text-[clamp(26px,4vw,44px)] font-bold leading-[1.12] tracking-[-0.02em] text-white">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Article Body + Sidebar Layout */}
      <div className="mx-auto max-w-[1320px] px-8 py-16 animate-article-entrance">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            {/* Lead Excerpt */}
            {post.excerpt && (
              <p className="m-0 mb-8 font-serif text-[19px] font-medium leading-[1.7] text-[#191B1E]">
                {post.excerpt}
              </p>
            )}

            <div className="mb-10 h-px w-16 bg-[#E3DFD5]" />

            {/* Markdown Body */}
            <div className="prose prose-neutral max-w-none text-[16.5px] leading-[1.8] text-[#44474C]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ ...props }) => (
                    <h1
                      className="m-0 mb-5 mt-10 font-serif text-[28px] font-bold text-[#191B1E]"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="m-0 mb-4 mt-8 font-serif text-[22px] font-bold text-[#191B1E]"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3
                      className="m-0 mb-3 mt-6 font-serif text-[18px] font-semibold text-[#191B1E]"
                      {...props}
                    />
                  ),
                  p: ({ ...props }) => <p className="m-0 mb-6" {...props} />,
                  img: ({ src, alt }) => (
                    <span className="my-8 block overflow-hidden rounded-xl border border-[#E3DFD5] bg-white shadow-xs">
                      <img
                        src={src}
                        alt={alt ?? ""}
                        className="h-auto w-full object-contain"
                      />
                    </span>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#00629B] underline underline-offset-2 hover:text-[#004E7C]"
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-6 border-l-4 border-[#00629B] bg-[#EAF1F6]/50 py-3 pl-5 italic text-[#191B1E]">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>

            {/* Tags & Social Share Strip */}
            <div className="mt-12 flex flex-col gap-5 border-t border-[#E3DFD5] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6E7178]">
                  Tags
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-[#EAF1F6] px-3 py-1 text-[12px] font-medium text-[#00629B]"
                  >
                    {tag.name}
                  </span>
                ))}
                {post.chapter && (
                  <span className="rounded-full bg-[#F5F3EE] px-3 py-1 text-[12px] font-medium text-[#6E7178]">
                    {post.chapter}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6E7178]">
                  Share
                </span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://ieeebracu.com/news/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E3DFD5] bg-white text-[#6E7178] transition-colors hover:border-[#00629B] hover:text-[#00629B]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://ieeebracu.com/news/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E3DFD5] bg-white text-[#6E7178] transition-colors hover:border-[#00629B] hover:text-[#00629B]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-[100px] space-y-8">
              {/* Event Details Card */}
              <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs">
                <h4 className="m-0 mb-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6E7178]">
                  Event Details
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mt-0.5 shrink-0 text-[#00629B]"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B0B4B9]">
                        Date
                      </div>
                      <div className="text-[14px] font-medium text-[#191B1E]">
                        {dateFormatted}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mt-0.5 shrink-0 text-[#00629B]"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B0B4B9]">
                        Organized by
                      </div>
                      <div className="text-[14px] font-medium text-[#191B1E]">
                        IEEE {post.chapter || "Student Branch"} BRACU
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="mt-0.5 shrink-0 text-[#00629B]"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B0B4B9]">
                        Category
                      </div>
                      <div className="text-[14px] font-medium text-[#191B1E]">
                        {primaryTag}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Join CTA Card */}
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#00629B] to-[#0A2540] p-6 shadow-md">
                <h4 className="m-0 mb-2 font-serif text-[18px] font-semibold text-white">
                  Join the community
                </h4>
                <p className="m-0 mb-5 text-[13.5px] leading-[1.6] text-white/70">
                  Become a member and get access to workshops, tours, and the global IEEE network.
                </p>
                <Link
                  href="/join"
                  className="inline-block rounded-lg bg-white px-5 py-2.5 text-[13.5px] font-semibold text-[#00629B] transition-colors hover:bg-white/90"
                >
                  Join IEEE
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 3. Related Articles Section */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-[#E3DFD5] bg-[#F5F3EE]">
          <div className="mx-auto max-w-[1320px] px-8 py-16">
            <h2 className="m-0 mb-10 font-serif text-[24px] font-bold tracking-[-0.01em] text-[#191B1E]">
              Related articles
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  href={`/news/${r.slug}`}
                  prefetch={true}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#00629B]/35 hover:shadow-[0_14px_36px_rgba(0,98,155,0.09)] cursor-pointer"
                >
                  <div className="relative h-[180px] overflow-hidden bg-[#0A2540]">
                    {r.image ? (
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#00629B] to-[#0A2540] text-white">
                        <span className="font-serif text-xl font-bold opacity-30">IEEE BRACU</span>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#00629B] backdrop-blur-xs">
                      {r.chapter}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[#B0B4B9]">
                      {r.date}
                    </span>
                    <h3 className="m-0 font-serif text-[16px] font-bold leading-[1.3] tracking-[-0.01em] text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                      {r.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[12.5px] font-semibold text-[#0A2540] transition-colors group-hover:text-[#00629B]">
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
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
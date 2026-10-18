"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PostEditor } from "@/components/admin/PostEditor";

function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.includes("{{IMAGE_BASE_URL}}")) {
    return url.replace(/\{\{IMAGE_BASE_URL\}\}/g, "/api/media");
  }
  const clean = url.replace(/^\/+/, "");
  if (clean.startsWith("api/media/")) {
    return `/${clean}`;
  }
  return `/api/media/${clean}`;
}

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);

  // Publish Date & Time state
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");

  const handleSetToCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    setPublishDate(`${year}-${month}-${day}`);

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setPublishTime(`${hours}:${minutes}`);
  };

  const handleClearTime = () => {
    setPublishTime("");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadPost() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/posts/${id}`);
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as any;
          throw new Error(body.error || `Failed to load post (${res.status})`);
        }
        const data = (await res.json()) as any;
        const post = data.post;
        if (!post) throw new Error("Post not found");

        setTitle(post.title || "");
        setSlug(post.slug || "");
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setFeaturedImage(post.featuredImage || "");

        if (post.publishedAt) {
          const ms = post.publishedAt > 1e11 ? post.publishedAt : post.publishedAt * 1000;
          const d = new Date(ms);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          setPublishDate(`${year}-${month}-${day}`);

          const hours = d.getHours();
          const minutes = d.getMinutes();
          if (hours !== 0 || minutes !== 0) {
            setPublishTime(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`);
          } else {
            setPublishTime("");
          }
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    void loadPost();
  }, [id]);

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as any;
        throw new Error(body.error ?? `Upload failed (${res.status})`);
      }
      const data = (await res.json()) as any;
      setFeaturedImage(data.url);
    } catch (err: any) {
      setError(err?.message || "Failed to upload cover image");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a title");
      return;
    }
    if (!content.trim()) {
      setError("Please write post markdown content");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Compute publishedAt in Unix seconds
    let publishedAtSec: number | undefined;
    if (publishDate) {
      const [year, month, day] = publishDate.split("-").map(Number);
      if (publishTime && publishTime.trim()) {
        const [hours, minutes] = publishTime.split(":").map(Number);
        const d = new Date(year, month - 1, day, hours || 0, minutes || 0, 0);
        publishedAtSec = Math.floor(d.getTime() / 1000);
      } else {
        // Midnight local time
        const d = new Date(year, month - 1, day, 0, 0, 0);
        publishedAtSec = Math.floor(d.getTime() / 1000);
      }
    }

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          featuredImage,
          publishedAt: publishedAtSec,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok) {
        throw new Error(data.error || "Failed to update post");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] text-zinc-400 font-sans">
        <svg className="h-6 w-6 animate-spin text-[#00629B]" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
        </svg>
        <span className="ml-3 text-sm font-medium text-zinc-600">Loading post for editing...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E3DFD5] bg-white/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-[#F5F3EE] px-3 py-1.5 text-xs font-semibold text-[#191B1E] transition-colors hover:bg-[#EAE6DD]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Posts
            </Link>
            <span className="text-zinc-300">/</span>
            <h1 className="text-sm font-semibold text-[#191B1E] line-clamp-1 max-w-[200px] sm:max-w-md">
              Edit: {title || "Untitled Post"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {slug && (
              <a
                href={`/news/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#6E7178] hover:text-[#191B1E]"
              >
                <span>View Live</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}

            <button
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-[#00629B] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#004E7C] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                  </svg>
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Body */}
      <main className="mx-auto max-w-5xl px-6 pt-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-semibold hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-emerald-900">Post Updated Successfully!</h3>
                <p className="mt-1 text-sm text-emerald-700">
                  Your edits have been saved to D1 and updated across the site.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href={`/news/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    <span>View Live Article</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <Link
                    href="/admin/posts"
                    className="text-xs font-semibold text-emerald-800 hover:underline"
                  >
                    Back to All Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Post Metadata Card */}
          <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs sm:p-8">
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6E7178]">
                  Post Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IEEE BRACU Student Branch Wins Regional Exemplary Award"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-4 py-3 text-base font-semibold text-[#191B1E] placeholder:font-normal placeholder:text-zinc-400 focus:border-[#00629B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00629B]/10"
                />
              </div>

              {/* Slug + Excerpt Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6E7178]">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] overflow-hidden focus-within:border-[#00629B] focus-within:ring-2 focus-within:ring-[#00629B]/10">
                    <span className="flex items-center bg-[#F5F3EE] px-3 text-xs text-[#6E7178] select-none border-r border-[#E3DFD5]">
                      /news/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-[#191B1E] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cover Image Upload / URL */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6E7178]">
                    Featured / Cover Image
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="/api/media/... or paste image URL"
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                      className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3 py-2.5 text-xs text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none"
                    />
                    <label className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-[#E3DFD5] bg-[#F5F3EE] px-3 py-2 text-xs font-medium text-[#191B1E] hover:bg-[#EAE6DD] cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{uploadingCover ? "Uploading…" : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                        disabled={uploadingCover}
                      />
                    </label>
                  </div>

                  {featuredImage && (
                    <div className="relative mt-2.5 h-36 w-full overflow-hidden rounded-xl border border-[#E3DFD5] bg-[#F5F3EE]">
                      <img
                        src={resolveMediaUrl(featuredImage) || ""}
                        alt="Cover Preview"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFeaturedImage("")}
                        className="absolute right-2 top-2 rounded-lg bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                        title="Remove cover image"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Publish Date & Time */}
              <div className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#191B1E]">
                      Publication Date &amp; Time
                    </label>
                    <p className="mt-0.5 text-xs text-[#6E7178]">
                      Sets when this post appears on the news feed. Time is optional unless ordering multiple events on the same day.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSetToCurrentTime}
                      className="inline-flex items-center gap-1 rounded-lg border border-[#E3DFD5] bg-white px-2.5 py-1 text-xs font-medium text-[#191B1E] shadow-2xs hover:bg-[#F5F3EE] transition-colors"
                      title="Set date and time to right now"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Set to Now</span>
                    </button>
                    {publishTime && (
                      <button
                        type="button"
                        onClick={handleClearTime}
                        className="rounded-lg border border-[#E3DFD5] bg-white px-2 py-1 text-xs text-[#6E7178] hover:text-red-600 transition-colors"
                        title="Clear time"
                      >
                        Clear time
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E7178]">
                      Publish Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#E3DFD5] bg-white px-3 py-2 text-xs font-medium text-[#191B1E] focus:border-[#00629B] focus:outline-none focus:ring-1 focus:ring-[#00629B]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#6E7178]">
                      Publish Time <span className="font-normal text-zinc-400">(Optional — for same-day order)</span>
                    </label>
                    <input
                      type="time"
                      value={publishTime}
                      onChange={(e) => setPublishTime(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-[#E3DFD5] bg-white px-3 py-2 text-xs font-medium text-[#191B1E] focus:border-[#00629B] focus:outline-none focus:ring-1 focus:ring-[#00629B]"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6E7178]">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief synopsis shown in news cards and SEO meta descriptions..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-4 py-2.5 text-xs text-[#191B1E] placeholder:text-zinc-400 focus:border-[#00629B] focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Post Markdown Editor Card */}
          <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#191B1E]">
                  Post Content (Markdown)
                </h2>
                <p className="mt-0.5 text-xs text-[#6E7178]">
                  Paste or drag &amp; drop images directly into the editor below. They will be uploaded automatically to Cloudflare R2.
                </p>
              </div>
            </div>

            {/* PostEditor Component */}
            <PostEditor value={content} onChange={setContent} />
          </div>
        </div>
      </main>
    </div>
  );
}

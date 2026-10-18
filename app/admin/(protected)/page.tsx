import Link from "next/link";
import { requireWebmaster } from "@/lib/auth/session";
import { SignOutButton } from "./sign-out-button";

export default async function AdminHome() {
  const session = await requireWebmaster();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E3DFD5] bg-white/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#00629B] border border-blue-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#191B1E]">IEEE BRACU Admin</h1>
              <p className="text-[11px] text-[#6E7178]">Webmaster Control Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-[#191B1E]">{session.user.name}</p>
              <p className="font-mono text-[11px] text-[#6E7178]">{session.user.email}</p>
            </div>
            <SignOutButton className="rounded-lg border border-[#E3DFD5] bg-[#F5F3EE] px-3 py-1.5 text-xs font-semibold text-[#191B1E] transition-colors hover:bg-[#EAE6DD] cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 pt-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#191B1E]">
            Welcome back, {session.user.name}
          </h2>
          <p className="mt-1 text-xs text-[#6E7178]">
            Manage your site&rsquo;s content, publish updates, and view status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Box 1: Post & Content Management */}
          <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs sm:p-8 md:col-span-8">
            <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#00629B]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191B1E]">Posts &amp; News Management</h3>
                  <p className="text-xs text-[#6E7178]">Create, edit, or remove articles and news stories</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Action 1: Manage & Edit Posts */}
              <Link
                href="/admin/posts"
                className="group flex flex-col justify-between rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5 transition-all hover:border-[#00629B] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#E3DFD5] text-[#00629B] group-hover:bg-[#00629B] group-hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                    Manage &amp; Edit Posts
                  </h4>
                  <p className="mt-1 text-xs text-[#6E7178] leading-relaxed">
                    View paginated posts, search by keyword, edit markdown, or delete posts.
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#00629B]">
                  <span>Open post manager</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              {/* Action 2: Create New Post */}
              <Link
                href="/admin/posts/new"
                className="group flex flex-col justify-between rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5 transition-all hover:border-[#00629B] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#E3DFD5] text-[#00629B] group-hover:bg-[#00629B] group-hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                    Create New Post
                  </h4>
                  <p className="mt-1 text-xs text-[#6E7178] leading-relaxed">
                    Write articles with live markdown preview and drag &amp; drop R2 image uploads.
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#00629B]">
                  <span>Create article</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Bottom link to view live site */}
            <div className="mt-5 border-t border-[#E3DFD5] pt-4 flex items-center justify-between">
              <span className="text-xs text-[#6E7178]">Public blog &amp; news page:</span>
              <a
                href="/news"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00629B] hover:underline"
              >
                <span>View Live News Page</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Box 2: Photo Gallery Management */}
          <div className="rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs sm:p-8 md:col-span-8">
            <div className="flex items-center justify-between border-b border-[#E3DFD5] pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191B1E]">Photo Gallery &amp; R2 Media</h3>
                  <p className="text-xs text-[#6E7178]">Upload, caption, and delete exhibition photos stored in Cloudflare R2</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/admin/gallery"
                className="group flex flex-col justify-between rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5 transition-all hover:border-[#00629B] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#E3DFD5] text-[#00629B] group-hover:bg-[#00629B] group-hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                    Manage Gallery Photos
                  </h4>
                  <p className="mt-1 text-xs text-[#6E7178] leading-relaxed">
                    Browse all archived photos, filter by year or category, preview, or delete from R2 and D1.
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#00629B]">
                  <span>Open gallery manager</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link
                href="/admin/gallery"
                className="group flex flex-col justify-between rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] p-5 transition-all hover:border-[#00629B] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#E3DFD5] text-[#00629B] group-hover:bg-[#00629B] group-hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#191B1E] group-hover:text-[#00629B] transition-colors">
                    Upload New Photo
                  </h4>
                  <p className="mt-1 text-xs text-[#6E7178] leading-relaxed">
                    Upload high-res moments to R2 with auto aspect-ratio detection and custom captions.
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#00629B]">
                  <span>Upload photo</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            <div className="mt-5 border-t border-[#E3DFD5] pt-4 flex items-center justify-between">
              <span className="text-xs text-[#6E7178]">Public exhibition &amp; gallery:</span>
              <a
                href="/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00629B] hover:underline"
              >
                <span>View Live Gallery Page</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Box 2: Account & Security */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#E3DFD5] bg-white p-6 shadow-xs sm:p-8 md:col-span-4">
            <div>
              <div className="flex items-center gap-3 border-b border-[#E3DFD5] pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191B1E]">Account &amp; Security</h3>
                  <p className="text-xs text-[#6E7178]">Webmaster credentials</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E7178]">
                    Signed In As
                  </label>
                  <p className="mt-0.5 text-xs font-semibold text-[#191B1E]">{session.user.name}</p>
                  <p className="font-mono text-xs text-zinc-500 break-all">{session.user.email}</p>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-[#FBFAF7] p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-semibold text-[#191B1E]">Webmaster Role</span>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#6E7178]">
                    Password updates and credential management are handled securely via the CLI script:
                  </p>
                  <code className="mt-2 block rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-[11px] text-zinc-700 select-all">
                    npm run reset:webmaster
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E3DFD5]">
              <SignOutButton className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 cursor-pointer" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
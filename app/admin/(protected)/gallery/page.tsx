"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

interface AdminGalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  category: string;
  year: string;
  imageKey: string;
  imageUrl: string;
  aspect: string;
  createdAt: number;
}

const PRESET_CATEGORIES = [
  "Technical Seminar",
  "Workshop",
  "Field Visit",
  "Industrial Tour",
  "Ceremony & Awards",
  "Awards & Honors",
  "Branch Community",
  "Competition",
  "Global Workshop",
  "General",
];

const PRESET_YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"];

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<AdminGalleryPhoto[]>([]);
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadYear, setUploadYear] = useState(new Date().getFullYear().toString());
  const [uploadCategory, setUploadCategory] = useState("Technical Seminar");
  const [customCategory, setCustomCategory] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadAspect, setUploadAspect] = useState<"wide" | "tall" | "square">("wide");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Delete modal state
  const [deletingPhoto, setDeletingPhoto] = useState<AdminGalleryPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preview modal state
  const [previewPhoto, setPreviewPhoto] = useState<AdminGalleryPhoto | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: "100",
        year: selectedYear,
        category: selectedCategory,
      });
      if (debouncedSearch.trim()) {
        params.set("q", debouncedSearch.trim());
      }

      const res = await fetch(`/api/admin/gallery?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to load gallery photos (${res.status})`);
      }
      const data = (await res.json()) as {
        items?: AdminGalleryPhoto[];
        years?: string[];
        categories?: string[];
      };
      setPhotos(data.items || []);
      if (data.years) setAvailableYears(data.years);
      if (data.categories) setAvailableCategories(data.categories);
    } catch (err: any) {
      setError(err?.message || "Failed to load gallery photos");
    } finally {
      setLoading(false);
    }
  }, [selectedYear, selectedCategory, debouncedSearch]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  // Handle file drop / select
  const handleFileSelect = (file: File) => {
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (JPG, PNG, WebP, GIF)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size must be less than 10MB");
      return;
    }

    setUploadFile(file);
    const objectUrl = URL.createObjectURL(file);
    setUploadPreview(objectUrl);

    // Auto-detect aspect ratio
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio >= 1.2) {
        setUploadAspect("wide");
      } else if (ratio <= 0.85) {
        setUploadAspect("tall");
      } else {
        setUploadAspect("square");
      }
    };
    img.src = objectUrl;

    // Default title from filename if empty
    if (!uploadTitle.trim()) {
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
      const formattedName = nameWithoutExt
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setUploadTitle(formattedName);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadError("Please select an image to upload");
      return;
    }
    if (!uploadTitle.trim()) {
      setUploadError("Please provide a title for the photo");
      return;
    }

    const cat = uploadCategory === "Custom" ? customCategory.trim() : uploadCategory;
    if (!cat) {
      setUploadError("Please select or enter a category");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", uploadTitle.trim());
      formData.append("year", uploadYear);
      formData.append("category", cat);
      formData.append("description", uploadDesc.trim());
      formData.append("aspect", uploadAspect);

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Failed to upload photo");
      }

      // Reset form and close modal
      setIsUploadOpen(false);
      setUploadFile(null);
      setUploadPreview(null);
      setUploadTitle("");
      setUploadDesc("");
      setCustomCategory("");

      // Reload gallery list
      await loadPhotos();
    } catch (err: any) {
      setUploadError(err?.message || "An unexpected error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingPhoto) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deletingPhoto.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete photo");
      }
      setDeletingPhoto(null);
      await loadPhotos();
    } catch (err: any) {
      alert(err?.message || "Failed to delete photo");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E3DFD5] bg-white/95 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E7178] transition-colors hover:text-[#00629B]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Control Panel
            </Link>
            <span className="text-[#E3DFD5]">|</span>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#00629B]" />
              <h1 className="text-sm font-bold text-[#191B1E]">Photo Gallery Management</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#E3DFD5] bg-white px-3 py-1.5 text-xs font-semibold text-[#191B1E] transition-colors hover:bg-[#F5F3EE]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Live Gallery
            </Link>
            <button
              onClick={() => {
                setUploadError(null);
                setIsUploadOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#00629B] px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#004E7C] cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Upload Photo
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 pt-8">
        {/* Intro & Stats */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#191B1E]">
              Gallery &amp; R2 Media Archive
            </h2>
            <p className="mt-0.5 text-xs text-[#6E7178]">
              Upload moments, ceremonies, and workshops stored in Cloudflare R2 bucket (`gallery/`).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#E3DFD5] bg-white px-3.5 py-2 text-center shadow-2xs">
              <span className="block text-lg font-bold text-[#00629B]">{photos.length}</span>
              <span className="text-[10.5px] font-medium uppercase tracking-wider text-[#6E7178]">Photos</span>
            </div>
            <div className="rounded-xl border border-[#E3DFD5] bg-white px-3.5 py-2 text-center shadow-2xs">
              <span className="block text-lg font-bold text-[#191B1E]">{availableYears.length}</span>
              <span className="text-[10.5px] font-medium uppercase tracking-wider text-[#6E7178]">Years</span>
            </div>
            <div className="rounded-xl border border-[#E3DFD5] bg-white px-3.5 py-2 text-center shadow-2xs">
              <span className="block text-lg font-bold text-[#191B1E]">{availableCategories.length}</span>
              <span className="text-[10.5px] font-medium uppercase tracking-wider text-[#6E7178]">Categories</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-[#E3DFD5] bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A9E9F]"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] py-2 pl-9 pr-3 text-xs text-[#191B1E] placeholder-[#9A9E9F] focus:border-[#00629B] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Year selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3 py-2 text-xs font-medium text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Years</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>

            {/* Category selector */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3 py-2 text-xs font-medium text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {(selectedYear !== "All" || selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedYear("All");
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="rounded-xl border border-[#E3DFD5] px-3 py-2 text-xs font-semibold text-[#6E7178] hover:bg-[#F5F3EE] hover:text-[#191B1E] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Gallery Photos Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00629B] border-t-transparent" />
            <p className="mt-3 text-xs text-[#6E7178]">Loading photos from R2 &amp; database...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-xs text-red-700">
            {error}
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E3DFD5] bg-white p-12 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#00629B]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#191B1E]">No photos found</h3>
            <p className="mt-1 text-xs text-[#6E7178]">
              {searchQuery || selectedYear !== "All" || selectedCategory !== "All"
                ? "Try clearing your filters or search term."
                : "Get started by uploading your first photo to the R2 gallery archive."}
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#00629B] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#004E7C] cursor-pointer"
            >
              Upload First Photo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E3DFD5] bg-white shadow-2xs transition-all hover:border-[#00629B]/30 hover:shadow-sm"
              >
                {/* Thumbnail */}
                <div
                  className={`relative w-full overflow-hidden bg-[#0A2540] cursor-pointer ${
                    photo.aspect === "tall"
                      ? "aspect-[3/4]"
                      : photo.aspect === "square"
                      ? "aspect-square"
                      : "aspect-[16/10]"
                  }`}
                  onClick={() => setPreviewPhoto(photo)}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  
                  {/* Top Badges */}
                  <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
                    <span className="rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold text-[#00629B] backdrop-blur-xs">
                      {photo.year}
                    </span>
                    <span className="rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                      {photo.aspect}
                    </span>
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewPhoto(photo);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/90 text-[#191B1E] shadow-xs backdrop-blur-xs hover:bg-white"
                      title="Preview photo"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingPhoto(photo);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/90 text-white shadow-xs backdrop-blur-xs hover:bg-red-600"
                      title="Delete photo"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="inline-block rounded-md bg-[#EAF1F6] px-2 py-0.5 text-[10.5px] font-semibold text-[#00629B]">
                      {photo.category}
                    </span>
                  </div>
                  <h3 className="line-clamp-2 text-xs font-bold leading-snug text-[#191B1E]" title={photo.title}>
                    {photo.title}
                  </h3>
                  {photo.description && (
                    <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-[#6E7178]">
                      {photo.description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#F0ECE1] text-[10px] text-[#9A9E9F]">
                    <span className="font-mono truncate max-w-[120px]">{photo.imageKey}</span>
                    <button
                      onClick={() => setDeletingPhoto(photo)}
                      className="text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#E3DFD5] bg-white p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                if (!uploading) {
                  setIsUploadOpen(false);
                  setUploadFile(null);
                  setUploadPreview(null);
                }
              }}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[#6E7178] hover:bg-[#F5F3EE] hover:text-[#191B1E] cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="6" />
              </svg>
            </button>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-[#191B1E]">Upload Gallery Photo to R2</h3>
              <p className="mt-0.5 text-xs text-[#6E7178]">
                Image will be stored in R2 bucket (`gallery/`) and saved in the exhibition catalog.
              </p>
            </div>

            {uploadError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-bold text-[#191B1E] mb-1.5">Photo File *</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />

                {uploadPreview ? (
                  <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[#00629B]/30 bg-[#F8F9FA] p-3">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-[#0A2540]">
                      <Image
                        src={uploadPreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between w-full text-xs">
                      <span className="truncate max-w-[260px] text-[#6E7178] font-mono">
                        {uploadFile?.name} ({(uploadFile!.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="font-semibold text-[#00629B] hover:underline cursor-pointer"
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#E3DFD5] bg-[#FBFAF7] p-8 text-center transition-colors hover:border-[#00629B] hover:bg-white cursor-pointer"
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#00629B]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p className="text-xs font-bold text-[#191B1E]">
                      Click to choose image or drag &amp; drop here
                    </p>
                    <p className="mt-1 text-[11px] text-[#9A9E9F]">
                      Supports JPG, PNG, WebP up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#191B1E] mb-1.5">Photo Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Hands-on Technical Session on Machine Learning"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3.5 py-2 text-xs text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* Year & Category Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#191B1E] mb-1.5">Year *</label>
                  <select
                    value={uploadYear}
                    onChange={(e) => setUploadYear(e.target.value)}
                    className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3.5 py-2 text-xs text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {PRESET_YEARS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191B1E] mb-1.5">Category *</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3.5 py-2 text-xs text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none cursor-pointer"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="Custom">+ Custom Category...</option>
                  </select>
                </div>
              </div>

              {uploadCategory === "Custom" && (
                <div>
                  <label className="block text-xs font-bold text-[#191B1E] mb-1.5">Custom Category Name *</label>
                  <input
                    type="text"
                    placeholder="Enter new category name..."
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3.5 py-2 text-xs text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              )}

              {/* Description / Caption */}
              <div>
                <label className="block text-xs font-bold text-[#191B1E] mb-1.5">
                  Description / Caption <span className="font-normal text-[#9A9E9F]">(Optional)</span>
                </label>
                <textarea
                  placeholder="Context, attendees, key moments shown in the lightbox modal..."
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-[#E3DFD5] bg-[#FBFAF7] px-3.5 py-2 text-xs text-[#191B1E] focus:border-[#00629B] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Aspect Ratio Picker */}
              <div>
                <label className="block text-xs font-bold text-[#191B1E] mb-1.5">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "wide", label: "Wide (16:9 / Landscape)" },
                    { key: "tall", label: "Tall (3:4 / Portrait)" },
                    { key: "square", label: "Square (1:1)" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setUploadAspect(item.key as any)}
                      className={`rounded-xl border p-2.5 text-center text-xs font-semibold transition-all cursor-pointer ${
                        uploadAspect === item.key
                          ? "border-[#00629B] bg-[#EAF1F6] text-[#00629B]"
                          : "border-[#E3DFD5] bg-[#FBFAF7] text-[#6E7178] hover:border-[#00629B]/30"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-[#E3DFD5]">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  disabled={uploading}
                  className="rounded-xl border border-[#E3DFD5] px-4 py-2 text-xs font-semibold text-[#6E7178] hover:bg-[#F5F3EE] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00629B] px-5 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#004E7C] disabled:opacity-60 cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Uploading to R2...
                    </>
                  ) : (
                    "Save & Upload"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-3xl border border-[#E3DFD5] bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-[#191B1E]">Delete Photo Permanently?</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#6E7178]">
              Are you sure you want to delete <span className="font-semibold text-[#191B1E]">&ldquo;{deletingPhoto.title}&rdquo;</span>?
              This will remove the image from Cloudflare R2 (`{deletingPhoto.imageKey}`) and delete the database catalog entry. This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingPhoto(null)}
                disabled={isDeleting}
                className="rounded-xl border border-[#E3DFD5] px-4 py-2 text-xs font-semibold text-[#6E7178] hover:bg-[#F5F3EE] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-red-700 disabled:opacity-60 cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Preview Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-3xl bg-[#0A2540] p-4 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 cursor-pointer"
            >
              ✕
            </button>
            <div className="relative h-[480px] w-full overflow-hidden rounded-2xl">
              <Image
                src={previewPhoto.imageUrl}
                alt={previewPhoto.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 px-2">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-semibold">
                  {previewPhoto.year}
                </span>
                <span className="rounded-md bg-[#00629B] px-2 py-0.5 text-[11px] font-semibold">
                  {previewPhoto.category}
                </span>
              </div>
              <h4 className="mt-2 text-base font-bold">{previewPhoto.title}</h4>
              {previewPhoto.description && (
                <p className="mt-1 text-xs text-white/70">{previewPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// @uiw/react-md-editor touches `window`, so it must be loaded client-only.
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as any;
    throw new Error(body.error ?? `Upload failed (${res.status})`);
  }
  const { url } = (await res.json()) as any;
  return url as string;
}

function insertAtCursor(textarea: HTMLTextAreaElement, text: string) {
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  return { value: before + text + after, cursor: start + text.length };
}

function resolveMarkdownImageUrl(src: string | undefined): string {
  if (!src) return "";

  let resolved = src;

  // 1. Decode in case react-markdown encoded {{ -> %7B%7B
  try {
    resolved = decodeURIComponent(src);
  } catch {
    // ignore malformed URI
  }

  // 2. Replace {{IMAGE_BASE_URL}} or encoded variant with /api/media
  if (resolved.includes("{{IMAGE_BASE_URL}}")) {
    resolved = resolved.replace(/\{\{IMAGE_BASE_URL\}\}/g, "/api/media");
  } else if (
    resolved.toLowerCase().includes("%7b%7bimage_base_url%7d%7d") ||
    src.toLowerCase().includes("%7b%7bimage_base_url%7d%7d")
  ) {
    resolved = resolved.replace(/%7B%7BIMAGE_BASE_URL%7D%7D/gi, "/api/media");
  }

  // 3. Return external URLs as is
  if (resolved.startsWith("http://") || resolved.startsWith("https://")) {
    return resolved;
  }

  // 4. Ensure it has /api/media prefix for stored assets
  const clean = resolved.replace(/^\/+/, "");
  if (clean.startsWith("api/media/")) {
    return `/${clean}`;
  }
  if (clean.startsWith("posts/")) {
    return `/api/media/${clean}`;
  }

  return resolved.startsWith("/") ? resolved : `/${resolved}`;
}

export function PostEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[], textarea: HTMLTextAreaElement) => {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const placeholder = `![Uploading ${file.name}...]()`;
        setUploading(file.name);
        const withPlaceholder = insertAtCursor(textarea, placeholder);
        onChange(withPlaceholder.value);
        try {
          const url = await uploadImage(file);
          onChange(withPlaceholder.value.replace(placeholder, `![](${url})`));
        } catch (err) {
          onChange(withPlaceholder.value.replace(placeholder, `<!-- upload failed: ${file.name} -->`));
          console.error(err);
        } finally {
          setUploading(null);
        }
      }
    },
    [onChange]
  );

  return (
    <div data-color-mode="light" className="w-full">
      {uploading && (
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-600">
          <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
          </svg>
          <span>Uploading {uploading} to media storage…</span>
        </div>
      )}
      <MDEditor
        value={value}
        onChange={(v) => onChange(v ?? "")}
        height={520}
        previewOptions={{
          urlTransform: (url: string) => resolveMarkdownImageUrl(url),
          rehypeRewrite: (node: any) => {
            if (node.type === "element" && node.tagName === "img") {
              if (typeof node.properties?.src === "string") {
                node.properties.src = resolveMarkdownImageUrl(node.properties.src);
              }
            }
          },
          components: {
            img: ({ src, alt, ...props }: any) => {
              const resolved = resolveMarkdownImageUrl(typeof src === "string" ? src : undefined);
              return (
                <span className="my-4 block overflow-hidden rounded-xl border border-[#E3DFD5] bg-white shadow-xs">
                  <img
                    src={resolved}
                    alt={alt || ""}
                    className="h-auto max-h-[500px] w-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                      console.warn("Failed to load preview image:", src, "->", resolved);
                    }}
                    {...props}
                  />
                </span>
              );
            },
          },
        }}
        textareaProps={{
          placeholder: "Write post markdown content here... (Paste or drag & drop images directly)",
          onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
            const files = Array.from(e.clipboardData.files);
            if (files.length) {
              e.preventDefault();
              void handleFiles(files, e.currentTarget);
            }
          },
          onDrop: (e: React.DragEvent<HTMLTextAreaElement>) => {
            const files = e.dataTransfer.files;
            if (files.length) {
              e.preventDefault();
              void handleFiles(files, e.currentTarget);
            }
          },
        }}
      />
    </div>
  );
}

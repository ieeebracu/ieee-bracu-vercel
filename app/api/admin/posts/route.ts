import { db } from "@/db";
import { posts, chapters } from "@/db/schema/posts";
import { auth } from "@/lib/auth";
import { count, desc, eq, like, or } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session?.user ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const pageParam = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limitParam = parseInt(url.searchParams.get("limit") ?? "10", 10);
    const search = (url.searchParams.get("search") ?? "").trim();

    const page = Math.max(1, Number.isNaN(pageParam) ? 1 : pageParam);
    const limit = Math.min(50, Math.max(1, Number.isNaN(limitParam) ? 10 : limitParam));
    const offset = (page - 1) * limit;

    const whereClause = search
      ? or(
          like(posts.title, `%${search}%`),
          like(posts.slug, `%${search}%`)
        )
      : undefined;

    // Get total count matching search
    const totalResult = await db
      .select({ value: count() })
      .from(posts)
      .where(whereClause)
      .get();

    const total = totalResult ? Number(totalResult.value) : 0;
    const totalPages = Math.max(1, Math.ceil(total / limit));

    // Fetch paginated chunk of posts
    const pagedPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        excerpt: posts.excerpt,
        featuredImage: posts.featuredImage,
        publishedAt: posts.publishedAt,
        modifiedAt: posts.modifiedAt,
        chapterId: posts.chapterId,
        chapterName: chapters.name,
      })
      .from(posts)
      .leftJoin(chapters, eq(posts.chapterId, chapters.id))
      .where(whereClause)
      .orderBy(desc(posts.publishedAt), desc(posts.id))
      .limit(limit)
      .offset(offset)
      .all();

    return Response.json({
      posts: pagedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session?.user ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as any;
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      chapterId,
      seoTitle,
      metaDescription,
      publishedAt,
    } = body;

    if (!title || typeof title !== "string") {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    if (!content || typeof content !== "string") {
      return Response.json({ error: "Content is required" }, { status: 400 });
    }

    // Auto-generate or sanitize slug
    const cleanSlug = (slug && typeof slug === "string" ? slug : title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!cleanSlug) {
      return Response.json({ error: "Invalid or empty slug" }, { status: 400 });
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    let postPublishedAt = nowSeconds;

    if (publishedAt !== undefined && publishedAt !== null) {
      if (typeof publishedAt === "number" && !isNaN(publishedAt)) {
        postPublishedAt = publishedAt > 1e11 ? Math.floor(publishedAt / 1000) : Math.floor(publishedAt);
      } else if (typeof publishedAt === "string" && publishedAt.trim()) {
        const parsed = new Date(publishedAt).getTime();
        if (!isNaN(parsed)) {
          postPublishedAt = Math.floor(parsed / 1000);
        }
      }
    }

    const result = await db.insert(posts).values({
      title: title.trim(),
      slug: cleanSlug,
      excerpt: excerpt?.trim() || null,
      content,
      featuredImage: featuredImage?.trim() || null,
      chapterId: chapterId ? Number(chapterId) : null,
      seoTitle: seoTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      publishedAt: postPublishedAt,
      modifiedAt: nowSeconds,
    }).returning().get();

    return Response.json({ success: true, post: result });
  } catch (error: any) {
    console.error("Failed to create post:", error);
    const message = error?.message?.includes("UNIQUE constraint failed")
      ? "A post with this slug already exists"
      : "Failed to create post";
    return Response.json({ error: message }, { status: 500 });
  }
}

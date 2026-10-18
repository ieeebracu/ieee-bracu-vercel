import { db } from "@/db";
import { posts, postTags } from "@/db/schema/posts";
import { auth } from "@/lib/auth";
import { eq, and, ne } from "drizzle-orm";

interface RouteParams {
  params: Promise<{ id: string }>;
}

async function verifyWebmaster(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  const webmasterEmail = process.env.WEBMASTER_EMAIL;
  if (
    !session?.user ||
    !webmasterEmail ||
    session.user.email.toLowerCase() !== webmasterEmail.toLowerCase()
  ) {
    return null;
  }
  return session;
}

export async function GET(request: Request, context: RouteParams) {
  const session = await verifyWebmaster(request);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    return Response.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .get();

    if (!post) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json({ post });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return Response.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteParams) {
  const session = await verifyWebmaster(request);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    return Response.json({ error: "Invalid post ID" }, { status: 400 });
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

    // Sanitize slug
    const cleanSlug = (slug && typeof slug === "string" ? slug : title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!cleanSlug) {
      return Response.json({ error: "Invalid or empty slug" }, { status: 400 });
    }

    // Check if slug is used by another post
    const existingSlug = await db
      .select({ id: posts.id })
      .from(posts)
      .where(and(eq(posts.slug, cleanSlug), ne(posts.id, postId)))
      .get();

    if (existingSlug) {
      return Response.json(
        { error: "Another post already uses this URL slug" },
        { status: 400 }
      );
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    const updateValues: Record<string, any> = {
      title: title.trim(),
      slug: cleanSlug,
      excerpt: excerpt?.trim() || null,
      content,
      featuredImage: featuredImage?.trim() || null,
      chapterId: chapterId ? Number(chapterId) : null,
      seoTitle: seoTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      modifiedAt: nowSeconds,
    };

    if (publishedAt !== undefined && publishedAt !== null) {
      if (typeof publishedAt === "number" && !isNaN(publishedAt)) {
        updateValues.publishedAt = publishedAt > 1e11 ? Math.floor(publishedAt / 1000) : Math.floor(publishedAt);
      } else if (typeof publishedAt === "string" && publishedAt.trim()) {
        const parsed = new Date(publishedAt).getTime();
        if (!isNaN(parsed)) {
          updateValues.publishedAt = Math.floor(parsed / 1000);
        }
      }
    }

    const updatedPost = await db
      .update(posts)
      .set(updateValues)
      .where(eq(posts.id, postId))
      .returning()
      .get();

    if (!updatedPost) {
      return Response.json({ error: "Post not found" }, { status: 404 });
    }

    return Response.json({ success: true, post: updatedPost });
  } catch (error: any) {
    console.error("Failed to update post:", error);
    return Response.json({ error: error?.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: RouteParams) {
  const session = await verifyWebmaster(request);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    return Response.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    // Delete any tags cascade or explicit
    await db.delete(postTags).where(eq(postTags.postId, postId));
    await db.delete(posts).where(eq(posts.id, postId));

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return Response.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

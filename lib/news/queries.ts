import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  posts,
  chapters,
  tags,
  postTags,
} from "@/db/schema";

export async function getPosts() {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
      publishedAt: posts.publishedAt,
      chapter: chapters.name,
    })
    .from(posts)
    .leftJoin(chapters, eq(posts.chapterId, chapters.id))
    .orderBy(desc(posts.publishedAt), desc(posts.id));
}

export async function getLatestPosts(limit = 4) {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
      publishedAt: posts.publishedAt,
      chapter: chapters.name,
    })
    .from(posts)
    .leftJoin(chapters, eq(posts.chapterId, chapters.id))
    .orderBy(desc(posts.publishedAt), desc(posts.id))
    .limit(limit);
}

export async function getPostBySlug(slug: string) {
  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImage: posts.featuredImage,
      publishedAt: posts.publishedAt,
      modifiedAt: posts.modifiedAt,
      chapter: chapters.name,
      seoTitle: posts.seoTitle,
      metaDescription: posts.metaDescription,
    })
    .from(posts)
    .leftJoin(chapters, eq(posts.chapterId, chapters.id))
    .where(eq(posts.slug, slug))
    .get();

  if (!post) {
    return null;
  }

  const associatedTags = await db
    .select({
      id: tags.id,
      name: tags.name,
    })
    .from(postTags)
    .innerJoin(tags, eq(postTags.tagId, tags.id))
    .where(eq(postTags.postId, post.id));

  return {
    ...post,
    tags: associatedTags,
  };
}

export async function getPostById(id: number) {
  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      content: posts.content,
      featuredImage: posts.featuredImage,
      publishedAt: posts.publishedAt,
      modifiedAt: posts.modifiedAt,
      chapterId: posts.chapterId,
      chapter: chapters.name,
      seoTitle: posts.seoTitle,
      metaDescription: posts.metaDescription,
    })
    .from(posts)
    .leftJoin(chapters, eq(posts.chapterId, chapters.id))
    .where(eq(posts.id, id))
    .get();

  if (!post) {
    return null;
  }

  return post;
}
import {
  integer,
  sqliteTable,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const chapters = sqliteTable("chapters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),

  excerpt: text("excerpt"),
  content: text("content").notNull(),

  featuredImage: text("featured_image"),

  publishedAt: integer("published_at").notNull(),
  modifiedAt: integer("modified_at").notNull(),

  seoTitle: text("seo_title"),
  metaDescription: text("meta_description"),

  chapterId: integer("chapter_id").references(() => chapters.id),
});

export const postTags = sqliteTable(
  "post_tags",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),

    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.postId, table.tagId],
    }),
  }),
);
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const galleryPhotos = sqliteTable("gallery_photos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull().default("General"),
  year: text("year").notNull(),
  imageKey: text("image_key").notNull(),
  aspect: text("aspect").notNull().default("wide"),
  createdAt: integer("created_at").notNull(),
});

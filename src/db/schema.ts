import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const UrlsTable = pgTable("url", {
  id: integer("id").primaryKey(),
  originalUrl: text("originalUrl").notNull(),
  shortUrl: text("shortUrl").unique().notNull(),
  count: integer("count").notNull().default(0),
});

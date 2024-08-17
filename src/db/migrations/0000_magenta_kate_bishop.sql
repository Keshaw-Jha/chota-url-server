CREATE TABLE IF NOT EXISTS "url" (
	"id" integer PRIMARY KEY NOT NULL,
	"originalUrl" text NOT NULL,
	"shortUrl" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "url_shortUrl_unique" UNIQUE("shortUrl")
);

ALTER TABLE "books" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "sold_price" integer DEFAULT 0 NOT NULL;
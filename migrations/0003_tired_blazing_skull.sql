ALTER TABLE "books" ALTER COLUMN "rating" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "vinted_link" text NOT NULL;
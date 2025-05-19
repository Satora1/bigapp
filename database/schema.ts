import { desc } from "drizzle-orm";
import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  doublePrecision,
  date,
  char,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { totalmem } from "os";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  vintedNickname: varchar("vinted_nickname", { length: 255 }).notNull(),
  password: text("password").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});


export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    title: varchar("title", { length: 100 }).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  genre: varchar("genre", { length: 50 }).notNull(),
  price: doublePrecision("price").notNull(),
  soldPrice: doublePrecision("sold_price").notNull().default(0),
  priceBought: doublePrecision("price_bought").notNull().default(0),
  rating: integer("rating"),
  coverUrl: text("cover_url").notNull(),
  coverUrl2: text("cover_url2").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  description: text("description").notNull(),
  totalCopies: integer("total_copies").notNull().default(0),
  availableCopies: integer("available_copies").notNull().default(0),
  videoUrl: text("video_url").notNull(),
  summary: text("summary").notNull(),
  vintedLink: text("vinted_link").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

})

export const favorites = pgTable("favorites", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
    bookId: uuid("book_id").references(() => books.id).notNull(),
  coverUrl: text("cover_url").notNull(),
})

export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
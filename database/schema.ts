import { pgTable, varchar, uuid, text, integer, pgEnum } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("statsus", ["PENDING", "APPROVED", "REJECTED"])
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"])
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["BORROWED", "RETURNED"])

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    universityId: integer("university_id").notNull().unique(),
    password: text("password").notNull(),
    universityCard: text("university_card").notNull().unique(),
    status: ""
})
import { pgTable, varchar, uuid, text, integer, pgEnum } from "drizzle-orm/pg-core";

export STATUS_ENUM=pgEnum("statsus",["PENDING","APPROVED","REJECTED"])


export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: text("email").notNull().unique(),
    universityId: integer("university_id").notNull().unique(),
    password:text("password").notNull(),
    universityCard:text("university_card").notNull().unique(),
    status:""
})
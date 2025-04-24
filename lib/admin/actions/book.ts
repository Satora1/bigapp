"use server"

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { date } from "drizzle-orm/mysql-core"

export const createBook = async (params: BookParamas) => {
    try {
        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies,
        }).returning()
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0])),
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Error creating book"
        }
    }
}
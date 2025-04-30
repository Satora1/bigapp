"use server"

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"
import { eq } from "drizzle-orm"

export const borrowBook = async (params: BorrowBookParams) => {
    const { userId, bookId } = params
    
    try {
const book=await db.select({availableCopies:books.availableCopies})
.from(books).where(eq(books.id,bookId))
.limit(1)
if(!book.length||book[0].availableCopies<=0){
    return {
        success: false,
        error: "Book not available"
    }
}
const dueDate = new Date()

    } catch (error) {
        console.log(error)
        return {
            sucess: false,
            error: "Something went wrong"
        }
    }
} 

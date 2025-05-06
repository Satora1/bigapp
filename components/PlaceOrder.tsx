"use client"
import React from 'react'
import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { Button } from './ui/button'

interface Props {
    id: string;
}

const PlaceOrder: React.FC<Props> = ({ id }) => {
    const placeOrder = async () => {
        const book = await db
            .select()
            .from(books)
            .where(eq(books.id, id))
            .limit(1)

        if (book.length > 0) {
            const currentTotalCopies = book[0].totalCopies
            const newTotalCopies = currentTotalCopies - 1

            await db
                .update(books)
                .set({ totalCopies: newTotalCopies })
                .where(eq(books.id, id))

            console.log(`Updated totalCopies to ${newTotalCopies}`)
        } else {
            console.log("Book not found")
        }
    }

    return (
        <Button onClick={placeOrder}>
            Place order
        </Button>
    )
}

export default PlaceOrder
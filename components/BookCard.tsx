import Link from 'next/link'
import React from 'react'
import BookCover from '@/components/BookCover'

const BookCard = ({ id, title, genre, color, cover, isLoanedBook = false }: Book) => {
    (
        <li>
            <Link href={`/books/${id}`}>
                <BookCover coverColor={color} coverImage={cover} />
            </Link>
        </li>
    )
}

export default BookCard
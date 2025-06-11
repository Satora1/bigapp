import React from 'react';
import { Button } from './ui/button';
import BookCover from './BookCover';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { favorites, users } from '@/database/schema';
import Link from 'next/link';

import Favorites from './Favorites';
import RemoveFavorites from './RemoveFavorites';
import BuyRequestForm from '@/app/admin/forms/BuyRequestForm';

interface Props extends Book {
  userId: string;
  favoriteId: string;
}

const BookOverview = async ({
  id,
  userId,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  vintedLink,
  coverUrl2,
  isSold,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) return null;

  const [favorite] = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, user.id))
    .where(eq(favorites.bookId, id))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === 'APPROVED',
    message:
      availableCopies <= 0
        ? 'Book is not available'
        : 'You are not eligible to borrow this book',
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            Made By{' '}
            <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{' '}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>
        </div>

        <div className="book-copies">
          <p>
            Items: <span>{totalCopies}</span>
          </p>
          <p className="flex items-center gap-2">
            Availability:
            {!isSold ? (
              <img
                src="/icons/tick.svg"
                alt="available"
                className="w-8 h-8"
              />
            ) : (
              <img
                src="/icons/warning.svg"
                alt="sold"
                className="w-8 h-8"
              />
            )}
          </p>
        </div>

        <p className="book-description">{description}</p>

        <ul className="flex flex-row gap-10">
          <li>
            <Button asChild className="h-20 w-50 px-12">
              <Link
                href={vintedLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-xl mr-5">Link to Offer</div>
                <img
                  src="/icons/receipt.svg"
                  alt="receipt"
                  className="w-10 h-10"
                />
              </Link>
            </Button>
          </li>

 <li>
  <Button variant="secondary" className="h-20 w-50 px-10 flex items-center gap-3">
    {favorite ? (
      <RemoveFavorites userId={user.id} bookId={id} />
    ) : (
      <Favorites userId={user.id} bookId={id} coverUrl={coverUrl} />
    )}
  </Button>
</li>

          <li>
            <BuyRequestForm
              userId={user.id}
              bookId={id}
              coverUrl={coverUrl}
              vintedNickname={user.vintedNickname}
            />
          </li>
        </ul>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="customSize"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
            coverImage2={coverUrl2}
          />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;

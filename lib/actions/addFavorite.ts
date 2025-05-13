"use server";

import { db } from '@/database/drizzle';
import { favorites } from '@/database/schema';
import { eq, and } from 'drizzle-orm';

interface Props {
  userId: string;
  bookId: string;
  coverUrl: string;
}

const addFavorite = async ({ userId, bookId, coverUrl }: Props) => {
  try {
    // Sprawdź, czy już istnieje ulubiony rekord
    const existing = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.bookId, bookId)));

    if (existing.length > 0) {
      console.log("Already in favorites");
      return existing[0].id; // możesz zwrócić istniejący id, jeśli chcesz
    }

    // Wstaw nowy ulubiony rekord
    const inserted = await db.insert(favorites).values({
      userId,
      bookId,
      coverUrl,
    }).returning({ id: favorites.id });

    console.log("Added to favorites");
    return inserted[0].id;

  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};

export default addFavorite;

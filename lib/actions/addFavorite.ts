"use server"  // Wskazujemy, że ta funkcja działa po stronie serwera

import { db } from '@/database/drizzle'
import { favorites } from '@/database/schema'

interface Props {
  userId: string;
  bookId: string;
}

const addFavorite = async ({ userId, bookId }: Props) => {
  try {
    await db.insert(favorites).values({
      userId: userId,
      bookId: bookId,
    });
    console.log("Added to favorites");
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
};

export default addFavorite;

"use server";

import { db } from "@/database/drizzle";
import { favorites } from "@/database/schema";
import { eq, and } from "drizzle-orm";

interface RemoveFavoritesProps {
  userId: string;
  bookId: string;
}

const removeFromFavorites = async ({ userId, bookId }: RemoveFavoritesProps) => {
  try {
 await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.bookId, bookId)));
;

    console.log("Removed from favorites");
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw error;
  }
};

export default removeFromFavorites;
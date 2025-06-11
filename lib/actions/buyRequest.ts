"use server";

import { db } from '@/database/drizzle';
import { buyRequest } from '@/database/schema';

import { eq, and } from 'drizzle-orm';

interface Props {
  userId: string;
  bookId: string;
  coverUrl: string;
  vintedNickname: string;
}

const buyRequests = async ({ userId, bookId, coverUrl,vintedNickname }: Props) => {
  try {
    // Sprawdź, czy już istnieje ulubiony rekord
    const existing = await db
      .select()
      .from(buyRequest)
      .where(and(eq(buyRequest.userId, userId), eq(buyRequest.bookId, bookId)));

    if (existing.length > 0) {
      console.log("Already Requested");
      return existing[0].id; // możesz zwrócić istniejący id, jeśli chcesz
    }

    // Wstaw nowy ulubiony rekord
    const inserted = await db.insert(buyRequest).values({
      userId,
      bookId,
      coverUrl,
        vintedNickname,
    }).returning({ id: buyRequest.id });

    console.log("Added to buy requests:", inserted[0]);
    return inserted[0].id;

  } catch (error) {
    console.error("Error adding to buy:", error);
    throw error;
  }
};

export default buyRequests;

"use server";

import { db } from '@/database/drizzle';
import { supportMessages } from '@/database/schema';

import { eq, and } from 'drizzle-orm';

interface Props {
    userId: string;
    nickname: string;
    message: string;
    createdAt: Date;
}

const SuportMessageAction = async ({ userId, nickname, message,createdAt}: Props) => {
    try {
        // Sprawdź, czy już istnieje ulubiony rekord
        // const existing = await db
        //     .select()
        //     .from(buyRequest)
        //     .where(and(eq(buyRequest.userId, userId), eq(buyRequest.bookId, bookId)));

        // if (existing.length > 0) {
        //     console.log("Already Requested");
        //     return existing[0].id; // możesz zwrócić istniejący id, jeśli chcesz
        // }

        // Wstaw nową wiadomość
        const inserted = await db.insert(supportMessages).values({
            userId,
            nickname,
            message,
            createdAt
            
        }).returning({ id: supportMessages.id });

        console.log("Message sended:", inserted[0]);
        return inserted[0].id;

    } catch (error) {
        console.error("Error Message Lost:", error);
        throw error;
    }
};

export default SuportMessageAction;

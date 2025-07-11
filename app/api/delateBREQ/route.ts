import { db } from "@/database/drizzle"
import { buyRequest } from "@/database/schema"
import { eq, and } from "drizzle-orm"

export async function DELETE(req: Request) {
    const { userId, bookId } = await req.json()

    try {
        await db.delete(buyRequest).where(
            and(eq(buyRequest.userId, userId), eq(buyRequest.bookId, bookId))
        )
        return new Response("Favorite removed", { status: 200 })
    } catch (error) {
        console.error("Error removing favorite:", error)
        return new Response("Error removing favorite", { status: 500 })
    }
}

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const bookId = params.id;

  try {
    const body = await req.json();
    const { soldPrice, isSold } = body;

    if (typeof soldPrice !== "number" || typeof isSold !== "boolean") {
      return new Response("Invalid data", { status: 400 });
    }

    const result = await db
      .update(books)
      .set({ soldPrice, isSold })
      .where(eq(books.id, bookId))
      .returning();

    if (!result[0]) {
      return new Response("Not found", { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error("PATCH error:", error);
    return new Response("Server error", { status: 500 });
  }
}

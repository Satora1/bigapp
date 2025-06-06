import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    const body = await req.json();
    const { status, role } = body;

    // Replace these with your actual allowed values
    const allowedStatuses = ["PENDING", "APPROVED", "REJECTED"];
    const allowedRoles = ["ADMIN", "USER", "GUEST"];

    if (!allowedStatuses.includes(status) || !allowedRoles.includes(role)) {
      return new Response("Invalid data", { status: 400 });
    }

    const result = await db
      .update(users)
      .set({ status, role })
      .where(eq(users.id, userId))
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

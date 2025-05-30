import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Button } from "../../ui/button";
import { auth } from "@/auth";
import Link from "next/link";

const AdminButton = async () => {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) return null;

    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

    const isAdmin = user?.role === "ADMIN";
    if (!isAdmin) return null;

    return (
        <form>
            <Button className="h-20 w-40">

                <Link href="/admin"><h2 className="text-xl bold">
                    Admin </h2></Link>
            </Button>
        </form>
    );
};

export default AdminButton;


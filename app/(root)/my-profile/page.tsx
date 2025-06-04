import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { db } from "@/database/drizzle";
import { books, favorites, users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Page = async () => {
  const session = await auth();
  if (!session?.user) return <p className="text-white">You must be signed in.</p>;
  const favs = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      coverUrl: books.coverUrl,
    })
    .from(favorites)
    .innerJoin(books, eq(favorites.bookId, books.id))
    .where(eq(favorites.userId, session.user.id));



  return (
    <div className="min-h-screen flex flex-col px-4">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
      </form>

      <BookList title="Your Favorites" books={favs} />
     

      <div className="text-xl mt-10">
        <h2 className="text-white">Satora.shop ®</h2>
      </div>
    </div>
  );

};
export default Page;
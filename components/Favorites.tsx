"use client";

import React, { useState } from "react";
import addFavorite from "@/lib/actions/addFavorite";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface FavoritesProps {
  userId: string;
  bookId: string;
  coverUrl: string;
}

const Favorites: React.FC<FavoritesProps> = ({ userId, bookId, coverUrl }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleAddFavorite = async () => {
    try {
      await addFavorite({ userId, bookId, coverUrl });
      setIsFavorite(true);

      // Odświeżenie strony (np. by pobrać dane na nowo)
      router.refresh();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <Button
      onClick={handleAddFavorite}
      className="cursor-pointer h-20 w-25 "
      disabled={isFavorite}
    >
      <div className='flex flex-row items-center justify-center mr-5'>
        <span className="text-base text-xl">
          {isFavorite ? "Already in favorites" : "Add to favorites"}
        </span>
        <img
          src={"/icons/add.svg"}
          alt=""
          className="w-20 h-20"
        />


      </div>

    </Button>
  );
};

export default Favorites;

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
      <img
        src={ "/icons/add.svg"}
        alt=""
        className="w-20 h-20"
      />
      <span className="text-base ">
        {isFavorite ? "Already in favorites" : "Add to favorites"}
      </span>
    </Button>
  );
};

export default Favorites;

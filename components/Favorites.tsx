"use client"  

import React, { useState } from 'react'
import addFavorite from '@/lib/actions/addFavorite'  
import { Button } from './ui/button';

interface FavoritesProps {
  userId: string;
  bookId: string;
}

const Favorites: React.FC<FavoritesProps> = ({ userId, bookId }) => {
  const [isFavorite, setIsFavorite] = useState(false); 

  const handleAddFavorite = async () => {
    try {
      await addFavorite({ userId, bookId });
      setIsFavorite(true); 
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <Button onClick={handleAddFavorite} className="cursor-pointer h-20 w-40 px-12" disabled={isFavorite}>
      {isFavorite ? 'Already in favorites'  : 'Add to favorites'}
    </Button>
  );
};

export default Favorites;

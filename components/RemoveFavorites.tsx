"use client"  

import React, { useState } from 'react'
import { Button } from './ui/button';
import removeFromFavorites from '@/lib/actions/removeFromFav';

interface RemoveFavoritesProps {
  id:string
}

const RemoveFavorites: React.FC<RemoveFavoritesProps> = ({ id}) => {
  const [isFavorite, setIsFavorite] = useState(false); 

  const handleRemoveFavorite = async () => {
    try {
      await removeFromFavorites({ id });
      setIsFavorite(false); 
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <Button onClick={handleRemoveFavorite} className="cursor-pointer h-20 w-40 px-12" disabled={isFavorite}>
      {isFavorite ? 'Already in favorites'  : 'Add to favorites'}
    </Button>
  );
};

export default RemoveFavorites;

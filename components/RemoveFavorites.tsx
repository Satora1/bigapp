"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import removeFromFavorites from '@/lib/actions/removeFromFav'

interface RemoveFavoritesProps {
    userId: string
    bookId: string
}

const RemoveFavorites: React.FC<RemoveFavoritesProps> = ({ userId, bookId }) => {
    const [isRemoved, setIsRemoved] = useState(false)

    const handleRemoveFavorite = async () => {
        try {
            await fetch("/api/favorites", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, bookId }),
            })
            setIsRemoved(true)
            window.location.reload()
        } catch (error) {
            console.error("Error removing from favorites:", error)
        }
    }

    return (
        <Button
            onClick={handleRemoveFavorite}
            className="cursor-pointer h-20 w-40 px-12"
            disabled={isRemoved}

        >
            {isRemoved ? 'Removed from favorites' : 'Remove from favorites'}
        </Button>
    )
}

export default RemoveFavorites

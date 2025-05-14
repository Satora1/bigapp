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
            className="cursor-pointer h-20 w-25 "
            disabled={isRemoved}

        ><div className='flex flex-row items-center justify-center mr-5 text-xl'>
                {'Remove from favorites'}

                <img
                    src={"/icons/remove.svg"}
                    alt=""
                    className="w-20 h-20"
                />

            </div>

        </Button>
    )
}

export default RemoveFavorites

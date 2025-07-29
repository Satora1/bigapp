"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'

interface RemoveItemProps {
    userId: string
    bookId: string
}

const RemoveItem: React.FC<RemoveItemProps> = ({ userId, bookId }) => {

    const handleRemoveItem = async () => {
        try {
            await fetch("/api/delateBREQ", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, bookId }),
            })
            window.location.reload()
        } catch (error) {
            console.error("Error removing from favorites:", error)
        }
    }

    return (
<Button
  onClick={handleRemoveItem}
  className="cursor-pointer h-20 w-40 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition-colors duration-300"
>
  <div className="text-xl font-semibold select-none">
    Delete
  </div>
</Button>

    )
}

export default RemoveItem

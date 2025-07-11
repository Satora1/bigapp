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
            className="cursor-pointer h-20 w-25 "
        ><div className='flex flex-row items-center justify-center ml-3 text-xl'>
               

                <img
                    src={"/icons/add.svg"}
                    alt=""
                    className="w-20 h-20"
                />

            </div>

        </Button>
    )
}

export default RemoveItem

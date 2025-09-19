import HandleRemoveItem from '@/components/DelateBuyRequest'
import RemoveItem from '@/components/DelateBuyRequest'
import ImageForAdmin from '@/components/ImageForAdmin'
import RemoveFavorites from '@/components/RemoveFavorites'
import { db } from '@/database/drizzle'
import { buyRequest } from '@/database/schema'
import React from 'react'

const page = async () => {
  const items = await db.select().from(buyRequest)


  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2 md:px-8">
      <h1 className="text-xl font-bold text-gray-800 mb-4">📥 Lista zapytań o zakup</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition text-sm flex flex-col items-center space-y-4 bg-gray-200"
          >
            {/* Obrazek */}
            <div className="aspect-[3/4] overflow-hidden rounded-md max-w-[300px] w-full mt-10">
              <ImageForAdmin coverImage={item.coverUrl} />
            </div>

            {/* Informacje */}
            <div className="w-full text-center space-y-1 ">
              <h2 className="text-sm font-medium text-gray-800 break-all">🧑 User ID: {item.id}</h2>
              <p className="text-xs text-gray-600">
                📚Item ID: <span className="font-medium text-gray-800">{item.bookId}</span>
              </p>
              <p className="text-xs text-gray-600">
                🔖 Vinted Nickname: <span className="font-medium text-gray-800">{item.vintedNickname}</span>
              </p>
            </div>

            {/* Przycisk */}
            <HandleRemoveItem userId={item.userId} bookId={item.bookId} />
          </li>


        ))}
      </ul>
    </div>

  )
}

export default page

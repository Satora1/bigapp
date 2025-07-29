import RemoveItem from '@/components/DelateBuyRequest'
import ImageForAdmin from '@/components/ImageForAdmin'
import RemoveFavorites from '@/components/RemoveFavorites'
import { db } from '@/database/drizzle'
import { buyRequest } from '@/database/schema'
import React from 'react'

const page = async () => {
  const items = await db.select().from(buyRequest)

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📥 Lista zapytań o zakup</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">🧑 User ID: {item.id}</h3>
              <p className="text-sm text-gray-600">📚Item ID: <span className="font-medium text-gray-800">{item.bookId}</span></p>

              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <ImageForAdmin coverImage={item.coverUrl} />
              </div>

              <p className="text-sm text-gray-600">🔖 Vinted Nickname: <span className="font-medium text-gray-800">{item.vintedNickname}</span></p>

            </div>
            <RemoveItem userId={item.userId} bookId={item.bookId} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default page

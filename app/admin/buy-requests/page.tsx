import HandleRemoveItem from '@/components/DelateBuyRequest'
import ImageForAdmin from '@/components/ImageForAdmin'
import { db } from '@/database/drizzle'
import { buyRequest } from '@/database/schema'
import React from 'react'

const Page = async () => {
  const items = await db.select().from(buyRequest)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 py-10 px-6 md:px-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-md">
        📥 Lista zapytań o zakup
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Brak zapytań</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white shadow-xl rounded-3xl p-6 border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center space-y-5"
            >
              {/* Obrazek */}
              <div className="aspect-[3/4] overflow-hidden rounded-2xl w-full max-w-[280px] border border-gray-200">
                <ImageForAdmin coverImage={item.coverUrl} />
              </div>

              {/* Informacje */}
              <div className="w-full text-center space-y-2">
                <h2 className="text-base font-semibold text-gray-900 break-all">🧑 User ID: {item.id}</h2>
                <p className="text-sm text-gray-700">
                  📚 Item ID: <span className="font-medium text-gray-800">{item.bookId}</span>
                </p>
                <p className="text-sm text-gray-700">
                  🔖 Vinted Nickname: <span className="font-medium text-gray-800">{item.vintedNickname}</span>
                </p>
              </div>

              {/* Przycisk */}
              <div className="w-full flex justify-center">
                <HandleRemoveItem userId={item.userId} bookId={item.bookId} />
              </div>
            </li>
          ))} 
        </ul>
      )}
    </div>
  )
}

export default Page
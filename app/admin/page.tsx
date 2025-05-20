import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import React from 'react'

const Page = async () => {
  const items = await db.select().from(books)

  const totalSpent = items.reduce((sum, item) => sum + Number(item.priceBought || 0), 0)
  const totalProfit = items.reduce((sum, item) =>
    sum + (Number(item.soldPrice || 0) - Number(item.priceBought || 0)), 0)

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard administratora</h1>

      <section className="grid gap-6 mb-10 md:grid-cols-2">
        <div className="rounded-lg bg-blue-100 p-4 text-blue-900 shadow-md w-fit">
          <h2 className="text-xl font-semibold mb-1">💰 Łączny koszt zakupów</h2>
          <p className="text-lg font-medium">
            {totalSpent.toFixed(2)} zł
          </p>
        </div>
        <div className="rounded-lg bg-green-100 p-4 text-green-900 shadow-md w-fit">
          <h2 className="text-xl font-semibold mb-1">📈 Łączny zysk</h2>
          <p className="text-lg font-medium">
            {totalProfit.toFixed(2)} zł
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">📦 Lista produktów</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => {
            const bought = Number(item.priceBought || 0)
            const sold = Number(item.soldPrice || 0)
            const profit = sold - bought

            return (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-white shadow border border-gray-200"
              >
                <h3 className="text-md font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-700 mb-1">{item.description}</p>
                <p className="text-gray-700">💵 Cena zakupu: <span className="font-semibold">{bought.toFixed(2)} zł</span></p>
                <p className="text-gray-700">💸 Cena sprzedaży: <span className="font-semibold">{sold.toFixed(2)} zł</span></p>
                <p className={`text-sm font-bold mt-1 ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Zysk: {profit.toFixed(2)} zł
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Page

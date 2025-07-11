import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import React from 'react'

const Page = async () => {
  const items = await db.select().from(books)

  const totalBoughtPrice = items.filter(item => !item.isSold).reduce((sum, item) => sum + ((item.price || 0) * (item.totalCopies)), 0)

  const priceNotSoldItems = items.filter(item => !item.isSold).reduce((sum, item) => sum + (item.price || 0), 0)

  const totalSpent = items.reduce((sum, item) => sum + Number(item.priceBought || 0) * Number(item.totalCopies || 0), 0)

  const totalProfit = items.reduce(
    (sum, item) => sum + (Number(item.soldPrice || 0) - Number(item.priceBought || 0)) * Number(item.totalCopies || 0),
    0
  )

  const totalSoldItems = items.reduce(
    (sum, item) => item.isSold ? sum + (item.totalCopies || 0) : sum,
    0
  );

  const bestSold = items.reduce((sum, item) => sum + (Number(item.price || 0) - Number(item.priceBought || 0)) * Number(item.totalCopies || 0), 0) - priceNotSoldItems

  const bruttoZysk = items.reduce((sum, item) => sum + Number(item.soldPrice || 0) * Number(item.totalCopies || 0), 0)

  const bruttoSZ = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.totalCopies || 0), 0)

  const fixedBSZ = bruttoSZ - totalBoughtPrice

  const stats = [
    { label: '💰 Łączny koszt zakupów', value: totalSpent, bg: 'bg-blue-200', text: 'text-blue-900' },
    { label: '📈 Zysk Brutto', value: bruttoZysk, bg: 'bg-green-200', text: 'text-green-900' },
    { label: '📈 Zysk sugerowany Brutto', value: fixedBSZ, bg: 'bg-green-200', text: 'text-green-900' },
    { label: '📈 Łączny sugerowany zysk', value: bestSold, bg: 'bg-orange-200', text: 'text-orange-900' },
    { label: '📈 Łączny zysk', value: totalProfit, bg: 'bg-green-200', text: 'text-green-900' },
    { label: '📈 Ile się sprzedało', value: totalSoldItems, bg: 'bg-green-200', text: 'text-green-900' },
    { label: '📈 Średni zysk', value: totalProfit / totalSoldItems, bg: 'bg-green-200', text: 'text-green-900' },
    { label: '📈 Średnia cena', value: bruttoZysk / totalSoldItems, bg: 'bg-green-200', text: 'text-green-900' },



  ]

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard administratora</h1>

      <section className="grid gap-6 mb-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`rounded-lg p-4 shadow-md w-full ${stat.bg} ${stat.text}`}
          >
            <h2 className="text-lg font-semibold mb-1">{stat.label}</h2>
            <p className="text-lg font-bold">{stat.value.toFixed(2)} zł</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">📦 Lista produktów</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const bought = Number(item.priceBought || 0) * Number(item.totalCopies || 0)
            const sold = Number(item.soldPrice || 0) * Number(item.totalCopies || 0)
            let profit = sold - bought
            if (profit < 0) {
              profit = 0
            }
            else {
              profit = profit
            }
            return (
              <div
                key={item.id}
                className={`p-4 rounded-lg shadow border border-gray-200 ${item.isSold ? 'bg-green-100' : 'bg-red-100'}`}
              >
                <h3 className="text-md font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-700 mb-1">{item.description}</p>
                <p className="text-gray-700">
                  💵 Cena zakupu: <span className="font-semibold">{bought.toFixed(2)} zł</span>
                </p>
                <p className="text-gray-700">
                  💸 Cena sprzedaży: <span className="font-semibold">{sold.toFixed(2)} zł</span>
                </p>
                <p className={`text-sm font-bold mt-1 ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Zysk: {profit.toFixed(2)} zł
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  📦 Liczba egzemplarzy: {item.totalCopies}
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

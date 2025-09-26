import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import React from 'react'
import SortForItemsOnPage from '@/components/admin/SearchComponents/SortForItemsOnPage'

const Page = async () => {
  const items = await db.select().from(books)

  // tu zostaje twoja logika dla stats
  const totalSpent = items.reduce((sum, item) => sum + Number(item.priceBought || 0) * Number(item.totalCopies || 0), 0)
  const totalBoughtPrice = items.filter(item => !item.isSold).reduce((sum, item) => sum + ((item.price || 0) * (item.totalCopies)), 0)
  const priceNotSoldItems = items.filter(item => !item.isSold).reduce((sum, item) => sum + (item.price || 0), 0)
  const totalProfit = items.reduce((sum, item) => sum + (Number(item.soldPrice || 0) - Number(item.priceBought || 0)) * Number(item.totalCopies || 0), 0)
  const totalSoldItems = items.reduce((sum, item) => item.isSold ? sum + (item.totalCopies || 0) : sum, 0);
  const bestSold = items.reduce((sum, item) => sum + (Number(item.price || 0) - Number(item.priceBought || 0)) * Number(item.totalCopies || 0), 0) - priceNotSoldItems
  const bruttoZysk = items.reduce((sum, item) => sum + Number(item.soldPrice || 0) * Number(item.totalCopies || 0), 0)
  const bruttoSZ = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.totalCopies || 0), 0)
  const fixedBSZ = bruttoSZ - totalBoughtPrice

  const stats = [{ label: '💰 Łączny koszt zakupów', value: totalSpent, bg: 'bg-blue-200', text: 'text-blue-900' },
  { label: '📈 Zysk Brutto', value: bruttoZysk, bg: 'bg-green-200', text: 'text-green-900' },
  { label: '📈 Zysk sugerowany Brutto', value: fixedBSZ, bg: 'bg-green-200', text: 'text-green-900' },
  { label: '📈 Łączny sugerowany zysk', value: bestSold, bg: 'bg-orange-200', text: 'text-orange-800' },
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

      <SortForItemsOnPage items={items} />
    </main>
  )
}

export default Page

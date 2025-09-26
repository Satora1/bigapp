import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import React from 'react'
import SortForItemsOnPage from '@/components/admin/SearchComponents/SortForItemsOnPage'

const Page = async () => {
  const items = await db.select().from(books)

  // tu zostaje twoja logika dla stats
  const totalSpent = items.reduce((sum, item) => sum + Number(item.priceBought || 0) * Number(item.totalCopies || 0), 0)

  const stats = [
    { label: '💰 Łączny koszt zakupów', value: totalSpent, bg: 'bg-blue-200', text: 'text-blue-900' },
    // itd...
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

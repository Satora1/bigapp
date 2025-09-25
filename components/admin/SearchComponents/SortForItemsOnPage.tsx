"use client"
import React, { useState } from 'react'



interface AdminSortProps {
  items: Book[];
}

const SortForItemsOnPage = ({ items }: AdminSortProps) => {
  const [sortOption, setSortOption] = useState('profitDesc')

  const sortedItems = [...items].sort((a, b) => {
    const profitA = (Number(a.soldPrice || 0) - Number(a.priceBought || 0)) * (a.totalCopies || 0)
    const profitB = (Number(b.soldPrice || 0) - Number(b.priceBought || 0)) * (b.totalCopies || 0)

    if (sortOption === 'profitDesc') return profitB - profitA
    if (sortOption === 'profitAsc') return profitA - profitB
    if (sortOption === 'copiesDesc') return (b.totalCopies || 0) - (a.totalCopies || 0)
    if (sortOption === 'copiesAsc') return (a.totalCopies || 0) - (b.totalCopies || 0)
    return 0
  })

  return (
    <div>
      {/* select do sortowania */}
      <div className="mb-6">
        <label htmlFor="sort" className="mr-2 font-semibold">Sortuj według:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded p-2"
        >
          <option value="profitDesc">Największy zysk</option>
          <option value="profitAsc">Najmniejszy zysk</option>
          <option value="copiesDesc">Najwięcej sztuk</option>
          <option value="copiesAsc">Najmniej sztuk</option>
        </select>
      </div>

      {/* lista produktów */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedItems.map((item) => {
          const bought = Number(item.priceBought || 0) * Number(item.totalCopies || 0)
          const sold = Number(item.soldPrice || 0) * Number(item.totalCopies || 0)
          const profit = Math.max(sold - bought, 0)

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg shadow border border-gray-200 ${item.isSold ? 'bg-green-100' : 'bg-red-100'}`}
            >
              <h3 className="text-md font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-700 mb-1">{item.description}</p>
              <p className="text-gray-700">💵 Cena zakupu: <span className="font-semibold">{bought.toFixed(2)} zł</span></p>
              <p className="text-gray-700">💸 Cena sprzedaży: <span className="font-semibold">{sold.toFixed(2)} zł</span></p>
              <p className={`text-sm font-bold mt-1 ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                Zysk: {profit.toFixed(2)} zł
              </p>
              <p className="text-sm text-gray-600 mt-1">📦 Liczba egzemplarzy: {item.totalCopies}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SortForItemsOnPage

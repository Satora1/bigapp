import { db } from '@/database/drizzle'
import { supportMessages } from '@/database/schema'
import React from 'react'
import { format } from 'date-fns'

const Page = async () => {
  const mails = await db.select().from(supportMessages)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 md:px-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-sm">
        📥 Lista zapytań Supportu
      </h1>

      {mails.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Brak zapytań</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mails.map((mail) => (
            <li
              key={mail.id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 text-sm flex flex-col space-y-4 hover:-translate-y-1"
            >
              {/* Avatar placeholder */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                  {mail.nickname ? mail.nickname[0].toUpperCase() : "?"}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-800 break-all">{mail.nickname}</h2>
                  {mail.createdAt && (
                    <p className="text-xs text-gray-500">
                      {format(new Date(mail.createdAt), 'dd.MM.yyyy HH:mm')}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {mail.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Page
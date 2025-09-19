import { auth } from '@/auth'
import Header from '@/components/Header'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { after } from 'next/server'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth()
    if (!session) redirect("/sign-in");



    after(async () => {
        if (!session?.user?.id) return;

        //get user and see if last activiti is toady
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, session?.user?.id))
            .limit(1)

        if (user[0].lastActivityDate === new Date()
            .toISOString()
            .slice(0, 10)) return;

        await db.update(users).set({
            lastActivityDate: new Date()
                .toISOString()
                .slice(0, 10)
        }).where(eq(users.id, session?.user?.id))
    })

return (
  <main className="root-container flex flex-col lg:flex-row min-h-screen">
    {/* Lewy bok */}
    <aside className="hidden lg:flex w-52 shrink-0 items-start justify-start p-4 bg-gray-50">
      <div className="sticky top-20 w-full text-center">
        <p className="text-lg font-bold text-gray-700">Twoja reklama</p>
      </div>
    </aside>

    {/* Główny content */}
    <div className="flex-1">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </div>

    {/* Prawy bok */}
    <aside className="hidden lg:flex w-52 shrink-0 items-start justify-end p-4 bg-gray-50">
      <div className="sticky top-20 w-full text-center">
        <p className="text-lg font-bold text-gray-700">Twoja reklama</p>
      </div>
    </aside>
  </main>
)


}

export default Layout
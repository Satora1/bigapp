
import ImageForAdmin from '@/components/ImageForAdmin';
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books } from '@/database/schema'
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";

import Link from 'next/link'
import React from 'react'

const Page = async () => {
    const items = await db.select().from(books).limit(10)
    return (
        <section className='w-full rounded-2xl bg-white p-7'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <h2 className='text-xl font-semibold'>
                    Wszystkie pozycje
                </h2>
                <Button className='bg-primary-admin' asChild>
                    <Link href="/admin/books/new" className='text-white'>
                        + Utwórz nową pozycję
                    </Link>
                </Button>
            </div>
            <div className='mt-7 w-full overflow-hidden'>
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="p-4 mb-10 rounded-md bg-gray-100 text-black shadow w-[500px]">
                             <div className='flex flex-row'>
                            <div className="ml-2 flex flex-col gap-2">
                                <p><strong>ID:</strong> {item.id}</p>
                                <p><strong>Tytuł:</strong> {item.title}</p>
                            </div>
                           
                                <ImageForAdmin coverImage={item.coverUrl} />
                            </div>
                            
                        </li>

                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Page

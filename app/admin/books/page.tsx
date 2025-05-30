import AdminBooksClient from '@/components/admin/SearchComponents/AdminClientItems';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';

const Page = async () => {
    const items = await db.select().from(books).limit(100); // można więcej

    return (
        <section className="w-full rounded-2xl bg-white p-7">
            <AdminBooksClient items={items} />
        </section>
    );
};

export default Page;

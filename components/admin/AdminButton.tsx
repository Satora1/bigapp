import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import AdminButton from './AdminButtonComponent';
import { is } from 'drizzle-orm';

const AdminButtonWrapper = async () => {
  const [user] = await db.select().from(users);
  const isAdmin = user?.role == "ADMIN";
if(!isAdmin) return <></>;
else if (isAdmin) {
  return <AdminButton isAdmin={true} />;
}

};

export default AdminButtonWrapper;

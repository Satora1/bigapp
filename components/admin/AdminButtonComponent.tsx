"use client"

import { Button } from '../ui/button';
import Link from 'next/link';

interface AdminButtonProps {
  isAdmin: boolean;
}

const AdminButton = ({ isAdmin }: AdminButtonProps) => {
  if (!isAdmin) return null;

  return (
    <form>
      <Button className="h-20 w-40">
        <Link href="/admin">Admin</Link>
      </Button>
    </form>
  );
};

export default AdminButton;

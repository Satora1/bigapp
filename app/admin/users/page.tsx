import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import React from 'react';

const Users = async () => {
    const data = await db.select().from(users).limit(10);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Users List</h1>
            <ul className="space-y-2">
                {data.map((user) => (
                    <li
                        key={user.id}
                        className="p-4 rounded-md bg-gray-100 text-black shadow w-[500px]"
                    >
                        <p className='ml-2'><strong>ID:</strong> {user.id}</p>
                        <p className='ml-2'><strong>Name:</strong> {user.fullName}</p>
                        <p className='ml-2'><strong>Email:</strong> {user.email}</p>
                        <p
                            className={` p-2 rounded-md text-white  ${user.status?.toLowerCase() === 'approved'
                                    ? 'bg-green-500'
                                    : user.status?.toLowerCase() === 'pending'
                                        ? 'bg-yellow-500'
                                        : user.status?.toLowerCase() === 'rejected'
                                            ? 'bg-red-500'
                                            : 'bg-gray-500' // default background color for other status values
                                }`}
                        >
                            <strong>Status:</strong> {user.status}
                        </p>
                        <p className='ml-2'><strong>Staus:</strong> {user.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;

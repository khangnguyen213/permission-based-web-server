import React from 'react';
import UserTable from './components/user-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

function User() {
  return (
    <div className="w-[80%] mx-auto">
      <Link href="/dashboard">
        <Button>
          <ArrowLeftIcon /> Back
        </Button>
      </Link>
      <h1 className="text-2xl py-8">User Page</h1>
      <UserTable />
    </div>
  );
}

export default User;

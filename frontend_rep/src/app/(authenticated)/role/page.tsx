import React from 'react';
import RoleTable from './components/role-table';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function Role() {
  return (
    <div className="w-[80%] mx-auto">
      <Link href="/dashboard">
        <Button>
          <ArrowLeftIcon /> Back
        </Button>
      </Link>
      <h1 className="text-2xl py-8">Role Page</h1>
      <RoleTable />
    </div>
  );
}

export default Role;

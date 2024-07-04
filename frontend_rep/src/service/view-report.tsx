import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function ViewReport() {
  const baseURL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.PUBLIC_API_URL ||
    'http://localhost:3000';
  return (
    <Link href={baseURL + '/pdf/view'} target="_blank">
      <Button>User Report</Button>
    </Link>
  );
}

export default ViewReport;

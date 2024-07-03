'use client';

import { useAppSelector } from '@/store/reduxHook';
import { useEffect } from 'react';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionStore = useAppSelector((state) => state.session);
  useEffect(() => {
    if (sessionStore.data) {
      window.location.href = '/';
    }
  }, [sessionStore.data]);
  return <main>{children}</main>;
}

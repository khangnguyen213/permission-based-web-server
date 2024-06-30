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
    if (!sessionStore.data && !sessionStore.loading) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }, [sessionStore.data, sessionStore.loading]);
  return (
    <main>
      <div>Role: {sessionStore.data?.role?.name || 'Not assigned'}</div>
      {sessionStore.data && children}
    </main>
  );
}

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
      <div className="p-2 w-fit mx-auto border border-slate-100 rounded-sm">
        <div>
          <span className="p-1 bg-slate-500 rounded-sm">ID</span>{' '}
          {sessionStore.data?.id || ''}
        </div>
        <div>
          <span className="p-1 bg-slate-500 rounded-sm">Email</span>{' '}
          {sessionStore.data?.email || ''}
        </div>
        <div>
          <span className="p-1 bg-slate-500 rounded-sm">Role</span>{' '}
          {sessionStore.data?.role?.name || 'Not assigned'}
        </div>
        <div>
          <span className="p-1 bg-slate-500 rounded-sm">Permissions</span>{' '}
          {sessionStore.data?.role?.permissions
            .map((permission) => permission.name)
            .join(', ') || 'Not assigned'}
        </div>
      </div>

      {sessionStore.data && children}
    </main>
  );
}

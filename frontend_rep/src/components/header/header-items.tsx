'use client';

import Link from 'next/link';
import React from 'react';
import { ModeToggle } from '../togge-theme';
import { useAppSelector } from '@/store/reduxHook';

export default function HeaderItems() {
  const sessionStore = useAppSelector((state) => state.session);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.history.replaceState(null, '', '/');
      window.location.reload();
    }
  };
  return (
    <div className="flex items-center space-x-2">
      {sessionStore.data && (
        <ul className="flex space-x-4">
          <li>Hi {sessionStore.data.email}</li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      )}
      {!sessionStore.data && (
        <ul className="flex space-x-4">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      )}
      <ModeToggle />
    </div>
  );
}

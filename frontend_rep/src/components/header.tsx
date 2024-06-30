'use client';

import Link from 'next/link';
import { ModeToggle } from './togge-theme';
import { useAppSelector } from '@/store/reduxHook';

function Header() {
  const sessionStore = useAppSelector((state) => state.session);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold">Role-based Authen Web</h1>
      </Link>

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
    </header>
  );
}

export default Header;

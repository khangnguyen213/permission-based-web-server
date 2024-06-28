import Link from 'next/link';
import { ModeToggle } from './togge-theme';

function Header() {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold">Simple Role-based Authen Web</h1>
      </Link>

      <div className="flex items-center space-x-2">
        <ul className="flex space-x-4">
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;

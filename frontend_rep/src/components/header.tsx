import Link from 'next/link';
import { ModeToggle } from './togge-theme';

function Header() {
  return (
    <>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
      <ModeToggle />
    </>
  );
}

export default Header;

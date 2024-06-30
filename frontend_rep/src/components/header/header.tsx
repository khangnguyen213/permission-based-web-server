import dynamic from 'next/dynamic';
import Link from 'next/link';
const HeaderItems = dynamic(() => import('./header-items'), { ssr: false });
// import HeaderItems from './header-items';

function Header() {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold">Role-based Authen Web</h1>
      </Link>
      <HeaderItems />
    </header>
  );
}

export default Header;

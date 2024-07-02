import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Home() {
  return (
    <div className="w-[80%] mx-auto my-32">
      <h1 className="text-center">Home</h1>
      <p className="text-center">This page is public for everyone</p>
      <div className="w-fit items-center mx-auto my-8 flex gap-3">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        (you can not access dashboard page unless you logged in)
      </div>
      <div className="w-fit items-center mx-auto my-8 flex gap-3">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

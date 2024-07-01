import { Button } from '@/components/ui/button';
import Link from 'next/link';

function DashboardPage() {
  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-center text-2xl p-8">Dashboard</h1>
      <p className="text-center">Welcome to the dashboard</p>
      <p>Only authenticated user can see this page</p>
      <ul>
        <Link href="user">
          <Button>Users</Button>
        </Link>
        <Link href="role">
          <Button>Roles</Button>
        </Link>
      </ul>
    </div>
  );
}

export default DashboardPage;

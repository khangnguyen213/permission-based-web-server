import { Button } from '@/components/ui/button';
import Link from 'next/link';

function DashboardPage() {
  return (
    <div className="w-[80%] mx-auto my-32">
      <h1 className="text-center text-2xl p-8">Dashboard</h1>
      <p className="text-center">Welcome to the dashboard</p>
      <p className="text-center">Only authenticated user can see this page</p>
      <ul className="flex flex-col items-center gap-3 w-fit mx-auto my-8">
        <p>Only account with specific permissions can access these page</p>
        <div className="flex gap-3">
          <Link href="user">
            <Button>Users</Button>
          </Link>
          <Link href="role">
            <Button>Roles</Button>
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default DashboardPage;

import { Button } from '@/components/ui/button';
import Link from 'next/link';

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <ul>
        <Button>
          <Link href="user">Users</Link>
        </Button>
        <Button>
          <Link href="role">Roles</Link>
        </Button>
      </ul>
    </div>
  );
}

export default DashboardPage;

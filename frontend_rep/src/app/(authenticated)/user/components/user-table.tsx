'use client';

import { UserDto } from '@/common/interfaces';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { userApi } from '@/service/userApi';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UserDialog } from './user-dialog';

function UserTable() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    userApi.getAll().then((res) => {
      if (res.err) {
        toast({
          title: 'Forbidden',
          description: 'You are not allowed to access this page.',
          variant: 'destructive',
          duration: 2000,
        });
        return;
      }
      if (res.data) {
        setUsers(res.data);
      }
    });
  }, [toast]);
  return (
    <div>
      <Table>
        <TableCaption>A list of users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>createdAt</TableHead>
            <TableHead>updatedAt</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, i) => (
            <TableRow key={user.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.roleId}</TableCell>
              <TableCell>{user.createdAt.toLocaleString()}</TableCell>
              <TableCell>{user.updatedAt.toLocaleString()}</TableCell>
              <TableCell>
                <UserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;

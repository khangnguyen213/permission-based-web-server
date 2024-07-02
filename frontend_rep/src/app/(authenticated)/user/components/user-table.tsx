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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { TrashIcon } from '@radix-ui/react-icons';

import { userApi } from '@/service/userApi';
import { useCallback, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { UserDialog } from './user-dialog';

function UserTable() {
  const [users, setUsers] = useState<UserDto[]>([]);

  const fetchUsers = useCallback(async () => {
    const { data, err } = await userApi.getAll();
    if (err) {
      toast({
        title: 'Forbidden',
        description: 'You are not allowed to access this page.',
        variant: 'destructive',
        duration: 2000,
      });
      return;
    }
    if (data) {
      setUsers(data);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    const { data, err } = await userApi.delete(id);
    if (err) {
      toast({
        title: 'Error',
        description: err,
        variant: 'destructive',
        duration: 2000,
      });
    }
    if (data) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
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
              <TableCell>
                {new Date(user.createdAt).toLocaleString('en-US', {
                  timeZone: 'Asia/Ho_Chi_Minh',
                  weekday: 'short',
                  year: 'numeric',
                  month: '2-digit',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </TableCell>
              <TableCell>
                {new Date(user.updatedAt).toLocaleString('en-US', {
                  timeZone: 'Asia/Ho_Chi_Minh',
                  weekday: 'short',
                  year: 'numeric',
                  month: '2-digit',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </TableCell>
              <TableCell className="flex justify-start gap-1">
                <UserDialog user={user} setUsers={setUsers} />

                <AlertDialog>
                  <AlertDialogTrigger
                    className="px-3 rounded-sm border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    title="Delete User"
                  >
                    <TrashIcon />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure to delete this user?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteUser(user.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;

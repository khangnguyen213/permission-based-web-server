'use client';

import { RoleDto, UserDto } from '@/common/interfaces';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { UserUpdateSchema } from '@/schemaValidations/user.schema';
import { roleApi } from '@/service/roleApi';
import { zodResolver } from '@hookform/resolvers/zod';

import { Pencil2Icon } from '@radix-ui/react-icons';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { userApi } from '@/service/userApi';

type FormValues = z.infer<typeof UserUpdateSchema>;

export const UserDialog = ({
  user,
  setUsers,
}: {
  user: UserDto;
  setUsers: Dispatch<SetStateAction<UserDto[]>>;
}) => {
  const [roles, setRoles] = useState<RoleDto[]>([]);

  const [error, setError] = useState<string>('');
  const form = useForm<FormValues>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      email: '',
      password: '',
      role: user?.role?.name,
      confirmPassword: '',
    },
  });

  async function onSubmit(values: FormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let updateData: Partial<{
      email: string;
      password: string;
      role: string;
    }> = {};
    if (values.password) {
      updateData.password = values.password;
    }
    if (values.email && values.email !== user.email) {
      updateData.email = values.email;
    }
    console.log(user);
    if (values.role && values.role !== user.role?.name) {
      updateData.role = values.role;
    }

    if (!updateData.email && !updateData.password && !updateData.role) {
      setError('Nothing to update');
      return;
    }

    const { data, err } = await userApi.update(user.id, updateData);

    if (err) {
      setError(err);
      return;
    }

    if (data) {
      setError('');

      toast({
        title: 'User updated',
        duration: 2000,
      });
      setUsers((prev) => {
        return prev.map((u) => {
          if (u.id === user.id) {
            return data;
          }
          return u;
        });
      });
    }
  }

  const fetchRoles = useCallback(async () => {
    const { data, err } = await roleApi.getAll();
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
      setRoles(data);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title="Edit User">
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>User profile</DialogTitle>
              <DialogDescription>
                Make changes to user profile here.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder={user.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.name} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage roles in{' '}
                    <Link href="/role" className="underline">
                      role page
                    </Link>
                    .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm New Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

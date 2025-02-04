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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type FormValues = z.infer<typeof UserUpdateSchema>;

export const UserDialog = ({
  user,
  setUsers,
}: {
  user: UserDto;
  setUsers: Dispatch<SetStateAction<UserDto[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [error, setError] = useState<string>('');
  const form = useForm<FormValues>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      email: '',
      password: '',
      roles: user?.roles?.map((r) => r.name) ?? [],
      confirmPassword: '',
    },
  });

  async function onSubmit(values: FormValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let updateData: Partial<{
      email: string;
      password: string;
      roles: string[];
    }> = {};
    if (values.password) {
      updateData.password = values.password;
    }
    if (values.email && values.email !== user.email) {
      updateData.email = values.email;
    }
    if (
      JSON.stringify(values.roles) !==
      JSON.stringify(user.roles?.map((r) => r.name))
    ) {
      updateData.roles = values.roles;
    }

    if (
      !updateData.email &&
      !updateData.password &&
      JSON.stringify(values.roles) ===
        JSON.stringify(user.roles?.map((r) => r.name))
    ) {
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
        variant: 'success',
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

      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
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
              name="roles"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Role List</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>Avaiable Roles</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {roles.map((role) => (
                          <DropdownMenuCheckboxItem
                            key={role.name}
                            checked={field.value.includes(role.name)}
                            onSelect={(e) => e.preventDefault()}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                form.setValue('roles', [
                                  ...field.value,
                                  role.name,
                                ]);
                              } else {
                                form.setValue(
                                  'roles',
                                  field.value.filter(
                                    (name) => name !== role.name
                                  )
                                );
                              }
                            }}
                          >
                            {role.name}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
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

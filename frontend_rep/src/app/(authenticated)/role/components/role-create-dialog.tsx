import { PermissionDto, RoleDto } from '@/common/interfaces';
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
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { RoleCreateSchema } from '@/schemaValidations/role.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { roleApi } from '@/service/roleApi';

type FormValues = z.infer<typeof RoleCreateSchema>;

export const RoleCreateDialog = ({
  availablePermissions = [],
  setRoles,
}: {
  availablePermissions: PermissionDto[];
  setRoles: Dispatch<SetStateAction<RoleDto[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const form = useForm<FormValues>({
    resolver: zodResolver(RoleCreateSchema),
    defaultValues: {
      name: '',
      permissions: [],
    },
  });
  async function onSubmit(values: FormValues) {
    roleApi.create(values).then(({ data, err }) => {
      if (err) {
        setError(err);
      }

      if (data) {
        setRoles((prev) => [...prev, data]);
        form.reset();
        setOpen(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="float-end" title="Add Role">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Add Role</DialogTitle>
            </DialogHeader>
            <DialogDescription className="!mt-2">
              Add new role with permissions.
            </DialogDescription>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Role Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Permissions</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Permissions List</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuLabel>
                          Avaiable Permissions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {availablePermissions.map((permission) => (
                          <DropdownMenuCheckboxItem
                            key={permission.name}
                            checked={field.value.includes(permission.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                form.setValue('permissions', [
                                  ...field.value,
                                  permission.name,
                                ]);
                              } else {
                                form.setValue(
                                  'permissions',
                                  field.value.filter(
                                    (name) => name !== permission.name
                                  )
                                );
                              }
                            }}
                          >
                            {permission.name}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    <span>Selected Permissions</span>
                    <br />
                    {field.value.map((name) => (
                      <span key={name}>
                        {' '}
                        - {name}
                        <br />
                      </span>
                    ))}
                  </FormDescription>
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

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

import { RoleEditNameSchema } from '@/schemaValidations/role.schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { roleApi } from '@/service/roleApi';
import { toast } from '@/components/ui/use-toast';

type FormValues = z.infer<typeof RoleEditNameSchema>;

export const RoleEditNameDialog = ({
  roleName,
  setRoles,
}: {
  roleName: string;
  setRoles: Dispatch<SetStateAction<RoleDto[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const form = useForm<FormValues>({
    resolver: zodResolver(RoleEditNameSchema),
    defaultValues: {
      name: roleName,
    },
  });
  async function onSubmit(values: FormValues) {
    roleApi.update(roleName, values).then(({ data, err }) => {
      if (err) {
        setError(err);
      }

      if (data) {
        setRoles((prev) =>
          prev.map((role) => {
            if (role.name === roleName) {
              return data;
            }
            return role;
          })
        );
        toast({
          title: 'Success',
          description: `Role ${roleName} changed to ${values.name} successfully`,
          variant: 'success',
          duration: 2000,
        });
        form.reset();
        setOpen(false);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" title="edit role name">
          {roleName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle title="edit role name">Edit</DialogTitle>
            </DialogHeader>
            <DialogDescription className="!mt-2">
              Edit the name of the role
            </DialogDescription>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Role Name" {...field} />
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

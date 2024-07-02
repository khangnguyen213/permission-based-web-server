'use client';

import { PermissionDto, RoleDto, UserDto } from '@/common/interfaces';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useCallback, useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { roleApi } from '@/service/roleApi';
import { permissionApi } from '@/service/permissionApi';
import { Checkbox } from '@/components/ui/checkbox';
import { RoleCreateDialog } from './role-create-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

function RoleTable() {
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [roles, setRoles] = useState<RoleDto[]>([]);

  const fetchPermissions = useCallback(async () => {
    const { data, err } = await permissionApi.getAll();
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
      setPermissions(data);
    }
  }, []);

  const fetchRoles = useCallback(async () => {
    const { data, err } = await roleApi.getAll();
    if (err) {
      toast({
        title: 'Forbidden',
        description: 'You are not allowed to access this page.',
        variant: 'destructive',
        duration: 2000,
      });
      window.location.href = '/dashboard';
      return;
    }
    if (data) {
      setRoles(data);
    }
  }, []);

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, [fetchPermissions, fetchRoles]);
  return (
    <div>
      <RoleCreateDialog
        availablePermissions={permissions}
        setRoles={setRoles}
      />
      <Table>
        <TableCaption>A list of roles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Role</TableHead>
            {permissions.map((permission, i) => (
              <TableHead key={i}>{permission.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role, i) => (
            <TableRow key={role.name}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{role.name}</TableCell>
              {permissions.map((permission, j) => (
                <TableCell key={j}>
                  <Checkbox
                    checked={role.permissions?.some(
                      (p) => p.name === permission.name
                    )}
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button
                  title="Delete Role"
                  variant="outline"
                  className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                >
                  <TrashIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RoleTable;

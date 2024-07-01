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
import { useToast } from '@/components/ui/use-toast';
import { RoleDialog } from './role-dialog';
import { roleApi } from '@/service/roleApi';
import { permissionApi } from '@/service/permissionApi';
import { Checkbox } from '@/components/ui/checkbox';

function RoleTable() {
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const { toast } = useToast();

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
  }, [toast]);

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
  }, [toast]);

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, [fetchPermissions, fetchRoles]);
  return (
    <div>
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
                    checked={role.permissions.some(
                      (p) => p.name === permission.name
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RoleTable;

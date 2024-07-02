'use client';

import { PermissionDto, RoleDto, UserDto } from '@/common/interfaces';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { set } from 'zod';

function RoleTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [draftRoles, setDraftRoles] = useState<RoleDto[]>([]);
  const [isChanged, setIsChanged] = useState(false);

  const deleteRole = useCallback(async (roleName: string) => {
    setIsLoading(true);
    const { err } = await roleApi.delete(roleName);
    if (err) {
      toast({
        title: 'Error',
        description: err,
        variant: 'destructive',
        duration: 2000,
      });
    } else {
      setRoles((prev) => prev.filter((role) => role.name !== roleName));
      toast({
        title: 'Success',
        description: 'Role deleted successfully',
        variant: 'success',
        duration: 2000,
      });
    }
    setIsLoading(false);
  }, []);

  const fetchPermissions = useCallback(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  const fetchRoles = useCallback(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  const cancelDraft = useCallback(() => {
    setDraftRoles(JSON.parse(JSON.stringify(roles)));
  }, [roles]);

  const saveDraft = () => {
    setIsLoading(true);
    const rolesChanged = draftRoles.filter((draftRole) => {
      const role = roles.find((role) => role.name === draftRole.name);
      return JSON.stringify(role) !== JSON.stringify(draftRole);
    });
    console.log(rolesChanged);
    const changeApiCalls = rolesChanged.map((role) =>
      roleApi.update(role.name, {
        permissions: role.permissions.map((p) => p.name),
      })
    );
    Promise.all(changeApiCalls)
      .then((responses) => {
        const updatedRoles: RoleDto[] = [];
        responses.forEach((response) => {
          if (response.err) {
            toast({
              title: 'Error',
              description: response.err,
              variant: 'destructive',
              duration: 2000,
            });
          }
          if (response.data) {
            updatedRoles.push(response.data);
            toast({
              title: 'Success',
              description: `Role ${response.data?.name} updated successfully`,
              variant: 'success',
              duration: 2000,
            });
          }
        });
        setRoles((prev) => {
          const newRoles = [...prev];
          updatedRoles.forEach((updatedRole) => {
            const index = newRoles.findIndex(
              (role) => role.name === updatedRole.name
            );
            newRoles[index] = updatedRole;
          });
          return newRoles;
        });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, [fetchPermissions, fetchRoles]);

  useEffect(() => {
    setDraftRoles(JSON.parse(JSON.stringify(roles)));
  }, [roles]);

  useEffect(() => {
    setIsChanged(JSON.stringify(roles) !== JSON.stringify(draftRoles));
  }, [draftRoles, roles]);

  return (
    <div>
      {isLoading && <LoadingSpinner className="mx-auto" fullScreen={false} />}
      {!isLoading && (
        <>
          <div className="float-end">
            {!isChanged && (
              <RoleCreateDialog
                availablePermissions={permissions}
                setRoles={setRoles}
              />
            )}
            {isChanged && (
              <Button title="Cannot add role while drafting" disabled>
                Drafting...
              </Button>
            )}
          </div>

          <Table>
            <TableCaption>A list of roles</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Role</TableHead>
                {permissions.map((permission) => (
                  <TableHead key={permission.name}>{permission.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {draftRoles.map((role, i) => (
                <TableRow key={role.name}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  {permissions.map((permission) => (
                    <TableCell key={permission.name}>
                      <Checkbox
                        checked={role.permissions.some(
                          (p) => p.name === permission.name
                        )}
                        onCheckedChange={(checked) => {
                          setDraftRoles((prev) => {
                            const newDraftRoles = [...prev];
                            checked
                              ? newDraftRoles[i].permissions.push(permission)
                              : (newDraftRoles[i].permissions = newDraftRoles[
                                  i
                                ].permissions.filter(
                                  (p) => p.name !== permission.name
                                ));
                            return newDraftRoles;
                          });
                        }}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          title="Delete Role"
                          variant="outline"
                          className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                        >
                          <TrashIcon />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure to delete this role?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Delete role cannot be undo
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteRole(role.name)}
                          >
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
          {isChanged && (
            <div className="float-end flex gap-2">
              <Button title="Save Changes" onClick={saveDraft}>
                Save
              </Button>
              <Button
                title="Cancel Changes"
                variant="outline"
                onClick={cancelDraft}
              >
                Cancel
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RoleTable;

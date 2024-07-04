export type TokenDataDto = {
  id: string;
  email: string;
  roles: RoleDto[];
};

export type UserDto = {
  id: string;
  email: string;
  password: string;
  roles: RoleDto[];
  createdAt: Date;
  updatedAt: Date;
};

export type RoleDto = {
  name: string;
  permissions: PermissionDto[];
};

export type PermissionDto = {
  name: string;
};

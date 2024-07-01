export type TokenDataDto = {
  id: string;
  email: string;
  role: RoleDto;
};

export type UserDto = {
  id: string;
  email: string;
  password: string;
  roleId: string;
  role: RoleDto;
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

export type TokenDataDto = {
  id: string;
  email: string;
  role: {
    name: string;
    permissions: {
      name: string;
    }[];
  };
};

export type UserDto = {
  id: string;
  email: string;
  password: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
};

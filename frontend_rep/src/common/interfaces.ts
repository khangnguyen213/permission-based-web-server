export type TokenData = {
  id: string;
  email: string;
  role: {
    name: string;
    permissions: {
      name: string;
    }[];
  };
};

import { Request } from 'express';

export interface RequestWithUserData extends Request {
  user: {
    id: string;
    email: string;
    password: string;
    role: {
      name: string;
      permissions: {
        name: string;
      }[];
    };
    createdAt: Date;
    updatedAt: Date;
  };
}

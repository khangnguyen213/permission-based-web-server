import { Request } from 'express';

export interface RequestWithUserData extends Request {
  user: {
    id: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

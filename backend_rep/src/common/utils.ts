import { Prisma } from '@prisma/client';

export function isPrismaError(err: any, code: string) {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === code
  );
}

import { PrismaClient, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

const generatePermissions = (): Prisma.PermissionCreateInput[] => {
  return [
    {
      name: 'user:create',
    },
    {
      name: 'user:read',
    },
    {
      name: 'user:update',
    },
    {
      name: 'user:delete',
    },
    {
      name: 'role:create',
    },
    {
      name: 'role:read',
    },
    {
      name: 'role:update',
    },
    {
      name: 'role:delete',
    },
  ];
};

const generateAdminRole = (): Prisma.RoleCreateInput => {
  return {
    name: 'ADMIN',
    permissions: {
      connect: generatePermissions().map((permission) => ({
        name: permission.name,
      })),
    },
  };
};

const generateRootUser = (): Prisma.UserCreateInput => {
  return {
    email: 'root@admin.com',
    password: hashSync('password', 10),
    role: {
      connect: {
        name: 'ADMIN',
      },
    },
  };
};

async function main() {
  const initialPermissions = generatePermissions();
  const adminRole = generateAdminRole();
  const rootUser = generateRootUser();

  await prisma.permission.createMany({
    data: initialPermissions,
  });

  await prisma.role.create({
    data: adminRole,
  });

  await prisma.user.create({
    data: rootUser,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

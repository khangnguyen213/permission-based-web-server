import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const generateCRUDPermissions = (): Prisma.PermissionCreateInput[] => {
  return [
    {
      name: 'CREATE',
    },
    {
      name: 'READ',
    },
    {
      name: 'UPDATE',
    },
    {
      name: 'DELETE',
    },
  ];
};

const generateAdminRole = (): Prisma.RoleCreateInput => {
  return {
    name: 'ADMIN',
    permissions: {
      connect: [
        { name: 'CREATE' },
        { name: 'READ' },
        { name: 'UPDATE' },
        { name: 'DELETE' },
      ],
    },
  };
};

const generateRootUser = (): Prisma.UserCreateInput => {
  return {
    email: 'root@admin.com',
    password: 'password',
    role: {
      connect: {
        name: 'ADMIN',
      },
    },
  };
};

async function main() {
  const initialPermissions = generateCRUDPermissions();
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

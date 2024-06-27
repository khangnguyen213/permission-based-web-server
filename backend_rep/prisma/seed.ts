import { PrismaClient, Prisma } from '@prisma/client';
// import { hashSync } from 'bcrypt';
import { hashSync } from 'bcryptjs';

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

const generateUserRole = (): Prisma.RoleCreateInput => {
  return {
    name: 'USER',
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

const clearAllData = async () => {
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();
};

async function main() {
  const initialPermissions = generatePermissions();
  const adminRole = generateAdminRole();
  const userRole = generateUserRole();
  const rootUser = generateRootUser();

  await clearAllData();

  await prisma.permission.createMany({
    data: initialPermissions,
  });

  await prisma.role.create({
    data: adminRole,
  });

  await prisma.role.create({
    data: userRole,
  });

  await prisma.user.create({
    data: rootUser,
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

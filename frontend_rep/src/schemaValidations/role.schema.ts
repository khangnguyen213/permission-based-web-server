import z from 'zod';

export const RoleCreateSchema = z.object({
  name: z.string().min(1, 'Role name is required').min(3).max(20),
  permissions: z.array(z.string()),
});

export const RoleEditNameSchema = z.object({
  name: z.string().min(1, 'Role name is required').min(3).max(20),
});

import z from 'zod';

export const RoleCreateSchema = z.object({
  name: z.string().min(3).max(20),
  permissions: z.array(z.string()),
});

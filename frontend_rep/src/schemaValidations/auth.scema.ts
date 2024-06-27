import z from 'zod';

export const RegisterBody = z.object({
  name: z.string().trim().min(2).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(256),
  confirmPassword: z.string().min(6).max(256),
});

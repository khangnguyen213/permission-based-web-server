import z from 'zod';

export const UserUpdateSchema = z
  .object({
    email: z.string().email().optional().or(z.literal('')),
    role: z.string().optional(),
    password: z
      .string()
      .min(6)
      .max(256)
      .regex(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number or one special character.'
      )
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password && confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      });
    }
  });

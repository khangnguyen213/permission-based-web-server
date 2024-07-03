import z from 'zod';

export const RegisterBody = z
  .object({
    email: z.string().min(1, 'Email is required').email(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6)
      .max(256)
      .regex(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number or one special character.'
      ),
    confirmPassword: z.string(),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      });
    }
  });

export const LoginBody = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

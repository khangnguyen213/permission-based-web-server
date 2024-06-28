import z from 'zod';

export const RegisterBody = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(256)
    .regex(
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number or one special character.'
    ),
});

export const LoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(256),
});

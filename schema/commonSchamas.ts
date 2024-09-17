import { z } from "zod";

export const LoginRequestSchema = z
  .object({
    email: z
      .string()
      .email()
      .transform((data) => data.toLowerCase()),
    password: z.string().min(8),
  })
  .refine((data) => {
    return !data.email.includes("+"); // do not allow + sign in email
  });

export type LoginRequestSchema = z.infer<typeof LoginRequestSchema>;


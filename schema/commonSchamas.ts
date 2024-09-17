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

export const bearerTokenSchema = z.object({
  authorization: z
    .string()
    .refine((data) => data.startsWith("Bearer "), {
      message: "Authorization header must start with 'Bearer '",
    })
    .transform((data) => data.replace("Bearer ", "")),
});

export type LoginRequestSchema = z.infer<typeof LoginRequestSchema>;
export type bearerTokenSchema = z.infer<typeof bearerTokenSchema>;

import { z } from "zod";
import { bearerTokenSchema } from "./commonSchamas";

export const RegisterBrandRequestSchema = bearerTokenSchema.extend({
  name: z
    .string()
    .min(3)
    .transform((data) => data.toLowerCase()),
  description: z.string().min(20),
  image: z.string().url(),
  country: z.string().min(3),
  state: z.string().min(3),
  address: z.string().min(3),
});

export type RegisterBrandRequestSchema = z.infer<
  typeof RegisterBrandRequestSchema
>;

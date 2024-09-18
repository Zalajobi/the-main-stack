import { z } from "zod";
import { bearerTokenSchema } from "./commonSchamas";

export const SellerSignupRequestSchema = bearerTokenSchema.extend({
  storeName: z
    .string()
    .min(4, { message: "storeName must be at least 4 characters long" })
    .transform((data) => data.toLowerCase()),
  storeDescription: z
    .string()
    .min(20, {
      message: "storeDescription must be at least 20 characters long",
    }),
});

export type SellerSignupRequestSchema = z.infer<
  typeof SellerSignupRequestSchema
>;

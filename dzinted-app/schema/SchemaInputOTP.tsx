import { z } from "zod";

export const SchemaInputOTP = z.object({
  email: z.number().gte(6).lte(6),
});

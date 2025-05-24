import { z } from "zod";

export const SchemaLogin = z.object({
  email: z.string().email("Email invalide"),
});

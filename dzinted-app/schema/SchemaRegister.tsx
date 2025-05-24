import { z } from "zod";

export const SchemaRegister = z.object({
  email: z.string().email("Email invalide"),
  last_name: z.string().min(2, "Le nom est requis"),
  first_name: z.string().min(2, "Le prénom est requis"),
});

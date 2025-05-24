import { z } from "zod";

export const SchemaRegister = z.object({
  email: z.string().min(1, "L'email est requis.").email("Email Invalide."),
  emailconfirmation : z.string().min(1, "La confirmation d'email est requise.").email("Email Invalide."),
  last_name: z.string().min(1, "Le nom est requis.").min(4, "Minimum 4 caractères."),
  first_name: z.string().min(1, "Le prénom est requis.").min(4, "Minimum 4 caractères."),
}).superRefine((data, ctx) => {
    if (data.email !== data.emailconfirmation) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Les emails ne correspondent pas.",
            path: ["emailconfirmation"]
        });
    }
});

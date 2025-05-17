import { z } from 'zod';

export const SchemaConnexion = z.object({
  email: z.string({message: "Vous devez mettre un email"}).email("Veuillez entrer un email valide"),
  password: z.string({message: "Vous devez mettre un mot de passe"}).min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});


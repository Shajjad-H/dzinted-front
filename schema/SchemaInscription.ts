import {z} from "zod"

export const SchemaInscription = z.object({
    password: z.string({message: "Vous devez mettre un mot de passe"})
        .min(1, {message: "Vous devez mettre un mot de passe"})
        .min(6, "Le mot de passe doit faire au minimum 6 caractères")
        .trim()
        .max(35, "Le mot de passe doit faire au maximum 35 caractères"),
        
    email: z.string({message: "Vous devez mettre un email"})
        .min(1, {message: "Vous devez mettre un email"})
        .email("Format d'email invalide"),
        
        pseudo: z.string({message: "Vous devez mettre un pseudo"})
        .min(1, {message: "Vous devez mettre un pseudo"})
        .min(6, "Le pseudo doit faire au minimum 6 caractères")
        .trim()
        .max(35, "Le pseudo doit faire au maximum 35 caractères")
 })
 



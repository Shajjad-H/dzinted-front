import { z } from "zod";

export const SchemaInputOTP = z.object({
  otp: z
    .string()
    .length(6, "Le code OTP doit contenir exactement 6 chiffres")
    .regex(/^[0-9]+$/, "Le code OTP ne doit contenir que des chiffres"),
});

export type SchemaInputOTPType = z.infer<typeof SchemaInputOTP>;

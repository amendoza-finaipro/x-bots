import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().nonempty("Debes llenar este campo"),
    lastname: z.string().nonempty("Debes llenar este campo"),
    email: z
      .string()
      .nonempty("Debes llenar este campo")
      .email("este campo debe ser un email"),
    password: z
      .string()
      .nonempty("Debes llenar este campo")
      .min(8, "La contraseña debe tener como mínimo 8 caracteres")
      .max(15, "La contraseña es muy larga")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!_@$%^&*-]).{8,}$/,
        "La contraseña debe tener como mínimo una mayúscula, una minúscula, un número y un caracter especial",
      ),
    confirmPassword: z.string().nonempty("Debes llenar este campo"),
    termsRead: z
      .boolean()
      .refine((value) => value, "Debes leer los términos y condiciones"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["password"],
  });

export type schemaType = z.infer<typeof formSchema>;

export type formType = UseFormReturn<schemaType>;

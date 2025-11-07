import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().nonempty("Debes llenar este campo").email("este campo debe ser un email"),
  password: z.string().nonempty("Debes llenar este campo"),
  rememberMe: z.boolean(),
});

export type schemaType = z.infer<typeof formSchema>;

export type formType = UseFormReturn<schemaType>;

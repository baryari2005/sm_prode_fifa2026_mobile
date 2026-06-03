import { z } from "zod";
import { TIPO_DOCUMENTO_OPCIONES } from "@/constants/tipo-documento";

const onlyDigits = (value: string) => value.replace(/\D+/g, "");

const isValidDni = (value: string) => {
  const digits = onlyDigits(value);
  return digits.length >= 7 && digits.length <= 8;
};

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Ingresá tu usuario o email"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z.object({
  userId: z.string().trim().min(3, "Ingresá un usuario válido"),
  nombre: z.string().min(1, "Ingresá tu nombre"),
  apellido: z.string().min(1, "Ingresá tu apellido"),
  celular: z.string().trim().min(1, "Ingresá tu celular"),
  email: z.email("Ingresá un email válido"),
  tipoDocumento: z.enum(TIPO_DOCUMENTO_OPCIONES, {
    message: "Seleccioná un tipo de documento válido",
  }),
  documento: z.string().trim().refine(isValidDni, "Ingresá un DNI válido"),
  domicilio: z.string().trim().min(1, "Ingresá tu domicilio"),
  localidad: z.literal("San Miguel"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  acceptedTerms: z.boolean().refine((value) => value, {
    message: "Tenés que aceptar las bases y condiciones",
  }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterSchemaValues = z.infer<typeof registerSchema>;

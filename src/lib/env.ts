import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_API_BASE_URL es requerida")
    .refine(
      (value) => value.startsWith("/") || z.url().safeParse(value).success,
      "NEXT_PUBLIC_API_BASE_URL debe ser una URL válida o una ruta relativa"
    ),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).optional().default("Prode Mundial 2026"),
  NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_PUSH_SUBSCRIBE_PATH: z.string().min(1).optional(),
  NEXT_PUBLIC_PUSH_UNSUBSCRIBE_PATH: z.string().min(1).optional(),
});

const parsedEnv = publicEnvSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  NEXT_PUBLIC_PUSH_SUBSCRIBE_PATH: process.env.NEXT_PUBLIC_PUSH_SUBSCRIBE_PATH,
  NEXT_PUBLIC_PUSH_UNSUBSCRIBE_PATH: process.env.NEXT_PUBLIC_PUSH_UNSUBSCRIBE_PATH,
});

if (!parsedEnv.success) {
  throw new Error(
    `Variables de entorno públicas inválidas: ${parsedEnv.error.issues
      .map((issue) => issue.message)
      .join(", ")}`
  );
}

export const env = parsedEnv.data;

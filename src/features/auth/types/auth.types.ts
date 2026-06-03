import type { TIPO_DOCUMENTO_OPCIONES } from "@/constants/tipo-documento";

export type AuthUser = {
  id: string;
  nombre?: string;
  apellido?: string;
  email: string;
  role?: string;
  estado?: string;
};

export type LoginPayload = {
  email?: string;
  userId?: string;
  password: string;
};

export type RegisterPayload = {
  userId: string;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  password: string;
  tipoDocumento: (typeof TIPO_DOCUMENTO_OPCIONES)[number];
  documento: string;
  domicilio: string;
  localidad: "San Miguel";
  acceptedTerms: boolean;
};

export type AuthResponse = {
  user: AuthUser;
  token?: string;
  message?: string;
};

export type AuthLoginResponse = {
  token?: string;
  accessToken?: string;
  message?: string;
};

import { AxiosError } from "axios";
import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/http";
import type {
  AuthLoginResponse,
  AuthResponse,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";

type ApiAuthResponse = AuthResponse | AuthUser;

const onlyDigits = (value: string) => value.replace(/\D+/g, "");

function extractUser(data: ApiAuthResponse): AuthUser {
  if ("user" in data) {
    return data.user;
  }

  return data;
}

export const authService = {
  async login(payload: LoginPayload) {
    try {
      const rawIdentifier = payload.email?.trim() || payload.userId?.trim() || "";
      const normalizedPayload: LoginPayload = {
        password: payload.password,
        ...(rawIdentifier.includes("@")
          ? { email: rawIdentifier.toLowerCase() }
          : { userId: rawIdentifier }),
      };

      const response = await axiosInstance.post<AuthLoginResponse>(
        "/auth/login",
        normalizedPayload
      );

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(
          error,
          "No pudimos iniciar sesión. Revisá tu email y contraseña."
        )
      );
    }
  },

  async register(payload: RegisterPayload) {
    try {
      const normalizedPayload: RegisterPayload = {
        ...payload,
        userId: payload.userId.trim(),
        email: payload.email.trim().toLowerCase(),
        nombre: payload.nombre.trim(),
        apellido: payload.apellido.trim(),
        celular: payload.celular.trim(),
        documento: onlyDigits(payload.documento),
        domicilio: payload.domicilio.trim(),
        localidad: "San Miguel",
      };

      const response = await axiosInstance.post<ApiAuthResponse>(
        "/auth/register",
        normalizedPayload
      );

      return extractUser(response.data);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "No pudimos crear el usuario."));
    }
  },

  async me() {
    try {
      const response = await axiosInstance.get<ApiAuthResponse>("/auth/me");
      return extractUser(response.data);
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Tu sesión expiró. Volvé a iniciar sesión.")
      );
    }
  },

  async logout() {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return;
      }

      throw new Error(getApiErrorMessage(error, "No pudimos cerrar la sesión."));
    }
  },
};

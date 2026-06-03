"use client";

import { create } from "zustand";
import { getAuthToken, setAuthToken } from "@/lib/axios";
import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "@/features/auth/types/auth.types";
import { authService } from "@/features/auth/services/auth.service";

type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  fetchMe: (options?: { silent?: boolean }) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
  clearError: () => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: typeof window !== "undefined" ? getAuthToken() : null,
  loading: false,
  initialized: false,
  isAuthenticated: Boolean(typeof window !== "undefined" ? getAuthToken() : null),
  error: null,

  async login(payload) {
    set({ loading: true, error: null });

    try {
      const auth = await authService.login(payload);
      const token = auth.token ?? auth.accessToken ?? null;

      if (!token) {
        throw new Error("No pudimos iniciar sesión.");
      }

      setAuthToken(token);
      const user = await authService.me();

      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        initialized: true,
      });
      return user;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No pudimos iniciar sesión.";
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
        error: message,
      });
      throw error;
    }
  },

  async register(payload) {
    set({ loading: true, error: null });

    try {
      const user = await authService.register(payload);
      set({ loading: false, initialized: true });
      return user;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "No pudimos crear el usuario.";
      set({ loading: false, initialized: true, error: message });
      throw error;
    }
  },

  async fetchMe(options) {
    set({ loading: true, error: null });

    try {
      const user = await authService.me();
      set({
        user,
        token: getAuthToken(),
        isAuthenticated: true,
        loading: false,
        initialized: true,
      });
      return user;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Tu sesión expiró. Volvé a iniciar sesión.";

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
        error: options?.silent ? null : message,
      });
      return null;
    }
  },

  async logout() {
    set({ loading: true, error: null });

    try {
      await authService.logout();
    } finally {
      setAuthToken(null);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
        error: null,
      });
    }
  },

  clearError() {
    set({ error: null });
  },

  clearSession() {
    setAuthToken(null);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      initialized: true,
      error: "Tu sesión expiró. Volvé a iniciar sesión.",
    });
  },
}));

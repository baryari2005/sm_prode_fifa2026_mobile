import axios, { AxiosError } from "axios";
import { env } from "@/lib/env";

export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

let inMemoryToken: string | null = null;

export function setAuthToken(token: string | null) {
  inMemoryToken = token;

  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem("auth-token", token);
    } else {
      window.localStorage.removeItem("auth-token");
    }
  }

  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return inMemoryToken;
  }

  return inMemoryToken ?? window.localStorage.getItem("auth-token");
}

if (typeof window !== "undefined") {
  const token = window.localStorage.getItem("auth-token");
  if (token) {
    setAuthToken(token);
  }
}

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      setAuthToken(null);
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

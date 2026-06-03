import { AxiosError } from "axios";

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return "No pudimos conectarnos con el servidor. Revisá la API e intentá de nuevo.";
    }

    const responseData = error.response.data;
    const responseRecord =
      responseData && typeof responseData === "object"
        ? (responseData as Record<string, unknown>)
        : null;

    const apiMessage = responseRecord
      ? "message" in responseRecord
        ? responseRecord.message
        : "error" in responseRecord
          ? responseRecord.error
          : undefined
      : undefined;

    if (typeof apiMessage === "string" && apiMessage.trim().length > 0) {
      return apiMessage;
    }

    if (error.response.status === 401) {
      return "Tu sesión expiró. Volvé a iniciar sesión.";
    }

    if (error.response.status === 403) {
      return "No tenés permisos para realizar esta acción.";
    }

    if (error.response.status >= 500) {
      return "El servidor tuvo un problema. Intentá de nuevo en unos minutos.";
    }
  }

  return fallback;
}

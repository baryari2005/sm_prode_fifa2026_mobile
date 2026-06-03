import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/http";
import type {
  PronosticosFixtureResponse,
  UpsertPronosticoPayload,
} from "@/features/pronosticos/types/pronosticos.types";

export const pronosticosService = {
  async getFixturePronosticos() {
    try {
      const response = await axiosInstance.get<PronosticosFixtureResponse>(
        "/pronosticos/fixture"
      );

      const data = response.data;

      if (Array.isArray(data)) {
        return data;
      }

      return data.data ?? data.partidos ?? [];
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "No pudimos cargar el fixture de pronósticos.")
      );
    }
  },

  async upsertPronostico(payload: UpsertPronosticoPayload) {
    try {
      const response = await axiosInstance.post("/pronosticos", payload);
      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "No se pudo guardar el pronóstico.")
      );
    }
  },
};

import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/http";
import type {
  FixtureResponse,
} from "@/features/fixture/types/fixture.types";
import type { PronosticosFixtureResponse } from "@/features/pronosticos/types/pronosticos.types";

export const fixtureService = {
  async getPartidos() {
    try {
      const response = await axiosInstance.get<
        FixtureResponse | PronosticosFixtureResponse
      >("/pronosticos/fixture");

      const data = response.data;

      if (Array.isArray(data)) {
        return data;
      }

      return data.data ?? data.partidos ?? [];
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "No pudimos cargar los partidos.")
      );
    }
  },
};

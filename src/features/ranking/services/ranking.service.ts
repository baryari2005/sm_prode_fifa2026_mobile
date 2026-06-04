import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/http";
import type { RankingResponse } from "@/features/ranking/types/ranking.types";

export const rankingService = {
  async getRanking(faseId?: number | null) {
    try {
      const response = await axiosInstance.get<RankingResponse>("/pronosticos/ranking", {
        params: faseId != null ? { faseId } : undefined,
      });
      return {
        miRanking: response.data.data?.miRanking ?? null,
        ranking: response.data.data?.ranking ?? [],
        historial: response.data.data?.historial ?? [],
      };
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "No se pudo cargar el ranking del prode.")
      );
    }
  },
};

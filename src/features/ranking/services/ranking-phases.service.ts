import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/http";
import type { RankingPhase } from "@/features/ranking/types/ranking-phase.types";

export const rankingPhasesService = {
  async getFases() {
    try {
      const response = await axiosInstance.get("/fases");
      const raw = response.data;
      const items: unknown[] = Array.isArray(raw)
        ? raw
        : Array.isArray(raw.data)
          ? raw.data
          : Array.isArray(raw.fases)
            ? raw.fases
            : Array.isArray(raw.items)
              ? raw.items
              : [];

      return items
        .map(normalizePhase)
        .filter((item): item is RankingPhase => item !== null);
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "No pudimos cargar las fases disponibles.")
      );
    }
  },

  async getFaseActiva() {
    try {
      const response = await axiosInstance.get("/fases/activa");
      return normalizePhase(response.data?.data ?? response.data?.fase ?? response.data);
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "No pudimos cargar la fase activa.")
      );
    }
  },
};

function normalizePhase(value: unknown): RankingPhase | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const id = asNumber(record.id ?? record.faseId ?? record.fase_id);
  const nombre = asString(record.nombre ?? record.name ?? record.faseNombre);

  if (id == null || !nombre) {
    return null;
  }

  return {
    id,
    nombre,
  };
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

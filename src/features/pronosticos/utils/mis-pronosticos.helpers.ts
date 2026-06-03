import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import {
  getPredictionReference,
  isPronosticoBlocked,
} from "@/features/pronosticos/utils/pronosticos.helpers";

export type MisPronosticosTab = "editables" | "cerrados";

export type DraftPronostico = {
  partidoId: string;
  golesLocal: string;
  golesVisitante: string;
  dirty: boolean;
};

export function buildMisPronosticosCounts(partidos: PronosticoPartido[]) {
  return partidos.reduce(
    (acc, partido) => {
      const actual = getPredictionReference(partido);

      if (!actual) {
        return acc;
      }

      if (isPronosticoBlocked(partido)) {
        acc.cerrados += 1;
        return acc;
      }

      acc.editables += 1;
      return acc;
    },
    {
      editables: 0,
      cerrados: 0,
    }
  );
}

export function filterMisPronosticos(
  partidos: PronosticoPartido[],
  activeTab: MisPronosticosTab
) {
  return partidos.filter((partido) => {
    const actual = getPredictionReference(partido);

    if (!actual) {
      return false;
    }

    const blocked = isPronosticoBlocked(partido);

    if (activeTab === "cerrados") {
      return blocked;
    }

    return !blocked;
  });
}

export function getBasePronosticoScore(partido: PronosticoPartido) {
  const actual = getPredictionReference(partido);

  return {
    golesLocal: actual?.golesLocal != null ? String(actual.golesLocal) : "",
    golesVisitante:
      actual?.golesVisitante != null ? String(actual.golesVisitante) : "",
  };
}

export function normalizePronosticoScore(value: string) {
  const cleanValue = value.trim();

  if (!cleanValue) {
    return "0";
  }

  return String(Number(cleanValue));
}

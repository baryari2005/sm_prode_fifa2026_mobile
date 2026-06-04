import type {
  RankingPhase,
  RankingPhaseOption,
  RankingScopeValue,
} from "@/features/ranking/types/ranking-phase.types";
import type {
  RankingHistorial,
  RankingRow,
} from "@/features/ranking/types/ranking.types";

type RankingDataset = {
  miRanking: RankingRow | null;
  ranking: RankingRow[];
  historial: RankingHistorial[];
};

function normalizeLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function isGroupStagePhase(phase: RankingPhase) {
  const normalized = normalizeLabel(phase.nombre);
  return normalized.includes("grupo");
}

export function getRankingScopeOptions(
  activePhase: RankingPhase | null
): RankingPhaseOption[] {
  const activeScope: RankingScopeValue | null = activePhase
    ? isGroupStagePhase(activePhase)
      ? "grupos"
      : "eliminatorias"
    : null;

  return [
    {
      value: "grupos",
      label: "Fase de grupos",
      isActive: activeScope === "grupos",
    },
    {
      value: "eliminatorias",
      label: "Fase eliminatorias",
      isActive: activeScope === "eliminatorias",
    },
  ];
}

export function getDefaultRankingScope(activePhase: RankingPhase | null) {
  if (!activePhase) {
    return "grupos" as const;
  }

  return isGroupStagePhase(activePhase) ? "grupos" : "eliminatorias";
}

export function getRankingScopeLabel(scope: RankingScopeValue) {
  return scope === "grupos"
    ? "Ranking Fase de Grupos"
    : "Ranking Fase eliminatorias";
}

export function getRankingScopeSummaryLabel(scope: RankingScopeValue) {
  return scope === "grupos" ? "fase de grupos" : "fase eliminatorias";
}

export function aggregateRankingDatasets(
  datasets: RankingDataset[],
  currentUserId?: string | null
): RankingDataset {
  if (datasets.length === 0) {
    return {
      miRanking: null,
      ranking: [],
      historial: [],
    };
  }

  if (datasets.length === 1) {
    return datasets[0];
  }

  const rankingMap = new Map<string, RankingRow>();
  const historyMap = new Map<string, RankingHistorial>();

  for (const dataset of datasets) {
    for (const row of dataset.ranking) {
      const previous = rankingMap.get(row.usuarioId);

      if (!previous) {
        rankingMap.set(row.usuarioId, { ...row });
        continue;
      }

      rankingMap.set(row.usuarioId, {
        ...previous,
        nombre: previous.nombre || row.nombre,
        avatarUrl: previous.avatarUrl ?? row.avatarUrl,
        puntosTotales: previous.puntosTotales + row.puntosTotales,
        aciertosExactos: previous.aciertosExactos + row.aciertosExactos,
        aciertosTendencia: previous.aciertosTendencia + row.aciertosTendencia,
        partidosPronosticados:
          previous.partidosPronosticados + row.partidosPronosticados,
        partidosCalificados:
          previous.partidosCalificados + row.partidosCalificados,
        updatedAt: getLatestDate(previous.updatedAt, row.updatedAt),
      });
    }

    for (const item of dataset.historial) {
      historyMap.set(item.id, item);
    }
  }

  const ranking = Array.from(rankingMap.values())
    .sort((a, b) => {
      if (b.puntosTotales !== a.puntosTotales) {
        return b.puntosTotales - a.puntosTotales;
      }

      if (b.aciertosExactos !== a.aciertosExactos) {
        return b.aciertosExactos - a.aciertosExactos;
      }

      if (b.aciertosTendencia !== a.aciertosTendencia) {
        return b.aciertosTendencia - a.aciertosTendencia;
      }

      if (b.partidosCalificados !== a.partidosCalificados) {
        return b.partidosCalificados - a.partidosCalificados;
      }

      return a.nombre.localeCompare(b.nombre, "es");
    })
    .map((row, index) => ({
      ...row,
      posicion: index + 1,
    }));

  const historial = Array.from(historyMap.values()).sort((a, b) => {
    const aTime = a.calculadoAt ? new Date(a.calculadoAt).getTime() : 0;
    const bTime = b.calculadoAt ? new Date(b.calculadoAt).getTime() : 0;
    return bTime - aTime;
  });

  const miRanking = currentUserId
    ? ranking.find((row) => row.usuarioId === currentUserId) ?? null
    : null;

  return {
    miRanking,
    ranking,
    historial,
  };
}

function getLatestDate(a: string | null, b: string | null) {
  if (!a) return b;
  if (!b) return a;

  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

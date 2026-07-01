import type {
  RankingPhase,
  RankingPhaseOption,
  RankingScopeValue,
} from "@/features/ranking/types/ranking-phase.types";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";
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

export function isDieciseisavosPhase(phase: RankingPhase) {
  const normalized = normalizeLabel(phase.nombre);
  return (
    normalized.includes("dieciseisavos") ||
    normalized.includes("dieciseisavo") ||
    normalized.includes("16vos") ||
    normalized.includes("16avo") ||
    normalized.includes("16avos") ||
    normalized.includes("16 avos") ||
    normalized.includes("decimosextos") ||
    normalized.includes("ronda de 32") ||
    normalized.includes("ronda 32") ||
    normalized.includes("round of 32")
  );
}

export function isEliminatoriasRankingPhase(phase: RankingPhase) {
  if (isGroupStagePhase(phase) || isDieciseisavosPhase(phase)) {
    return false;
  }

  const normalized = normalizeLabel(phase.nombre);
  return [
    "octavos",
    "8vos",
    "cuartos",
    "4tos",
    "semifinal",
    "semi final",
    "final",
    "tercer puesto",
    "3 y 4",
    "3er puesto",
  ].some((keyword) => normalized.includes(keyword));
}

export function getRankingScopeFromPhase(
  phase: RankingPhase | null
): RankingScopeValue {
  if (!phase) {
    return "grupos";
  }

  if (isGroupStagePhase(phase)) {
    return "grupos";
  }

  if (isDieciseisavosPhase(phase)) {
    return "dieciseisavos";
  }

  return "eliminatorias";
}

export function getRankingScopeOptions(
  activePhase: RankingPhase | null
): RankingPhaseOption[] {
  const activeScope: RankingScopeValue | null = activePhase
    ? getRankingScopeFromPhase(activePhase)
    : null;

  return [
    {
      value: "grupos",
      label: "Fase de grupos",
      isActive: activeScope === "grupos",
    },
    {
      value: "dieciseisavos",
      label: "Dieciseisavos",
      isActive: activeScope === "dieciseisavos",
    },
    {
      value: "eliminatorias",
      label: "Eliminatorias",
      isActive: activeScope === "eliminatorias",
    },
  ];
}

export function getDefaultRankingScope(activePhase: RankingPhase | null) {
  return getRankingScopeFromPhase(activePhase);
}

export function getRankingScopeLabel(scope: RankingScopeValue) {
  if (scope === "grupos") {
    return "Ranking Fase de Grupos";
  }

  if (scope === "dieciseisavos") {
    return "Ranking Dieciseisavos";
  }

  return "Ranking Eliminatorias";
}

export function getRankingScopeSummaryLabel(scope: RankingScopeValue) {
  if (scope === "grupos") {
    return "fase de grupos";
  }

  if (scope === "dieciseisavos") {
    return "dieciseisavos";
  }

  return "eliminatorias";
}

export function getRankingPhasesForScope(
  scope: RankingScopeValue,
  phases: RankingPhase[]
) {
  return phases.filter((phase) => {
    if (scope === "grupos") {
      return isGroupStagePhase(phase);
    }

    if (scope === "dieciseisavos") {
      return isDieciseisavosPhase(phase);
    }

    return isEliminatoriasRankingPhase(phase);
  });
}

export function getRankingPhasesWithFinalizedMatches(
  phases: RankingPhase[],
  partidos: Pick<FixturePartido, "fase" | "resultado">[]
) {
  const finalizedPhaseIds = new Set(
    partidos
      .filter((partido) => partido.resultado?.estado?.toUpperCase() === "FINALIZADO")
      .map((partido) => partido.fase?.id)
      .filter((phaseId): phaseId is number => typeof phaseId === "number")
  );

  return phases.filter((phase) => finalizedPhaseIds.has(phase.id));
}

export function aggregateRankingDatasets(
  datasets: RankingDataset[],
  currentUserId?: string | null
): RankingDataset {
  const visibleDatasets = datasets.map(getVisibleRankingDataset);

  if (visibleDatasets.length === 0) {
    return {
      miRanking: null,
      ranking: [],
      historial: [],
    };
  }

  if (visibleDatasets.length === 1) {
    return visibleDatasets[0];
  }

  const rankingMap = new Map<string, RankingRow>();
  const historyMap = new Map<string, RankingHistorial>();

  for (const dataset of visibleDatasets) {
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

  const targetUserId =
    currentUserId ??
    visibleDatasets.find((dataset) => dataset.miRanking)?.miRanking?.usuarioId;

  const miRanking = targetUserId
    ? ranking.find((row) => row.usuarioId === targetUserId) ?? null
    : null;

  return {
    miRanking,
    ranking,
    historial,
  };
}

function getVisibleRankingDataset(dataset: RankingDataset): RankingDataset {
  const ranking = dataset.ranking.filter(hasQualifiedMatches);
  const miRanking =
    dataset.miRanking && hasQualifiedMatches(dataset.miRanking)
      ? dataset.miRanking
      : null;

  return {
    ...dataset,
    miRanking,
    ranking,
  };
}

function hasQualifiedMatches(row: RankingRow) {
  return (row.partidosCalificados ?? 0) > 0;
}

function getLatestDate(a: string | null, b: string | null) {
  if (!a) return b;
  if (!b) return a;

  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

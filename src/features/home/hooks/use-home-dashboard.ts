"use client";

import { useEffect, useMemo, useState } from "react";

import { getFixturePhaseLabel } from "@/features/fixture/utils/fixture.helpers";
import { pronosticosService } from "@/features/pronosticos/services/pronosticos.service";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import { getPredictionReference } from "@/features/pronosticos/utils/pronosticos.helpers";
import {
  aggregateRankingDatasets,
  getDefaultRankingScope,
  getRankingPhasesForScope,
  getRankingPhasesWithFinalizedMatches,
} from "@/features/ranking/helpers/ranking-phase.helpers";
import { rankingPhasesService } from "@/features/ranking/services/ranking-phases.service";
import { rankingService } from "@/features/ranking/services/ranking.service";

type HomeDashboardData = {
  pronosticados: number;
  totalPronosticables: number;
  rankingPosicion: number | null;
  faseActualLabel: string;
  faseActualTotal: number;
  faseActualJugados: number;
};

const fallbackData: HomeDashboardData = {
  pronosticados: 0,
  totalPronosticables: 0,
  rankingPosicion: null,
  faseActualLabel: "Fase actual",
  faseActualTotal: 0,
  faseActualJugados: 0,
};

function isPlayedMatch(partido: PronosticoPartido) {
  const estado = partido.resultado?.estado?.toUpperCase();
  return estado === "FINALIZADO" || estado === "EN_JUEGO";
}

export function useHomeDashboard(featuredMatchId?: string) {
  const [data, setData] = useState<HomeDashboardData>(fallbackData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      setIsLoading(true);

      try {
        const [fases, faseActiva, pronosticos] = await Promise.all([
          rankingPhasesService.getFases().catch(() => []),
          rankingPhasesService.getFaseActiva().catch(() => null),
          pronosticosService.getFixturePronosticos(),
        ]);

        if (cancelled) return;

        const pronosticados = pronosticos.filter((partido) =>
          Boolean(getPredictionReference(partido))
        ).length;

        const featured =
          pronosticos.find((partido) => partido.id === featuredMatchId) ??
          pronosticos[0] ??
          null;

        const faseActualId = featured?.fase?.id ?? null;
        const faseActualItems = faseActualId
          ? pronosticos.filter((partido) => partido.fase?.id === faseActualId)
          : [];
        const rankingScope = getDefaultRankingScope(faseActiva);
        const rankingPhases = getRankingPhasesWithFinalizedMatches(
          getRankingPhasesForScope(rankingScope, fases),
          pronosticos
        );
        const rankingData = aggregateRankingDatasets(
          await Promise.all(
            rankingPhases.map((phase) => rankingService.getRanking(phase.id))
          )
        );

        setData({
          pronosticados,
          totalPronosticables: pronosticos.length,
          rankingPosicion: rankingData.miRanking?.posicion ?? null,
          faseActualLabel: featured ? getFixturePhaseLabel(featured) : "Fase actual",
          faseActualTotal: faseActualItems.length,
          faseActualJugados: faseActualItems.filter(isPlayedMatch).length,
        });
      } catch {
        if (!cancelled) {
          setData(fallbackData);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadDashboard();
    const pollId = window.setInterval(() => {
      void loadDashboard();
    }, 45000);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
    };
  }, [featuredMatchId]);

  return useMemo(
    () => ({
      data,
      isLoading,
    }),
    [data, isLoading]
  );
}

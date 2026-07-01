"use client";

import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { toast } from "sonner";

import { MobileHeroActions } from "@/components/shared/mobile/mobile-hero-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProtectedMobilePage } from "@/features/auth/components/protected-mobile-page";
import { FEATURED_MATCH_POLL_MS } from "@/features/home/constants/home.constants";
import { RankingActivityCard } from "@/features/ranking/components/ranking-activity-card";
import { RankingEmptyState } from "@/features/ranking/components/ranking-empty-state";
import { RankingGeneralList } from "@/features/ranking/components/ranking-general-list";
import { RankingLoadingState } from "@/features/ranking/components/ranking-loading-state";
import { RankingPhaseSelector } from "@/features/ranking/components/ranking-phase-selector";
import { RankingStatsGrid } from "@/features/ranking/components/ranking-stats-grid";
import {
  aggregateRankingDatasets,
  getDefaultRankingScope,
  getRankingPhasesForScope,
  getRankingPhasesWithFinalizedMatches,
  getRankingScopeLabel,
  getRankingScopeOptions,
  getRankingScopeSummaryLabel,
} from "@/features/ranking/helpers/ranking-phase.helpers";
import { pronosticosService } from "@/features/pronosticos/services/pronosticos.service";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import { getRankingCurrentUserRow } from "@/features/ranking/helpers/ranking.helpers";
import { rankingPhasesService } from "@/features/ranking/services/ranking-phases.service";
import { rankingService } from "@/features/ranking/services/ranking.service";
import type {
  RankingPhase,
  RankingScopeValue,
} from "@/features/ranking/types/ranking-phase.types";
import type {
  RankingHistorial,
  RankingRow,
} from "@/features/ranking/types/ranking.types";
import { cheddar } from "@/lib/fonts";
import { useAuthStore } from "@/stores/auth.store";

const RANKING_HERO_MASCOT = ["/mascotas/ranking.png"];

export function MobileRankingPage() {
  const { user } = useAuthStore();

  const [miRanking, setMiRanking] = useState<RankingRow | null>(null);
  const [ranking, setRanking] = useState<RankingRow[]>([]);
  const [historial, setHistorial] = useState<RankingHistorial[]>([]);
  const [fases, setFases] = useState<RankingPhase[]>([]);
  const [partidos, setPartidos] = useState<PronosticoPartido[]>([]);
  const [faseActiva, setFaseActiva] = useState<RankingPhase | null>(null);
  const [selectedScope, setSelectedScope] =
    useState<RankingScopeValue>("grupos");
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceTime, setReferenceTime] = useState(() => Date.now());
  const [nextRefreshAt, setNextRefreshAt] = useState(
    () => Date.now() + FEATURED_MATCH_POLL_MS
  );

  const rankingOptions = useMemo(
    () => getRankingScopeOptions(faseActiva),
    [faseActiva]
  );
  const selectedLabel = getRankingScopeLabel(selectedScope);
  const summaryScopeLabel = getRankingScopeSummaryLabel(selectedScope);
  const currentUserRow = useMemo(
    () => miRanking ?? getRankingCurrentUserRow(ranking, user?.id),
    [miRanking, ranking, user?.id]
  );
  const refreshInSeconds = useMemo(
    () => Math.max(0, Math.ceil((nextRefreshAt - referenceTime) / 1000)),
    [nextRefreshAt, referenceTime]
  );

  async function loadRankingForScope(
    scope: RankingScopeValue,
    phasesToUse: RankingPhase[],
    partidosToUse: PronosticoPartido[],
    options?: { showLoader?: boolean }
  ) {
    if (options?.showLoader !== false) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    setError(null);

    const targetPhases = getRankingPhasesWithFinalizedMatches(
      getRankingPhasesForScope(scope, phasesToUse),
      partidosToUse
    );

    try {
      const datasets = await Promise.all(
        targetPhases.map((phase) => rankingService.getRanking(phase.id))
      );

      const aggregated = aggregateRankingDatasets(datasets, user?.id);
      setMiRanking(aggregated.miRanking);
      setRanking(aggregated.ranking);
      setHistorial(aggregated.historial);
      setReferenceTime(Date.now());
      setNextRefreshAt(Date.now() + FEATURED_MATCH_POLL_MS);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No pudimos cargar el ranking.";

      setError(message);
      toast.error(message);
      setMiRanking(null);
      setRanking([]);
      setHistorial([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  async function loadInitialRanking() {
    setLoading(true);
    setError(null);

    try {
      const [fasesData, faseActivaData, partidosData] = await Promise.all([
        rankingPhasesService.getFases(),
        rankingPhasesService.getFaseActiva().catch(() => null),
        pronosticosService.getFixturePronosticos(),
      ]);

      setFases(fasesData);
      setFaseActiva(faseActivaData);
      setPartidos(partidosData);

      const defaultScope = getDefaultRankingScope(faseActivaData);
      setSelectedScope(defaultScope);

      await loadRankingForScope(defaultScope, fasesData, partidosData, {
        showLoader: true,
      });
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No pudimos cargar el ranking.";

      setError(message);
      toast.error(message);
      setMiRanking(null);
      setRanking([]);
      setHistorial([]);
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  function handleScopeChange(scope: RankingScopeValue) {
    if (scope === selectedScope) {
      return;
    }

    setSelectedScope(scope);
    void loadRankingForScope(scope, fases, partidos);
  }

  async function refreshRanking() {
    try {
      const partidosData = await pronosticosService.getFixturePronosticos();
      setPartidos(partidosData);
      await loadRankingForScope(selectedScope, fases, partidosData, {
        showLoader: false,
      });
    } catch {
      await loadRankingForScope(selectedScope, fases, partidos, {
        showLoader: false,
      });
    }
  }

  const runInitialRankingLoad = useEffectEvent(() => {
    void loadInitialRanking();
  });
  const loadRankingForScopeFromEffect = useEffectEvent(
    (
      scope: RankingScopeValue,
      phasesToUse: RankingPhase[],
      partidosToUse: PronosticoPartido[],
      options?: { showLoader?: boolean }
    ) => loadRankingForScope(scope, phasesToUse, partidosToUse, options)
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      runInitialRankingLoad();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    async function refreshRankingInterval() {
      try {
        const partidosData = await pronosticosService.getFixturePronosticos();
        setPartidos(partidosData);
        await loadRankingForScopeFromEffect(selectedScope, fases, partidosData, {
          showLoader: false,
        });
      } catch {
        await loadRankingForScopeFromEffect(selectedScope, fases, partidos, {
          showLoader: false,
        });
      }
    }

    const tickId = window.setInterval(() => {
      setReferenceTime(Date.now());
    }, 1000);
    const pollId = window.setInterval(() => {
      void refreshRankingInterval();
    }, FEATURED_MATCH_POLL_MS);

    return () => {
      window.clearInterval(tickId);
      window.clearInterval(pollId);
    };
  }, [selectedScope, fases, partidos]);

  return (
    <ProtectedMobilePage
      title="Ranking"
      subtitle={
        <span
          className={`${cheddar.className} block text-[1.125rem] uppercase leading-none tracking-[0.04em] text-white`}
        >
          Seguí tu posición
          <br />
          y sumá más puntos
        </span>
      }
      eyebrow=""
      heroFooter={
        <MobileHeroActions
          isRefreshing={isRefreshing}
          onRefresh={() => void refreshRanking()}
          refreshLabel={`${refreshInSeconds}s`}
        />
      }
      homeStyleHero
      heroLogoSrc="/brand/massm.png"
      heroMascotSrc={RANKING_HERO_MASCOT}
    >
      <div className="bg-transparent pb-8 text-white">
        <div className="flex w-full flex-col gap-4">
          <section className="-mx-1 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
              Filtros aplicables
            </p>

            <p className="mt-3 text-sm font-semibold text-white/78">
              {selectedLabel}
            </p>

            <div className="mt-3">
              <RankingPhaseSelector
                options={rankingOptions}
                value={selectedScope}
                onValueChange={(value) =>
                  handleScopeChange(value as RankingScopeValue)
                }
              />
            </div>
          </section>

          {error ? (
            <Alert className="rounded-2xl border-red-300/30 bg-red-500/10 text-red-100">
              <AlertTitle>No pudimos cargar el ranking.</AlertTitle>
              <AlertDescription className="text-red-100/80">
                {error}
              </AlertDescription>
            </Alert>
          ) : null}

          {loading ? (
            <RankingLoadingState />
          ) : ranking.length === 0 ? (
            <RankingEmptyState />
          ) : (
            <>
              <section className="-mx-1 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
                  Mi resumen
                </p>

                <div className="mt-3">
                  <RankingStatsGrid
                    row={currentUserRow}
                    scopeLabel={summaryScopeLabel}
                  />
                </div>
              </section>

              <section className="-mx-1 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
                  {selectedLabel}
                </p>
                <div className="mt-3">
                  <RankingGeneralList rows={ranking} currentUserId={user?.id} />
                </div>
              </section>

              <RankingActivityCard historial={historial} title={selectedLabel} />
            </>
          )}
        </div>
      </div>
    </ProtectedMobilePage>
  );
}

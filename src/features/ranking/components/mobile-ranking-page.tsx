"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { MobileHeroActions } from "@/components/shared/mobile/mobile-hero-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ProtectedMobilePage } from "@/features/auth/components/protected-mobile-page";
import { FEATURED_MATCH_POLL_MS } from "@/features/home/constants/home.constants";
import { RankingEmptyState } from "@/features/ranking/components/ranking-empty-state";
import { RankingGeneralList } from "@/features/ranking/components/ranking-general-list";
import { RankingLoadingState } from "@/features/ranking/components/ranking-loading-state";
import { RankingStatsGrid } from "@/features/ranking/components/ranking-stats-grid";
import { getRankingCurrentUserRow } from "@/features/ranking/helpers/ranking.helpers";
import { rankingService } from "@/features/ranking/services/ranking.service";
import type { RankingRow } from "@/features/ranking/types/ranking.types";
import { cheddar } from "@/lib/fonts";
import { useAuthStore } from "@/stores/auth.store";

const RANKING_HERO_MASCOT = ["/mascotas/ranking.png"];

export function MobileRankingPage() {
  const { user } = useAuthStore();

  const [miRanking, setMiRanking] = useState<RankingRow | null>(null);
  const [ranking, setRanking] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceTime, setReferenceTime] = useState(() => Date.now());
  const [nextRefreshAt, setNextRefreshAt] = useState(
    () => Date.now() + FEATURED_MATCH_POLL_MS
  );

  const currentUserRow = useMemo(
    () => miRanking ?? getRankingCurrentUserRow(ranking, user?.id),
    [miRanking, ranking, user?.id]
  );
  const refreshInSeconds = useMemo(
    () => Math.max(0, Math.ceil((nextRefreshAt - referenceTime) / 1000)),
    [nextRefreshAt, referenceTime]
  );

  async function loadRanking(options?: { showLoader?: boolean }) {
    if (options?.showLoader !== false) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    setError(null);

    try {
      const data = await rankingService.getRanking();
      setMiRanking(data.miRanking);
      setRanking(data.ranking);
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
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void loadRanking();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const tickId = window.setInterval(() => {
      setReferenceTime(Date.now());
    }, 1000);
    const pollId = window.setInterval(() => {
      void loadRanking({ showLoader: false });
    }, FEATURED_MATCH_POLL_MS);

    return () => {
      window.clearInterval(tickId);
      window.clearInterval(pollId);
    };
  }, []);

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
          onRefresh={() => void loadRanking()}
          refreshLabel={`${refreshInSeconds}s`}
        />
      }
      homeStyleHero
      heroLogoSrc="/brand/massm.png"
      heroMascotSrc={RANKING_HERO_MASCOT}
    >
      <div className="bg-transparent pb-8 text-white">
        <div className="flex w-full flex-col gap-4">
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
                  <RankingStatsGrid row={currentUserRow} />
                </div>
              </section>

              <section className="-mx-1 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
                  Tabla general
                </p>
                <div className="mt-3">
                  <RankingGeneralList rows={ranking} currentUserId={user?.id} />
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </ProtectedMobilePage>
  );
}

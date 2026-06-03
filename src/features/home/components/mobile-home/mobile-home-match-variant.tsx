"use client";

import { useEffect, useMemo, useState } from "react";

import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import { getFixtureStatus } from "@/features/fixture/utils/fixture.helpers";
import { FEATURED_MATCH_POLL_MS } from "@/features/home/constants/home.constants";
import { MAX_LIVE_MATCHES_HOME } from "@/features/home/constants/mobile-home.constants";
import { useHomeDashboard } from "@/features/home/hooks/use-home-dashboard";
import { EnablePushNotificationsCard } from "@/features/notifications/components/enable-push-notifications-card";
import { pronosticosService } from "@/features/pronosticos/services/pronosticos.service";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import { HomeCompactHero } from "./home-compact-hero";
import { HomeSummaryRow } from "./home-summary-row";
import { HomeUpcomingMatchesCard } from "./home-upcoming-matches-card";
import { LiveMatchesStrip } from "./live-matches-strip";
import { QuickActionsGrid } from "./quick-actions-grid";
import { SectionDivider } from "./section-divider";

type MobileHomeMatchVariantProps = {
  userName: string;
  userStatus: string;
  onLogout: () => void | Promise<void>;
};

export function MobileHomeMatchVariant({
  userName,
  userStatus,
  onLogout,
}: MobileHomeMatchVariantProps) {
  const [fixtureMatches, setFixtureMatches] = useState<PronosticoPartido[]>([]);
  const [hasFixtureData, setHasFixtureData] = useState(false);
  const [referenceTime, setReferenceTime] = useState(() => Date.now());
  const [nextRefreshAt, setNextRefreshAt] = useState(
    () => Date.now() + FEATURED_MATCH_POLL_MS
  );

  const nextFeaturedMatchId = useMemo(() => {
    const nextMatch = fixtureMatches.find((partido) => {
      const status = getFixtureStatus(partido);
      return !status.isFinished && !status.isLive;
    });

    return nextMatch?.id;
  }, [fixtureMatches]);

  const dashboard = useHomeDashboard(nextFeaturedMatchId);

  const visibleLiveMatches = useMemo(
    () =>
      fixtureMatches
        .filter((partido) => getFixtureStatus(partido).isLive)
        .slice(0, MAX_LIVE_MATCHES_HOME),
    [fixtureMatches]
  );

  const upcomingMatches = useMemo(
    () =>
      fixtureMatches
        .filter((partido) => {
          const status = getFixtureStatus(partido);
          return status.isUpcoming && !status.isLive && !status.isFinished && !status.isClosed;
        })
        .slice(0, 3),
    [fixtureMatches]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadFixtureMatches() {
      try {
        const partidos = await pronosticosService.getFixturePronosticos();

        if (cancelled) return;

        const sorted = [...partidos].sort(
          (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        );

        setFixtureMatches(sorted);
        setHasFixtureData(true);
        setReferenceTime(Date.now());
        setNextRefreshAt(Date.now() + FEATURED_MATCH_POLL_MS);
      } catch {
        if (!cancelled) {
          setFixtureMatches([]);
          setHasFixtureData(false);
          setReferenceTime(Date.now());
          setNextRefreshAt(Date.now() + FEATURED_MATCH_POLL_MS);
        }
      }
    }

    void loadFixtureMatches();

    const tickId = window.setInterval(() => {
      setReferenceTime(Date.now());
    }, 1000);

    const pollId = window.setInterval(() => {
      void loadFixtureMatches();
    }, FEATURED_MATCH_POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(tickId);
      window.clearInterval(pollId);
    };
  }, []);

  const refreshInSeconds = Math.max(
    0,
    Math.ceil((nextRefreshAt - referenceTime) / 1000)
  );

  return (
    <div className="mb-4 flex flex-col gap-2">
      <HomeCompactHero
        userName={userName}
        userStatus={userStatus}
        phaseLabel={upcomingMatches[0]?.fase?.nombre ?? "Fase de grupos"}
        refreshLabel={`${refreshInSeconds}s`}
        onLogout={onLogout}
      />

      <SectionDivider />

      {upcomingMatches.length > 0 ? (
        <>
          <HomeUpcomingMatchesCard matches={upcomingMatches} />
          <SectionDivider />
        </>
      ) : null}

      <LiveMatchesStrip matches={visibleLiveMatches as FixturePartido[]} />

      <QuickActionsGrid
        pronosticosLabel={
          dashboard.isLoading
            ? "Cargando información..."
            : `${dashboard.data.pronosticados}/${dashboard.data.totalPronosticables} ya cargadas`
        }
        rankingLabel={
          dashboard.isLoading
            ? "Cargando información..."
            : dashboard.data.rankingPosicion
              ? `Estás en el puesto #${dashboard.data.rankingPosicion}`
              : "Todavía sin posición general"
        }
        fixtureLabel={
          dashboard.isLoading
            ? "Cargando información..."
            : `${dashboard.data.faseActualTotal} partidos en ${dashboard.data.faseActualLabel.toLowerCase()}`
        }
      />

      <EnablePushNotificationsCard />

      <HomeSummaryRow
        fuente={hasFixtureData ? "API" : "Sin datos"}
        faseLabel={dashboard.isLoading ? "Fixture" : dashboard.data.faseActualLabel}
        faseValue={
          dashboard.isLoading
            ? "Cargando..."
            : `${dashboard.data.faseActualJugados}/${dashboard.data.faseActualTotal} jugados`
        }
      />
    </div>
  );
}

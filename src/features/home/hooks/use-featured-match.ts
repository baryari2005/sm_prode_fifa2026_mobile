"use client";

import { useEffect, useMemo, useState } from "react";
import { fixtureService } from "@/features/fixture/services/fixture.service";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import { FEATURED_MATCH_POLL_MS } from "@/features/home/constants/home.constants";
import type { FeaturedMatchState } from "@/features/home/types/mobile-home.types";

const featuredMatchFallback: FixturePartido = {
  id: "home-featured-match",
  fecha: "2026-05-20T21:45:00-03:00",
  estadio: "MetLife Stadium",
  ciudad: "New York",
  fase: {
    id: 1,
    nombre: "Fase de grupos",
    grupo: "A",
    grupoCodigo: "A",
    grupoNombre: "Grupo A",
  },
  seleccionLocal: {
    id: "arg",
    nombre: "Argentina",
    codigo: "ARG",
  },
  seleccionVisitante: {
    id: "bra",
    nombre: "Brasil",
    codigo: "BRA",
  },
  resultado: {
    golesLocal: 0,
    golesVisitante: 0,
    estado: "PROGRAMADO",
  },
};

export function getCountdownLabel(date: string) {
  const diffMinutes = Math.max(
    0,
    Math.round((new Date(date).getTime() - Date.now()) / 60000)
  );

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (hours <= 0) {
    return `${minutes}m`;
  }

  return `${hours}h ${minutes}m`;
}

export function useFeaturedMatch(): FeaturedMatchState {
  const [realMatch, setRealMatch] = useState<FixturePartido | null>(null);
  const [liveMatches, setLiveMatches] = useState<FixturePartido[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [referenceTime, setReferenceTime] = useState(() => Date.now());
  const [nextRefreshAt, setNextRefreshAt] = useState(() => Date.now() + FEATURED_MATCH_POLL_MS);

  useEffect(() => {
    let cancelled = false;

    async function loadFeaturedMatch() {
      setIsLoading((current) => current);

      try {
        const partidos = await fixtureService.getPartidos();

        if (cancelled) return;

        const sorted = [...partidos].sort(
          (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        );
        const now = Date.now();
        const nextMatch =
          sorted.find((partido) => new Date(partido.fecha).getTime() >= now) ??
          sorted[0] ??
          null;
        const currentLiveMatches = sorted.filter(
          (partido) => partido.resultado?.estado?.toUpperCase() === "EN_JUEGO"
        );

        setRealMatch(nextMatch);
        setLiveMatches(currentLiveMatches);
        setReferenceTime(Date.now());
        setNextRefreshAt(Date.now() + FEATURED_MATCH_POLL_MS);
      } catch {
        if (!cancelled) {
          setRealMatch(null);
          setLiveMatches([]);
          setReferenceTime(Date.now());
          setNextRefreshAt(Date.now() + FEATURED_MATCH_POLL_MS);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadFeaturedMatch();
    const tickId = window.setInterval(() => {
      setReferenceTime(Date.now());
    }, 1000);
    const pollId = window.setInterval(() => {
      void loadFeaturedMatch();
    }, FEATURED_MATCH_POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(tickId);
      window.clearInterval(pollId);
    };
  }, []);

  return useMemo(
    () => ({
      match: realMatch ?? featuredMatchFallback,
      liveMatches,
      isLoading,
      isFallback: realMatch === null,
      referenceTime,
      refreshInSeconds: Math.max(
        0,
        Math.ceil((nextRefreshAt - referenceTime) / 1000)
      ),
    }),
    [isLoading, liveMatches, nextRefreshAt, realMatch, referenceTime]
  );
}

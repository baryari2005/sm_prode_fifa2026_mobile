"use client";

import { useEffect, useMemo, useRef } from "react";

import { fixtureService } from "@/features/fixture/services/fixture.service";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import type {
  LiveEventPayload,
  LiveEventSnapshot,
} from "@/features/live-events/types/live-event.types";
import { FEATURED_MATCH_POLL_MS } from "@/features/home/constants/home.constants";
import { useLiveEventStore } from "@/stores/live-event.store";

export function useLiveEventOverlay() {
  const enqueueEvent = useLiveEventStore((state) => state.enqueueEvent);
  const currentEvent = useLiveEventStore((state) => state.currentEvent);
  const closeCurrentEvent = useLiveEventStore((state) => state.closeCurrentEvent);
  const snapshotsRef = useRef<Record<string, LiveEventSnapshot>>({});

  useEffect(() => {
    let cancelled = false;

    async function loadAndDetectEvents() {
      try {
        const partidos = await fixtureService.getPartidos();

        if (cancelled) {
          return;
        }

        const nextSnapshots: Record<string, LiveEventSnapshot> = {};

        for (const partido of partidos) {
          const nextSnapshot = buildSnapshot(partido);
          nextSnapshots[partido.id] = nextSnapshot;

          const previousSnapshot = snapshotsRef.current[partido.id] ?? null;
          const detectedEvents = detectLiveEvents(previousSnapshot, partido);

          for (const event of detectedEvents) {
            enqueueEvent(event);
          }
        }

        snapshotsRef.current = nextSnapshots;
      } catch {
        // Silencioso: no interrumpimos la UX principal por fallas del polling.
      }
    }

    void loadAndDetectEvents();
    const pollId = window.setInterval(() => {
      void loadAndDetectEvents();
    }, FEATURED_MATCH_POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
    };
  }, [enqueueEvent]);

  return useMemo(
    () => ({
      currentEvent: currentEvent?.event ?? null,
      currentEventId: currentEvent?.id ?? null,
      closeCurrentEvent,
    }),
    [closeCurrentEvent, currentEvent]
  );
}

function buildSnapshot(partido: FixturePartido): LiveEventSnapshot {
  return {
    partidoId: partido.id,
    estado: partido.resultado?.estado?.toUpperCase() ?? null,
    golesLocal: partido.resultado?.golesLocal ?? 0,
    golesVisitante: partido.resultado?.golesVisitante ?? 0,
    minuto: partido.resultado?.tiempoJuego ?? null,
  };
}

function detectLiveEvents(
  previous: LiveEventSnapshot | null,
  partido: FixturePartido
) {
  if (!previous) {
    return [];
  }

  const current = buildSnapshot(partido);
  const events: LiveEventPayload[] = [];

  if (!isLiveLike(previous.estado) && isLiveLike(current.estado)) {
    events.push({
      ...buildBasePayload(partido, current),
      variant: "kickoff",
      mensaje: "La pelota ya rueda",
      imageSrc: "/festejos/comienza.png",
    });
  }

  if (!isHalftimeLike(previous.estado) && isHalftimeLike(current.estado)) {
    events.push({
      ...buildBasePayload(partido, current),
      variant: "halftime",
      imageSrc: "/festejos/entretiempo.png",
    });
  }

  if (!isFinalLike(previous.estado) && isFinalLike(current.estado)) {
    events.push({
      ...buildBasePayload(partido, current),
      variant: "final",
      mensaje: "El ranking se actualizará según las reglas del prode",
      imageSrc: "/festejos/finalizado.png",
    });
  }

  const previousTotal = previous.golesLocal + previous.golesVisitante;
  const currentTotal = current.golesLocal + current.golesVisitante;

  if (
    currentTotal > previousTotal &&
    (isLiveLike(current.estado) || isFinalLike(current.estado))
  ) {
    const equipoGol =
      current.golesLocal > previous.golesLocal
        ? partido.seleccionLocal?.nombre ?? "Equipo local"
        : current.golesVisitante > previous.golesVisitante
          ? partido.seleccionVisitante?.nombre ?? "Equipo visitante"
          : "Gol confirmado";

    events.push({
      ...buildBasePayload(partido, current),
      variant: "goal",
      equipoGol,
      jugador: "Autor por confirmar",
      minuto: current.minuto ?? undefined,
      imageSrc: getRandomGoalImage(),
    });
  }

  return events;
}

function isLiveLike(status: string | null) {
  return status === "EN_JUEGO" || status === "EN VIVO" || status === "LIVE";
}

function isHalftimeLike(status: string | null) {
  return (
    status === "ENTRETIEMPO" ||
    status === "HALFTIME" ||
    status === "DESCANSO"
  );
}

function isFinalLike(status: string | null) {
  return (
    status === "FINALIZADO" ||
    status === "FINAL" ||
    status === "FIN" ||
    status === "TERMINADO"
  );
}

function getRandomGoalImage() {
  const goalIndex = Math.floor(Math.random() * 6) + 1;
  return `/festejos/gol${goalIndex}.png`;
}

function buildBasePayload(
  partido: FixturePartido,
  snapshot: LiveEventSnapshot
): Omit<LiveEventPayload, "variant"> {
  return {
    partidoId: partido.id,
    equipoLocal: partido.seleccionLocal?.nombre ?? "Local",
    equipoVisitante: partido.seleccionVisitante?.nombre ?? "Visitante",
    escudoLocal:
      partido.seleccionLocal?.bandera ??
      partido.seleccionLocal?.flag ??
      partido.seleccionLocal?.banderaUrl ??
      partido.seleccionLocal?.flagUrl ??
      undefined,
    escudoVisitante:
      partido.seleccionVisitante?.bandera ??
      partido.seleccionVisitante?.flag ??
      partido.seleccionVisitante?.banderaUrl ??
      partido.seleccionVisitante?.flagUrl ??
      undefined,
    banderaLocal:
      partido.seleccionLocal?.bandera ??
      partido.seleccionLocal?.flag ??
      partido.seleccionLocal?.banderaUrl ??
      partido.seleccionLocal?.flagUrl ??
      undefined,
    banderaVisitante:
      partido.seleccionVisitante?.bandera ??
      partido.seleccionVisitante?.flag ??
      partido.seleccionVisitante?.banderaUrl ??
      partido.seleccionVisitante?.flagUrl ??
      undefined,
    golesLocal: snapshot.golesLocal,
    golesVisitante: snapshot.golesVisitante,
    minuto: snapshot.minuto ?? undefined,
  };
}

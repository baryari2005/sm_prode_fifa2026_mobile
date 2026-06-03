import type {
  LiveEventPayload,
} from "@/features/live-events/types/live-event.types";

type LiveEventCopy = {
  title: string;
  lines: string[];
};

export function getLiveEventCopy(event: LiveEventPayload): LiveEventCopy {
  if (event.variant === "goal") {
    return {
      title: "GOOOL",
      lines: [
        event.equipoGol ?? "Gol confirmado",
        buildGoalMeta(event),
        buildScoreLine(event),
      ],
    };
  }

  if (event.variant === "kickoff") {
    return {
      title: "¡Comenzó el partido!",
      lines: [
        buildTeamsLine(event),
        event.minuto != null ? `${event.minuto}' en juego` : "La pelota ya rueda",
      ],
    };
  }

  if (event.variant === "halftime") {
    return {
      title: "Entretiempo",
      lines: [
        buildScoreLine(event),
        event.mensaje ?? "Respirá, todavía queda partido.",
      ],
    };
  }

  if (event.variant === "final") {
    return {
      title: "Partido finalizado",
      lines: [
        buildScoreLine(event),
        event.mensaje ?? "Resultado confirmado",
      ],
    };
  }

  return {
    title: "Actualización en vivo",
    lines: [event.mensaje ?? "Hubo un cambio en el estado del partido."],
  };
}

function buildGoalMeta(event: LiveEventPayload) {
  const minuteLabel =
    event.minuto != null ? `${event.minuto}'` : "Minuto por confirmar";
  const playerLabel = event.jugador?.trim() || "Autor por confirmar";
  return `${minuteLabel} · ${playerLabel}`;
}

function buildScoreLine(event: LiveEventPayload) {
  if (
    event.equipoLocal &&
    event.equipoVisitante &&
    event.golesLocal != null &&
    event.golesVisitante != null
  ) {
    return `${event.equipoLocal} ${event.golesLocal} - ${event.golesVisitante} ${event.equipoVisitante}`;
  }

  return buildTeamsLine(event);
}

function buildTeamsLine(event: LiveEventPayload) {
  return `${event.equipoLocal ?? "Local"} vs ${event.equipoVisitante ?? "Visitante"}`;
}

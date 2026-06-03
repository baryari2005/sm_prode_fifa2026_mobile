import type { FixturePartido } from "@/features/fixture/types/fixture.types";

export type LiveEventVariant =
  | "kickoff"
  | "goal"
  | "halftime"
  | "final"
  | "error";

export type LiveEventPayload = {
  variant: LiveEventVariant;
  partidoId?: string;
  imageSrc?: string;
  equipoLocal?: string;
  equipoVisitante?: string;
  equipoGol?: string;
  escudoLocal?: string;
  escudoVisitante?: string;
  banderaLocal?: string;
  banderaVisitante?: string;
  golesLocal?: number;
  golesVisitante?: number;
  minuto?: number;
  jugador?: string;
  mensaje?: string;
};

export type LiveEventItem = {
  id: string;
  event: LiveEventPayload;
  createdAt: number;
};

export type LiveEventSnapshot = {
  partidoId: string;
  estado: string | null;
  golesLocal: number;
  golesVisitante: number;
  minuto: number | null;
};

export type LiveEventStyle = {
  durationMs: number;
  mascotSrc: string;
  accentClassName: string;
  glowClassName: string;
  confetti: boolean;
};

export type LiveEventDetectedContext = {
  previous: LiveEventSnapshot | null;
  current: FixturePartido;
};

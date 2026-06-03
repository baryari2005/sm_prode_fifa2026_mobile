import type { FixturePartido } from "@/features/fixture/types/fixture.types";

export type PronosticoExistente = {
  golesLocal: number | null;
  golesVisitante: number | null;
};

export type PronosticoPartido = FixturePartido & {
  miPrediccion?: PronosticoExistente | null;
  pronostico?: PronosticoExistente | null;
  prediccion?: PronosticoExistente | null;
};

export type PronosticosFixtureResponse =
  | PronosticoPartido[]
  | {
      data?: PronosticoPartido[];
      partidos?: PronosticoPartido[];
    };

export type UpsertPronosticoPayload = {
  partidoId: string;
  golesLocal: number;
  golesVisitante: number;
};

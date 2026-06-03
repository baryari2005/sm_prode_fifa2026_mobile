import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import type { ReglaPuntaje } from "@/features/ranking/types/ranking-rules.types";

export type RankingScoringRule = {
  title: string;
  value: string;
};

export function getCurrentPhaseFromFixture(partidos: FixturePartido[]) {
  const sorted = [...partidos].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  const relevant =
    sorted.find((partido) => {
      const estado = partido.resultado?.estado?.toUpperCase();
      return estado !== "FINALIZADO";
    }) ??
    sorted[0] ??
    null;

  return {
    faseId: relevant?.fase?.id ?? null,
    faseNombre: relevant?.fase?.nombre ?? "Fase actual",
  };
}

export function getRuleForCurrentPhase(
  reglas: ReglaPuntaje[],
  phase: { faseId: number | null; faseNombre: string | null }
) {
  if (phase.faseId != null) {
    const byId = reglas.find((regla) => regla.faseId === phase.faseId);
    if (byId) {
      return byId;
    }
  }

  if (phase.faseNombre) {
    const target = normalizeLabel(phase.faseNombre);
    const byName = reglas.find(
      (regla) => regla.faseNombre && normalizeLabel(regla.faseNombre) === target
    );

    if (byName) {
      return byName;
    }
  }

  return reglas[0] ?? null;
}

export function buildRankingScoringRules(regla: ReglaPuntaje | null) {
  return [
    {
      title: "Resultado exacto",
      value: `${regla?.puntosExacto ?? 3} puntos`,
    },
    {
      title: "Ganador o empate correcto",
      value: `${regla?.puntosTendencia ?? 1} punto${
        (regla?.puntosTendencia ?? 1) === 1 ? "" : "s"
      }`,
    },
    {
      title: "Resultado incorrecto",
      value: `${regla?.puntosIncorrecto ?? 0} puntos`,
    },
  ] satisfies RankingScoringRule[];
}

function normalizeLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase();
}

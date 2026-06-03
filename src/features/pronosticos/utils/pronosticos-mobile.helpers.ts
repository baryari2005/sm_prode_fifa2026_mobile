import {
  buildFixtureDateSections,
  formatFixtureTime12h,
  getFixtureStatus,
  groupPartidosByDate,
} from "@/features/fixture/utils/fixture.helpers";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import {
  getPredictionReference,
  isPronosticoBlocked,
} from "@/features/pronosticos/utils/pronosticos.helpers";

export type PronosticosQuickFilter =
  | "todos"
  | "abiertos"
  | "cierra-pronto"
  | "cerrados"
  | "finalizados";

export type MisPronosticosQuickFilter =
  | "todas"
  | "cerradas"
  | "finalizadas";

export function getPronosticoVisualStatus(partido: PronosticoPartido) {
  const fixtureStatus = getFixtureStatus(partido);
  const actual = getPredictionReference(partido);
  const blocked = isPronosticoBlocked(partido);

  if (fixtureStatus.isFinished) {
    return {
      key: "finalizado",
      label: "Finalizado",
      shortLabel: "Finalizado",
      className:
        "border-emerald-300/18 bg-emerald-400/12 text-emerald-100",
      canEdit: false,
      canOpen: Boolean(actual),
    };
  }

  if (fixtureStatus.isLive) {
    return {
      key: "cerrado",
      label: "En vivo",
      shortLabel: "Cerrado",
      className: "border-cyan-300/18 bg-cyan-400/12 text-cyan-100",
      canEdit: false,
      canOpen: Boolean(actual),
    };
  }

  if (blocked) {
    return {
      key: "cerrado",
      label: "Cerrado",
      shortLabel: "Cerrado",
      className: "border-red-300/18 bg-red-500/12 text-red-100",
      canEdit: false,
      canOpen: Boolean(actual),
    };
  }

  if (fixtureStatus.isCloseSoon) {
    return {
      key: "cierra-pronto",
      label: "Cierra pronto",
      shortLabel: "Cierra pronto",
      className: "border-[#F7B731]/20 bg-[#F7B731]/12 text-[#F7E7A1]",
      canEdit: true,
      canOpen: true,
    };
  }

  return {
    key: "abierto",
    label: "Abierto",
    shortLabel: "Abierto",
    className: "border-teal-300/18 bg-teal-400/12 text-teal-100",
    canEdit: true,
    canOpen: true,
  };
}

export function buildPronosticosQuickFilterCounts(partidos: PronosticoPartido[]) {
  return partidos.reduce<Record<PronosticosQuickFilter, number>>(
    (acc, partido) => {
      const status = getPronosticoVisualStatus(partido);

      acc.todos += 1;

      if (status.key === "abierto") {
        acc.abiertos += 1;
      }

      if (status.key === "cierra-pronto") {
        acc["cierra-pronto"] += 1;
      }

      if (status.key === "cerrado") {
        acc.cerrados += 1;
      }

      if (status.key === "finalizado") {
        acc.finalizados += 1;
      }

      return acc;
    },
    {
      todos: 0,
      abiertos: 0,
      "cierra-pronto": 0,
      cerrados: 0,
      finalizados: 0,
    }
  );
}

export function filterPronosticosPartidos(
  partidos: PronosticoPartido[],
  filter: PronosticosQuickFilter
) {
  return partidos.filter((partido) => {
    const status = getPronosticoVisualStatus(partido);

    if (filter === "todos") {
      return true;
    }

    if (filter === "abiertos") {
      return status.key === "abierto";
    }

    if (filter === "cierra-pronto") {
      return status.key === "cierra-pronto";
    }

    if (filter === "cerrados") {
      return status.key === "cerrado";
    }

    return status.key === "finalizado";
  });
}

export function buildMisPronosticosQuickFilterCounts(
  partidos: PronosticoPartido[]
) {
  return partidos.reduce<Record<MisPronosticosQuickFilter, number>>(
    (acc, partido) => {
      const actual = getPredictionReference(partido);

      if (!actual) {
        return acc;
      }

      const status = getPronosticoVisualStatus(partido);

      if (status.canEdit) {
        return acc;
      }

      acc.todas += 1;

      if (status.key === "cerrado") {
        acc.cerradas += 1;
      }

      if (status.key === "finalizado") {
        acc.finalizadas += 1;
      }

      return acc;
    },
    {
      todas: 0,
      cerradas: 0,
      finalizadas: 0,
    }
  );
}

export function filterMisPronosticosPartidos(
  partidos: PronosticoPartido[],
  filter: MisPronosticosQuickFilter
) {
  return partidos.filter((partido) => {
    const actual = getPredictionReference(partido);

    if (!actual) {
      return false;
    }

    const status = getPronosticoVisualStatus(partido);

    if (status.canEdit) {
      return false;
    }

    if (filter === "todas") {
      return true;
    }

    if (filter === "cerradas") {
      return status.key === "cerrado";
    }

    return status.key === "finalizado";
  });
}

export function buildPronosticosDateSections(partidos: PronosticoPartido[]) {
  return buildFixtureDateSections(groupPartidosByDate(partidos));
}

export function getPronosticoActionLabel(partido: PronosticoPartido) {
  const status = getPronosticoVisualStatus(partido);
  const actual = getPredictionReference(partido);

  if (!status.canOpen) {
    return "Sin acción";
  }

  if (!status.canEdit) {
    return actual ? "Ver pronóstico" : "Ver partido";
  }

  return actual ? "Editar pronóstico" : "Cargar pronóstico";
}

export function getPronosticoCenterLabel(partido: PronosticoPartido) {
  const fixtureStatus = getFixtureStatus(partido);

  if (fixtureStatus.isFinished || fixtureStatus.isLive) {
    return `${partido.resultado?.golesLocal ?? 0} - ${partido.resultado?.golesVisitante ?? 0}`;
  }

  return formatFixtureTime12h(partido.fecha);
}

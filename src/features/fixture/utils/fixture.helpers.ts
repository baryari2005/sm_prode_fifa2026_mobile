import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import { PREDICTION_CLOSE_MINUTES_BEFORE } from "@/features/pronosticos/utils/pronosticos.helpers";

export const DAYS_PER_SECTION = 3;

export type FixtureDateGroup = [string, FixturePartido[]];
export type FixtureQuickFilter = "todos" | "proximos" | "en-vivo" | "finalizados";

export type FixtureStatusMeta = {
  key: "proximo" | "cierra-pronto" | "cerrado" | "en-vivo" | "finalizado";
  label: string;
  shortLabel: string;
  className: string;
  isFinished: boolean;
  isLive: boolean;
  isUpcoming: boolean;
  isClosed: boolean;
  isCloseSoon: boolean;
};

function isGroupStageLabel(label: string | null | undefined) {
  if (!label) {
    return false;
  }

  const normalized = label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return normalized.includes("grupo");
}

export function getFixturePhaseLabel(partido: Pick<FixturePartido, "fase">) {
  const phase = partido.fase;

  if (!phase) {
    return "Sin fase";
  }

  if (phase.nombre && !isGroupStageLabel(phase.nombre)) {
    return phase.nombre;
  }

  return phase.grupoNombre ?? phase.grupoCodigo ?? phase.nombre ?? "Sin fase";
}

export function formatFixtureDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatFixtureDateShort(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(date));
}

export function formatFixtureDayLabel(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
  })
    .format(new Date(date))
    .replace(".", "")
    .toUpperCase();
}

export function formatFixtureTime(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatFixtureTime12h(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(date));
}

export function getFixtureStatus(partido: FixturePartido): FixtureStatusMeta {
  const estado = partido.resultado?.estado?.toUpperCase();

  if (estado === "FINALIZADO") {
    return {
      key: "finalizado",
      label: "Finalizado",
      shortLabel: "Finalizado",
      className: "border-emerald-300/20 bg-emerald-400/12 text-emerald-100",
      isFinished: true,
      isLive: false,
      isUpcoming: false,
      isClosed: true,
      isCloseSoon: false,
    };
  }

  if (estado === "EN_JUEGO") {
    return {
      key: "en-vivo",
      label: partido.resultado?.tiempoJuego
        ? `En vivo · ${partido.resultado.tiempoJuego}'`
        : "En vivo",
      shortLabel: "En vivo",
      className: "border-cyan-300/20 bg-cyan-400/12 text-cyan-100",
      isFinished: false,
      isLive: true,
      isUpcoming: false,
      isClosed: false,
      isCloseSoon: false,
    };
  }

  const matchDate = new Date(partido.fecha);
  const diffMinutes = Math.round((matchDate.getTime() - Date.now()) / 60000);

  if (diffMinutes <= PREDICTION_CLOSE_MINUTES_BEFORE && diffMinutes > 0) {
    return {
      key: "cierra-pronto",
      label: "Cierra pronto",
      shortLabel: "Cierra pronto",
      className: "border-amber-300/20 bg-amber-300/12 text-amber-100",
      isFinished: false,
      isLive: false,
      isUpcoming: true,
      isClosed: false,
      isCloseSoon: true,
    };
  }

  if (diffMinutes <= 0) {
    return {
      key: "cerrado",
      label: "Cerrado",
      shortLabel: "Cerrado",
      className: "border-red-300/20 bg-[rgba(95,18,28,0.28)] text-red-100",
      isFinished: false,
      isLive: false,
      isUpcoming: true,
      isClosed: true,
      isCloseSoon: false,
    };
  }

  return {
    key: "proximo",
    label: "Próximo",
    shortLabel: "Próximo",
    className: "border-teal-300/20 bg-teal-400/12 text-teal-100",
    isFinished: false,
    isLive: false,
    isUpcoming: true,
    isClosed: false,
    isCloseSoon: false,
  };
}

export function groupPartidosByDate(partidos: FixturePartido[]) {
  return partidos.reduce<Record<string, FixturePartido[]>>((acc, partido) => {
    const key = formatFixtureDate(partido.fecha);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(partido);
    return acc;
  }, {});
}

export function buildFixtureDateSections(
  groupedPartidos: Record<string, FixturePartido[]>
) {
  const dateGroups = Object.entries(groupedPartidos) as FixtureDateGroup[];
  const dateSections: FixtureDateGroup[][] = [];

  for (let index = 0; index < dateGroups.length; index += DAYS_PER_SECTION) {
    dateSections.push(dateGroups.slice(index, index + DAYS_PER_SECTION));
  }

  return dateSections;
}

export function getFixtureDateSectionLabel(section: FixtureDateGroup[]) {
  if (section.length === 0) {
    return "Sin fechas";
  }

  const first = section[0]?.[0];
  const last = section[section.length - 1]?.[0];

  if (!first || !last) {
    return "Sin fechas";
  }

  if (first === last) {
    return first;
  }

  return `${first} al ${last}`;
}

export function formatFixtureBlockRange(section: FixtureDateGroup[]) {
  if (section.length === 0) {
    return "Sin fechas";
  }

  const firstDate = section[0]?.[1]?.[0]?.fecha;
  const lastGroup = section[section.length - 1];
  const lastDate = lastGroup?.[1]?.[lastGroup[1].length - 1]?.fecha;

  if (!firstDate || !lastDate) {
    return "Sin fechas";
  }

  const first = formatFixtureDateShort(firstDate);
  const last = formatFixtureDateShort(lastDate);

  return first === last ? first : `${first} al ${last}`;
}

export function filterPartidosByEstado(
  partidos: FixturePartido[],
  filter: FixtureQuickFilter
) {
  if (filter === "todos") {
    return partidos;
  }

  return partidos.filter((partido) => {
    const status = getFixtureStatus(partido);

    if (filter === "proximos") {
      return status.isUpcoming && !status.isLive && !status.isFinished;
    }

    if (filter === "en-vivo") {
      return status.isLive;
    }

    return status.isFinished;
  });
}

export function filterFixtureSectionByDay(
  section: FixtureDateGroup[],
  dayFilter: string
) {
  if (dayFilter === "todos") {
    return section;
  }

  return section.filter(([date]) => date === dayFilter);
}

export function getFixtureDayTabs(section: FixtureDateGroup[]) {
  return [
    {
      value: "todos",
      label: "Todos",
      matchCount: section.reduce((total, [, partidos]) => total + partidos.length, 0),
    },
    ...section.map(([date, partidos]) => ({
      value: date,
      label: formatFixtureDayLabel(partidos[0]?.fecha ?? date),
      matchCount: partidos.length,
    })),
  ];
}

export function findNextUpcomingMatchId(partidos: FixturePartido[]) {
  const now = Date.now();

  const nextMatch = [...partidos]
    .filter((partido) => {
      const status = getFixtureStatus(partido);
      return status.isUpcoming && new Date(partido.fecha).getTime() >= now;
    })
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())[0];

  return nextMatch?.id ?? null;
}

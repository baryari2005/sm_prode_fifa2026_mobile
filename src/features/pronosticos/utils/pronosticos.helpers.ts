import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";

export const PREDICTION_CLOSE_MINUTES_BEFORE = 60;

export function getPredictionReference(partido: PronosticoPartido) {
  return partido.miPrediccion ?? partido.pronostico ?? partido.prediccion ?? null;
}

export function isPronosticoBlocked(partido: PronosticoPartido) {
  const estado = partido.resultado?.estado?.toUpperCase();

  if (estado === "FINALIZADO" || estado === "EN_JUEGO") {
    return true;
  }

  const matchTime = new Date(partido.fecha).getTime();
  const closeTime = matchTime - PREDICTION_CLOSE_MINUTES_BEFORE * 60 * 1000;

  return Date.now() >= closeTime;
}

export function getPronosticoStatus(partido: PronosticoPartido) {
  const estado = partido.resultado?.estado?.toUpperCase();

  if (estado === "FINALIZADO") {
    return {
      label: "Finalizado",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }

  if (estado === "EN_JUEGO") {
    return {
      label: "Cerrado",
      className: "border-red-200 bg-red-50 text-red-700",
    };
  }

  const diffMinutes = Math.round(
    (new Date(partido.fecha).getTime() - Date.now()) / 60000
  );

  if (diffMinutes <= PREDICTION_CLOSE_MINUTES_BEFORE && diffMinutes > 0) {
    return {
      label: "Cierra pronto",
      className: "border-amber-200 bg-amber-50 text-amber-700",
    };
  }

  if (diffMinutes <= 0) {
    return {
      label: "Cerrado",
      className: "border-slate-200 bg-slate-100 text-slate-700",
    };
  }

  return {
    label: "Abierto",
    className: "border-sky-200 bg-sky-50 text-sky-700",
  };
}

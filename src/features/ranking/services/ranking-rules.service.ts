import { axiosInstance } from "@/lib/axios";
import { getApiErrorMessage } from "@/lib/http";
import type {
  ReglaPuntaje,
  ReglasPuntajesResponse,
} from "@/features/ranking/types/ranking-rules.types";

export const rankingRulesService = {
  async getReglasPuntajes(faseId: number) {
    try {
      const response = await axiosInstance.get<ReglasPuntajesResponse>(
        "/reglas-puntaje",
        {
          params: {
            faseId,
          },
        }
      );
      const raw = response.data;
      const items = Array.isArray(raw)
        ? raw
        : Array.isArray(raw.data)
          ? raw.data
          : Array.isArray(raw.reglas)
            ? raw.reglas
            : Array.isArray(raw.items)
              ? raw.items
              : raw && typeof raw === "object"
                ? [raw]
                : [];

      return items
        .map(normalizeReglaPuntaje)
        .filter((item): item is ReglaPuntaje => item !== null);
    } catch (error) {
      throw new Error(
        getApiErrorMessage(
          error,
          "No pudimos cargar las reglas de puntaje."
        )
      );
    }
  },
};

function normalizeReglaPuntaje(value: unknown): ReglaPuntaje | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const fase = asRecord(record.fase);

  return {
    id: asPrimitive(record.id),
    faseId: asNumber(record.faseId ?? record.fase_id ?? fase?.id),
    faseNombre: asString(
      record.faseNombre ??
        record.fase_nombre ??
        record.nombreFase ??
        fase?.nombre
    ),
    puntosExacto: asNumber(
      record.puntosExacto ??
        record.puntajeExacto ??
        record.puntosResultadoExacto ??
        record.puntaje_resultado_exacto ??
        findNumberByKeyHints(record, ["exacto", "resultadoexacto"])
    ),
    puntosTendencia: asNumber(
      record.puntosParcial ??
        record.puntosparcial ??
        record.puntajeParcial ??
        record.puntajeparcial ??
      record.puntosTendencia ??
        record.puntosTendencias ??
        record.puntajeTendencia ??
        record.puntajeTendencias ??
        record.puntosTendenciaCorrecta ??
        record.puntosTendenciaCorrecto ??
        record.puntosAciertoTendencia ??
        record.puntajeAciertoTendencia ??
        record.puntosGanador ??
        record.puntosEmpateGanador ??
        record.puntosGanadorEmpate ??
        record.puntosGanadorOEmpate ??
        record.puntosGanadorOEmpateCorrecto ??
        record.puntajeGanador ??
        record.puntajeEmpateGanador ??
        record.puntaje_ganador_empate ??
        findNumberByKeyHints(record, [
          "puntosparcial",
          "puntajeparcial",
          "tendencia",
          "ganadorempate",
          "ganadoroempate",
          "empateganador",
          "aciertotendencia",
        ])
    ),
    puntosIncorrecto: asNumber(
      record.puntosIncorrecto ??
        record.puntajeIncorrecto ??
        record.puntosSinAcierto ??
        record.puntaje_sin_acierto ??
        findNumberByKeyHints(record, ["incorrecto", "sinacierto"])
    ),
  };
}

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function asPrimitive(value: unknown) {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    value == null
  ) {
    return value;
  }

  return null;
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function findNumberByKeyHints(
  record: Record<string, unknown>,
  hints: string[]
): number | null {
  const normalizedHints = hints.map(normalizeKey);
  const visited = new Set<unknown>();
  const stack: unknown[] = [record];

  while (stack.length > 0) {
    const current = stack.pop();

    if (!current || typeof current !== "object" || visited.has(current)) {
      continue;
    }

    visited.add(current);

    for (const [key, value] of Object.entries(current)) {
      const normalizedKey = normalizeKey(key);

      if (normalizedHints.some((hint) => normalizedKey.includes(hint))) {
        const parsed = asNumber(value);
        if (parsed != null) {
          return parsed;
        }
      }

      if (value && typeof value === "object") {
        stack.push(value);
      }
    }
  }

  return null;
}

function normalizeKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

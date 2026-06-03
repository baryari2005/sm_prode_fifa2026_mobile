import type { RankingRow } from "@/features/ranking/types/ranking.types";

export type RankingView = "general" | "top-3" | "mi-posicion" | "tendencias";
export type RankingTone = "gold" | "silver" | "bronze" | "current" | "default";

export function getRankingInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "?";
}

export function formatRankingPoints(value: number | null | undefined) {
  return `${value ?? 0} pts`;
}

export function isCurrentUserRankingRow(
  row: RankingRow,
  currentUserId?: string | null
) {
  return Boolean(currentUserId) && row.usuarioId === currentUserId;
}

export function getRankingPositionTone(
  position: number,
  isCurrentUser: boolean
): RankingTone {
  if (isCurrentUser) {
    return "current";
  }

  if (position === 1) return "gold";
  if (position === 2) return "silver";
  if (position === 3) return "bronze";
  return "default";
}

export function getRankingTrendLabel(value: number) {
  if (value <= 0) {
    return "Sin tendencia";
  }

  if (value === 1) {
    return "1 tendencia";
  }

  return `${value} tendencias`;
}

export function getRankingTopThree(rows: RankingRow[]) {
  return rows.slice(0, 3);
}

export function getRankingCurrentUserRow(
  rows: RankingRow[],
  currentUserId?: string | null
) {
  if (!currentUserId) {
    return null;
  }

  return rows.find((row) => row.usuarioId === currentUserId) ?? null;
}

export function getRankingRowsForView(
  rows: RankingRow[],
  view: RankingView,
  currentUserId?: string | null
) {
  if (view === "top-3") {
    return rows.slice(0, 3);
  }

  if (view === "mi-posicion") {
    const currentRow = getRankingCurrentUserRow(rows, currentUserId);
    return currentRow ? [currentRow] : [];
  }

  if (view === "tendencias") {
    return rows.filter((row) => row.aciertosTendencia > 0);
  }

  return rows;
}

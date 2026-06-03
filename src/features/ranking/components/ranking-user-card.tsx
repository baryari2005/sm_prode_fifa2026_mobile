import { Sparkles, Target, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  formatRankingPoints,
  getRankingPositionTone,
  getRankingTrendLabel,
  isCurrentUserRankingRow,
} from "@/features/ranking/helpers/ranking.helpers";
import type { RankingRow } from "@/features/ranking/types/ranking.types";
import { cn } from "@/lib/utils";

type RankingUserCardProps = {
  row: RankingRow;
  fallbackPosition: number;
  currentUserId?: string | null;
};

export function RankingUserCard({
  row,
  fallbackPosition,
  currentUserId,
}: RankingUserCardProps) {
  const position = row.posicion ?? fallbackPosition;
  const isCurrentUser = isCurrentUserRankingRow(row, currentUserId);
  const tone = getRankingPositionTone(position, isCurrentUser);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[1.2rem] border p-3 text-white shadow-[0_12px_28px_rgba(0,0,0,0.22)]",
        getCardClasses(tone)
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.07] text-sm font-black text-white">
          #{position}
        </div>

        {/* <Avatar className="size-10 rounded-2xl border border-white/10">
          {row.avatarUrl ? (
            <AvatarImage src={row.avatarUrl} alt={row.nombre} />
          ) : null}
          <AvatarFallback className="rounded-2xl bg-white/[0.10] text-[11px] font-black text-white">
            {getRankingInitials(row.nombre)}
          </AvatarFallback>
        </Avatar> */}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-sm font-black text-white">
              {row.nombre}
            </p>
            {isCurrentUser ? (
              <Badge className="h-5 shrink-0 rounded-full border-cyan-300/25 bg-cyan-400/12 px-2 text-[10px] font-black text-cyan-100">
                Vos
              </Badge>
            ) : null}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-white/56">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <Target className="size-3 text-cyan-200" />
              {row.aciertosExactos} exactos
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <TrendingUp className="size-3 text-[#AEEBFF]" />
              {getRankingTrendLabel(row.aciertosTendencia)}
            </span>
          </div>
        </div>

        <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-right">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#AEEBFF]">
            <Sparkles className="size-3" />
            Puntos
          </div>
          <p className="mt-1 whitespace-nowrap text-base font-black text-white">
            {formatRankingPoints(row.puntosTotales)}
          </p>
        </div>
      </div>

      {/* <div className="mt-3 rounded-[1rem] border border-white/8 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold text-white/56">
        {row.partidosCalificados} de {row.partidosPronosticados} partidos calificados
      </div> */}
    </article>
  );
}

function getCardClasses(tone: ReturnType<typeof getRankingPositionTone>) {
  if (tone === "gold") {
    return "border-[#F7B731]/22 bg-[linear-gradient(135deg,rgba(55,44,13,0.34)_0%,rgba(31,46,74,0.94)_56%,rgba(21,34,55,0.98)_100%)]";
  }

  if (tone === "silver") {
    return "border-white/12 bg-[linear-gradient(135deg,rgba(69,77,88,0.18)_0%,rgba(31,46,74,0.94)_56%,rgba(21,34,55,0.98)_100%)]";
  }

  if (tone === "bronze") {
    return "border-orange-300/18 bg-[linear-gradient(135deg,rgba(92,50,22,0.20)_0%,rgba(31,46,74,0.94)_56%,rgba(21,34,55,0.98)_100%)]";
  }

  if (tone === "current") {
    return "border-cyan-300/22 bg-[linear-gradient(135deg,rgba(12,66,94,0.28)_0%,rgba(31,46,74,0.94)_50%,rgba(21,34,55,0.98)_100%)]";
  }

  return "border-white/10 bg-[linear-gradient(135deg,rgba(36,52,82,0.92)_0%,rgba(30,46,74,0.96)_54%,rgba(21,34,55,0.98)_100%)]";
}

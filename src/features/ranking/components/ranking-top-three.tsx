import { Crown, Medal, Target } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  formatRankingPoints,
  getRankingInitials,
  getRankingPositionTone,
  isCurrentUserRankingRow,
} from "@/features/ranking/helpers/ranking.helpers";
import type { RankingRow } from "@/features/ranking/types/ranking.types";
import { cn } from "@/lib/utils";

type RankingTopThreeProps = {
  rows: RankingRow[];
  currentUserId?: string | null;
};

export function RankingTopThree({
  rows,
  currentUserId,
}: RankingTopThreeProps) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
          Top 3
        </h3>
        <p className="text-xs font-semibold text-white/48">
          Los primeros puestos del grupo
        </p>
      </div>

      <div className="grid gap-3">
        {rows.map((row, index) => {
          const position = row.posicion ?? index + 1;
          const tone = getRankingPositionTone(
            position,
            isCurrentUserRankingRow(row, currentUserId)
          );

          return (
            <article
              key={row.usuarioId}
              className={cn(
                "relative overflow-hidden rounded-[1.45rem] border p-4 text-white shadow-[0_14px_32px_rgba(0,0,0,0.24)]",
                getToneClasses(tone)
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.08]">
                  {position === 1 ? (
                    <Crown className="size-5 text-[#F7B731]" />
                  ) : (
                    <Medal className="size-5 text-white/80" />
                  )}
                </div>

                <Avatar className="size-11 rounded-2xl">
                  {row.avatarUrl ? (
                    <AvatarImage src={row.avatarUrl} alt={row.nombre} />
                  ) : null}
                  <AvatarFallback className="rounded-2xl bg-white/[0.10] text-xs font-black text-white">
                    {getRankingInitials(row.nombre)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-black text-white">
                      {row.nombre}
                    </p>
                    {isCurrentUserRankingRow(row, currentUserId) ? (
                      <Badge className="h-5 rounded-full border-cyan-300/25 bg-cyan-400/12 px-2 text-[10px] font-black text-cyan-100">
                        Vos
                      </Badge>
                    ) : null}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-white/62">
                    <span className="inline-flex items-center gap-1">
                      <Target className="size-3 text-cyan-200" />
                      {row.aciertosExactos} exactos
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <Badge className="h-5 rounded-full border-white/12 bg-white/[0.08] px-2 text-[10px] font-black text-white">
                    #{position}
                  </Badge>
                  <p className="mt-2 whitespace-nowrap text-lg font-black text-white">
                    {formatRankingPoints(row.puntosTotales)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function getToneClasses(
  tone: ReturnType<typeof getRankingPositionTone>
) {
  if (tone === "gold") {
    return "border-[#B98A1D]/45 bg-[linear-gradient(135deg,rgba(83,67,18,0.72)_0%,rgba(53,68,24,0.88)_54%,rgba(16,29,17,0.96)_100%)]";
  }

  if (tone === "silver") {
    return "border-white/14 bg-[linear-gradient(135deg,rgba(69,77,88,0.42)_0%,rgba(30,44,41,0.92)_54%,rgba(9,28,22,0.96)_100%)]";
  }

  if (tone === "bronze") {
    return "border-orange-300/28 bg-[linear-gradient(135deg,rgba(92,50,22,0.62)_0%,rgba(53,40,24,0.86)_54%,rgba(9,28,22,0.96)_100%)]";
  }

  if (tone === "current") {
    return "border-cyan-300/28 bg-[linear-gradient(135deg,rgba(6,54,70,0.94)_0%,rgba(4,52,51,0.96)_50%,rgba(6,39,31,0.98)_100%)]";
  }

  return "border-emerald-400/10 bg-[#052820]";
}

import {
  Crown,
  Medal,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { RankingRow } from "@/features/ranking/types/ranking.types";
import { cn } from "@/lib/utils";

type RankingListProps = {
  rows: RankingRow[];
  currentUserId?: string | null;
};

export function RankingList({ rows, currentUserId }: RankingListProps) {
  return (
    <div className="space-y-3">
      {rows.map((row, index) => {
        const isCurrentUser = row.usuarioId === currentUserId;
        const position = row.posicion ?? index + 1;
        const tone = getRankingTone(position, isCurrentUser);
        const PositionIcon = position === 1 ? Crown : Medal;

        return (
          <Card
            key={row.usuarioId}
            className={cn(
              "relative overflow-hidden rounded-[1.55rem] border text-white shadow-[0_16px_36px_rgba(0,0,0,0.24)]",
              tone.card
            )}
          >
            <div className={cn("pointer-events-none absolute inset-0", tone.glow)} />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

            <CardContent className="relative z-10 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl border text-white",
                    tone.positionWrap
                  )}
                >
                  <PositionIcon className="size-3.5" />
                  <span className="text-[11px] font-black leading-none">
                    #{position}
                  </span>
                </div>

                <div className="min-w-0 flex flex-1 items-center gap-3">
                  <Avatar className="size-11 rounded-2xl after:hidden">
                    {row.avatarUrl ? (
                      <AvatarImage src={row.avatarUrl} alt={row.nombre} />
                    ) : null}
                    <AvatarFallback
                      className={cn(
                        "rounded-2xl text-xs font-black text-white",
                        tone.avatar
                      )}
                    >
                      {getInitials(row.nombre)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-black text-white">
                        {row.nombre}
                      </p>

                      {isCurrentUser ? (
                        <span className="shrink-0 rounded-full border border-cyan-300/25 bg-cyan-400/12 px-2 py-0.5 text-[11px] font-bold text-cyan-100">
                          Vos
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-white/58">
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3 text-yellow-200/90" />
                        {row.aciertosExactos}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <TrendingUp className="size-3 text-emerald-200/90" />
                        {row.aciertosTendencia}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em]",
                      tone.pointsBadge
                    )}
                  >
                    <Sparkles className="size-3" />
                    Puntos
                  </span>
                  <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
                    {row.puntosTotales}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "?";
}

function getRankingTone(position: number, isCurrentUser: boolean) {
  if (isCurrentUser) {
    return {
      card: "border-cyan-300/28 bg-[linear-gradient(135deg,rgba(6,54,70,0.94)_0%,rgba(4,52,51,0.96)_50%,rgba(6,39,31,0.98)_100%)]",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(0,140,147,0.20),transparent_38%)]",
      positionWrap:
        "border-cyan-300/25 bg-cyan-400/12 text-cyan-100 ring-1 ring-cyan-300/10",
      avatar: "bg-cyan-400/12 ring-1 ring-cyan-300/15",
      pointsBadge: "border-cyan-300/25 bg-cyan-400/12 text-cyan-100",
    };
  }

  if (position === 1) {
    return {
      card: "border-[#B98A1D]/45 bg-[linear-gradient(135deg,rgba(83,67,18,0.72)_0%,rgba(53,68,24,0.88)_54%,rgba(16,29,17,0.96)_100%)]",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(247,183,49,0.18),transparent_36%)]",
      positionWrap:
        "border-[#F7B731]/25 bg-[#F7B731]/12 text-[#FFF1B8] ring-1 ring-[#F7B731]/10",
      avatar: "bg-[#F7B731]/10 ring-1 ring-[#F7B731]/12",
      pointsBadge: "border-[#F7B731]/25 bg-[#F7B731]/12 text-[#FFF1B8]",
    };
  }

  if (position === 2) {
    return {
      card: "border-white/14 bg-[linear-gradient(135deg,rgba(69,77,88,0.42)_0%,rgba(30,44,41,0.92)_54%,rgba(9,28,22,0.96)_100%)]",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_36%)]",
      positionWrap:
        "border-white/20 bg-white/10 text-white ring-1 ring-white/8",
      avatar: "bg-white/[0.10] ring-1 ring-white/10",
      pointsBadge: "border-white/18 bg-white/10 text-white/90",
    };
  }

  if (position === 3) {
    return {
      card: "border-orange-300/28 bg-[linear-gradient(135deg,rgba(92,50,22,0.62)_0%,rgba(53,40,24,0.86)_54%,rgba(9,28,22,0.96)_100%)]",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(253,186,116,0.16),transparent_36%)]",
      positionWrap:
        "border-orange-300/25 bg-orange-300/12 text-orange-100 ring-1 ring-orange-300/10",
      avatar: "bg-orange-300/10 ring-1 ring-orange-300/10",
      pointsBadge: "border-orange-300/20 bg-orange-300/12 text-orange-100",
    };
  }

  return {
    card: "border-emerald-400/10 bg-white/[0.04]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(57,169,53,0.08),transparent_34%)]",
    positionWrap:
      "border-emerald-400/10 bg-white/[0.04] text-white/80 ring-1 ring-white/4",
    avatar: "bg-white/[0.08] ring-1 ring-white/6",
    pointsBadge: "border-emerald-400/10 bg-white/[0.04] text-white/75",
  };
}

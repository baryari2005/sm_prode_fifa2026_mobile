import {
  BarChart3,
  Medal,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { RankingRow } from "@/features/ranking/types/ranking.types";
import { cn } from "@/lib/utils";

type MyRankingSummaryProps = {
  data: RankingRow | null;
};

type SummaryTone = "emerald" | "yellow" | "cyan" | "purple";

export function MyRankingSummary({ data }: MyRankingSummaryProps) {
  const resumen = data ?? {
    posicion: null,
    puntosTotales: 0,
    aciertosExactos: 0,
    aciertosTendencia: 0,
    partidosPronosticados: 0,
    partidosCalificados: 0,
  };

  const items = [
    {
      title: "Mi posicion",
      value: resumen.posicion ? `#${resumen.posicion}` : "—",
      detail: "ranking general",
      tone: "yellow",
      icon: Medal,
    },
    {
      title: "Puntos",
      value: `${resumen.puntosTotales}`,
      detail: "acumulados",
      tone: "emerald",
      icon: Sparkles,
    },
    {
      title: "Exactos",
      value: `${resumen.aciertosExactos}`,
      detail: "aciertos perfectos",
      tone: "cyan",
      icon: Target,
    },
    {
      title: "Tendencias",
      value: `${resumen.aciertosTendencia}`,
      detail: `${resumen.partidosCalificados}/${resumen.partidosPronosticados} calificados`,
      tone: "purple",
      icon: TrendingUp,
    },
  ] as const;

  return (
    <section className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <SummaryCard key={item.title} {...item} />
      ))}
    </section>
  );
}

function SummaryCard({
  title,
  value,
  detail,
  tone,
  icon: Icon,
}: {
  title: string;
  value: string;
  detail: string;
  tone: SummaryTone;
  icon: typeof BarChart3;
}) {
  const toneStyles: Record<
    SummaryTone,
    {
      card: string;
      badge: string;
      iconWrap: string;
      glow: string;
      valueGlow: string;
    }
  > = {
    yellow: {
      card: "border-[#B98A1D]/45 bg-[linear-gradient(135deg,rgba(83,67,18,0.72)_0%,rgba(53,68,24,0.88)_54%,rgba(16,29,17,0.96)_100%)]",
      badge: "border-[#F7B731]/25 bg-[#F7B731]/12 text-[#F6D978]",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(110,88,22,0.68),rgba(71,58,15,0.88))] text-[#F7B731] ring-1 ring-[#F7B731]/20",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(247,183,49,0.20),transparent_36%)]",
      valueGlow: "text-[#FFF1B8]",
    },
    emerald: {
      card: "border-[#2E7E26]/45 bg-[linear-gradient(135deg,rgba(13,78,26,0.8)_0%,rgba(10,69,23,0.92)_54%,rgba(9,28,22,0.96)_100%)]",
      badge: "border-[#39A935]/25 bg-[#39A935]/12 text-[#D7FF87]",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(13,96,29,0.72),rgba(12,73,23,0.9))] text-[#D7FF87] ring-1 ring-[#39A935]/22",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(57,169,53,0.18),transparent_36%)]",
      valueGlow: "text-white",
    },
    cyan: {
      card: "border-[#0A6D73]/45 bg-[linear-gradient(135deg,rgba(4,73,86,0.82)_0%,rgba(4,57,73,0.92)_54%,rgba(9,28,22,0.96)_100%)]",
      badge: "border-[#008C93]/25 bg-[#008C93]/12 text-[#7CE7EB]",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(4,88,96,0.75),rgba(3,64,70,0.92))] text-[#7CE7EB] ring-1 ring-[#008C93]/24",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(0,140,147,0.2),transparent_36%)]",
      valueGlow: "text-white",
    },
    purple: {
      card: "border-purple-400/30 bg-[linear-gradient(135deg,rgba(77,32,122,0.72)_0%,rgba(48,22,78,0.88)_54%,rgba(9,28,22,0.96)_100%)]",
      badge: "border-purple-300/25 bg-purple-400/12 text-purple-200",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(93,49,142,0.72),rgba(61,26,97,0.9))] text-purple-200 ring-1 ring-purple-300/20",
      glow: "bg-[radial-gradient(circle_at_top_left,rgba(192,132,252,0.18),transparent_36%)]",
      valueGlow: "text-white",
    },
  };

  const styles = toneStyles[tone];

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-[1.6rem] text-white shadow-[0_18px_40px_rgba(0,0,0,0.26)]",
        styles.card
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0", styles.glow)} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

      <CardContent className="relative z-10 p-4">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em]",
              styles.badge
            )}
          >
            <Icon className="size-3" />
            {title}
          </span>

          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem]",
              styles.iconWrap
            )}
          >
            <Icon className="size-4" />
          </div>
        </div>

        <p
          className={cn(
            "mt-5 text-3xl font-black leading-none tracking-[-0.04em]",
            styles.valueGlow
          )}
        >
          {value}
        </p>

        <p className="mt-2 text-xs font-semibold leading-5 text-white/58">
          {detail}
        </p>
      </CardContent>
    </Card>
  );
}

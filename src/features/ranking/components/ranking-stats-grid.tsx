import type { RankingRow } from "@/features/ranking/types/ranking.types";
import { cheddar } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type RankingStatsGridProps = {
  row: RankingRow | null;
};

type SummaryTone = "gold" | "sky" | "navy" | "violet";

export function RankingStatsGrid({ row }: RankingStatsGridProps) {
  const summary = row ?? {
    posicion: null,
    puntosTotales: 0,
    aciertosExactos: 0,
    aciertosTendencia: 0,
    partidosPronosticados: 0,
    partidosCalificados: 0,
  };

  const items = [
    {
      title: "Mi posición",
      value: summary.posicion ? `#${summary.posicion}` : "#0",
      detail: "ranking general",
      tone: "gold" as const,
    },
    {
      title: "Puntos totales",
      value: `${summary.puntosTotales ?? 0}`,
      detail: "acumulados",
      tone: "sky" as const,
    },
    {
      title: "Exactos",
      value: `${summary.aciertosExactos ?? 0}`,
      detail: "aciertos perfectos",
      tone: "navy" as const,
    },
    {
      title: "Tendencias",
      value: `${summary.aciertosTendencia ?? 0}`,
      detail: `${summary.partidosCalificados ?? 0}/${summary.partidosPronosticados ?? 0} calificados`,
      tone: "violet" as const,
    },
  ];

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
}: {
  title: string;
  value: string;
  detail: string;
  tone: SummaryTone;
}) {
  const styles: Record<
    SummaryTone,
    { card: string; badge: string; iconWrap: string; value: string; glow: string }
  > = {
    gold: {
      card:
        "border-[#5993b6]/28 bg-[linear-gradient(135deg,rgba(36,52,82,0.92)_0%,rgba(30,46,74,0.96)_54%,rgba(21,34,55,0.98)_100%)]",
      badge: "border-[#F7B731]/25 bg-[#F7B731]/12 text-[#F6D978]",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(111,84,19,0.68),rgba(83,59,12,0.88))] text-[#F7B731] ring-1 ring-[#F7B731]/20",
      value: "text-white",
      glow:
        "bg-[radial-gradient(circle_at_top_left,rgba(247,183,49,0.20),transparent_36%)]",
    },
    sky: {
      card:
        "border-[#5993b6]/28 bg-[linear-gradient(135deg,rgba(36,52,82,0.92)_0%,rgba(30,46,74,0.96)_54%,rgba(21,34,55,0.98)_100%)]",
      badge: "border-[#5993b6]/24 bg-[#5993b6]/12 text-[#AEEBFF]",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(48,88,122,0.78),rgba(34,62,94,0.92))] text-[#AEEBFF] ring-1 ring-[#5993b6]/24",
      value: "text-white",
      glow:
        "bg-[radial-gradient(circle_at_top_left,rgba(89,147,182,0.18),transparent_36%)]",
    },
    navy: {
      card:
        "border-[#5993b6]/28 bg-[linear-gradient(135deg,rgba(36,52,82,0.92)_0%,rgba(30,46,74,0.96)_54%,rgba(21,34,55,0.98)_100%)]",
      badge: "border-white/14 bg-white/[0.06] text-white/76",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(58,79,112,0.74),rgba(36,53,78,0.92))] text-[#F7B731] ring-1 ring-white/12",
      value: "text-white",
      glow:
        "bg-[radial-gradient(circle_at_top_left,rgba(250,180,56,0.14),transparent_36%)]",
    },
    violet: {
      card:
        "border-[#5993b6]/28 bg-[linear-gradient(135deg,rgba(36,52,82,0.92)_0%,rgba(30,46,74,0.96)_54%,rgba(21,34,55,0.98)_100%)]",
      badge: "border-[#5993b6]/24 bg-[#5993b6]/12 text-[#AEEBFF]",
      iconWrap:
        "bg-[linear-gradient(180deg,rgba(63,92,132,0.72),rgba(40,61,95,0.92))] text-[#d9f1ff] ring-1 ring-[#AEEBFF]/16",
      value: "text-white",
      glow:
        "bg-[radial-gradient(circle_at_top_left,rgba(89,147,182,0.18),transparent_36%)]",
    },
  };

  const toneStyles = styles[tone];

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[1.45rem] border p-4 text-white shadow-[0_18px_40px_rgba(0,0,0,0.26)]",
        toneStyles.card
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0", toneStyles.glow)} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em]",
              toneStyles.badge
            )}
          >
            {/* <Icon className="size-3" /> */}
            {title}
          </span>

          {/* <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem]",
              toneStyles.iconWrap
            )}
          >
            <Icon className="size-4" /> 
          </div> */}
        </div>

        <p
          className={cn(
            `${cheddar.className} mt-5 truncate text-3xl uppercase leading-none tracking-[0.03em]`,
            toneStyles.value
          )}
        >
          {value}
        </p>

        <p className="mt-2 text-xs font-semibold leading-5 text-white/58">
          {detail}
        </p>
      </div>
    </article>
  );
}

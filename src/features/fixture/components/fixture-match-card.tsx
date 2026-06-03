"use client";

import { Clock3, Radio, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { FlagImage } from "@/features/home/components/mobile-home/flag-image";
import type {
  FixturePartido,
  FixtureSeleccion,
} from "@/features/fixture/types/fixture.types";
import {
  formatFixtureTime12h,
  getFixtureStatus,
} from "@/features/fixture/utils/fixture.helpers";
import {
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import { cn } from "@/lib/utils";

type FixtureMatchCardProps = {
  partido: FixturePartido;
  isHighlighted?: boolean;
};

export function FixtureMatchCard({
  partido,
  isHighlighted = false,
}: FixtureMatchCardProps) {
  const status = getFixtureStatus(partido);
  const localName = partido.seleccionLocal?.nombre ?? "Local";
  const visitanteName = partido.seleccionVisitante?.nombre ?? "Visitante";
  const phaseLabel = partido.fase?.nombre ?? "Sin fase";
  const score =
    partido.resultado &&
    (partido.resultado.estado?.toUpperCase() === "EN_JUEGO" ||
      partido.resultado.estado?.toUpperCase() === "FINALIZADO")
      ? `${partido.resultado.golesLocal} - ${partido.resultado.golesVisitante}`
      : null;
  const centerLabel = score ?? formatFixtureTime12h(partido.fecha);
  const highlightLabel = getHighlightLabel(status, isHighlighted);

  return (
    <article
      className={cn(
        "rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3 text-white shadow-[0_12px_28px_rgba(0,0,0,0.22)]",
        isHighlighted &&
          "border-[#F7B731]/24 bg-[linear-gradient(135deg,rgba(83,67,18,0.18)_0%,rgba(31,46,74,0.94)_56%,rgba(21,34,55,0.98)_100%)]"
      )}
    >
      <div className="flex items-center gap-2.5">
        <FixtureTeamCompact
          team={partido.seleccionLocal}
          fallbackName={localName}
          align="left"
        />

        <div className="min-w-[88px] shrink-0 text-center">
          <p className="whitespace-nowrap text-[15px] font-black tracking-[-0.04em] text-white">
            {centerLabel}
          </p>
        </div>

        <FixtureTeamCompact
          team={partido.seleccionVisitante}
          fallbackName={visitanteName}
          align="right"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
        <p className="min-w-0 flex-1 truncate text-[11px] font-semibold text-white/60">
          {phaseLabel} · {status.shortLabel}
        </p>

        <Badge className={cn("h-6 rounded-full px-2.5 text-[10px] font-black", status.className)}>
          {status.isLive ? <Radio className="size-3" /> : status.isFinished ? <Trophy className="size-3" /> : <Clock3 className="size-3" />}
          {status.shortLabel}
        </Badge>

        {highlightLabel ? (
          <Badge className="h-6 rounded-full border-[#F7B731]/20 bg-[#F7B731]/12 px-2.5 text-[10px] font-black text-[#F7E7A1]">
            {highlightLabel}
          </Badge>
        ) : null}
      </div>
    </article>
  );
}

function FixtureTeamCompact({
  team,
  fallbackName,
  align,
}: {
  team?: FixtureSeleccion | null;
  fallbackName: string;
  align: "left" | "right";
}) {
  const teamCode = getTeamCode(fallbackName, team?.codigo);
  const flagSrc = getFlagSrc(
    team?.bandera ?? team?.flag ?? team?.banderaUrl ?? team?.flagUrl ?? null,
    teamCode
  );

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2",
        align === "right" ? "flex-row-reverse text-right" : "text-left"
      )}
    >
      <FlagImage
        key={flagSrc ?? teamCode}
        src={flagSrc}
        alt={`Bandera de ${fallbackName}`}
        title={fallbackName}
        fallback={teamCode.slice(0, 3)}
        className="h-7 w-8 shrink-0 object-contain"
        fallbackClassName="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-[10px] font-black uppercase text-white/75"
      />

      <p className="min-w-0 flex-1 truncate whitespace-nowrap text-[13px] font-black tracking-[-0.02em] text-white">
        {fallbackName}
      </p>
    </div>
  );
}

function getHighlightLabel(
  status: ReturnType<typeof getFixtureStatus>,
  isHighlighted: boolean
) {
  if (status.isCloseSoon) {
    return "Cierra pronto";
  }

  if (isHighlighted) {
    return "Próximo partido";
  }

  if (status.key === "proximo") {
    return "Disponible";
  }

  return null;
}

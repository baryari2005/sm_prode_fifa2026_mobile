"use client";

import { Activity } from "lucide-react";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import { getFixtureStatus } from "@/features/fixture/utils/fixture.helpers";
import {
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import { FlagImage } from "./flag-image";

type LiveMatchMiniCardProps = {
  match: FixturePartido;
};

export function LiveMatchMiniCard({ match }: LiveMatchMiniCardProps) {
  const localName = match.seleccionLocal?.nombre ?? "Local";
  const visitanteName = match.seleccionVisitante?.nombre ?? "Visitante";
  const localCode = getTeamCode(localName, match.seleccionLocal?.codigo);
  const visitanteCode = getTeamCode(visitanteName, match.seleccionVisitante?.codigo);
  const localFlagSrc = getFlagSrc(match.seleccionLocal?.bandera, localCode);
  const visitanteFlagSrc = getFlagSrc(
    match.seleccionVisitante?.bandera,
    visitanteCode
  );
  const score = `${match.resultado?.golesLocal ?? 0} - ${match.resultado?.golesVisitante ?? 0}`;
  const status = getFixtureStatus(match);

  return (
    <article className="rounded-[1rem] bg-white/[0.05] p-2 shadow-none">
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="flex items-center gap-1 text-xs font-black tracking-[0.04em] text-white/54">
          <Activity className="size-3 text-[#D7FF87]" />
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1">
        <TeamSide
          name={localName}
          code={localCode}
          flagSrc={localFlagSrc}
          align="left"
        />
        <div className="rounded-[0.85rem] border border-white/10 bg-[#061C16]/70 px-2.5 py-2 text-center">
          <p className="whitespace-nowrap text-[1.05rem] font-black tracking-[-0.04em] text-white">
            {score}
          </p>
        </div>
        <TeamSide
          name={visitanteName}
          code={visitanteCode}
          flagSrc={visitanteFlagSrc}
          align="right"
        />
      </div>
    </article>
  );
}

function TeamSide({
  name,
  code,
  flagSrc,
  align,
}: {
  name: string;
  code: string;
  flagSrc: string | null;
  align: "left" | "right";
}) {
  return (
    <div className={`min-w-0 ${align === "right" ? "text-right" : "text-left"}`}>
      <div
        className={`mb-1.5 flex items-center gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}
      >
        <FlagImage src={flagSrc} alt={`Bandera de ${name}`} fallback={code} />
      </div>
      <p className="truncate whitespace-nowrap text-[11px] font-black tracking-[-0.03em] text-white">
        {name}
      </p>
    </div>
  );
}

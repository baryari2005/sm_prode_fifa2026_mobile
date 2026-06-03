"use client";

import { Activity } from "lucide-react";

import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import { getFixtureStatus } from "@/features/fixture/utils/fixture.helpers";
import {
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import { FlagImage } from "./flag-image";

type LiveMatchCardProps = {
  matches: FixturePartido[];
};

export function LiveMatchCard({ matches }: LiveMatchCardProps) {
  return (
    <div className="space-y-2">
      {matches.map((match) => (
        <LiveMatchRow key={match.id} match={match} />
      ))}
    </div>
  );
}

function LiveMatchRow({ match }: { match: FixturePartido }) {
  const localName = match.seleccionLocal?.nombre ?? "Local";
  const visitanteName = match.seleccionVisitante?.nombre ?? "Visitante";
  const localCode = getTeamCode(localName, match.seleccionLocal?.codigo);
  const visitanteCode = getTeamCode(
    visitanteName,
    match.seleccionVisitante?.codigo
  );
  const localFlagSrc = getFlagSrc(
    match.seleccionLocal?.bandera ??
      match.seleccionLocal?.flag ??
      match.seleccionLocal?.banderaUrl ??
      match.seleccionLocal?.flagUrl ??
      null,
    localCode
  );
  const visitanteFlagSrc = getFlagSrc(
    match.seleccionVisitante?.bandera ??
      match.seleccionVisitante?.flag ??
      match.seleccionVisitante?.banderaUrl ??
      match.seleccionVisitante?.flagUrl ??
      null,
    visitanteCode
  );
  const status = getFixtureStatus(match);
  const golesLocal = match.resultado?.golesLocal ?? 0;
  const golesVisitante = match.resultado?.golesVisitante ?? 0;
  const liveLabel =
    match.resultado?.tiempoJuego && match.resultado.tiempoJuego > 0
      ? `${match.resultado.tiempoJuego}'`
      : status.label.replace(/^En vivo\s*·\s*/i, "").replace(/^En vivo\s*/i, "");

  return (
    <article className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] px-3 py-3 shadow-none">
      <div className="flex items-center justify-between gap-3">
        <TeamFlag
          flagSrc={localFlagSrc}
          code={localCode}
          name={localName}
          align="left"
        />

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#061C16]/70 px-3 py-2 text-center">
          <span className="min-w-[18px] text-[1.05rem] font-black tracking-[-0.04em] text-white">
            {golesLocal}
          </span>
          <span className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#F7B731]">
            VS
          </span>
          <span className="min-w-[18px] text-[1.05rem] font-black tracking-[-0.04em] text-white">
            {golesVisitante}
          </span>
        </div>

        <TeamFlag
          flagSrc={visitanteFlagSrc}
          code={visitanteCode}
          name={visitanteName}
          align="right"
        />

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/12 px-2.5 py-1 text-[0.72rem] font-black uppercase tracking-[0.08em] text-emerald-100">
          <Activity className="size-3.5 text-[#D7FF87]" />
          {liveLabel}
        </span>
      </div>
    </article>
  );
}

function TeamFlag({
  flagSrc,
  code,
  name,
  align,
}: {
  flagSrc: string | null;
  code: string;
  name: string;
  align: "left" | "right";
}) {
  return (
    <div className={`flex shrink-0 items-center ${align === "right" ? "justify-end" : "justify-start"}`}>
      <FlagImage
        src={flagSrc}
        alt={`Bandera de ${name}`}
        title={name}
        fallback={code}
        className="h-7 w-auto max-w-[42px] object-contain"
      />
    </div>
  );
}

"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3 } from "lucide-react";

import { cheddar } from "@/lib/fonts";
import { getFixturePhaseLabel } from "@/features/fixture/utils/fixture.helpers";
import {
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import { PREDICTION_CLOSE_MINUTES_BEFORE } from "@/features/pronosticos/utils/pronosticos.helpers";
import { FlagImage } from "./flag-image";

type HomeUpcomingMatchesCardProps = {
  matches: PronosticoPartido[];
};

function formatCloseCountdown(date: string) {
  const closeAt = new Date(
    new Date(date).getTime() - PREDICTION_CLOSE_MINUTES_BEFORE * 60 * 1000
  );
  const diffMinutes = Math.max(
    0,
    Math.ceil((closeAt.getTime() - Date.now()) / 60000)
  );

  if (diffMinutes <= 0) {
    return "Cerrado";
  }

  if (diffMinutes < 60) {
    return `Cierra en ${diffMinutes} min`;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (minutes === 0) {
    return `Cierra en ${hours} h`;
  }

  return `Cierra en ${hours} h ${minutes} min`;
}

function formatMatchMeta(match: PronosticoPartido) {
  const phaseLabel = getFixturePhaseLabel(match);

  const formattedDate = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(match.fecha));

  return `${phaseLabel} · ${formattedDate}`;
}

function getCountdownBadgeClass(label: string) {
  if (label === "Cerrado") {
    return "bg-[rgba(95,18,28,0.28)] text-red-100";
  }

  return "bg-[#5993b6]/20 text-[#d9f3ff]";
}

export function HomeUpcomingMatchesCard({
  matches,
}: HomeUpcomingMatchesCardProps) {
  return (
    <section className="-mx-1 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] 
    p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#5993b6]/24 bg-[#5993b6]/14 text-[#AEEBFF]">
            <CalendarDays className="size-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
              Próximos partidos
            </p>
            <p
              className={`${cheddar.className} mt-0.5 text-[1.125rem] uppercase leading-none tracking-[0.04em] text-white`}
            >
              Cargá tus pronósticos
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2 overflow-visible pt-1">
        {matches.map((match) => {
          const localName = match.seleccionLocal?.nombre ?? "Local";
          const visitanteName = match.seleccionVisitante?.nombre ?? "Visitante";
          const localCode = getTeamCode(localName, match.seleccionLocal?.codigo);
          const visitanteCode = getTeamCode(
            visitanteName,
            match.seleccionVisitante?.codigo
          );
          const localFlag = getFlagSrc(
            match.seleccionLocal?.bandera ??
              match.seleccionLocal?.flag ??
              match.seleccionLocal?.banderaUrl ??
              match.seleccionLocal?.flagUrl ??
              null,
            localCode
          );
          const visitanteFlag = getFlagSrc(
            match.seleccionVisitante?.bandera ??
              match.seleccionVisitante?.flag ??
              match.seleccionVisitante?.banderaUrl ??
              match.seleccionVisitante?.flagUrl ??
              null,
            visitanteCode
          );
          const closeLabel = formatCloseCountdown(match.fecha);

          return (
            <Link
              key={match.id}
              href={`/pronosticos/cargar/${match.id}`}
              className="flex items-center gap-3 overflow-visible rounded-[1.35rem] border border-white/10 bg-white/[0.05] px-3 py-3 transition hover:bg-white/[0.08]"
            >
              <div className="flex shrink-0 items-center gap-[-6px]">
                <div className="relative z-[2] p-0.5 shadow-[0_6px_14px_rgba(0,0,0,0.28)]">
                  <FlagImage
                    src={localFlag}
                    alt={`Bandera de ${localName}`}
                    title={localName}
                    fallback={localCode}
                    className="h-7 w-auto max-w-[42px] object-contain"
                  />
                </div>
                <div className="relative z-[1] -ml-2 p-0.5 shadow-[0_6px_14px_rgba(0,0,0,0.28)]">
                  <FlagImage
                    src={visitanteFlag}
                    alt={`Bandera de ${visitanteName}`}
                    title={visitanteName}
                    fallback={visitanteCode}
                    className="h-7 w-auto max-w-[42px] object-contain"
                  />
                </div>
              </div>

              {/* <div className="min-w-0 flex-1">
                <p className="truncate text-[1rem] font-black leading-5 tracking-[-0.03em] text-white">
                  {localName} vs {visitanteName}
                </p>
                <p className="mt-1 truncate text-[0.82rem] font-semibold text-white/58">
                  {formatMatchMeta(match)}
                </p>
              </div> */}

              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-2 text-[0.72rem] font-black ${getCountdownBadgeClass(
                    closeLabel
                  )}`}
                >
                  <Clock3 className="size-3.5" />
                  {closeLabel}
                </span>
                <ChevronRight className="size-4 text-[#5993b6]" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

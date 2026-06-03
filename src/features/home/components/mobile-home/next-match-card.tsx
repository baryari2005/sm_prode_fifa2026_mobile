"use client";

import { Clock3, Target, TriangleAlert } from "lucide-react";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import {
  formatMatchHour,
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import { NextMatchLoadingRow } from "./next-match-loading-row";
import { NextMatchTeamsRow } from "./next-match-teams-row";

type NextMatchCardProps = {
  match: FixturePartido;
  isLoading: boolean;
  isClosed: boolean;
  closeCountdown: string;
  isOpeningPrediction?: boolean;
  onOpenPrediction: () => void;
};

export function NextMatchCard({
  match,
  isLoading,
  isClosed,
  closeCountdown,
  isOpeningPrediction = false,
  onOpenPrediction,
}: NextMatchCardProps) {
  const localName = match.seleccionLocal?.nombre ?? "Local";
  const visitanteName = match.seleccionVisitante?.nombre ?? "Visitante";

  const localCode = getTeamCode(localName, match.seleccionLocal?.codigo);
  const visitanteCode = getTeamCode(
    visitanteName,
    match.seleccionVisitante?.codigo
  );

  const localFlagSrc = getFlagSrc(match.seleccionLocal?.bandera, localCode);
  const visitanteFlagSrc = getFlagSrc(
    match.seleccionVisitante?.bandera,
    visitanteCode
  );

  return (
    <section className="-mx-1 rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#FAB438]">
          Próximo partido
        </p>

        <span className="inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 text-sm font-black text-white/75">
          <Clock3 className="h-3.5 w-3.5" />
          {formatMatchHour(match.fecha)}
        </span>
      </div>

      <div className="-mx-2 rounded-[0.8rem]">
        {isLoading ? (
          <NextMatchLoadingRow />
        ) : (
          <NextMatchTeamsRow
            local={{
              flagSrc: localFlagSrc,
              code: localCode,
              name: localName,
            }}
            visitante={{
              flagSrc: visitanteFlagSrc,
              code: visitanteCode,
              name: visitanteName,
            }}
          />
        )}

        <div className="mt-3">
          {isClosed ? (
            <div className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-3xl border border-red-400/20 bg-[linear-gradient(135deg,rgba(108,29,45,0.9)_0%,rgba(54,18,25,0.96)_48%,rgba(22,14,18,0.98)_100%)] px-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out">
              <TriangleAlert className="relative z-10 mr-6 h-6 w-6 shrink-0 transition-transform duration-300" />
              <div className="relative z-10 min-w-0 text-center">
                <p className="truncate leading-4 uppercase tracking-[0.08em]">
                  Predicción cerrada
                </p>
                <p className="mt-0.5 text-[10px] font-semibold leading-3 text-white/70">
                  Ya no se puede cargar para este partido
                </p>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenPrediction}
              disabled={isOpeningPrediction}
              className="group block w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAB438]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e2c46]"
            >
              <div className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-3xl border border-[#E7B03A] bg-[#FAB438] px-4 text-sm font-black text-[#1E2C46] shadow-[0_16px_40px_rgba(250,180,56,0.24)] transition-all duration-300 ease-out hover:bg-[#F7C45A] hover:shadow-[0_18px_40px_rgba(250,180,56,0.34)] group-active:scale-[0.985] disabled:opacity-70">
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_48%,rgba(255,255,255,0)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Target className="relative z-10 mr-6 h-6 w-6 shrink-0 transition-transform duration-300" />
                <div className="relative z-10 min-w-0 text-center">
                  <p className="truncate leading-4 uppercase tracking-[0.08em]">
                    Cargar predicción actual
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold leading-3 text-[#1E2C46]/72">
                    Cierra en {closeCountdown}
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { cheddar } from "@/lib/fonts";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";
import { LiveMatchCard } from "./live-match-card";

type LiveMatchesStripProps = {
  matches: FixturePartido[];
};

export function LiveMatchesStrip({ matches }: LiveMatchesStripProps) {
  return (
    <section className="-mx-1 rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-emerald-300/18 bg-emerald-400/12 text-emerald-200">
            <span className="relative flex size-4 items-center justify-center">
              <span className="absolute inline-flex size-4 animate-ping rounded-full bg-emerald-300/35" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-300" />
            </span>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
              Partidos en juego
            </p>
            <p
              className={`${cheddar.className} mt-0.5 text-[1.125rem] uppercase leading-none tracking-[0.04em] text-white`}
            >
              Seguimiento en tiempo real
            </p>
          </div>
        </div>
        {/* <Link
          href="/fixture"
          className="inline-flex items-center gap-1 whitespace-nowrap pt-1 text-sm font-semibold text-white/80"
        >
          Ver todos
          <ChevronRight className="size-4" />
        </Link> */}
      </div>

      {matches.length > 0 ? (
        <div className="space-y-3">
          <LiveMatchCard matches={matches} />
        </div>
      ) : (
        <div className="rounded-[1.25rem] border border-dashed border-white/10 bg-white/[0.04] px-4 py-7 text-center text-sm font-semibold text-white/62">
          No hay partidos actualmente en juego.
        </div>
      )}
    </section>
  );
}

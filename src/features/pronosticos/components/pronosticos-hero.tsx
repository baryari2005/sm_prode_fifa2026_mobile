"use client";

import { RefreshCw, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PronosticosHeroProps = {
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
};

export function PronosticosHero({
  onRefresh,
  isRefreshing = false,
  className,
}: PronosticosHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-emerald-300/15 bg-[#082820] p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute -bottom-14 -left-12 h-36 w-36 rounded-full bg-yellow-300/10 blur-3xl" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/20">
            <Trophy className="h-5 w-5" />
          </div>

          <div className="space-y-1.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-emerald-300">
              Pronósticos
            </p>

            <h1 className="text-2xl font-black leading-tight tracking-tight">
              Cargá tus pronósticos
            </h1>

            <p className="max-w-[260px] text-sm leading-6 text-emerald-50/75">
              Elegí tus resultados antes de que cierre cada partido.
            </p>
          </div>
        </div>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
        >
          <RefreshCw
            className={cn("h-4 w-4", isRefreshing && "animate-spin")}
          />
        </Button>
      </div>
    </section>
  );
}
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type FixtureBlockNavigatorProps = {
  rangeLabel: string;
  blockLabel: string;
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function FixtureBlockNavigator({
  rangeLabel,
  blockLabel,
  currentIndex,
  total,
  onPrevious,
  onNext,
}: FixtureBlockNavigatorProps) {
  const canPrevious = currentIndex > 0;
  const canNext = currentIndex < total - 1;

  if (total <= 1) {
    return null;
  }

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3 shadow-[0_12px_34px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.06] p-0 text-white shadow-none hover:bg-white/[0.10] disabled:opacity-35"
          aria-label="Ver bloque anterior"
        >
          <ChevronLeft className="size-5" />
        </Button>

        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-black text-white">{rangeLabel}</p>
          <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-[0.18em] text-[#AEEBFF]/70">
            {blockLabel}
          </p>
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="h-11 w-11 rounded-2xl border border-white/10 bg-white/[0.06] p-0 text-white shadow-none hover:bg-white/[0.10] disabled:opacity-35"
          aria-label="Ver bloque siguiente"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </section>
  );
}

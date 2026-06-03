"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type DateSectionNavigationProps = {
  label: string;
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function DateSectionNavigation({
  label,
  currentIndex,
  total,
  onPrevious,
  onNext,
}: DateSectionNavigationProps) {
  const canPrevious = currentIndex > 0;
  const canNext = currentIndex < total - 1;

  if (total <= 1) {
    return null;
  }

  return (
    <section className="sticky bottom-3 z-20 rounded-[1.5rem] border border-emerald-400/10 bg-[#052820]/95 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          className="h-11 w-11 rounded-2xl border border-emerald-400/10 bg-white/[0.06] p-0 text-white shadow-none hover:bg-white/[0.10] disabled:opacity-35"
          aria-label="Ver sección anterior"
        >
          <ChevronLeft className="size-5" />
        </Button>

        <div className="min-w-0 text-center">
          <p className="truncate text-sm font-black text-white">{label}</p>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
            Sección {currentIndex + 1} de {total}
          </p>
        </div>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="h-11 w-11 rounded-2xl border border-emerald-400/10 bg-white/[0.06] p-0 text-white shadow-none hover:bg-white/[0.10] disabled:opacity-35"
          aria-label="Ver sección siguiente"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </section>
  );
}

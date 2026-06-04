import type { RankingPhaseOption } from "@/features/ranking/types/ranking-phase.types";
import { cn } from "@/lib/utils";

type RankingPhaseSelectorProps = {
  options: RankingPhaseOption[];
  value: string;
  onValueChange: (value: string) => void;
};

export function RankingPhaseSelector({
  options,
  value,
  onValueChange,
}: RankingPhaseSelectorProps) {
  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <div className="flex min-w-max gap-2 px-1">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onValueChange(option.value)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-black uppercase tracking-[0.08em] transition",
                isActive
                  ? "border-[#F7B731]/30 bg-[#F7B731]/14 text-[#F7E7A1]"
                  : "border-white/10 bg-white/[0.04] text-white/68 hover:bg-white/[0.08] hover:text-white"
              )}
            >
              <span>{option.label}</span>
              {option.isActive ? (
                <span className="rounded-full bg-[#5993b6]/20 px-2 py-0.5 text-[9px] text-[#AEEBFF]">
                  Activa
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

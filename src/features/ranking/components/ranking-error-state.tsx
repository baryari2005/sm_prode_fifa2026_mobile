import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type RankingErrorStateProps = {
  message: string;
  onRetry: () => void;
  disabled?: boolean;
};

export function RankingErrorState({
  message,
  onRetry,
  disabled = false,
}: RankingErrorStateProps) {
  return (
    <section className="rounded-[1.85rem] border border-red-300/30 bg-red-500/10 p-5 text-red-100 shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-300/20 bg-red-500/12">
          <AlertCircle className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-black text-white">
            No pudimos cargar el ranking.
          </h3>
          <p className="mt-2 text-sm leading-6 text-red-100/80">{message}</p>
          <Button
            type="button"
            onClick={onRetry}
            disabled={disabled}
            className="mt-4 h-10 rounded-2xl bg-white/10 px-4 font-black text-white shadow-none hover:bg-white/15"
          >
            Reintentar
          </Button>
        </div>
      </div>
    </section>
  );
}

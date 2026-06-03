"use client";

import Link from "next/link";
import { ArrowBigLeft, LoaderCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

type MobileHeroActionsProps = {
  isRefreshing: boolean;
  onRefresh: () => void;
  refreshLabel: string;
  backHref?: string;
  backLabel?: string;
};

export function MobileHeroActions({
  isRefreshing,
  onRefresh,
  refreshLabel,
  backHref = "/inicio",
  backLabel = "Volver",
}: MobileHeroActionsProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <Button
        type="button"
        variant="secondary"
        className="h-8 flex-1 gap-1.5 rounded-full border border-[#5993b6]/38 bg-[#5993b6]/12 px-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#AEEBFF] shadow-[0_10px_28px_rgba(0,0,0,0.25)] backdrop-blur-md hover:bg-[#5993b6]/18"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        {isRefreshing ? (
          <LoaderCircle className="size-3.5 shrink-0 animate-spin" />
        ) : (
          <RefreshCw className="size-3.5 shrink-0" />
        )}
        <span className="truncate">Actualiza en {refreshLabel}</span>
      </Button>

      <Button
        asChild
        variant="secondary"
        className="h-8 flex-1 gap-1.5 rounded-full border border-white/12 bg-white/10 px-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#F7B731] shadow-[0_10px_28px_rgba(0,0,0,0.25)] backdrop-blur-md hover:bg-white/18"
      >
        <Link href={backHref}>
          <ArrowBigLeft  className="size-3.5 shrink-0" />
          {backLabel}
        </Link>
      </Button>
    </div>
  );
}

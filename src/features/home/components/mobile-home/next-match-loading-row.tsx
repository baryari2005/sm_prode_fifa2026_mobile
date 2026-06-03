"use client";

import { LoaderCircle } from "lucide-react";

export function NextMatchLoadingRow() {
  return (
    <div className="flex min-h-[86px] items-center justify-center rounded-[1.55rem] border border-dashed border-white/12 bg-white/[0.04] px-4 py-5">
      <div className="flex items-center gap-3 text-sm font-semibold text-white/72">
        <LoaderCircle className="size-4 animate-spin text-[#7CE7EB]" />
        Cargando próximo partido...
      </div>
    </div>
  );
}

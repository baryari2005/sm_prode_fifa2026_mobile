"use client";

import type { ReactNode } from "react";

type FixtureDateSectionProps = {
  date: string;
  children: ReactNode;
};

export function FixtureDateSection({
  date,
  children,
}: FixtureDateSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="shrink-0 rounded-full border border-[#5993b6]/20 bg-[#5993b6]/12 px-3 py-1 text-[10px] font-black tracking-[0.18em] text-[#AEEBFF]">
          {date}
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="space-y-2.5">{children}</div>
    </section>
  );
}

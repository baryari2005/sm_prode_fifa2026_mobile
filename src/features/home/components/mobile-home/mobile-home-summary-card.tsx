"use client";

import type { LucideIcon } from "lucide-react";

type MobileHomeSummaryCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "gold" | "green" | "sky";
};

const toneStyles = {
  gold: "bg-[#F7B731]/12 text-[#F7B731] ring-1 ring-[#F7B731]/25",
  green: "bg-[#39A935]/12 text-[#D7FF87] ring-1 ring-[#39A935]/25",
  sky: "bg-[#008C93]/12 text-[#7CE7EB] ring-1 ring-[#008C93]/25",
} as const;

export function MobileHomeSummaryCard({
  label,
  value,
  icon: Icon,
  tone = "green",
}: MobileHomeSummaryCardProps) {
  return (
    <article className="rounded-[1rem] border border-white/10 bg-white/[0.05] px-2 py-2 text-white shadow-none backdrop-blur-sm">
      <div
        className={`mb-2 inline-flex size-8 items-center justify-center rounded-[0.85rem] ${toneStyles[tone]}`}
      >
        <Icon className="size-3.5" />
      </div>
      <p className="truncate text-[10px] font-black uppercase tracking-[0.18em] text-white/42">
        {label}
      </p>
      <p className="mt-0.5 truncate text-[12px] font-semibold leading-4 text-white">
        {value}
      </p>
    </article>
  );
}

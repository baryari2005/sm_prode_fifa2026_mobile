"use client";

import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

type PronosticosDateDividerProps = {
  label: string;
  className?: string;
};

export function PronosticosDateDivider({
  label,
  className,
}: PronosticosDateDividerProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      <div className="h-px flex-1 bg-emerald-400/10" />

      <div className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-emerald-200">
        <CalendarDays className="h-3.5 w-3.5" />
        {label}
      </div>

      <div className="h-px flex-1 bg-emerald-400/10" />
    </div>
  );
}
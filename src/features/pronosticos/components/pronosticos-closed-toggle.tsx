"use client";

import { LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";

type PronosticosClosedToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

export function PronosticosClosedToggle({
  checked,
  onCheckedChange,
  className,
}: PronosticosClosedToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition",
        checked
          ? "border-red-300/30 bg-red-500/10 text-red-100"
         : "border-emerald-400/10 bg-white/[0.06] text-white/70",
        className
      )}
    >
      <span className="flex items-center gap-2 font-semibold">
        <LockKeyhole className="h-4 w-4" />
        Mostrar cerrados
      </span>

      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition",
          checked ? "bg-red-400/80" : "bg-white/15"
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-white transition",
            checked ? "left-6" : "left-1"
          )}
        />
      </span>
    </button>
  );
}
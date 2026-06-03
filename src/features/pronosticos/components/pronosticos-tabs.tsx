"use client";

import { CheckCircle2, Clock3, LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";

export type PronosticosTab = "disponibles" | "mis-pronosticos" | "cerrados";

type PronosticosTabsProps = {
  activeTab: PronosticosTab;
  onTabChange: (tab: PronosticosTab) => void;
  counts: {
    disponibles: number;
    misPronosticos: number;
    cerrados: number;
  };
};

const tabs = [
  {
    value: "disponibles" as const,
    label: "Disponibles",
    icon: Clock3,
  },
  {
    value: "mis-pronosticos" as const,
    label: "Mis pronósticos",
    icon: CheckCircle2,
  },
  {
    value: "cerrados" as const,
    label: "Cerrados",
    icon: LockKeyhole,
  },
];

export function PronosticosTabs({
  activeTab,
  onTabChange,
  counts,
}: PronosticosTabsProps) {
  function getCount(tab: PronosticosTab) {
    if (tab === "disponibles") return counts.disponibles;
    if (tab === "mis-pronosticos") return counts.misPronosticos;
    return counts.cerrados;
  }

  return (
    <section className="grid grid-cols-3 gap-2.5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "rounded-2xl border px-2 py-3 text-center transition",
              active
                ? "border-emerald-300/35 bg-emerald-400/15 text-white shadow-[0_0_24px_rgba(52,211,153,0.12)]"
                : "border-emerald-400/10 bg-white/[0.05] text-white/55"
            )}
          >
            <div
              className={cn(
                "mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full",
                active ? "bg-emerald-400/18" : "bg-white/10"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4",
                  active ? "text-emerald-300" : "text-white/55"
                )}
              />
            </div>

            <p className="text-lg font-black leading-none">
              {getCount(tab.value)}
            </p>

            <p className="mt-1 text-[9px] font-black uppercase tracking-wide">
              {tab.label}
            </p>
          </button>
        );
      })}
    </section>
  );
}
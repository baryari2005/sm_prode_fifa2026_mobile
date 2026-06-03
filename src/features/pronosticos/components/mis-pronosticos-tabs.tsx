"use client";

import { LockKeyhole, PencilLine } from "lucide-react";

import type { MisPronosticosTab } from "@/features/pronosticos/utils/mis-pronosticos.helpers";
import { cn } from "@/lib/utils";

type MisPronosticosTabsProps = {
  activeTab: MisPronosticosTab;
  onTabChange: (tab: MisPronosticosTab) => void;
  counts: {
    editables: number;
    cerrados: number;
  };
};

const tabs = [
  {
    value: "editables" as const,
    label: "Editables",
    icon: PencilLine,
  },
  {
    value: "cerrados" as const,
    label: "Cerrados",
    icon: LockKeyhole,
  },
];

export function MisPronosticosTabs({
  activeTab,
  onTabChange,
  counts,
}: MisPronosticosTabsProps) {
  return (
    <section className="grid grid-cols-2 gap-2.5">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.value;
        const count = tab.value === "editables" ? counts.editables : counts.cerrados;

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

            <p className="text-lg font-black leading-none">{count}</p>

            <p className="mt-1 text-[9px] font-black uppercase tracking-wide">
              {tab.label}
            </p>
          </button>
        );
      })}
    </section>
  );
}

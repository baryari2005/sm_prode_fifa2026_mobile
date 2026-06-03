"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HorizontalDragScroll } from "@/features/fixture/components/horizontal-drag-scroll";
import type { RankingView } from "@/features/ranking/helpers/ranking.helpers";

type RankingTabsProps = {
  value: RankingView;
  onValueChange: (value: RankingView) => void;
};

const ITEMS: Array<{ value: RankingView; label: string }> = [
  { value: "general", label: "General" },
  { value: "top-3", label: "Top 3" },
  { value: "mi-posicion", label: "Mi posición" },
  { value: "tendencias", label: "Tendencias" },
];

export function RankingTabs({ value, onValueChange }: RankingTabsProps) {
  return (
    <Tabs value={value} onValueChange={(next) => onValueChange(next as RankingView)} className="-mx-1">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-[#001a16] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-[#001a16] to-transparent" />

        <HorizontalDragScroll activeItemSelector='[data-active-ranking-tab="true"]'>
          <TabsList
            variant="line"
            className="flex min-w-max gap-2 bg-transparent px-1 py-0 pr-4"
          >
            {ITEMS.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                data-active-ranking-tab={value === item.value ? "true" : "false"}
                className="h-10 rounded-full border border-emerald-400/10 bg-[#052820] px-4 text-[11px] font-black uppercase tracking-[0.08em] text-white/72 hover:bg-white/[0.06] hover:text-white data-active:border-teal-300/28 data-active:bg-teal-400/14 data-active:text-white"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </HorizontalDragScroll>
      </div>
    </Tabs>
  );
}

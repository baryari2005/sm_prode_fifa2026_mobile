"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HorizontalDragScroll } from "@/features/fixture/components/horizontal-drag-scroll";

type FixtureDayTab = {
  value: string;
  label: string;
  matchCount: number;
};

type FixtureDaySelectorProps = {
  value: string;
  onValueChange: (value: string) => void;
  tabs: FixtureDayTab[];
};

export function FixtureDaySelector({
  value,
  onValueChange,
  tabs,
}: FixtureDaySelectorProps) {
  if (tabs.length <= 1) {
    return null;
  }

  return (
    <Tabs value={value} onValueChange={onValueChange} className="-mx-1">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-[#1e2c46] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-[#1e2c46] to-transparent" />

        <HorizontalDragScroll activeItemSelector='[data-active-day="true"]'>
          <TabsList
            variant="line"
            className="flex min-w-max gap-2 bg-transparent pl-1 pr-4 py-0"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-active-day={value === tab.value ? "true" : "false"}
                className="h-auto rounded-[1rem] border border-white/10 bg-white/[0.05] px-3 py-2 text-left text-white/72 hover:bg-white/[0.08] hover:text-white data-active:border-[#5993b6]/28 data-active:bg-[#5993b6]/16 data-active:text-white"
              >
                <span className="flex flex-col items-start">
                  <span className="text-[11px] font-black uppercase tracking-[0.08em]">
                    {tab.label}
                  </span>
                  <span className="text-[10px] font-semibold text-[#AEEBFF]/62">
                    {tab.matchCount} partido{tab.matchCount === 1 ? "" : "s"}
                  </span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </HorizontalDragScroll>
      </div>
    </Tabs>
  );
}

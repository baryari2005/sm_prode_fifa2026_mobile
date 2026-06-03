"use client";

import { HorizontalDragScroll } from "@/features/fixture/components/horizontal-drag-scroll";
import { cn } from "@/lib/utils";

type MobileQuickFilterItem<TValue extends string> = {
  value: TValue;
  label: string;
  count?: number;
};

type MobileQuickFiltersProps<TValue extends string> = {
  value: TValue;
  onValueChange: (value: TValue) => void;
  items: MobileQuickFilterItem<TValue>[];
};

export function MobileQuickFilters<TValue extends string>({
  value,
  onValueChange,
  items,
}: MobileQuickFiltersProps<TValue>) {
  return (
    <section className="relative -mx-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-3 bg-gradient-to-r from-[#1e2c46] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 bg-gradient-to-l from-[#1e2c46] to-transparent" />

      <HorizontalDragScroll activeItemSelector='[data-active-chip="true"]'>
        <div className="flex min-w-max gap-2 pl-1 pr-4">
          {items.map((item) => {
            const isActive = value === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onValueChange(item.value)}
                data-active-chip={isActive ? "true" : "false"}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[11px] font-black uppercase tracking-[0.08em] transition",
                  isActive
                    ? "border-[#5993b6]/28 bg-[#5993b6]/16 text-white shadow-[0_10px_24px_rgba(89,147,182,0.18)]"
                    : "border-white/10 bg-white/[0.05] text-white/70 hover:bg-white/[0.08] hover:text-white"
                )}
              >
                <span className="whitespace-nowrap">{item.label}</span>

                {typeof item.count === "number" ? (
                  <span
                    className={cn(
                      "inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px]",
                      isActive
                        ? "bg-white/12 text-white"
                        : "bg-white/[0.06] text-white/58"
                    )}
                  >
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </HorizontalDragScroll>
    </section>
  );
}

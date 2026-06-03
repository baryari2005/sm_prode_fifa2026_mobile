"use client";

import { MobileQuickFilters } from "@/components/shared/mobile/mobile-quick-filters";
import type { FixtureQuickFilter } from "@/features/fixture/utils/fixture.helpers";

type FixtureQuickFiltersProps = {
  value: FixtureQuickFilter;
  onValueChange: (value: FixtureQuickFilter) => void;
  counts: Record<FixtureQuickFilter, number>;
};

const FILTER_LABELS: Record<FixtureQuickFilter, string> = {
  todos: "Todos",
  proximos: "Próximos",
  "en-vivo": "En vivo",
  finalizados: "Finalizados",
};

export function FixtureQuickFilters({
  value,
  onValueChange,
  counts,
}: FixtureQuickFiltersProps) {
  return (
    <MobileQuickFilters
      value={value}
      onValueChange={onValueChange}
      items={(Object.keys(FILTER_LABELS) as FixtureQuickFilter[]).map((filterKey) => ({
        value: filterKey,
        label: FILTER_LABELS[filterKey],
        count: counts[filterKey],
      }))}
    />
  );
}

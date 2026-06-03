"use client";

import { MobileHeroActions } from "@/components/shared/mobile/mobile-hero-actions";

type MobileFixtureHeroActionsProps = {
  isRefreshing: boolean;
  onRefresh: () => void;
  refreshLabel: string;
};

export function MobileFixtureHeroActions({
  isRefreshing,
  onRefresh,
  refreshLabel,
}: MobileFixtureHeroActionsProps) {
  return (
    <MobileHeroActions
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      refreshLabel={refreshLabel}
    />
  );
}

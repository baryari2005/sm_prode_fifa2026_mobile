import { useEffect, type RefObject } from "react";
import type { StepValue } from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";

type UseAutoCenterActiveTabParams = {
  step: StepValue;
  tabsScrollRef: RefObject<HTMLDivElement | null>;
};

export function useAutoCenterActiveTab({
  step,
  tabsScrollRef,
}: UseAutoCenterActiveTabParams) {
  useEffect(() => {
    const container = tabsScrollRef.current;
    if (!container) return;

    const activeTab = container.querySelector<HTMLElement>('[data-state="active"]');
    if (!activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeTab.getBoundingClientRect();
    const nextLeft =
      container.scrollLeft +
      (activeRect.left - containerRect.left) -
      containerRect.width / 2 +
      activeRect.width / 2;

    container.scrollTo({
      left: Math.max(0, nextLeft),
      behavior: "smooth",
    });
  }, [step, tabsScrollRef]);
}

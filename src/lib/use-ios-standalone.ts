"use client";

import { useState } from "react";

function detectIosStandalone() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const isIosDevice =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)").matches === true ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true);

  return isIosDevice && isStandalone;
}

export function useIosStandalone() {
  const [isIosStandalone] = useState(detectIosStandalone);

  return isIosStandalone;
}

"use client";

import type { ReactNode } from "react";

type HomeMainPanelProps = {
  children: ReactNode;
};

export function HomeMainPanel({ children }: HomeMainPanelProps) {
  return (
    <section className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,38,27,0.96),rgba(5,24,19,0.98))] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      {children}
    </section>
  );
}

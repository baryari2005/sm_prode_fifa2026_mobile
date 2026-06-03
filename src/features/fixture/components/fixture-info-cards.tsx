"use client";

import { CheckCircle2, Timer } from "lucide-react";

export function FixtureInfoCards() {
  return (
    <section className="grid gap-3">
      <InfoCard
        icon={CheckCircle2}
        tone="emerald"
        text="Preparado para mostrar selecciones, banderas y estados del partido."
      />
      <InfoCard
        icon={Timer}
        tone="yellow"
        text="Tambien contempla horarios, resultados y fases dentro del mismo flujo mobile."
      />
    </section>
  );
}

function InfoCard({
  icon: Icon,
  tone,
  text,
}: {
  icon: typeof CheckCircle2;
  tone: "emerald" | "yellow";
  text: string;
}) {
  const toneStyles = {
    emerald:
      "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/20",
    yellow: "bg-yellow-300/15 text-yellow-200 ring-1 ring-yellow-300/20",
  } as const;

  return (
    <article className="rounded-[1.5rem] border border-emerald-400/10 bg-[#052820] px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneStyles[tone]}`}
        >
          <Icon className="size-4" />
        </div>

        <p className="text-sm leading-6 text-white/72">{text}</p>
      </div>
    </article>
  );
}

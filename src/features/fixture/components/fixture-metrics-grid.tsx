"use client";

type FixtureMetricsGridProps = {
  cargados: number;
  proximos: number;
  finalizados: number;
};

export function FixtureMetricsGrid({
  cargados,
  proximos,
  finalizados,
}: FixtureMetricsGridProps) {
  return (
    <section className="grid grid-cols-3 gap-2.5">
      <FixtureMetricCard
        label="Cargados"
        value={cargados}
        detail="totales"
        tone="yellow"
      />
      <FixtureMetricCard
        label="Proximos"
        value={proximos}
        detail="por jugar"
        tone="cyan"
      />
      <FixtureMetricCard
        label="Finalizados"
        value={finalizados}
        detail="con resultado"
        tone="emerald"
      />
    </section>
  );
}

function FixtureMetricCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: number;
  detail: string;
  tone: "emerald" | "yellow" | "cyan";
}) {
  const toneStyles = {
    emerald: "border-emerald-400/10 bg-white/[0.04] text-emerald-200",
    yellow: "border-yellow-300/20 bg-yellow-300/10 text-yellow-100",
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-100",
  } as const;

  return (
    <article className="rounded-[1.15rem] border border-emerald-400/10 bg-[#052820] p-3 shadow-[0_10px_24px_rgba(0,0,0,0.2)]">
      <span
        className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-black uppercase tracking-[0.08em] ${toneStyles[tone]}`}
      >
        {label}
      </span>
      <p className="mt-2.5 text-xl font-black tracking-[-0.04em] text-white">
        {value}
      </p>
      <p className="mt-0.5 text-[10px] font-semibold text-white/52">{detail}</p>
    </article>
  );
}

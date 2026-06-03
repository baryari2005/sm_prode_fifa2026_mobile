"use client";

import { CheckCircle2, Clock3, LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";

type PronosticosSummaryProps = {
  disponibles: number;
  cargados: number;
  cerrados: number;
  className?: string;
};

export function PronosticosSummary({
  disponibles,
  cargados,
  cerrados,
  className,
}: PronosticosSummaryProps) {
  const items = [
    {
      label: "Disponibles",
      value: disponibles,
      icon: Clock3,
      className: "text-emerald-300",
    },
    {
      label: "Cargados",
      value: cargados,
      icon: CheckCircle2,
      className: "text-yellow-300",
    },
    {
      label: "Cerrados",
      value: cerrados,
      icon: LockKeyhole,
      className: "text-red-300",
    },
  ];

  return (
    <section className={cn("grid grid-cols-3 gap-2.5", className)}>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3 text-center shadow-sm backdrop-blur"
          >
            <div
              className={cn(
                "mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10",
                item.className
              )}
            >
              <Icon className="h-4 w-4" />
            </div>

            <p className="text-lg font-black leading-none text-white">
              {item.value}
            </p>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/55">
              {item.label}
            </p>
          </div>
        );
      })}
    </section>
  );
}
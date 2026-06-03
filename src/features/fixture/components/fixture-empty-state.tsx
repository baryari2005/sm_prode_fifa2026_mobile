import { CalendarDays } from "lucide-react";

export function FixtureEmptyState() {
  return (
    <section className="rounded-[1.85rem] border border-emerald-400/10 bg-[#052820] p-6 text-center shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/20">
        <CalendarDays className="h-6 w-6" />
      </div>

      <h2 className="mt-4 text-lg font-black text-white">
        No hay partidos disponibles
      </h2>

      <p className="mt-2 text-sm leading-6 text-white/60">
        Cuando el fixture del torneo este cargado, aca vas a ver las fechas y
        partidos ordenados por jornada.
      </p>
    </section>
  );
}

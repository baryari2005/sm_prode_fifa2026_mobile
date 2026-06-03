"use client";

import { CalendarDays, Medal, Target, Trophy } from "lucide-react";
import { MobileHomeActionCard } from "./mobile-home-action-card";

type QuickActionsGridProps = {
  pronosticosLabel: string;
  rankingLabel: string;
  fixtureLabel: string;
};

export function QuickActionsGrid({}: QuickActionsGridProps) {
  return (
    <section className="-mx-1.5 mb-1 mt-1 grid grid-cols-2 gap-1.5">
      <MobileHomeActionCard
        href="/pronosticos"
        title="Pronosticar"
        details="Cargá tus predicciones para los próximos partidos antes de que cierre el tiempo disponible. Cada acierto suma puntos y te acerca a lo más alto del ranking."
        icon={Target}
        tone="gold"
      />

      <MobileHomeActionCard
        href="/mis-pronosticos"
        title="Mis pronósticos"
        details="Consultá todas tus predicciones cargadas, revisá cuáles siguen abiertas, cuáles ya cerraron y cómo te fue cuando finalicen los partidos."
        icon={CalendarDays}
        tone="sky"
      />

      <MobileHomeActionCard
        href="/ranking"
        title="Ranking"
        details="Seguí tu posición en la tabla general, compará tus puntos con otros participantes y competí por llegar a los primeros puestos."
        icon={Medal}
        tone="navy"
      />

      <MobileHomeActionCard
        href="/fixture"
        title="Fixture"
        details="Consultá el calendario completo del Mundial 2026, con fechas, horarios, selecciones, fases y estados de cada partido."
        icon={Trophy}
        tone="gold"
      />
    </section>
  );
}

"use client";

import {
  ClipboardPenLine,
  Flame,
  LogOut,
  Medal,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";
import { MobileHomeActionCard } from "./mobile-home-action-card";
import { MobileHomeHero } from "./mobile-home-hero";

type MobileHomeRankingVariantProps = {
  userName: string;
  onLogout: () => void | Promise<void>;
};

export function MobileHomeRankingVariant({
  userName,
  onLogout,
}: MobileHomeRankingVariantProps) {
  return (
    <>
      <MobileHomeHero
        eyebrow={`Hola, ${userName}`}
        title="Hoy estás peleando arriba"
        description="Una versión más juego: posición, puntos y ritmo de usuario para que la home te invite a volver a jugar."
        primaryMetric={{ label: "Posición", value: "#12" }}
        secondaryMetric={{ label: "Puntos", value: "186 pts" }}
        badges={[
          { label: "Activo", icon: ShieldCheck, tone: "green" },
          { label: "Jugador", icon: Star, tone: "gold" },
          { label: "Mobile", icon: Smartphone, tone: "sky" },
        ]}
        action={{ label: "Cerrar sesión", icon: LogOut, onClick: onLogout }}
      />

      <section className="grid grid-cols-2 gap-3">
        <article className="rounded-[1.8rem] border border-[#F7B731]/20 bg-[linear-gradient(180deg,rgba(247,183,49,0.12),rgba(9,28,22,0.95))] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-[#F7B731]/15 text-[#F7B731] ring-1 ring-[#F7B731]/28">
            <Trophy className="size-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/42">
            Puntos mock
          </p>
          <p className="mt-2 text-2xl font-black tracking-[-0.05em]">186</p>
          <p className="mt-1 text-sm text-white/62">+18 esta semana</p>
        </article>

        <article className="rounded-[1.8rem] border border-[#39A935]/20 bg-[linear-gradient(180deg,rgba(57,169,53,0.12),rgba(9,28,22,0.95))] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-[#39A935]/15 text-[#D7FF87] ring-1 ring-[#39A935]/28">
            <Flame className="size-5" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/42">
            Racha mock
          </p>
          <p className="mt-2 text-2xl font-black tracking-[-0.05em]">4/5</p>
          <p className="mt-1 text-sm text-white/62">Pronósticos seguidos</p>
        </article>
      </section>

      <section className="rounded-[1.95rem] border border-[#008C93]/20 bg-[linear-gradient(180deg,rgba(0,140,147,0.14),rgba(9,28,22,0.94))] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7CE7EB]">
              Progreso mock
            </p>
            <h2 className="mt-2 text-xl font-black tracking-[-0.04em]">
              Seguís en carrera
            </h2>
          </div>
          <div className="rounded-2xl bg-white/10 px-3 py-2 text-right">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/45">
              Meta
            </p>
            <p className="text-sm font-semibold text-white">Top 10</p>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#F7B731_0%,#39A935_52%,#7CE7EB_100%)]" />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3">
        <MobileHomeActionCard
          href="/pronosticos"
          title="Pronosticar ahora"
          description="Tu próxima jugada puede hacerte subir posiciones."
          icon={ClipboardPenLine}
          tone="gold"
          size="large"
        />
        <div className="grid grid-cols-2 gap-3">
          <MobileHomeActionCard
            href="/ranking"
            title="Ver ranking"
            description="Comparate con el grupo."
            icon={Medal}
            tone="sky"
          />
          <MobileHomeActionCard
            href="/mis-pronosticos"
            title="Ver mis jugadas"
            description="Repasá tu historial."
            icon={Sparkles}
            tone="green"
          />
        </div>
      </section>
    </>
  );
}

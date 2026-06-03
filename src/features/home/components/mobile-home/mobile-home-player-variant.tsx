"use client";

import {
  ClipboardPenLine,
  LogOut,
  Medal,
  ShieldCheck,
  Smartphone,
  Target,
  Trophy,
  UserRoundCheck,
} from "lucide-react";
import { MobileHomeActionCard } from "./mobile-home-action-card";
import { MobileHomeHero } from "./mobile-home-hero";
import { MobileHomeSummaryCard } from "./mobile-home-summary-card";

type MobileHomePlayerVariantProps = {
  userName: string;
  userStatus: string;
  onLogout: () => void | Promise<void>;
};

export function MobileHomePlayerVariant({
  userName,
  userStatus,
  onLogout,
}: MobileHomePlayerVariantProps) {
  return (
    <>
      <MobileHomeHero
        eyebrow={`Hola, ${userName}`}
        title="Tu home de juego para el Prode Mundial 2026"
        description="Entrá rápido a tus pronósticos, revisá tu estado y seguí jugando desde una experiencia mobile simple y premium."
        primaryMetric={{ label: "Estado", value: userStatus }}
        secondaryMetric={{ label: "Sesión", value: "Activa" }}
        badges={[
          { label: "Prode Mundial 2026", icon: Trophy, tone: "gold" },
          { label: "Jugador", icon: UserRoundCheck, tone: "green" },
        ]}
        action={{ label: "Cerrar sesión", icon: LogOut, onClick: onLogout }}
      />

      <section className="rounded-[1.95rem] border border-[#F7B731]/20 bg-[linear-gradient(180deg,rgba(247,183,49,0.1),rgba(5,43,28,0.92))] p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F7B731]">
          Home jugador
        </p>
        <h2 className="mt-2 text-xl font-black tracking-[-0.04em]">
          Todo listo para empezar a pronosticar
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Elegí tus resultados antes del cierre, seguí el ranking y entrá a tus
          secciones clave con un toque.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3">
        <MobileHomeActionCard
          href="/pronosticos"
          title="Cargar pronósticos"
          description="Elegí tus resultados y guardalos a tiempo."
          icon={ClipboardPenLine}
          tone="gold"
          size="large"
        />
        <div className="grid grid-cols-2 gap-3">
          <MobileHomeActionCard
            href="/mis-pronosticos"
            title="Mis pronósticos"
            description="Revisá lo que ya cargaste."
            icon={Target}
            tone="green"
          />
          <MobileHomeActionCard
            href="/ranking"
            title="Ranking"
            description="Seguí tu posición."
            icon={Medal}
            tone="sky"
          />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <MobileHomeSummaryCard
          label="Sesión"
          value="Activa"
          icon={ShieldCheck}
          tone="green"
        />
        <MobileHomeSummaryCard
          label="Usuario"
          value="Activo"
          icon={UserRoundCheck}
          tone="gold"
        />
        <MobileHomeSummaryCard
          label="Experiencia"
          value="Mobile-first"
          icon={Smartphone}
          tone="sky"
        />
      </section>
    </>
  );
}

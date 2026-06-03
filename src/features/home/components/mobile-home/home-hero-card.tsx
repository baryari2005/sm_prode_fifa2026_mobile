"use client";

import { LogOut, RefreshCw, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { MobileHomeHero } from "./mobile-home-hero";

type HomeHeroCardProps = {
  userName: string;
  userStatus: string;
  phaseLabel: string;
  closeLabel: string;
  windowLabel: string;
  refreshLabel: string;
  onLogout: () => void | Promise<void>;
};

export function HomeHeroCard({
  userName,
  userStatus,
  phaseLabel,
  closeLabel,
  windowLabel,
  refreshLabel,
  onLogout,
}: HomeHeroCardProps) {
  return (
    <MobileHomeHero
      eyebrow="PRODE MUNDIAL 2026"
      title={`Hola, ${userName}`}
      description="Cada partido cuenta. Cargá tus predicciones, sumá puntos y competí por llegar a lo más alto del ranking."
      primaryMetric={{ label: "Próximo cierre", value: closeLabel }}
      secondaryMetric={{ label: "Ventana", value: windowLabel }}
      badges={[
        { label: phaseLabel, icon: Trophy, tone: "gold" },
        { label: userStatus, icon: ShieldCheck, tone: "green" },
        { label: `Refrescando en ${refreshLabel}`, icon: RefreshCw, tone: "sky" },
        { label: "Juego mobile", icon: Sparkles, tone: "sky" },
      ]}
      action={{ label: "Cerrar sesión", icon: LogOut, onClick: onLogout }}
    />
  );
}

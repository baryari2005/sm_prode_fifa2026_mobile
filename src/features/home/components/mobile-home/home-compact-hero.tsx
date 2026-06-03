"use client";

import { LogOut, RefreshCw, Trophy } from "lucide-react";

import { MobileHero } from "@/components/shared/mobile/mobile-hero";
import { Button } from "@/components/ui/button";
import { cheddar } from "@/lib/fonts";

const HOME_HERO_MASCOTS = [
  "/mascotas/condor.png",
  "/mascotas/yaguarete.png",
  "/mascotas/capi.png",
];

type HomeCompactHeroProps = {
  userName: string;
  userStatus: string;
  phaseLabel: string;
  refreshLabel: string;
  onLogout: () => void | Promise<void>;
};

export function HomeCompactHero({
  userName,
  refreshLabel,
  onLogout,
}: HomeCompactHeroProps) {
  return (
    <MobileHero
      eyebrow=""
      title="Hola, "
      username={userName}
      subtitle={
        <span
          className={`${cheddar.className} block text-[1.125rem] uppercase leading-none tracking-[0.04em] text-white`}
        >
          Tu barrio también juega <br />
          el mundial
        </span>
      }
      logoSrc="/brand/massm.png"
      logoAlt="Más San Miguel"
      imageSrc={HOME_HERO_MASCOTS}
      imageAlt=""
      className="min-h-[244px]"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <HeroChip
            label={`Actualiza en ${refreshLabel}`}
            icon={RefreshCw}
            tone="sky"
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          className="h-8 shrink-0 gap-1.5 rounded-full border border-white/16 bg-white/10 px-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#fab438] shadow-[0_10px_28px_rgba(0,0,0,0.25)] backdrop-blur-md hover:bg-white/18"
          onClick={onLogout}
          aria-label="Cerrar sesión"
        >
          <LogOut className="size-3.5 shrink-0" />
          <span className="leading-none">Salir</span>
        </Button>
      </div>
    </MobileHero>
  );
}

function HeroChip({
  label,
  icon: Icon,
  tone,
}: {
  label: string;
  icon: typeof Trophy;
  tone: "gold" | "green" | "sky";
}) {
  const toneClasses = {
    gold: "border-[#fab438]/40 bg-[#fab438]/12 text-[#ffd77b]",
    green: "border-[#5993b6]/34 bg-[#5993b6]/10 text-[#d4efff]",
    sky: "border-[#5993b6]/38 bg-[#5993b6]/12 text-[#aeebff]",
  } as const;

  return (
    <span
      className={`inline-flex h-9 w-full min-w-0 items-center justify-center gap-2 rounded-full border px-3.5 text-[11px] font-black uppercase tracking-[0.1em] backdrop-blur-md ${toneClasses[tone]}`}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  );
}

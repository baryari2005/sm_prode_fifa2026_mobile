"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { HomeVariant } from "@/features/home/types/mobile-home.types";

type MobileHomeVariantSwitcherProps = {
  value: HomeVariant;
  onValueChange: (value: HomeVariant) => void;
};

const options: { value: HomeVariant; label: string }[] = [
  { value: "jugador", label: "Jugador" },
  { value: "partido", label: "Próximo partido" },
  { value: "ranking", label: "Gamificada" },
];

export function MobileHomeVariantSwitcher({
  value,
  onValueChange,
}: MobileHomeVariantSwitcherProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onValueChange(next as HomeVariant)}
    >
      <TabsList className="grid w-full grid-cols-3 rounded-[1.2rem] border border-white/10 bg-white/8 p-1 backdrop-blur-md">
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className="rounded-[0.95rem] px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-white/62 data-active:bg-white data-active:text-[#052b1c]"
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

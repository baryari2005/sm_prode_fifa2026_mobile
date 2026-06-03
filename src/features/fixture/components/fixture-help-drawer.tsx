"use client";

import { CircleHelp, Radio, Timer, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const HELP_ITEMS = [
  {
    title: "Próximo",
    description: "El partido todavía no empezó y sigue dentro del fixture general.",
    icon: Timer,
    tone: "border-teal-300/20 bg-teal-400/12 text-teal-100",
  },
  {
    title: "Cerrado",
    description: "El partido ya no admite pronósticos aunque todavía no figure finalizado.",
    icon: Timer,
    tone: "border-red-300/20 bg-[rgba(95,18,28,0.28)] text-red-100",
  },
  {
    title: "En vivo",
    description: "El partido se está jugando en este momento.",
    icon: Radio,
    tone: "border-cyan-300/20 bg-cyan-400/12 text-cyan-100",
  },
  {
    title: "Finalizado",
    description: "El partido ya terminó y muestra resultado definitivo.",
    icon: Trophy,
    tone: "border-emerald-300/20 bg-emerald-400/12 text-emerald-100",
  },
];

export function FixtureHelpDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-11 w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] text-sm font-black text-white/80 shadow-[0_12px_30px_rgba(0,0,0,0.22)] hover:bg-white/[0.06] hover:text-white"
        >
          <CircleHelp className="size-4 text-[#F7B731]" />
          ¿Cómo leer el fixture?
        </Button>
      </DrawerTrigger>

      <DrawerContent className="border-t border-white/10 bg-[#10213a] text-white">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl font-black text-white">
              ¿Cómo leer el fixture?
            </DrawerTitle>
            <DrawerDescription className="text-sm leading-6 text-white/60">
              Cada estado te ayuda a entender rápido si el partido está por jugarse,
              en curso o ya terminó.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-3 px-4 pb-6">
            {HELP_ITEMS.map(({ title, description, icon: Icon, tone }) => (
              <div
                key={title}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/60">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

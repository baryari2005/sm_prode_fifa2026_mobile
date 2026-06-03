"use client";

import { CircleHelp, Medal, Target, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { RankingScoringRule } from "@/features/ranking/helpers/ranking-rules.helpers";

type RankingHelpDrawerProps = {
  phaseLabel?: string | null;
  rules: RankingScoringRule[];
};

export function RankingHelpDrawer({
  phaseLabel = "Fase actual",
  rules,
}: RankingHelpDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-10 w-full rounded-2xl border border-emerald-400/10 bg-[#052820] text-sm font-black text-white/78 shadow-[0_12px_28px_rgba(0,0,0,0.22)] hover:bg-white/[0.06] hover:text-white"
        >
          <CircleHelp className="size-4 text-[#F7B731]" />
          ¿Cómo se suman puntos?
        </Button>
      </DrawerTrigger>

      <DrawerContent className="border-t border-emerald-400/8 bg-[#082820] text-white">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="px-5 pb-4 pt-6 text-left">
            <DrawerTitle className="text-2xl font-black tracking-[-0.04em] text-white">
              Cómo se suman puntos
            </DrawerTitle>
            <DrawerDescription className="mt-2 text-sm leading-6 text-white/55">
              El ranking se actualiza según las reglas de puntaje de{" "}
              {phaseLabel}.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-3 px-5 pb-6">
            {rules.map((rule, index) => (
              <HelpRow
                key={rule.title}
                icon={index === 0 ? Trophy : index === 1 ? Target : Medal}
                title={rule.title}
                value={rule.value}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function HelpRow({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Trophy;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.2rem] border border-emerald-400/10 bg-white/[0.04] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/10 bg-white/[0.06] text-[#F7B731]">
            <Icon className="size-4" />
          </div>
          <p className="text-sm font-black text-white">{title}</p>
        </div>

        <span className="text-sm font-black text-[#D7FF87]">{value}</span>
      </div>
    </div>
  );
}

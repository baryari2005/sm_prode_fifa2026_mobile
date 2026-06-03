"use client";

import { CirclePause, Flag, Play, Trophy } from "lucide-react";

import {
  getFinalLiveEventImage,
  getHalftimeLiveEventImage,
  getKickoffLiveEventImage,
  getRandomGoalLiveEventImage,
} from "@/features/live-events/helpers/live-event-image.helper";
import { useLiveEventStore } from "@/stores/live-event.store";

const DEMO_BASE = {
  partidoId: "demo-live-event",
  equipoLocal: "Argentina",
  equipoVisitante: "México",
  golesLocal: 1,
  golesVisitante: 0,
};

export function LiveEventDebugPanel() {
  const enqueueEvent = useLiveEventStore((state) => state.enqueueEvent);

  function triggerKickoff() {
    enqueueEvent({
      ...DEMO_BASE,
      variant: "kickoff",
      mensaje: "La pelota ya rueda",
      imageSrc: getKickoffLiveEventImage(),
    });
  }

  function triggerGoal() {
    enqueueEvent({
      ...DEMO_BASE,
      variant: "goal",
      equipoGol: "Argentina",
      minuto: 23,
      jugador: "Lionel Messi",
      imageSrc: getRandomGoalLiveEventImage(),
    });
  }

  function triggerHalftime() {
    enqueueEvent({
      ...DEMO_BASE,
      variant: "halftime",
      mensaje: "Respirá, todavía queda partido.",
      imageSrc: getHalftimeLiveEventImage(),
    });
  }

  function triggerFinal() {
    enqueueEvent({
      partidoId: "demo-live-event",
      variant: "final",
      equipoLocal: "Argentina",
      equipoVisitante: "México",
      golesLocal: 2,
      golesVisitante: 1,
      mensaje: "Resultado confirmado",
      imageSrc: getFinalLiveEventImage(),
    });
  }

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-[121] w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 rounded-[1.4rem] border border-white/10 bg-slate-950/88 p-3 text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur">
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/58">
        Debug overlays
      </p>

      <div className="grid grid-cols-2 gap-2">
        <DebugButton label="Comienza" icon={Play} onClick={triggerKickoff} />
        <DebugButton label="Gol" icon={Trophy} onClick={triggerGoal} />
        <DebugButton
          label="Entretiempo"
          icon={CirclePause}
          onClick={triggerHalftime}
        />
        <DebugButton label="Final" icon={Flag} onClick={triggerFinal} />
      </div>
    </div>
  );
}

function DebugButton({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: typeof Play;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-[11px] font-black uppercase tracking-[0.06em] text-white/80 transition hover:bg-white/[0.12] hover:text-white"
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}

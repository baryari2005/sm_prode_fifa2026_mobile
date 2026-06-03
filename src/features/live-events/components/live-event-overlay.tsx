"use client";

import { useEffect } from "react";

import { LiveEventBackdrop } from "@/features/live-events/components/live-event-backdrop";
import { LiveEventCloseButton } from "@/features/live-events/components/live-event-close-button";
import { LiveEventConfetti } from "@/features/live-events/components/live-event-confetti";
import { LiveEventMascot } from "@/features/live-events/components/live-event-mascot";
import { LiveEventText } from "@/features/live-events/components/live-event-text";
import { getLiveEventCopy } from "@/features/live-events/helpers/live-event-copy.helper";
import { getLiveEventStyle } from "@/features/live-events/helpers/live-event-style.helper";
import type { LiveEventPayload } from "@/features/live-events/types/live-event.types";
import { cn } from "@/lib/utils";

type LiveEventOverlayProps = {
  open: boolean;
  event: LiveEventPayload | null;
  onClose: () => void;
};

export function LiveEventOverlay({
  open,
  event,
  onClose,
}: LiveEventOverlayProps) {
  useEffect(() => {
    if (!open || !event) {
      return;
    }

    const style = getLiveEventStyle(event.variant);
    const timeoutId = window.setTimeout(() => {
      onClose();
    }, style.durationMs);

    return () => window.clearTimeout(timeoutId);
  }, [event, onClose, open]);

  if (!open || !event) {
    return null;
  }

  const copy = getLiveEventCopy(event);
  const style = getLiveEventStyle(event.variant);
  const mascotSrc = event.imageSrc ?? style.mascotSrc;

  return (
    <div className="pointer-events-auto fixed inset-0 z-[120] overflow-hidden">
      <style jsx global>{`
        @keyframes live-event-pop {
          0% { opacity: 0; transform: scale(0.92) translateY(18px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes live-event-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes live-event-confetti {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(-18px, 112vh, 0) rotate(240deg); opacity: 0; }
        }
      `}</style>

      <LiveEventBackdrop glowClassName={style.glowClassName} />
      <LiveEventCloseButton onClose={onClose} />

      {style.confetti ? <LiveEventConfetti /> : null}

      <div className="relative z-20 flex min-h-dvh items-center justify-center px-5 py-[max(1.25rem,env(safe-area-inset-top))]">
        <div
          key={`${event.variant}-${event.partidoId ?? "global"}`}
          className={cn(
            "w-full max-w-md animate-[live-event-pop_360ms_ease-out] rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,38,27,0.82)_0%,rgba(5,24,19,0.9)_56%,rgba(4,18,15,0.94)_100%)] px-5 pb-7 pt-5 shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
          )}
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/32 to-transparent" />

          <div className="flex flex-col items-center gap-3">
            <div className={cn("animate-[live-event-bounce_1400ms_ease-in-out_infinite]", style.confetti ? "" : "animate-none")}>
              <LiveEventMascot
                src={mascotSrc}
                alt={`Mascota para evento ${event.variant}`}
              />
            </div>

            <LiveEventText
              title={copy.title}
              lines={copy.lines}
              accentClassName={style.accentClassName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Bell, BellOff, CheckCircle2, SmartphoneCharging } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { requestAndEnablePushNotifications } from "@/features/notifications/services/push-notifications.service";

type PermissionState = NotificationPermission | "unsupported" | "unknown";

function getPermissionState(): PermissionState {
  if (typeof window === "undefined") {
    return "unknown";
  }

  if (!("Notification" in window)) {
    return "unsupported";
  }

  return Notification.permission;
}

export function EnablePushNotificationsCard() {
  const [permission, setPermission] = useState<PermissionState>(() =>
    getPermissionState()
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleEnableNotifications() {
    setSubmitting(true);

    try {
      await requestAndEnablePushNotifications();
      setPermission(getPermissionState());
      toast.success("Notificaciones activadas.", {
        description: "Te vamos a avisar aunque cierres la app.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No pudimos activar las notificaciones.";

      toast.error(message);
      setPermission(getPermissionState());
    } finally {
      setSubmitting(false);
    }
  }

  const isGranted = permission === "granted";
  const isDenied = permission === "denied";
  const isUnsupported = permission === "unsupported";

  return (
    <section className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-4 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#5993b6]/24 bg-[#5993b6]/14 text-[#AEEBFF]">
          {isGranted ? (
            <CheckCircle2 className="size-5 text-[#BFFFE4]" />
          ) : isDenied ? (
            <BellOff className="size-5 text-[#F7E7A1]" />
          ) : (
            <Bell className="size-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#AEEBFF]">
            Notificaciones
          </p>
          <h3 className="mt-1 text-sm font-black text-white">
            Recibí avisos aunque cierres la app
          </h3>
          <p className="mt-1 text-sm leading-6 text-white/68">
            Activá alertas para goles, cierres de pronóstico y novedades del juego.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/46">
            Estado actual
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {isGranted
              ? "Activadas"
              : isDenied
                ? "Bloqueadas en este dispositivo"
                : isUnsupported
                  ? "No compatibles"
                  : "Pendientes de activar"}
          </p>
        </div>

        <SmartphoneCharging className="size-5 shrink-0 text-[#F7B731]" />
      </div>

      <Button
        type="button"
        onClick={() => void handleEnableNotifications()}
        disabled={submitting || isGranted || isUnsupported}
        className="mt-4 h-11 w-full rounded-2xl border border-[#E7B03A] bg-[#FAB438] font-black text-[#1E2C46] hover:bg-[#F7C45A] disabled:border-white/10 disabled:bg-white/[0.06] disabled:text-white/60"
      >
        {isGranted
          ? "Notificaciones activadas"
          : isUnsupported
            ? "No disponible en este dispositivo"
            : submitting
              ? "Activando..."
              : "Activar notificaciones"}
      </Button>
    </section>
  );
}

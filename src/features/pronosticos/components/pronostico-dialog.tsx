"use client";

import { useState } from "react";
import Image from "next/image";
import { LoaderCircle, Save, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { FlagImage } from "@/features/home/components/mobile-home/flag-image";
import {
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import { pronosticosService } from "@/features/pronosticos/services/pronosticos.service";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import {
  getPredictionReference,
  isPronosticoBlocked,
} from "@/features/pronosticos/utils/pronosticos.helpers";
import { cheddar } from "@/lib/fonts";

type PronosticoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partido: PronosticoPartido | null;
  onSaved?: () => void | Promise<void>;
};

type SeleccionConBandera = {
  nombre?: string | null;
  codigo?: string | null;
  bandera?: string | null;
  flag?: string | null;
  banderaUrl?: string | null;
  flagUrl?: string | null;
};

export function PronosticoDialog({
  open,
  onOpenChange,
  partido,
  onSaved,
}: PronosticoDialogProps) {
  if (!partido) {
    return null;
  }

  const actual = getPredictionReference(partido);
  const dialogKey = `${partido.id}-${actual?.golesLocal ?? "x"}-${actual?.golesVisitante ?? "x"}`;

  return (
    <PronosticoDialogInner
      key={dialogKey}
      open={open}
      onOpenChange={onOpenChange}
      partido={partido}
      onSaved={onSaved}
    />
  );
}

function PronosticoDialogInner({
  open,
  onOpenChange,
  partido,
  onSaved,
}: PronosticoDialogProps & { partido: PronosticoPartido }) {
  const actual = getPredictionReference(partido);
  const [golesLocal, setGolesLocal] = useState(String(actual?.golesLocal ?? 0));
  const [golesVisitante, setGolesVisitante] = useState(
    String(actual?.golesVisitante ?? 0)
  );
  const [saving, setSaving] = useState(false);

  const blocked = isPronosticoBlocked(partido);

  async function handleSave() {
    if (blocked) {
      toast.error("El pronóstico ya está cerrado para este partido.");
      return;
    }

    try {
      setSaving(true);

      await pronosticosService.upsertPronostico({
        partidoId: partido.id,
        golesLocal: Number(golesLocal),
        golesVisitante: Number(golesVisitante),
      });

      toast.success("Pronóstico guardado correctamente.");
      await onSaved?.();
      onOpenChange(false);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo guardar el pronóstico.";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  const title = actual ? "Editar pronóstico" : "Cargar pronóstico";

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="border-t border-white/10 bg-[linear-gradient(180deg,#1e2c46_0%,#17263e_100%)] text-white">
        <div className="mx-auto w-full max-w-md">
          <div className="relative overflow-hidden rounded-t-[2rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(89,147,182,0.16),transparent_34%),radial-gradient(circle_at_88%_14%,rgba(250,180,56,0.1),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <DrawerHeader className="relative px-5 pb-4 pt-6 text-left">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.10] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <DrawerTitle className="pr-10">
                <span className="flex items-center gap-3">
                  <Image
                    src="/brand/massm.png"
                    alt=""
                    width={28}
                    height={28}
                    aria-hidden="true"
                    className="shrink-0 object-contain"
                  />
                  <span
                    className={`${cheddar.className} text-[1.35rem] uppercase leading-none tracking-[0.04em] text-white`}
                  >
                    {title}
                  </span>
                </span>
              </DrawerTitle>

              <DrawerDescription className="mt-2 text-sm leading-6 text-white/60">
                {partido.seleccionLocal?.nombre ?? "Local"} vs{" "}
                {partido.seleccionVisitante?.nombre ?? "Visitante"}
              </DrawerDescription>
            </DrawerHeader>

            <div className="relative px-5 pb-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <TeamHeader
                    seleccion={partido.seleccionLocal}
                    fallbackName="Local"
                  />

                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#F7B731]">
                    VS
                  </span>

                  <TeamHeader
                    seleccion={partido.seleccionVisitante}
                    fallbackName="Visitante"
                    align="right"
                  />
                </div>

                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <ScoreInput
                    value={golesLocal}
                    onChange={setGolesLocal}
                    disabled={blocked || saving}
                  />

                  <span className="text-xl font-black text-white/35">-</span>

                  <ScoreInput
                    value={golesVisitante}
                    onChange={setGolesVisitante}
                    disabled={blocked || saving}
                  />
                </div>
              </div>

              {blocked ? (
                <p className="mt-4 rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  El pronóstico ya está cerrado para este partido.
                </p>
              ) : null}
            </div>

            <DrawerFooter className="grid grid-cols-2 gap-3 border-t border-white/10 bg-black/10 px-5 py-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={saving}
                className="h-11 rounded-2xl border border-white/10 bg-white/[0.06] font-bold text-white/80 hover:bg-white/10 hover:text-white"
              >
                Cancelar
              </Button>

              <Button
                type="button"
                onClick={() => void handleSave()}
                disabled={blocked || saving}
                className="h-11 rounded-2xl border border-[#E7B03A] bg-[#FAB438] font-black text-[#1E2C46] shadow-none hover:bg-[#F7C45A] disabled:border-white/10 disabled:bg-white/10 disabled:text-white/40"
              >
                {saving ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar
                  </>
                )}
              </Button>
            </DrawerFooter>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TeamHeader({
  seleccion,
  fallbackName,
  align = "left",
}: {
  seleccion: PronosticoPartido["seleccionLocal"];
  fallbackName: string;
  align?: "left" | "right";
}) {
  const team = seleccion as SeleccionConBandera | null | undefined;
  const name = team?.nombre ?? fallbackName;
  const code = getTeamCode(name, team?.codigo);

  const flagSrc = getFlagSrc(
    team?.bandera ?? team?.flag ?? team?.banderaUrl ?? team?.flagUrl,
    code
  );

  return (
    <div
      className={`flex min-w-0 items-center gap-2 ${
        align === "right" ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      <FlagImage
        src={flagSrc}
        alt={`Bandera de ${name}`}
        title={name}
        fallback={code.slice(0, 3)}
        className="h-6 w-8 shrink-0 object-contain"
        fallbackClassName="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-black text-white/70 ring-2 ring-white/15"
      />

      <p className="truncate text-sm font-black text-white">{name}</p>
    </div>
  );
}

function ScoreInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      disabled={disabled}
      onFocus={(event) => event.target.select()}
      onClick={(event) => event.currentTarget.select()}
      onChange={(event) =>
        onChange(event.target.value.replace(/\D/g, "").slice(0, 2) || "0")
      }
      className="mx-auto h-14 w-full rounded-2xl border border-white/10 bg-white/[0.92] text-center text-2xl font-black text-slate-950 outline-none ring-[#5993b6]/20 transition focus:border-[#5993b6]/50 focus:ring-4 disabled:opacity-60"
    />
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowBigLeft, ClipboardPenLine, LoaderCircle, Save } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProtectedMobilePage } from "@/features/auth/components/protected-mobile-page";
import { EquipoClasificadoSelector } from "@/features/pronosticos/components/equipo-clasificado-selector";
import { PronosticosMatchCard } from "@/features/pronosticos/components/pronosticos-match-card";
import { pronosticosService } from "@/features/pronosticos/services/pronosticos.service";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import {
  getPredictionReference,
  isPronosticoBlocked,
  shouldSelectEquipoClasificado,
} from "@/features/pronosticos/utils/pronosticos.helpers";
import { cheddar } from "@/lib/fonts";

type ScoreField = "golesLocal" | "golesVisitante";

export default function CargarPronosticoPartidoPage() {
  const router = useRouter();
  const params = useParams<{ partidoId: string }>();
  const searchParams = useSearchParams();
  const partidoId = params.partidoId;
  const returnTo = searchParams.get("returnTo") || "/inicio";

  const [partido, setPartido] = useState<PronosticoPartido | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actual = partido ? getPredictionReference(partido) : null;
  const blocked = partido ? isPronosticoBlocked(partido) : false;

  const [golesLocal, setGolesLocal] = useState("0");
  const [golesVisitante, setGolesVisitante] = useState("0");
  const [equipoClasificadoId, setEquipoClasificadoId] = useState<string | null>(
    null
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const golesLocalNumber = Number(golesLocal || 0);
  const golesVisitanteNumber = Number(golesVisitante || 0);
  const showEquipoClasificadoSelector = partido
    ? shouldSelectEquipoClasificado(partido, golesLocalNumber, golesVisitanteNumber)
    : false;

  const isDirty = useMemo(() => {
    if (!partido) return false;

    if (!actual) {
      return true;
    }

    if (showEquipoClasificadoSelector && !equipoClasificadoId) {
      return true;
    }

    const nextEquipoClasificadoId = showEquipoClasificadoSelector
      ? equipoClasificadoId
      : null;
    const currentEquipoClasificadoId = shouldSelectEquipoClasificado(
      partido,
      Number(actual.golesLocal ?? 0),
      Number(actual.golesVisitante ?? 0)
    )
      ? actual.equipoClasificadoId ?? null
      : null;

    return (
      normalizeScore(golesLocal) !== normalizeScore(String(actual.golesLocal ?? 0)) ||
      normalizeScore(golesVisitante) !==
        normalizeScore(String(actual.golesVisitante ?? 0)) ||
      nextEquipoClasificadoId !== currentEquipoClasificadoId
    );
  }, [
    actual,
    equipoClasificadoId,
    golesLocal,
    golesVisitante,
    partido,
    showEquipoClasificadoSelector,
  ]);

  async function loadPartido(options?: { showLoader?: boolean }) {
    if (options?.showLoader !== false) {
      setLoading(true);
    }

    setError(null);

    try {
      const partidos = await pronosticosService.getFixturePronosticos();
      const found = partidos.find((item) => item.id === partidoId);

      if (!found) {
        setPartido(null);
        setError("No encontramos el partido seleccionado.");
        return;
      }

      const current = getPredictionReference(found);

      setPartido(found);
      setGolesLocal(String(current?.golesLocal ?? 0));
      setGolesVisitante(String(current?.golesVisitante ?? 0));
      setEquipoClasificadoId(current?.equipoClasificadoId ?? null);
      setValidationError(null);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No pudimos cargar el partido.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  function handleScoreChange(field: ScoreField, value: string) {
    if (blocked) return;

    setValidationError(null);

    if (field === "golesLocal") {
      setGolesLocal(value);
      if (
        partido &&
        !shouldSelectEquipoClasificado(
          partido,
          Number(value || 0),
          golesVisitanteNumber
        )
      ) {
        setEquipoClasificadoId(null);
      }
      return;
    }

    setGolesVisitante(value);
    if (
      partido &&
      !shouldSelectEquipoClasificado(
        partido,
        golesLocalNumber,
        Number(value || 0)
      )
    ) {
      setEquipoClasificadoId(null);
    }
  }

  async function handleSave() {
    if (!partido) return;

    if (blocked) {
      toast.error("El pronóstico ya está cerrado para este partido.");
      return;
    }

    if (showEquipoClasificadoSelector && !equipoClasificadoId) {
      const message = "Seleccioná quién pasa por penales.";
      setValidationError(message);
      toast.error(message);
      return;
    }

    try {
      setSaving(true);

      await pronosticosService.upsertPronostico({
        partidoId: partido.id,
        golesLocal: golesLocalNumber,
        golesVisitante: golesVisitanteNumber,
        equipoClasificadoId: showEquipoClasificadoSelector
          ? equipoClasificadoId
          : null,
      });

      toast.success("Pronóstico guardado correctamente.");
      await loadPartido({ showLoader: false });
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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      void loadPartido();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [partidoId]);

  return (
    <ProtectedMobilePage
      title="Cargar pronóstico"
      subtitle={
        <span
          className={`${cheddar.className} block text-[1.125rem] uppercase leading-none tracking-[0.04em] text-white`}
        >
          Cargá el resultado
          <br />
          antes del cierre
        </span>
      }
      eyebrow=""
      heroLogoSrc="/brand/massm.png"
      heroMascotSrc={["/mascotas/condor.png", "/mascotas/capi.png"]}
      heroFooter={
        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant="secondary"
            className="h-8 shrink-0 gap-1.5 rounded-full border border-white/16 bg-white/10 px-3 text-[11px] font-black uppercase tracking-[0.08em] text-[#fab438] shadow-[0_10px_28px_rgba(0,0,0,0.25)] backdrop-blur-md hover:bg-white/18"
            onClick={() => router.push(returnTo)}
            aria-label="Volver al inicio"
          >
            <ArrowBigLeft className="size-3.5 shrink-0" />
            <span className="leading-none">Volver</span>
          </Button>
        </div>
      }
    >
      <div className="relative overflow-hidden bg-transparent pb-8 text-white">
        <div className="pointer-events-none absolute bottom-0 left-0 z-0 opacity-[0.08]">
          <div className="relative h-[82px] w-[210px]">
            <Image
              src="/brand/mas.png"
              alt=""
              fill
              aria-hidden="true"
              className="object-contain object-left-bottom"
              sizes="210px"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          {error ? (
            <Alert className="rounded-2xl border-red-300/30 bg-red-500/10 text-red-100">
              <AlertTitle>No pudimos cargar el partido</AlertTitle>
              <AlertDescription className="text-red-100/80">
                {error}
              </AlertDescription>
            </Alert>
          ) : null}

          {loading ? (
            <section className="h-40 animate-pulse rounded-[1.65rem] border border-white/10 bg-white/[0.06]" />
          ) : partido ? (
            <>
              {actual && !isDirty ? (
                <section className="rounded-[1.35rem] border border-[#5993b6]/24 bg-[#5993b6]/10 px-4 py-3 text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)]">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#AEEBFF]">
                    Pronóstico cargado
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/78">
                    Modificá el resultado para habilitar{" "}
                    <strong className="text-white">Guardar cambios</strong>.
                  </p>
                </section>
              ) : null}

              <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 shadow-[0_12px_34px_rgba(0,0,0,0.24)]">
                <div className="mb-3 flex items-center justify-between gap-3 px-1">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">                    
                    {actual ? "Editar pronóstico" : "Cargar pronóstico"}
                  </p>

                  {/* {blocked ? (
                    <span className="rounded-full border border-red-300/25 bg-red-400/10 px-3 py-1 text-[10px] font-black text-red-200">
                      Cerrado
                    </span>
                  ) : (
                    <span className="rounded-full border border-[#5993b6]/24 bg-[#5993b6]/14 px-3 py-1 text-[10px] font-black text-[#AEEBFF]">
                      Disponible
                    </span>
                  )} */}
                </div>

                <PronosticosMatchCard
                  partido={partido}
                  golesLocal={golesLocal}
                  golesVisitante={golesVisitante}
                  isDirty={isDirty}
                  onScoreChange={handleScoreChange}
                />

                {showEquipoClasificadoSelector ? (
                  <EquipoClasificadoSelector
                    partido={partido}
                    value={equipoClasificadoId}
                    disabled={blocked || saving}
                    error={validationError}
                    onChange={(equipoId) => {
                      setEquipoClasificadoId(equipoId);
                      setValidationError(null);
                    }}
                  />
                ) : null}
              </section>

              <Button
                type="button"
                onClick={() => void handleSave()}
                disabled={blocked || saving || !isDirty}
                className="h-12 w-full rounded-2xl border border-[#E7B03A] bg-[#FAB438] font-black text-[#1E2C46] shadow-[0_16px_40px_rgba(250,180,56,0.24)] hover:bg-[#F7C45A] hover:shadow-[0_18px_40px_rgba(250,180,56,0.34)] disabled:border-white/10 disabled:bg-white/[0.08] disabled:text-white/40"
              >
                {saving ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    {actual ? "Guardar cambios" : "Guardar pronóstico"}
                  </>
                )}
              </Button>
            </>
          ) : (
            <section className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(135deg,rgba(25,48,78,0.92)_0%,rgba(23,39,63,0.96)_52%,rgba(18,31,50,0.98)_100%)] p-6 text-center shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5993b6]/14 text-[#AEEBFF] ring-1 ring-[#5993b6]/20">
                <ClipboardPenLine className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-black text-white">
                Partido no encontrado
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Volvé al inicio e intentá cargar el pronóstico nuevamente.
              </p>
            </section>
          )}
        </div>
      </div>
    </ProtectedMobilePage>
  );
}

function normalizeScore(value: string) {
  const cleanValue = value.trim();

  if (!cleanValue) return "0";

  return String(Number(cleanValue));
}

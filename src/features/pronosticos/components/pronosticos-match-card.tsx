"use client";

import {
  CalendarDays,
  Clock3,
  PencilLine,
  Radio,
  TimerReset,
  Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlagImage } from "@/features/home/components/mobile-home/flag-image";
import { getFixturePhaseLabel } from "@/features/fixture/utils/fixture.helpers";
import {
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import {
  PREDICTION_CLOSE_MINUTES_BEFORE,
  getPredictionReference,
  isPronosticoBlocked,
} from "@/features/pronosticos/utils/pronosticos.helpers";
import {
  getPronosticoActionLabel,
  getPronosticoCenterLabel,
  getPronosticoVisualStatus,
} from "@/features/pronosticos/utils/pronosticos-mobile.helpers";
import { cn } from "@/lib/utils";

type EditableProps = {
  partido: PronosticoPartido;
  golesLocal: string;
  golesVisitante: string;
  isDirty?: boolean;
  onScoreChange: (
    field: "golesLocal" | "golesVisitante",
    value: string
  ) => void;
  onAction?: never;
};

type ReadonlyProps = {
  partido: PronosticoPartido;
  onAction?: (partido: PronosticoPartido) => void;
  showAction?: boolean;
  golesLocal?: never;
  golesVisitante?: never;
  isDirty?: never;
  onScoreChange?: never;
};

type PronosticosMatchCardProps = EditableProps | ReadonlyProps;

export function PronosticosMatchCard(props: PronosticosMatchCardProps) {
  const { partido } = props;
  const status = getPronosticoVisualStatus(partido);
  const actual = getPredictionReference(partido);
  const centerLabel = getPronosticoCenterLabel(partido);
  const actionLabel = getPronosticoActionLabel(partido);
  const phaseLabel = getFixturePhaseLabel(partido);
  const isEditable = isEditableProps(props);
  const showAction = !isEditable && props.showAction !== false;

  if (isEditable) {
    return (
      <div className="text-white">
        <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
            <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#AEEBFF]">
              <CalendarDays className="size-3.5 shrink-0 text-[#FAB438]" />
              <span>{formatPredictionMatchDay(partido.fecha)}</span>
            </div>
            <span className="text-white/24 sm:inline">|</span>
            <div className="inline-flex items-center gap-2 text-[0.78rem] font-semibold text-[#AEEBFF]">
              <Clock3 className="size-3.5 shrink-0 text-[#FAB438]" />
              <span>{formatPredictionMatchTime(partido.fecha)}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-[1.15rem] border border-white/10 bg-white/[0.04] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <PredictionFlagSide
              team={partido.seleccionLocal}
              fallbackName="Local"
              align="left"
            />

            <EditableScoreRow
              golesLocal={props.golesLocal}
              golesVisitante={props.golesVisitante}
              disabled={isPronosticoBlocked(partido)}
              onScoreChange={props.onScoreChange}
            />

            <PredictionFlagSide
              team={partido.seleccionVisitante}
              fallbackName="Visitante"
              align="right"
            />
          </div>
        </div>

        <div className="mt-3 rounded-[1.15rem] border border-white/10 bg-[#2F4564]/72 px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-center text-[0.82rem] font-semibold text-[#AEEBFF]">
            <TimerReset className="size-4 shrink-0 text-[#AEEBFF]" />
            <span>{formatPredictionCloseLabel(partido)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3 text-white shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-[10px] font-black uppercase tracking-[0.18em] text-[#AEEBFF]">
          {phaseLabel}
        </p>

        <Badge
          className={cn(
            "h-6 shrink-0 rounded-full px-2.5 text-[10px] font-black",
            status.className
          )}
        >
          {status.key === "finalizado" ? (
            <Trophy className="size-3" />
          ) : status.key === "cerrado" ? (
            <Radio className="size-3" />
          ) : (
            <Clock3 className="size-3" />
          )}
          {status.shortLabel}
        </Badge>
      </div>

      <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-3 py-3">
        <div className="flex items-center justify-between gap-3">
          <PredictionTeamCompact
            team={partido.seleccionLocal}
            fallbackName="Local"
            align="left"
          />

          <div className="min-w-[92px] shrink-0 text-center">
            <p className="whitespace-nowrap text-[15px] font-black tracking-[-0.04em] text-white">
              {centerLabel}
            </p>
          </div>

          <PredictionTeamCompact
            team={partido.seleccionVisitante}
            fallbackName="Visitante"
            align="right"
          />
        </div>
      </div>

      {actual ? (
        <div className="mt-3 rounded-[1rem] border border-white/8 bg-white/[0.04] px-3 py-2">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/46">
            Tu predicción actual
          </p>
          <p className="mt-1 text-sm font-black text-white">
            {actual.golesLocal ?? 0} - {actual.golesVisitante ?? 0}
          </p>
        </div>
      ) : null}

      {showAction ? (
        <Button
          type="button"
          onClick={() => props.onAction?.(partido)}
          disabled={!status.canOpen}
          className={cn(
            "mt-3 h-10 w-full rounded-2xl font-black shadow-none",
            isPronosticoBlocked(partido)
              ? "border border-white/10 bg-white/[0.06] text-white/70 hover:bg-white/[0.08]"
              : "border border-[#E7B03A] bg-[#FAB438] text-[#1E2C46] hover:bg-[#F7C45A]"
          )}
          variant={status.canEdit ? "default" : "secondary"}
        >
          <PencilLine className="size-4" />
          {actionLabel}
        </Button>
      ) : null}
    </article>
  );
}

function isEditableProps(
  props: PronosticosMatchCardProps
): props is EditableProps {
  return (
    typeof props.onScoreChange === "function" &&
    typeof props.golesLocal === "string" &&
    typeof props.golesVisitante === "string"
  );
}

function EditableScoreRow({
  golesLocal,
  golesVisitante,
  disabled,
  onScoreChange,
}: {
  golesLocal: string;
  golesVisitante: string;
  disabled: boolean;
  onScoreChange: (
    field: "golesLocal" | "golesVisitante",
    value: string
  ) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <ScoreInput
        value={golesLocal}
        onChange={(value) => onScoreChange("golesLocal", value)}
        disabled={disabled}
      />
      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#F7B731]">
        VS
      </span>
      <ScoreInput
        value={golesVisitante}
        onChange={(value) => onScoreChange("golesVisitante", value)}
        disabled={disabled}
      />
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
      type="number"
      inputMode="numeric"
      min="0"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onFocus={(event) => event.currentTarget.select()}
      onClick={(event) => event.currentTarget.select()}
      disabled={disabled}
      className="h-8 w-10 rounded-full border-white/14 bg-white/[0.07] px-0 text-center text-[1.2rem] font-black text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}

function PredictionFlagSide({
  team,
  fallbackName,
  align,
}: {
  team: PronosticoPartido["seleccionLocal"];
  fallbackName: string;
  align: "left" | "right";
}) {
  const teamName = team?.nombre ?? fallbackName;
  const teamCode = getTeamCode(teamName, team?.codigo);
  const flagSrc = getFlagSrc(
    team?.bandera ?? team?.flag ?? team?.banderaUrl ?? team?.flagUrl ?? null,
    teamCode
  );

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2",
        align === "right" ? "justify-end" : "justify-start"
      )}
    >
      <FlagImage
        key={flagSrc ?? teamCode}
        src={flagSrc}
        alt={`Bandera de ${teamName}`}
        title={teamName}
        fallback={teamCode.slice(0, 3)}
        className="h-8 w-9 shrink-0 object-contain"
        fallbackClassName="flex h-10 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[10px] font-black uppercase text-white/75"
      />
    </div>
  );
}

function PredictionTeamCompact({
  team,
  fallbackName,
  align,
}: {
  team: PronosticoPartido["seleccionLocal"];
  fallbackName: string;
  align: "left" | "right";
}) {
  const teamName = team?.nombre ?? fallbackName;
  const teamCode = getTeamCode(teamName, team?.codigo);
  const flagSrc = getFlagSrc(
    team?.bandera ?? team?.flag ?? team?.banderaUrl ?? team?.flagUrl ?? null,
    teamCode
  );

  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2",
        align === "right" ? "flex-row-reverse text-right" : "text-left"
      )}
    >
      <FlagImage
        key={flagSrc ?? teamCode}
        src={flagSrc}
        alt={`Bandera de ${teamName}`}
        title={teamName}
        fallback={teamCode.slice(0, 3)}
        className="h-7 w-8 shrink-0 object-contain"
        fallbackClassName="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-[10px] font-black uppercase text-white/75"
      />

      <p className="min-w-0 flex-1 truncate whitespace-nowrap text-[13px] font-black tracking-[-0.02em] text-white">
        {teamName}
      </p>
    </div>
  );
}

function formatPredictionMatchDay(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  })
    .format(new Date(date))
    .replace(".", "");
}

function formatPredictionMatchTime(date: string) {
  const time = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(date));

  return `${time} HS`;
}

function formatPredictionCloseLabel(partido: PronosticoPartido) {
  const matchTime = new Date(partido.fecha).getTime();
  const closeTime =
    matchTime - PREDICTION_CLOSE_MINUTES_BEFORE * 60 * 1000;
  const diffMinutes = Math.max(0, Math.ceil((closeTime - Date.now()) / 60000));

  if (partido.resultado?.estado?.toUpperCase() === "FINALIZADO") {
    return "Partido finalizado";
  }

  if (partido.resultado?.estado?.toUpperCase() === "EN_JUEGO") {
    return "Partido en juego";
  }

  if (diffMinutes <= 0) {
    return "Pronóstico cerrado";
  }

  if (diffMinutes < 60) {
    return `Cierra en ${diffMinutes} min`;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  if (minutes === 0) {
    return `Cierra en ${hours} h`;
  }

  return `Cierra en ${hours} h ${minutes} min`;
}

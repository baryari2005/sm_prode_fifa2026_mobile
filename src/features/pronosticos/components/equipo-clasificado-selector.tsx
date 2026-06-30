"use client";

import { FlagImage } from "@/features/home/components/mobile-home/flag-image";
import {
  getFlagSrc,
  getTeamCode,
} from "@/features/home/helpers/next-match-card.helpers";
import type { PronosticoPartido } from "@/features/pronosticos/types/pronosticos.types";
import { cn } from "@/lib/utils";

type EquipoClasificadoSelectorProps = {
  partido: PronosticoPartido;
  value: string | null;
  disabled?: boolean;
  error?: string | null;
  onChange: (equipoId: string) => void;
};

export function EquipoClasificadoSelector({
  partido,
  value,
  disabled = false,
  error,
  onChange,
}: EquipoClasificadoSelectorProps) {
  return (
    <div className="mt-3 rounded-[1.15rem] border border-[#FAB438]/20 bg-[#FAB438]/10 p-3">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#F7C45A]">
        Si empatan, quien pasa por penales?
      </p>

      <div className="mt-3 grid grid-cols-1 gap-2">
        <EquipoButton
          equipo={partido.seleccionLocal}
          fallbackName="Equipo local"
          selected={value === partido.seleccionLocal?.id}
          disabled={disabled || !partido.seleccionLocal?.id}
          onClick={() => {
            if (partido.seleccionLocal?.id) {
              onChange(partido.seleccionLocal.id);
            }
          }}
        />

        <EquipoButton
          equipo={partido.seleccionVisitante}
          fallbackName="Equipo visitante"
          selected={value === partido.seleccionVisitante?.id}
          disabled={disabled || !partido.seleccionVisitante?.id}
          onClick={() => {
            if (partido.seleccionVisitante?.id) {
              onChange(partido.seleccionVisitante.id);
            }
          }}
        />
      </div>

      {error ? (
        <p className="mt-2 text-sm font-semibold text-red-100">{error}</p>
      ) : null}
    </div>
  );
}

function EquipoButton({
  equipo,
  fallbackName,
  selected,
  disabled,
  onClick,
}: {
  equipo: PronosticoPartido["seleccionLocal"];
  fallbackName: string;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const name = equipo?.nombre ?? fallbackName;
  const code = getTeamCode(name, equipo?.codigo);
  const flagSrc = getFlagSrc(
    equipo?.bandera ?? equipo?.flag ?? equipo?.banderaUrl ?? equipo?.flagUrl,
    code
  );

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex min-h-12 w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left transition",
        selected
          ? "border-[#FAB438] bg-[#FAB438] text-[#1E2C46]"
          : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.10]",
        disabled ? "cursor-not-allowed opacity-55" : ""
      )}
    >
      <FlagImage
        src={flagSrc}
        alt={`Bandera de ${name}`}
        title={name}
        fallback={code.slice(0, 3)}
        className="h-7 w-8 shrink-0 object-contain"
        fallbackClassName="flex h-7 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.08] text-[10px] font-black uppercase text-white/75"
      />
      <span className="min-w-0 flex-1 truncate text-sm font-black">
        Pasa {name} por penales
      </span>
    </button>
  );
}

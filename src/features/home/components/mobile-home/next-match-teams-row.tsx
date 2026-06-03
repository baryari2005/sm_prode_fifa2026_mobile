"use client";

import type { ReactNode } from "react";
import { FlagImage } from "./flag-image";

type TeamDisplayData = {
  flagSrc: string | null;
  code: string;
  name: string;
};

type NextMatchTeamsRowProps = {
  local: TeamDisplayData;
  visitante: TeamDisplayData;
  centerContent?: ReactNode;
};

export function NextMatchTeamsRow({
  local,
  visitante,
  centerContent,
}: NextMatchTeamsRowProps) {
  return (
    <div className="rounded-[1rem] bg-white/[0.055] px-1 py-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TeamInlineBlock
          flagSrc={local.flagSrc}
          code={local.code}
          name={local.name}
          side="left"
        />

        {centerContent ?? (
          <div className="flex h-8 shrink-0 items-center justify-center rounded-full border border-[#F7B731]/35 bg-[#F7B731]/10 px-3 text-[11px] font-black uppercase tracking-[0.18em] text-[#F7B731]">
            VS
          </div>
        )}

        <TeamInlineBlock
          flagSrc={visitante.flagSrc}
          code={visitante.code}
          name={visitante.name}
          side="right"
        />
      </div>
    </div>
  );
}

function TeamInlineBlock({
  flagSrc,
  code,
  name,
  side,
}: {
  flagSrc: string | null;
  code: string;
  name: string;
  side: "left" | "right";
}) {
  const flag = (
    <div className="relative flex h-9 w-12 shrink-0 items-center justify-center">
      <FlagImage
        key={flagSrc ?? code}
        src={flagSrc}
        alt={`Bandera de ${name}`}
        fallback={code}
        className="h-8 w-auto max-w-[44px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.28)]"
      />
    </div>
  );

  const text = (
    <div
      className={`min-w-0 flex-1 overflow-hidden ${
        side === "right" ? "text-right" : "text-left"
      }`}
    >
      <p className="truncate whitespace-nowrap text-[15px] font-black leading-5 tracking-[-0.03em] text-white">
        {name}
      </p>

      <p className="mt-0.5 text-[11px] font-black uppercase tracking-[0.18em] text-white/45">
        {side === "right" ? "Visitante" : "Local"}
      </p>
    </div>
  );

  return (
    <div
      className={`flex min-w-0 items-center gap-2.5 ${
        side === "right" ? "justify-end" : "justify-start"
      }`}
    >
      {side === "left" ? (
        <>
          {flag}
          {text}
        </>
      ) : (
        <>
          {text}
          {flag}
        </>
      )}
    </div>
  );
}

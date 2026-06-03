"use client";

import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type HeroBadge = {
  label: string;
  icon: LucideIcon;
  tone?: "gold" | "green" | "sky";
};

type MobileHomeHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryMetric?: {
    label: string;
    value: string;
  };
  secondaryMetric?: {
    label: string;
    value: string;
  };
  badges?: HeroBadge[];
  action?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    ariaLabel?: string;
  };
};

const badgeToneStyles = {
  gold: "border-[#F7B731]/35 bg-[#F7B731]/12 text-[#F7B731]",
  green: "border-[#39A935]/35 bg-[#39A935]/12 text-[#D7FF87]",
  sky: "border-[#008C93]/35 bg-[#008C93]/12 text-[#7CE7EB]",
} as const;

export function MobileHomeHero({
  eyebrow,
  title,
  description,
  primaryMetric,
  secondaryMetric,
  badges = [],
  action,
}: MobileHomeHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-[linear-gradient(145deg,#052b1c_0%,#082033_52%,#06111F_100%)] px-5 py-6 text-white shadow-[0_26px_90px_rgba(0,0,0,0.34)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(57,169,53,0.34),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(247,183,49,0.2),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(0,140,147,0.24),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-28 rounded-t-full bg-[linear-gradient(90deg,rgba(57,169,53,0.12),rgba(247,183,49,0.08),rgba(0,140,147,0.1))] blur-2xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#F7B731]">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-[2rem] font-black leading-[0.98] tracking-[-0.06em] text-white">
              {title}
            </h1>
            <p className="mt-3 max-w-[29ch] text-sm leading-6 text-white/74">
              {description}
            </p>
          </div>

          {action ? (
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="shrink-0 rounded-2xl border border-white/10 bg-white/10 text-white shadow-none hover:bg-white/18"
              onClick={action.onClick}
              aria-label={action.ariaLabel ?? action.label}
            >
              <action.icon className="size-4" />
            </Button>
          ) : null}
        </div>

        {badges.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge
                key={badge.label}
                variant="outline"
                className={`h-8 rounded-full border px-3 text-[11px] font-black uppercase tracking-[0.16em] ${
                  badgeToneStyles[badge.tone ?? "gold"]
                }`}
              >
                <badge.icon className="size-3.5" />
                {badge.label}
              </Badge>
            ))}
          </div>
        ) : null}

        {primaryMetric || secondaryMetric ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {primaryMetric ? (
              <div className="rounded-[1.7rem] border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/46">
                  {primaryMetric.label}
                </p>
                <p className="mt-2 text-xl font-black tracking-[-0.05em] text-white">
                  {primaryMetric.value}
                </p>
              </div>
            ) : null}

            {secondaryMetric ? (
              <div className="rounded-[1.7rem] border border-white/10 bg-white/8 p-4 backdrop-blur-md">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/46">
                  {secondaryMetric.label}
                </p>
                <p className="mt-2 text-xl font-black tracking-[-0.05em] text-white">
                  {secondaryMetric.value}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

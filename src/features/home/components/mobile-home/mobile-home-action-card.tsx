"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type MobileHomeActionCardProps = {
  href: string;
  title: string;
  description?: string;
  details?: string;
  icon: LucideIcon;
  tone?: "gold" | "green" | "sky" | "navy" | "violet";
  size?: "default" | "large";
};

const toneStyles = {
  gold: {
    card: "border-[#e7b03a]/50 bg-[linear-gradient(135deg,rgba(54,43,12,0.74)_0%,rgba(42,50,22,0.88)_54%,rgba(20,28,25,0.96)_100%)]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(250,180,56,0.18),transparent_36%)]",
    iconWrap:
      "bg-[linear-gradient(180deg,rgba(111,84,19,0.68),rgba(83,59,12,0.88))] ring-1 ring-[#fab438]/20",
    icon: "text-[#ffd77b]",
    button: "bg-[#fab438] text-[#1e2c46] hover:bg-[#f7c45a]",
  },
  green: {
    card: "border-[#5993b6]/42 bg-[linear-gradient(135deg,rgba(24,62,74,0.84)_0%,rgba(21,50,68,0.92)_54%,rgba(14,34,54,0.96)_100%)]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(126,222,193,0.18),transparent_36%)]",
    iconWrap:
      "bg-[linear-gradient(180deg,rgba(34,99,90,0.78),rgba(24,73,76,0.92))] ring-1 ring-[#7CE7EB]/18",
    icon: "text-[#BFFFE4]",
    button: "bg-[#5993b6] text-white hover:bg-[#70a3c2]",
  },
  sky: {
    card: "border-[#5993b6]/42 bg-[linear-gradient(135deg,rgba(26,58,88,0.82)_0%,rgba(24,49,80,0.92)_54%,rgba(16,30,48,0.96)_100%)]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(89,147,182,0.22),transparent_36%)]",
    iconWrap:
      "bg-[linear-gradient(180deg,rgba(48,88,122,0.78),rgba(34,62,94,0.92))] ring-1 ring-[#5993b6]/24",
    icon: "text-[#AEEBFF]",
    button: "bg-[#5993b6] text-white hover:bg-[#70a3c2]",
  },
  navy: {
    card: "border-white/16 bg-[linear-gradient(135deg,rgba(30,44,70,0.86)_0%,rgba(25,39,62,0.94)_54%,rgba(17,30,48,0.98)_100%)]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(250,180,56,0.14),transparent_36%)]",
    iconWrap:
      "bg-[linear-gradient(180deg,rgba(58,79,112,0.74),rgba(36,53,78,0.92))] ring-1 ring-white/12",
    icon: "text-[#fab438]",
    button: "bg-[#fab438] text-[#1e2c46] hover:bg-[#f7c45a]",
  },
  violet: {
    card: "border-[#5993b6]/35 bg-[linear-gradient(135deg,rgba(41,63,100,0.8)_0%,rgba(28,45,76,0.9)_54%,rgba(18,29,48,0.96)_100%)]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(89,147,182,0.18),transparent_36%)]",
    iconWrap:
      "bg-[linear-gradient(180deg,rgba(63,92,132,0.72),rgba(40,61,95,0.92))] ring-1 ring-[#aeeBff]/16",
    icon: "text-[#d9f1ff]",
    button: "bg-[#5993b6] text-white hover:bg-[#70a3c2]",
  },
} as const;

export function MobileHomeActionCard({
  href,
  title,
  description,
  details,
  icon: Icon,
  tone = "sky",
  size = "default",
}: MobileHomeActionCardProps) {
  const toneStyle = toneStyles[tone];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="block w-full text-left"
          aria-label={`Abrir información de ${title}`}
        >
          <article
            className={`group relative mx-auto flex w-full items-center overflow-hidden rounded-[1.1rem] border px-3 text-white shadow-[0_12px_30px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] ${
              size === "large" ? "min-h-[104px] py-4" : "min-h-[86px] py-2.5"
            } ${toneStyle.card}`}
          >
            <div
              className={`pointer-events-none absolute inset-0 ${toneStyle.glow}`}
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

            <div className="relative flex w-full items-center justify-center gap-2">
              <div
                className={`flex shrink-0 items-center justify-center rounded-[0.95rem] ${
                  size === "large" ? "size-12" : "size-10"
                } ${toneStyle.iconWrap}`}
              >
                <Icon className={`${size === "large" ? "size-5" : "size-4"} ${toneStyle.icon}`} />
              </div>

              <div className="min-w-0 flex-1 text-center">
                <h3
                  className={`line-clamp-2 font-bold tracking-[0.01em] text-white ${
                    size === "large"
                      ? "text-[13px] leading-[1.1rem]"
                      : "text-[11px] leading-[1rem]"
                  }`}
                >
                  {title}
                </h3>

                {description && (
                  <p
                    className={`mt-1 font-black tracking-[0.04em] text-white/55 ${
                      size === "large"
                        ? "line-clamp-2 text-[11px] leading-4"
                        : "line-clamp-1 text-[10px] leading-3"
                    }`}
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          </article>
        </button>
      </DrawerTrigger>

      <DrawerContent className="border-t border-white/12 bg-[#1e2c46] text-white">
        <div className="mx-auto w-full max-w-sm px-1">
          <DrawerHeader className="text-left">
            <div
              className={`mb-3 flex size-12 items-center justify-center rounded-[1rem] ${toneStyle.iconWrap}`}
            >
              <Icon className={`size-6 ${toneStyle.icon}`} />
            </div>

            <DrawerTitle className="text-xl font-black uppercase tracking-[0.03em] text-white">
              {title}
            </DrawerTitle>

            <DrawerDescription className="pt-2 text-sm font-semibold leading-relaxed text-white/65">
              {details ?? description ?? "Accedé a esta sección del Prode Mundial 2026."}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <Button
              asChild
              className={`h-12 rounded-2xl font-black uppercase tracking-[0.04em] ${toneStyle.button}`}
            >
              <Link href={href}>
                Entrar
                <ArrowBigRight className="ml-2 size-4" />
              </Link>
            </Button>

            <DrawerClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-12 rounded-2xl font-black text-white/70 hover:bg-white/10 hover:text-white"
              >
                Cerrar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

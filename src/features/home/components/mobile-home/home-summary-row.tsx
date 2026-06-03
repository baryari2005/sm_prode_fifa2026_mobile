"use client";

import Image from "next/image";
import { ArrowBigRight, ArrowRight, CheckCircle2, Lightbulb, MonitorSmartphone } from "lucide-react";
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

type HomeSummaryRowProps = {
  fuente?: string;
  faseLabel?: string;
  faseValue?: string;
};

export function HomeSummaryRow({
  fuente,
  faseLabel,
  faseValue,
}: HomeSummaryRowProps) {
  const hasExtraInfo = Boolean(fuente || faseLabel || faseValue);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <section className="group relative -mx-1.5 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(25,48,78,0.9)_0%,rgba(23,39,63,0.94)_52%,rgba(18,31,50,0.98)_100%)] px-3.5 py-3.5 text-white shadow-[0_14px_32px_rgba(0,0,0,0.18)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(89,147,182,0.22),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(250,180,56,0.14),transparent_28%)]" />
        <div className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-[#fab438]/10 blur-2xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

        <div className="pointer-events-none absolute bottom-2 right-2 z-0 opacity-[0.08]">
          <Image
            src="/brand/orgullo.png"
            alt=""
            width={132}
            height={62}
            className="h-auto w-[132px] drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]"
            sizes="132px"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(89,147,182,0.28),rgba(34,59,92,0.78))] text-[#fab438] ring-1 ring-[#aeeBff]/20">
            <Lightbulb className="size-6" />
          </div>

          <div className="min-w-0 flex-1 pr-10">
            <div className="mb-1 inline-flex rounded-full border border-yellow-300/20 bg-yellow-300/10 px-2 py-0.5">
              <span className="text-[8.5px] font-black uppercase tracking-[0.18em] text-[#ffd77b]">
                Recomendado
              </span>
            </div>

            <h3 className="text-[13px] font-black uppercase leading-4 tracking-[0.04em] text-white">
              Viví la experiencia completa
            </h3>

            <p className="mt-1.5 text-[11px] font-semibold leading-4 text-white/68">
              Desde una PC o tablet.
            </p>

            {/* {hasExtraInfo && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {fuente && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold text-white/55">
                    {fuente}
                  </span>
                )}

                {faseLabel && faseValue && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold text-white/55">
                    {faseLabel}: {faseValue}
                  </span>
                )}
              </div>
            )} */}

            <Drawer>
              <DrawerTrigger asChild>
                <button
                  type="button"
                  className="mt-2 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#AEEBFF] transition-colors hover:text-white"
                >
                  Ver más detalles
                  <ArrowBigRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </DrawerTrigger>

              <DrawerContent className="border-t border-white/12 bg-[#1e2c46] text-white">
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader className="text-left">
                    <div className="mb-3 flex size-13 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(180deg,rgba(89,147,182,0.28),rgba(34,59,92,0.78))] text-[#fab438] ring-1 ring-[#aeeBff]/20">
                      <MonitorSmartphone className="size-6" />
                    </div>

                    <DrawerTitle className="text-xl font-black uppercase tracking-[0.03em] text-white">
                      Experiencia completa
                    </DrawerTitle>
                  
                    <DrawerDescription className="pt-2 text-sm font-semibold leading-relaxed text-white/65">
                      Ingresá con tu usuario a <br/>https://sm-prode-mundial-2026.vercel.app/ <br/>y vivi una experiencia unica.
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="space-y-2 px-4 pb-2">
                    <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#AEEBFF]" />
                      <p className="text-xs font-semibold leading-5 text-white/70">
                        En mobile podés cargar tus pronósticos de forma rápida y simple.
                      </p>
                    </div>

                    <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#AEEBFF]" />
                      <p className="text-xs font-semibold leading-5 text-white/70">
                        En PC o tablet vas a ver más información en pantalla sin perder claridad.
                      </p>
                    </div>

                    <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#AEEBFF]" />
                      <p className="text-xs font-semibold leading-5 text-white/70">
                        Ideal para revisar ranking, fixture completo, detalles de partidos y estadísticas.
                      </p>
                    </div>
                  </div>

                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button
                        type="button"
                        className="h-12 rounded-2xl bg-[#FAB438] font-black uppercase tracking-[0.04em] text-[#1E2C46] hover:bg-[#F7C45A]"
                      >
                        Entendido
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

        </div>
      </section>
    </div>
  );
}

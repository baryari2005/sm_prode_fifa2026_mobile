"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import localFont from "next/font/local";

const cheddar = localFont({
  src: "../../../../public/fonts/cheddar-gothic-sans.otf",
  display: "swap",
});

type MobileLoginShellProps = {
  children: ReactNode;
};

export function MobileLoginShell({ children }: MobileLoginShellProps) {
  return (
    <main className="login-page relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#1e2c46] px-4 py-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,44,70,0.82)_0%,rgba(30,44,70,0.92)_42%,rgba(30,44,70,0.98)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "url('/brand/pattern-cover.png')",
          backgroundSize: "600px auto",
          backgroundPosition: "center",
          backgroundRepeat: "repeat"
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#5993b6]/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-64 w-64 rounded-full bg-[#fab438]/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_65%)]" />

      <div className="relative mx-auto w-full max-w-[340px]">
        {/* <div className="mb-4 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#F7B731]/80 bg-[#132719]/90 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#F7B731] shadow-lg backdrop-blur-md">
            <span className="flex h-4 w-4 items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </span>
            Acceso privado
          </div>
        </div> */}

        <section className="relative flex h-[min(760px,calc(100svh-48px))] max-h-[calc(100svh-48px)] w-full flex-col overflow-hidden rounded-[2.35rem] border border-white/24 bg-white/12 px-5 pb-3 pt-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="pointer-events-none absolute right-[-34px] top-[-6px] z-[1] opacity-[0.1]">
            <div className="relative h-40 w-40">
              <Image
                src="/brand/sol.png"
                alt=""
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-5 left-4 z-[1] opacity-[0.1]">
            <Image
              src="/brand/massm.png"
              alt="Más San Miguel"
              width={160}
              height={80}
              className="w-32 h-auto"
            />
          </div>
          <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 opacity-62 [mask-image:radial-gradient(circle_at_center,black_34%,rgba(0,0,0,0.82)_56%,transparent_100%)]">
            <Image
              src="/prode-sm1.png"
              alt=""
              fill
              sizes="(max-width: 768px) 335px, 335px"
              priority
              aria-hidden="true"
              className="scale-92 object-cover object-center blur-[8px]"
            />
          </div>

          <div className="absolute inset-0 overflow-hidden rounded-[2.35rem]">
            <Image
              src="/prode-sm1.png"
              alt="Prode Mundial 2026"
              fill
              sizes="(max-width: 768px) 335px, 335px"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_24%,rgba(30,44,70,0.42)_62%,rgba(30,44,70,0.82)_100%)]" />
          </div>

          <div className="pointer-events-none absolute -inset-x-16 -inset-y-10 bg-[linear-gradient(to_right,rgba(30,44,70,0.28)_0%,rgba(30,44,70,0.14)_10%,rgba(30,44,70,0.05)_20%,rgba(30,44,70,0)_34%,rgba(30,44,70,0)_66%,rgba(30,44,70,0.05)_80%,rgba(30,44,70,0.14)_90%,rgba(30,44,70,0.28)_100%),linear-gradient(to_bottom,rgba(30,44,70,0.05)_0%,rgba(30,44,70,0.04)_24%,rgba(30,44,70,0.18)_58%,rgba(30,44,70,0.44)_100%)]" />

          <div className="relative z-10 flex flex-1 flex-col">
            <div className="mt-4 text-center">
              <h1 className={`${cheddar.className} text-[30px] leading-[0.95] tracking-[0.04em] text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.75)]`}>
                Ingresá a
                <span className="mt-1 block font-bold text-[36px] text-[#5993b6]">
                  Más <span className={`${cheddar.className} text-[30px] leading-[0.95] tracking-[0.04em] text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.75)]`}>San Miguel</span> 
                </span>
              </h1>

              <p className="mx-auto text-sm font-semibold leading-5 text-white/78 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]">
                Ingresá tus datos para acceder al prode.
              </p>
            </div>

            {children}
          </div>
        </section>

        {/* <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#F7B731]/80 bg-[#132719]/90 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#F7B731] shadow-lg backdrop-blur-md mt-4">
          <span className="flex h-4 w-4 items-center justify-center">
            <Stars className="h-4 w-4" />
          </span>
          Presentado por MÁS San Miguel
        </div>
        <p className="mt-4 text-center text-sm font-black tracking-[0.18em] text-white/72">
          PRODE MUNDIAL 2026
        </p>
 */}
      </div>
    </main>
  );
}

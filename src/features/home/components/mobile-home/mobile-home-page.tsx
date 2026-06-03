"use client";

import type { MobileHomePageProps } from "@/features/home/types/mobile-home.types";
import { MobileHomeMatchVariant } from "./mobile-home-match-variant";

const currentUserName = (user: MobileHomePageProps["user"]) =>
  user?.nombre ?? "Jugador";

const currentUserStatus = (user: MobileHomePageProps["user"]) =>
  user?.estado ?? "ACTIVO";

export function MobileHomePage({ user, onLogout }: MobileHomePageProps) {
  const userName = currentUserName(user);
  const userStatus = currentUserStatus(user);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#10213a] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(89,147,182,0.16),transparent_28%),radial-gradient(circle_at_88%_14%,rgba(250,180,56,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(89,147,182,0.1),transparent_30%),linear-gradient(180deg,#132543_0%,#1e2c46_48%,#16253a_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url('/brand/pattern-cover.png')",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "540px auto",
        }}
      />
      <div className="pointer-events-none absolute -left-20 top-10 h-44 w-44 rounded-full bg-[#5993b6]/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-28 h-56 w-56 rounded-full bg-[#fab438]/12 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-[430px] flex-col px-4 py-4 pb-8">
        <section className="relative rounded-[2.4rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] p-[1px] shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-sm">
          <div className="relative overflow-hidden rounded-[2.35rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(30,44,70,0.96)_0%,rgba(23,38,62,0.98)_48%,rgba(17,31,50,0.99)_100%)] p-3 ring-1 ring-white/[0.08]">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5993b6]/35 to-transparent" />

            <div className="relative z-10">
              <MobileHomeMatchVariant
                userName={userName}
                userStatus={userStatus}
                onLogout={onLogout}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

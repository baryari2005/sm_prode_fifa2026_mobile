"use client";

import type { ReactNode } from "react";
import { Suspense, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileHero } from "@/components/shared/mobile/mobile-hero";
import { LiveEventDebugPanel } from "@/features/live-events/components/live-event-debug-panel";
import { LiveEventOverlay } from "@/features/live-events/components/live-event-overlay";
import { useLiveEventOverlay } from "@/features/live-events/hooks/use-live-event-overlay";
import { useAuthStore } from "@/stores/auth.store";

type ProtectedMobilePageProps = {
  title: string;
  subtitle: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  heroFooter?: ReactNode;
  heroLogoSrc?: string;
  heroMascotSrc?: string | string[];
  heroMascotAlt?: string;
  homeStyleHero?: boolean;
  showBackLink?: boolean;
};

export function ProtectedMobilePage(props: ProtectedMobilePageProps) {
  return (
    <Suspense fallback={<ProtectedMobilePageLoadingState />}>
      <ProtectedMobilePageContent {...props} />
    </Suspense>
  );
}

function ProtectedMobilePageContent({
  title,
  subtitle,
  eyebrow = "Prode\nMundial 2026",
  children,
  heroFooter,
  heroLogoSrc = "/26.png",
  heroMascotSrc = [
    "/mascotas/condor.png",
    "/mascotas/yaguarete.png",
    "/mascotas/capi.png",
  ],
  heroMascotAlt = "Mascota del Mundial",
  showBackLink = true,
}: ProtectedMobilePageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentEvent, closeCurrentEvent } = useLiveEventOverlay();

  const { loading, initialized, isAuthenticated, fetchMe, clearSession } =
    useAuthStore();
  const showLiveEventDebug =
    process.env.NODE_ENV !== "production" &&
    searchParams.get("debugLiveEvents") === "1";

  useEffect(() => {
    function handleUnauthorized() {
      clearSession();
      router.replace("/login");
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [clearSession, router]);

  useEffect(() => {
    if (!initialized) {
      void fetchMe({ silent: true });
      return;
    }

    if (!isAuthenticated && !loading) {
      router.replace("/login");
    }
  }, [fetchMe, initialized, isAuthenticated, loading, router]);

  if (!initialized || loading) {
    return <ProtectedMobilePageLoadingState />;
  }

  return (
    <>
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

              <div className="relative z-10 flex flex-col gap-5">
                <MobileHero
                  eyebrow={eyebrow}
                  title={title}
                  subtitle={subtitle}
                  logoSrc={heroLogoSrc}
                  imageSrc={heroMascotSrc}
                  imageAlt={heroMascotAlt}
                  showBackButton={showBackLink && !heroFooter}
                  backHref="/inicio"
                  topRightAction=""
                >
                  {heroFooter}
                </MobileHero>

                {children}
              </div>
            </div>
          </section>
        </div>
      </main>

      <LiveEventOverlay
        open={Boolean(currentEvent)}
        event={currentEvent}
        onClose={closeCurrentEvent}
      />
      {showLiveEventDebug ? <LiveEventDebugPanel /> : null}
    </>
  );
}

function ProtectedMobilePageLoadingState() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#10213a] px-4 text-white">
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

      <div className="relative z-10 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white/80 shadow-sm backdrop-blur">
        <LoaderCircle className="size-4 animate-spin text-[#AEEBFF]" />
        Cargando pantalla...
      </div>
    </main>
  );
}

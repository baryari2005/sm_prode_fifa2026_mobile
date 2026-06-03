"use client";

import { Suspense, useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { MobileHomePage } from "@/features/home/components/mobile-home/mobile-home-page";
import { LiveEventDebugPanel } from "@/features/live-events/components/live-event-debug-panel";
import { LiveEventOverlay } from "@/features/live-events/components/live-event-overlay";
import { useLiveEventOverlay } from "@/features/live-events/hooks/use-live-event-overlay";
import { useAuthStore } from "@/stores/auth.store";

export default function InicioPage() {
  return (
    <Suspense fallback={<InicioLoadingState />}>
      <InicioPageContent />
    </Suspense>
  );
}

function InicioPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentEvent, closeCurrentEvent } = useLiveEventOverlay();
  const {
    user,
    loading,
    initialized,
    isAuthenticated,
    fetchMe,
    logout,
    clearSession,
  } = useAuthStore();

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

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (!initialized || loading) {
    return <InicioLoadingState />;
  }

  return (
    <>
      <MobileHomePage user={user} onLogout={handleLogout} />
      <LiveEventOverlay
        open={Boolean(currentEvent)}
        event={currentEvent}
        onClose={closeCurrentEvent}
      />
      {showLiveEventDebug ? <LiveEventDebugPanel /> : null}
    </>
  );
}

function InicioLoadingState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#04150F] px-4 text-white">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white/82 shadow-sm backdrop-blur">
        <RefreshCcw className="size-4 animate-spin text-[#B8EF6A]" />
        Validando sesión...
      </div>
    </main>
  );
}

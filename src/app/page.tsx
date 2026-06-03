"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

export default function Home() {
  const router = useRouter();
  const { fetchMe, initialized, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      void fetchMe({ silent: true });
      return;
    }

    router.replace(isAuthenticated ? "/inicio" : "/login");
  }, [fetchMe, initialized, isAuthenticated, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_30%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_50%,_#f6f9ff_100%)] px-4">
      <div className="flex items-center gap-3 rounded-full bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/80">
        <LoaderCircle className="size-4 animate-spin text-sky-600" />
        {loading ? "Validando sesión..." : "Redirigiendo..."}
      </div>
    </main>
  );
}

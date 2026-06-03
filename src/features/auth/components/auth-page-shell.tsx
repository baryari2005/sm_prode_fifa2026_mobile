import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  children: ReactNode;
  className?: string;
};

export function AuthPageShell({
  children,
  className,
}: AuthPageShellProps) {
  return (
    <main
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04150F] px-4 py-8 text-white",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,239,106,0.2),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(247,183,49,0.14),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(57,169,53,0.2),transparent_28%),linear-gradient(135deg,rgba(4,21,15,0.99),rgba(6,24,19,0.97)_38%,rgba(5,18,34,0.95)_68%,rgba(4,21,15,0.99))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/6 to-transparent" />
      <div className="pointer-events-none absolute -top-16 right-[-20px] h-48 w-48 rounded-full bg-[#39A935]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-8 left-[-20px] h-40 w-40 rounded-full bg-[#F7B731]/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-[1.1rem] border border-[#B8EF6A]/25 bg-[#B8EF6A]/10 text-[#D7FF87] shadow-lg shadow-black/25">
              <Trophy className="size-5" />
            </span>
            <div>
              <p className="text-sm font-black tracking-tight text-white">
                Prode Mundial 2026
              </p>
              <p className="text-xs font-medium text-white/55">
                Experiencia mobile oficial
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F7B731]/30 bg-[#F7B731]/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#F7B731]">
            <ShieldCheck className="size-3.5" />
            Acceso
          </span>
        </div> */}
        {children}
      </div>
    </main>
  );
}

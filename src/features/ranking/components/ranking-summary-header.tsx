import { Medal, Trophy } from "lucide-react";

type RankingSummaryHeaderProps = {
  userCount: number;
};

export function RankingSummaryHeader({
  userCount,
}: RankingSummaryHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-[#F7B731]/18 bg-[linear-gradient(135deg,rgba(83,67,18,0.26)_0%,rgba(22,48,32,0.92)_52%,rgba(5,40,32,0.98)_100%)] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,183,49,0.14),transparent_34%)]" />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.34em] text-yellow-300">
            Ranking general
          </p>
          <h3 className="mt-2 text-lg font-black text-white">
            Pelea por la punta
          </h3>
          <p className="mt-1 text-sm leading-6 text-white/58">
            {userCount > 0
              ? `${userCount} usuarios compiten por subir en la tabla.`
              : "Todavía no hay usuarios con puntos para mostrar."}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#F7B731]/20 bg-[#F7B731]/10 text-[#F7B731]">
          {userCount > 0 ? (
            <Trophy className="size-4" />
          ) : (
            <Medal className="size-4" />
          )}
        </div>
      </div>
    </section>
  );
}

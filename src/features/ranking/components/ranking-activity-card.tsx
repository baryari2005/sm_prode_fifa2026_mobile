import type { RankingHistorial } from "@/features/ranking/types/ranking.types";

type RankingActivityCardProps = {
  historial: RankingHistorial[];
  title?: string;
};

export function RankingActivityCard({
  historial,
  title = "Ranking general",
}: RankingActivityCardProps) {
  return (
    <section className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-3.5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#AEEBFF]">
        Historial
      </p>

      <h3 className="mt-3 text-sm font-semibold text-white/78">{title}</h3>

      {historial.length > 0 ? (
        <p className="mt-2 text-sm leading-6 text-white/60">
          Hay {historial.length} movimientos recientes cargados por la API para
          esta vista del ranking.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Todavía no hay movimientos recientes para esta vista.
          </p>
          <p className="mt-1 text-sm leading-6 text-white/42">
            Cuando se actualicen puntos, vas a ver la actividad acá.
          </p>
        </>
      )}
    </section>
  );
}

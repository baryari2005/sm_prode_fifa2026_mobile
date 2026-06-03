import type { RankingHistorial } from "@/features/ranking/types/ranking.types";

type RankingActivityCardProps = {
  historial: RankingHistorial[];
};

export function RankingActivityCard({ historial }: RankingActivityCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-emerald-400/10 bg-[#052820] p-4 shadow-[0_12px_34px_rgba(0,0,0,0.24)]">
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-emerald-300">
        Actividad
      </p>

      <h3 className="mt-2 text-lg font-black text-white">
        Historial reciente
      </h3>

      {historial.length > 0 ? (
        <p className="mt-2 text-sm leading-6 text-white/60">
          Hay {historial.length} movimientos recientes cargados por la API para
          futuras vistas de detalle.
        </p>
      ) : (
        <>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Todavía no hay movimientos recientes.
          </p>
          <p className="mt-1 text-sm leading-6 text-white/42">
            Cuando se actualicen puntos, vas a ver la actividad acá.
          </p>
        </>
      )}
    </section>
  );
}

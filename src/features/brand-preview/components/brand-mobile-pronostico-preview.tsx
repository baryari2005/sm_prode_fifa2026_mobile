import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileDarkCard } from "./brand-mobile-dark-card";
import { BrandMobileShell } from "./brand-mobile-shell";

export function BrandMobilePronosticoPreview() {
  return (
    <BrandMobileShell>
      <div className="space-y-3 bg-[#edf4fa] p-3">
        <BrandMobileDarkCard>
          <p className="text-xs uppercase tracking-[0.18em] text-[#9cc7dd]">Pronóstico rápido</p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">Argentina vs México</h3>
          <p className="mt-1 text-sm text-white/75">Cierra 30 minutos antes del partido.</p>
        </BrandMobileDarkCard>

        <BrandMobileCard>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="text-center">
              <p className="text-sm font-semibold text-[#1e2c46]">Argentina</p>
              <div className="mt-3 h-14 rounded-[1rem] border border-[#5993b6]/25 bg-[#f8fbff]" />
            </div>
            <span className="mt-6 text-sm font-semibold text-[#5993b6]">VS</span>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#1e2c46]">México</p>
              <div className="mt-3 h-14 rounded-[1rem] border border-[#5993b6]/25 bg-[#f8fbff]" />
            </div>
          </div>
          <button className="mt-4 h-12 w-full rounded-[1rem] bg-[#fab438] text-sm font-semibold text-[#1e2c46]">
            Guardar pronóstico
          </button>
        </BrandMobileCard>
      </div>
    </BrandMobileShell>
  );
}

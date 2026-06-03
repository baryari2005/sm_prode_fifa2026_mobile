import { rankingMock } from "@/features/brand-preview/constants/mobile-preview.mock";
import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileDarkCard } from "./brand-mobile-dark-card";
import { BrandMobileShell } from "./brand-mobile-shell";

export function BrandMobileRankingPreview() {
  return (
    <BrandMobileShell>
      <div className="space-y-3 bg-[#edf4fa] p-3">
        <BrandMobileDarkCard>
          <p className="text-xs uppercase tracking-[0.18em] text-[#9cc7dd]">Tu posición</p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <p className="text-3xl font-semibold">#8</p>
              <p className="text-sm text-white/72">22 puntos en la general</p>
            </div>
            <span className="rounded-full bg-[#fab438] px-3 py-1 text-xs font-semibold text-[#1e2c46]">
              Seguís subiendo
            </span>
          </div>
        </BrandMobileDarkCard>

        {rankingMock.map((row) => (
          <BrandMobileCard key={row.posicion}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f0f8] text-sm font-semibold text-[#1e2c46]">
                  #{row.posicion}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1e2c46]">{row.nombre}</p>
                  <p className="text-xs text-[#5b6c84]">
                    {row.current ? "Usuario actual" : "Participante"}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#fff3d8] px-3 py-1 text-xs font-semibold text-[#8a5a00]">
                {row.puntos} pts
              </span>
            </div>
          </BrandMobileCard>
        ))}
      </div>
    </BrandMobileShell>
  );
}

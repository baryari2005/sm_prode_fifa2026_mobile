import { quickActionsMock } from "@/features/brand-preview/constants/mobile-preview.mock";
import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileDarkCard } from "./brand-mobile-dark-card";
import { BrandMobileShell } from "./brand-mobile-shell";
import { BrandMobileHero } from "./brand-mobile-hero";

export function BrandMobileHomeUserPreview() {
  return (
    <BrandMobileShell>
      <div className="space-y-3 bg-[#edf4fa] p-3">
        <BrandMobileHero
          eyebrow="Prode Mundial 2026"
          title="Cada partido cuenta"
          subtitle="Cargá tus predicciones, sumá puntos y seguí tu posición."
        >
          <button className="h-11 rounded-[1rem] bg-[#fab438] px-4 text-sm font-semibold text-[#1e2c46]">
            Cargar predicción
          </button>
        </BrandMobileHero>

        <BrandMobileDarkCard>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#9cc7dd]">Mi resumen</p>
              <p className="mt-2 text-3xl font-semibold">22 pts</p>
              <p className="mt-1 text-sm text-white/72">Puesto #8 del ranking general</p>
            </div>
            <span className="rounded-full bg-[#fab438] px-3 py-1 text-xs font-semibold text-[#1e2c46]">
              +3 exactos
            </span>
          </div>
        </BrandMobileDarkCard>

        <div className="grid grid-cols-2 gap-3">
          {quickActionsMock.map((item) => (
            <BrandMobileCard key={item.title}>
              <item.icon className="h-5 w-5 text-[#5993b6]" />
              <p className="mt-3 text-sm font-semibold text-[#1e2c46]">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-[#5b6c84]">{item.description}</p>
            </BrandMobileCard>
          ))}
        </div>
      </div>
    </BrandMobileShell>
  );
}

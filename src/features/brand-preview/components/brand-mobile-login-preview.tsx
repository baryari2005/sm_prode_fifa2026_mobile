import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileShell } from "./brand-mobile-shell";
import { BrandMobileHero } from "./brand-mobile-hero";

export function BrandMobileLoginPreview() {
  return (
    <BrandMobileShell>
      <div className="bg-[#edf4fa] p-3">
        <BrandMobileHero
          eyebrow="Más San Miguel"
          title="Entrá a jugar"
          subtitle="Misma identidad que desktop, adaptada a una experiencia de una sola mano."
        />
        <div className="-mt-6 px-2 pb-3">
          <BrandMobileCard>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5993b6]">
              Iniciar sesión
            </p>
            <div className="mt-3 space-y-3">
              <div className="h-12 rounded-[1rem] border border-[#5993b6]/20 bg-[#f8fbff]" />
              <div className="h-12 rounded-[1rem] border border-[#5993b6]/20 bg-[#f8fbff]" />
              <button className="h-12 w-full rounded-[1rem] bg-[#fab438] text-sm font-semibold text-[#1e2c46]">
                Ingresar al Prode
              </button>
            </div>
          </BrandMobileCard>
        </div>
      </div>
    </BrandMobileShell>
  );
}

import { cheddar } from "@/lib/fonts";
import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileShell } from "./brand-mobile-shell";

export function BrandMobileRegisterPreview() {
  return (
    <BrandMobileShell>
      <div className="bg-[#edf4fa] p-3">
        <BrandMobileCard>
          <p
            className="text-[0.8rem] uppercase tracking-[0.28em] text-[#fab438]"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            Solicitar acceso
          </p>          
          <h3 className={`${cheddar.className} mt-2 text-lg font-semibold tracking-[-0.03em] text-[#1e2c46]`}>
            Tu barrio también juega
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#5b6c84]">
            Formulario cómodo, una columna y jerarquía simple para alta desde mobile.
          </p>
          <div className="mt-4 space-y-3">
            <div className="h-11 rounded-[1rem] border border-[#5993b6]/20 bg-[#f8fbff]" />
            <div className="h-11 rounded-[1rem] border border-[#5993b6]/20 bg-[#f8fbff]" />
            <div className="h-11 rounded-[1rem] border border-[#5993b6]/20 bg-[#f8fbff]" />
            <button className="h-12 w-full rounded-[1rem] bg-[#fab438] text-sm font-semibold text-[#1e2c46]">
              Crear cuenta
            </button>
          </div>
        </BrandMobileCard>
      </div>
    </BrandMobileShell>
  );
}

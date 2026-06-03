import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileDarkCard } from "./brand-mobile-dark-card";
import { BrandMobileShell } from "./brand-mobile-shell";

const adminActions = [
  "Aprobar usuarios",
  "Cargar resultados",
  "Gestionar fixture",
  "Ver pendientes",
];

export function BrandMobileHomeAdminPreview() {
  return (
    <BrandMobileShell>
      <div className="space-y-3 bg-[#edf4fa] p-3">
        <BrandMobileDarkCard>
          <p
            className="text-[0.8rem] uppercase tracking-[0.28em] text-[#fab438]"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            Panel admin
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
            Tenés el torneo bajo control
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/75">
            Acciones operativas primero, métricas después y cero ruido visual.
          </p>
        </BrandMobileDarkCard>

        <div className="grid grid-cols-2 gap-3">
          {adminActions.map((item) => (
            <BrandMobileCard key={item}>
              <p className="text-sm font-semibold text-[#1e2c46]">{item}</p>
              <p className="mt-2 text-xs text-[#5b6c84]">Acceso rápido administrativo.</p>
            </BrandMobileCard>
          ))}
        </div>
      </div>
    </BrandMobileShell>
  );
}

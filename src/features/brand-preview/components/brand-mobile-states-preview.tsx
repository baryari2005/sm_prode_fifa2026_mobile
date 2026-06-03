import { BrandMobileCard } from "./brand-mobile-card";

export function BrandMobileStatesPreview() {
  return (
    <div className="space-y-3">
      <BrandMobileCard>
        <p
          className="text-[0.8rem] uppercase tracking-[0.28em] text-[#5993b6]"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          Empty
        </p>
        <p className="mt-2 text-base font-semibold text-[#1e2c46]">
          Todavía no hay partidos para pronosticar.
        </p>
        <p className="mt-2 text-sm text-[#5b6c84]">
          El Mundial se está preparando. Volvé pronto.
        </p>
      </BrandMobileCard>

      <BrandMobileCard>
        <p
          className="text-[0.8rem] uppercase tracking-[0.28em] text-[#5993b6]"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          Loader
        </p>
        <div className="mt-3 space-y-2">
          <div className="h-4 w-3/4 rounded-full bg-[#dbe8f2]" />
          <div className="h-4 w-full rounded-full bg-[#dbe8f2]" />
          <div className="h-4 w-2/3 rounded-full bg-[#dbe8f2]" />
        </div>
      </BrandMobileCard>

      <BrandMobileCard>
        <p
          className="text-[0.8rem] uppercase tracking-[0.28em] text-[#fab438]"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          Error
        </p>
        <p className="mt-2 text-base font-semibold text-[#1e2c46]">Hubo un error en la cancha.</p>
        <button className="mt-4 h-11 rounded-[1rem] bg-[#1e2c46] px-4 text-sm font-semibold text-white">
          Volver al inicio
        </button>
      </BrandMobileCard>
    </div>
  );
}

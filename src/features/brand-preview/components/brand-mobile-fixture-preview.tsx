import { fixtureMock } from "@/features/brand-preview/constants/mobile-preview.mock";
import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileShell } from "./brand-mobile-shell";

const badgeTone: Record<string, string> = {
  Abierto: "bg-[#eaf6ff] text-[#1e5e86] border-[#9ed0ec]",
  "Cierra pronto": "bg-[#fff3d8] text-[#8a5a00] border-[#f2cb74]",
  Finalizado: "bg-[#edf7f0] text-[#276143] border-[#9cc9ad]",
};

export function BrandMobileFixturePreview() {
  return (
    <BrandMobileShell>
      <div className="space-y-3 bg-[#edf4fa] p-3">
        {fixtureMock.map((match) => (
          <BrandMobileCard key={match.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#5993b6]">{match.fase}</p>
                <p className="mt-2 text-base font-semibold text-[#1e2c46]">
                  {match.local} vs {match.visitante}
                </p>
                <p className="mt-1 text-sm text-[#5b6c84]">{match.hora}</p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-[0.72rem] font-semibold ${
                  badgeTone[match.estado]
                }`}
              >
                {match.estado}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-[#5b6c84]">{match.cierre}</p>
              <button className="h-10 rounded-full bg-[#fab438] px-4 text-xs font-semibold text-[#1e2c46]">
                Pronosticar
              </button>
            </div>
          </BrandMobileCard>
        ))}
      </div>
    </BrandMobileShell>
  );
}

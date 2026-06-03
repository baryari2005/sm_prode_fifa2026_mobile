import { BrandMobileCard } from "./brand-mobile-card";
import { BrandMobileShell } from "./brand-mobile-shell";

export function BrandMobileProfilePreview() {
  return (
    <BrandMobileShell>
      <div className="space-y-3 bg-[#edf4fa] p-3">
        <BrandMobileCard>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1e2c46] text-white">
              AG
            </div>
            <div>
              <p className="text-base font-semibold text-[#1e2c46]">Ana Gómez</p>
              <p className="text-sm text-[#5b6c84]">ana@email.com</p>
            </div>
          </div>
        </BrandMobileCard>
        <BrandMobileCard>
          <p className="text-sm font-semibold text-[#1e2c46]">Datos personales</p>
          <p className="mt-2 text-sm text-[#5b6c84]">Cuenta, contraseña y cierre de sesión.</p>
        </BrandMobileCard>
      </div>
    </BrandMobileShell>
  );
}

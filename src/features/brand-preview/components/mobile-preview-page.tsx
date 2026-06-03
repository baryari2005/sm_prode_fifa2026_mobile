import { BrandMobileBottomNav } from "./brand-mobile-bottom-nav";
import { BrandMobileButtonsPreview } from "./brand-mobile-buttons-preview";
import { BrandMobileCreateUserPreview } from "./brand-mobile-create-user-preview";
import { BrandMobileFixturePreview } from "./brand-mobile-fixture-preview";
import { BrandMobileHomeAdminPreview } from "./brand-mobile-home-admin-preview";
import { BrandMobileHomeUserPreview } from "./brand-mobile-home-user-preview";
import { BrandMobileLoginPreview } from "./brand-mobile-login-preview";
import { BrandMobilePronosticoPreview } from "./brand-mobile-pronostico-preview";
import { BrandMobileProfilePreview } from "./brand-mobile-profile-preview";
import { BrandMobileRankingPreview } from "./brand-mobile-ranking-preview";
import { BrandMobileRegisterPreview } from "./brand-mobile-register-preview";
import { BrandMobileStatesPreview } from "./brand-mobile-states-preview";
import { BrandMobileBadgesPreview } from "./brand-mobile-badges-preview";
import { MobilePreviewSection } from "./mobile-preview-section";

export function MobilePreviewPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#d9e7f1_0%,#eef4f9_38%,#f7fbff_100%)] px-4 py-6 text-[#24344f]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[#5993b6]/20 bg-[#1e2c46] px-5 py-5 text-white shadow-[0_20px_60px_rgba(30,44,70,0.28)]">
          <p
            className="text-[0.95rem] uppercase tracking-[0.32em] text-[#fab438]"
            style={{ fontFamily: "var(--font-brand)" }}
          >
            Más Mundial
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
            Preview mobile/PWA aislada
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-white/78">
            Esta ruta solo muestra mocks visuales para validar consistencia con desktop:
            paleta, pattern, jerarquía de cards, botones, badges y navegación mobile.
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-2">
          <MobilePreviewSection title="Sistema base" description="Tokens, botones y badges que deberían repetirse en todas las pantallas.">
            <div className="space-y-4">
              <BrandMobileButtonsPreview />
              <BrandMobileBadgesPreview />
            </div>
          </MobilePreviewSection>

          <MobilePreviewSection title="Login y acceso" description="Referencia para login y solicitar acceso con pattern de marca y jerarquía institucional.">
            <div className="space-y-4">
              <BrandMobileLoginPreview />
              <BrandMobileRegisterPreview />
              <BrandMobileCreateUserPreview />
            </div>
          </MobilePreviewSection>

          <MobilePreviewSection title="Home jugador" description="Hero corto, próximo cierre, resumen y accesos rápidos.">
            <BrandMobileHomeUserPreview />
          </MobilePreviewSection>

          <MobilePreviewSection title="Home admin" description="Panel compacto con foco operativo y métricas rápidas.">
            <BrandMobileHomeAdminPreview />
          </MobilePreviewSection>

          <MobilePreviewSection title="Fixture" description="Cards apiladas, badges claros y cierre visible.">
            <BrandMobileFixturePreview />
          </MobilePreviewSection>

          <MobilePreviewSection title="Pronóstico" description="Carga rápida con inputs grandes y CTA fijo visual.">
            <BrandMobilePronosticoPreview />
          </MobilePreviewSection>

          <MobilePreviewSection title="Ranking" description="Top 3 destacado, tu posición y lista compacta.">
            <BrandMobileRankingPreview />
          </MobilePreviewSection>

          <MobilePreviewSection title="Perfil y estados" description="Perfil simple, empty, loader y error con el mismo lenguaje visual.">
            <div className="space-y-4">
              <BrandMobileProfilePreview />
              <BrandMobileStatesPreview />
            </div>
          </MobilePreviewSection>
        </div>

        <MobilePreviewSection title="Bottom nav" description="Navegación mobile fija inspirada en desktop, adaptada a una sola mano.">
          <BrandMobileBottomNav />
        </MobilePreviewSection>
      </div>
    </main>
  );
}

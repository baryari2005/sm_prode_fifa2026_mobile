import type { AuthUser } from "@/features/auth/types/auth.types";
import type { FixturePartido } from "@/features/fixture/types/fixture.types";

export type HomeVariant = "jugador" | "partido" | "ranking";

export type MobileHomePageProps = {
  user: AuthUser | null;
  onLogout: () => void | Promise<void>;
};

export type FeaturedMatchState = {
  match: FixturePartido;
  liveMatches: FixturePartido[];
  isLoading: boolean;
  isFallback: boolean;
  referenceTime: number;
  refreshInSeconds: number;
};

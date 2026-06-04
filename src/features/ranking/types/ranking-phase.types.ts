export type RankingPhase = {
  id: number;
  nombre: string;
};

export type RankingScopeValue = "grupos" | "eliminatorias";

export type RankingPhaseOption = {
  value: RankingScopeValue;
  label: string;
  isActive?: boolean;
};

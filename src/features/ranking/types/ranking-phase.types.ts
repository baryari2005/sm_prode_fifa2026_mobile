export type RankingPhase = {
  id: number;
  nombre: string;
};

export type RankingScopeValue = "grupos" | "dieciseisavos" | "eliminatorias";

export type RankingPhaseOption = {
  value: RankingScopeValue;
  label: string;
  isActive?: boolean;
};

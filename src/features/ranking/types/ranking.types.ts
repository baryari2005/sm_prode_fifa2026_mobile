export type RankingRow = {
  posicion: number | null;
  usuarioId: string;
  nombre: string;
  avatarUrl: string | null;
  puntosTotales: number;
  aciertosExactos: number;
  aciertosTendencia: number;
  partidosPronosticados: number;
  partidosCalificados: number;
  updatedAt: string | null;
};

export type RankingHistorial = {
  id: string;
  partidoId: string;
  golesLocal: number;
  golesVisitante: number;
  puntosOtorgados: number;
  aciertoTipo: string | null;
  calculadoAt: string | null;
};

export type RankingResponse = {
  data?: {
    miRanking?: RankingRow | null;
    ranking?: RankingRow[];
    historial?: RankingHistorial[];
  };
  message?: string;
};

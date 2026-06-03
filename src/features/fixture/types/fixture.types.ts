export type FixtureFase = {
  id: number;
  nombre: string;
  grupo?: string | null;
  grupoNombre?: string | null;
  grupoCodigo?: string | null;
};

export type FixtureSeleccion = {
  id: string;
  nombre: string;
  codigo?: string | null;
  bandera?: string | null;
  flag?: string | null;
  banderaUrl?: string | null;
  flagUrl?: string | null;
};

export type FixtureResultado = {
  golesLocal: number;
  golesVisitante: number;
  estado?: string | null;
  tiempoJuego?: number | null;
};

export type FixturePartido = {
  id: string;
  fecha: string;
  estadio?: string | null;
  ciudad?: string | null;
  activo?: boolean;
  fase?: FixtureFase | null;
  seleccionLocal?: FixtureSeleccion | null;
  seleccionVisitante?: FixtureSeleccion | null;
  resultado?: FixtureResultado | null;
};

export type FixtureResponse =
  | FixturePartido[]
  | {
      data?: FixturePartido[];
      partidos?: FixturePartido[];
    };

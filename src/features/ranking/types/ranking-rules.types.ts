export type ReglaPuntaje = {
  id?: string | number | null;
  faseId: number | null;
  faseNombre: string | null;
  puntosExacto: number | null;
  puntosTendencia: number | null;
  puntosIncorrecto: number | null;
};

export type ReglasPuntajesResponse =
  | ReglaPuntaje[]
  | {
      data?: unknown;
      reglas?: unknown;
      items?: unknown;
    };

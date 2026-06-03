import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CircleAlert,
  Medal,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";

export const brandTokens = {
  navy: "#1e2c46",
  blue: "#5993b6",
  gold: "#fab438",
  white: "#ffffff",
  ink: "#24344f",
  surface: "#f8fbff",
};

export const fixtureMock = [
  {
    id: "1",
    fase: "Fecha 1",
    local: "Argentina",
    visitante: "México",
    hora: "Vie 14 Jun · 21:00",
    estado: "Abierto",
    cierre: "Cierra en 2h 18m",
    score: null,
  },
  {
    id: "2",
    fase: "Fecha 1",
    local: "Estados Unidos",
    visitante: "Canadá",
    hora: "Sáb 15 Jun · 19:30",
    estado: "Cierra pronto",
    cierre: "Cierra en 18m",
    score: null,
  },
  {
    id: "3",
    fase: "Fecha 1",
    local: "Brasil",
    visitante: "España",
    hora: "Dom 16 Jun · 22:00",
    estado: "Finalizado",
    cierre: "Resultado confirmado",
    score: "2 - 1",
  },
];

export const rankingMock = [
  { posicion: 1, nombre: "Carla Gómez", puntos: 38 },
  { posicion: 2, nombre: "Nico Díaz", puntos: 35 },
  { posicion: 3, nombre: "Lu Pérez", puntos: 34 },
  { posicion: 8, nombre: "Vos", puntos: 22, current: true },
];

export const quickActionsMock: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Cargar predicción",
    description: "Elegí resultados antes del cierre.",
    icon: Target,
  },
  {
    title: "Mis predicciones",
    description: "Revisá tus jugadas y ediciones abiertas.",
    icon: CalendarDays,
  },
  {
    title: "Ranking",
    description: "Seguí tu posición y el top 3.",
    icon: Medal,
  },
  {
    title: "Perfil",
    description: "Datos de cuenta y sesión.",
    icon: UserRound,
  },
];

export const bottomNavMock = [
  { label: "Inicio", icon: Trophy, active: true },
  { label: "Fixture", icon: CalendarDays },
  { label: "Pronósticos", icon: Target },
  { label: "Ranking", icon: Medal },
  { label: "Perfil", icon: CircleAlert },
];

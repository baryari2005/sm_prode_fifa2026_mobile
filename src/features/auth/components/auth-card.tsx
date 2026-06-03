import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProdeIcon } from "@/components/ui/iconos";

type AuthCardProps = {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
};

export function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[linear-gradient(180deg,rgba(9,28,22,0.68),rgba(7,24,19,0.58))] text-white shadow-[0_32px_100px_rgba(0,0,0,0.48)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#39A935]/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-56 w-56 rounded-full bg-[#F7B731]/10 blur-3xl" />

      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-[1.35rem] border border-[#B8EF6A]/25 bg-[#B8EF6A]/10 text-[#D7FF87] shadow-lg shadow-black/25">
          <ProdeIcon className="h-12 w-12 brightness-0 invert" source="/trofeo.ico" />
        </div>

        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#F7B731]/30 bg-[#F7B731]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#F7B731]">
          <ShieldCheck className="size-3.5" />
          Acceso privado
        </div>

        <CardTitle className="text-[1.95rem] font-black tracking-tight text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]">
          {title}
        </CardTitle>
        <CardDescription className="mx-auto max-w-[310px] text-sm font-medium leading-6 text-white/64">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
      {footer ? <div className="px-6 pb-6 text-white/70">{footer}</div> : null}
    </Card>
  );
}

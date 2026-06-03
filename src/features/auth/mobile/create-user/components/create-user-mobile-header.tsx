import Image from "next/image";
import { Info, TriangleAlert } from "lucide-react";
import { createUserCheddar } from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";

export function CreateUserMobileHeader() {
  return (
    <header className="pb-4">
      <Image
        src="/brand/massm.png"
        alt="Logo de Más San Miguel"
        width={100}
        height={32}
        className="h-auto w-[100px]"
      />
      <h1
        className={`${createUserCheddar.className} mt-2 text-[1.95rem] leading-[0.92] text-white`}
      >
        solicitá tu acceso
      </h1>
      <p className="mt-2 max-w-[24rem] text-xs text-white/70">        
        Completá tus datos y comenza a jugar.
      </p>
      <p className="mt-3 flex items-start gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-3 text-xs leading-5 text-red-100">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-red-300" />
        <span>
          Para participar del Prode Mundial 2026, tendrás que residir en San
          Miguel.
        </span>
      </p>
    </header>
  );
}

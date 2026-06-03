import type { ReactNode } from "react";
import Image from "next/image";
import {
  MOBILE_CARD_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";

type CreateUserMobileCardProps = {
  children: ReactNode;
};

export function CreateUserMobileCard({ children }: CreateUserMobileCardProps) {
  return (
    <section className={MOBILE_CARD_CLASS}>
      <div className="pointer-events-none absolute right-[-28px] top-[-8px]">
        <div className="relative h-32 w-32">
          <div className="absolute -inset-3 rounded-full bg-[#F7C45A]/28 blur-[56px]" />
          <div className="absolute inset-[18%] rounded-full bg-[#FAB438]/22 blur-3xl" />
          <Image
            src="/brand/sol.png"
            alt=""
            fill
            className="object-contain opacity-[0.1]"
            sizes="128px"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-3 opacity-[0.08]">
        <Image
          src="/brand/mas.png"
          alt=""
          width={120}
          height={56}
          className="h-auto w-[120px]"
        />
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  );
}

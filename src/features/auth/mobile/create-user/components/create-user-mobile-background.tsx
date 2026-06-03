import Image from "next/image";
import type { ReactNode } from "react";

type CreateUserMobileBackgroundProps = {
  children: ReactNode;
};

export function CreateUserMobileBackground({
  children,
}: CreateUserMobileBackgroundProps) {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#1e2c46] px-4 py-4 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,44,70,0.82)_0%,rgba(30,44,70,0.92)_42%,rgba(30,44,70,0.98)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "url('/brand/pattern-cover.png')",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "600px auto",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#5993b6]/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-64 w-64 rounded-full bg-[#fab438]/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1 left-3 opacity-[0.20]">
        <div className="relative h-[120px] w-[320px]">
          <div className="absolute -left-4 right-2 bottom-[-10px] top-0 rounded-full bg-[#F7C45A]/20 blur-[60px]" />
          <div className="absolute left-2 right-10 bottom-1 top-7 rounded-full bg-[#FAB438]/12 blur-3xl" />
          <Image
            src="/brand/mas.png"
            alt=""
            fill
            className="object-contain object-left-bottom"
            sizes="300px"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[390px]">{children}</div>
    </main>
  );
}

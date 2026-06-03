import type { ReactNode } from "react";
import { brandTokens } from "@/features/brand-preview/constants/mobile-preview.mock";

type BrandMobileShellProps = {
  children: ReactNode;
};

export function BrandMobileShell({ children }: BrandMobileShellProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-[390px] overflow-hidden rounded-[2.25rem] border shadow-[0_28px_60px_rgba(30,44,70,0.22)]"
      style={{
        background: brandTokens.surface,
        borderColor: "rgba(89,147,182,0.24)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "url('/brand/pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 flex min-h-[760px] flex-col">{children}</div>
    </div>
  );
}

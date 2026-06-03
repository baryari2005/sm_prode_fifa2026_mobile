import type { ReactNode } from "react";

type BrandMobileCardProps = {
  children: ReactNode;
};

export function BrandMobileCard({ children }: BrandMobileCardProps) {
  return (
    <div className="rounded-[1.6rem] border border-[#5993b6]/18 bg-white p-4 shadow-[0_12px_30px_rgba(30,44,70,0.08)]">
      {children}
    </div>
  );
}

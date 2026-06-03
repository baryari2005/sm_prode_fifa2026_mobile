import type { ReactNode } from "react";

type BrandMobileDarkCardProps = {
  children: ReactNode;
};

export function BrandMobileDarkCard({ children }: BrandMobileDarkCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#1e2c46] p-4 text-white shadow-[0_18px_40px_rgba(30,44,70,0.22)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: "url('/brand/pattern.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,180,56,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(89,147,182,0.2),transparent_28%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

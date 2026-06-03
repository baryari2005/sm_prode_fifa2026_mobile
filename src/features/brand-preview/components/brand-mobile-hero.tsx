import type { ReactNode } from "react";

type BrandMobileHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function BrandMobileHero({
  eyebrow,
  title,
  subtitle,
  children,
}: BrandMobileHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[1.9rem] bg-[#1e2c46] px-4 pb-4 pt-4 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: "url('/brand/pattern-cover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,180,56,0.24),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(89,147,182,0.22),transparent_30%)]" />
      <div className="relative z-10">
        <p
          className="text-[0.85rem] uppercase tracking-[0.32em] text-[#fab438]"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          {eyebrow}
        </p>
        <h3 className="mt-2 text-[1.7rem] font-semibold leading-none tracking-[-0.05em]">
          {title}
        </h3>
        <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/82">{subtitle}</p>
        {children ? <div className="mt-4">{children}</div> : null}
      </div>
    </section>
  );
}

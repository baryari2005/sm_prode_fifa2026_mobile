import type { ReactNode } from "react";

type MobilePreviewSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function MobilePreviewSection({
  title,
  description,
  children,
}: MobilePreviewSectionProps) {
  return (
    <section className="rounded-[2rem] border border-[#5993b6]/16 bg-white/82 p-4 shadow-[0_16px_40px_rgba(89,147,182,0.12)] backdrop-blur">
      <p
        className="text-[0.82rem] uppercase tracking-[0.28em] text-[#5993b6]"
        style={{ fontFamily: "var(--font-brand)" }}
      >
        Mobile mock
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#1e2c46]">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-[#50627c]">{description}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

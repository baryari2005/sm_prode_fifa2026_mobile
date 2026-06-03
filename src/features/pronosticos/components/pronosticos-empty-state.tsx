import { ClipboardPenLine } from "lucide-react";

type PronosticosEmptyStateProps = {
  title: string;
  description: string;
};

export function PronosticosEmptyState({
  title,
  description,
}: PronosticosEmptyStateProps) {
  return (
    <section className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(135deg,rgba(25,48,78,0.92)_0%,rgba(23,39,63,0.96)_52%,rgba(18,31,50,0.98)_100%)] p-6 text-center shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5993b6]/14 text-[#AEEBFF] ring-1 ring-[#5993b6]/20">
        <ClipboardPenLine className="h-6 w-6" />
      </div>

      <h2 className="mt-4 text-lg font-black text-white">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
    </section>
  );
}

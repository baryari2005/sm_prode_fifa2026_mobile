import { Skeleton } from "@/components/ui/skeleton";

export function PronosticosLoadingState() {
  return (
    <section className="space-y-3">
      <div className="h-[74px] rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-3">
        <Skeleton className="h-full rounded-[1rem] bg-white/[0.06]" />
      </div>

      <div className="space-y-2.5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[116px] rounded-[1.35rem] bg-white/[0.06]"
          />
        ))}
      </div>
    </section>
  );
}

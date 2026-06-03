import { Skeleton } from "@/components/ui/skeleton";

export function RankingLoadingState() {
  return (
    <section className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 rounded-[1.5rem] bg-white/[0.06]"
          />
        ))}
      </div>

      <Skeleton className="h-10 rounded-full bg-white/[0.06]" />
      <Skeleton className="h-36 rounded-[1.5rem] bg-white/[0.06]" />

      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-24 rounded-[1.5rem] bg-white/[0.06]"
        />
      ))}
    </section>
  );
}

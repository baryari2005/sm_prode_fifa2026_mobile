import { Skeleton } from "@/components/ui/skeleton";

export function FixtureLoadingState() {
  return (
    <section className="space-y-3">
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[84px] rounded-[1.15rem] bg-white/[0.06]"
          />
        ))}
      </div>

      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[106px] rounded-[1.35rem] bg-white/[0.06]"
          />
        ))}
      </div>
    </section>
  );
}

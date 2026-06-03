import { cn } from "@/lib/utils";

type LiveEventBackdropProps = {
  glowClassName: string;
};

export function LiveEventBackdrop({ glowClassName }: LiveEventBackdropProps) {
  return (
    <>
      <div className="absolute inset-0 bg-slate-950/78 backdrop-blur-md" />
      <div className={cn("absolute inset-0", glowClassName)} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.06)_0%,rgba(2,6,23,0.52)_100%)]" />
    </>
  );
}

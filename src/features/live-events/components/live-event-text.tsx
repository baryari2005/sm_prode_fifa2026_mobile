import { cn } from "@/lib/utils";

type LiveEventTextProps = {
  title: string;
  lines: string[];
  accentClassName: string;
};

export function LiveEventText({
  title,
  lines,
  accentClassName,
}: LiveEventTextProps) {
  const [primaryLine, secondaryLine, tertiaryLine] = lines;

  return (
    <div className="space-y-3 text-center">
      <h2
        className={cn(
          "text-[clamp(2.3rem,12vw,4.8rem)] font-black uppercase leading-none tracking-[-0.08em] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.42)]",
          accentClassName
        )}
      >
        {title}
      </h2>

      {primaryLine ? (
        <p className="text-[clamp(1.1rem,5.5vw,1.8rem)] font-black leading-tight text-white">
          {primaryLine}
        </p>
      ) : null}

      {secondaryLine ? (
        <p className="text-[clamp(0.95rem,4.3vw,1.15rem)] font-semibold text-white/80">
          {secondaryLine}
        </p>
      ) : null}

      {tertiaryLine ? (
        <p className="text-[clamp(0.9rem,4vw,1.05rem)] font-semibold text-white/64">
          {tertiaryLine}
        </p>
      ) : null}
    </div>
  );
}

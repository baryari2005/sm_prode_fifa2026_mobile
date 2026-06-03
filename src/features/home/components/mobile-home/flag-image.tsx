"use client";

import { useState } from "react";

type FlagImageProps = {
  src: string | null;
  alt: string;
  fallback: string;
  title?: string;
  className?: string;
  fallbackClassName?: string;
};

export function FlagImage({
  src,
  alt,
  fallback,
  title,
  className = "h-7 w-auto max-w-[46px] object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.28)]",
  fallbackClassName = "flex h-8 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-xs font-black text-white/72",
}: FlagImageProps) {
  const [failed, setFailed] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const imageNode =
    !src || failed ? (
      <span className={fallbackClassName}>{fallback}</span>
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={className}
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.9) 90%, transparent 96%)",
          maskImage:
            "radial-gradient(ellipse at center, black 58%, rgba(0,0,0,0.9) 90%, transparent 96%)",
        }}
      />
    );

  if (!title) {
    return imageNode;
  }

  return (
    <span
      className="relative inline-flex items-center justify-center outline-none"
      tabIndex={0}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onFocus={() => setIsTooltipVisible(true)}
      onBlur={() => setIsTooltipVisible(false)}
      onPointerDown={() => setIsTooltipVisible((current) => !current)}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsTooltipVisible((current) => !current);
      }}
    >
      {imageNode}
      <span
        className={`pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#10213a]/96 px-2 py-1 text-[10px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition duration-150 ${
          isTooltipVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {title}
      </span>
    </span>
  );
}

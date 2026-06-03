"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type LiveEventMascotProps = {
  src: string;
  alt: string;
};

export function LiveEventMascot({ src, alt }: LiveEventMascotProps) {
  const [cacheToken] = useState(() => Date.now());
  const resolvedSrc = useMemo(() => {
    if (
      process.env.NODE_ENV === "development" &&
      src.startsWith("/festejos/")
    ) {
      return `${src}?v=${cacheToken}`;
    }

    return src;
  }, [cacheToken, src]);

  return (
    <div className="relative mx-auto h-[210px] w-[210px] sm:h-[250px] sm:w-[250px]">
      <div className="absolute inset-0 rounded-full bg-white/8 blur-3xl" />
      <Image
        src={resolvedSrc}
        alt={alt}
        width={420}
        height={420}
        priority
        unoptimized={process.env.NODE_ENV === "development"}
        className="relative z-10 h-full w-full object-contain drop-shadow-[0_18px_60px_rgba(0,0,0,0.42)]"
        sizes="(max-width: 430px) 210px, 250px"
      />
    </div>
  );
}

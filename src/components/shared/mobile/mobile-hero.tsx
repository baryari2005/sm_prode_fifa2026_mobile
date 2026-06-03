"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowBigLeft, ArrowLeft, Stars, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobileHeroProps = {
  eyebrow?: string;
  title: string;
  username?: string;
  subtitle: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  imageSrc?: string | string[];
  imageAlt?: string;
  topRightAction?: ReactNode;
  children?: ReactNode;
  showBackButton?: boolean;
  backHref?: string;
  onBack?: () => void;
  className?: string;
};

const DEFAULT_HERO_MASCOTS = [
  "/mascotas/condor.png",
  "/mascotas/yaguarete.png",
  "/mascotas/capi.png",
];

export function MobileHero({
  eyebrow,
  title,
  username,
  subtitle,
  logoSrc,
  logoAlt = "Prode Mundial 2026",
  imageSrc = DEFAULT_HERO_MASCOTS,
  imageAlt = "",
  topRightAction,
  children,
  showBackButton = false,
  backHref = "/inicio",
  onBack,
  className,
}: MobileHeroProps) {
  const pathname = usePathname();
  const imageOptions = useMemo(
    () => (Array.isArray(imageSrc) ? imageSrc : [imageSrc]),
    [imageSrc]
  );
  const [activeImageSrc, setActiveImageSrc] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(false);
  const imageOptionsKey = useMemo(() => imageOptions.join("|"), [imageOptions]);
  const fallbackImageSrc = useMemo(
    () => imageOptions.find((option) => option !== activeImageSrc) ?? imageOptions[0] ?? "",
    [activeImageSrc, imageOptions]
  );

  useEffect(() => {
    if (imageOptions.length === 0) {
      const frame = window.requestAnimationFrame(() => {
        setActiveImageSrc("");
        setIsImageVisible(false);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const frame = window.requestAnimationFrame(() => {
      setIsImageVisible(false);

      const storageKey = `mobile-hero-mascot:${pathname}:${imageOptionsKey}`;
      const storedImage = window.localStorage.getItem(storageKey);
      const validStoredImage = storedImage && imageOptions.includes(storedImage);
      const navigationEntry = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming | undefined;
      const isManualReload = navigationEntry?.type === "reload";

      const nextImage =
        validStoredImage && !isManualReload
          ? storedImage
          : imageOptions[Math.floor(Math.random() * imageOptions.length)] ??
            imageOptions[0] ??
            "";

      setActiveImageSrc(nextImage);

      if (nextImage) {
        window.localStorage.setItem(storageKey, nextImage);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [imageOptions, imageOptionsKey, pathname]);

  return (
    <section
      className={cn(
        "relative min-h-[244px] overflow-hidden rounded-[1.9rem] bg-[linear-gradient(145deg,rgba(30,44,70,0.88)_0%,rgba(24,39,63,0.82)_54%,rgba(18,34,55,0.72)_100%)] px-4 pb-4 pt-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.38)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(89,147,182,0.16),transparent_34%),radial-gradient(circle_at_92%_14%,rgba(250,180,56,0.14),transparent_20%),radial-gradient(circle_at_82%_74%,rgba(89,147,182,0.16),transparent_34%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url('/brand/pattern.png')",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          backgroundSize: "360px auto",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(16,33,58,1)_0%,rgba(16,33,58,0.98)_42%,rgba(16,33,58,0.82)_58%,rgba(16,33,58,0.34)_74%,rgba(16,33,58,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[58%] bg-[radial-gradient(circle_at_left_center,rgba(16,33,58,0.34),rgba(16,33,58,0)_72%)]" />
      <div className="pointer-events-none absolute right-[-34px] top-[-18px] z-0 opacity-[0.12]">
        <Image
          src="/brand/sol.png"
          alt=""
          width={170}
          height={170}
          className="h-auto w-[178px]"
          sizes="170px"
          aria-hidden="true"
        />
      </div>

      {activeImageSrc ? (
        <div className="pointer-events-none absolute right-[-46px] top-[10px] z-[1] h-[218px] w-[218px]">
          <Image
            src={activeImageSrc}
            alt=""
            width={420}
            height={420}
            priority
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-contain blur-[12px] transition-opacity duration-500 ease-out",
              isImageVisible ? "opacity-22" : "opacity-0"
            )}
            onLoadingComplete={() => setIsImageVisible(true)}
            onError={() => {
              if (fallbackImageSrc && fallbackImageSrc !== activeImageSrc) {
                setActiveImageSrc(fallbackImageSrc);
              }
            }}
            sizes="255px"
          />

          <Image
            src={activeImageSrc}
            alt={imageAlt}
            width={420}
            height={420}
            priority
            aria-hidden={imageAlt ? undefined : "true"}
            className={cn(
              "absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out",
              isImageVisible ? "opacity-58" : "opacity-0"
            )}
            onLoadingComplete={() => setIsImageVisible(true)}
            onError={() => {
              if (fallbackImageSrc && fallbackImageSrc !== activeImageSrc) {
                setActiveImageSrc(fallbackImageSrc);
              }
            }}
            sizes="255px"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 22%, rgba(0,0,0,0.48) 34%, rgba(0,0,0,0.82) 46%, black 60%, black 100%), linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.88) 70%, rgba(0,0,0,0.45) 84%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 22%, rgba(0,0,0,0.48) 34%, rgba(0,0,0,0.82) 46%, black 60%, black 100%), linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.88) 70%, rgba(0,0,0,0.45) 84%, transparent 100%)",
            }}
          />
        </div>
      ) : null}

      <div className="relative z-10 flex min-h-[212px] flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="max-w-[270px]">
            <div className="flex items-center gap-3">
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={92}
                  height={32}
                  className="h-auto w-[92px] shrink-0"
                  sizes="92px"
                  priority
                />
              ) : null}

              <div className="min-w-0">
                <p className="whitespace-pre-line text-[10px] font-black uppercase leading-4 tracking-[0.24em] text-[#AEEBFF]">
                  {eyebrow}
                </p>
              </div>
            </div>

            <h1 className="mt-5 text-[1.34rem] font-black leading-none 
            flex tracking-[-0.05em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
              {title}
              <p className="text-[#5993b6] ml-1">{username}</p>
            </h1>

            <p className="mt-2 flex items-center text-[1.3rem] leading-5 tracking-[-0.02em] text-white/82">
              {subtitle}              
              
            </p>
          </div>

          {topRightAction ? (
            <div className="relative z-20 shrink-0">{topRightAction}</div>
          ) : null}
        </div>

        {children ? (
          <div className="mt-auto -translate-y-3 pt-2">{children}</div>
        ) : showBackButton ? (
          <div className="mt-auto pt-6">
            {onBack ? (
              <Button
                type="button"
                onClick={onBack}
                className="h-11 w-full rounded-2xl border border-[#5993b6]/35 bg-[#5993b6]/12 text-sm font-black uppercase tracking-[0.12em] text-[#AEEBFF] shadow-none transition hover:bg-[#5993b6]/18"
                variant="ghost"
              >
                <ArrowBigLeft className="size-4" />
                Volver al inicio
              </Button>
            ) : (
              <Button
                asChild
                className="h-11 w-full rounded-2xl border border-[#5993b6]/35 bg-[#5993b6]/12 text-sm font-black uppercase tracking-[0.12em] text-[#AEEBFF] shadow-none transition hover:bg-[#5993b6]/18"
                variant="ghost"
              >
                <Link href={backHref}>
                  <ArrowBigLeft className="size-4" />
                  Volver al inicio
                </Link>
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

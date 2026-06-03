import Image from "next/image";

type BrandImageProps = {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
};

export function BrandMasLogo({
  className,
  alt = "Más San Miguel",
  width = 132,
  height = 76,
  priority,
}: BrandImageProps) {
  return (
    <Image
      src="/brand/massm.png"
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export function BrandSunWatermark({
  className,
  alt = "",
  width = 260,
  height = 260,
}: BrandImageProps) {
  return (
    <Image
      src="/brand/sol.png"
      alt={alt}
      width={width}
      height={height}
      aria-hidden="true"
      className={className}
    />
  );
}

export function BrandMasWatermark({
  className,
  alt = "",
  width = 180,
  height = 180,
}: BrandImageProps) {
  return (
    <Image
      src="/brand/massm.png"
      alt={alt}
      width={width}
      height={height}
      aria-hidden="true"
      className={className}
    />
  );
}

export function BrandProdeImage({
  className,
  alt = "",
  width = 540,
  height = 540,
  priority,
  fill,
}: BrandImageProps) {
  return (
    <Image
      src="/prode.png"
      alt={alt}
      {...(fill ? { fill: true } : { width, height })}
      aria-hidden="true"
      priority={priority}
      className={className}
    />
  );
}

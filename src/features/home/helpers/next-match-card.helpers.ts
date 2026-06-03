import { SUPABASE_PUBLIC_FILES_BASE } from "@/features/home/constants/home.constants";

export function formatMatchHour(date: string | Date) {
  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  })
    .format(new Date(date))
    .replace("24:", "00:");
}

export function getTeamCode(name?: string | null, code?: string | null) {
  if (code) return code.toUpperCase();

  const safeName = (name ?? "").trim();
  if (!safeName) return "TBD";

  return safeName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3);
}

export function getFlagSrc(bandera?: string | null, code?: string | null) {
  const safeCode = code?.toUpperCase().trim();
  const safeBandera = bandera?.trim();

  if (!safeCode && !safeBandera) {
    return null;
  }

  if (safeBandera?.startsWith("http://") || safeBandera?.startsWith("https://")) {
    if (safeBandera.match(/\.(png|jpg|jpeg|webp|svg)$/i)) {
      return safeBandera;
    }

    return safeCode ? `${safeBandera.replace(/\/+$/, "")}/${safeCode}.png` : safeBandera;
  }

  if (safeBandera?.startsWith("/") && safeBandera.match(/\.(png|jpg|jpeg|webp|svg)$/i)) {
    return safeBandera;
  }

  if (safeBandera) {
    const folder = safeBandera.replace(/^\/+/, "").replace(/\/+$/, "");
    return safeCode
      ? `${SUPABASE_PUBLIC_FILES_BASE}/${folder}/${safeCode}.png`
      : `${SUPABASE_PUBLIC_FILES_BASE}/${folder}`;
  }

  return safeCode ? `${SUPABASE_PUBLIC_FILES_BASE}/banderas/${safeCode}.png` : null;
}

import type {
  LiveEventStyle,
  LiveEventVariant,
} from "@/features/live-events/types/live-event.types";

export function getLiveEventStyle(variant: LiveEventVariant): LiveEventStyle {
  const shared = {
    accentClassName: "text-[#F7E7A1]",
    glowClassName:
      "bg-[radial-gradient(circle_at_top,rgba(247,183,49,0.16),transparent_28%),radial-gradient(circle_at_bottom,rgba(0,140,147,0.16),transparent_26%)]",
  };

  if (variant === "goal") {
    return {
      ...shared,
      durationMs: 5200,
      mascotSrc: "/festejos/gol1.png",
      accentClassName: "text-[#D7FF87]",
      glowClassName:
        "bg-[radial-gradient(circle_at_top,rgba(57,169,53,0.26),transparent_26%),radial-gradient(circle_at_bottom,rgba(247,183,49,0.18),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(0,140,147,0.22),transparent_28%)]",
      confetti: true,
    };
  }

  if (variant === "kickoff") {
    return {
      ...shared,
      durationMs: 4200,
      mascotSrc: "/festejos/comienza.png",
      confetti: false,
    };
  }

  if (variant === "halftime") {
    return {
      ...shared,
      durationMs: 5000,
      mascotSrc: "/festejos/entretiempo.png",
      accentClassName: "text-[#7CE7EB]",
      glowClassName:
        "bg-[radial-gradient(circle_at_top,rgba(0,140,147,0.22),transparent_26%),radial-gradient(circle_at_bottom,rgba(148,163,184,0.14),transparent_22%)]",
      confetti: false,
    };
  }

  if (variant === "final") {
    return {
      ...shared,
      durationMs: 6200,
      mascotSrc: "/festejos/finalizado.png",
      accentClassName: "text-white",
      glowClassName:
        "bg-[radial-gradient(circle_at_top,rgba(247,183,49,0.14),transparent_26%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_24%)]",
      confetti: false,
    };
  }

  return {
    ...shared,
    durationMs: 4500,
    mascotSrc: "/festejos/comienza.png",
    accentClassName: "text-red-100",
    glowClassName:
      "bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_26%),radial-gradient(circle_at_bottom,rgba(148,163,184,0.12),transparent_22%)]",
    confetti: false,
  };
}

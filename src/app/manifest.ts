import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: env.NEXT_PUBLIC_APP_NAME,
    short_name: "Prode 2026",
    description: "PWA mobile del Prode Mundial 2026",
    start_url: "/inicio",
    display: "standalone",
    background_color: "#10213a",
    theme_color: "#10213a",
    lang: "es-AR",
    orientation: "portrait",
    icons: [
      {
        src: "/brand/mas.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/mas.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

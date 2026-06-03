import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import { AppToaster } from "@/components/shared/app-toaster";
import { PushNotificationsBootstrap } from "@/features/notifications/components/push-notifications-bootstrap";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-600.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_APP_NAME,
  description: "PWA mobile del Prode Mundial 2026",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("h-full", "antialiased", "font-sans", poppins.variable)}>
      <body className="min-h-full flex flex-col">
        <PushNotificationsBootstrap />
        {children}
        <AppToaster />
      </body>
    </html>
  );
}

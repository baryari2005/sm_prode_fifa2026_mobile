import localFont from "next/font/local";
import { MobilePreviewPage } from "@/features/brand-preview/components/mobile-preview-page";

const cheddar = localFont({
  src: "../../../public/fonts/cheddar-gothic-sans.otf",
  variable: "--font-brand",
  display: "swap",
});

export default function MobilePreviewRoute() {
  return (
    <div className={cheddar.variable}>
      <MobilePreviewPage />
    </div>
  );
}

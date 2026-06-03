import localFont from "next/font/local";
import { BrandMobileLoginOnlyPreview } from "@/features/brand-preview/components/brand-mobile-login-only-preview";

const cheddar = localFont({
  src: "../../../../public/fonts/cheddar-gothic-sans.otf",
  variable: "--font-brand",
  display: "swap",
});

export default function MobileLoginPreviewRoute() {
  return (
    <div className={cheddar.variable}>
      <BrandMobileLoginOnlyPreview />
    </div>
  );
}

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type MobileFormFieldProps = {
  label?: string | null;
  error?: string;
  children: ReactNode;
};

export function MobileFormField({
  label,
  error,
  children,
}: MobileFormFieldProps) {
  return (
    <div className="space-y-2">
      {label ? (
        <Label className="text-sm font-semibold text-white/74">{label}</Label>
      ) : null}
      {children}
      {error ? <p className="text-xs font-medium text-red-300">{error}</p> : null}
    </div>
  );
}

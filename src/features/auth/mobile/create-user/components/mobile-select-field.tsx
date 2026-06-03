import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MobileFormField } from "@/features/auth/mobile/create-user/components/mobile-form-field";
import { MOBILE_INPUT_CLASS } from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";
import { cn } from "@/lib/utils";

type MobileSelectFieldProps = {
  label?: string | null;
  value?: string;
  onChange: (value: string) => void;
  options: readonly string[];
  error?: string;
  icon?: ReactNode;
  iconClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  placeholder?: string;
};

export function MobileSelectField({
  label,
  value,
  onChange,
  options,
  error,
  icon,
  iconClassName,
  contentClassName,
  itemClassName,
  placeholder,
}: MobileSelectFieldProps) {
  return (
    <MobileFormField label={label} error={error}>
      <Select value={value} onValueChange={onChange}>
        <div className="group relative">
          {icon ? (
            <span
              className={cn(
                "pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/55 transition-colors group-focus-within:text-[#5993b6]",
                iconClassName
              )}
            >
              {icon}
            </span>
          ) : null}
          <SelectTrigger
            className={cn(
              MOBILE_INPUT_CLASS,
              "pr-12 [&>svg]:hidden",
              icon ? "pl-9" : null
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#5993b6]">
            <ChevronDown className="size-4" />
          </span>
        </div>
        <SelectContent
          className={cn(
            "overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0f2640] p-2 text-white shadow-[0_24px_60px_rgba(0,0,0,0.42)]",
            contentClassName
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-medium text-white focus:bg-[#2b4462] focus:text-white data-[state=checked]:bg-[#2b4462] data-[state=checked]:text-white",
                itemClassName
              )}
            >
              {option.replaceAll("_", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </MobileFormField>
  );
}

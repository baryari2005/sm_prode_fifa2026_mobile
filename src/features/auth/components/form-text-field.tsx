"use client";

import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormTextFieldProps = {
  id: string;
  label: string;
  error?: string;
  leftIcon?: ReactNode;
  rightAdornment?: ReactNode;
  className?: string;
} & React.ComponentProps<typeof Input>;

export function FormTextField({
  id,
  label,
  error,
  leftIcon,
  rightAdornment,
  className,
  ...props
}: FormTextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-white/72">
        {label}
      </Label>

      <div className="group relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white/55 transition-colors group-focus-within:text-[#5993b6]">
            {leftIcon}
          </span>
        ) : null}

        <Input
          id={id}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 rounded-3xl border-white/14 bg-white/[0.07] text-white placeholder:text-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur focus-visible:border-[#B8EF6A]/75 focus-visible:ring-[#B8EF6A]/20",
            leftIcon ? "pl-11" : "pl-4",
            rightAdornment ? "pr-11" : "pr-4",
            className
          )}
          {...props}
        />

        {rightAdornment ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightAdornment}
          </span>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

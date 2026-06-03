"use client";

import { forwardRef, useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PasswordInputProps = ComponentProps<"input"> & {
  icon?: ReactNode;
  leftIcon?: ReactNode;
  iconPosition?: "left" | "right";
  iconClassName?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, icon, leftIcon, iconPosition = "left", iconClassName, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const resolvedIcon = icon ?? leftIcon;
    const hasLeftIcon = resolvedIcon && iconPosition === "left";
    const hasRightIcon = resolvedIcon && iconPosition === "right";

    return (
      <div className="group relative">
        {resolvedIcon ? (
          <span
            className={cn(
              "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-white/55 transition-colors group-focus-within:text-[#5993b6]",
              hasLeftIcon ? "left-4" : "right-12",
              iconClassName
            )}
          >
            {resolvedIcon}
          </span>
        ) : null}

        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn(
            "h-12 rounded-3xl border-white/14 bg-white/[0.07] text-white placeholder:text-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur focus-visible:border-[#B8EF6A]/75 focus-visible:ring-[#B8EF6A]/20",
            hasLeftIcon ? "pl-11" : "pl-4",
            hasRightIcon ? "pr-20" : "pr-11",
            className
          )}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full text-white/55 transition-colors group-focus-within:text-[#5993b6] hover:bg-white/10 hover:text-white active:not-aria-[haspopup]:-translate-y-1/2"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {visible ? <EyeOff /> : <Eye />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

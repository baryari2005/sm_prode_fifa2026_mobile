import type { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  loadingLabel?: string;
  className?: string;
} & React.ComponentProps<typeof Button>;

export function SubmitButton({
  loading = false,
  icon,
  iconPosition = "left",
  children,
  loadingLabel = "Procesando...",
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={cn(
        "mt-4 h-12 w-full rounded-3xl bg-[#39A935] text-white shadow-lg shadow-green-950/30 transition hover:bg-[#2B8B31]",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />          
            {loadingLabel}
          </span>
        </>
      ) : (
        <>
          {iconPosition === "left" ? icon : null}
          {children}
          {iconPosition === "right" ? icon : null}
        </>
      )}
    </Button>
  );
}

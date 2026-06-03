"use client";

import { X } from "lucide-react";

type LiveEventCloseButtonProps = {
  onClose: () => void;
};

export function LiveEventCloseButton({
  onClose,
}: LiveEventCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/76 backdrop-blur hover:bg-white/14 hover:text-white"
      aria-label="Cerrar overlay en vivo"
    >
      <X className="size-4" />
    </button>
  );
}

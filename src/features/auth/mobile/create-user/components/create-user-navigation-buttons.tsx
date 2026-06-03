import { ArrowBigLeft, ArrowBigRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MOBILE_PRIMARY_BUTTON_CLASS,
  MOBILE_SECONDARY_BUTTON_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";

type CreateUserNavigationButtonsProps = {
  activeIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
};

export function CreateUserNavigationButtons({
  activeIndex,
  totalSteps,
  onPrev,
  onNext,
  isNextDisabled = false,
}: CreateUserNavigationButtonsProps) {
  const isFirstStep = activeIndex === 0;

  return (
    <div className="flex items-center gap-2 pt-1">
      <Button
        type="button"
        className={MOBILE_SECONDARY_BUTTON_CLASS}
        onClick={onPrev}
        disabled={isFirstStep}
        aria-hidden={isFirstStep}
      >
        <ArrowBigLeft className="size-4" />
        Volver
      </Button>

      {activeIndex < totalSteps - 1 ? (
        <Button
          type="button"
          className={`${MOBILE_PRIMARY_BUTTON_CLASS} ml-auto h-11 w-auto min-w-[148px] px-6 py-0`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          Siguiente
          <ArrowBigRight className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

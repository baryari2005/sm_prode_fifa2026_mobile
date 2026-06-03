import { useState } from "react";
import type { FieldErrors } from "react-hook-form";
import {
  FIELD_TO_STEP,
  STEPS,
  type StepValue,
} from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import type { RegisterSchemaValues } from "@/features/auth/schemas/auth.schema";

export function useCreateUserSteps() {
  const [step, setStep] = useState<StepValue>("acceso");

  const activeIndex = STEPS.findIndex((item) => item.value === step);

  function goStep(direction: -1 | 1) {
    const next = STEPS[activeIndex + direction];
    if (!next) return;
    setStep(next.value);
  }

  function goToFirstError(errors: FieldErrors<RegisterSchemaValues>) {
    const firstErrorField = Object.keys(errors)[0];
    const errorStep = FIELD_TO_STEP[firstErrorField];
    if (errorStep) {
      setStep(errorStep);
    }
  }

  return {
    step,
    setStep,
    activeIndex,
    goStep,
    goToFirstError,
  };
}

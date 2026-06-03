import {
  STEPS,
  STEP_INDEX,
  type StepValue,
} from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";

type CreateUserStepProgressProps = {
  step: StepValue;
};

export function CreateUserStepProgress({
  step,
}: CreateUserStepProgressProps) {
  const currentIndex = STEP_INDEX[step];
  const currentStep = STEPS[currentIndex];
  const progress = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-3 pb-1">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#8FCBEB]">
            Paso {currentIndex + 1} de {STEPS.length}
          </p>
          <h2 className="text-xl font-semibold leading-tight text-white">
            {currentStep.headerTitle}
          </h2>
          <p className="max-w-[24rem] text-xs text-white/70">
            {currentStep.sectionDescription}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#FAB438] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-white/80">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}

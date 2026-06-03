import type { RefObject } from "react";
import { Check } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  STEPS,
  STEP_INDEX,
  type StepValue,
} from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import {
  MOBILE_TAB_CLASS,
  MOBILE_TAB_LIST_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";

type CreateUserStepTabsProps = {
  step: StepValue;
  onStepChange: (value: StepValue) => void;
  tabsScrollRef: RefObject<HTMLDivElement | null>;
};

export function CreateUserStepTabs({
  step,
  onStepChange,
  tabsScrollRef,
}: CreateUserStepTabsProps) {
  const activeIndex = STEP_INDEX[step];

  return (
    <div
      ref={tabsScrollRef}
      className="w-full overflow-y-visible"
    >
      <TabsList
        variant="line"
        className={`${MOBILE_TAB_LIST_CLASS} relative grid h-auto w-full grid-cols-5 gap-0 bg-transparent p-0 -mt-1`}
      >
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-3.5 h-[2px] bg-white/20" />
        {STEPS.map((item, index) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={`${MOBILE_TAB_CLASS} relative flex h-auto min-h-[48px] w-full flex-col items-center justify-start gap-2 border-0 bg-transparent px-0 py-0 shadow-none data-[state=active]:border-0 data-[state=active]:bg-transparent`}
            onClick={() => onStepChange(item.value)}
            data-step={step === item.value ? "active" : "inactive"}
          >
            <span
              className={`relative z-10 inline-flex size-10 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                index < activeIndex
                  ? "border-[#7EB6D5] bg-[#17324d] text-[#CFF4FF]"
                  : index === activeIndex
                    ? "border-[#F0BF4D] bg-[#FAB438] text-[#10243A] shadow-[0_10px_24px_rgba(250,180,56,0.28)]"
                    : "border-white/35 bg-[#223754] text-white/80"
              }`}
            >
              {index < activeIndex ? (
                <Check className="size-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </span>
            {/* <span className="whitespace-nowrap text-[11px] font-semibold text-white/78">
              {item.label}
            </span> */}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}

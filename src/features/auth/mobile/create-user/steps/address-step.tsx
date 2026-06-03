import type { UseFormReturn } from "react-hook-form";
import { Building2, House, Pin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateUserStepSectionHeader } from "@/features/auth/mobile/create-user/components/create-user-step-section-header";
import { MobileFormField } from "@/features/auth/mobile/create-user/components/mobile-form-field";
import { STEPS } from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import {
  MOBILE_INPUT_CLASS,
  MOBILE_SECTION_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";
import type { RegisterSchemaValues } from "@/features/auth/schemas/auth.schema";

type AddressStepProps = {
  form: UseFormReturn<RegisterSchemaValues>;
};

export function AddressStep({ form }: AddressStepProps) {
  const step = STEPS[3];

  return (
    <div className={MOBILE_SECTION_CLASS}>
      <div className="space-y-3">
        <CreateUserStepSectionHeader
          title={step.sectionTitle}
          icon={<Pin className="size-4" />}
        />

        <MobileFormField error={form.formState.errors.domicilio?.message}>
          <Input
            className={MOBILE_INPUT_CLASS}
            autoComplete="street-address"
            icon={<House className="size-4" />}
            placeholder="Calle"
            {...form.register("domicilio")}
          />
        </MobileFormField>

        <MobileFormField>
          <Input
            className={MOBILE_INPUT_CLASS}
            icon={<Building2 className="size-4" />}
            placeholder="Partido"
            value="San Miguel"
            readOnly
          />
        </MobileFormField>

        <input type="hidden" {...form.register("localidad")} value="San Miguel" />
      </div>
    </div>
  );
}

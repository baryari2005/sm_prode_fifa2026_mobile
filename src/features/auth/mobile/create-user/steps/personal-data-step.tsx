import type { UseFormReturn } from "react-hook-form";
import { NotepadText, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateUserStepSectionHeader } from "@/features/auth/mobile/create-user/components/create-user-step-section-header";
import { MobileFormField } from "@/features/auth/mobile/create-user/components/mobile-form-field";
import { STEPS } from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import {
  MOBILE_INPUT_CLASS,
  MOBILE_SECTION_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";
import type { RegisterSchemaValues } from "@/features/auth/schemas/auth.schema";

type PersonalDataStepProps = {
  form: UseFormReturn<RegisterSchemaValues>;
};

export function PersonalDataStep({ form }: PersonalDataStepProps) {
  const step = STEPS[1];

  return (
    <div className={MOBILE_SECTION_CLASS}>
      <div className="space-y-3">
        <CreateUserStepSectionHeader
          title={step.sectionTitle}
          icon={<NotepadText className="size-4" />}
        />

        <MobileFormField error={form.formState.errors.nombre?.message}>
          <Input
            className={MOBILE_INPUT_CLASS}
            autoComplete="given-name"
            icon={<User className="size-4" />}
            iconPosition="left"
            placeholder="Nombre"
            {...form.register("nombre")}
          />
        </MobileFormField>

        <MobileFormField error={form.formState.errors.apellido?.message}>
          <Input
            className={MOBILE_INPUT_CLASS}
            autoComplete="family-name"
            icon={<User className="size-4" />}
            iconPosition="left"
            placeholder="Apellido"
            {...form.register("apellido")}
          />
        </MobileFormField>

        <MobileFormField error={form.formState.errors.celular?.message}>
          <Input
            className={MOBILE_INPUT_CLASS}
            autoComplete="tel"
            icon={<Phone className="size-4" />}
            iconPosition="left"
            placeholder="Celular"
            {...form.register("celular")}
          />
        </MobileFormField>
      </div>
    </div>
  );
}

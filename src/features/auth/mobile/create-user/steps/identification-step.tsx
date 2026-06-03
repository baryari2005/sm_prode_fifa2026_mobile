import type { UseFormReturn } from "react-hook-form";
import { BadgeCheck, IdCard, NotepadText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TIPO_DOCUMENTO_OPCIONES } from "@/constants/tipo-documento";
import { CreateUserStepSectionHeader } from "@/features/auth/mobile/create-user/components/create-user-step-section-header";
import { MobileFormField } from "@/features/auth/mobile/create-user/components/mobile-form-field";
import { MobileSelectField } from "@/features/auth/mobile/create-user/components/mobile-select-field";
import { STEPS } from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import {
  MOBILE_INPUT_CLASS,
  MOBILE_SECTION_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";
import type { RegisterSchemaValues } from "@/features/auth/schemas/auth.schema";

type IdentificationStepProps = {
  form: UseFormReturn<RegisterSchemaValues>;
  watchedTipoDocumento?: RegisterSchemaValues["tipoDocumento"];
};

export function IdentificationStep({
  form,
  watchedTipoDocumento,
}: IdentificationStepProps) {
  const step = STEPS[2];

  return (
    <div className={MOBILE_SECTION_CLASS}>
      <div className="space-y-3">
        <CreateUserStepSectionHeader
          title={step.sectionTitle}
          icon={<NotepadText className="size-4" />}
        />

        <MobileSelectField
          error={form.formState.errors.tipoDocumento?.message}
          value={watchedTipoDocumento}
          icon={<BadgeCheck className="size-4" />}
          onChange={(value) =>
            form.setValue(
              "tipoDocumento",
              value as RegisterSchemaValues["tipoDocumento"],
              { shouldValidate: true }
            )
          }
          options={TIPO_DOCUMENTO_OPCIONES}
        />

        <MobileFormField error={form.formState.errors.documento?.message}>
          <Input
            className={MOBILE_INPUT_CLASS}
            inputMode="numeric"
            icon={<IdCard className="size-4" />}
            placeholder="Número de documento"
            {...form.register("documento")}
          />
        </MobileFormField>
      </div>
    </div>
  );
}

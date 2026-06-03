import type { UseFormReturn } from "react-hook-form";
import { Lock, Mail, User, UserRoundPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/features/auth/components/password-input";
import { CreateUserStepSectionHeader } from "@/features/auth/mobile/create-user/components/create-user-step-section-header";
import { MobileFormField } from "@/features/auth/mobile/create-user/components/mobile-form-field";
import { STEPS } from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import {
  MOBILE_INPUT_CLASS,
  MOBILE_SECTION_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";
import type { RegisterSchemaValues } from "@/features/auth/schemas/auth.schema";

type AccessStepProps = {
  form: UseFormReturn<RegisterSchemaValues>;
};

export function AccessStep({ form }: AccessStepProps) {
  const step = STEPS[0];

  return (
    <div className={MOBILE_SECTION_CLASS}>
      <div className="space-y-3">
        <CreateUserStepSectionHeader
          title={step.sectionTitle}
          icon={<UserRoundPlus className="size-4" />}
        />

        <MobileFormField error={form.formState.errors.userId?.message}>
          <Input
            className={MOBILE_INPUT_CLASS}
            autoComplete="username"
            placeholder="Usuario"
            icon={<User className="size-4" />}
            iconPosition="left"
            {...form.register("userId")}
          />
        </MobileFormField>

        <MobileFormField error={form.formState.errors.email?.message}>
          <Input
            className={MOBILE_INPUT_CLASS}
            type="email"
            placeholder="Email"
            autoComplete="email"
            icon={<Mail className="size-4" />}
            iconPosition="left"
            {...form.register("email")}
          />
        </MobileFormField>

        <MobileFormField error={form.formState.errors.password?.message}>
          <PasswordInput
            className={MOBILE_INPUT_CLASS}
            autoComplete="new-password"
            placeholder="Contraseña"
            {...form.register("password")}
            icon={<Lock className="size-4" />}
            iconPosition="left"
          />
        </MobileFormField>

      </div>
    </div>
  );
}

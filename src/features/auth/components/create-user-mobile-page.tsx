"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SubmitButton } from "@/features/auth/components/submit-button";
import { CreateUserMobileBackground } from "@/features/auth/mobile/create-user/components/create-user-mobile-background";
import { CreateUserMobileCard } from "@/features/auth/mobile/create-user/components/create-user-mobile-card";
import { CreateUserMobileHeader } from "@/features/auth/mobile/create-user/components/create-user-mobile-header";
import { CreateUserNavigationButtons } from "@/features/auth/mobile/create-user/components/create-user-navigation-buttons";
import { CreateUserStepProgress } from "@/features/auth/mobile/create-user/components/create-user-step-progress";
import { CreateUserStepTabs } from "@/features/auth/mobile/create-user/components/create-user-step-tabs";
import { CreateUserSuccessState } from "@/features/auth/mobile/create-user/components/create-user-success-state";
import {
  STEP_FIELDS,
  STEPS,
  type StepValue,
} from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import { useAutoCenterActiveTab } from "@/features/auth/mobile/create-user/hooks/use-auto-center-active-tab";
import { useCreateUserSteps } from "@/features/auth/mobile/create-user/hooks/use-create-user-steps";
import { AccessStep } from "@/features/auth/mobile/create-user/steps/access-step";
import { AddressStep } from "@/features/auth/mobile/create-user/steps/address-step";
import { IdentificationStep } from "@/features/auth/mobile/create-user/steps/identification-step";
import { PersonalDataStep } from "@/features/auth/mobile/create-user/steps/personal-data-step";
import { TermsStep } from "@/features/auth/mobile/create-user/steps/terms-step";
import { MOBILE_PRIMARY_BUTTON_CLASS } from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";
import {
  registerSchema,
  type RegisterSchemaValues,
} from "@/features/auth/schemas/auth.schema";
import { useAuthStore } from "@/stores/auth.store";

export function CreateUserMobilePage() {
  const router = useRouter();
  const tabsScrollRef = useRef<HTMLDivElement | null>(null);
  const { register: registerUser, loading, error, clearError } = useAuthStore();
  const [created, setCreated] = useState(false);
  const { step, setStep, activeIndex, goStep, goToFirstError } = useCreateUserSteps();

  const form = useForm<RegisterSchemaValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userId: "",
      nombre: "",
      apellido: "",
      celular: "",
      email: "",
      tipoDocumento: "DNI",
      documento: "",
      domicilio: "",
      localidad: "San Miguel",
      password: "",
      acceptedTerms: false,
    },
  });

  const watchedTipoDocumento = useWatch({
    control: form.control,
    name: "tipoDocumento",
  });
  const watchedAcceptedTerms = useWatch({
    control: form.control,
    name: "acceptedTerms",
  });

  useAutoCenterActiveTab({ step, tabsScrollRef });

  async function handleNextStep() {
    const currentFields = STEP_FIELDS[step];
    const isValid = await form.trigger(currentFields, { shouldFocus: true });
    if (!isValid) return;
    goStep(1);
  }

  async function onSubmit(values: RegisterSchemaValues) {
    clearError();

    try {
      await registerUser({
        userId: values.userId,
        nombre: values.nombre,
        apellido: values.apellido,
        celular: values.celular,
        email: values.email,
        tipoDocumento: values.tipoDocumento,
        documento: values.documento,
        domicilio: values.domicilio,
        localidad: values.localidad,
        acceptedTerms: values.acceptedTerms,
        password: values.password,
      });

      setCreated(true);
      toast.success(
        "Tu usuario fue creado, ahora a jugar!."
      );
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No pudimos crear el usuario.";
      const normalized = message.toLowerCase();

      if (
        normalized.includes("invalid input") ||
        normalized.includes("datos inválidos")
      ) {
        toast.error(
          "La API rechazó el registro por formato inválido. Revisá usuario, documento, domicilio y datos personales obligatorios."
        );
        return;
      }

      toast.error(message);
    }
  }

  return (
    <CreateUserMobileBackground>
      <CreateUserMobileCard>
        <CreateUserMobileHeader />

        {created ? (
          <CreateUserSuccessState onBackToLogin={() => router.push("/login")} />
        ) : (
          <Tabs
            value={step}
            onValueChange={(value) => setStep(value as StepValue)}
            className="gap-4"
          >
            <CreateUserStepProgress step={step} />
            <CreateUserStepTabs
              step={step}
              onStepChange={setStep}
              tabsScrollRef={tabsScrollRef}
            />

            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit, goToFirstError)}
            >
              {error ? (
                <Alert className="rounded-[1.35rem] border-red-400/25 bg-red-500/10 text-red-100">
                  <AlertTitle>No pudimos crear el usuario.</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              <TabsContent value="acceso">
                <AccessStep form={form} />
              </TabsContent>

              <TabsContent value="datos">
                <PersonalDataStep form={form} />
              </TabsContent>

              <TabsContent value="identificacion">
                <IdentificationStep
                  form={form}
                  watchedTipoDocumento={watchedTipoDocumento}
                />
              </TabsContent>

              <TabsContent value="domicilio">
                <AddressStep form={form} />
              </TabsContent>

              <TabsContent value="condiciones">
                <TermsStep
                  form={form}
                  watchedAcceptedTerms={watchedAcceptedTerms}
                />
              </TabsContent>

              {activeIndex === STEPS.length - 1 ? (
                <div className="flex items-center gap-2 pt-1">
                  <CreateUserNavigationButtons
                    activeIndex={activeIndex}
                    totalSteps={STEPS.length}
                    onPrev={() => goStep(-1)}
                    onNext={handleNextStep}
                  />
                  <SubmitButton
                    className={`${MOBILE_PRIMARY_BUTTON_CLASS} mt-0 ml-auto h-11 w-auto min-w-[168px] px-5 py-0`}
                    loading={loading}
                    loadingLabel="Enviando..."
                    icon={<Send className="size-4" />}
                    iconPosition="right"
                  >
                    Registrar usuario
                  </SubmitButton>
                </div>
              ) : (
                <CreateUserNavigationButtons
                  activeIndex={activeIndex}
                  totalSteps={STEPS.length}
                  onPrev={() => goStep(-1)}
                  onNext={handleNextStep}
                />
              )}

              <div className="rounded-full border border-white/14 bg-white/[0.02] px-4 py-4 text-center">
                <p className="text-sm text-white/62">
                  ¿Ya tenés cuenta?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-[#AEEBFF] underline-offset-4 transition hover:text-white hover:underline"
                  >
                    Ingresá
                  </Link>
                </p>
              </div>
            </form>
          </Tabs>
        )}
      </CreateUserMobileCard>
    </CreateUserMobileBackground>
  );
}

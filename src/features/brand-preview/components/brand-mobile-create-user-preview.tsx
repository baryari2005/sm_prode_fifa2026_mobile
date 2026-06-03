"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";
import {
  AlertCircle,
  ArrowBigLeft,
  ArrowBigRight,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordInput } from "@/features/auth/components/password-input";
import {
  registerSchema,
  type RegisterSchemaValues,
} from "@/features/auth/schemas/auth.schema";
import { TIPO_DOCUMENTO_OPCIONES } from "@/constants/tipo-documento";
import { BrandMobileShell } from "./brand-mobile-shell";

const MOBILE_CARD_CLASS =
  "relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#31445f]/80 px-4 pb-5 pt-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl";

const MOBILE_SECTION_CLASS =
  "rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

const MOBILE_INPUT_CLASS =
  "h-12 rounded-[1rem] border-white/15 bg-[rgba(11,39,69,0.78)] px-4 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[color,box-shadow,background-color,border-color] duration-200 placeholder:text-white/45 focus-visible:border-[#7EDCFF]/35 focus-visible:ring-[#7EDCFF]/20";

const MOBILE_TAB_LIST_CLASS =
  "inline-flex h-auto gap-2 rounded-full border border-white/10 bg-white/[0.05] p-1";

const MOBILE_TAB_CLASS =
  "h-9 rounded-full border border-transparent px-4 text-xs font-semibold tracking-[0.08em] text-white/62 data-active:border-white/10 data-active:bg-[#fab438] data-active:text-[#1e2c46]";

const MOBILE_PRIMARY_BUTTON_CLASS =
  "h-12 w-full rounded-full border border-[#E7B03A] bg-[#FAB438] px-4 py-2 text-sm font-semibold text-[#1E2C46] shadow-[0_16px_40px_rgba(250,180,56,0.24)] transition-all duration-200 hover:bg-[#F7C45A] hover:shadow-[0_18px_40px_rgba(250,180,56,0.34)] active:scale-[0.98]";

const MOBILE_SECONDARY_BUTTON_CLASS =
  "h-11 rounded-full border border-white/14 bg-white/[0.06] px-4 text-sm font-semibold text-white hover:bg-white/[0.09]";

const STEPS = [
  { value: "acceso", label: "Acceso" },
  { value: "datos", label: "Datos" },
  { value: "identificacion", label: "Identificación" },
  { value: "domicilio", label: "Domicilio" },
  { value: "condiciones", label: "Condiciones" },
] as const;

type StepValue = (typeof STEPS)[number]["value"];

const FIELD_TO_STEP: Record<keyof RegisterSchemaValues, StepValue> = {
  userId: "acceso",
  email: "acceso",
  password: "acceso",
  nombre: "datos",
  apellido: "datos",
  celular: "datos",
  tipoDocumento: "identificacion",
  documento: "identificacion",
  domicilio: "domicilio",
  localidad: "domicilio",
  acceptedTerms: "condiciones",
};

export function BrandMobileCreateUserPreview() {
  const [step, setStep] = useState<StepValue>("acceso");
  const [created, setCreated] = useState(false);

  const form = useForm<RegisterSchemaValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userId: "smanzoni",
      nombre: "Santiago",
      apellido: "Manzoni",
      celular: "1132456789",
      email: "santi@massanmiguel.ar",
      tipoDocumento: "DNI",
      documento: "32765432",
      domicilio: "Sarmiento 1234",
      localidad: "San Miguel",
      password: "123456",
      acceptedTerms: true,
    },
  });

  const activeIndex = STEPS.findIndex((item) => item.value === step);
  const watchedTipoDocumento = form.watch("tipoDocumento");

  const previewNotes = useMemo(
    () => ["Alta mobile", "Solicitud", "Pendiente de aprobación"],
    []
  );

  function goStep(direction: -1 | 1) {
    const next = STEPS[activeIndex + direction];
    if (!next) return;
    setStep(next.value);
  }

  function goToFirstError(errors: FieldErrors<RegisterSchemaValues>) {
    const firstErrorField = Object.keys(errors)[0] as
      | keyof RegisterSchemaValues
      | undefined;
    if (!firstErrorField) return;

    const errorStep = FIELD_TO_STEP[firstErrorField];
    if (errorStep) {
      setStep(errorStep);
    }
  }

  function onSubmit() {
    setCreated(true);
  }

  return (
    <BrandMobileShell>
      <div className="min-h-[100svh] bg-[#1e2c46] p-3">
        <section className={MOBILE_CARD_CLASS}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "url('/brand/pattern-cover.png')",
              backgroundSize: "600px auto",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="pointer-events-none absolute right-[-28px] top-[-8px] opacity-[0.1]">
            <div className="relative h-32 w-32">
              <Image
                src="/brand/sol.png"
                alt=""
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          </div>

          <div className="relative z-10">
            <header className="pb-4">
              <p
                className="text-[0.82rem] uppercase tracking-[0.24em] text-[#fab438]"
                style={{ fontFamily: "var(--font-brand)" }}
              >
                Más San Miguel
              </p>
              <h3
                className="mt-2 text-[1.95rem] leading-[0.92] text-white"
                style={{ fontFamily: "var(--font-brand)" }}
              >
                Crear usuario
              </h3>
              <p className="mt-2 max-w-[24rem] text-sm leading-6 text-white/72">
                Completá los datos para dar de alta un usuario en el sistema
                desde la experiencia mobile.
              </p>
            </header>

            <Tabs
              value={step}
              onValueChange={(value) => setStep(value as StepValue)}
              className="gap-4"
            >
              <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <TabsList variant="line" className={MOBILE_TAB_LIST_CLASS}>
                  {STEPS.map((item) => (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className={MOBILE_TAB_CLASS}
                    >
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit, goToFirstError)}
              >
                {created ? (
                  <Alert className="rounded-[1.35rem] border-emerald-300/20 bg-emerald-500/10 text-emerald-100">
                    <CheckCircle2 className="size-4" />
                    <AlertTitle>Mock listo</AlertTitle>
                    <AlertDescription>
                      El usuario se crearía usando los mismos campos y
                      validaciones del registro actual.
                    </AlertDescription>
                  </Alert>
                ) : null}

                <TabsContent value="acceso">
                  <div className={MOBILE_SECTION_CLASS}>
                    <div className="mb-4 flex items-start gap-3">
                      <div className="rounded-2xl bg-[#fab438]/14 p-2 text-[#fab438]">
                        <ShieldCheck className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Acceso al sistema
                        </p>
                        <p className="mt-1 text-sm leading-6 text-white/60">
                          Definí usuario, email y credenciales iniciales.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <PreviewField
                        label="Usuario"
                        error={form.formState.errors.userId?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          {...form.register("userId")}
                        />
                      </PreviewField>
                      <PreviewField
                        label="Email"
                        error={form.formState.errors.email?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          type="email"
                          {...form.register("email")}
                        />
                      </PreviewField>
                      <PreviewField
                        label="Contraseña"
                        error={form.formState.errors.password?.message}
                      >
                        <PasswordInput
                          className={MOBILE_INPUT_CLASS}
                          {...form.register("password")}
                        />
                      </PreviewField>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="datos">
                  <div className={MOBILE_SECTION_CLASS}>
                    <div className="space-y-3">
                      <PreviewField
                        label="Nombre"
                        error={form.formState.errors.nombre?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          {...form.register("nombre")}
                        />
                      </PreviewField>
                      <PreviewField
                        label="Apellido"
                        error={form.formState.errors.apellido?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          {...form.register("apellido")}
                        />
                      </PreviewField>
                      <PreviewField
                        label="Celular"
                        error={form.formState.errors.celular?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          {...form.register("celular")}
                        />
                      </PreviewField>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="identificacion">
                  <div className={MOBILE_SECTION_CLASS}>
                    <div className="space-y-3">
                      <PreviewSelect
                        label="Tipo de documento"
                        error={form.formState.errors.tipoDocumento?.message}
                        value={watchedTipoDocumento}
                        onChange={(value) =>
                          form.setValue(
                            "tipoDocumento",
                            value as RegisterSchemaValues["tipoDocumento"],
                            { shouldValidate: true }
                          )
                        }
                        options={TIPO_DOCUMENTO_OPCIONES}
                      />
                      <PreviewField
                        label="Documento"
                        error={form.formState.errors.documento?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          {...form.register("documento")}
                        />
                      </PreviewField>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="domicilio">
                  <div className={MOBILE_SECTION_CLASS}>
                    <div className="space-y-3">
                      <PreviewField
                        label="Domicilio"
                        error={form.formState.errors.domicilio?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          {...form.register("domicilio")}
                        />
                      </PreviewField>
                      <PreviewField
                        label="Partido"
                        error={form.formState.errors.localidad?.message}
                      >
                        <Input
                          className={MOBILE_INPUT_CLASS}
                          value="San Miguel"
                          readOnly
                        />
                      </PreviewField>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="condiciones">
                  <div className={MOBILE_SECTION_CLASS}>
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-[#5993b6]/14 p-2 text-[#AEEBFF]">
                        <UserPlus className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Bases y condiciones
                        </p>
                        <p className="mt-1 text-sm leading-6 text-white/60">
                          Esta preview resume el flujo actual de alta y envío de
                          solicitud.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {previewNotes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full border border-[#5993b6]/22 bg-[#5993b6]/12 px-3 py-1 text-xs font-semibold text-[#AEEBFF]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    <label className="mt-4 flex items-start gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white/74">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
                        {...form.register("acceptedTerms")}
                      />
                      <span>
                        Acepto las bases y condiciones para solicitar acceso y
                        participar.
                      </span>
                    </label>
                    {form.formState.errors.acceptedTerms ? (
                      <p className="mt-2 text-xs font-medium text-red-300">
                        {form.formState.errors.acceptedTerms.message}
                      </p>
                    ) : null}

                    <Alert className="mt-4 rounded-[1.25rem] border-white/10 bg-white/[0.04] text-white/80">
                      <AlertCircle className="size-4" />
                      <AlertTitle className="text-white">
                        Sin lógica nueva
                      </AlertTitle>
                      <AlertDescription>
                        En esta preview no se agrega manejo real de roles o
                        permisos. Solo refleja el registro mobile actual.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    type="button"
                    className={MOBILE_SECONDARY_BUTTON_CLASS}
                    onClick={() => goStep(-1)}
                    disabled={activeIndex === 0}
                  >
                    <ArrowBigLeft className="size-4" />
                    Volver
                  </Button>
                  {activeIndex < STEPS.length - 1 ? (
                    <Button
                      type="button"
                      className={MOBILE_SECONDARY_BUTTON_CLASS}
                      onClick={() => goStep(1)}
                    >
                      Siguiente
                      <ArrowBigRight className="size-4" />
                    </Button>
                  ) : null}
                </div>

                <Button type="submit" className={MOBILE_PRIMARY_BUTTON_CLASS}>
                  Crear usuario
                  <UserPlus className="size-4" />
                </Button>
              </form>
            </Tabs>
          </div>
        </section>
      </div>
    </BrandMobileShell>
  );
}

type PreviewFieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function PreviewField({ label, error, children }: PreviewFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-white/74">{label}</Label>
      {children}
      {error ? <p className="text-xs font-medium text-red-300">{error}</p> : null}
    </div>
  );
}

type PreviewSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  error?: string;
};

function PreviewSelect({
  label,
  value,
  onChange,
  options,
  error,
}: PreviewSelectProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-white/74">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={MOBILE_INPUT_CLASS}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option.replaceAll("_", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? <p className="text-xs font-medium text-red-300">{error}</p> : null}
    </div>
  );
}

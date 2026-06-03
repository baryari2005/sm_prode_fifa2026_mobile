"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, User } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FormTextField } from "@/features/auth/components/form-text-field";
import { PasswordInput } from "@/features/auth/components/password-input";
import { SubmitButton } from "@/features/auth/components/submit-button";
import type { LoginFormValues } from "@/features/auth/schemas/auth.schema";

type MobileLoginFormProps = {
  form: UseFormReturn<LoginFormValues>;
  error: string | null;
  loading: boolean;
  onSubmit: (values: LoginFormValues) => void | Promise<void>;
};

const LOGIN_INPUT_CLASS =
  "h-11 rounded-2xl border !border-white/18 !bg-[rgba(11,39,69,0.78)] pr-5 text-sm font-medium " +
  "!text-white placeholder:!text-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md " +
  "transition-[color,box-shadow,background-color,border-color] duration-200 focus-visible:!border-[#7EDCFF]/35 " +
  "focus-visible:!ring-[#7EDCFF]/20 [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_rgba(11,39,69,0.96)_inset] " +
  "[&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:caret-white " +
  "[&:-webkit-autofill]:[transition:background-color_9999s_ease-out_0s] " +
  "[&:-webkit-autofill:hover]:[box-shadow:0_0_0_1000px_rgba(11,39,69,0.96)_inset] " +
  "[&:-webkit-autofill:focus]:[box-shadow:0_0_0_1000px_rgba(11,39,69,0.96)_inset] " +
  "[&:-webkit-autofill:active]:[box-shadow:0_0_0_1000px_rgba(11,39,69,0.96)_inset]";

const LOGIN_BUTTON_CLASS =
  "mt-2 h-12 w-full rounded-full border border-[#E7B03A] bg-[#FAB438] px-4 py-2 text-base font-semibold text-[#1E2C46] shadow-[0_8px_18px_rgba(12,24,41,0.22),0_16px_40px_rgba(250,180,56,0.22),inset_0_1px_0_rgba(255,244,214,0.42)] transition-all duration-200 hover:bg-[#F7C45A] hover:shadow-[0_10px_20px_rgba(12,24,41,0.24),0_18px_42px_rgba(250,180,56,0.30),0_26px_52px_rgba(250,180,56,0.16),inset_0_1px_0_rgba(255,248,224,0.5)] focus-visible:ring-[#FAB438]/35 active:scale-[0.985]";

const LOGIN_LINK_CLASS =
  "inline-flex h-auto cursor-pointer items-center justify-center rounded-xl p-0 text-sm font-semibold text-[#AEEBFF] underline-offset-4 outline-none transition-all duration-200 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 hover:text-white hover:underline";

export function MobileLoginForm({
  form,
  error,
  loading,
  onSubmit,
}: MobileLoginFormProps) {
  return (
    <form className="mt-auto space-y-2 pt-8 sm:pt-10" onSubmit={form.handleSubmit(onSubmit)}>
      {error ? (
        <Alert className="rounded-3xl border-red-400/35 bg-red-500/15 text-red-100 backdrop-blur-md flex flex-col items-center">
          <AlertTitle className="text-white obje">No pudimos iniciar sesión.</AlertTitle>
          <AlertDescription className="text-white">{error}</AlertDescription>
        </Alert>
      ) : null}

      <FormTextField
        id="identifier"
        label=""
        autoComplete="username"        
        error={form.formState.errors.identifier?.message}
        leftIcon={<User className="h-4 w-4" />}
        className={LOGIN_INPUT_CLASS}
        {...form.register("identifier")}
      />

      <div className="pb-5">        
        <PasswordInput
          id="password"
          autoComplete="current-password"
          aria-invalid={Boolean(form.formState.errors.password)}          
          leftIcon={<Lock className="h-4 w-4" />}
          className={LOGIN_INPUT_CLASS}
          {...form.register("password")}
        />

        {form.formState.errors.password ? (
          <p className="text-xs font-semibold text-red-300">
            {form.formState.errors.password.message}
          </p>
        ) : null}
      </div>

      <SubmitButton
        className={LOGIN_BUTTON_CLASS}
        loading={loading}
        loadingLabel="Ingresando..."
        iconPosition="right"
        icon={
          <Image
            src="/ico/pelota.ico"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
            className="h-5 w-5 object-contain"
          />
        }
      >
        Entrar a la cancha
      </SubmitButton>

      <p className="pt-1 text-center">
        <Link href="/register" className={LOGIN_LINK_CLASS}>
          Solicita tu acceso
        </Link>
      </p>
    </form>
  );
}

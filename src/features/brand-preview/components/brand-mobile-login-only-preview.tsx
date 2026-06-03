"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Lock, LogIn, ShieldCheck, Sparkles, User } from "lucide-react";
import { PasswordInput } from "@/features/auth/components/password-input";
import { FormTextField } from "@/features/auth/components/form-text-field";
import type { LoginFormValues } from "@/features/auth/schemas/auth.schema";
import {
  BrandMasWatermark,
  BrandProdeImage,
  BrandSunWatermark,
} from "@/features/brand-preview/components/brand-images";

export function BrandMobileLoginOnlyPreview() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      identifier: "admin",
      password: "123456",
    },
  });

  async function handleSubmit() {
    return;
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#062315] px-5 py-7 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,35,21,0.82)_0%,rgba(4,24,15,0.94)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(89,147,182,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute right-[-46px] top-[-10px] opacity-[0.08]">
        <BrandSunWatermark className="w-[260px] h-auto" />
      </div>
      <div className="pointer-events-none absolute bottom-6 left-6 opacity-[0.08]">
        <BrandMasWatermark className="w-[180px] h-auto" />
      </div>

      <div className="relative mx-auto w-full max-w-[335px]">
        <div className="mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#fab438]/75 bg-[#17331f] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em] text-[#fab438]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Acceso privado
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2.35rem] border border-white/45 bg-[linear-gradient(180deg,rgba(8,38,27,0.92)_0%,rgba(4,24,15,0.98)_100%)] px-4 pb-6 pt-5 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: "url('/brand/pattern.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(89,147,182,0.12),transparent_65%)]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-[#183525]/50 shadow-lg backdrop-blur-md">
                <div className="text-center leading-none">
                  <p className="text-[11px] font-black text-white">Prode</p>
                </div>
              </div>

              <div>
                <h1 className="text-[30px] font-black leading-none tracking-tight text-white">
                  Iniciar sesión
                </h1>
                <p className="mt-2 text-sm font-semibold text-white/82">
                  Ingresá tus datos para acceder al prode.
                </p>
              </div>
            </div>

            <div className="pointer-events-none relative mt-5 h-[330px] overflow-visible">
              <div className="absolute left-1/2 top-[58%] z-[1] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 opacity-[0.45]">
                <BrandProdeImage
                  fill
                  className="scale-[1.18] object-contain object-center blur-[28px]"
                />
              </div>
              <div className="absolute left-1/2 top-[70%] z-[1] h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 opacity-[0.32]">
                <BrandProdeImage
                  fill
                  className="scale-[1.34] object-contain object-center blur-[42px]"
                />
              </div>
              <div className="absolute left-1/2 top-[55%] z-[2] h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2">
                <BrandProdeImage
                  fill
                  className="object-contain object-center drop-shadow-[0_26px_36px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>

            <form className="-mt-6 space-y-3" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormTextField
                id="identifier"
                label=""
                autoComplete="username"
                error={form.formState.errors.identifier?.message}
                leftIcon={<User className="h-4 w-4" />}
                className="h-[50px] rounded-4xl border-white/16 bg-[#dfe8fb] pr-4 text-sm font-semibold text-[#1e2c46] placeholder:text-[#74829a] shadow-[0_10px_20px_rgba(0,0,0,0.14)]"
                {...form.register("identifier")}
              />

              <div className="space-y-2">
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(form.formState.errors.password)}
                  leftIcon={<Lock className="h-4 w-4" />}
                  className="h-[50px] rounded-4xl border-white/16 bg-[#dfe8fb] pr-12 text-sm font-semibold text-[#1e2c46] placeholder:text-[#74829a] shadow-[0_10px_20px_rgba(0,0,0,0.14)]"
                  {...form.register("password")}
                />
              </div>

              <button className="mt-2 flex h-12 w-full items-center justify-center gap-3 rounded-4xl bg-[#39A935] text-sm font-semibold text-white shadow-[0_12px_28px_rgba(57,169,53,0.34)] transition hover:bg-[#43b73f]">
                <LogIn className="h-4 w-4" />
                Ingresar al Prode
              </button>

              <p className="pt-2 text-center text-sm font-black text-[#fab438]">
                <Link href="/register" className="hover:text-white">
                  Solicitar acceso
                </Link>
              </p>
            </form>
          </div>
        </section>

        <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-[#fab438]/75 bg-[#17331f] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#fab438]">
          <span className="flex h-4 w-4 items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </span>
          Presentado por Más San Miguel
        </div>

        <p className="mt-4 text-center text-sm font-black tracking-[0.18em] text-white/72">
          PRODE MUNDIAL 2026
        </p>
      </div>
    </main>
  );
}

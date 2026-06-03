"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MobileLoginForm } from "@/features/auth/components/mobile-login-form";
import { MobileLoginShell } from "@/features/auth/components/mobile-login-shell";
import {
  type LoginFormValues,
  loginSchema,
} from "@/features/auth/schemas/auth.schema";
import { useAuthStore } from "@/stores/auth.store";

export default function LoginPage() {
  const router = useRouter();

  const {
    login,
    fetchMe,
    isAuthenticated,
    loading,
    error,
    clearError,
    initialized,
  } = useAuthStore();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!initialized) {
      void fetchMe({ silent: true });
    }
  }, [fetchMe, initialized]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/inicio");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  async function onSubmit(values: LoginFormValues) {
    clearError();

    try {
      await login({
        password: values.password,
        ...(values.identifier.includes("@")
          ? { email: values.identifier }
          : { userId: values.identifier }),
      });

      toast.success("Sesión iniciada correctamente.");
      router.replace("/inicio");
    } catch {
      return;
    }
  }

  return (
    <MobileLoginShell>
      <MobileLoginForm
        form={form}
        error={error}
        loading={loading}
        onSubmit={onSubmit}
      />
    </MobileLoginShell>
  );
}

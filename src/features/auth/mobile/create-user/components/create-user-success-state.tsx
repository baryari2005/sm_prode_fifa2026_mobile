import { CheckCircle2, LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MOBILE_SECONDARY_BUTTON_CLASS } from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";

type CreateUserSuccessStateProps = {
  onBackToLogin: () => void;
};

export function CreateUserSuccessState({
  onBackToLogin,
}: CreateUserSuccessStateProps) {
  return (
    <div className="space-y-4">
      <Alert className="rounded-[1.35rem] border-emerald-300/20 bg-emerald-500/10 text-emerald-100">
        <CheckCircle2 className="size-4" />
        <AlertTitle>Solicitud enviada</AlertTitle>
        <AlertDescription>
          Tu usuario fue creado, ya podes ingresar al Prode Mundial 2026.
        </AlertDescription>
      </Alert>

      <Button
        type="button"
        className={MOBILE_SECONDARY_BUTTON_CLASS}
        onClick={onBackToLogin}
      >
        <LogIn className="size-4" />
        <span>Volver al login</span>
      </Button>
    </div>
  );
}

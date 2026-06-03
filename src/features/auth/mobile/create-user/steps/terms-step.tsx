import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FileText, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CreateUserStepSectionHeader } from "@/features/auth/mobile/create-user/components/create-user-step-section-header";
import { STEPS } from "@/features/auth/mobile/create-user/constants/create-user-mobile.constants";
import {
  MOBILE_PRIMARY_BUTTON_CLASS,
  MOBILE_SECONDARY_BUTTON_CLASS,
  MOBILE_SECTION_CLASS,
} from "@/features/auth/mobile/create-user/styles/create-user-mobile.styles";
import type { RegisterSchemaValues } from "@/features/auth/schemas/auth.schema";
import { useIosStandalone } from "@/lib/use-ios-standalone";

type TermsStepProps = {
  form: UseFormReturn<RegisterSchemaValues>;
  watchedAcceptedTerms: boolean;
};

const TERMS_TEXT = [
  "El acceso al sistema es personal e intransferible.",
  "La participación en el Prode Mundial 2026 está reservada únicamente para personas residentes en San Miguel.",
  "Solo podrán participar y mantenerse habilitados los usuarios que residan en San Miguel y cuya solicitud haya sido revisada y aprobada por la administración.",
  "La información cargada debe ser veraz, completa y mantenerse actualizada.",
  "La solicitud de acceso quedará sujeta a revisión y aprobación por parte de un administrador, que validará que la persona resida en San Miguel.",
  "El uso del sistema implica aceptar las políticas internas de seguridad, confidencialidad y tratamiento de datos vigentes en la organización.",
  "El incumplimiento de estas condiciones podrá derivar en la suspensión o revocación del acceso.",
];

function TermsContent() {
  return (
    <div className="max-h-[52svh] space-y-3 overflow-y-auto px-4 pb-2 pr-3">
      {TERMS_TEXT.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-6 text-white/78">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function TermsStep({ form, watchedAcceptedTerms }: TermsStepProps) {
  const step = STEPS[4];
  const [termsOpen, setTermsOpen] = useState(false);
  const isIosStandalone = useIosStandalone();

  return (
    <div className={`${MOBILE_SECTION_CLASS} space-y-4`}>
      <CreateUserStepSectionHeader
        title={step.sectionTitle}
        icon={<ShieldCheck className="size-4" />}
      />

      <Button
        type="button"
        className={`${MOBILE_SECONDARY_BUTTON_CLASS} w-full touch-pan-y justify-between px-4`}
        onClick={() => setTermsOpen(true)}
      >
        <span className="inline-flex items-center gap-2">
          <FileText className="size-4" />
          Bases y condiciones
        </span>
        <span className="text-[#AEEBFF]">Ver</span>
      </Button>

      <label className="flex items-start gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white/74">
        <input
          type="checkbox"
          checked={watchedAcceptedTerms}
          onChange={(event) =>
            form.setValue("acceptedTerms", event.target.checked, {
              shouldTouch: true,
              shouldValidate: true,
            })
          }
          className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/30 bg-transparent accent-[#5993B6]"
        />
        <span>Leí y acepto las bases y condiciones para solicitar acceso.</span>
      </label>

      {form.formState.errors.acceptedTerms ? (
        <p className="text-xs font-medium text-red-300">
          {form.formState.errors.acceptedTerms.message}
        </p>
      ) : null}

      {isIosStandalone ? (
        <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
          <DialogContent
            showCloseButton={false}
            className="max-h-[82svh] max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#243750] p-0 text-white"
          >
            <DialogHeader className="px-4 pb-3 pt-5 text-left">
              <DialogTitle className="text-[#5993b6]">Bases y condiciones</DialogTitle>
              <DialogDescription className="text-white/65">
                Leé las condiciones necesarias para solicitar tu acceso.
              </DialogDescription>
            </DialogHeader>

            <TermsContent />

            <DialogFooter className="border-t border-white/10 px-4 py-4 sm:flex-col">
              <Button
                type="button"
                className={`${MOBILE_PRIMARY_BUTTON_CLASS} h-11 w-full`}
                onClick={() => setTermsOpen(false)}
              >
                Entendido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={termsOpen} onOpenChange={setTermsOpen} repositionInputs={false}>
          <DrawerContent className="max-h-[82svh] border-white/10 bg-[#243750] text-white">
            <DrawerHeader className="text-left">
              <DrawerTitle className="text-[#5993b6]">Bases y condiciones</DrawerTitle>
              <DrawerDescription className="text-white/65">
                Leé las condiciones necesarias para solicitar tu acceso.
              </DrawerDescription>
            </DrawerHeader>

            <TermsContent />

            <DrawerFooter>
              <Button
                type="button"
                className={`${MOBILE_PRIMARY_BUTTON_CLASS} h-11 w-full`}
                onClick={() => setTermsOpen(false)}
              >
                Entendido
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

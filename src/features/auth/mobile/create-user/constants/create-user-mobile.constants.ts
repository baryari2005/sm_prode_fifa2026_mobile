import type { FieldPath } from "react-hook-form";
import type { RegisterSchemaValues } from "@/features/auth/schemas/auth.schema";

export const STEPS = [
  {
    value: "acceso",
    label: "Acceso",
    headerTitle: "Acceso a la cuenta",
    sectionTitle: "Datos de acceso",
    sectionDescription:
      "Creá tu usuario para ingresar al Prode cuando tu cuenta sea aprobada.",
  },
  {
    value: "datos",
    label: "Datos",
    headerTitle: "Datos personales",
    sectionTitle: "Datos personales",
    sectionDescription:
      "Completá tu nombre, apellido y celular para validar la solicitud.",
  },
  {
    value: "identificacion",
    label: "DNI",
    headerTitle: "Identificación",
    sectionTitle: "Identificación",
    sectionDescription: "Ingresá tu tipo y número de documento.",
  },
  {
    value: "domicilio",
    label: "Domicilio",
    headerTitle: "Domicilio",
    sectionTitle: "Domicilio",
    sectionDescription: "Indicá tu calle. El partido se registra como San Miguel.",
  },
  {
    value: "condiciones",
    label: "Confirmar",
    headerTitle: "Confirmación",
    sectionTitle: "Confirmación final",
    sectionDescription:
      "Revisá los datos cargados y aceptá las condiciones para enviar la solicitud.",
  },
] as const;

export type StepValue = (typeof STEPS)[number]["value"];

export const STEP_FIELDS: Record<StepValue, FieldPath<RegisterSchemaValues>[]> = {
  acceso: ["userId", "email", "password"],
  datos: ["nombre", "apellido", "celular"],
  identificacion: ["tipoDocumento", "documento"],
  domicilio: ["domicilio"],
  condiciones: ["acceptedTerms"],
};

export const FIELD_TO_STEP = Object.entries(STEP_FIELDS).reduce(
  (acc, [step, fields]) => {
    fields.forEach((field) => {
      acc[field] = step as StepValue;
    });
    return acc;
  },
  {} as Record<string, StepValue>
);

export const STEP_INDEX = STEPS.reduce(
  (acc, step, index) => {
    acc[step.value] = index;
    return acc;
  },
  {} as Record<StepValue, number>
);

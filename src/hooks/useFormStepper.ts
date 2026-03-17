import { useState, useCallback, useEffect } from "react";
import { z } from "zod";

// --- Validation Schemas ---
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

const step1Schema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  cpf: z.string().trim().regex(cpfRegex, "CPF inválido (ex: 000.000.000-00)"),
  email: z.string().trim().email("E-mail inválido").max(255),
  celular: z.string().trim().regex(phoneRegex, "Celular inválido (ex: (11) 99999-9999)"),
});

const step2SchemaBase = z.object({
  necessidade: z.enum(["atestado", "teleconsulta"] as const, { message: "Selecione uma opção" }),
});

const step2SchemaAtestado = step2SchemaBase.extend({
  necessidade: z.literal("atestado"),
  sintomaOpcao: z.string().trim().min(1, "Selecione um sintoma"),
  sintomas: z.string().trim().min(1, "Descreva os sintomas"),
  tempoInicio: z.string().trim().min(1, "Informe quando os sintomas começaram"),
});

const step2SchemaTeleconsulta = step2SchemaBase.extend({
  necessidade: z.literal("teleconsulta"),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2DataAtestado = {
  necessidade: "atestado";
  sintomaOpcao: string;
  sintomas: string;
  tempoInicio: string;
  viaTelemed: boolean;
};
export type Step2Data = Step2DataAtestado | { necessidade: "teleconsulta" };

export interface PixData {
  brCode: string;
  qrCodeImage: string;
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
}

const CHARGE_API_URL = "https://health-gateway.vercel.app/api/charge";
const MAX_STEP = 4;

export function useFormStepper() {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Data>({ nome: "", cpf: "", email: "", celular: "" });
  const [step2Data, setStep2Data] = useState<Step2Data>({ necessidade: "atestado", sintomaOpcao: "", sintomas: "", tempoInicio: "", viaTelemed: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // --- Browser History API ---
  useEffect(() => {
    if (step > 0) {
      window.history.pushState({ step }, "", window.location.pathname);
    }
  }, [step]);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const prevStep = e.state?.step ?? 0;
      setErrors({});
      setStep(prevStep);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const validateStep1 = useCallback(() => {
    const result = step1Schema.safeParse(step1Data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [step1Data]);

  const validateStep2 = useCallback(() => {
    if (step2Data.necessidade === "atestado") {
      const result = step2SchemaAtestado.safeParse(step2Data);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
        setErrors(fieldErrors);
        return false;
      }
    } else {
      const result = step2SchemaTeleconsulta.safeParse(step2Data);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
        setErrors(fieldErrors);
        return false;
      }
    }
    setErrors({});
    return true;
  }, [step2Data]);

  const goNext = useCallback(() => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, MAX_STEP));
  }, [step, validateStep1, validateStep2]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const startForm = useCallback(() => {
    window.history.pushState({ step: 1 }, "", window.location.pathname);
    setStep(1);
  }, []);

  const submitPayment = useCallback(async () => {
    setIsProcessing(true);
    setPaymentError(null);
    try {
      const atestado = step2Data.necessidade === "atestado" ? step2Data : null;
      const response = await fetch(CHARGE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            nome: step1Data.nome,
            cpf: step1Data.cpf,
            email: step1Data.email,
            celular: step1Data.celular,
          },
          service: {
            necessidade: step2Data.necessidade,
            ...(atestado && {
              sintomas: atestado.sintomas,
              tempoInicio: atestado.tempoInicio,
            }),
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message ?? `Erro ${response.status}: falha ao processar pagamento.`);
      }

      const data = await response.json();
      setPixData({ brCode: data.brCode, qrCodeImage: data.qrCodeImage });
      setIsSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao conectar com o servidor. Tente novamente.";
      setPaymentError(message);
    } finally {
      setIsProcessing(false);
    }
  }, [step1Data, step2Data]);

  return {
    step, step1Data, step2Data, errors, isSuccess, isProcessing, pixData, paymentError,
    setStep1Data, setStep2Data, goNext, goBack, startForm, submitPayment, setErrors,
  };
}

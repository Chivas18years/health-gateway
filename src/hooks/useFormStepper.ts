import { useState, useCallback } from "react";
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
  sintomas: z.string().trim().min(10, "Descreva os sintomas com mais detalhes (mín. 10 caracteres)").max(1000),
  tempoInicio: z.string().trim().min(1, "Informe quando os sintomas começaram"),
});

const step2SchemaTeleconsulta = step2SchemaBase.extend({
  necessidade: z.literal("teleconsulta"),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = { necessidade: "atestado"; sintomas: string; tempoInicio: string } | { necessidade: "teleconsulta" };

export interface PixData {
  brCode: string;
  qrCodeImage: string;
}

export interface FormData {
  step1: Step1Data;
  step2: Step2Data;
}

const CHARGE_API_URL = "https://health-gateway.vercel.app/api/charge";

export function useFormStepper() {
  const [step, setStep] = useState(0);
  const [step1Data, setStep1Data] = useState<Step1Data>({ nome: "", cpf: "", email: "", celular: "" });
  const [step2Data, setStep2Data] = useState<Step2Data>({ necessidade: "atestado", sintomas: "", tempoInicio: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

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
    const schema = step2Data.necessidade === "atestado" ? step2SchemaAtestado : step2SchemaTeleconsulta;
    const result = schema.safeParse(step2Data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }, [step2Data]);

  const goNext = useCallback(() => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, 3));
  }, [step, validateStep1, validateStep2]);

  const goBack = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const startForm = useCallback(() => setStep(1), []);

  const submitPayment = useCallback(async () => {
    setIsProcessing(true);
    setPaymentError(null);
    try {
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
            ...(step2Data.necessidade === "atestado" && {
              sintomas: step2Data.sintomas,
              tempoInicio: step2Data.tempoInicio,
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

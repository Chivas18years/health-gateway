import { useState } from "react";
import { QrCode, Copy, Check, Lock, Loader2 } from "lucide-react";
import type { Step2Data } from "@/hooks/useFormStepper";

interface StepCheckoutProps {
  necessidade: Step2Data["necessidade"];
  isProcessing: boolean;
  onPay: () => void;
  onBack: () => void;
}

const PIX_CODE = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540559.905802BR5925MEDDIGITAL SERVICOS MEDIC6009SAO PAULO62070503***6304ABCD";

const StepCheckout = ({ necessidade, isProcessing, onPay, onBack }: StepCheckoutProps) => {
  const [copied, setCopied] = useState(false);

  const valor = necessidade === "atestado" ? "R$ 59,90" : "R$ 89,90";
  const descricao = necessidade === "atestado" ? "Avaliação de Sintomas + Atestado Médico" : "Teleconsulta por Videoconferência";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = PIX_CODE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Pagamento via PIX</h2>
      <p className="text-sm text-muted-foreground mb-6">Escaneie o QR Code ou copie o código para pagar.</p>

      {/* Order summary */}
      <div className="rounded-xl border border-border bg-surface p-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-foreground">{descricao}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Pagamento único</p>
          </div>
          <span className="text-lg font-bold text-foreground">{valor}</span>
        </div>
      </div>

      {/* QR Code placeholder */}
      <div className="flex flex-col items-center py-8 rounded-xl border border-dashed border-border bg-muted/30 mb-4">
        <div className="w-40 h-40 rounded-xl bg-muted flex items-center justify-center mb-3">
          <QrCode className="w-20 h-20 text-muted-foreground/40" />
        </div>
        <p className="text-xs text-muted-foreground">QR Code PIX · Woovi</p>
      </div>

      {/* Copy PIX code */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors mb-6"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-primary" />
            Código copiado!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copiar Código PIX
          </>
        )}
      </button>

      {/* Pay button (simulates Woovi /api/v1/charge) */}
      <button
        onClick={onPay}
        disabled={isProcessing}
        className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processando pagamento...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Confirmar Pagamento
          </>
        )}
      </button>

      <button
        onClick={onBack}
        disabled={isProcessing}
        className="w-full mt-3 h-10 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
      >
        Voltar
      </button>

      <p className="text-[11px] text-center text-muted-foreground mt-4 leading-relaxed">
        Pagamento processado com segurança via Woovi. Seus dados estão protegidos.
      </p>
    </div>
  );
};

export default StepCheckout;

import { Lock, ShieldCheck, Stethoscope, CheckCircle2, ArrowRight } from "lucide-react";
import type { Step1Data, Step2Data } from "@/hooks/useFormStepper";

interface StepConfirmacaoProps {
  step1Data: Step1Data;
  step2Data: Step2Data;
  onConfirm: () => void;
  onBack: () => void;
}

function maskCpf(cpf: string): string {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11) return cpf;
  return `${digits.slice(0, 3)}.***.***-${digits.slice(9)}`;
}

function formatDate(): string {
  return new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const StepConfirmacao = ({ step1Data, step2Data, onConfirm, onBack }: StepConfirmacaoProps) => {
  const isAtestado = step2Data.necessidade === "atestado";
  const cpfMasked = maskCpf(step1Data.cpf);
  const today = formatDate();

  const atestadoData = isAtestado
    ? (step2Data as { necessidade: "atestado"; sintomas: string; tempoInicio: string; viaTelemed: boolean })
    : null;

  const sintomas = atestadoData?.sintomas ?? "";
  const tempoInicio = atestadoData?.tempoInicio ?? "";
  const viaTelemed = atestadoData?.viaTelemed ?? true;
  const modalidadeTexto = viaTelemed ? "via telemedicina" : "em consulta médica";

  const valor = isAtestado ? "R$ 59,90" : "R$ 89,90";
  const servicoLabel = isAtestado ? "Atestado Médico" : "Teleconsulta por Videoconferência";

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Confira seu documento</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Revise os dados abaixo antes de confirmar o pagamento.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Certificate Preview ── */}
        <div className="lg:col-span-3 relative">
          <div
            className="relative rounded-xl overflow-hidden border border-border bg-white text-foreground"
            style={{ boxShadow: "0 4px 24px hsl(220 20% 14% / 0.10), 0 1px 4px hsl(220 20% 14% / 0.06)" }}
          >
            {/* Watermark */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none"
              aria-hidden="true"
            >
              <span
                className="text-[13px] font-black tracking-[0.25em] uppercase opacity-[0.07] text-foreground"
                style={{
                  transform: "rotate(-35deg)",
                  whiteSpace: "nowrap",
                  fontSize: "clamp(11px, 2.2vw, 15px)",
                  letterSpacing: "0.2em",
                  lineHeight: "1.6",
                }}
              >
                AMOSTRA — AGUARDANDO LIBERAÇÃO
                <br />
                AMOSTRA — AGUARDANDO LIBERAÇÃO
                <br />
                AMOSTRA — AGUARDANDO LIBERAÇÃO
              </span>
            </div>

            {/* Header */}
            <div className="border-b border-border/60 px-5 py-4 flex items-center justify-between bg-primary/[0.03]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-foreground leading-tight">MedDigital</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">Telemedicina</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-white px-2.5 py-1">
                <ShieldCheck className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-semibold text-muted-foreground tracking-wide uppercase">
                  Autenticado via ICP-Brasil
                </span>
              </div>
            </div>

            {/* Document body */}
            <div className="px-5 py-5 space-y-4">
              {/* Doc type */}
              <div className="text-center">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  {isAtestado ? "Atestado Médico" : "Confirmação de Teleconsulta"}
                </p>
                <div className="mt-1 h-[1.5px] w-12 mx-auto bg-primary/40 rounded-full" />
              </div>

              {/* Main text */}
              <div className="text-[12px] leading-relaxed text-foreground/80 space-y-2">
                {isAtestado ? (
                  <>
                    <p>
                      Atesto que o(a) Sr(a).{" "}
                      <strong className="text-foreground">{step1Data.nome || "_______________"}</strong>, portador(a) do
                      CPF <strong className="text-foreground">{cpfMasked}</strong>, compareceu à consulta médica
                      realizada <strong className="text-foreground">{modalidadeTexto}</strong> nesta data e apresentou os seguintes sintomas:
                    </p>
                    <p className="rounded-lg bg-muted/60 border border-border/50 px-3 py-2 italic text-foreground/70">
                      "{sintomas || "Sintomas não informados."}"
                    </p>
                    <p>
                      O paciente relatou início dos sintomas{" "}
                      <strong className="text-foreground">{tempoInicio ? `há ${tempoInicio}` : "___"}</strong>. Recomendo repouso pelo
                      período necessário para sua recuperação.
                    </p>
                    <p>
                      Atestado emitido em{" "}
                      <strong className="text-foreground">{today}</strong>, através da plataforma
                      MedDigital, conforme resolução CFM nº 2.227/2018.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Confirmamos o agendamento da teleconsulta para o(a) Sr(a).{" "}
                      <strong className="text-foreground">{step1Data.nome || "_______________"}</strong>, CPF{" "}
                      <strong className="text-foreground">{cpfMasked}</strong>.
                    </p>
                    <p>
                      Após confirmação do pagamento, você receberá em{" "}
                      <strong className="text-foreground">{step1Data.email}</strong> o link de
                      acesso à consulta por videoconferência com médico habilitado pelo CFM.
                    </p>
                    <p>
                      Consulta registrada em{" "}
                      <strong className="text-foreground">{today}</strong>.
                    </p>
                  </>
                )}
              </div>

              {/* Patient info row */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-md bg-muted/50 border border-border/40 px-3 py-2">
                  <p className="text-muted-foreground mb-0.5 uppercase tracking-wide text-[9px] font-semibold">Paciente</p>
                  <p className="font-semibold text-foreground truncate">{step1Data.nome || "—"}</p>
                </div>
                <div className="rounded-md bg-muted/50 border border-border/40 px-3 py-2">
                  <p className="text-muted-foreground mb-0.5 uppercase tracking-wide text-[9px] font-semibold">CPF</p>
                  <p className="font-semibold text-foreground">{cpfMasked}</p>
                </div>
              </div>

              {/* Signature area – LOCKED */}
              <div className="mt-2 rounded-xl border-2 border-dashed border-border bg-muted/40 px-4 py-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-foreground/70 uppercase tracking-wide">
                    Assinatura Médica Bloqueada
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                    Liberação imediata após confirmação do Pix
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action Panel ── */}
        <div className="lg:col-span-2 flex flex-col justify-between gap-4">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h3 className="text-[15px] font-bold text-foreground leading-tight">
                  Tudo pronto! Seu documento já foi gerado.
                </h3>
                <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">
                  Confira os dados ao lado. Se estiverem corretos, clique abaixo para gerar o QR Code Pix e receber
                  o documento original em instantes.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-surface px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-foreground">{servicoLabel}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Pagamento único · PIX</p>
                </div>
                <span className="text-base font-bold text-foreground">{valor}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, text: "Dados protegidos" },
                { icon: Lock, text: "Pagamento seguro" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground border border-border/60 rounded-full px-2.5 py-1 bg-background"
                >
                  <Icon className="w-3 h-3" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onConfirm}
            className="w-full rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary-hover transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-elevated"
            style={{ height: "52px" }}
          >
            Confirmar e Gerar Pix
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onBack}
            className="w-full h-10 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Voltar e editar dados
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepConfirmacao;

import { FileText, Video, MessageSquare, CalendarClock } from "lucide-react";
import type { Step2Data } from "@/hooks/useFormStepper";

interface StepTriagemProps {
  data: Step2Data;
  errors: Record<string, string>;
  onChange: (data: Step2Data) => void;
  onNext: () => void;
  onBack: () => void;
}

const SINTOMA_OPTIONS = [
  "Dor de Cabeça",
  "Sintomas Gripais",
  "Dores Musculares",
  "Indisposição Gastrointestinal",
  "Outros",
];

const StepTriagem = ({ data, errors, onChange, onNext, onBack }: StepTriagemProps) => {
  const isAtestado = data.necessidade === "atestado";
  const atestadoData = isAtestado
    ? (data as { necessidade: "atestado"; sintomas: string; sintomaOpcao: string; tempoInicio: string; viaTelemed: boolean })
    : null;

  const sintomaOpcao = atestadoData?.sintomaOpcao ?? "";
  const sintomas = atestadoData?.sintomas ?? "";
  const tempoInicio = atestadoData?.tempoInicio ?? "";
  const viaTelemed = atestadoData?.viaTelemed ?? true;

  function patchAtestado(patch: Partial<{ sintomas: string; sintomaOpcao: string; tempoInicio: string; viaTelemed: boolean }>) {
    onChange({
      necessidade: "atestado",
      sintomas: sintomas,
      sintomaOpcao: sintomaOpcao,
      tempoInicio: tempoInicio,
      viaTelemed: viaTelemed,
      ...patch,
    } as any);
  }

  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold text-foreground mb-1">O que você precisa hoje?</h2>
      <p className="text-sm text-muted-foreground mb-6">Selecione o tipo de atendimento desejado.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {[
          { value: "atestado" as const, label: "Análise de Sintomas / Atestado", icon: FileText, desc: "Avaliação e documento médico" },
          { value: "teleconsulta" as const, label: "Agendar Teleconsulta", icon: Video, desc: "Consulta por videoconferência" },
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() =>
              onChange(
                opt.value === "atestado"
                  ? { necessidade: "atestado", sintomas: "", sintomaOpcao: "", tempoInicio: "", viaTelemed: true } as any
                  : { necessidade: "teleconsulta" }
              )
            }
            className={`flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              data.necessidade === opt.value
                ? "border-primary bg-primary-light"
                : "border-border hover:border-muted-foreground/30 bg-background"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${
              data.necessidade === opt.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              <opt.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-foreground">{opt.label}</span>
            <span className="text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
          </button>
        ))}
      </div>
      {errors.necessidade && <p className="text-xs text-destructive mb-4">{errors.necessidade}</p>}

      {isAtestado && (
        <div className="space-y-4 animate-fade-up">
          {/* Symptom selector */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <MessageSquare className="inline w-4 h-4 mr-1 -mt-0.5 text-muted-foreground" />
              Selecione o sintoma principal
            </label>
            <div className="flex flex-wrap gap-2">
              {SINTOMA_OPTIONS.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => patchAtestado({ sintomaOpcao: op, sintomas: op !== "Outros" ? op : "" })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                    sintomaOpcao === op
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
            {errors.sintomas && <p className="text-xs text-destructive mt-1">{errors.sintomas}</p>}
          </div>

          {/* Free text only for "Outros" */}
          {sintomaOpcao === "Outros" && (
            <div className="animate-fade-up">
              <label className="block text-sm font-medium text-foreground mb-1.5">Descreva seus sintomas</label>
              <textarea
                value={sintomas}
                onChange={(e) => patchAtestado({ sintomas: e.target.value })}
                placeholder="Ex: Dor de cabeça intensa, febre e dor no corpo..."
                rows={3}
                className={`w-full p-3 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary resize-none transition-colors ${
                  errors.sintomas ? "border-destructive" : "border-input"
                }`}
              />
              {errors.sintomas && <p className="text-xs text-destructive mt-1">{errors.sintomas}</p>}
            </div>
          )}

          {/* Início dos sintomas */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <CalendarClock className="inline w-4 h-4 mr-1 -mt-0.5 text-muted-foreground" />
              Quando os sintomas começaram?
            </label>
            <input
              type="text"
              value={tempoInicio}
              onChange={(e) => patchAtestado({ tempoInicio: e.target.value })}
              placeholder="Ex: Há 2 dias"
              className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-colors ${
                errors.tempoInicio ? "border-destructive" : "border-input"
              }`}
            />
            {errors.tempoInicio && <p className="text-xs text-destructive mt-1">{errors.tempoInicio}</p>}
          </div>

          {/* Telemedicina toggle */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Exibir "via Telemedicina" no atestado?</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {viaTelemed ? 'Aparecerá: "via telemedicina"' : 'Aparecerá: "em consulta médica"'}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={viaTelemed}
              onClick={() => patchAtestado({ viaTelemed: !viaTelemed })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring/30 ${
                viaTelemed ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ${
                  viaTelemed ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 h-12 rounded-lg border border-border bg-background text-foreground font-medium text-sm hover:bg-muted transition-colors"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          className="flex-1 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors active:scale-[0.99]"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default StepTriagem;

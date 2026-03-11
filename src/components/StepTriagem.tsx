import { FileText, Video, MessageSquare, CalendarClock } from "lucide-react";
import type { Step2Data } from "@/hooks/useFormStepper";

interface StepTriagemProps {
  data: Step2Data;
  errors: Record<string, string>;
  onChange: (data: Step2Data) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTriagem = ({ data, errors, onChange, onNext, onBack }: StepTriagemProps) => {
  const isAtestado = data.necessidade === "atestado";

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
                  ? { necessidade: "atestado", sintomas: isAtestado ? (data as any).sintomas || "" : "", tempoInicio: isAtestado ? (data as any).tempoInicio || "" : "" }
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
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <MessageSquare className="inline w-4 h-4 mr-1 -mt-0.5 text-muted-foreground" />
              Descreva seus sintomas
            </label>
            <textarea
              value={(data as any).sintomas || ""}
              onChange={(e) => onChange({ ...data, necessidade: "atestado", sintomas: e.target.value, tempoInicio: (data as any).tempoInicio || "" } as any)}
              placeholder="Ex: Dor de cabeça intensa, febre e dor no corpo..."
              rows={3}
              className={`w-full p-3 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary resize-none transition-colors ${
                errors.sintomas ? "border-destructive" : "border-input"
              }`}
            />
            {errors.sintomas && <p className="text-xs text-destructive mt-1">{errors.sintomas}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              <CalendarClock className="inline w-4 h-4 mr-1 -mt-0.5 text-muted-foreground" />
              Quando os sintomas começaram?
            </label>
            <input
              type="text"
              value={(data as any).tempoInicio || ""}
              onChange={(e) => onChange({ ...data, necessidade: "atestado", sintomas: (data as any).sintomas || "", tempoInicio: e.target.value } as any)}
              placeholder="Ex: Há 2 dias"
              className={`w-full h-11 px-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-colors ${
                errors.tempoInicio ? "border-destructive" : "border-input"
              }`}
            />
            {errors.tempoInicio && <p className="text-xs text-destructive mt-1">{errors.tempoInicio}</p>}
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

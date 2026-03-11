import { User, Mail, Phone, CreditCard } from "lucide-react";
import type { Step1Data } from "@/hooks/useFormStepper";

interface StepIdentificacaoProps {
  data: Step1Data;
  errors: Record<string, string>;
  onChange: (data: Step1Data) => void;
  onNext: () => void;
}

const fields = [
  { key: "nome" as const, label: "Nome completo", icon: User, placeholder: "Maria da Silva", type: "text" },
  { key: "cpf" as const, label: "CPF", icon: CreditCard, placeholder: "000.000.000-00", type: "text" },
  { key: "email" as const, label: "E-mail", icon: Mail, placeholder: "seu@email.com", type: "email" },
  { key: "celular" as const, label: "Celular / WhatsApp", icon: Phone, placeholder: "(11) 99999-9999", type: "tel" },
];

const StepIdentificacao = ({ data, errors, onChange, onNext }: StepIdentificacaoProps) => {
  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Seus dados</h2>
      <p className="text-sm text-muted-foreground mb-6">Precisamos de algumas informações para continuar.</p>

      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
            <div className="relative">
              <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={f.type}
                value={data[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => onChange({ ...data, [f.key]: e.target.value })}
                className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-colors ${
                  errors[f.key] ? "border-destructive" : "border-input"
                }`}
              />
            </div>
            {errors[f.key] && <p className="text-xs text-destructive mt-1">{errors[f.key]}</p>}
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full mt-6 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors active:scale-[0.99]"
      >
        Continuar
      </button>
    </div>
  );
};

export default StepIdentificacao;

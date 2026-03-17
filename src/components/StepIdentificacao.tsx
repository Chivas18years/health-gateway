import { User, Mail, Phone, CreditCard } from "lucide-react";
import type { Step1Data } from "@/hooks/useFormStepper";

interface StepIdentificacaoProps {
  data: Step1Data;
  errors: Record<string, string>;
  onChange: (data: Step1Data) => void;
  onNext: () => void;
}

function maskCpf(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  return value;
}

const StepIdentificacao = ({ data, errors, onChange, onNext }: StepIdentificacaoProps) => {
  return (
    <div className="animate-fade-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Seus dados</h2>
      <p className="text-sm text-muted-foreground mb-6">Precisamos de algumas informações para continuar.</p>

      <div className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nome completo</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={data.nome}
              placeholder="Maria da Silva"
              onChange={(e) => onChange({ ...data, nome: e.target.value })}
              className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-colors ${errors.nome ? "border-destructive" : "border-input"}`}
            />
          </div>
          {errors.nome && <p className="text-xs text-destructive mt-1">{errors.nome}</p>}
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">CPF</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              inputMode="numeric"
              value={data.cpf}
              placeholder="000.000.000-00"
              onChange={(e) => onChange({ ...data, cpf: maskCpf(e.target.value) })}
              className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-colors ${errors.cpf ? "border-destructive" : "border-input"}`}
            />
          </div>
          {errors.cpf && <p className="text-xs text-destructive mt-1">{errors.cpf}</p>}
        </div>

        {/* E-mail */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={data.email}
              placeholder="seu@email.com"
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-colors ${errors.email ? "border-destructive" : "border-input"}`}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        {/* Celular */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Celular / WhatsApp</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              inputMode="numeric"
              value={data.celular}
              placeholder="(11) 99999-9999"
              onChange={(e) => onChange({ ...data, celular: maskPhone(e.target.value) })}
              className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary transition-colors ${errors.celular ? "border-destructive" : "border-input"}`}
            />
          </div>
          {errors.celular && <p className="text-xs text-destructive mt-1">{errors.celular}</p>}
        </div>
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

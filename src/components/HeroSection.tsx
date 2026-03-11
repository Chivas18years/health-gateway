import { ShieldCheck, Clock, FileText, Video, Stethoscope, Lock } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-border/60">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">MedDigital</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span>Ambiente seguro</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="container px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Plataforma verificada por profissionais de saúde
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
              Avaliação Médica
              <br />
              <span className="text-primary">Digital</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              Relatórios e consultas de forma rápida e segura. Receba seu documento médico sem sair de casa.
            </p>

            <button
              onClick={onStart}
              className="inline-flex items-center justify-center h-13 px-8 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-hover transition-colors duration-200 shadow-elevated active:scale-[0.98]"
            >
              Iniciar Solicitação
            </button>

            <p className="mt-4 text-xs text-muted-foreground">
              Processo 100% online · Resultado em até 24h
            </p>
          </div>

          {/* Trust features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 max-w-3xl mx-auto">
            {[
              { icon: Clock, title: "Rápido", desc: "Preencha em menos de 3 minutos" },
              { icon: FileText, title: "Laudo Digital", desc: "Documento com validade legal" },
              { icon: Video, title: "Teleconsulta", desc: "Atendimento por videoconferência" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-6 rounded-xl bg-surface border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;

import { CheckCircle2, Mail, Clock } from "lucide-react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Pedido enviado com sucesso!</h1>

        <p className="text-muted-foreground leading-relaxed mb-8">
          Seu pedido foi enviado para análise médica. Você receberá o documento no e-mail informado.
        </p>

        <div className="rounded-xl border border-border bg-surface p-4 space-y-3 text-left">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Verifique seu e-mail</p>
              <p className="text-xs text-muted-foreground">O documento será enviado para o e-mail informado no cadastro.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Prazo de resposta</p>
              <p className="text-xs text-muted-foreground">Você receberá uma resposta em até 24 horas úteis.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-8 h-11 px-6 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-muted transition-colors"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;

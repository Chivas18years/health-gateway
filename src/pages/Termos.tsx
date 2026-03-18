import { Link } from "react-router-dom";
import { Stethoscope, Lock } from "lucide-react";

const Termos = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="w-full border-b border-border/60 bg-background">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">MedDigital</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ambiente seguro</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Termos de Uso e Política de Privacidade</h1>
        <p className="text-xs text-muted-foreground mb-8">Última atualização: março de 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-foreground">

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">1. Aceitação dos Termos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ao utilizar a plataforma MedDigital, você concorda com os presentes Termos de Uso e Política de Privacidade. Caso não concorde com qualquer disposição, recomendamos que não utilize nossos serviços. Estes termos estão em conformidade com a Lei nº 13.709/2018 (LGPD), o Código de Defesa do Consumidor (CDC) e as resoluções do Conselho Federal de Medicina (CFM) aplicáveis à telemedicina.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">2. Descrição dos Serviços</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A MedDigital oferece serviços de telemedicina, incluindo avaliação médica digital para emissão de atestados e teleconsultas por videoconferência. Os serviços são prestados por profissionais médicos devidamente habilitados junto ao CRM (Conselho Regional de Medicina) e autorizados para exercício da telemedicina, conforme legislação vigente.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">3. Dados Pessoais Coletados (LGPD)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Para prestação dos serviços, coletamos os seguintes dados pessoais, incluindo dados sensíveis de saúde nos termos do Art. 11 da LGPD:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Nome completo, CPF e e-mail (identificação e faturamento)</li>
              <li>Número de celular (contato e envio de documento)</li>
              <li>Sintomas e informações de saúde (prestação do serviço médico)</li>
              <li>Dados de pagamento processados de forma segura via Woovi/PIX</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">4. Finalidade e Base Legal do Tratamento</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Os dados coletados têm como finalidade exclusiva a prestação dos serviços contratados, comunicação com o titular e cumprimento de obrigações legais e regulatórias. O tratamento é fundamentado no consentimento do titular (Art. 7º, I da LGPD) e na execução de contrato (Art. 7º, V da LGPD). Dados de saúde são tratados com base no Art. 11, II, "f" da LGPD para tutela da saúde do titular.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">5. Compartilhamento de Dados</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seus dados não são vendidos ou cedidos a terceiros para fins comerciais. Podemos compartilhá-los com: (i) médicos vinculados à plataforma para execução do atendimento; (ii) processadores de pagamento para cobrança; (iii) autoridades regulatórias quando exigido por lei. Todo compartilhamento ocorre com cláusulas de sigilo e em conformidade com a LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">6. Segurança da Informação</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Adotamos medidas técnicas e organizacionais adequadas para proteção dos dados pessoais, incluindo criptografia em trânsito (TLS/HTTPS), controle de acesso baseado em funções e monitoramento de segurança. A autenticação de documentos é realizada via ICP-Brasil, conferindo validade jurídica aos atestados emitidos.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">7. Direitos do Titular</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Nos termos da LGPD (Art. 18), você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Confirmar a existência e acessar seus dados</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Obter informações sobre compartilhamento de dados</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Para exercer esses direitos, entre em contato via WhatsApp ou e-mail informados na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">8. Política de Cancelamento e Reembolso</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O direito de arrependimento previsto no Art. 49 do CDC (7 dias corridos) é aplicável para serviços contratados remotamente. Caso o atendimento ainda não tenha sido iniciado, o reembolso integral será processado em até 5 dias úteis. Após o início do atendimento, não há previsão de reembolso, salvo por falha técnica imputável à plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">9. Limitação de Responsabilidade</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A MedDigital atua como plataforma de intermediação entre pacientes e médicos independentes. A responsabilidade pelo conteúdo clínico dos atestados e laudos é dos profissionais médicos emissores, devidamente identificados nos documentos. A plataforma não se responsabiliza por decisões tomadas com base nos documentos emitidos fora do contexto médico adequado.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">10. Alterações nestes Termos</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reservamo-nos o direito de atualizar estes termos periodicamente. Alterações materiais serão comunicadas aos usuários por e-mail ou notificação na plataforma com antecedência mínima de 10 dias. O uso continuado após a vigência das novas condições implica aceitação tácita.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">11. Foro e Legislação Aplicável</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Estes termos são regidos pelas leis brasileiras. Fica eleito o Foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-border/60 bg-background py-6">
        <div className="container px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 MedDigital Telemedicina. Todos os direitos reservados.{" "}
            <Link to="/termos" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Termos de Uso e Privacidade
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Termos;

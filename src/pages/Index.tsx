import { Stethoscope, Lock } from "lucide-react";
import { useFormStepper } from "@/hooks/useFormStepper";
import HeroSection from "@/components/HeroSection";
import StepIndicator from "@/components/StepIndicator";
import StepIdentificacao from "@/components/StepIdentificacao";
import StepTriagem from "@/components/StepTriagem";
import StepCheckout from "@/components/StepCheckout";
import SuccessPage from "@/components/SuccessPage";

const Index = () => {
  const {
    step, step1Data, step2Data, errors, isSuccess, isProcessing, pixData, paymentError,
    setStep1Data, setStep2Data, goNext, goBack, startForm, submitPayment,
  } = useFormStepper();

  if (isSuccess) return <SuccessPage />;
  if (step === 0) return <HeroSection onStart={startForm} />;

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="w-full border-b border-border/60 bg-background">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Stethoscope className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">MedDigital</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dados protegidos</span>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 md:py-12">
        <div className="max-w-lg mx-auto">
          <StepIndicator currentStep={step} />

          <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8 shadow-card">
            {step === 1 && (
              <StepIdentificacao
                data={step1Data}
                errors={errors}
                onChange={setStep1Data}
                onNext={goNext}
              />
            )}
            {step === 2 && (
              <StepTriagem
                data={step2Data}
                errors={errors}
                onChange={setStep2Data}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 3 && (
              <StepCheckout
                necessidade={step2Data.necessidade}
                isProcessing={isProcessing}
                pixData={pixData}
                paymentError={paymentError}
                onPay={submitPayment}
                onBack={goBack}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

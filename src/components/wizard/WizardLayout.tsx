import type { ReactNode } from "react";
import { Mic } from "lucide-react";
import { STEP_LABELS } from "@/types/assessment";

interface WizardLayoutProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  children: ReactNode;
}

export function WizardLayout({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isSubmitting = false,
  children,
}: WizardLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="min-h-screen bg-[#faf9f6] px-4 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{STEP_LABELS[currentStep - 1]}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#6c3ce0] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step tabs */}
        <div className="mb-6 flex justify-between gap-6 border-b border-gray-200">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            return (
              <button
                key={label}
                type="button"
                disabled={!isActive && !isCompleted}
                className={`pb-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-b-2 border-[#6c3ce0] text-[#6c3ce0]"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <div className="rounded-xl bg-white p-8 shadow-sm">
          {/* Voice affordance */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6c3ce0]">
              <Mic className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              Just talk — we'll fill it in
            </span>
          </div>

          {/* Step content */}
          {children}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              disabled={isFirstStep}
              className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-[#6c3ce0] disabled:opacity-0"
            >
              Back
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={isSubmitting}
              className="rounded-lg bg-[#6c3ce0] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#5b32c0] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Generating..."
                : isLastStep
                  ? "Generate My Assessment"
                  : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

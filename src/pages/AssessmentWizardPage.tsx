import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import type { AssessmentFormData } from "@/types/assessment"
import { WizardLayout } from "@/components/wizard/WizardLayout"
import { YourIdeaStep } from "@/components/wizard/steps/YourIdeaStep"
import { UsersStep } from "@/components/wizard/steps/UsersStep"
import { ProblemStep } from "@/components/wizard/steps/ProblemStep"
import { FeaturesStep } from "@/components/wizard/steps/FeaturesStep"
import { BusinessStep } from "@/components/wizard/steps/BusinessStep"
import { createAssessment, runAssessment } from "@/services/assessmentService"
import { mapBackendReportToFinalReport } from "@/utils/reportMapper"
import { mapFormToIntakeData } from "@/utils/intakeMapper"

const STEP_FIELDS: Record<number, (keyof AssessmentFormData)[]> = {
  1: ["oneLiner", "elevatorPitch", "industries"],
  2: ["primaryUser", "businessType", "expectedUsersYear1"],
  3: ["problemToSolve", "currentSolution"],
  4: ["coreFeatures"],
  5: ["budgetRange", "timeline", "hasDevTeam"],
}

export function AssessmentWizardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 5
  const navigate = useNavigate()

  const methods = useForm<AssessmentFormData>({
    defaultValues: {
      appName: "",
      oneLiner: "",
      elevatorPitch: "",
      industries: [],
      primaryUser: "",
      secondaryUsers: "",
      businessType: "",
      expectedUsersYear1: "",
      problemToSolve: "",
      currentSolution: "",
      whyNow: "",
      coreFeatures: "",
      inspirationApps: "",
      platform: [],
      niceToHaveFeatures: "",
      revenueModel: [],
      budgetRange: "",
      timeline: "",
      hasDevTeam: "",
      anythingElse: "",
    },
    mode: "onChange",
  })

  const handleNext = async () => {
    if (isSubmitting) return

    const fields = STEP_FIELDS[currentStep]
    if (fields) {
      const valid = await methods.trigger(fields)
      if (!valid) return
    }

    // Custom validation for industries array (min 1)
    if (currentStep === 1) {
      const industries = methods.getValues("industries")
      if (!industries || industries.length === 0) {
        methods.setError("industries", {
          type: "manual",
          message: "Select at least one industry",
        })
        return
      }
    }

    if (currentStep === 4) {
      const platforms = methods.getValues("platform")
      if (!platforms || platforms.length === 0) {
        methods.setError("platform", {
          type: "manual",
          message: "Select at least one platform",
        })
        return
      }
    }

    if (currentStep === 5) {
      const revenueModel = methods.getValues("revenueModel")
      if (!revenueModel || revenueModel.length === 0) {
        methods.setError("revenueModel", {
          type: "manual",
          message: "Select at least one revenue model",
        })
        return
      }

      try {
        setIsSubmitting(true)
        const formData = methods.getValues()
        const intakeData = mapFormToIntakeData(formData)

        const created = await createAssessment(intakeData)
        const generated = await runAssessment(created.id)

        if (!generated.finalReport) {
          throw new Error("No final report returned from backend")
        }

        const mappedReport = mapBackendReportToFinalReport(generated.finalReport)
        toast.success("Assessment generated successfully.")
        navigate("/report", { state: { report: mappedReport, formData } })
      } catch (error: any) {
        toast.error(error.message || "Failed to generate assessment")
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <YourIdeaStep />
      case 2:
        return <UsersStep />
      case 3:
        return <ProblemStep />
      case 4:
        return <FeaturesStep />
      case 5:
        return <BusinessStep />
      default:
        return (
          <div className="py-12 text-center text-muted-foreground">
            Step {currentStep} — Coming soon
          </div>
        )
    }
  }

  return (
    <FormProvider {...methods}>
      <WizardLayout
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        isSubmitting={isSubmitting}
      >
        {renderStep()}
      </WizardLayout>
    </FormProvider>
  )
}

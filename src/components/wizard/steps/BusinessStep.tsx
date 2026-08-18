import { useFormContext } from "react-hook-form"
import type { AssessmentFormData } from "@/types/assessment"

const REVENUE_MODEL_OPTIONS = [
  "Subscriptions",
  "One-time purchase",
  "Freemium",
  "Marketplace commission",
  "Ads",
  "Enterprise licensing",
  "Not sure yet",
]

const BUDGET_RANGE_OPTIONS = [
  "Not sure",
  "Under $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000+",
]

const TIMELINE_OPTIONS = [
  "No rush",
  "ASAP",
  "1-3 months",
  "3-6 months",
  "6+ months",
]

const DEV_TEAM_OPTIONS = ["No", "Yes — in-house", "Yes — agency", "Partially"]

export function BusinessStep() {
  const { register, watch, setValue, getValues, clearErrors } =
    useFormContext<AssessmentFormData>()

  const revenueModel = watch("revenueModel") || []

  const toggleRevenueModel = (option: string) => {
    const current = getValues("revenueModel") || []
    if (current.includes(option)) {
      setValue(
        "revenueModel",
        current.filter((item) => item !== option),
        { shouldValidate: true },
      )
    } else {
      setValue("revenueModel", [...current, option], { shouldValidate: true })
      clearErrors("revenueModel")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Business & Budget</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Last step! Help us understand the business side so we can give
          realistic recommendations.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Revenue Model
        </label>
        <p className="text-xs text-muted-foreground">
          How will this make money? Select all that apply.
        </p>
        <div className="flex flex-wrap gap-2">
          {REVENUE_MODEL_OPTIONS.map((option) => {
            const isSelected = revenueModel.includes(option)
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleRevenueModel(option)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-[#6c3ce0] bg-[#6c3ce0] text-white"
                    : "border-gray-300 bg-white text-foreground hover:border-[#6c3ce0]"
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Budget Range
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          defaultValue=""
          {...register("budgetRange", {
            required: "Budget range is required",
          })}
        >
          <option value="" disabled>
            Select budget range
          </option>
          {BUDGET_RANGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">Timeline</label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          defaultValue=""
          {...register("timeline", {
            required: "Timeline is required",
          })}
        >
          <option value="" disabled>
            Select timeline
          </option>
          {TIMELINE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Do you have a dev team?
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          defaultValue=""
          {...register("hasDevTeam", {
            required: "Please select whether you have a dev team",
          })}
        >
          <option value="" disabled>
            Select one
          </option>
          {DEV_TEAM_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Anything Else?
        </label>
        <p className="text-xs text-muted-foreground">
          Competitors, constraints, regulatory requirements...
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          placeholder="e.g. Must be HIPAA compliant, main competitor is XYZ, need to integrate with Salesforce..."
          {...register("anythingElse")}
        />
      </div>
    </div>
  )
}

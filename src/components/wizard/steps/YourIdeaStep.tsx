import { useFormContext } from "react-hook-form"
import type { AssessmentFormData } from "@/types/assessment"
import { INDUSTRY_OPTIONS } from "@/types/assessment"

export function YourIdeaStep() {
  const { register, watch, setValue, getValues } =
    useFormContext<AssessmentFormData>()

  const oneLiner = watch("oneLiner") || ""
  const elevatorPitch = watch("elevatorPitch") || ""
  const industries = watch("industries") || []

  const toggleIndustry = (industry: string) => {
    const current = getValues("industries") || []
    if (current.includes(industry)) {
      setValue(
        "industries",
        current.filter((i) => i !== industry),
        { shouldValidate: true },
      )
    } else {
      setValue("industries", [...current, industry], { shouldValidate: true })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Your Idea</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about the app you want to build. Don't worry about being
          perfect — just get it out there.
        </p>
      </div>

      {/* App Name */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          App Name
        </label>
        <p className="text-xs text-muted-foreground">
          What do you want to call it? Leave blank if unsure.
        </p>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          placeholder="e.g. Pantry"
          {...register("appName")}
        />
      </div>

      {/* One-Liner */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            One-Liner
          </label>
          <span className="text-xs text-muted-foreground">
            {oneLiner.length} / 200
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Describe your app in one sentence.
        </p>
        <textarea
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={3}
          maxLength={200}
          {...register("oneLiner", { required: "One-liner is required" })}
        />
      </div>

      {/* Elevator Pitch */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground">
            Elevator Pitch
          </label>
          <span className="text-xs text-muted-foreground">
            {elevatorPitch.length} / 1000
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          If you had 60 seconds to explain your app to an investor, what would
          you say?
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          maxLength={1000}
          {...register("elevatorPitch", {
            required: "Elevator pitch is required",
          })}
        />
      </div>

      {/* Industry */}
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Industry
        </label>
        <p className="text-xs text-muted-foreground">Select all that apply.</p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRY_OPTIONS.map((industry) => {
            const isSelected = industries.includes(industry)
            return (
              <button
                key={industry}
                type="button"
                onClick={() => toggleIndustry(industry)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-[#6c3ce0] bg-[#6c3ce0] text-white"
                    : "border-gray-300 bg-white text-foreground hover:border-[#6c3ce0]"
                }`}
              >
                {industry}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

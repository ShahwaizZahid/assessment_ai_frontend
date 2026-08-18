import { useFormContext } from "react-hook-form"
import type { AssessmentFormData } from "@/types/assessment"

const PLATFORM_OPTIONS = ["Web app", "iOS", "Android", "Both web + mobile"]

export function FeaturesStep() {
  const { register, watch, setValue, getValues, clearErrors } =
    useFormContext<AssessmentFormData>()

  const platform = watch("platform") || []

  const togglePlatform = (option: string) => {
    const current = getValues("platform") || []
    if (current.includes(option)) {
      setValue(
        "platform",
        current.filter((item) => item !== option),
        { shouldValidate: true },
      )
    } else {
      setValue("platform", [...current, option], { shouldValidate: true })
      clearErrors("platform")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          What You Want It To Do
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about the features. We'll help prioritize what's MVP-worthy.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Core Features
        </label>
        <p className="text-xs text-muted-foreground">
          What should users be able to do? Don't worry about being technical.
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          {...register("coreFeatures", {
            required: "Core features are required",
          })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Inspiration Apps
        </label>
        <p className="text-xs text-muted-foreground">
          Any apps you admire or want to be similar to? (Optional)
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={3}
          placeholder="e.g. Toggl for time tracking, FreshBooks for invoicing, Notion for the clean UI..."
          {...register("inspirationApps")}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">Platform</label>
        <p className="text-xs text-muted-foreground">Where should your app live?</p>
        <div className="flex flex-wrap gap-2">
          {PLATFORM_OPTIONS.map((option) => {
            const isSelected = platform.includes(option)
            return (
              <button
                key={option}
                type="button"
                onClick={() => togglePlatform(option)}
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
          Nice-to-Have Features
        </label>
        <p className="text-xs text-muted-foreground">
          What would be great but isn't critical for launch? (Optional)
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          {...register("niceToHaveFeatures")}
        />
      </div>
    </div>
  )
}

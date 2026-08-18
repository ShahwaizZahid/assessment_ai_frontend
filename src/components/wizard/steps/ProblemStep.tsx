import { useFormContext } from "react-hook-form"
import type { AssessmentFormData } from "@/types/assessment"

export function ProblemStep() {
  const { register } = useFormContext<AssessmentFormData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">The Problem</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every great product solves a real problem. Help us understand yours.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          What problem does this solve?
        </label>
        <p className="text-xs text-muted-foreground">What's broken today?</p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          {...register("problemToSolve", {
            required: "Problem statement is required",
          })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          How do people currently solve it?
        </label>
        <p className="text-xs text-muted-foreground">
          Spreadsheets? Manual processes? A competitor?
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          {...register("currentSolution", {
            required: "Current solution is required",
          })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Why is now the right time?
        </label>
        <p className="text-xs text-muted-foreground">
          Market timing, new tech, regulatory changes? (Optional)
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          {...register("whyNow")}
        />
      </div>
    </div>
  )
}

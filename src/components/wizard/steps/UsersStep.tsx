import { useFormContext } from "react-hook-form"
import type { AssessmentFormData } from "@/types/assessment"

const EXPECTED_USERS_OPTIONS = [
  "<100",
  "100 - 1,000",
  "1,000 - 10,000",
  "10,000 - 100,000",
  "100,000+",
]

export function UsersStep() {
  const { register } = useFormContext<AssessmentFormData>()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Who It's For</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Understanding your users helps us shape the right experience.
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Primary User
        </label>
        <p className="text-xs text-muted-foreground">
          Who is your ideal user? What's their day like?
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          {...register("primaryUser", {
            required: "Primary user is required",
          })}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Secondary Users
        </label>
        <p className="text-xs text-muted-foreground">
          Are there other types of users? (Optional)
        </p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          rows={4}
          {...register("secondaryUsers")}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Business Type
        </label>
        <div className="flex flex-wrap gap-4">
          {["B2B", "B2C", "B2B2C"].map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value={type}
                className="h-4 w-4 accent-[#6c3ce0]"
                {...register("businessType", {
                  required: "Business type is required",
                })}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">
          Expected Users in Year 1
        </label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6c3ce0] focus:ring-1 focus:ring-[#6c3ce0]"
          defaultValue=""
          {...register("expectedUsersYear1", {
            required: "Expected users range is required",
          })}
        >
          <option value="" disabled>
            Select expected user volume
          </option>
          {EXPECTED_USERS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

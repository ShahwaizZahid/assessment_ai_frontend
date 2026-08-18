import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useAuth } from "@/context/Auth/AuthContext"

interface LoginFormValues {
  email: string
  password: string
}

export function LoginFormPage() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values)
      toast.success("Login successful")
    } catch (error: any) {
      toast.error(error.message || "Unable to login")
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center p-6">
      <div className="w-full rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">MVP Assessment AI</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password ? (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  )
}

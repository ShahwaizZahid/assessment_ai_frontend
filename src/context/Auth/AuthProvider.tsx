import { useEffect, useMemo, useState, type ReactNode } from "react"
import { toast } from "sonner"
import authService, { type LoginPayload } from "@/services/authService"
import { AuthContext } from "@/context/Auth/AuthContext"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

  useEffect(() => {
    const handleSessionExpired = () => {
      localStorage.removeItem("token")
      setToken(null)
      toast.error("Session expired. Please login again.")
    }

    window.addEventListener("session-expired", handleSessionExpired)
    return () => window.removeEventListener("session-expired", handleSessionExpired)
  }, [])

  const login = async (payload: LoginPayload) => {
    const response = await authService.login(payload)
    localStorage.setItem("token", response.token)
    setToken(response.token)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

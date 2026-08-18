import type { ReactNode } from "react"
import { AuthProvider } from "@/context/Auth/AuthProvider"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>
}

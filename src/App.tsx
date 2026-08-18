import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster, toast } from "sonner"
import { useEffect } from "react"
import { AppProviders } from "@/context/AppProviders"
import { LoginFormPage } from "@/pages/LoginFormPage"

function ServerErrorListener() {
  useEffect(() => {
    const handleServerError = () => {
      toast.error("Server is unavailable. Please try again.")
    }

    window.addEventListener("server-error", handleServerError)
    return () => window.removeEventListener("server-error", handleServerError)
  }, [])

  return null
}

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <ServerErrorListener />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginFormPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors closeButton />
    </AppProviders>
  )
}

export default App

import api from "@/services/api"

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      const response = await api.post("/v1/users/login", payload)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  },
}

export default authService

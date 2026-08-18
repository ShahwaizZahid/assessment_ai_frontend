import axios from "axios"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      window.dispatchEvent(new Event("session-expired"))
    } else if (status >= 500 || !error.response) {
      window.dispatchEvent(new Event("server-error"))
    }

    return Promise.reject(error)
  },
)

export default api

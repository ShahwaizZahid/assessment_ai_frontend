import api from "@/services/api"
import type { BackendFinalReport } from "@/types/report"

interface AssessmentRecord {
  id: number
  status: string
  intakeData: unknown
  finalReport: BackendFinalReport | null
  createdAt: string
  updatedAt: string
}

interface ApiEnvelope<T> {
  success: boolean
  data: T
  error?: string
}

function extractErrorMessage(error: any, fallback: string) {
  return error?.response?.data?.error || error?.message || fallback
}

export async function createAssessment(intakeData: unknown): Promise<AssessmentRecord> {
  try {
    const response = await api.post<ApiEnvelope<AssessmentRecord>>("/v1/assessments", {
      intakeData,
    })
    return response.data.data
  } catch (error: any) {
    throw new Error(extractErrorMessage(error, "Failed to create assessment draft"))
  }
}

export async function runAssessment(id: number): Promise<AssessmentRecord> {
  try {
    const response = await api.post<ApiEnvelope<AssessmentRecord>>(
      `/v1/assessments/${id}/run`,
    )
    return response.data.data
  } catch (error: any) {
    throw new Error(extractErrorMessage(error, "Failed to generate assessment"))
  }
}

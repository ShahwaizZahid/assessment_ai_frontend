import type { AssessmentFormData } from "@/types/assessment"

export interface BackendIntakeData {
  idea: {
    appName: string
    oneLiner: string
    elevatorPitch: string
    industryTags: string[]
  }
  users: {
    primaryUser: string
    secondaryUsers: string
    businessType: string
    expectedUsersYear1: string
  }
  problem: {
    problem: string
    currentSolution: string
    whyNow: string
  }
  features: {
    coreFeatures: string
    inspirationApps: string
    platform: string[]
    niceToHave: string
  }
  business: {
    revenueModels: string[]
    budgetRange: string
    timeline: string
    devTeamStatus: string
    additionalNotes: string
  }
}

export function mapFormToIntakeData(formData: AssessmentFormData): BackendIntakeData {
  return {
    idea: {
      appName: formData.appName,
      oneLiner: formData.oneLiner,
      elevatorPitch: formData.elevatorPitch,
      industryTags: formData.industries,
    },
    users: {
      primaryUser: formData.primaryUser,
      secondaryUsers: formData.secondaryUsers,
      businessType: formData.businessType,
      expectedUsersYear1: formData.expectedUsersYear1,
    },
    problem: {
      problem: formData.problemToSolve,
      currentSolution: formData.currentSolution,
      whyNow: formData.whyNow,
    },
    features: {
      coreFeatures: formData.coreFeatures,
      inspirationApps: formData.inspirationApps,
      platform: formData.platform,
      niceToHave: formData.niceToHaveFeatures,
    },
    business: {
      revenueModels: formData.revenueModel,
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      devTeamStatus: formData.hasDevTeam,
      additionalNotes: formData.anythingElse,
    },
  }
}

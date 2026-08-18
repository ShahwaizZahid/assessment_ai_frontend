export interface AssessmentFormData {
  // Step 1 — Your Idea
  appName: string
  oneLiner: string
  elevatorPitch: string
  industries: string[]

  // Step 2 — Users
  primaryUser: string
  secondaryUsers: string
  businessType: string
  expectedUsersYear1: string

  // Step 3 — Problem
  problemToSolve: string
  currentSolution: string
  whyNow: string

  // Step 4 — Features
  coreFeatures: string
  inspirationApps: string
  platform: string[]
  niceToHaveFeatures: string

  // Step 5 — Business
  revenueModel: string[]
  budgetRange: string
  timeline: string
  hasDevTeam: string
  anythingElse: string
}

export const STEP_LABELS = [
  "Your Idea",
  "Users",
  "Problem",
  "Features",
  "Business",
] as const

export const INDUSTRY_OPTIONS = [
  "SaaS",
  "Marketplace",
  "Social",
  "Health/Fitness",
  "Finance",
  "Education",
  "E-commerce",
  "Productivity",
  "Real Estate",
  "Travel",
  "Food/Bev",
  "Internal Tool",
  "Other",
] as const

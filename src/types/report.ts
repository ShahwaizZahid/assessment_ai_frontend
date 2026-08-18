export interface PersonaCard {
  title: string
  description: string
  needs: string
  whyReduced?: string
}

export interface BuildItem {
  title: string
  description: string
  rationale?: string
}

export interface NotToBuildItem {
  title: string
  badge: "V2" | "V3"
  description: string
}

export interface RiskItem {
  type: "Market" | "Operational" | "Financial"
  detail: string
}

export interface ArchitectureBlock {
  title: string
  points: string[]
}

export interface FinalReportData {
  mvpRealityCheck: string[]
  outcomeThatMatters: {
    headline: string
    detail: string
  }
  personas: PersonaCard[]
  whatToBuild: BuildItem[]
  whatNotToBuild: NotToBuildItem[]
  techStack: string[]
  investmentAndTimeline: string[]
  risks: RiskItem[]
  visualArchitecture: ArchitectureBlock[]
  whatSpecCannotTell: string[]
}

export interface BackendFinalReport {
  mvpRealityCheck: {
    narrative: string
  }
  outcomeThatMatters: {
    metric: string
    why: string
  }
  personas: Array<{
    name: string
    needs: string
    cutAndWhy: string
  }>
  betaScope: Array<{
    item: string
    rationale: string
  }>
  notToBuild: Array<{
    item: string
    phase: "V2" | "V3"
    reason: string
  }>
  techStack: {
    frontend: string
    backend: string
    payments: string
    hosting: string
    rationale: string
  }
  investmentTimeline: {
    range: string
    weeks: string
    reasoning: string
  }
  risks: {
    market: {
      risk: string
      mitigation: string
    }
    operational: {
      risk: string
      mitigation: string
    }
    financial: {
      risk: string
      mitigation: string
    }
  }
  visualArchitecture: {
    userFlow: string[]
    informationArchitecture: string[]
  }
  validationQuestions: string[]
}

export const REPORT_SECTION_IDS = [
  "mvp-reality-check",
  "outcome-that-matters",
  "who-actually-uses-this",
  "what-to-build",
  "what-not-to-build",
  "tech-stack",
  "investment-timeline",
  "risks-hard-truths",
  "visual-architecture",
  "what-spec-cant-tell",
] as const

export type ReportSectionId = (typeof REPORT_SECTION_IDS)[number]

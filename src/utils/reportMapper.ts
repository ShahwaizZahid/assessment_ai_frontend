import type {
  BackendFinalReport,
  FinalReportData,
  RiskItem,
} from "@/types/report"

export function mapBackendReportToFinalReport(
  backend: BackendFinalReport,
): FinalReportData {
  const risks: RiskItem[] = [
    {
      type: "Market",
      detail: `${backend.risks.market.risk} Mitigation: ${backend.risks.market.mitigation}`,
    },
    {
      type: "Operational",
      detail: `${backend.risks.operational.risk} Mitigation: ${backend.risks.operational.mitigation}`,
    },
    {
      type: "Financial",
      detail: `${backend.risks.financial.risk} Mitigation: ${backend.risks.financial.mitigation}`,
    },
  ]

  return {
    mvpRealityCheck: [backend.mvpRealityCheck.narrative],
    outcomeThatMatters: {
      headline: backend.outcomeThatMatters.metric,
      detail: backend.outcomeThatMatters.why,
    },
    personas: backend.personas.map((item) => ({
      title: item.name,
      description: item.cutAndWhy,
      needs: item.needs,
    })),
    whatToBuild: backend.betaScope.map((item) => ({
      title: item.item,
      description: item.rationale,
    })),
    whatNotToBuild: backend.notToBuild.map((item) => ({
      title: item.item,
      badge: item.phase,
      description: item.reason,
    })),
    techStack: [
      `Frontend: ${backend.techStack.frontend}`,
      `Backend: ${backend.techStack.backend}`,
      `Payments: ${backend.techStack.payments}`,
      `Hosting: ${backend.techStack.hosting}`,
      `Rationale: ${backend.techStack.rationale}`,
    ],
    investmentAndTimeline: [
      `Budget range: ${backend.investmentTimeline.range}`,
      `Timeline: ${backend.investmentTimeline.weeks}`,
      `Reasoning: ${backend.investmentTimeline.reasoning}`,
    ],
    risks,
    visualArchitecture: [
      {
        title: "User Flow",
        points: backend.visualArchitecture.userFlow,
      },
      {
        title: "Information Architecture",
        points: backend.visualArchitecture.informationArchitecture,
      },
    ],
    whatSpecCannotTell: backend.validationQuestions,
  }
}

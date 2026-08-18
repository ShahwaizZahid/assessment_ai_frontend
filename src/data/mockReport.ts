import type { FinalReportData } from "@/types/report"

export const mockReport: FinalReportData = {
  mvpRealityCheck: [
    "The fitness app market is saturated. Competing broadly against large apps is costly and slow.",
    "A generic workout tracker becomes a losing game unless you target a narrow user with one painful problem.",
    "The main question is not feature breadth — it is who this is for and what they hate in existing tools.",
  ],
  outcomeThatMatters: {
    headline:
      "500 users in your niche log at least 3 workouts weekly for 4 consecutive weeks.",
    detail:
      "Weekly active logging is the signal. Downloads alone do not prove product value or retention.",
  },
  personas: [
    {
      title: "Athlete / Gym-Goer",
      description:
        "Logs workouts, tracks progress, and wants measurable improvement. This is the core MVP user.",
      needs:
        "Fast workout logging, progress charts for key lifts, and workout history.",
      whyReduced:
        "Social features, marketplace flows, meal tracking, and wearables are intentionally postponed.",
    },
    {
      title: "Personal Trainer",
      description:
        "Creates plans for clients and monitors adherence. Important for later phases, not MVP.",
      needs: "Program builder, client roster, and coaching dashboards.",
    },
  ],
  whatToBuild: [
    {
      title: "Quick Workout Logger",
      description:
        "Log sets, reps, and weight quickly from blank or template-based sessions.",
      rationale:
        "If workout logging takes too long, users churn before week two.",
    },
    {
      title: "Workout Templates",
      description:
        "Reusable routines to remove repeated setup during common weekly sessions.",
      rationale:
        "Reduces friction and encourages consistent usage over one-off tracking.",
    },
    {
      title: "Progress Charts",
      description:
        "Track exercise trends over time with weekly and monthly visual progress.",
      rationale: "Visible improvement directly drives retention and habit loops.",
    },
  ],
  whatNotToBuild: [
    {
      title: "Trainer Marketplace",
      badge: "V3",
      description:
        "Complex supply and demand dynamics with low short-term value for MVP validation.",
    },
    {
      title: "Meal Planning Suite",
      badge: "V2",
      description:
        "Adds a second product problem before validating logging and retention.",
    },
    {
      title: "Wearable Integrations",
      badge: "V2",
      description:
        "Requires extra device QA and API maintenance with limited core value initially.",
    },
  ],
  techStack: [
    "Frontend: React + Vite + TypeScript",
    "Backend: Node.js + Express",
    "Database: PostgreSQL",
    "Auth: JWT-based session auth",
    "Infra: Object storage + managed hosting",
  ],
  investmentAndTimeline: [
    "MVP build timeline: 8-12 weeks",
    "Design + product definition: 2 weeks",
    "Engineering: 6-8 weeks",
    "QA + launch prep: 1-2 weeks",
  ],
  risks: [
    {
      type: "Market",
      detail:
        "Positioning too broad will blend into existing solutions and weaken retention.",
    },
    {
      type: "Operational",
      detail:
        "Over-scoping v1 slows release and delays core behavioral learning.",
    },
    {
      type: "Financial",
      detail:
        "Acquisition spend rises quickly if product does not show week-4 habit formation.",
    },
  ],
  visualArchitecture: [
    {
      title: "User Flow",
      points: [
        "Onboard -> create profile -> start workout",
        "Log sets -> complete session -> review progress",
        "Return via templates for repeat sessions",
      ],
    },
    {
      title: "Information Architecture",
      points: [
        "Dashboard",
        "Log Workout",
        "Templates",
        "Progress",
        "Profile",
      ],
    },
  ],
  whatSpecCannotTell: [
    "Whether users will repeatedly log within their real-world gym routine.",
    "How strong your acquisition channels are compared to incumbent apps.",
    "Whether the chosen niche is large enough for the business goal.",
  ],
}

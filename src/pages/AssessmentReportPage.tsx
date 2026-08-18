import { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { mockReport } from "@/data/mockReport"
import { ReportSidebar } from "@/components/report/ReportSidebar"
import { ReportSection } from "@/components/report/ReportSection"
import type {
  FinalReportData,
  ReportSectionId,
  NotToBuildItem,
} from "@/types/report"

type ReportLocationState = {
  report?: FinalReportData | null
}

function hasReportShape(value: unknown): value is FinalReportData {
  if (!value || typeof value !== "object") return false
  const candidate = value as Partial<FinalReportData>
  return (
    Array.isArray(candidate.mvpRealityCheck) &&
    typeof candidate.outcomeThatMatters?.headline === "string" &&
    Array.isArray(candidate.personas)
  )
}

const sidebarItems: { id: ReportSectionId; label: string }[] = [
  { id: "mvp-reality-check", label: "MVP Reality Check" },
  { id: "outcome-that-matters", label: "The Outcome That Matters" },
  { id: "who-actually-uses-this", label: "Who Actually Uses This" },
  { id: "what-to-build", label: "What to Build" },
  { id: "what-not-to-build", label: "What NOT to Build" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "investment-timeline", label: "Investment & Timeline" },
  { id: "risks-hard-truths", label: "Risks & Hard Truths" },
  { id: "visual-architecture", label: "Visual Architecture" },
  { id: "what-spec-cant-tell", label: "What This Spec Can’t Tell You" },
]

function NotToBuildBadge({ item }: { item: NotToBuildItem }) {
  const badgeClass =
    item.badge === "V2"
      ? "bg-amber-100 text-amber-700"
      : "bg-blue-100 text-blue-700"

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClass}`}>
      {item.badge}
    </span>
  )
}

export function AssessmentReportPage() {
  const { state } = useLocation()
  const routeReport = (state as ReportLocationState | undefined)?.report
  const report = hasReportShape(routeReport) ? routeReport : mockReport

  const [activeSection, setActiveSection] = useState<ReportSectionId>(
    "mvp-reality-check",
  )

  const sectionIds = useMemo(
    () => sidebarItems.map((item) => item.id),
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const id = visible[0].target.id as ReportSectionId
          setActiveSection(id)
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.2, 0.5, 0.8],
      },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return (
    <div className="min-h-screen bg-[#faf9f6] px-6 py-8">
      <div className="mx-auto flex max-w-7xl gap-10">
        <ReportSidebar items={sidebarItems} activeSection={activeSection} />

        <main className="min-w-0 flex-1 rounded-xl bg-white p-8 shadow-sm">
          <ReportSection id="mvp-reality-check" title="MVP Reality Check">
            {report.mvpRealityCheck.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </ReportSection>

          <ReportSection id="outcome-that-matters" title="The Outcome That Matters">
            <p className="font-semibold text-slate-900">
              {report.outcomeThatMatters.headline}
            </p>
            <p>{report.outcomeThatMatters.detail}</p>
          </ReportSection>

          <ReportSection id="who-actually-uses-this" title="Who Actually Uses This">
            <div className="space-y-4">
              {report.personas.map((persona) => (
                <article
                  key={persona.title}
                  className="rounded-lg border border-slate-200 bg-white p-5"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {persona.title}
                  </h3>
                  <p>{persona.description}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6c3ce0]">
                    What They Need
                  </p>
                  <p>{persona.needs}</p>
                  {persona.whyReduced ? (
                    <div className="mt-3 rounded-md bg-slate-100 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                        Why We Reduced This
                      </p>
                      <p>{persona.whyReduced}</p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection id="what-to-build" title="What to Build — Beta Scope">
            <ol className="space-y-5">
              {report.whatToBuild.map((item, index) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ede8ff] text-xs font-semibold text-[#6c3ce0]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p>{item.description}</p>
                    {item.rationale ? (
                      <p className="text-slate-500">{item.rationale}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </ReportSection>

          <ReportSection id="what-not-to-build" title="What NOT to Build">
            <div className="space-y-3">
              {report.whatNotToBuild.map((item) => (
                <article
                  key={item.title}
                  className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                  <NotToBuildBadge item={item} />
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection id="tech-stack" title="Tech Stack">
            <ul className="list-disc space-y-1 pl-5">
              {report.techStack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection id="investment-timeline" title="Investment & Timeline">
            <ul className="list-disc space-y-1 pl-5">
              {report.investmentAndTimeline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ReportSection>

          <ReportSection id="risks-hard-truths" title="Risks & Hard Truths">
            <div className="grid gap-3 md:grid-cols-3">
              {report.risks.map((risk) => (
                <article key={risk.type} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{risk.type}</p>
                  <p>{risk.detail}</p>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection id="visual-architecture" title="Visual Architecture">
            <div className="grid gap-4 md:grid-cols-2">
              {report.visualArchitecture.map((block) => (
                <article key={block.title} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{block.title}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection
            id="what-spec-cant-tell"
            title="What This Spec Can’t Tell You"
          >
            <ul className="list-disc space-y-1 pl-5">
              {report.whatSpecCannotTell.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ReportSection>
        </main>
      </div>
    </div>
  )
}

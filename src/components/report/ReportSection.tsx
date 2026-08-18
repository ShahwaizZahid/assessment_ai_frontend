import type { ReactNode } from "react"

interface ReportSectionProps {
  id: string
  title: string
  children: ReactNode
}

export function ReportSection({ id, title, children }: ReportSectionProps) {
  return (
    <section id={id} className="scroll-mt-6 border-b border-gray-200 py-8">
      <h2 className="mb-4 text-3xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-slate-700">{children}</div>
    </section>
  )
}

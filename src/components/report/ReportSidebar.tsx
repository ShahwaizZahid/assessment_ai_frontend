import type { ReportSectionId } from "@/types/report"

interface SidebarItem {
  id: ReportSectionId
  label: string
}

interface ReportSidebarProps {
  items: SidebarItem[]
  activeSection: ReportSectionId
}

export function ReportSidebar({ items, activeSection }: ReportSidebarProps) {
  const scrollToSection = (id: ReportSectionId) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <aside className="sticky top-8 h-fit w-64 shrink-0">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
        Contents
      </p>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "bg-[#ede8ff] font-medium text-[#6c3ce0]"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

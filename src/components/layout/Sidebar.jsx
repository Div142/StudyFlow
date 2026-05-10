import { Activity, CalendarDays, CheckSquare, LayoutDashboard, Settings, Users } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Tasks", icon: CheckSquare },
  { label: "Calendar", icon: CalendarDays },
  { label: "Workspaces", icon: Users },
  { label: "Activity", icon: Activity },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-rose-100/80 bg-white/80 p-6 backdrop-blur-2xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-400 font-extrabold text-white">S</span>
        <div>
          <strong className="block text-lg">StudyFlow</strong>
          <small className="text-stone-500 dark:text-rose-200">Live workspace</small>
        </div>
      </div>

      <nav className="mt-8 grid gap-2" aria-label="Primary">
        {navItems.map(({ label, icon: Icon, active }) => (
          <a
            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-bold transition ${
              active ? "bg-blush text-rose-600" : "text-stone-500 hover:bg-blush hover:text-rose-600"
            }`}
            href={`#${label.toLowerCase()}`}
            key={label}
          >
            <Icon size={18} />
            {label}
          </a>
        ))}
      </nav>

      <section className="mt-auto rounded-2xl border border-rose-100 bg-white p-4 shadow-soft">
        <span className="eyebrow">Current workspace</span>
        <h3 className="mb-4 text-lg font-extrabold">Semester Sprint</h3>
        <div className="flex -space-x-2" aria-label="Online members">
          {["A", "M", "R"].map((name, index) => (
            <span
              className={`relative grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-cream text-xs font-extrabold text-rose-600 ${
                index < 2 ? "after:absolute after:bottom-0 after:right-0 after:h-2.5 after:w-2.5 after:rounded-full after:border-2 after:border-white after:bg-emerald-400" : ""
              }`}
              key={name}
            >
              {name}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}

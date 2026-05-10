import { Bell, Moon, Search, Sun } from "lucide-react";

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <span className="eyebrow">Sunday, May 10</span>
        <h1 className="text-4xl font-extrabold tracking-normal sm:text-5xl">Dashboard</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-h-12 min-w-full items-center gap-3 rounded-xl border border-rose-100 bg-white px-4 text-stone-500 shadow-sm md:min-w-96">
          <Search size={18} />
          <input className="w-full bg-transparent text-sm text-ink outline-none" type="search" placeholder="Search tasks, tags, projects" />
        </label>
        <button className="icon-btn" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="icon-btn" type="button" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <span className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-cream text-sm font-extrabold text-rose-600 after:absolute after:bottom-0 after:right-0 after:h-2.5 after:w-2.5 after:rounded-full after:border-2 after:border-white after:bg-emerald-400">
          Y
        </span>
      </div>
    </header>
  );
}

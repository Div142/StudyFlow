import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import MobileNav from "./components/layout/MobileNav.jsx";
import StatCard from "./components/dashboard/StatCard.jsx";
import ProjectCard from "./components/dashboard/ProjectCard.jsx";
import ActivityFeed from "./components/dashboard/ActivityFeed.jsx";
import KanbanBoard from "./components/tasks/KanbanBoard.jsx";
import TaskModal from "./components/tasks/TaskModal.jsx";
import TaskDrawer from "./components/tasks/TaskDrawer.jsx";
import MiniCalendar from "./components/calendar/MiniCalendar.jsx";
import { activity, projects, tasks } from "./data.js";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const openTask = (task) => {
    setSelectedTask(task);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-cream text-ink transition dark:bg-[#171114] dark:text-[#fff7fa]">
        <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar />
          <main className="min-w-0 p-5 pb-24 sm:p-7 lg:pb-7">
            <Header isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)} />

            <section className="mb-5 flex flex-col justify-between gap-5 rounded-3xl border border-rose-100 bg-gradient-to-br from-blush to-white p-6 shadow-soft xl:flex-row xl:items-center" id="dashboard">
              <div>
                <span className="eyebrow">Student productivity platform</span>
                <h2 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-normal sm:text-5xl">
                  Plan classes, projects, and team tasks in one calm live board.
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-stone-500">
                  Track deadlines, collaborate in shared workspaces, and keep today visible without turning your dashboard into noise.
                </p>
              </div>
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-rose-400 px-5 font-extrabold text-white shadow-lg shadow-rose-200/70"
                type="button"
                onClick={() => setIsTaskModalOpen(true)}
              >
                <Plus size={18} />
                Create Task
              </button>
            </section>

            <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Task stats">
              <StatCard label="Today" value="8" detail="3 due before 6 PM" />
              <StatCard label="Upcoming" value="17" detail="Across 4 projects" />
              <StatCard label="Completed" value="42" detail="This semester" />
              <StatCard label="Team online" value="3" detail="Live updates active" />
            </section>

            <section className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-soft">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="eyebrow">Projects</span>
                    <h2 className="text-2xl font-extrabold">Workspace cards</h2>
                  </div>
                  <button className="rounded-xl bg-cream px-4 py-3 font-extrabold" type="button">View all</button>
                </div>

                <div className="mb-5 grid gap-3 xl:grid-cols-3">
                  {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
                </div>

                <div className="grid grid-cols-4 gap-2 rounded-2xl border border-rose-100 bg-cream p-1.5">
                  {["Board", "List", "Week", "Month"].map((view, index) => (
                    <button
                      className={`min-h-11 rounded-xl font-extrabold ${index === 0 ? "bg-white text-rose-600 shadow-sm" : "text-stone-500"}`}
                      type="button"
                      key={view}
                    >
                      {view}
                    </button>
                  ))}
                </div>

                <KanbanBoard tasks={tasks} onOpenTask={openTask} />
              </div>

              <aside className="grid content-start gap-5">
                <MiniCalendar />
                <ActivityFeed items={activity} />
              </aside>
            </section>
          </main>
        </div>

        <MobileNav onCreateTask={() => setIsTaskModalOpen(true)} />
        <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
        <TaskDrawer task={selectedTask} onClose={() => setSelectedTask(null)} />

        <div className={`fixed bottom-5 right-5 z-50 rounded-xl border border-rose-100 bg-white px-4 py-3 font-extrabold text-ink shadow-soft transition ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}>
          Live update added to activity feed
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AuthPanel from "./components/auth/AuthPanel.jsx";
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
import { api, authStore } from "./lib/api.js";
import { createStudyFlowSocket } from "./lib/socket.js";

const groupTasks = (items) => ({
  todo: items.filter((task) => task.status === "todo"),
  doing: items.filter((task) => task.status === "doing"),
  done: items.filter((task) => task.status === "done"),
});

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [session, setSession] = useState(null);
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isTaskSaving, setIsTaskSaving] = useState(false);
  const [workspace, setWorkspace] = useState(null);
  const [remoteProjects, setRemoteProjects] = useState([]);
  const [remoteTasks, setRemoteTasks] = useState([]);
  const [remoteActivity, setRemoteActivity] = useState([]);
  const sessionId = session?._id || session?.id;

  const visibleProjects = remoteProjects.length ? remoteProjects : projects;
  const visibleTasks = remoteTasks.length ? groupTasks(remoteTasks) : tasks;
  const visibleActivity = remoteActivity.length ? remoteActivity.map((item) => ({
    user: item.actor?.username || "Someone",
    text: item.message,
  })) : activity;

  const projectCards = useMemo(() => visibleProjects.map((project) => ({
    ...project,
    title: project.title || project.name,
    meta: project.meta || "Live project",
    progress: project.progress ?? 0,
  })), [visibleProjects]);

  const openTask = (task) => {
    setSelectedTask(task);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2200);
  };

  const loadWorkspaceData = async () => {
    const workspaceData = await api.workspaces();
    const firstWorkspace = workspaceData.workspaces[0];
    setWorkspace(firstWorkspace);

    if (!firstWorkspace) return;

    const [projectData, taskData, activityData] = await Promise.all([
      api.projects(firstWorkspace._id),
      api.tasks(firstWorkspace._id),
      api.activity(firstWorkspace._id),
    ]);

    setRemoteProjects(projectData.projects);
    setRemoteTasks(taskData.tasks);
    setRemoteActivity(activityData.activity);
  };

  useEffect(() => {
    if (!authStore.getToken()) return;

    api.me()
      .then((data) => {
        setSession(data.user);
        return loadWorkspaceData();
      })
      .catch(() => {
        authStore.clearToken();
      });
  }, []);

  useEffect(() => {
    if (!sessionId || !workspace?._id) return undefined;

    const socket = createStudyFlowSocket({
      userId: sessionId,
      workspaceId: workspace._id,
      onTaskCreated: (task) => setRemoteTasks((current) => [task, ...current]),
      onTaskUpdated: (task) => setRemoteTasks((current) => current.map((item) => item._id === task._id ? task : item)),
      onActivityCreated: (item) => setRemoteActivity((current) => [item, ...current].slice(0, 50)),
      onPresence: () => {},
    });

    return () => socket.disconnect();
  }, [sessionId, workspace?._id]);

  const handleLogin = async (payload) => {
    setIsAuthLoading(true);
    setAuthError("");
    try {
      const data = await api.login(payload);
      setSession(data.user);
      await loadWorkspaceData();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleRegister = async (payload) => {
    setIsAuthLoading(true);
    setAuthError("");
    try {
      const data = await api.register(payload);
      setSession(data.user);
      await loadWorkspaceData();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleCreateTask = async (payload) => {
    if (!workspace?._id) {
      const draft = {
        ...payload,
        id: crypto.randomUUID(),
        due: payload.dueAt ? new Date(payload.dueAt).toLocaleString() : "No due date",
      };
      setRemoteTasks((current) => [draft, ...current]);
      setIsTaskModalOpen(false);
      return;
    }

    setIsTaskSaving(true);
    try {
      const data = await api.createTask(workspace._id, payload);
      setRemoteTasks((current) => [data.task, ...current]);
      setIsTaskModalOpen(false);
    } finally {
      setIsTaskSaving(false);
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-cream text-ink transition dark:bg-[#171114] dark:text-[#fff7fa]">
        <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
          <Sidebar />
          <main className="min-w-0 p-5 pb-24 sm:p-7 lg:pb-7">
            <Header isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)} />

            {!session && (
              <AuthPanel
                onLogin={handleLogin}
                onRegister={handleRegister}
                isLoading={isAuthLoading}
                error={authError}
              />
            )}

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
                  {projectCards.map((project) => <ProjectCard key={project._id || project.title} project={project} />)}
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

                <KanbanBoard tasks={visibleTasks} onOpenTask={openTask} />
              </div>

              <aside className="grid content-start gap-5">
                <MiniCalendar />
                <ActivityFeed items={visibleActivity} />
              </aside>
            </section>
          </main>
        </div>

        <MobileNav onCreateTask={() => setIsTaskModalOpen(true)} />
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleCreateTask}
          projects={visibleProjects}
          isSaving={isTaskSaving}
        />
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

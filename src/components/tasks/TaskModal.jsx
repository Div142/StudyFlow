import { useState } from "react";
import { X } from "lucide-react";

export default function TaskModal({ isOpen, onClose, onSubmit, projects = [], isSaving = false }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    priority: "normal",
    project: "",
  });

  if (!isOpen) return null;

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    const dueAt = form.dueDate
      ? new Date(`${form.dueDate}T${form.dueTime || "23:59"}`).toISOString()
      : null;

    onSubmit({
      title: form.title,
      description: form.description,
      dueAt,
      priority: form.priority,
      status: "todo",
      project: form.project || null,
      tags: [],
      subtasks: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/40 p-4 backdrop-blur-sm">
      <form className="grid w-full max-w-xl gap-4 rounded-3xl border border-rose-100 bg-white p-5 shadow-soft" onSubmit={submit}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="eyebrow">New task</span>
            <h2 className="text-2xl font-extrabold">Create a task</h2>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <label className="field">Title <input name="title" type="text" value={form.title} onChange={updateField} placeholder="Task title" required /></label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="field">Due date <input name="dueDate" type="date" value={form.dueDate} onChange={updateField} /></label>
          <label className="field">Due time <input name="dueTime" type="time" value={form.dueTime} onChange={updateField} /></label>
        </div>
        <label className="field">Priority
          <select name="priority" value={form.priority} onChange={updateField}>
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
            <option value="later">Later</option>
          </select>
        </label>
        <label className="field">Project
          <select name="project" value={form.project} onChange={updateField}>
            <option value="">No project</option>
            {projects.map((project) => (
              <option value={project._id || project.id} key={project._id || project.id || project.name}>{project.name || project.title}</option>
            ))}
          </select>
        </label>
        <label className="field">Description <textarea name="description" value={form.description} onChange={updateField} placeholder="Plain text notes" /></label>
        <button className="min-h-12 rounded-xl bg-rose-400 px-5 font-extrabold text-white" type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Task"}
        </button>
      </form>
    </div>
  );
}

import { X } from "lucide-react";

export default function TaskModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/40 p-4 backdrop-blur-sm">
      <form className="grid w-full max-w-xl gap-4 rounded-3xl border border-rose-100 bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="eyebrow">New task</span>
            <h2 className="text-2xl font-extrabold">Create a task</h2>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <label className="field">Title <input type="text" placeholder="Task title" /></label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="field">Due date <input type="date" /></label>
          <label className="field">Due time <input type="time" /></label>
        </div>
        <label className="field">Priority
          <select defaultValue="Normal">
            <option>Urgent</option>
            <option>Normal</option>
            <option>Later</option>
          </select>
        </label>
        <label className="field">Description <textarea placeholder="Plain text notes" /></label>
        <button className="min-h-12 rounded-xl bg-rose-400 px-5 font-extrabold text-white" type="button" onClick={onClose}>Save Task</button>
      </form>
    </div>
  );
}

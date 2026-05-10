import { X } from "lucide-react";

export default function TaskDrawer({ task, onClose }) {
  return (
    <aside
      className={`fixed right-4 top-4 z-40 h-[calc(100vh-2rem)] w-[min(420px,calc(100vw-2rem))] rounded-3xl border border-rose-100 bg-white p-5 shadow-soft transition ${
        task ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"
      }`}
      aria-hidden={!task}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="eyebrow">Task detail</span>
          <h2 className="text-2xl font-extrabold">{task?.title ?? "Task detail"}</h2>
        </div>
        <button className="icon-btn" type="button" onClick={onClose} aria-label="Close drawer">
          <X size={18} />
        </button>
      </div>
      <p className="mt-4 leading-7 text-stone-500">
        Collect readings, clean up notes, and prepare the final observation table for the Chemistry Lab workspace.
      </p>
      <div className="my-5 grid gap-3">
        <span className="rounded-xl bg-blush p-3 font-bold text-stone-600">{task?.priority ?? "Normal"} priority</span>
        <span className="rounded-xl bg-blush p-3 font-bold text-stone-600">{task?.due ?? "Today · 7:30 PM"}</span>
      </div>
      <h3 className="mb-3 font-extrabold">Subtasks</h3>
      {["Gather experiment readings", "Format observation table", "Share with team"].map((item, index) => (
        <label className="mb-3 flex items-center gap-3 rounded-xl bg-blush p-3 font-bold text-stone-600" key={item}>
          <input type="checkbox" defaultChecked={index === 0} />
          {item}
        </label>
      ))}
    </aside>
  );
}

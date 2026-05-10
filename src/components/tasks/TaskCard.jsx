const priorityClass = {
  urgent: "bg-red-500",
  normal: "bg-rose-400",
  later: "bg-amber-400",
};

export default function TaskCard({ task, onOpen }) {
  const title = task.title;
  const due = task.due || (task.dueAt ? new Date(task.dueAt).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }) : "No due date");

  return (
    <button
      className={`group grid w-full gap-2 rounded-xl border border-rose-100 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-lg ${
        task.selected ? "border-rose-200 shadow-lg" : ""
      } ${task.completed ? "opacity-75" : ""}`}
      type="button"
      onClick={onOpen}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${priorityClass[task.priority]}`} />
      <strong className={task.completed ? "line-through" : ""}>{title}</strong>
      <small className="text-stone-500">
        {task.overdue ? <b className="rounded-full bg-red-100 px-2 py-1 text-red-600">Overdue</b> : due}
      </small>
    </button>
  );
}

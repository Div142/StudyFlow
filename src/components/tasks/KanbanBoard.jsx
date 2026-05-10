import TaskCard from "./TaskCard.jsx";

const columns = [
  { key: "todo", label: "To Do" },
  { key: "doing", label: "Doing" },
  { key: "done", label: "Done" },
];

export default function KanbanBoard({ tasks, onOpenTask }) {
  return (
    <section className="mt-4 grid gap-3 xl:grid-cols-3" id="tasks" aria-label="Kanban board">
      {columns.map((column) => (
        <article className="min-h-80 rounded-2xl border border-rose-100 bg-cream/70 p-3" key={column.key}>
          <h3 className="mb-4 flex justify-between text-sm font-extrabold">
            {column.label}
            <span className="text-stone-500">{tasks[column.key].length}</span>
          </h3>
          <div className="grid gap-3">
            {tasks[column.key].map((task) => (
              <TaskCard key={task.id} task={task} onOpen={() => onOpenTask(task)} />
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className="rounded-2xl border border-rose-100 bg-blush p-4">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-400 font-extrabold text-white">{project.icon}</span>
      <h3 className="mt-4 text-lg font-extrabold">{project.title}</h3>
      <p className="mb-4 text-sm text-stone-500">{project.meta} · {project.progress}% complete</p>
      <div className="h-2 overflow-hidden rounded-full bg-cream">
        <span className="block h-full rounded-full bg-rose-400" style={{ width: `${project.progress}%` }} />
      </div>
    </article>
  );
}

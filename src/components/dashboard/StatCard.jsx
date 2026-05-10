export default function StatCard({ label, value, detail }) {
  return (
    <article className="rounded-2xl border border-rose-100 bg-white p-5 shadow-soft">
      <span className="text-sm font-bold text-stone-500">{label}</span>
      <strong className="mt-2 block text-3xl font-extrabold">{value}</strong>
      <small className="mt-2 block text-stone-500">{detail}</small>
    </article>
  );
}

export default function ActivityFeed({ items }) {
  return (
    <section className="rounded-3xl border border-rose-100 bg-white p-5 shadow-soft" id="activity">
      <div className="mb-4">
        <span className="eyebrow">Live activity</span>
        <h2 className="text-2xl font-extrabold">Team updates</h2>
      </div>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li className="rounded-xl bg-blush p-3 leading-6 text-stone-500" key={`${item.user}-${item.text}`}>
            <strong className="text-ink">{item.user}</strong> {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

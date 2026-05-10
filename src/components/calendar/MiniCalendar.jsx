const days = ["M", "T", "W", "T", "F", "S", "S"];
const dates = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function MiniCalendar() {
  return (
    <section className="rounded-3xl border border-rose-100 bg-white p-5 shadow-soft" id="calendar">
      <div className="mb-4">
        <span className="eyebrow">Calendar</span>
        <h2 className="text-2xl font-extrabold">May</h2>
      </div>
      <div className="grid grid-cols-7 gap-2" aria-label="Monthly calendar preview">
        {days.map((day, index) => <span className="text-center text-xs font-extrabold text-stone-500" key={`${day}-${index}`}>{day}</span>)}
        {dates.map((date) => (
          <button
            className={`aspect-square rounded-xl border border-rose-100 font-extrabold ${
              date === 10 ? "bg-rose-400 text-white" : date === 12 || date === 14 ? "bg-blush text-rose-600" : "bg-cream/70"
            }`}
            type="button"
            key={date}
          >
            {date}
          </button>
        ))}
      </div>
    </section>
  );
}

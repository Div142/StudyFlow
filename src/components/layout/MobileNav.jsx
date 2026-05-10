import { CalendarDays, Home, Plus, UserRound, CheckSquare } from "lucide-react";

export default function MobileNav({ onCreateTask }) {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 gap-2 rounded-2xl border border-rose-100 bg-white/90 p-2 shadow-soft backdrop-blur-xl lg:hidden">
      <a className="mobile-link text-rose-600" href="#dashboard"><Home size={18} />Home</a>
      <a className="mobile-link" href="#tasks"><CheckSquare size={18} />Tasks</a>
      <button className="grid min-h-12 place-items-center rounded-xl bg-rose-400 text-xs font-extrabold text-white" type="button" onClick={onCreateTask}>
        <Plus size={19} />Add
      </button>
      <a className="mobile-link" href="#calendar"><CalendarDays size={18} />Calendar</a>
      <a className="mobile-link" href="#settings"><UserRound size={18} />Profile</a>
    </nav>
  );
}

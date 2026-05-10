import { useState } from "react";

export default function AuthPanel({ onLogin, onRegister, isLoading, error }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    if (mode === "login") {
      onLogin({ email: form.email, password: form.password });
      return;
    }

    onRegister(form);
  };

  return (
    <section className="mb-5 rounded-3xl border border-rose-100 bg-white p-5 shadow-soft">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="eyebrow">Backend connection</span>
          <h2 className="text-2xl font-extrabold">Sign in to sync live tasks</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-cream p-1.5">
          {["login", "register"].map((item) => (
            <button
              className={`rounded-xl px-4 py-2 text-sm font-extrabold capitalize ${mode === item ? "bg-white text-rose-600 shadow-sm" : "text-stone-500"}`}
              key={item}
              type="button"
              onClick={() => setMode(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <form className="grid gap-3 md:grid-cols-[1fr_1fr_auto]" onSubmit={submit}>
        {mode === "register" && (
          <label className="field">
            Username
            <input name="username" value={form.username} onChange={updateField} placeholder="Div" minLength={2} required />
          </label>
        )}
        <label className="field">
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" required />
        </label>
        <label className="field">
          Password
          <input name="password" type="password" value={form.password} onChange={updateField} placeholder="Minimum 8 characters" minLength={8} required />
        </label>
        <button className="min-h-12 self-end rounded-xl bg-rose-400 px-5 font-extrabold text-white" type="submit" disabled={isLoading}>
          {isLoading ? "Working..." : mode === "login" ? "Login" : "Create"}
        </button>
      </form>

      {error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600">{error}</p>}
    </section>
  );
}

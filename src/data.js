export const projects = [
  { icon: "M", title: "Math Assignment", meta: "12 tasks", progress: 68 },
  { icon: "P", title: "Physics Notes", meta: "9 tasks", progress: 44 },
  { icon: "C", title: "Chemistry Lab", meta: "6 tasks", progress: 83 },
];

export const tasks = {
  todo: [
    { id: 1, title: "Submit calculus worksheet", due: "Today · 5:00 PM", priority: "urgent" },
    { id: 2, title: "Read chapter 8", due: "Tomorrow · 9:00 AM", priority: "later" },
  ],
  doing: [
    { id: 3, title: "Prepare lab observations", due: "Today · 7:30 PM", priority: "normal", selected: true },
    { id: 4, title: "Group presentation outline", due: "Overdue", priority: "urgent", overdue: true },
  ],
  done: [
    { id: 5, title: "Revise history notes", due: "Completed section", priority: "normal", completed: true },
  ],
};

export const activity = [
  { user: "Aman", text: "moved Physics Notes to Doing." },
  { user: "Mira", text: "completed Chemistry Lab intro." },
  { user: "You", text: "created Math Assignment tasks." },
];

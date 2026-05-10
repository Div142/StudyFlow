const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "studyflow.token";

export const authStore = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

async function request(path, options = {}) {
  const token = authStore.getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  async register(payload) {
    const data = await request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    authStore.setToken(data.token);
    return data;
  },

  async login(payload) {
    const data = await request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    authStore.setToken(data.token);
    return data;
  },

  me() {
    return request("/auth/me");
  },

  workspaces() {
    return request("/workspaces");
  },

  projects(workspaceId) {
    return request(`/projects/${workspaceId}`);
  },

  tasks(workspaceId, query = "") {
    return request(`/tasks/${workspaceId}${query}`);
  },

  createTask(workspaceId, payload) {
    return request(`/tasks/${workspaceId}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  updateTask(workspaceId, taskId, payload) {
    return request(`/tasks/${workspaceId}/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  activity(workspaceId) {
    return request(`/activity/${workspaceId}`);
  },
};

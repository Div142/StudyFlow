# StudyFlow

A MERN-ready live to-do app for students, built with React, Vite, Tailwind CSS, Express, MongoDB, and Socket.io.

## Frontend

- Dashboard-first student productivity UI
- Pink, beige, cream, and rose theme
- Light and dark mode structure
- Kanban, project cards, calendar preview, activity feed
- Task create modal and task detail drawer

## Backend

- Express REST API
- MongoDB models for users, workspaces, projects, tasks, and activity
- JWT auth for signup, login, and protected routes
- Workspace membership checks
- Socket.io events for live tasks, activity, and online status
- Zod request validation

## Setup

Install Node package tooling, then run:

```powershell
npm install
npm --prefix server install
```

Create the backend environment file:

```powershell
Copy-Item server/.env.example server/.env
```

Then update `server/.env` with your MongoDB URI and JWT secret.

Run the frontend:

```powershell
npm run dev
```

The frontend dev server runs on:

```txt
http://localhost:5173
```

Run the backend:

```powershell
npm run dev:server
```

The backend API runs on:

```txt
http://localhost:5000
```

## Frontend Environment

Copy `.env.example` to `.env` and set:

```txt
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

When deployed, these should point to the hosted backend URL.

## Deployment

This repo includes `render.yaml` for Render Blueprint deployment.

The frontend is also configured for GitHub Pages through `.github/workflows/deploy-pages.yml`.

Public frontend URL after Pages deploys:

```txt
https://div142.github.io/StudyFlow/
```

Required hosted environment values:

- `MONGO_URI`: your MongoDB Atlas connection string
- `CLIENT_ORIGIN`: your hosted frontend URL
- `VITE_API_URL`: hosted backend API URL ending in `/api`
- `VITE_SOCKET_URL`: hosted backend root URL

Example:

```txt
CLIENT_ORIGIN=https://studyflow-client.onrender.com
VITE_API_URL=https://studyflow-api.onrender.com/api
VITE_SOCKET_URL=https://studyflow-api.onrender.com
```

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/workspaces`
- `POST /api/workspaces`
- `GET /api/projects/:workspaceId`
- `POST /api/projects/:workspaceId`
- `GET /api/tasks/:workspaceId`
- `POST /api/tasks/:workspaceId`
- `PATCH /api/tasks/:workspaceId/:taskId`
- `DELETE /api/tasks/:workspaceId/:taskId`
- `GET /api/activity/:workspaceId`

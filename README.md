# CodeWithRandom — Career Analyzer

An opinionated starter project that helps users analyze skill gaps and generate career roadmaps.
It includes a Node.js + Express backend (MongoDB) and a React (Vite) frontend. The app can:

- Analyze a user's current skills against a predefined role and show missing skills and recommendations.
- Generate multi-phase career roadmaps for common roles (Backend, Frontend, Full Stack, DevOps, Data Analyst).
- Fetch technology news and persist simple analysis records.

This README explains how to run the project locally, the available APIs, and quick troubleshooting tips.

---

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB), axios
- Frontend: React (Vite), Tailwind (optional in this repo), simple component-based UI
- Dev tooling: nodemon (backend), vite (frontend)

---

## Repository layout

```
backend/        # Express API and Mongoose models
frontend/       # React (Vite) app
README.md       # This file
```

---

## Prerequisites

- Node.js (recommended >=16)
- npm (or yarn)
- MongoDB (local or remote). If you don't have MongoDB locally, use a cloud MongoDB URI (MongoDB Atlas).

---

## Quick start (Windows PowerShell)

1. Start the backend

```pwsh
cd backend
npm install
# create a .env file (see next section)
npm run dev
```

2. Start the frontend in a new terminal

```pwsh
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`) and the backend runs on port `5000` by default.

---

## Environment variables (backend)

Create a `.env` file at `backend/.env` with these values (example):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/career_db
```

If you use a remote database provide the remote URI instead of the local one.

---

## Backend scripts

- `npm run dev` — start backend with `nodemon` (reloads on changes)
- `npm run seed` — run `src/seed.js` to insert seed data (if present)

---

## API reference

Base URL: `http://localhost:5000/api`

### GET /roles

List available predefined roles.

Response (example):

```json
{
  "count": 5,
  "roles": [
    "Backend Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Analyst"
  ]
}
```

### POST /skill-gap

Analyze skill gap for a role.

Request body:

```json
{
  "targetRole": "Backend Developer",
  "currentSkills": ["Git", "SQL"]
}
```

Response (example):

```json
{
  "role": "Backend Developer",
  "matchedSkills": ["Git"],
  "missingSkills": ["Node.js","Databases","REST APIs"],
  "recommendations": ["Learn Node.js via ...","Learn Databases via ..."],
  "suggestedLearningOrder": [ ... ]
}
```

### POST /roadmap

Generate a multi-phase roadmap for a role.

Request body:

```json
{ "targetRole": "Full Stack Developer" }
```

Response (example):

```json
{ "role": "Full Stack Developer", "roadmap": { "phase1": {...}, "phase2": {...} } }
```

### GET /news

Fetches curated Hacker News top stories used in the UI. Response includes `stories` array.

### POST /analysis

Stores an analysis document. Body should be similar to the skill-gap response. Useful for analytics.

---

## Frontend notes

- Frontend API base is configured in `frontend/src/services/api.js` (defaults to `http://localhost:5000/api`).
- Components:
  - `SkillGap.jsx` — role select, skills input, shows missing skills and recommendations and coverage percentage.
  - `Roadmap.jsx` — role select and multi-phase roadmap display.
  - `News.jsx` — sidebar tech news.

UI assets and styles are in `frontend/src/App.css` (project theme) and regular Tailwind-style classes are used in components where appropriate.

---

## Data model (brief)

- `Analysis` (Mongoose model) — stores targetRole, currentSkills, matchedSkills, missingSkills, recommendations and timestamps. See `backend/src/models/Analysis.js` for details.

---

## Troubleshooting

- If the frontend dropdown is empty: ensure the backend is running and `GET /api/roles` returns a list. Check `frontend/src/services/api.js` base URL if you host backend elsewhere.
- MongoDB connection errors: check `MONGO_URI` in `.env` and ensure MongoDB service is reachable.
- CORS errors: backend enables `cors()` by default; verify frontend is calling the correct port.

Logs are printed to the backend console; inspect them for stack traces.

---

## Deployment

This project is ready to be containerized or deployed to any Node + static hosting platform. Basic steps:

1. Build frontend: `cd frontend && npm run build`
2. Serve static `dist` alongside the backend or use a CDN / static host for the frontend.
3. Configure `MONGO_URI` and `PORT` environment variables on the server.

---

## Contributing

Feel free to open issues or PRs with improvements. Keep changes small and focused, add tests if applicable, and update this README when adding features.

---

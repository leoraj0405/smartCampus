# campus
# SmartCampus

SmartCampus is a full-stack web application to manage colleges: students, staff (teaching and non-teaching), admins, departments, hostels, and related features.

This repository contains two main folders:
- `server/` — TypeScript Node.js + Express backend (MySQL)
- `client/` — React + Vite frontend (TypeScript)

## Tech stack
- Backend: Node.js, Express, TypeScript
- Frontend: React, TypeScript, Vite
- Database: MySQL
- Auth: JWT (JWE middleware in `server/src/middleware/JWE`)
- File uploads: `multer` storing files under `server/uploads`

## Prerequisites
- Node.js (recommended v16+ or v18+)
- npm or pnpm
- MySQL server

---

## Quick start

1) Install dependencies for server and client

Windows PowerShell (from repo root):

```powershell
cd server
npm install
cd ..\client
npm install
```

2) Start the backend (development)

From `server` folder:

```powershell
# start in dev mode (uses ts-node / nodemon if configured)
npm run dev

# or build + start
npm run build
npm start
```

Note: on some Windows setups `npx` can be blocked by PowerShell execution policy. If a script fails with an `npx`/execution policy error, run the local binary directly:

```powershell
.
\node_modules\.bin\tsc -p tsconfig.json
```

3) Start the frontend (development)

From `client` folder:

```powershell
npm run dev
# open the URL printed by Vite (usually http://localhost:5173)
```

## API routes

Look in `server/src/router/` to see routes and controllers for each feature.

---

## TypeScript and building

- To compile the server TypeScript (from `server/`):

```powershell
npx tsc -p tsconfig.json
# or
.\node_modules\.bin\tsc -p tsconfig.json
```

- To build the client (from `client/`):

```powershell
npm run build
```

---

## Troubleshooting

- PowerShell execution policy may block `npx` scripts. Use the local binary at `node_modules\.bin\` or run PowerShell as Administrator and adjust execution policy if you understand the security implications.
- If DB connections fail, verify MySQL is running and env vars in `server/.env` match.
- If file uploads fail, ensure `server/uploads` folder exists and is writable by the server process.

---

If you'd like, I can:
- run a TypeScript compile and fix any remaining type errors,
- add explicit `IServiceResult<T>` return types across services/controllers,
- or create a small `.env.example` and a DB migration script to seed sample data.

Happy to continue — tell me which follow-up you want.

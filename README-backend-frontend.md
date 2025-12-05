## Project overview

Full‑stack task management app with JWT auth, Prisma + PostgreSQL backend, and React (Vite) frontend. Users can register, log in, and manage their own tasks (CRUD) with per‑user isolation.

## Tech stack

- **Frontend**: React (Vite, TS), TailwindCSS, Redux Toolkit, Axios, React Hook Form, Zod, React Router.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Zod, JWT (jsonwebtoken), bcrypt.

## Local setup

- **Backend env**: create `backend/.env` with:

  - **DATABASE_URL**: e.g. `postgresql://USER:PASSWORD@localhost:5432/taskdb`
  - **JWT_SECRET**: any strong secret string
  - **PORT**: `4000`

- **Database**:
  - Create a PostgreSQL database named `taskdb` (or adjust `DATABASE_URL`).
  - From `backend/`, run:
    - `npx prisma migrate dev --name init`

## Running backend & frontend

- **Backend** (`backend/`):
  - `npm run dev` – start dev server on `http://localhost:4000`
  - `npm run build` / `npm start` – build and run compiled server

- **Frontend** (`frontend/`):
  - `npm run dev` – start Vite dev server (default `http://localhost:5173`)
  - `npm run build` – build for production
  - `npm run start` – preview built app

## API documentation

- **Auth**
  - `POST /api/auth/register` → body `{ "username": string, "password": string }`  
    - **201** `{ user: { id, username }, token }`
  - `POST /api/auth/login` → body `{ "username": string, "password": string }`  
    - **200** `{ user: { id, username }, token }`

- **Tasks** (require `Authorization: Bearer <token>`)
  - `GET /api/tasks` → **200** array of tasks for the current user
  - `POST /api/tasks` → body `{ title, description?, status? }` → **201** created task
  - `PUT /api/tasks/:id` → body `{ title?, description?, status? }` → **200** updated task
  - `DELETE /api/tasks/:id` → **204** on success

Errors return JSON `{ "error": string }` with appropriate HTTP status codes.

## Example cURL

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"password"}'

curl -X POST http://localhost:4000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","password":"password"}'

curl -X POST http://localhost:4000/api/tasks \
  -H 'Authorization: Bearer <token>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"buy milk"}'
```






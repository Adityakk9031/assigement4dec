# Task Management App — Full Stack

A full-stack task management application with JWT authentication, built with React (Vite) frontend and Node.js/Express backend using Prisma ORM with PostgreSQL.

---

## Screenshots

Below are the screenshots for quick reference. You can copy these markdown image links directly into other files if needed.

![Screenshot 1](https://github.com/Adityakk9031/assigement4dec/blob/eaed44a733dbecec5d304acb69459db2035342e3/Screenshot_5-12-2025_17540_localhost.jpeg)

![Screenshot 2](https://github.com/Adityakk9031/assigement4dec/blob/eaed44a733dbecec5d304acb69459db2035342e3/Screenshot_5-12-2025_17552_localhost.jpeg)

![Screenshot 3](https://github.com/Adityakk9031/assigement4dec/blob/eaed44a733dbecec5d304acb69459db2035342e3/Screenshot_5-12-2025_17613_localhost.jpeg)

![Screenshot 4](https://github.com/Adityakk9031/assigement4dec/blob/eaed44a733dbecec5d304acb69459db2035342e3/Screenshot_5-12-2025_17637_localhost.jpeg)

![Screenshot 5](https://github.com/Adityakk9031/assigement4dec/blob/eaed44a733dbecec5d304acb69459db2035342e3/Screenshot_5-12-2025_17651_localhost.jpeg)

![Screenshot 6](https://github.com/Adityakk9031/assigement4dec/blob/1d58c4305e486742a3a22998319a7cc61664eb89/Screenshot_5-12-2025_17624_localhost.jpeg)

---

## 🚀 Quick Start Guide

### Prerequisites

* **Node.js** (v18 or higher)
* **PostgreSQL** database (local or cloud)
* **npm** or **yarn**

### Step 1: Set Up PostgreSQL Database

You need a PostgreSQL database. Choose one option:

**Option A: Local PostgreSQL**

```bash
createdb taskdb
# Or using psql:
psql -U postgres
CREATE DATABASE taskdb;
```

Your connection string will be: `postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskdb`

**Option B: Cloud PostgreSQL**

* **Supabase**, **Railway**, or **Neon** — create a database and copy the connection URI.

### Step 2: Backend Setup

1. `cd backend`
2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Edit `.env` with your values:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
JWT_SECRET=your_random_secret_key_here
PORT=4000
```

4. Install dependencies:

```bash
npm install
```

5. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

6. Start the backend server:

```bash
npm run dev
```

Server will run at `http://localhost:4000`

### Step 3: Frontend Setup

1. `cd frontend`
2. Install dependencies:

```bash
npm install
```

3. Start the frontend dev server:

```bash
npm run dev
```

App will open at `http://localhost:5173`

### Step 4: Use the Application

1. Open `http://localhost:5173`
2. Register a new account
3. Login and manage tasks

---

## 📁 Project Structure

```
assigement4dec/
├── backend/
│   ├── src/
│   │   ├── app.ts
│   │   ├── index.ts
│   │   ├── prisma.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── tasks.ts
│   │   └── validation/
│   │       ├── auth.ts
│   │       └── tasks.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.tsx
└── README.md
```

---

## 🔧 Available Scripts

### Backend

* `npm run dev` — start dev server
* `npm run build` — build TypeScript
* `npm start` — run compiled server
* `npm test` — run tests
* `npx prisma studio` — open Prisma Studio

### Frontend

* `npm run dev` — start Vite server
* `npm run build` — production build
* `npm run start` — preview
* `npm run lint` — ESLint

---

## 🔐 Environment Variables

### Backend `.env`

| Variable       | Description                   | Example                                        |
| -------------- | ----------------------------- | ---------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string  | `postgresql://user:pass@localhost:5432/taskdb` |
| `JWT_SECRET`   | Secret for signing JWT tokens | `your_random_secret_here`                      |
| `PORT`         | Server port                   | `4000`                                         |

### Frontend `.env` (optional)

```
VITE_API_URL=http://localhost:4000/api
```

---

## 📡 API Endpoints

### Authentication

* **POST** `/api/auth/register` — `{ username, password }` → `201 { user, token }`
* **POST** `/api/auth/login` — `{ username, password }` → `200 { user, token }`

### Tasks (protected)

* **GET** `/api/tasks` — list tasks for user
* **POST** `/api/tasks` — create task `{ title, description?, status? }`
* **PUT** `/api/tasks/:id` — update task
* **DELETE** `/api/tasks/:id` — delete task

---

## 📝 Database Schema (brief)

* **User**: `id`, `username` (unique), `password` (hashed), `createdAt`
* **Task**: `id`, `title`, `description`, `status` (`pending` | `completed`), `userId`, `createdAt`, `updatedAt`

---

## 🐛 Troubleshooting

* **Cannot find module '.prisma/client'**: run `npx prisma generate`
* **Database connection error**: check `DATABASE_URL` and DB status
* **Port already in use**: change `PORT` or kill the process
* **Frontend can't connect**: ensure backend is running and `VITE_API_URL` is correct

---

## 🧪 Testing

Backend tests use Jest + Supertest. To run:

```bash
cd backend
npm test
```

Make sure `DATABASE_URL` in your environment points to a test DB.

---

## 📄 License

ISC

---

## ✏️ Copy & Paste (full file)

If you want to quickly copy the entire README, open this document and copy everything — it's already in markdown format and ready to paste into `README.md` in your repo.

---

If you want any edits (shorter, longer, add badges, or change the cover image), tell me which parts to update.

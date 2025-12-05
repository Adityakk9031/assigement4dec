# Task Management App - Full Stack

A full-stack task management application with JWT authentication, built with React (Vite) frontend and Node.js/Express backend using Prisma ORM with PostgreSQL.

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** database (local or cloud)
- **npm** or **yarn**

### Step 1: Set Up PostgreSQL Database

You need a PostgreSQL database. Choose one option:

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a database:
   ```bash
   createdb taskdb
   # Or using psql:
   psql -U postgres
   CREATE DATABASE taskdb;
   ```
3. Your connection string will be: `postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskdb`

#### Option B: Cloud PostgreSQL (Free Options)
- **Supabase**: https://supabase.com (free tier available)
  - Go to Project Settings → Database → Connection String
  - Copy the "URI" connection string
- **Railway**: https://railway.app (free tier available)
  - Create a new PostgreSQL service
  - Copy the connection string from the Variables tab
- **Neon**: https://neon.tech (free tier available)
  - Create a project and copy the connection string

### Step 2: Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Create `.env` file:**
   ```bash
   # Copy the example file
   cp .env.example .env
   ```

3. **Edit `.env` file** with your actual values:
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
   JWT_SECRET=your_random_secret_key_here
   PORT=4000
   ```
   
   **Important:**
   - Replace `DATABASE_URL` with your actual PostgreSQL connection string
   - Replace `JWT_SECRET` with a random string (you can generate one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `PORT` is optional (defaults to 4000)

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
   This will create the `User` and `Task` tables in your database.

6. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:4000`

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

### Step 4: Use the Application

1. Open `http://localhost:5173` in your browser
2. **Register** a new account (username + password)
3. **Login** with your credentials
4. Start creating and managing tasks!

## 📁 Project Structure

```
assigement4dec/
├── backend/
│   ├── src/
│   │   ├── app.ts              # Express app setup
│   │   ├── index.ts            # Server entry point
│   │   ├── prisma.ts           # Prisma client singleton
│   │   ├── middleware/
│   │   │   └── auth.ts         # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── auth.ts         # Auth routes (register/login)
│   │   │   └── tasks.ts        # Task CRUD routes
│   │   └── validation/
│   │       ├── auth.ts         # Auth validation schemas (Zod)
│   │       └── tasks.ts       # Task validation schemas (Zod)
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── tests/                  # Jest + Supertest tests
│   └── .env                    # Environment variables (create this)
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts       # Axios instance with auth
│   │   ├── components/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── TaskListPage.tsx
│   │   │   └── TaskFormPage.tsx
│   │   ├── store/
│   │   │   ├── store.ts        # Redux store
│   │   │   ├── authSlice.ts    # Auth state
│   │   │   └── tasksSlice.ts   # Tasks state
│   │   └── App.tsx             # Main app with routing
│   └── .env                    # Frontend env (optional)
└── README.md                   # This file
```

## 🔧 Available Scripts

### Backend (`backend/`)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run the compiled server
- `npm test` - Run Jest tests with coverage
- `npx prisma studio` - Open Prisma Studio (database GUI)

### Frontend (`frontend/`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run start` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

### Backend `.env` (Required)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/taskdb` |
| `JWT_SECRET` | Secret for signing JWT tokens | `your_random_secret_here` |
| `PORT` | Server port (optional) | `4000` |

### Frontend `.env` (Optional)

Currently, the frontend uses a hardcoded API URL (`http://localhost:4000/api`). If you need to change it, you can:

1. Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
2. Update `frontend/src/api/client.ts` to use `import.meta.env.VITE_API_URL`

## 📡 API Endpoints

### Authentication

- **POST** `/api/auth/register`
  - Body: `{ "username": string, "password": string }`
  - Returns: `201 { user: { id, username }, token }`

- **POST** `/api/auth/login`
  - Body: `{ "username": string, "password": string }`
  - Returns: `200 { user: { id, username }, token }`

### Tasks (Require `Authorization: Bearer <token>`)

- **GET** `/api/tasks` - Get all tasks for logged-in user
- **POST** `/api/tasks` - Create task
  - Body: `{ "title": string, "description"?: string, "status"?: "pending" | "completed" }`
- **PUT** `/api/tasks/:id` - Update task (only owner)
  - Body: `{ "title"?: string, "description"?: string, "status"?: "pending" | "completed" }`
- **DELETE** `/api/tasks/:id` - Delete task (only owner)

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

Tests use Jest + Supertest and require a test database. Make sure your `DATABASE_URL` in `.env` points to a test database or the tests will use your main database.

## 🐛 Troubleshooting

### "Cannot find module '.prisma/client'"
Run: `npx prisma generate` in the `backend/` folder

### "Database connection error"
- Check your `DATABASE_URL` in `backend/.env`
- Ensure PostgreSQL is running (if local)
- Verify database credentials and network access (if cloud)

### "Port already in use"
Change `PORT` in `backend/.env` or kill the process using port 4000

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:4000`
- Check browser console for CORS errors
- Verify `frontend/src/api/client.ts` has correct `baseURL`

## 📝 Database Schema

- **User**: `id`, `username` (unique), `password` (hashed), `createdAt`
- **Task**: `id`, `title`, `description` (optional), `status` (pending/completed), `userId`, `createdAt`, `updatedAt`

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, Redux Toolkit, React Router, React Hook Form, Zod, Axios
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT, bcrypt, Zod
- **Testing**: Jest, Supertest, React Testing Library (optional)

## 📄 License

ISC



# How to Start Both Servers

## Quick Start Guide

You need **TWO terminal windows** - one for backend, one for frontend.

### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Server running on http://localhost:4000
```

### Terminal 2: Frontend Server

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Then Open Browser

Go to: `http://localhost:5173`

---

## Troubleshooting

### Error: "Failed to load resource: net::ERR_CONNECTION_REFUSED"

**This means backend is not running!**

**Solution:**
1. Open a terminal
2. `cd backend`
3. `npm run dev`
4. Wait for "Server running on http://localhost:4000"
5. Then refresh your browser

### Error: "Cannot connect to database"

**Check:**
1. Make sure `backend/.env` exists
2. Make sure `DATABASE_URL` is correct
3. Make sure PostgreSQL database is accessible

### Error: "Port 4000 already in use"

**Solution:**
1. Find what's using port 4000:
   ```bash
   # Windows
   netstat -ano | findstr :4000
   ```
2. Kill that process or change PORT in `backend/.env`

---

## About the Sentry Errors

The Sentry errors you see are **NOT from our app**. They're from:
- Browser extensions (like temp email extensions)
- Other websites trying to inject scripts

**You can ignore them** - they don't affect our app.

---

## Quick Checklist

- [ ] Backend running on `http://localhost:4000`
- [ ] Frontend running on `http://localhost:5173`
- [ ] Backend `.env` file exists with DATABASE_URL, JWT_SECRET, PORT
- [ ] Database is accessible
- [ ] Browser is open to `http://localhost:5173`


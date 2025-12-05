# 🚀 Quick Start Guide - Fix Connection Refused Error

## The Problem

You're seeing: `Failed to load resource: net::ERR_CONNECTION_REFUSED` on `:4000/api/auth/register`

**This means your backend server is NOT running!**

---

## ✅ Solution: Start the Backend Server

### Option 1: Use the Batch File (Windows)

1. **Double-click** `start-backend.bat` in the project root
2. Wait for: `Server running on http://localhost:4000`
3. **Keep this window open!**

### Option 2: Manual Start (Any OS)

1. **Open a terminal/command prompt**
2. Navigate to backend:
   ```bash
   cd backend
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. You should see:
   ```
   Server running on http://localhost:4000
   ```
5. **Keep this terminal open!**

---

## 🎯 Complete Setup (Two Terminals Needed)

### Terminal 1: Backend
```bash
cd backend
npm run dev
```
**Wait for:** `Server running on http://localhost:4000`

### Terminal 2: Frontend  
```bash
cd frontend
npm run dev
```
**Wait for:** `Local: http://localhost:5173/`

---

## 🔍 Verify It's Working

1. Backend terminal shows: `Server running on http://localhost:4000`
2. Frontend terminal shows: `Local: http://localhost:5173/`
3. Open browser: `http://localhost:5173`
4. Try registering/login - should work now!

---

## ⚠️ Common Issues

### Issue: "Cannot find module"
**Fix:**
```bash
cd backend
npm install
```

### Issue: "Port 4000 already in use"
**Fix:** Something else is using port 4000. Either:
- Close that program, OR
- Change PORT in `backend/.env` to another number (e.g., `PORT=4001`)

### Issue: "Database connection error"
**Fix:** Check `backend/.env` has correct `DATABASE_URL`

---

## 📝 About Sentry Errors

The Sentry errors (`sentry-internal.temp-mail.io`) are **NOT from our app**. They're from browser extensions. **You can ignore them** - they don't affect functionality.

---

## ✅ Checklist

- [ ] Backend server is running (`npm run dev` in `backend/` folder)
- [ ] See message: `Server running on http://localhost:4000`
- [ ] Frontend server is running (`npm run dev` in `frontend/` folder)
- [ ] Browser is open to `http://localhost:5173`
- [ ] Backend terminal is still open (don't close it!)

---

## 🆘 Still Not Working?

1. **Check backend terminal** - are there any error messages?
2. **Check backend/.env exists** - with DATABASE_URL, JWT_SECRET, PORT
3. **Try accessing backend directly:**
   - Open: `http://localhost:4000/api/auth/login` in browser
   - Should see an error (that's OK - means backend is running!)

---

**Remember:** The backend MUST be running for the frontend to work! Keep the backend terminal open.


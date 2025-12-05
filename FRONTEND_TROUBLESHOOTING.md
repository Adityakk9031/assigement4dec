# Frontend Troubleshooting Guide

## Issue: Nothing showing on frontend

### Step 1: Check if frontend server is running

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 2: Open browser and check console

1. Open `http://localhost:5173` in your browser
2. Press `F12` to open Developer Tools
3. Check the **Console** tab for errors
4. Check the **Network** tab to see if files are loading

### Step 3: Common Issues and Fixes

#### Issue: Blank white screen

**Possible causes:**
1. **Tailwind CSS not loading** - Check if `postcss.config.js` exists
2. **JavaScript errors** - Check browser console
3. **Backend not running** - Frontend needs backend API

**Fix:**
- Make sure `frontend/postcss.config.js` exists (I just created it)
- Make sure backend is running on `http://localhost:4000`
- Clear browser cache and refresh

#### Issue: "Cannot connect to backend"

**Symptoms:**
- Login/Register forms show but API calls fail
- Network errors in browser console

**Fix:**
1. Make sure backend is running:
   ```bash
   cd backend
   npm run dev
   ```
2. Check backend is on `http://localhost:4000`
3. Check `frontend/src/api/client.ts` has correct `baseURL`

#### Issue: Tailwind styles not applying

**Symptoms:**
- Page loads but looks unstyled (no colors, spacing, etc.)

**Fix:**
1. Make sure `postcss.config.js` exists in `frontend/` folder
2. Make sure `tailwind.config.js` exists
3. Make sure `src/index.css` has Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Restart the dev server after creating `postcss.config.js`

### Step 4: Verify File Structure

Make sure these files exist:

```
frontend/
├── postcss.config.js      ← Required for Tailwind!
├── tailwind.config.js
├── vite.config.ts
├── src/
│   ├── index.css          ← Must have @tailwind directives
│   ├── main.tsx
│   ├── App.tsx
│   ├── api/
│   │   └── client.ts
│   ├── components/
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── TaskListPage.tsx
│   │   └── TaskFormPage.tsx
│   └── store/
│       ├── store.ts
│       ├── authSlice.ts
│       └── tasksSlice.ts
```

### Step 5: Test the Flow

1. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend (in new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open browser:**
   - Go to `http://localhost:5173`
   - You should see the **Login** page
   - If you see a blank page, check browser console (F12)

4. **Test registration:**
   - Click "Register" link
   - Create an account
   - Should redirect to tasks page

### Step 6: Check Browser Console Errors

Common errors and fixes:

**Error: "Failed to fetch" or "Network Error"**
- Backend not running
- CORS issue (should be handled by backend)

**Error: "Cannot find module"**
- Run `npm install` in frontend folder
- Restart dev server

**Error: "Tailwind CSS" related**
- Make sure `postcss.config.js` exists
- Restart dev server

### Quick Fix Checklist

- [ ] Backend is running on `http://localhost:4000`
- [ ] Frontend is running on `http://localhost:5173`
- [ ] `postcss.config.js` exists in `frontend/` folder
- [ ] `tailwind.config.js` exists
- [ ] Browser console shows no errors
- [ ] Network tab shows API calls are working

### Still Not Working?

1. **Clear everything and restart:**
   ```bash
   # Stop both servers (Ctrl+C)
   # Clear node_modules and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Check if backend is accessible:**
   ```bash
   curl http://localhost:4000/api/auth/login
   # Should return an error (expected, but shows backend is running)
   ```

3. **Check browser compatibility:**
   - Use Chrome, Firefox, or Edge (latest versions)
   - Disable browser extensions that might interfere

4. **Share the error:**
   - Open browser console (F12)
   - Copy any red error messages
   - Share them for help


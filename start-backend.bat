@echo off
echo Starting Backend Server...
cd backend
echo.
echo Checking environment...
if not exist .env (
    echo ERROR: .env file not found!
    echo Please create backend/.env with DATABASE_URL, JWT_SECRET, and PORT
    pause
    exit /b 1
)
echo.
echo Starting server on http://localhost:4000
echo Press Ctrl+C to stop
echo.
npm run dev


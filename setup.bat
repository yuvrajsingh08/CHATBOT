@echo off
REM JavaScript Interview Coach - Quick Start Script for Windows

echo.
echo ====================================
echo JavaScript Interview Coach Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Installing backend dependencies...
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo [2/4] Installing frontend dependencies...
cd ..\client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Update server\.env with your Groq API key
echo    - Visit https://console.groq.com to get a free API key
echo.
echo 2. Start the backend:
echo    cd server
echo    npm start
echo.
echo 3. In another terminal, start the frontend:
echo    cd client
echo    npm run dev
echo.
echo 4. Open http://localhost:5173 in your browser
echo.
pause

@echo off
title TaskFlow
cd /d "%~dp0"

echo.
echo ========================================
echo   TASKFLOW - Gestor de Tareas
echo ========================================
echo.

echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no instalado. Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo [OK] Node.js OK
echo.

echo [2/4] Instalando dependencias...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Fallo npm install
    pause
    exit /b 1
)
echo [OK] Dependencias instaladas
cd ..
echo.

echo [3/4] Verificando base de datos...
echo [OK] SQLite (no requiere MongoDB)
echo.

echo [4/4] Iniciando aplicacion...
echo.
echo ========================================
echo   Backend: http://localhost:5000
echo ========================================
echo.

start "" "%~dp0frontend\index.html"

set BACKEND_DIR=%~dp0backend
start "TaskFlow Backend" cmd /k "cd /d %BACKEND_DIR% && node server.js"

echo.
echo Aplicacion iniciada.
echo.
pause

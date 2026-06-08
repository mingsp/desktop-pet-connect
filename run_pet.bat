@echo off
setlocal
cd /d "%~dp0"
where pythonw >nul 2>nul
if %errorlevel%==0 (
  start "" pythonw "%~dp0pet_runtime.py" --scale 1
) else (
  python "%~dp0pet_runtime.py" --scale 1
)

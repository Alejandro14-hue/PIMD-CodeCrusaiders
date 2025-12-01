@echo off
REM Script para iniciar el backend FastAPI en Windows

echo.
echo ========================================
echo   FastAPI Backend - Casos Medicos
echo ========================================
echo.

REM Verificar si el entorno virtual existe
if not exist "venv" (
    echo Creando entorno virtual...
    python -m venv venv
)

REM Activar entorno virtual
echo Activando entorno virtual...
call venv\Scripts\activate.bat

REM Instalar/actualizar dependencias
echo Instalando dependencias...
pip install -r requirements.txt

REM Iniciar el servidor
echo.
echo Iniciando servidor en http://localhost:8000
echo Documentacion disponible en http://localhost:8000/docs
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

python main.py

pause

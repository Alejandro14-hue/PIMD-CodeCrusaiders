#!/bin/bash

# Script para iniciar el backend FastAPI en macOS/Linux

echo ""
echo "========================================"
echo "  FastAPI Backend - Casos Medicos"
echo "========================================"
echo ""

# Verificar si el entorno virtual existe
if [ ! -d "venv" ]; then
    echo "Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar entorno virtual
echo "Activando entorno virtual..."
source venv/bin/activate

# Instalar/actualizar dependencias
echo "Instalando dependencias..."
pip install -r requirements.txt

# Iniciar el servidor
echo ""
echo "Iniciando servidor en http://localhost:8000"
echo "Documentacion disponible en http://localhost:8000/docs"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

python main.py

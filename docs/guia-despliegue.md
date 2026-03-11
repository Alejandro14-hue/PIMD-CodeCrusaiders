# Guía de Despliegue — CodeCrusaders

Versión 1.0 — Marzo 2026

---

## 1. Requisitos Previos

### Software necesario

| Software | Versión mínima | Enlace |
|:---------|:---------------|:-------|
| Docker | 20.10+ | https://docs.docker.com/get-docker/ |
| Docker Compose | 2.0+ | Incluido con Docker Desktop |
| Git | 2.30+ | https://git-scm.com/ |
| Node.js (solo desarrollo local) | 18+ | https://nodejs.org/ |
| Python (solo desarrollo local) | 3.11+ | https://python.org/ |

### Cuentas y credenciales necesarias

- **Google Cloud Console:** Proyecto con OAuth 2.0 configurado para obtener `CLIENT_ID` y `CLIENT_SECRET`
- **Servidor de producción:** Acceso SSH configurado
- **MongoDB:** Instancia disponible (en producción se levanta con Docker)

---

## 2. Configuración de Variables de Entorno

Crear el archivo `backend-fastapi/.env` basándose en `.env.example`:

```bash
cp backend-fastapi/.env.example backend-fastapi/.env
```

Editar con los valores reales:

```env
# Entorno
FASTAPI_ENV=development          # development | production
DEBUG=true                        # true | false

# Google OAuth 2.0
GOOGLE_CLIENT_ID=tu-client-id-de-google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# Seguridad
SECRET_KEY=una-clave-secreta-segura-y-larga

# OAuth Callback
OAUTH_REDIRECT_URI=http://localhost:8001/auth/callback

# MongoDB
MONGODB_URL=mongodb://usuario:contraseña@localhost:27017/codecrusaders?authSource=admin

# CORS (separados por coma)
CORS_ORIGINS=http://localhost:8081,http://localhost:5173

# URL del frontend (para redirecciones tras login/logout)
FRONTEND_URL=http://localhost:8081
```

> **⚠️ IMPORTANTE:** Nunca subir el archivo `.env` al repositorio. Verificar que está incluido en `.gitignore`.

---

## 3. Despliegue en Desarrollo

### Opción A: Docker Compose (recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/Alejandro14-hue/PIMD-CodeCrusaiders.git
cd PIMD-CodeCrusaiders

# 2. Configurar variables de entorno
cp backend-fastapi/.env.example backend-fastapi/.env
# Editar backend-fastapi/.env con los valores correctos

# 3. Levantar los servicios
docker-compose up --build

# Frontend disponible en: http://localhost:8081
# Backend disponible en:  http://localhost:8001
```

### Opción B: Ejecución manual

**Backend:**
```bash
cd backend-fastapi

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd front_proyecto

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# El frontend estará disponible en http://localhost:5173
```

> **Nota:** En ejecución manual, asegurarse de tener una instancia de MongoDB accesible y correctamente configurada en el `.env`.

---

## 4. Despliegue en Producción

### 4.1 Configuración del servidor

Requisitos del servidor:
- Linux (Ubuntu 20.04+ recomendado)
- Docker y Docker Compose instalados
- Puerto 80 abierto (o el que se configure)
- Acceso SSH configurado (puerto 11305 según workflow actual)

### 4.2 Primer despliegue manual

```bash
# Conectarse al servidor
ssh -p 11305 usuario@servidor

# Clonar el repositorio
cd /var/www
git clone https://github.com/Alejandro14-hue/PIMD-CodeCrusaiders.git
cd PIMD-CodeCrusaiders

# Configurar variables de entorno
cp backend-fastapi/.env.example backend-fastapi/.env
# Editar con valores de producción:
# - FASTAPI_ENV=production
# - DEBUG=false
# - SECRET_KEY=clave-segura-generada
# - OAUTH_REDIRECT_URI=https://tu-dominio.com/auth/callback
# - MONGODB_URL=mongodb://CodeCrusaders:password@mongodb:27017/codecrusaders?authSource=admin
# - FRONTEND_URL=https://tu-dominio.com

# Levantar con docker-compose de producción
docker-compose -f docker-compose.prod.yml up -d --build
```

### 4.3 Despliegues automáticos (CI/CD)

El despliegue se automatiza con GitHub Actions. Al hacer push a la rama `main`:

1. Se activa el workflow `.github/workflows/deploy.yml`
2. Se conecta al servidor por SSH
3. Ejecuta `git pull origin main`
4. Reconstruye los contenedores con `docker-compose down && docker-compose up -d --build`

**Secrets necesarios en GitHub (Settings → Secrets and variables → Actions):**

| Secret | Descripción |
|:-------|:------------|
| `SERVER_HOST` | IP o dominio del servidor |
| `SERVER_USER` | Usuario SSH |
| `SERVER_SSH_KEY` | Clave privada SSH |

---

## 5. Servicios Docker en Producción

El archivo `docker-compose.prod.yml` define tres servicios:

| Servicio | Imagen base | Puerto expuesto | Descripción |
|:---------|:------------|:---------------:|:------------|
| `frontend` | nginx:alpine | 80 | Archivos estáticos + reverse proxy |
| `backend` | python:3.11-slim | 8000 | API FastAPI |
| `mongodb` | mongo:4.4 | 27017 | Base de datos |

### Comandos útiles en producción

```bash
# Ver logs de todos los servicios
docker-compose -f docker-compose.prod.yml logs -f

# Ver logs de un servicio específico
docker-compose -f docker-compose.prod.yml logs -f backend

# Reiniciar un servicio
docker-compose -f docker-compose.prod.yml restart backend

# Detener todo
docker-compose -f docker-compose.prod.yml down

# Reconstruir y levantar
docker-compose -f docker-compose.prod.yml up -d --build

# Ver estado de los contenedores
docker-compose -f docker-compose.prod.yml ps

# Acceder a la shell de MongoDB
docker-compose -f docker-compose.prod.yml exec mongodb mongosh
```

---

## 6. Configuración de Google OAuth

1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un proyecto o seleccionar uno existente
3. Ir a **APIs & Services → Credentials**
4. Crear credenciales → **OAuth 2.0 Client ID**
5. Tipo: **Web Application**
6. Añadir en **Authorized redirect URIs:**
   - Desarrollo: `http://localhost:8001/auth/callback`
   - Producción: `https://tu-dominio.com/auth/callback`
7. Copiar el `Client ID` y `Client Secret` al archivo `.env`

---

## 7. Verificación del Despliegue

Tras desplegar, verificar que todo funciona:

```bash
# 1. Health check del backend
curl http://localhost:8000/health
# Respuesta esperada: {"ok": true, "message": "API en funcionamiento"}

# 2. Verificar que los casos se cargan
curl http://localhost:8000/v1/api/random/?n=1
# Respuesta esperada: {"ok": true, "message": "...", "data": [...]}

# 3. Acceder al frontend desde el navegador
# http://localhost:8081 (desarrollo)
# http://tu-dominio.com (producción)
```

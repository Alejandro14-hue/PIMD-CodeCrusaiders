# Configuración del Entorno de Desarrollo — CodeCrusaders

Versión 1.0 — Marzo 2026

---

## 1. Variables de Entorno del Backend

El backend utiliza un archivo `.env` ubicado en `backend-fastapi/.env`. Se proporciona una plantilla en `.env.example`.

### Lista completa de variables

| Variable | Obligatoria | Valor por defecto | Descripción |
|:---------|:-----------:|:-----------------:|:------------|
| `FASTAPI_ENV` | No | `development` | Entorno de ejecución |
| `DEBUG` | No | `true` | Modo debug activado |
| `GOOGLE_CLIENT_ID` | **Sí** | — | Client ID de Google OAuth 2.0 |
| `GOOGLE_CLIENT_SECRET` | **Sí** | — | Client Secret de Google OAuth 2.0 |
| `SECRET_KEY` | **Sí** | `unsafe-secret-key` | Clave para firmar cookies de sesión |
| `OAUTH_REDIRECT_URI` | **Sí** | — | URI de callback para OAuth |
| `MONGODB_URL` | **Sí** | — | URL de conexión a MongoDB |
| `CORS_ORIGINS` | No | `*` | Orígenes permitidos para CORS (separados por coma) |
| `FRONTEND_URL` | No | `http://localhost:8080` | URL del frontend para redirecciones |

### Ejemplo para desarrollo local

```env
FASTAPI_ENV=development
DEBUG=true
GOOGLE_CLIENT_ID=123456789-abcdef.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxx
SECRET_KEY=mi-clave-secreta-para-desarrollo
OAUTH_REDIRECT_URI=http://localhost:8001/auth/callback
MONGODB_URL=mongodb://root:password@localhost:27017/codecrusaders?authSource=admin
CORS_ORIGINS=http://localhost:5173,http://localhost:8081
FRONTEND_URL=http://localhost:8081
```

### Ejemplo para producción

```env
FASTAPI_ENV=production
DEBUG=false
GOOGLE_CLIENT_ID=123456789-abcdef.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxx
SECRET_KEY=una-clave-segura-de-al-menos-32-caracteres-generada-aleatoriamente
OAUTH_REDIRECT_URI=https://mi-dominio.com/auth/callback
MONGODB_URL=mongodb://CodeCrusaders:password@mongodb:27017/codecrusaders?authSource=admin
CORS_ORIGINS=https://mi-dominio.com
FRONTEND_URL=https://mi-dominio.com
```

---

## 2. Dependencias del Backend (Python)

Archivo: `backend-fastapi/requirements.txt`

| Paquete | Propósito |
|:--------|:----------|
| `fastapi` | Framework web asíncrono |
| `uvicorn` | Servidor ASGI para ejecutar FastAPI |
| `pydantic` | Validación de datos y serialización |
| `python-multipart` | Soporte para formularios multipart |
| `authlib` | Librería OAuth 2.0 / OpenID Connect |
| `httpx` | Cliente HTTP asíncrono (dependencia de authlib) |
| `itsdangerous` | Firmas criptográficas (dependencia de SessionMiddleware) |
| `python-dotenv` | Carga de variables de entorno desde `.env` |
| `motor` | Driver asíncrono para MongoDB |

### Instalación

```bash
cd backend-fastapi
python -m venv venv
.\venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

---

## 3. Dependencias del Frontend (Node.js)

Archivo: `front_proyecto/package.json`

### Dependencias de producción

| Paquete | Versión | Propósito |
|:--------|:--------|:----------|
| `react` | ^19.2.0 | Librería de componentes UI |
| `react-dom` | ^19.2.0 | Renderizado de React en el DOM |

### Dependencias de desarrollo

| Paquete | Versión | Propósito |
|:--------|:--------|:----------|
| `vite` | ^7.3.1 | Bundler y dev server |
| `@vitejs/plugin-react-swc` | ^4.2.2 | Plugin Vite para React con SWC |
| `eslint` | ^9.39.1 | Linter de JavaScript |
| `@eslint/js` | ^9.39.1 | Configuración base de ESLint |
| `eslint-plugin-react-hooks` | ^7.0.1 | Reglas de ESLint para hooks de React |
| `eslint-plugin-react-refresh` | ^0.4.24 | Reglas de ESLint para React Refresh |
| `globals` | ^16.5.0 | Variables globales para ESLint |
| `@types/react` | ^19.2.7 | Tipos TypeScript de React |
| `@types/react-dom` | ^19.2.3 | Tipos TypeScript de React DOM |

### Instalación

```bash
cd front_proyecto
npm install
```

### Scripts disponibles

| Script | Comando | Descripción |
|:-------|:--------|:------------|
| `dev` | `npm run dev` | Servidor de desarrollo con hot reload |
| `build` | `npm run build` | Genera la build de producción en `dist/` |
| `preview` | `npm run preview` | Previsualiza la build de producción |
| `lint` | `npm run lint` | Ejecuta ESLint sobre el código |

---

## 4. Configuración de Vite

Archivo: `front_proyecto/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
```

> **Nota para desarrollo local sin Docker:** Para que las llamadas a la API funcionen correctamente en desarrollo local, puede ser necesario configurar un proxy en `vite.config.js`:
>
> ```javascript
> export default defineConfig({
>   plugins: [react()],
>   server: {
>     proxy: {
>       '/api': 'http://localhost:8000'
>     }
>   }
> })
> ```

---

## 5. Configuración de Nginx

Archivo: `nginx.conf` (raíz del proyecto)

El reverse proxy Nginx tiene las siguientes reglas:

| Ruta | Destino | Descripción |
|:-----|:--------|:------------|
| `/` | Archivos estáticos en `/usr/share/nginx/html` | Frontend (SPA con fallback a `index.html`) |
| `/api/v1/auth/*` | `http://backend:8000/auth/*` | Endpoints de autenticación |
| `/api/v1/api/*` | `http://backend:8000/v1/api/*` | Endpoints de casos clínicos |
| `/auth/*` | `http://backend:8000/auth/*` | Proxy legacy directo |
| `/health` | `http://backend:8000/health` | Health check |
| `/api/*` | `http://backend:8000/*` | Proxy genérico de API |

---

## 6. Puertos por Defecto

| Servicio | Desarrollo | Producción |
|:---------|:----------:|:----------:|
| Frontend (Vite dev) | 5173 | — |
| Frontend (Nginx) | 8081 | 80 |
| Backend (FastAPI) | 8001 (host) → 8000 (contenedor) | 8000 |
| MongoDB | 27017 | 27017 |

---

## 7. GitHub Secrets para CI/CD

Configurar en: **Repositorio → Settings → Secrets and variables → Actions**

| Secret | Descripción | Ejemplo |
|:-------|:------------|:--------|
| `SERVER_HOST` | IP o dominio del servidor de producción | `123.45.67.89` |
| `SERVER_USER` | Usuario SSH del servidor | `deploy` |
| `SERVER_SSH_KEY` | Clave privada SSH (formato PEM) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

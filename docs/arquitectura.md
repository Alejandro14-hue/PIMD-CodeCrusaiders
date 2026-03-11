# Arquitectura del Sistema — CodeCrusaders

Versión 1.0 — Marzo 2026

---

## 1. Visión General

La aplicación CodeCrusaders es una plataforma web que permite a profesionales médicos consultar y evaluar casos clínicos almacenados en una base de datos. La arquitectura sigue un patrón **cliente-servidor** con separación clara entre frontend y backend, comunicándose mediante una API REST.

```
┌────────────────┐        ┌─────────────┐        ┌──────────────┐
│   Frontend     │◄──────►│   Nginx     │◄──────►│   Backend    │
│  (React/Vite)  │  HTTP  │  (Reverse   │  HTTP  │  (FastAPI)   │
│                │        │   Proxy)    │        │              │
└────────────────┘        └─────────────┘        └──────┬───────┘
                                                        │
                                                        ▼
                                                 ┌──────────────┐
                                                 │   MongoDB    │
                                                 │  (Motor)     │
                                                 └──────────────┘
```

---

## 2. Componentes Principales

### 2.1 Frontend (`front_proyecto/`)

- **Framework:** React 19 con Vite 7
- **Lenguaje:** JavaScript (JSX)
- **Build:** Vite con plugin `@vitejs/plugin-react-swc`
- **Servidor producción:** Nginx (servido como archivos estáticos tras `npm run build`)

El frontend se encarga de:
- Autenticación del usuario (redirigiendo a Google OAuth vía backend)
- Presentar una lista de casos clínicos en una barra lateral
- Mostrar los detalles de un caso seleccionado
- Ofrecer un formulario de valoración con 5 criterios

### 2.2 Backend (`backend-fastapi/`)

- **Framework:** FastAPI (Python 3.11)
- **Servidor ASGI:** Uvicorn
- **Base de datos:** MongoDB (driver asíncrono `motor`)
- **Autenticación:** Google OAuth 2.0 (librería `authlib`)
- **Sesiones:** `SessionMiddleware` de Starlette (cookies firmadas con `SECRET_KEY`)

El backend expone:
- Endpoints de autenticación (`/auth/*`)
- Endpoints de consulta de casos clínicos (`/v1/api/*`)
- Endpoint de health check (`/health`)

### 2.3 Base de Datos (MongoDB)

- **Nombre de la BD:** `codecrusaders`
- **Colección principal:** `casos` — almacena los casos clínicos con campos como edad, sexo, antecedentes, síntomas, diagnóstico, tratamiento, etc.
- **Driver:** `motor` (AsyncIOMotorClient) para operaciones asíncronas

### 2.4 Reverse Proxy (Nginx)

Nginx actúa como punto de entrada unificado:
- Sirve los archivos estáticos del frontend en `/`
- Redirige las peticiones de API (`/api/v1/api/*`) al backend FastAPI
- Redirige las peticiones de autenticación (`/api/v1/auth/*`) al backend

---

## 3. Flujo de Datos

### 3.1 Autenticación

```
Usuario → Frontend (clic "Iniciar sesión")
  → Nginx redirige /api/v1/auth/login → Backend /auth/login
    → Redirige al usuario a Google OAuth
      → Google devuelve token → Backend /auth/callback
        → Guarda sesión en cookie → Redirige al Frontend
          → Frontend llama /api/v1/auth/me → Obtiene datos del usuario
```

### 3.2 Consulta de Casos

```
Frontend (al cargar) → GET /api/v1/api/random/?n=5
  → Nginx proxy → Backend /v1/api/random/
    → MongoDB: $sample(5) → Devuelve 5 casos aleatorios
      → Frontend muestra en sidebar

Usuario selecciona caso → GET /api/v1/api/{caso_id}
  → Nginx proxy → Backend /v1/api/{caso_id}
    → MongoDB: find_one({_id}) → Devuelve caso completo
      → Frontend muestra detalle + formulario de valoración
```

---

## 4. Infraestructura de Despliegue

```
┌──────────────────────────────────────────────────────┐
│                Docker Compose                         │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │  frontend    │  │  backend    │  │  mongodb      │ │
│  │  (nginx)     │  │  (uvicorn)  │  │  (mongo:4.4)  │ │
│  │  Puerto: 80  │  │  Puerto:8000│  │  Puerto:27017 │ │
│  └─────────────┘  └─────────────┘  └──────────────┘ │
│                                                       │
└──────────────────────────────────────────────────────┘
```

- **Desarrollo:** `docker-compose.yml` (sin MongoDB, se conecta a instancia externa)
- **Producción:** `docker-compose.prod.yml` (incluye contenedor MongoDB)
- **CI/CD:** GitHub Actions — al hacer push a `main`, se conecta al servidor por SSH, hace `git pull` y reconstruye contenedores

---

## 5. Estructura de Directorios

```
/PIMD-CodeCrusaiders
├── backend-fastapi/
│   ├── app/
│   │   ├── core/           # Configuración y conexión a BD
│   │   │   ├── config.py   # Variables de entorno
│   │   │   └── database.py # Conexión Motor/MongoDB
│   │   ├── controllers/    # (vacío — sin uso actualmente)
│   │   ├── data/           # Datos de ejemplo (casos.json)
│   │   ├── routes/         # Definición de endpoints
│   │   │   ├── auth.py     # Autenticación Google OAuth
│   │   │   └── casos_routes.py # CRUD de casos
│   │   └── services/       # Lógica de negocio
│   │       └── casos_service.py # Operaciones sobre MongoDB
│   ├── main.py             # Punto de entrada FastAPI
│   ├── requirements.txt    # Dependencias Python
│   ├── Dockerfile          # Imagen Docker del backend
│   └── .env.example        # Plantilla de variables de entorno
├── front_proyecto/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   ├── layout/     # AppLayout (estructura general)
│   │   │   ├── login/      # LoginPage
│   │   │   ├── sidebar/    # CasesSidebar
│   │   │   └── case-detail/# CaseDetailPanel, CaseFieldsList, RatingForm
│   │   ├── hooks/          # Custom hooks (useAuth, useCases)
│   │   ├── services/       # Servicios HTTP (authService, caseService)
│   │   ├── utils/          # Utilidades (formatters)
│   │   ├── App.jsx         # Componente raíz
│   │   └── main.jsx        # Punto de entrada React
│   ├── package.json        # Dependencias Node.js
│   ├── vite.config.js      # Configuración de Vite
│   ├── Dockerfile          # Imagen Docker multi-stage (build + nginx)
│   └── nginx.conf          # Configuración Nginx (duplicada en raíz)
├── docs/                   # Documentación del proyecto
├── nginx.conf              # Configuración Nginx (usada por docker-compose)
├── docker-compose.yml      # Entorno de desarrollo
├── docker-compose.prod.yml # Entorno de producción
└── .github/workflows/
    └── deploy.yml          # CI/CD para despliegue automático
```

---

## 6. Tecnologías y Versiones

| Tecnología | Versión | Uso |
|:-----------|:--------|:----|
| Python | 3.11 | Lenguaje del backend |
| FastAPI | Última | Framework web del backend |
| Uvicorn | Última | Servidor ASGI |
| Motor | Última | Driver asíncrono de MongoDB |
| Authlib | Última | OAuth 2.0 / OpenID Connect |
| MongoDB | 4.4 | Base de datos NoSQL |
| React | 19.2 | Librería del frontend |
| Vite | 7.3 | Bundler y dev server |
| Nginx | Alpine | Reverse proxy y servidor de archivos estáticos |
| Docker | — | Contenización |
| Docker Compose | — | Orquestación de contenedores |
| GitHub Actions | — | CI/CD |

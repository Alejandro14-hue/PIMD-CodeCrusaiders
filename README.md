<div align="center">

# 🏥 App Chatbot Hospital de Talavera

### Asistente Inteligente y Validador de Casos Clínicos

[![Estado](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow?style=for-the-badge)](https://github.com/Alejandro14-hue/PIMD-CodeCrusaiders)
[![Versión](https://img.shields.io/badge/Versión-1.0-blue?style=for-the-badge)](https://github.com/Alejandro14-hue/PIMD-CodeCrusaiders)

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-3.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

</div>

## 🎯 ¿Qué es este Proyecto?

Esta aplicación es una solución intermodular diseñada para modernizar la asistencia sanitaria en el **Hospital de Talavera de la Reina**. 

Permite a los profesionales médicos acceder a un **asistente de IA especializado**, visualizar registros y validar casos clínicos de forma dinámica, integrando el trabajo de estudiantes de **DAM, DAW y el curso de Especialización en IA**.

### ✨ Características Principales

- 🤖 **Chatbot IA Especializado**: Entrenado para responder consultas según protocolos locales.
- 📋 **Gestión de Casos Clínicos**: Validar historiales y datos médicos de forma eficiente.
- 🔐 **Arquitectura Segura**: Comunicación cifrada entre React y FastAPI.
- 📱 **Diseño Responsivo**: Totalmente funcional en dispositivos móviles y escritorio.

---

## 🏗️ Arquitectura del Sistema

Hemos implementado una arquitectura moderna desacoplada para garantizar velocidad y escalabilidad.

```mermaid
graph TB
    subgraph Capa_Presentacion["🖥️ CAPA DE PRESENTACIÓN"]
        UI[React 19 + Tailwind CSS<br/>Desplegado con Vite]
    end
    
    subgraph Capa_Aplicacion["⚙️ CAPA DE APLICACIÓN"]
        FastAPI[FastAPI Server<br/>Python 3.11]
        Safety[Validación Pydantic]
        Auth[Gestión de Sesiones]
    end
    
    subgraph Capa_Datos["💾 CAPA DE DATOS"]
        MDB[(MongoDB<br/>Casos Clínicos y Logs)]
    end
    
    UI -->|HTTPS / REST API| FastAPI
    FastAPI --> Safety
    Safety --> Auth
    Auth --> MDB
    
    style Capa_Presentacion fill:#61dafb,stroke:#333,stroke-width:3px,color:#000
    style Capa_Aplicacion fill:#009688,stroke:#333,stroke-width:3px,color:#fff
    style Capa_Datos fill:#47a248,stroke:#333,stroke-width:3px,color:#fff
```

---

## 🎨 Flujo de la Aplicación

### Interfaz (Frontend)

El flujo de usuario está optimizado para la rapidez que requiere un entorno hospitalario:

```mermaid
graph LR
    Login[🔑 Acceso] --> Dash[🏠 Dashboard]
    Dash --> Chat[💬 Chatbot IA]
    Dash --> Validar[📋 Validador Casos]
    Dash --> Docs[📑 Documentación]

    style Login fill:#4A90E2,stroke:#333,stroke-width:2px,color:#fff
    style Chat fill:#7ED321,stroke:#333,stroke-width:2px,color:#fff
```

---

## ⚡ Instalación y Configuración

### 1️⃣ Requisitos Previos
- **Python 3.11+**
- **Node.js 18+**
- **MongoDB** corriendo en local o vía Docker

### 2️⃣ Backend (FastAPI)
```bash
cd backend-fastapi
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3️⃣ Frontend (React + Vite)
```bash
cd front_proyecto
npm install
npm run dev
```

---

## 🐳 Despliegue con Docker

Para una configuración rápida "un solo click":

```bash
# Levantar el ecosistema completo
docker compose up -d

# Detener servicios
docker compose down
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19**: Interfaz declarativa y reactiva.
- **Vite**: Bundler de última generación.
- **Tailwind CSS**: Estilizado basado en utilidades.

### Backend
- **FastAPI**: Rendimiento similar a Go/Node gracias a Python asíncrono.
- **Motor**: Acceso asíncrono a MongoDB.
- **Pydantic**: Seguridad de tipos y esquemas.

### Almacenamiento
- **MongoDB**: Flexibilidad total para datos médicos complejos.

---

## 👥 Equipo y Colaboración

<div align="center">

| Curso | Integrantes |
|:--- |:--- |
| **2º DAM** | **Alvaro Rodrigo Cantalejo** *(Líder DAM)*<br>Adrián Sánchez Elvira<br>Alejandro Galán Martín<br>Omar Barrero Calderón |
| **2º DAW** | **Diego Gonzalez Toledano** *(Líder DAW)*<br>Claudia Rodriguez<br>Hugo Rubio |

</div>

---

<div align="center">

## � Recursos

[![Docs](https://img.shields.io/badge/Docs-Proyecto-blue?style=for-the-badge)](./docs)
[![Web](https://img.shields.io/badge/IES-Ribera%20del%20Tajo-green?style=for-the-badge)](https://iesriberadeltajo.es)

**Chatbot Talavera** - *Proyecto Educativo 2025-2026*

</div>

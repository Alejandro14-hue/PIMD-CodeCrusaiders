# FastAPI Backend - Casos Médicos

Backend en FastAPI para la gestión de casos clínicos médicos.

## Requisitos

- Python 3.8+
- pip

## Instalación

### 1. Crear un entorno virtual (recomendado)

```bash
python -m venv venv
venv\Scripts\activate  # En Windows
# o
source venv/bin/activate  # En macOS/Linux
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

## Uso

### Ejecutar el servidor

```bash
python main.py
```

O con uvicorn directamente:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El servidor estará disponible en: `http://localhost:8000`

## Documentación interactiva

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Endpoints

### GET /

Devuelve información general de la API.

**Respuesta:**

```json
{
  "ok": true,
  "message": "Bienvenido a la API de Casos Médicos",
  "version": "1.0.0",
  "docs": "/docs",
  "redoc": "/redoc"
}
```

### GET /health

Verifica el estado de la API.

**Respuesta:**

```json
{
  "ok": true,
  "message": "API en funcionamiento"
}
```

### GET /v1/api/{caso_id}

Obtiene un caso específico por su ID.

**Parámetros:**

- `caso_id` (integer, path): ID del caso

**Respuesta exitosa:**

```json
{
  "ok": true,
  "message": "Caso obtenido correctamente",
  "data": {
    "id": 1,
    "edad": "45 años",
    "sexo": "Masculino",
    ...
  }
}
```

**Respuesta de error (404):**

```json
{
  "detail": "Caso no encontrado"
}
```

### GET /v1/api/

Obtiene todos los casos.

**Respuesta:**

```json
{
  "ok": true,
  "message": "Casos obtenidos correctamente",
  "data": [
    {
      "id": 1,
      "edad": "45 años",
      ...
    }
  ]
}
```

### GET /v1/api/categoria/{categoria}

Obtiene todos los casos de una categoría específica.

**Parámetros:**

- `categoria` (string, path): Categoría de los casos

**Respuesta:**

```json
{
  "ok": true,
  "message": "Casos de Cardiología obtenidos correctamente",
  "data": [...]
}
```

### GET /v1/api/search/?q=keyword

Busca casos por palabra clave.

**Parámetros:**

- `q` (string, query): Palabra clave de búsqueda

**Respuesta:**

```json
{
  "ok": true,
  "message": "Búsqueda completada para 'IAM'",
  "data": [...]
}
```

## Estructura del proyecto

```
FastAPI Backend/
├── app/
│   ├── __init__.py
│   ├── controllers/
│   ├── data/
│   │   └── casos.json
│   ├── routes/
│   │   ├── __init__.py
│   │   └── casos_routes.py
│   └── services/
│       ├── __init__.py
│       └── casos_service.py
├── main.py
├── requirements.txt
├── .env.example
└── README.md
```

## Migración desde Node.js Express

La API FastAPI es equivalente a la API Express anterior con las siguientes mejoras:

- ✅ Documentación interactiva automática (Swagger/ReDoc)
- ✅ Validación de tipos con Pydantic
- ✅ CORS habilitado por defecto
- ✅ Mejor manejo de errores
- ✅ Rendimiento superior
- ✅ Desarrollo más rápido

## Notas de desarrollo

- El archivo `casos.json` contiene los datos de ejemplo
- CORS está configurado para permitir todas las orígenes (cambiar en producción)
- La recarga automática está habilitada en desarrollo

## Próximas mejoras

- [ ] Base de datos en lugar de JSON
- [ ] Autenticación y autorización
- [ ] Endpoints para crear/actualizar/eliminar casos
- [ ] Tests unitarios
- [ ] Docker support

# Referencia de la API — CodeCrusaders

Versión 1.0 — Marzo 2026

---

## Información General

- **Base URL:** `http://<host>:<port>`
- **Formato de respuestas:** JSON
- **Autenticación:** Sesiones basadas en cookies (tras Google OAuth)

---

## 1. Endpoints de Autenticación (`/auth`)

### `GET /auth/login`

Inicia el flujo de autenticación con Google OAuth.

- **Descripción:** Redirige al usuario a la página de consentimiento de Google.
- **Autenticación requerida:** No
- **Respuesta:** Redirección HTTP 302 a Google

---

### `GET /auth/callback`

Callback de Google OAuth tras la autenticación.

- **Descripción:** Recibe el token de Google, extrae la información del usuario y la almacena en la sesión.
- **Autenticación requerida:** No (es el propio flujo OAuth)
- **Respuesta exitosa:** Redirección HTTP 302 a `FRONTEND_URL`
- **Respuesta error:**
```json
{
  "error": "Descripción del error"
}
```

---

### `GET /auth/me`

Obtiene los datos del usuario autenticado.

- **Descripción:** Devuelve la información del perfil del usuario almacenada en la sesión.
- **Autenticación requerida:** Sí (cookie de sesión)
- **Respuesta exitosa (200):**
```json
{
  "sub": "google-user-id",
  "name": "Nombre del Usuario",
  "email": "usuario@ejemplo.com",
  "picture": "https://lh3.googleusercontent.com/..."
}
```
- **Respuesta error (401):**
```json
{
  "error": "Not authenticated"
}
```

---

### `GET /auth/logout`

Cierra la sesión del usuario.

- **Descripción:** Elimina los datos del usuario de la sesión.
- **Autenticación requerida:** Sí (cookie de sesión)
- **Respuesta:** Redirección HTTP 302 a `FRONTEND_URL`

---

## 2. Endpoints de Casos Clínicos (`/v1/api`)

Todos los endpoints de esta sección devuelven respuestas con la siguiente estructura:

```json
{
  "ok": true | false,
  "message": "Mensaje descriptivo",
  "data": [ ... ] | { ... } | null
}
```

---

### `GET /v1/api/`

Obtiene todos los casos clínicos.

- **Descripción:** Devuelve la lista completa de casos almacenados en la base de datos.
- **Autenticación requerida:** No (actualmente sin protección)
- **Parámetros:** Ninguno
- **Respuesta exitosa (200):**
```json
{
  "ok": true,
  "message": "Casos obtenidos correctamente",
  "data": [
    {
      "_id": "6789abc...",
      "edad": "45 años",
      "sexo": "Masculino",
      "motivo": "Dolor torácico de inicio reciente",
      "diagnostico_final": "Infarto agudo de miocardio inferior",
      "categoria": "Cardiología",
      ...
    }
  ]
}
```

---

### `GET /v1/api/random/?n={cantidad}`

Obtiene N casos clínicos aleatorios.

- **Descripción:** Devuelve una muestra aleatoria de casos usando la operación `$sample` de MongoDB.
- **Autenticación requerida:** No
- **Parámetros query:**

| Parámetro | Tipo | Obligatorio | Por defecto | Descripción |
|:---------:|:----:|:-----------:|:-----------:|:------------|
| `n` | int | No | 5 | Número de casos aleatorios (mín: 1, máx: 50) |

- **Respuesta exitosa (200):**
```json
{
  "ok": true,
  "message": "5 casos aleatorios obtenidos correctamente",
  "data": [ ... ]
}
```

---

### `GET /v1/api/search/?q={palabra_clave}`

Busca casos clínicos por palabra clave.

- **Descripción:** Busca coincidencias (case-insensitive) en los campos `keywords`, `diagnostico_final` y `motivo`.
- **Autenticación requerida:** No
- **Parámetros query:**

| Parámetro | Tipo | Obligatorio | Descripción |
|:---------:|:----:|:-----------:|:------------|
| `q` | string | Sí | Palabra clave para buscar |

- **Respuesta exitosa con resultados (200):**
```json
{
  "ok": true,
  "message": "Búsqueda completada para 'infarto'",
  "data": [ ... ]
}
```
- **Respuesta sin resultados (200):**
```json
{
  "ok": false,
  "message": "No se encontraron resultados para 'xyz'",
  "data": []
}
```

---

### `GET /v1/api/categoria/{categoria}`

Obtiene casos por categoría médica.

- **Descripción:** Filtra casos cuyo campo `categoria` coincida con el valor proporcionado (búsqueda con regex, case-insensitive).
- **Autenticación requerida:** No
- **Parámetros path:**

| Parámetro | Tipo | Descripción |
|:---------:|:----:|:------------|
| `categoria` | string | Nombre de la categoría (ej: "Cardiología") |

- **Respuesta exitosa (200):**
```json
{
  "ok": true,
  "message": "Casos de Cardiología obtenidos correctamente",
  "data": [ ... ]
}
```
- **Respuesta error (404):**
```json
{
  "detail": "No se encontraron casos en la categoría 'Dermatología'"
}
```

---

### `GET /v1/api/{caso_id}`

Obtiene un caso clínico por su ID.

- **Descripción:** Devuelve un caso específico buscando por `_id` (ObjectId de MongoDB).
- **Autenticación requerida:** No
- **Parámetros path:**

| Parámetro | Tipo | Descripción |
|:---------:|:----:|:------------|
| `caso_id` | string | ID del caso (ObjectId en formato string) |

- **Respuesta exitosa (200):**
```json
{
  "ok": true,
  "message": "Caso obtenido correctamente",
  "data": {
    "_id": "6789abc...",
    "edad": "45 años",
    "sexo": "Masculino",
    ...
  }
}
```
- **Respuesta error (404):**
```json
{
  "detail": "Caso no encontrado"
}
```

---

### `GET /health`

Verifica el estado de la API.

- **Descripción:** Endpoint de health check para monitorización.
- **Autenticación requerida:** No
- **Respuesta (200):**
```json
{
  "ok": true,
  "message": "API en funcionamiento"
}
```

---

## 3. Estructura de un Caso Clínico

Cada caso clínico almacenado en MongoDB tiene los siguientes campos:

| Campo | Tipo | Descripción |
|:------|:-----|:------------|
| `_id` | ObjectId (string) | Identificador único de MongoDB |
| `edad` | string | Edad del paciente |
| `sexo` | string | Sexo del paciente |
| `antecedentes_medicos` | string | Historial médico previo |
| `antecedentes_quirurgicos` | string | Cirugías previas |
| `habitos` | string | Hábitos del paciente (tabaco, alcohol, etc.) |
| `situacion_basal` | string | Estado funcional del paciente |
| `medicacion_actual` | string | Medicamentos que toma |
| `antecedentes_familiares` | string | Historial familiar relevante |
| `motivo` | string | Motivo de consulta |
| `sintomas` | string | Síntomas presentados |
| `exploracion_general` | string | Resultados de la exploración física |
| `signos` | string | Signos clínicos observados |
| `resultados_pruebas` | string | Resultados de pruebas complementarias |
| `razonamiento_clinico` | string | Razonamiento diagnóstico |
| `diagnostico_final` | string | Diagnóstico final |
| `tratamiento_farmacologico` | string | Tratamiento con medicamentos |
| `tratamiento_no_farmacologico` | string | Tratamiento no farmacológico |
| `factores_sociales` | string | Factores sociales relevantes |
| `alergias` | string | Alergias conocidas |
| `referencias_bibliograficas` | string | Referencias médicas |
| `categoria` | string | Categoría médica (ej: Cardiología) |
| `keywords` | string | Palabras clave para búsqueda |
| `codigo_cie_10` | string | Código CIE-10 del diagnóstico |
| `dificultad` | string | Nivel de dificultad (Baja, Media, Alta) |
| `chunk_id` | string | ID del fragmento |
| `chunk` | string | Resumen textual del caso |

---

## 4. Rutas del Frontend → Backend (vía Nginx)

El frontend utiliza rutas con prefijo `/api/v1/` que Nginx traduce al backend:

| Frontend llama a | Nginx redirige a | Descripción |
|:-----------------|:-----------------|:------------|
| `/api/v1/auth/login` | `backend:8000/auth/login` | Iniciar OAuth |
| `/api/v1/auth/callback` | `backend:8000/auth/callback` | Callback OAuth |
| `/api/v1/auth/me` | `backend:8000/auth/me` | Datos del usuario |
| `/api/v1/auth/logout` | `backend:8000/auth/logout` | Cerrar sesión |
| `/api/v1/api/` | `backend:8000/v1/api/` | Listar todos los casos |
| `/api/v1/api/random/` | `backend:8000/v1/api/random/` | Casos aleatorios |
| `/api/v1/api/search/?q=` | `backend:8000/v1/api/search/?q=` | Buscar casos |
| `/api/v1/api/{id}` | `backend:8000/v1/api/{id}` | Caso por ID |
| `/health` | `backend:8000/health` | Health check |

# Esquema de Base de Datos — CodeCrusaders

Versión 1.1 — Marzo 2026

---

## 1. Motor de Base de Datos

- **Sistema:** MongoDB 4.4
- **Driver:** Motor (AsyncIOMotorClient para Python/FastAPI)
- **Nombre de la base de datos:** `codecrusaders`

---

## 2. Colecciones

### 2.1 Colección: `casos`

Almacena los casos clínicos generados por IA y validados por profesionales, así como las evaluaciones (notas) que los usuarios realizan sobre cada caso.

**Ejemplo de documento:**

```json
{
  "_id": ObjectId("6789abcdef1234567890abcd"),
  "edad": "45 años",
  "sexo": "Masculino",
  "antecedentes_medicos": "Hipertensión arterial desde hace 5 años",
  "antecedentes_quirurgicos": "Apendicectomía a los 20 años",
  "habitos": "Fumador ocasional, no alcohol",
  "situacion_basal": "Independiente, trabaja como oficinista",
  "medicacion_actual": "Enalapril 10 mg cada 12 h",
  "antecedentes_familiares": "Padre con infarto a los 60 años",
  "motivo": "Dolor torácico de inicio reciente",
  "sintomas": "Dolor opresivo retroesternal, sudoración, disnea leve",
  "exploracion_general": "TA 150/95 mmHg, FC 92 lpm, SatO2 96%",
  "signos": "No estertores, ruidos cardíacos normales",
  "resultados_pruebas": "ECG con elevación del ST en DII, DIII, aVF; troponina elevada",
  "razonamiento_clinico": "Dolor torácico típico con alteraciones ECG y enzimáticas",
  "diagnostico_final": "Infarto agudo de miocardio inferior",
  "tratamiento_farmacologico": "AAS, clopidogrel, atorvastatina, heparina",
  "tratamiento_no_farmacologico": "Reposo, dieta baja en grasas, educación sanitaria",
  "factores_sociales": "Estrés laboral, vida sedentaria",
  "alergias": "Sin alergias conocidas",
  "referencias_bibliograficas": "Guía ESC 2023 sobre síndrome coronario agudo",
  "categoria": "Cardiología",
  "keywords": "IAM, dolor torácico, ECG, infarto",
  "codigo_cie_10": "I21.1",
  "dificultad": "Media",
  "chunk_id": "1",
  "chunk": "Paciente de 45 años con dolor torácico. Diagnóstico de infarto agudo de miocardio.",
  "notas": [
    {
      "user_id": ObjectId("507f1f77bcf86cd799439011"),
      "precision_diagnostica": 4,
      "claridad_textual": 5,
      "relevancia_clinica": 4,
      "adecuacion_contextual": 5,
      "nivel_tecnico_adecuado": 4,
      "comentario": "Caso muy representativo, pero faltaría detallar los tiempos de actuación."
    }
  ]
}
```

**Esquema de campos principales:**

| Campo | Tipo | Descripción | Indexado |
|---|---|---|---|
| `_id` | ObjectId | Identificador único generado por MongoDB | Sí (automático) |
| `edad` | String | Edad del paciente | No |
| `sexo` | String | Sexo biológico del paciente | No |
| `antecedentes_medicos` | String | Historial de enfermedades previas | No |
| `antecedentes_quirurgicos` | String | Intervenciones quirúrgicas previas | No |
| `habitos` | String | Hábitos de vida (tabaco, alcohol, etc.) | No |
| `situacion_basal` | String | Estado funcional previo del paciente | No |
| `medicacion_actual` | String | Medicamentos que toma actualmente | No |
| `antecedentes_familiares` | String | Historial médico familiar relevante | No |
| `motivo` | String | Motivo de consulta / queja principal | No |
| `sintomas` | String | Síntomas que presenta el paciente | No |
| `exploracion_general` | String | Resultados de la exploración física | No |
| `signos` | String | Signos clínicos observados | No |
| `resultados_pruebas` | String | Resultados de pruebas complementarias | No |
| `razonamiento_clinico` | String | Explicación del razonamiento diagnóstico | No |
| `diagnostico_final` | String | Diagnóstico definitivo | No |
| `tratamiento_farmacologico` | String | Tratamiento con medicamentos | No |
| `tratamiento_no_farmacologico` | String | Tratamientos no farmacológicos | No |
| `factores_sociales` | String | Factores sociales que influyen en el caso | No |
| `alergias` | String | Alergias conocidas del paciente | No |
| `referencias_bibliograficas` | String | Fuentes y guías clínicas de referencia | No |
| `categoria` | String | Categoría médica (Cardiología, Neumología, etc.) | No |
| `keywords` | String | Palabras clave para búsqueda (separadas por coma) | No |
| `codigo_cie_10` | String | Código de clasificación internacional CIE-10 | No |
| `dificultad` | String | Nivel de dificultad: Baja, Media, Alta | No |
| `chunk_id` | String | Identificador del fragmento de texto | No |
| `chunk` | String | Resumen corto del caso en texto plano | No |
| `notas` | Array | Evaluaciones del caso realizadas por los usuarios | No |

**Estructura del subdocumento `notas`:**

| Campo | Tipo | Descripción |
|---|---|---|
| `user_id` | ObjectId | Referencia al usuario (`_id` de la colección `usuarios`) que evalúa |
| `precision_diagnostica` | Number | Puntuación del 1 al 5 |
| `claridad_textual` | Number | Puntuación del 1 al 5 |
| `relevancia_clinica` | Number | Puntuación del 1 al 5 |
| `adecuacion_contextual` | Number | Puntuación del 1 al 5 |
| `nivel_tecnico_adecuado` | Number | Puntuación del 1 al 5 |
| `comentario` | String | Texto con la opinión cualitativa del usuario |

---

### 2.2 Colección: `usuarios`

Almacena la información de los usuarios registrados, habitualmente sincronizada o autenticada a través de Google.

**Ejemplo de documento:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "google_id": "104839201948392019384",
  "email": "doctor.ejemplo@gmail.com",
  "name": "Dr. Juan Pérez",
  "picture": "[https://lh3.googleusercontent.com/a-/AOh14Gj](https://lh3.googleusercontent.com/a-/AOh14Gj)...",
  "created_at": ISODate("2026-03-11T12:00:00Z")
}
```

**Esquema de campos:**

| Campo | Tipo | Descripción | Indexado |
|---|---|---|---|
| `_id` | ObjectId | Identificador único generado por MongoDB | Sí (automático) |
| `google_id` | String | ID único de la cuenta de Google del usuario | Sí (Único recomendado) |
| `email` | String | Correo electrónico de contacto | Sí (Único recomendado) |
| `name` | String | Nombre completo del usuario | No |
| `picture` | String | URL de la foto de perfil | No |
| `created_at` | Date | Fecha y hora de creación de la cuenta | No |

---

## 3. Consultas Utilizadas

### 3.1 Obtener todos los casos
```javascript
db.casos.find()
```

### 3.2 Obtener un caso por ID
```javascript
db.casos.findOne({ _id: ObjectId("6789abcdef1234567890abcd") })
```

### 3.3 Obtener N casos aleatorios
```javascript
db.casos.aggregate([{ $sample: { size: 5 } }])
```

### 3.4 Buscar por palabra clave
```javascript
db.casos.find({
  $or: [
    { keywords: { $regex: "infarto", $options: "i" } },
    { diagnostico_final: { $regex: "infarto", $options: "i" } },
    { motivo: { $regex: "infarto", $options: "i" } }
  ]
})
```

### 3.5 Filtrar por categoría
```javascript
db.casos.find({
  categoria: { $regex: "Cardiología", $options: "i" }
})
```

### 3.6 Obtener usuario por Email
```javascript
db.usuarios.findOne({ email: "doctor.ejemplo@gmail.com" })
```

---

## 4. Conexión desde el Backend

La conexión se establece en `backend-fastapi/app/core/database.py`:

```python
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)
db = client.codecrusaders
casos_collection = db.casos
usuarios_collection = db.usuarios
```

La URL de conexión se configura mediante la variable de entorno `MONGODB_URL` en el archivo `.env`.

---

## 5. Datos de Prueba

El archivo `backend-fastapi/app/data/casos.json` contiene un caso clínico de ejemplo que puede usarse para poblar la base de datos en desarrollo:

```bash
# Importar datos de ejemplo a MongoDB
mongoimport --uri "mongodb://usuario:password@localhost:27017/codecrusaders" \
  --collection casos \
  --jsonArray \
  --file backend-fastapi/app/data/casos.json \
  --authenticationDatabase admin
```

---

## 6. Credenciales de MongoDB en Producción

Configuradas en `docker-compose.prod.yml`:

| Variable | Descripción |
|---|---|
| `MONGO_INITDB_ROOT_USERNAME` | Usuario administrador de MongoDB |
| `MONGO_INITDB_ROOT_PASSWORD` | Contraseña del administrador |

Los datos se persisten en el volumen Docker `mongo_data` montado en `/data/db`.

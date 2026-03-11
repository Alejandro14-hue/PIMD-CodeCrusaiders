# Componentes del Frontend — CodeCrusaders

Versión 1.0 — Marzo 2026

---

## 1. Stack Tecnológico

| Tecnología | Versión | Propósito |
|:-----------|:--------|:----------|
| React | 19.2 | Librería de UI |
| Vite | 7.3 | Bundler y servidor de desarrollo |
| @vitejs/plugin-react-swc | 4.2 | Compilador SWC para JSX (más rápido que Babel) |
| ESLint | 9.39 | Linter de código |

---

## 2. Árbol de Componentes

```
App
├── LoginPage              (si el usuario NO está autenticado)
└── AppLayout              (si el usuario SÍ está autenticado)
    ├── Sidebar (header + CasesSidebar)
    │   └── CasesSidebar
    │       └── Lista de casos (items clicables)
    └── Main Area
        └── CaseDetailPanel
            ├── CaseFieldsList   (campos del caso)
            └── RatingForm       (formulario de valoración)
```

---

## 3. Componentes

### 3.1 `App` — `src/App.jsx`

**Descripción:** Componente raíz de la aplicación. Gestiona el flujo de autenticación y la selección de casos.

**Lógica:**
- Usa `useAuth()` para obtener el estado de autenticación
- Usa `useCases()` para obtener los casos clínicos
- Si `loading` → muestra pantalla de carga
- Si no hay `user` → renderiza `<LoginPage>`
- Si hay `user` → renderiza `<AppLayout>` con sidebar y panel de detalle

**Props:** Ninguna (componente raíz)

---

### 3.2 `LoginPage` — `src/components/login/LoginPage.jsx`

**Descripción:** Página de inicio de sesión con botón de Google OAuth.

**Props:**

| Prop | Tipo | Descripción |
|:-----|:-----|:------------|
| `onLogin` | `() => void` | Función que inicia el flujo de autenticación |

**Comportamiento:** Al hacer clic en el botón, llama a `onLogin()` que redirige al usuario a `/api/v1/auth/login` → Google OAuth.

---

### 3.3 `AppLayout` — `src/components/layout/AppLayout.jsx`

**Descripción:** Layout principal de la aplicación con sidebar izquierdo, topbar con info del usuario, y área de contenido.

**Props:**

| Prop | Tipo | Descripción |
|:-----|:-----|:------------|
| `sidebar` | `ReactNode` | Contenido del sidebar (recibe `<CasesSidebar>`) |
| `children` | `ReactNode` | Contenido principal (recibe `<CaseDetailPanel>`) |
| `user` | `object` | Datos del usuario autenticado (`name`, `email`) |
| `onLogout` | `() => void` | Función para cerrar sesión |

**Estructura visual:**
```
┌────────────────┬────────────────────────────┐
│  🏥 Logo       │  Usuario ·  [Cerrar sesión]│
│  Code Crusaders│                            │
├────────────────┤                            │
│                │                            │
│   Sidebar      │      Contenido Principal   │
│  (casos)       │      (detalle del caso)    │
│                │                            │
│                │                            │
└────────────────┴────────────────────────────┘
```

---

### 3.4 `CasesSidebar` — `src/components/sidebar/CasesSidebar.jsx`

**Descripción:** Barra lateral que muestra la lista de casos clínicos disponibles. Permite seleccionar un caso para ver su detalle.

**Props:**

| Prop | Tipo | Descripción |
|:-----|:-----|:------------|
| `cases` | `Array<Case>` | Lista de casos a mostrar |
| `selectedCaseId` | `string \| null` | ID del caso actualmente seleccionado |
| `onSelectCase` | `(id: string) => void` | Callback cuando el usuario selecciona un caso |

**Comportamiento:**
- Muestra "No hay casos disponibles" si `cases` está vacío
- Cada item muestra el campo `motivo` del caso (o `Caso {id}` como fallback)
- El caso seleccionado tiene la clase CSS `is-active`

---

### 3.5 `CaseDetailPanel` — `src/components/case-detail/CaseDetailPanel.jsx`

**Descripción:** Panel principal que muestra el detalle de un caso seleccionado y el formulario de valoración.

**Props:**

| Prop | Tipo | Descripción |
|:-----|:-----|:------------|
| `selectedCase` | `Case \| null` | Caso clínico seleccionado o null |

**Comportamiento:**
- Si no hay caso seleccionado → muestra mensaje "Selecciona un caso de la lista"
- Si hay caso → muestra título, `<CaseFieldsList>` y `<RatingForm>`

---

### 3.6 `CaseFieldsList` — `src/components/case-detail/CaseFieldsList.jsx`

**Descripción:** Lista todos los campos de un caso clínico en formato etiqueta-valor, excluyendo campos internos.

**Props:**

| Prop | Tipo | Descripción |
|:-----|:-----|:------------|
| `caso` | `Case` | Objeto con todos los campos del caso |

**Campos excluidos:** `_id`, `id`, `chunk_id`, `chunk`, y los 5 campos de valoración (`Precisión diagnóstica`, `Claridad textual`, `Relevancia clínica`, `Adecuación contextual`, `Nivel técnico adecuado`).

**Formato de etiquetas:** Las claves se transforman reemplazando `_` con espacios y capitalizando cada palabra (función `formatLabel` de `utils/formatters.js`).

---

### 3.7 `RatingForm` — `src/components/case-detail/RatingForm.jsx`

**Descripción:** Formulario para que el profesional médico valore un caso clínico en 5 criterios, cada uno con una puntuación del 1 al 5.

**Props:**

| Prop | Tipo | Descripción |
|:-----|:-----|:------------|
| `caseId` | `string` | ID del caso que se está valorando |

**Criterios de valoración:**

| Criterio | Descripción |
|:---------|:------------|
| Precisión diagnóstica | ¿El diagnóstico del caso es correcto? |
| Claridad textual | ¿El texto del caso es claro y comprensible? |
| Relevancia clínica | ¿El caso es clínicamente relevante? |
| Adecuación contextual | ¿El contexto del paciente es adecuado? |
| Nivel técnico adecuado | ¿El nivel de detalle técnico es apropiado? |

**Estado:** Cada criterio tiene una puntuación (1-5), inicializada a 5 por defecto.

> **Nota:** Actualmente, el `handleSubmit` no envía los datos al backend. La persistencia de puntuaciones está pendiente de implementar.

---

## 4. Custom Hooks

### 4.1 `useAuth` — `src/hooks/useAuth.js`

**Descripción:** Gestiona la autenticación del usuario.

**Retorno:**

| Propiedad | Tipo | Descripción |
|:----------|:-----|:------------|
| `user` | `object \| null` | Datos del usuario autenticado o null |
| `loading` | `boolean` | Si está verificando la autenticación |
| `login` | `() => void` | Inicia el flujo OAuth |
| `logout` | `() => void` | Cierra la sesión |
| `checkAuth` | `() => Promise` | Re-verifica la autenticación |

**Flujo:** Al montar, llama a `authService.getUser()` (GET `/api/v1/auth/me`). Si responde con datos, el usuario está autenticado.

---

### 4.2 `useCases` — `src/hooks/useCases.js`

**Descripción:** Gestiona la carga, selección y obtención de detalle de casos clínicos.

**Retorno:**

| Propiedad | Tipo | Descripción |
|:----------|:-----|:------------|
| `cases` | `Array<Case>` | Lista de casos cargados (5 aleatorios) |
| `selectedCaseId` | `string \| null` | ID del caso seleccionado |
| `setSelectedCaseId` | `(id: string) => void` | Función para seleccionar un caso |
| `selectedCase` | `Case \| null` | Datos completos del caso seleccionado |

**Flujo:**
1. Al montar → carga 5 casos aleatorios desde `caseService.getCases()`
2. Al seleccionar un `selectedCaseId` → carga detalles completos desde `caseService.getCaseById(id)`
3. Devuelve los detalles completos o, como fallback, el caso de la lista original

---

## 5. Servicios

### 5.1 `authService` — `src/services/authService.js`

| Método | Endpoint | Descripción |
|:-------|:---------|:------------|
| `getUser()` | GET `/api/v1/auth/me` | Obtiene datos del usuario autenticado |
| `login()` | Redirección a `/api/v1/auth/login` | Inicia OAuth con Google |
| `logout()` | Redirección a `/api/v1/auth/logout` | Cierra sesión |

### 5.2 `caseService` — `src/services/caseService.js`

| Método | Endpoint | Descripción |
|:-------|:---------|:------------|
| `getCases()` | GET `/api/v1/api/random/` | Obtiene 5 casos aleatorios |
| `getCaseById(id)` | GET `/api/v1/api/{id}` | Obtiene un caso por su ID |

---

## 6. Utilidades

### `formatters.js` — `src/utils/formatters.js`

- **`EXCLUDED_CASE_FIELDS`**: Set con los nombres de campos que no se muestran en la vista de detalle: `chunk_id`, `chunk`, `_id`, `id`, y los 5 campos de valoración.
- **`formatLabel(key)`**: Convierte claves como `diagnostico_final` en etiquetas legibles como `Diagnostico Final`.

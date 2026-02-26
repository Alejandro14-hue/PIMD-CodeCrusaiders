## Especificación de Requisitos de Software (SRS)
### Para CodeCrusaders

Versión 2.0  
Preparado por Adrián Sánchez Elvira  
Ies. Ribera del Tajo 
06 / Nov / 2025

## Tabla de Contenidos
<!-- TOC -->
* [1. Introducción](#1-introducción)
    * [1.1 Propósito del documento](#11-propósito-del-documento)
    * [1.2 Alcance del producto](#12-alcance-del-producto)
    * [1.3 Definiciones, siglas y abreviaturas](#13-definiciones-siglas-y-abreviaturas)
    * [1.4 Referencias](#14-referencias)
    * [1.5 Visión general del documento](#15-visión-general-del-documento)
* [2. Descripción general del producto](#2-descripción-general-del-producto)
    * [2.1 Perspectiva del producto](#21-perspectiva-del-producto)
    * [2.2 Funciones del producto](#22-funciones-del-producto)
    * [2.3 Restricciones del producto](#23-restricciones-del-producto)
    * [2.4 Características de los usuarios](#24-características-de-los-usuarios)
    * [2.5 Suposiciones y dependencias](#25-suposiciones-y-dependencias)
    * [2.6 Distribución (apportioning) de requisitos](#26-distribución-apportioning-de-requisitos)
* [3. Requisitos específicos](#3-requisitos-específicos)
    * [3.1 Interfaces externas](#31-interfaces-externas)
    * [3.2 Requisitos funcionales](#32-requisitos-funcionales)
    * [3.3 Calidad del servicio (no funcionales)](#33-calidad-del-servicio-no-funcionales)
    * [3.4 Cumplimiento](#34-cumplimiento)
    * [3.5 Diseño e implementación](#35-diseño-e-implementación)
    * [3.6 IA/ML (si procede)](#36-iaml-si-procede)
* [4. Verificación](#4-verificación)
* [5. Apéndices](#5-apéndices)
<!-- TOC -->

## Historial de Revisiones

| Nombre | Fecha | Motivo del cambio | Versión |
|--------|-------|-------------------|---------|
|Adrián Sánchez Elvira|06 / Nov / 2025|Creación del documento|1.0|

## 1. Introducción
Este documento se ha formulado con el objetivo de documentar los requisitos, características y desarrollo del proyecto de la asignatura de Proyecto Inter-modular (PIMD).
Las personas por las cuales se ha realizado este documento es para todo aquel supervisor, integrante de desarrollo y/o posible usuario involucrado en el mismo.

### 1.1 Propósito del documento
Este SRS ayudará tanto al equipo de desarrollo (los alumnos), como a personas externas (profesores o usuarios) a comprender razonamientos y conceptos asociados a la creación del producto especificado por el cliente.
Este documento seguirá siendo actualizado en caso de cambios de requisitos u otros factores, es recomendado revisar la versión y asegurarse de que es la más nueva antes de continuar.

### 1.2 Alcance del producto
Como alcance que se nos ha descrito para el PMV (Producto mínimo viable), es una aplicación web utilizada por profesionales médicos para validar casos clínicos y asignarles una puntuación, una interfaz simple y una facilidad de navegación notable son puntos mencionados y que seguiremos.

### 1.3 Definiciones, siglas y abreviaturas
<!--Proporcione un glosario de términos del dominio, siglas y abreviaturas (ordenado alfabéticamente).

| Término | Definición |
|--------:|------------|
|         |            |-->

### 1.4 Referencias
<!--Liste las fuentes normativas e informativas relevantes (título, autor/entidad, versión/fecha, URL si procede). Indique si es normativa o informativa.-->

### 1.5 Visión general del documento
El resto del documento explicará razonamientos y características relacionadas con el proyecto, comenzando por el producto y sus puntos, luego los requisitos específicos, generales y técnicos del mismo; y por último algunas pruebas y apéndices a rellenar a futuro.

## 2. Descripción general del producto
Esta aplicación web se trata de una aplicación utilizada por profesionales médicos con el fin de evaluar casos clínicos artificiales. La escala del PMV es pequeña si no tenemos en cuenta el gran volumen de casos clínicos generados por Inteligencia Artificial.

### 2.1 Perspectiva del producto
La aplicación será una herramienta auxiliar paralela a los sistemas (bases de datos y aplicaciones de gestión interna) ya utilizados por los centros médicos y por el momento se formula que no tendrá acceso a ellos por razones de seguridad y privacidad obvios.

### 2.2 Funciones del producto
* Inicio de sesión con credenciales seguras encriptadas.
* Interfaz comprensiva, sencilla y ligera.
* Consultar un caso clínico de forma gráfica.
* Poder asignarle una puntuación en distintos aspectos a dicho caso clínico.
* Historial de dichas puntuaciones.
* Almacenamiento rápido y seguro de los historiales y datos de sesión.

### 2.3 Restricciones del producto
Debido al diseño y funcionalidades de la aplicación, la forma que hemos decidido para el almacenaje de información podría dividirse en dos, una porción encargada de guardar los inicios de sesión de forma segura, y otra para el almacenar las conversaciones en un formato conveniente y rápido.
Otro punto de importancia es la interfaz, debido a que el nivel informático de los usuarios va a ser variado, lo concordado es una interfaz sencilla, fácilmente navegable y reminiscente de chatbots como ChatGPT.
Se buscará un correcto funcionamiento en distintos navegadores, sistemas operativos y dispositivos con el fin de que el producto sea accesible. 

### 2.4 Características de los usuarios
Para la versión que está en desarrollo actualmente, solo existirá una clase usuario, con un mismo nivel de acceso. Cada usuario tendrá sus conversaciones e historial, y será imposible acceder al historial del resto de usuarios.
El uso se ha formulado como aplicación web de escritorio en el navegador, pero se mantendrá en vista futura la posibilidad de una interfaz adaptada a dispositivos móbiles.
La carga de acceso de usuarios se supone como pequeña por el momento, pero como se ha mencionado, se mantiene presente la escalabilidad vertical y horizontal del producto.

### 2.5 Suposiciones y dependencias
Como suposiciones, se asume que los centros médicos donde principalmente se utilizará el producto, poseen conexiones a internet seguras o en su defecto servidores y comunicaciones internas; además de dispositivos con los que acceder al producto una vez lanzado.
Como servicios de terceros estamos actualmente barajando algunas opciones referentes a la seguridad como la verificación de usuarios mediante la nube de google. 

### 2.6 Distribución (apportioning) de requisitos
Habrá cuatro subsistemas en los que se dividirán los recursos humanos y tecnológicos durante el desarrollo, estos son:
* Frontend (Interfaz de usuario y conectividad): Se trata de la presentación correcta de la información hacia el usuario además de la recolección de lo que pida hacer el mismo a la aplicación. A resumidas cuentas, muestra las conversaciones, respuestas del usuario, el historial, etc.
* Backend (Procesado de datos): Gestionará la sesión de los usuarios y los accesos a los datos como las conversaciones del usuario y su historial. Las peticiones y acciones que el usuario realiza en el Frontend se procesan en el backend.
* Bases de Datos: Este punto se encuentra en plural porque por el momento nos planteamos el guardar los datos en dos bases de datos. Una de ellas guardará la información de los usuarios (Nombre, contraseña, etc.) y la otra guardará de forma más eficiente las conversaciones. La base de datos proporciona la información al backend para que lo procese y posteriormente lo envíe al frontend para que lo vea el usuario.
* Inteligencia Artificial (IA): Esta será entrenada basada en casos médicos generados con IA y posteriormente filtrados y validados. La IA entrenada se encargará de responder a las preguntas y/o consultas que tengan los usuarios y devolver una respuesta que será procesada y mostrada en formato de conversación en el frontend.

## 3. Requisitos específicos
A continuación se describirán los requerimientos de la aplicación y como se refleja en los distintos apartados que la componen.

### 3.1 Interfaces externas
Como se ha mencionado antes, necesitaremos comunicación entre los distintos componentes de la aplicación, estos siendo el frontend, backend, bases de datos y la Inteligencia Artificial.
La primera interfaz que se ve es la correspondiente al inicio de sesión, que valida la sesión con el backend y una consulta a los datos de la base de datos mediante una API REST (Petición). De la misma forma en la que se valida la sesión, se recuperará el historial de conversaciones que posea dicho usuario, y al seleccionarse, se cargará mediante otra consulta.
Como interfaces referentes al hardware (componentes físicos), estrictamente necesarios solo serán un ordenador conectado a la aplicación, un teclado, un ratón y una pantalla.
Se investigará para futuras versiones un formato de carga de datos que permita evitar que se realicen consultas a las bases de datos de manera muy seguida para que en caso de escalarse el proyecto no haya un tiempo de respuesta alto.

### 3.2 Requisitos funcionales
- ID: RF-1  
  - Descripción: Autenticación de usuarios.  
  - Entradas: email/usuario y contraseña.  
  - Salidas: token (clave) de sesión (JWT) o error.  
  - Precondiciones: usuario registrado.  
  - Postcondiciones: sesión iniciada con token válida.  
  - Criterios de aceptación: login correcto devuelve token de sesión con expiración; contraseñas almacenadas con hashing (bcrypt/argon2); intentos fallidos limitados.

- ID: RF-2  
  - Descripción: Crear conversación y enviar puntuaciones.  
  - Entradas: puntuación del usuario (texto), ID de sesión.  
  - Salidas: caso clínico y registro en DB.  
  - Precondiciones: usuario autenticado.  
  - Postcondiciones: mensaje y respuesta persistidos con timestamps.  
  - Criterios de aceptación: mensaje enviado aparece en la conversación; backend registra ambos lados.

- ID: RF-3  
  - Descripción: Historial de conversaciones.  
  - Entradas: inicio de sesión o entrar a la aplicación.  
  - Salidas: lista de conversaciones con metadatos.  
  - Precondiciones: usuario autenticado.  
  - Postcondiciones: historial mostrado solo del usuario solicitante.  
  - Criterios de aceptación: listas con un título adecuado, no muestran datos de otros usuarios.

### 3.3 Calidad del servicio (no funcionales)
- ID: RnF-1
  - Descripción: Interfaces sencillas y fáciles de usar.
  - Precondiciones: Manejo de los datos para su posterior uso en las interfaces.
  - Postcondiciones: Mostrar dicha información de manera clara.
  - Criterios de aceptación: la información se muestra de la manera descrita.

#### 3.3.1 Rendimiento
Se busca que el sistema sea capaz de mantenerse activo y con unos tiempos de respuesta a peticiones mínimos para todos los usuarios, los componentes como el frontend y backend intentarán realizar la cantidad justa y necesaria de consultas y operaciones para una mayor fluidez y menor carga sobre el dispositivo del usuario.

#### 3.3.2 Seguridad
Acceso a historiales de conversaciones únicos para cada usuario. Contraseña de usuarios almacenada de forma encriptada. Otras medidas serán discutidas para futuras versiones.

#### 3.3.3 Fiabilidad
Controlar errores de inicio de sesión, acceso a cuentas y recopilar los mensajes de error en ficheros de texto adecuados.

#### 3.3.4 Disponibilidad
Que la aplicación sea capaz de mantenerse activa en distintos niveles de carga y tiempos de ejecución.

#### 3.3.5 Observabilidad
Como se ha mencionado, se recopilarán los mensajes de error, otras métricas de rendimiento, fuera de las básicas como tiempos de respuesta, latencia, etc. serán discutidos más adelante.

### 3.4 Cumplimiento
Leyes, normas, contratos o políticas aplicables (p. ej., GDPR, estándares de accesibilidad, normativas sectoriales). Cite la autoridad y criterios verificables.
<!-- TODO -->

### 3.5 Diseño e implementación
Mandatos y restricciones sobre el diseño, despliegue y mantenimiento.
<!-- TODO -->

#### 3.5.1 Instalación
Plataformas soportadas, dependencias, prerequisitos y pasos básicos de instalación/configuración.
<!-- TODO -->

#### 3.5.2 Compilación y entrega
Gestión de dependencias, automatización de builds, firmas/artifacts y trazabilidad de versiones.
<!-- TODO -->

#### 3.5.3 Distribución
Topologías de despliegue, replicación de datos y consideraciones para entornos distribuidos.
<!-- TODO -->

#### 3.5.4 Mantenibilidad
Medidas que facilitan modificaciones: modularidad, estándares de código, documentación, pruebas y cobertura mínima requerida.
<!-- TODO -->

#### 3.5.5 Reutilizabilidad
Componentes diseñados para ser reutilizados en otros proyectos o módulos.
<!-- TODO -->

#### 3.5.6 Portabilidad
Requisitos para ejecutar en entornos alternativos (SO, proveedores cloud, contenedores, etc.).
<!-- TODO -->

#### 3.5.7 Coste
Presupuestos o restricciones económicas que impactan diseño/operación (gasto en cloud, licencias, coste por transacción).
<!-- TODO -->

#### 3.5.8 Plazos
Hitos, fechas de entrega y criterios de madurez para cada entrega.
<!-- TODO -->

#### 3.5.9 Prueba de concepto (PoC)
Objetivos, alcance, duracion y criterios de éxito de cualquier PoC asociado.
<!-- TODO -->

#### 3.5.10 Gestión de cambios
Proceso para proponer, aprobar y registrar cambios en requisitos (roles, artefactos requeridos, flujo de trabajo).
<!-- TODO -->

### 3.6 IA/ML (si corresponde)
Requisitos específicos para componentes de IA/ML.
<!-- TODO? -->

#### 3.6.1 Especificación del modelo
Propósito del modelo, entradas/salidas, métricas objetivo, datos de validación y versionado.
<!-- TODO? -->

#### 3.6.2 Gestión de datos
Origen de los datos, etiquetado, anonimización, gobernanza y almacenamiento.
<!-- TODO? -->

#### 3.6.3 Guardrails
Validaciones, filtros de salida, límites de acción y controles para prevenir resultados no deseados.
<!-- TODO? -->

#### 3.6.4 Ética
Medidas de equidad, transparencia y responsabilidad.
<!-- TODO? -->

#### 3.6.5 Human-in-the-loop
Puntos de revisión humana, escalado y mecanismo de retroalimentación.

<!-- TODO? -->

#### 3.6.6 Ciclo de vida y operaciones del modelo
Despliegue, monitorización, reentrenamiento y retiro de versiones.
<!-- TODO? -->

## 4. Verificación
Tabla para relacionar cada requisito con su método de verificación (prueba, inspección, análisis), artefactos de prueba y estado.

| ID de requisito | Método de verificación | Enlace a prueba/artefacto | Estado | Evidencia |
|----------------:|-----------------------|---------------------------|--------|----------|
|                 |                       |                           |        |          |
<!-- TODO -->

## 5. Apéndices
Material complementario: ejemplos, plantillas de casos de prueba, listas de verificación y cualquier información adicional.
<!-- TODO -->

---
Nota: Esta plantilla está traducida y adaptada para alinearse con la estructura de la plantilla IEEE 830 (ver Appendix C en Rebus: https://press.rebus.community/requirementsengineering/back-matter/appendix-c-ieee-830-template/ y Plantillas '_srs-template_' y '_srs-template-bare_' en el repositorio: https://github.com/jam01/SRS-Template). 

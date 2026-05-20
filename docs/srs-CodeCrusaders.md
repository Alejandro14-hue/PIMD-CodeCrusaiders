## Especificación de Requisitos de Software (SRS)
### Para CodeCrusaders

Versión 2.1  
Preparado por Adrián Sánchez Elvira  
Ies. Ribera del Tajo 
20 / May / 2026

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
    * [3.6 IA/ML (si corresponde)](#36-iaml-si-corresponde)
* [4. Verificación](#4-verificación)
* [5. Apéndices](#5-apéndices)
<!-- TOC -->

## Historial de Revisiones

| Nombre | Fecha | Motivo del cambio | Versión |
|--------|-------|-------------------|---------|
|Adrián Sánchez Elvira|06 / Nov / 2025|Creación del documento|1.0|
|Adrián Sánchez Elvira|18 / May / 2026|Backlog de SRS local|2.0|
|Adrián Sánchez Elvira|20 / May / 2026|Correcciones y puesta a punto|2.1|

## 1. Introducción
Este documento se ha formulado con el objetivo de documentar los requisitos, tecnologías, características y desarrollo del proyecto de la asignatura de Proyecto Inter-modular (PIMD). Las personas por las cuales se ha realizado este documento es para todo aquel supervisor, integrante de desarrollo y/o posible usuario involucrado en el mismo.

### 1.1 Propósito del documento
Este SRS ayudará tanto al equipo de desarrollo (los alumnos), como a personas externas (profesores o posibles usuarios) a comprender razonamientos y conceptos asociados a la creación del producto especificado por esta tarea. Este documento seguirá siendo actualizado en caso de cambios de requisitos u otros factores, es recomendado revisar la versión y asegurarse de que es la más nueva antes de continuar.

### 1.2 Alcance del producto
Como alcance que se nos ha descrito para el PMV (Producto mínimo viable), es una aplicación web utilizada por profesionales médicos para validar casos clínicos y asignarles una puntuación, una interfaz simple y una facilidad de navegación notable son puntos mencionados y que seguiremos. Actualmente el nuevo PMV incluirá la IA (Inteligencia Artifical) conversacional y su respectiva página donde operar con la misma.

### 1.3 Definiciones, siglas y abreviaturas
<!--Proporcione un glosario de términos del dominio, siglas y abreviaturas (ordenado alfabéticamente).

| Término | Definición |
|--------:|------------|
|         |            |-->

### 1.4 Referencias
[Reglamento General de Protección de Datos (RPGD)](https://www.boe.es/doue/2016/119/L00001-00088.pdf)

[Ley Orgánica de Protección de Datos Personales y Garantía de Derechos Digitales(LOPDGDD)](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673)

### 1.5 Visión general del documento
El resto del documento explicará razonamientos y características relacionadas con el proyecto, comenzando por el producto y sus puntos, luego los requisitos específicos, generales y técnicos del mismo; y por último algunas pruebas y apéndices a rellenar a futuro.

## 2. Descripción general del producto
Esta aplicación web se trata de una aplicación utilizada por profesionales médicos con el fin de evaluar casos clínicos artificiales. La escala del PMV es pequeña si no tenemos en cuenta el gran volumen de casos clínicos generados por Inteligencia Artificial.

### 2.1 Perspectiva del producto
La aplicación será una herramienta auxiliar paralela a los sistemas (bases de datos y aplicaciones de gestión interna) ya utilizados por los centros médicos y por el momento se formula que no tendrá acceso a ellos por razones de seguridad y privacidad obvios.

### 2.2 Funciones del producto
* Inicio de sesión con credenciales seguras encriptadas.
* Interfaz comprensiva, sencilla y ligera.
* Consultar un caso clínico de forma visual.
* Poder asignarle una puntuación en distintos aspectos a dicho caso clínico.
* IA conversacional y fácil de usar para ayudar con diagnósticos de primera necesidad.
* Historial de dichas conversaciones.
* Almacenamiento rápido y seguro de los historiales y datos de sesión.

### 2.3 Restricciones del producto
Debido al diseño y funcionalidades de la aplicación, la forma que hemos decidido para el almacenaje de información podría dividirse en dos principales tipos, una porción encargada de guardar los inicios de sesión de forma segura, y otra para el almacenar las conversaciones en un formato conveniente y rápido, serán relacionadas entre si dado que un usuario necesitará acceso a sus conversaciones.

Otro punto de importancia es la interfaz, debido a que el nivel informático de los usuarios va a ser variado, lo concordado es una interfaz sencilla, fácilmente navegable y reminiscente de chatbots como ChatGPT.
Se buscará un correcto funcionamiento en distintos navegadores, sistemas operativos y dispositivos con el fin de que el producto sea accesible. 

### 2.4 Características de los usuarios
Para la versión que está en desarrollo actualmente, solo existirá una tabla que guarde información de usuarios, con un mismo nivel de acceso (autorizado o no). Se asociará a cada usuario sus conversaciones e historial, haciendo que sea imposible acceder al historial del resto de usuarios.

El uso se ha formulado como aplicación web de escritorio en el navegador, pero se mantendrá en vista futura la posibilidad de una interfaz adaptada a dispositivos móviles. La carga de acceso de usuarios se supone como pequeña por el momento, pero como se ha mencionado, se mantiene presente la escalabilidad vertical y horizontal del producto.

### 2.5 Suposiciones y dependencias
Como suposiciones, se asume que los centros médicos donde principalmente se utilizará el producto, poseen conexiones a internet seguras o en su defecto servidores y comunicaciones internas; además de dispositivos con los que acceder al producto una vez lanzado. Como servicios de terceros estamos actualmente utilizando la verificación de usuarios mediante la nube de Google, es decir, inicio de sesión con Google. 

### 2.6 Distribución (apportioning) de requisitos
Habrá cuatro subsistemas en los que se dividirán los recursos humanos y tecnológicos durante el desarrollo, estos son:
* Frontend (Interfaz de usuario y conectividad): Se trata de la presentación correcta de la información hacia el usuario además de la recolección de lo que pida hacer el mismo a la aplicación. A resumidas cuentas, muestra las conversaciones, respuestas del usuario, el historial, etc.
* Backend (Procesado de datos): Gestionará la sesión de los usuarios y los accesos a los datos como las conversaciones del usuario y su historial. Las peticiones y acciones que el usuario realiza en el Frontend se procesan a este nivel.
* Base de Datos: La forma de almacenar datos será en una base de datos no relacional o documental llamada MongoDB, en la cual será muy sencillo el guardar información referente a conversaciones y similar por el formato. El tipo de base de datos se dejó a nuestra discreción y nos decidimos MongoDB como mejor opción.
* Inteligencia Artificial (IA): Esta sería entrenada basada en casos médicos generados con IA y posteriormente filtrados y validados. La IA entrenada se encargará de responder a las preguntas y/o consultas que tengan los usuarios y devolver una respuesta que será procesada y mostrada en formato de conversación en el frontend.

## 3. Requisitos específicos
A continuación se describirán los requerimientos de la aplicación y como se refleja en los distintos apartados que la componen.

### 3.1 Interfaces externas
Como se ha mencionado antes, necesitaremos comunicación entre los distintos componentes de la aplicación, estos siendo el frontend, backend, bases de datos y la Inteligencia Artificial. La primera interfaz que se ve es la correspondiente al inicio de sesión, que valida la sesión con el backend y una consulta a los datos de la base de datos mediante una API REST (Petición). De la misma forma en la que se valida la sesión, se recuperará el historial de conversaciones que posea dicho usuario, y al seleccionarse, se cargará mediante otra consulta.

Como interfaces referentes al hardware (componentes físicos), estrictamente necesarios solo serán un ordenador conectado a la aplicación, un teclado, un ratón y una pantalla. Se investigará para futuras versiones un formato de carga de datos que permita evitar que se realicen consultas a las bases de datos de manera muy seguida para que en caso de escalarse el proyecto no haya un tiempo de respuesta alto.

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
  - Criterios de aceptación: La información se muestra de la manera descrita.
 
- ID: RnF-2
  - Descripción: Mantener datos a la vista.
  - Precondiciones: Mostrar correctamente los datos y tener un menú de calificaciones.
  - Postcondiciones: Mostrar dicha información además del formulario al mismo tiempo sin obstruirse entre ellos.
  - Criterios de aceptación: Se puede valorar y leer información a la vez.

#### 3.3.1 Rendimiento
Se busca que el sistema sea capaz de mantenerse activo y con unos tiempos de respuesta a peticiones mínimos para todos los usuarios, los componentes como el frontend y backend intentarán realizar la cantidad justa y necesaria de consultas y operaciones para una mayor fluidez y menor carga sobre el dispositivo del usuario.

#### 3.3.2 Seguridad
Acceso a historiales de conversaciones únicos para cada usuario. Contraseña de usuarios almacenada de forma encriptada. Peticiones a la base de datos restringidas a usuarios verificados e iniciados para evitar que se hagan peticiones de manera externa. Uso correcto y verificado de la certificación HTTPS para encriptación de la transmisión de datos con el protocolo HTTP.

#### 3.3.3 Fiabilidad
Controlar errores de inicio de sesión en casos de no estar autorizada la conexión mediante la consola de Google. Recopilar los mensajes de error en ficheros de texto adecuados en el servidor. Se ha comprobado que no hay fugas de memoria ni similar tras mirar periodicamente el estado del servidor.

#### 3.3.4 Disponibilidad
Que la aplicación sea capaz de mantenerse activa en distintos niveles de carga y tiempos de ejecución. Como ha sido mencionado, el servidor no tuvo ningún error o fallo tras estar activo durante un periodo de tiempo considerable.

#### 3.3.5 Observabilidad
Tal como se ha dicho, se recopilarán los mensajes de error; otras métricas de rendimiento, fuera de las básicas como tiempos de respuesta, latencia, etc. serán discutidos más adelante.

### 3.4 Cumplimiento
RGPD (Reglamento General de Protección de Datos) y LOPDGDD: Al manejar correos electrónicos y contraseñas de usuarios, el sistema debe cumplir con la normativa española y europea de protección de datos. Las contraseñas deben estar cifradas (hashing) y no se almacenarán datos reales de pacientes que puedan vulnerar la privacidad médica, obviando lo no controlable como los datos escritos por los médicos en la conversación con la IA.

### 3.5 Diseño e implementación
Mandatos y restricciones sobre el diseño, despliegue y mantenimiento.

#### 3.5.1 Instalación
Plataformas soportadas: El sistema está diseñado para ser agnóstico al sistema operativo subyacente gracias a la contenedorización, siendo compatible con servidores Linux (Ubuntu Server/Debian recomendados para el entorno del instituto), macOS y Windows.

Requisitos de software previos: Node.js (v18 o superior), Python (v3.11 o superior), MongoDB (v4.4 o superior) y el motor de Docker con Docker Compose.

Pasos de instalación: 
1. Clonar el repositorio oficial del proyecto en el servidor del instituto.
2. Configurar el archivo de variables de entorno .env en la raíz (especificando los tokens de la IA, las credenciales cifradas de acceso y la URI de conexión a la base de datos).
3. Ejecutar el comando docker compose up -d para desplegar automáticamente de manera aislada los contenedores del Frontend (React/Vite), Backend (FastAPI) y la Base de Datos (MongoDB).

#### 3.5.2 Compilación y entrega
En el Frontend se gestionan mediante npm utilizando el archivo package.json. En el Backend se administran a través de pip con el archivo requirements.txt. Se utiliza Git como sistema de control de versiones distribuido, organizando el flujo de trabajo mediante ramas.

#### 3.5.3 Distribución
El Frontend actúa como una aplicación web de cara al usuario, que se ejecuta en el navegador. Este mediante sus acciones en la web realizará llamadas asíncronas HTTP/HTTPS mediante una API REST hacia el Backend. El Backend actúa como pasarela segura, procesando la lógica de negocio, comunicándose con la IA y persistiendo los datos de los historiales directamente en la instancia de MongoDB.

#### 3.5.4 Mantenibilidad
Para la mantenibilidad del proyecto utilizamos varios métodos comunes. Modularidad clásica en 3 capas: Presentación, Aplicación y Datos. Documentación sobre las configuraciones, despliegues y utilización. Pruebas unitarias automatizadas mediante GitHub Actions sencillas pero con cobertura de lo necesario. Facilidad de migraciones y escalabilidad gracias a utilizar Docker como contenerización de los componentes.

#### 3.5.5 Reutilizabilidad
Componentes en el frontend que utilizan datos dinámicos mediante consulta del Backend, mientras los datos sean similares, el diseño se puede reutilizar. En cuanto al Backend, se requeriría cambiar la configuración que lo conecta a la Base de Datos además de que las colecciones de datos de la misma se llamen igual para evitar errores.

#### 3.5.6 Portabilidad
Punto de mayor enfasis que se conectaría con la instalación y mantenibilidad, donde señalamos el uso de contenedores de Docker para hacer la aplicación insensible a su entorno.

#### 3.5.7 Coste
Los costes no se nos han sido descritos de ninguna manera, pero durante el desarrollo, hemos utilizado herramientas como la consola de la nube de Google a un coste nulo, pero en una escala mucho mayor conlleva un precio.

#### 3.5.8 Prueba de concepto (PoC)
Demonstración en vivo de la navegación por las páginas sin fallos o latencias inesperadas, además de consultas rápidas para los casos clínicos semi-aleatorios.

### 3.6 IA/ML (si corresponde)
Requisitos específicos para componentes de IA/ML.

#### 3.6.1 Especificación del modelo
El propósito es actuar como un asistente conversacional especializado para ayudar a diagnósticos médicos de primera necesidad. Teniendo entrada de datos en formato de texto por parte del usuario y salida en texto legible y entendible por el mismo.

#### 3.6.2 Gestión de datos
Siguiendo un estricto principio de diseño enfocado en la seguridad, la aplicación opera únicamente con datos sintéticos. Queda estrictamente prohibida la introducción de historiales médicos de pacientes reales o datos personales protegidos (nombres, DNI, números de afiliación), garantizando el cumplimiento pleno del RGPD y eliminando cualquier superficie de filtración de información confidencial.

#### 3.6.3 Guardrails
Validaciones, filtros de salida, límites de acción y controles para prevenir resultados no deseados. Se supondrá que los guardrails básicos se llevan consigo en el mismo modelo.

#### 3.6.4 Ética
Debido a regulaciones respecto a las IAs, la aplicación muestra de manera explícita que la conversación se está sosteniendo con un agente inteligente artificial.

#### 3.6.5 Human-in-the-loop
El diseño entero de la plataforma responde a este paradigma. La IA bajo ningún concepto toma decisiones médicas automatizadas ni vinculantes. Su único fin es servir como un entorno auxiliar.

#### 3.6.6 Ciclo de vida y operaciones del modelo
El almacenamiento y retroalimentación en la validación de casos clínicos se mantiene abierto a usarse para el entrenamiento continuo de la IA.

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

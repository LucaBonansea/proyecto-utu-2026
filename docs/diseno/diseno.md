# Diseño del sistema

## Arquitectura
Puedes completarlo así:

# Diseño del Sistema

## Arquitectura
Descripción

Los endpoints principales del sistema definen la comunicación entre los distintos frontends (Ciudadanía, Comuna y Equipos/Proveedores) y el backend centralizado mediante una API REST. Estos endpoints permiten gestionar la autenticación de usuarios, el ciclo de vida de los reclamos y la administración de evidencias asociadas a cada incidencia.

Objetivo

Establecer una interfaz de comunicación clara, segura y estandarizada entre el frontend y el backend, permitiendo el intercambio de datos de forma consistente, garantizando la trazabilidad de los reclamos y el control de acceso según los roles del sistema.

Endpoints principales
Autenticación
Método	Endpoint	Descripción
POST	/auth/register	Registrar un nuevo ciudadano.
POST	/auth/login	Iniciar sesión en el sistema.
POST	/auth/verify-ci	Validar la identidad del ciudadano mediante la API docente antes de completar el alta.
Gestión de Reclamos
Método	Endpoint	Descripción
POST	/reclamos	Crear un nuevo reclamo.
GET	/reclamos/my	Obtener los reclamos del usuario autenticado.
GET	/reclamos	Listar todos los reclamos (uso administrativo).
PATCH	/reclamos/{id}/assign	Asignar un reclamo a un equipo o proveedor.
PATCH	/reclamos/{id}/start	Marcar el inicio de la resolución del reclamo.
PATCH	/reclamos/{id}/finish	Registrar la finalización del trabajo.
PATCH	/reclamos/{id}/approve	Aprobar la resolución realizada.
PATCH	/reclamos/{id}/reject	Rechazar la resolución y devolver el reclamo para corrección.
Gestión de Evidencias
Método	Endpoint	Descripción
POST	/reclamos/{id}/media	Cargar fotografías, videos o documentos asociados al reclamo.
GET	/media/{id}	Obtener una evidencia almacenada.

Estos endpoints cubren el flujo completo del sistema: registro de usuarios, creación y seguimiento de reclamos, asignación de tareas, resolución de incidencias y gestión de evidencias, permitiendo la interacción entre las tres interfaces del proyecto y el backend centralizado.

El sistema seguirá una arquitectura cliente-servidor compuesta por tres interfaces frontend y un backend centralizado.

### Frontend

**PWA Ciudadanía**

* Registro e inicio de sesión.
* Creación de reclamos.
* Consulta de estados.
* Recepción de notificaciones.

**Dashboard Intendencia**

* Gestión de reclamos mediante tablero Kanban.
* Asignación de tareas.
* Aprobación o rechazo de trabajos.
* Consulta de estadísticas.

**Frontend Equipos/Proveedores**

* Consulta de tareas asignadas.
* Registro de inicio y finalización de trabajos.
* Carga de evidencias.
* Registro de materiales utilizados.

### Backend

El backend centraliza toda la lógica del negocio:

* Autenticación y autorización.
* Gestión de usuarios.
* Gestión de reclamos.
* Gestión de estados.
* Integración con API de validación de identidad.
* Gestión de evidencias multimedia.
* Generación de estadísticas.
* Registro de historial de actividades.

### Comunicación

Los tres frontends se comunicarán con el backend mediante una API REST. El backend será el único encargado de acceder a la base de datos y a la API externa de validación de identidad.

## Base de Datos

### Tabla: usuarios

| Campo     | Tipo    |
| --------- | ------- |
| id        | BIGINT  |
| nombre    | VARCHAR |
| apellido  | VARCHAR |
| documento | VARCHAR |
| email     | VARCHAR |
| password  | VARCHAR |
| rol       | ENUM    |
| validado  | BOOLEAN |

### Tabla: reclamos

| Campo          | Tipo     |
| -------------- | -------- |
| id             | BIGINT   |
| usuario_id     | BIGINT   |
| tipo           | VARCHAR  |
| descripcion    | TEXT     |
| latitud        | DECIMAL  |
| longitud       | DECIMAL  |
| estado         | ENUM     |
| fecha_creacion | DATETIME |

### Tabla: historial_actividad

| Campo           | Tipo     |
| --------------- | -------- |
| id              | BIGINT   |
| reclamo_id      | BIGINT   |
| usuario_id      | BIGINT   |
| estado_anterior | VARCHAR  |
| estado_nuevo    | VARCHAR  |
| observaciones   | TEXT     |
| fecha           | DATETIME |

### Tabla: multimedia

| Campo        | Tipo     |
| ------------ | -------- |
| id           | BIGINT   |
| reclamo_id   | BIGINT   |
| ruta_archivo | VARCHAR  |
| tipo_archivo | VARCHAR  |
| fecha_subida | DATETIME |

### Tabla: proveedores

| Campo    | Tipo    |
| -------- | ------- |
| id       | BIGINT  |
| nombre   | VARCHAR |
| contacto | VARCHAR |
| tipo     | VARCHAR |

### Tabla: materiales (opcional)

| Campo       | Tipo    |
| ----------- | ------- |
| id          | BIGINT  |
| nombre      | VARCHAR |
| descripcion | TEXT    |

## Tecnologías

### Backend

* PHP 8
* Laravel
* API REST

### Base de Datos

* MySQL

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap o Tailwind CSS

### Control de Versiones

* Git
* GitHub

### Herramientas de Desarrollo

* Visual Studio Code
* XAMPP
* Postman

### Servicios Externos

* API docente de validación de identidad

## Diagrama de Arquitectura

![Diagrama de Arquitectura](Diagramas/Diagrama_arquitectura/Diagrama_Arquitectura.png)

## Base de datos
(A definir)

## Tecnologías
(A definir)

##Diagrama de flujo

![Diagrama de flujo](Diagramas/Diagrama_de_flujo/Diagrama_flujo.png)

1. Registro de ciudadano

El ciudadano accede a la aplicación y crea una cuenta ingresando su número de cédula de identidad y una contraseña.

2. Validación de identidad

Al registrarse, el backend consume la API de validación de identidad para verificar que la cédula corresponda a un ciudadano válido dentro del entorno de pruebas.

Si la validación es exitosa, la cuenta se crea.
Si la validación falla, el registro es rechazado y el intento queda registrado.
3. Inicio de sesión

Una vez registrado, el ciudadano puede iniciar sesión utilizando su cédula y contraseña.

4. Creación de reclamo

El ciudadano genera un nuevo reclamo indicando:

Tipo de incidente.
Descripción del problema.
Evidencias fotográficas o video.
Ubicación geográfica obtenida automáticamente.

Al confirmar el envío, el reclamo queda registrado en el sistema.

5. Ingreso del reclamo

El sistema asigna automáticamente el estado "Ingreso" al nuevo reclamo.

Desde este momento el ciudadano puede realizar el seguimiento del caso.

6. Revisión por parte de la Intendencia

Los funcionarios de la Intendencia visualizan los reclamos recibidos en el tablero Kanban.

Analizan la información proporcionada y determinan si el reclamo es válido y qué sector debe resolverlo.

7. Asignación del trabajo

La Intendencia asigna el reclamo al equipo responsable de su resolución.

Al momento de la asignación el estado pasa automáticamente a "En proceso", indicando que el trabajo ya fue derivado al área correspondiente.

8. Ejecución de la tarea

El equipo encargado realiza las tareas necesarias para solucionar el problema reportado.

Ejemplos:

Reparación de baches.
Arreglo de luminarias.
Poda de árboles.
Reparación de pérdidas de agua.
Corrección de cableado dañado.
9. Registro de finalización

Cuando el trabajo finaliza, la Intendencia registra:

Fecha de finalización.
Observaciones.
Materiales utilizados (si corresponde).
Evidencias fotográficas del resultado.

El estado cambia a "Pendiente de aprobación".

10. Verificación del resultado

La Intendencia revisa las evidencias y verifica que la solución implementada sea correcta.

11. Aprobación del reclamo

Si el problema fue solucionado correctamente:

El reclamo es aprobado.
El estado cambia a "Resuelto".
El ciudadano es notificado del cierre del caso.
12. Rechazo del reclamo

Si la solución no cumple con los requisitos o la evidencia es insuficiente:

El reclamo es rechazado.
El estado cambia a "Rechazado".
Se registra el motivo del rechazo.
13. Corrección y nueva revisión

Luego del rechazo, la Intendencia coordina una nueva intervención y vuelve a registrar evidencias hasta lograr una solución satisfactoria.

14. Seguimiento ciudadano

Durante todo el proceso el ciudadano puede consultar:

Estado actual.
Fecha de creación.
Historial de cambios.
Evidencias asociadas.
Resolución final del reclamo.

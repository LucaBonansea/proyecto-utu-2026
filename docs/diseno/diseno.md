# Diseño del sistema

## Arquitectura
Arquitectura basada en API REST con frontend independiente para Ciudadanía, Comuna y Equipos/Proveedores.

- Frontend Web ligero que consume servicios REST.
- Backend centralizado en PHP/Laravel que expone la API y controla la lógica de negocio.
- Base de datos MySQL para almacenamiento de usuarios, reclamos, estados, evidencias y trazabilidad.
- Almacenamiento de archivos multimedia en sistema de archivos o almacenamiento en nube local.
- Autenticación mediante token seguro (Laravel Sanctum o JWT) y control de acceso por roles: ciudadano, comuna y equipo.

## API REST preliminar

### Autenticación
| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | /auth/register | Registrar un nuevo ciudadano. |
| POST | /auth/login | Iniciar sesión en el sistema. |
| POST | /auth/verify-ci | Validar la identidad del ciudadano mediante la API docente. |

### Gestión de Reclamos
| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | /reclamos | Crear un nuevo reclamo. |
| GET | /reclamos/my | Obtener reclamos del usuario autenticado. |
| GET | /reclamos | Listar todos los reclamos (administrativo). |
| GET | /reclamos/{id} | Obtener un reclamo específico. |
| PATCH | /reclamos/{id}/assign | Asignar un reclamo a un equipo o proveedor. |
| PATCH | /reclamos/{id}/start | Marcar inicio de resolución. |
| PATCH | /reclamos/{id}/finish | Registrar finalización del trabajo. |
| PATCH | /reclamos/{id}/approve | Aprobar la resolución realizada. |
| PATCH | /reclamos/{id}/reject | Rechazar la resolución y devolver el reclamo. |

### Gestión de Evidencias
| Método | Endpoint | Descripción |
| --- | --- | --- |
| POST | /reclamos/{id}/media | Cargar fotografías, videos o documentos asociados al reclamo. |
| GET | /media/{id} | Obtener una evidencia almacenada. |

### Nota
Estos endpoints permiten la comunicación clara entre los distintos frontends y el backend centralizado, garantizando trazabilidad, autenticación y control de acceso por roles.

## Base de datos
(A definir)

## Tecnologías
(A definir)

##Diagrama de flujo

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

## Requerimientos Funcionales

| ID | Requerimiento funcional | Descripción | Fuente | Observaciones |
|---|---|---|---|---|
| RF-01 | Registro de usuarios de edificio | El sistema deberá permitir que el Administrador registre usuarios de edificio mediante número telefónico, cédula, nombre y contraseña. | Control de cambios 2 | El usuario puede registrarse sin edificios asociados. La asociación se realiza posteriormente mediante RF-20. |
| RF-02 | Validación de datos del usuario | Durante el registro, el sistema deberá validar que el número telefónico ingresado tenga 9 dígitos y comience con 09 antes de habilitar el acceso. | Doc. proyecto Apéndice 1; Backend POST /auth/verify-ci; Entrevista P13, P18 | Se excluye la integración con TuID de Antel. |
| RF-03 | Inicio de sesión | El sistema deberá permitir que los usuarios registrados inicien sesión mediante sus credenciales. | Doc. proyecto 2.1 – Backend; POST /auth/login | Aplica a los diferentes tipos de usuarios del sistema según su rol. |
| RF-04 | Crear reclamos | El usuario de edificio podrá crear reclamos indicando una descripción, evidencia fotográfica y una clasificación correspondiente al tipo de problema identificado en el edificio. | Control de cambios 2 | Ej.: iluminación, infraestructura, mantenimiento, entre otros. |
| RF-05 | Moderación y clasificación de reclamos | El Administrativo deberá moderar el contenido ingresado por los usuarios de edificio y podrá validar o modificar la clasificación del reclamo antes de asignarlo al proveedor correspondiente. | Entrevista P22, P23, P36; Control de cambios 2 | |
| RF-06 | Asignar prioridad | El Administrativo podrá asignar una prioridad al reclamo cuando considere que requiere atención urgente. | Entrevista P7, P8 | |
| RF-07 | Asignar reclamos a proveedores | El Administrativo podrá asignar manualmente un reclamo al proveedor correspondiente según la clasificación y las características del reclamo. | Control de cambios 2 | El sistema mostrará la lista de proveedores correspondientes a la clasificación, pero la selección y confirmación de la asignación serán siempre manuales. No se realiza una derivación intermedia hacia áreas internas. |
| RF-08 | Consultar reclamos propios | El usuario de edificio podrá consultar el estado y avance de sus propios reclamos. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend GET /reclamos/my; Entrevista P14, P24 | |
| RF-09 | Recibir notificaciones | El usuario de edificio recibirá notificaciones dentro de la aplicación cuando se produzcan actualizaciones relevantes sobre sus reclamos, incluyendo la finalización del trabajo por parte del proveedor. | Control de cambios 2 | Las notificaciones se almacenan en MySQL y se consultan mediante la API REST. La versión 1.0 no incluye Web Push. |
| RF-10 | Visualizar reclamos | El Administrador y el Administrativo podrán visualizar los reclamos registrados en el sistema de acuerdo con los permisos correspondientes a su rol. | Control de cambios 2 | |
| RF-11 | Visualizar evidencias | El usuario de edificio podrá visualizar las evidencias asociadas a sus reclamos, incluyendo las evidencias registradas durante la resolución. | Control de cambios 2 | |
| RF-12 | Evidencia obligatoria de resolución | El Usuario de proveedor deberá registrar evidencia del trabajo realizado antes de marcar un reclamo como resuelto. | Entrevista P25; Control de cambios 2 | |
| RF-13 | Consultar tareas asignadas | El Usuario de proveedor podrá visualizar únicamente los reclamos o tareas asignados al proveedor al que pertenece. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; Entrevista P15; Control de cambios 2 | |
| RF-14 | Reprocesar tareas rechazadas | El Usuario de proveedor podrá volver a trabajar sobre tareas cuya resolución haya sido rechazada por el Usuario de edificio. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores | El reclamo permanece asignado al mismo proveedor, que puede consultar el motivo del rechazo y presentar una nueva resolución. |
| RF-15 | Roles de usuario | El sistema deberá manejar los roles de Usuario de edificio, Administrador, Administrativo y Usuario de proveedor. | Control de cambios 2 | El Proveedor representa a una empresa y no constituye una cuenta de acceso al sistema. |
| RF-16 | Restricción de acceso según rol | El sistema deberá restringir las funcionalidades y la información visible de acuerdo con el rol del usuario. | Entrevista P15, P16, P21 | |
| RF-17 | Gestionar proveedores | El Administrador podrá registrar, modificar, consultar y administrar los proveedores que prestarán servicios para la resolución de reclamos. | Control de cambios 2 | El proveedor representa a una empresa u organización. |
| RF-18 | Registrar datos de proveedores | El sistema deberá permitir registrar para cada proveedor datos como RUT, razón social o nombre comercial, dirección, teléfono, correo electrónico y datos de un contacto responsable. | Control de cambios 2 | El contacto responsable puede ser el propietario, encargado o representante de la empresa. |
| RF-19 | Gestionar edificios | El Administrador podrá crear, modificar, consultar y administrar los edificios públicos registrados en el sistema. | Control de cambios 2 | Cada edificio deberá contar, como mínimo, con ID, nombre y dirección. |
| RF-20 | Gestionar usuarios de edificio por edificio | El Administrador podrá asociar posteriormente usuarios de edificio ya registrados a uno o más edificios, modificar sus datos y gestionar su pertenencia a cada edificio. | Control de cambios 2 | Un usuario puede existir temporalmente sin edificios asociados, pero no podrá crear reclamos hasta tener al menos una asociación. |
| RF-21 | Restablecer contraseñas | El Administrador podrá restablecer o actualizar las contraseñas de los usuarios de edificio y de los Usuarios de proveedor cuando sea necesario. | Control de cambios 2 | |
| RF-22 | Gestionar Usuarios de proveedor | El Administrador podrá registrar, modificar y administrar los Usuarios de proveedor, asociándolos al proveedor correspondiente. | Control de cambios 2 | Un proveedor podrá tener uno o más Usuarios de proveedor. |
| RF-23 | Registrar datos de Usuarios de proveedor | El sistema deberá permitir registrar para cada Usuario de proveedor datos como cédula, nombre, teléfono y contraseña. | Control de cambios 2 | Cada Usuario de proveedor deberá estar asociado a un proveedor. |
| RF-24 | Registrar finalización del trabajo | El Usuario de proveedor podrá registrar la finalización de un trabajo indicando las observaciones correspondientes y adjuntando la evidencia del trabajo realizado. | Control de cambios 2; Doc. proyecto 2.1 | Al registrar la finalización, el reclamo pasa a `PENDIENTE_APROBACION`; todavía no queda completado. |
| RF-25 | Asociar reclamos a edificios | El sistema deberá asociar obligatoriamente cada reclamo con uno de los edificios a los que pertenece el usuario de edificio que lo realiza. | Control de cambios 2 | `edificio_id` es obligatorio. La versión 1.0 no utiliza mapas, coordenadas GPS ni campos genéricos de ubicación. |


## Máquina de estados de los reclamos

Los estados válidos de un reclamo y sus transiciones son los siguientes:

| Estado | Descripción |
|---|---|
| `INGRESADO` | Reclamo creado por un Usuario de edificio y pendiente de moderación. |
| `INVALIDO` | Reclamo marcado como inválido o inapropiado por un Administrativo. Es un estado final. |
| `MODERADO` | Reclamo válido cuya clasificación y prioridad fueron revisadas por un Administrativo. |
| `ASIGNADO` | Reclamo asignado manualmente por un Administrativo a un proveedor. |
| `PENDIENTE_APROBACION` | Trabajo finalizado por un Usuario de proveedor, con observaciones y evidencia, a la espera de la decisión del Usuario de edificio. |
| `COMPLETADO` | Trabajo aprobado por el Usuario de edificio. Es un estado final. |
| `RECHAZADO` | Trabajo rechazado por el Usuario de edificio con un motivo obligatorio. El reclamo conserva el mismo proveedor para su corrección. |

| Estado de origen | Acción | Responsable | Estado de destino |
|---|---|---|---|
| `INGRESADO` | Marcar el reclamo como inválido o inapropiado | Administrativo | `INVALIDO` |
| `INGRESADO` | Validar o corregir la clasificación y la prioridad | Administrativo | `MODERADO` |
| `MODERADO` | Seleccionar y confirmar manualmente un proveedor de la lista correspondiente a la clasificación | Administrativo | `ASIGNADO` |
| `ASIGNADO` | Registrar la finalización con observaciones y evidencia fotográfica | Usuario de proveedor | `PENDIENTE_APROBACION` |
| `PENDIENTE_APROBACION` | Aprobar el trabajo realizado | Usuario de edificio | `COMPLETADO` |
| `PENDIENTE_APROBACION` | Rechazar el trabajo e indicar el motivo | Usuario de edificio | `RECHAZADO` |
| `RECHAZADO` | Registrar una nueva resolución con observaciones y evidencia | Usuario del mismo proveedor | `PENDIENTE_APROBACION` |

No se permiten transiciones distintas de las indicadas en esta tabla. Un reclamo `RECHAZADO` no se desvincula ni se reasigna automáticamente.


## Modelo de datos funcional mínimo

| Tabla | Campos principales y relaciones |
|---|---|
| `usuarios` | `id`, `cedula`, `nombre`, `telefono`, `password_hash`, `rol`, `proveedor_id` opcional y `activo`. |
| `edificios` | `id`, `nombre`, `direccion` y `activo`. |
| `usuario_edificio` | `usuario_id` y `edificio_id`; relación muchos a muchos. La asociación puede crearse después del registro del usuario. |
| `proveedores` | `id`, `rut`, `razon_social`, `direccion`, `telefono`, `email`, `contacto` y `activo`. |
| `clasificaciones` | `id` y `nombre`; se relaciona con los proveedores que pueden atender cada clasificación para generar la lista correspondiente. |
| `reclamos` | `id`, `usuario_id`, `edificio_id` obligatorio, `clasificacion_id`, `proveedor_id` opcional, `descripcion`, `prioridad`, `estado`, `motivo_rechazo` opcional y marcas de tiempo. |
| `evidencias` | `id`, `reclamo_id`, `usuario_id`, `ruta_archivo`, `tipo` (`INICIAL` o `RESOLUCION`) y `created_at`. |
| `notificaciones` | `id`, `usuario_id`, `reclamo_id`, `mensaje`, `leida` y marcas de tiempo. Se consulta mediante la API REST y no utiliza Web Push. |


## Requerimientos No Funcionales

| ID | Requerimiento no funcional | Descripción | Fuente | Observaciones |
|---|---|---|---|---|
| RNF-01 | Control de acceso | El sistema deberá implementar un mecanismo de control de roles y permisos para Usuarios de edificio, Administradores, Administrativos y Usuarios de proveedor. | Doc. proyecto 4; Entrevista P15, P21; Control de cambios 2 | |
| RNF-02 | Validación de datos | El sistema deberá validar todas las entradas recibidas antes de procesarlas, verificando que cumplan con el formato y las restricciones definidas. | Doc. proyecto 4 | |
| RNF-03 | Protección de datos personales | El sistema deberá proteger los datos personales de los usuarios de edificio, Usuarios de proveedor y demás personas registradas, restringiendo el acceso a información sensible según el rol correspondiente. | Doc. proyecto 4; Entrevista P21 | |
| RNF-04 | Usabilidad móvil | La interfaz destinada a los Usuarios de edificio deberá estar diseñada con enfoque mobile-first y funcionar como una PWA. | Doc. proyecto 4; Entrevista P14 | Marcado como pendiente de confirmación en el documento fuente. |
| RNF-05 | Arquitectura base | El sistema deberá utilizar una arquitectura basada en backend PHP, base de datos MySQL, comunicación mediante API REST y almacenamiento de archivos en filesystem. | Doc. proyecto 2.1 – Backend | |
| RNF-06 | Persistencia | La información del sistema deberá almacenarse de forma persistente en una base de datos, garantizando su disponibilidad entre sesiones. | Doc. proyecto 6 – Producto Funcional | |
| RNF-07 | Integración externa segura | La validación de identidad y los procesos que requieran comunicación con servicios externos deberán realizarse exclusivamente desde el backend, evitando llamadas directas desde el cliente. | Doc. proyecto Apéndice 1 | |
| RNF-08 | Centralización | El sistema deberá centralizar la gestión de reclamos, usuarios, edificios y proveedores en una única plataforma, evitando la dispersión de información en múltiples canales. | Entrevista P9, P14; Doc. proyecto 1 – Fundamentación; Control de cambios 2 | |
| RNF-09 | Experiencia de registro sencilla | El sistema deberá ofrecer un proceso simple e intuitivo para que el Usuario de edificio pueda registrar un reclamo, permitiendo seleccionar una clasificación correspondiente al tipo de problema. | Entrevista; Control de cambios 2 | La clasificación inicial es realizada por el Usuario de edificio y podrá ser validada o modificada por el Administrativo. |
| RNF-10 | Tratamiento ético de datos | El sistema deberá garantizar un tratamiento ético y responsable de los datos personales almacenados. | Doc. proyecto – Justificación pedagógica; 7.1 – Evaluación | |


# Épicas

| ID | Épica | Descripción | Historias de Usuario | Requerimientos Funcionales |
|---|---|---|---|---|
| EP-01 | Gestión de usuarios y autenticación | Gestionar el acceso al sistema, autenticación, roles, permisos y recuperación de credenciales. | HU1, HU2, HU3, HU26 | RF-01, RF-02, RF-03, RF-15, RF-16, RF-21 |
| EP-02 | Gestión de edificios y asociaciones | Administrar los edificios y las asociaciones entre usuarios de edificio y los edificios a los que pertenecen. | HU24, HU25 | RF-19, RF-20, RF-25 | 
| EP-03 | Gestión de reclamos del usuario de edificio | Permitir a los usuarios de edificio registrar reclamos y consultar su estado, avance y evidencias. | HU4, HU7, HU12 | RF-04, RF-08, RF-11, RF-25 |
| EP-04 | Moderación y gestión administrativa de reclamos | Permitir al personal administrativo revisar, moderar, clasificar, priorizar y consultar los reclamos. | HU5, HU6, HU10, HU21, HU11* | RF-05, RF-06, RF-10 |
| EP-05 | Asignación y gestión de proveedores | Administrar proveedores y asignar reclamos a los proveedores correspondientes. | HU13, HU14, HU22 | RF-07, RF-17, RF-18 |
| EP-06 | Gestión de usuarios de proveedor | Administrar los usuarios que trabajan en representación de cada proveedor. | HU27 | RF-22, RF-23 |
| EP-07 | Gestión de tareas y resolución por proveedores | Permitir a los usuarios de proveedor consultar sus tareas, realizar trabajos y registrar su finalización. | HU15, HU16, HU17 | RF-12, RF-13, RF-14, RF-24 | 
| EP-08 | Evidencias, notificaciones y aprobación de reclamos | Gestionar evidencias, notificaciones y la aprobación o rechazo de los trabajos realizados por proveedores. | HU8, HU9, HU18, HU19, HU20 | RF-09, RF-11, RF-12, RF-24 | 
| EP-09 | Administración y configuración del sistema | Administrar las clasificaciones disponibles y otros elementos de configuración del sistema. | HU23 | RF-05 |

\* HU11 está cancelada.


## Estimación por épica

#### Escala de estimación

- **1 punto:** tarea muy pequeña.
- **3 puntos:** tarea simple, con cierta lógica.
- **5 puntos:** tarea media.
- **8 puntos:** tarea compleja.
- **13 puntos:** tarea grande o riesgosa.


| Código | Épica | Historias | Estimación en puntos |
|---|---|---|---:|
| EP-01 | Gestión de usuarios y autenticación | HU1, HU2, HU3, HU26 | 32 |
| EP-02 | Gestión de edificios y asociaciones | HU24, HU25 | 10 |
| EP-03 | Gestión de reclamos del usuario de edificio | HU4, HU7, HU12 | 18 |
| EP-04 | Moderación y gestión administrativa de reclamos | HU5, HU6, HU10, HU21 | 18 |
| EP-05 | Gestión y asignación de proveedores | HU13, HU14, HU22 | 18 |
| EP-06 | Gestión de usuarios de proveedor | HU27 | 5 |
| EP-07 | Gestión de tareas y resolución por proveedores | HU15, HU16, HU17 | 16 |
| EP-08 | Evidencias, notificaciones y aprobación de reclamos | HU8, HU9, HU18, HU19, HU20 | 23 |
| EP-09 | Administración y configuración del sistema | HU23 | 3 |
| **Total** | | **26 historias** | **143 puntos** |

La estimación actual del Product Backlog es de **143 puntos**. Considerando una capacidad estimada de **20 puntos por sprint durante 6 sprints**, la capacidad total disponible sería de **120 puntos**. Por lo tanto, el backlog actual supera la capacidad estimada en **23 puntos**.

Esta diferencia deberá ser revisada durante la planificación de los sprints, priorizando las historias de mayor valor para el producto y dejando las historias de menor prioridad como candidatas a quedar fuera del alcance si la capacidad del equipo no permite completarlas dentro del plazo establecido.


## Propuesta presentada al cliente

El equipo presenta la siguiente propuesta para el desarrollo del sistema:

| Elemento | Propuesta |
|---|---|
| Producto | Sistema web para la gestión y seguimiento de reclamos asociados a edificios públicos. |
| Duración | 12 semanas. |
| Metodología | Scrum, con 6 sprints de 2 semanas. |
| Entregas | Incremento funcional al finalizar cada sprint. |
| Revisión | Sprint Review junto al cliente al finalizar cada sprint. |
| Esfuerzo estimado | 72 horas aproximadas. |
| Alcance principal | Autenticación y roles, gestión de edificios, registro y seguimiento de reclamos, moderación, clasificación, priorización, gestión y asignación de proveedores, gestión de usuarios de proveedor, resolución de tareas, evidencias, notificaciones y aprobación o rechazo de trabajos. |
| Fecha aproximada de finalización | 29 de octubre de 2026. |
| Validación | Las funcionalidades serán validadas mediante los criterios de aceptación definidos para cada historia de usuario. |

## Requerimientos Funcionales

| ID | Requerimiento funcional | Descripción | Fuente | Observaciones |
|---|---|---|---|---|
| RF-01 | Registro de usuarios de edificio | El sistema deberá permitir que el Administrador registre usuarios de edificio mediante número telefónico, cédula, nombre y contraseña. | Control de cambios 2 | La asociación del usuario con uno o más edificios se gestiona mediante RF-19. |
| RF-02 | Validación de datos del usuario | Durante el registro, el sistema deberá validar que el número telefónico ingresado tenga 9 dígitos y comience con 09 antes de habilitar el acceso. | Doc. proyecto Apéndice 1; Backend POST /auth/verify-ci; Entrevista P13, P18 | Se excluye la integración con TuID de Antel. |
| RF-03 | Inicio de sesión | El sistema deberá permitir que los usuarios registrados inicien sesión mediante sus credenciales. | Doc. proyecto 2.1 – Backend; POST /auth/login | Aplica a los diferentes tipos de usuarios del sistema según su rol. |
| RF-04 | Crear reclamos | El usuario de edificio podrá crear reclamos indicando una descripción, evidencia fotográfica y una clasificación correspondiente al tipo de problema identificado en el edificio. | Control de cambios 2 | Ej.: iluminación, infraestructura, mantenimiento, entre otros. |
| RF-05 | Moderación y clasificación de reclamos | El Administrativo deberá moderar el contenido ingresado por los usuarios de edificio y podrá validar o modificar la clasificación del reclamo antes de asignarlo al proveedor correspondiente. | Entrevista P22, P23, P36; Control de cambios 2 | |
| RF-06 | Asignar prioridad | El Administrativo podrá asignar una prioridad al reclamo cuando considere que requiere atención urgente. | Entrevista P7, P8 | |
| RF-07 | Asignar reclamos a proveedores | El Administrativo podrá asignar o derivar un reclamo directamente al proveedor correspondiente según la clasificación y las características del reclamo. | Control de cambios 2 | No se realiza una derivación intermedia hacia áreas internas. |
| RF-08 | Consultar reclamos propios | El usuario de edificio podrá consultar el estado y avance de sus propios reclamos. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend GET /reclamos/my; Entrevista P14, P24 | |
| RF-09 | Recibir notificaciones | El usuario de edificio recibirá notificaciones dentro de la aplicación cuando se produzcan actualizaciones relevantes sobre sus reclamos, incluyendo la finalización del trabajo por parte del proveedor. | Control de cambios 2 | |
| RF-10 | Visualizar reclamos | El Administrador y el Administrativo podrán visualizar los reclamos registrados en el sistema de acuerdo con los permisos correspondientes a su rol. | Control de cambios 2 | |
| RF-11 | Visualizar evidencias | El usuario de edificio podrá visualizar las evidencias asociadas a sus reclamos, incluyendo las evidencias registradas durante la resolución. | Control de cambios 2 | |
| RF-12 | Evidencia obligatoria de resolución | El Usuario de proveedor deberá registrar evidencia del trabajo realizado antes de marcar un reclamo como resuelto. | Entrevista P25; Control de cambios 2 | |
| RF-13 | Consultar tareas asignadas | El Usuario de proveedor podrá visualizar únicamente los reclamos o tareas asignados al proveedor al que pertenece. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; Entrevista P15; Control de cambios 2 | |
| RF-14 | Reprocesar tareas rechazadas | El Usuario de proveedor podrá volver a trabajar sobre tareas que hayan sido rechazadas o requieran correcciones. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores | Mantener únicamente si continúa existiendo el flujo de rechazo. |
| RF-15 | Roles de usuario | El sistema deberá manejar los roles de Usuario de edificio, Administrador, Administrativo y Usuario de proveedor. | Control de cambios 2 | El Proveedor representa a una empresa y no constituye una cuenta de acceso al sistema. |
| RF-16 | Restricción de acceso según rol | El sistema deberá restringir las funcionalidades y la información visible de acuerdo con el rol del usuario. | Entrevista P15, P16, P21 | |
| RF-17 | Gestionar proveedores | El Administrador podrá registrar, modificar, consultar y administrar los proveedores que prestarán servicios para la resolución de reclamos. | Control de cambios 2 | El proveedor representa a una empresa u organización. |
| RF-18 | Registrar datos de proveedores | El sistema deberá permitir registrar para cada proveedor datos como RUT, razón social o nombre comercial, dirección, teléfono, correo electrónico y datos de un contacto responsable. | Control de cambios 2 | El contacto responsable puede ser el propietario, encargado o representante de la empresa. |
| RF-19 | Gestionar edificios | El Administrador podrá crear, modificar, consultar y administrar los edificios públicos registrados en el sistema. | Control de cambios 2 | Cada edificio deberá contar, como mínimo, con ID, nombre y dirección. |
| RF-20 | Gestionar usuarios de edificio por edificio | El Administrador podrá asociar usuarios de edificio a uno o más edificios, modificar sus datos y gestionar su pertenencia a cada edificio. | Control de cambios 2 | Un mismo usuario podrá pertenecer a uno o más edificios. |
| RF-21 | Restablecer contraseñas | El Administrador podrá restablecer o actualizar las contraseñas de los usuarios de edificio y de los Usuarios de proveedor cuando sea necesario. | Control de cambios 2 | |
| RF-22 | Gestionar Usuarios de proveedor | El Administrador podrá registrar, modificar y administrar los Usuarios de proveedor, asociándolos al proveedor correspondiente. | Control de cambios 2 | Un proveedor podrá tener uno o más Usuarios de proveedor. |
| RF-23 | Registrar datos de Usuarios de proveedor | El sistema deberá permitir registrar para cada Usuario de proveedor datos como cédula, nombre, teléfono, correo electrónico y contraseña. | Control de cambios 2 | Cada Usuario de proveedor deberá estar asociado a un proveedor. |
| RF-24 | Registrar finalización del trabajo | El Usuario de proveedor podrá registrar la finalización de un trabajo indicando las observaciones correspondientes y adjuntando la evidencia del trabajo realizado. | Control de cambios 2; Doc. proyecto 2.1 | Reemplaza y reformula el antiguo RF-18. |
| RF-25 | Asociar reclamos a edificios | El sistema deberá asociar cada reclamo con el edificio al cual pertenece el usuario de edificio que lo realiza. | Control de cambios 2 | No se requiere geolocalización para determinar la ubicación del reclamo. |


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


## Épicas

| ID | Épica | Objetivo | Requerimientos relacionados |
|---|---|---|---|
| EP-01 | Gestión de usuarios y acceso | Permitir el registro, validación, inicio de sesión y control de acceso de los diferentes usuarios del sistema según su rol. | RF-01, RF-02, RF-03, RF-15, RF-16, RF-21 |
| EP-02 | Gestión de edificios y usuarios de edificio | Permitir al Administrador gestionar los edificios públicos y administrar la relación entre los usuarios de edificio y los edificios a los que pertenecen. | RF-18, RF-19, RF-20, RF-25 |
| EP-03 | Registro y seguimiento de reclamos | Permitir que los usuarios de edificio registren reclamos asociados a sus edificios y puedan consultar su estado y avance. | RF-04, RF-08 |
| EP-04 | Moderación y gestión interna de reclamos | Permitir que el Administrativo modere, clasifique, priorice y gestione los reclamos antes de su asignación a un proveedor. | RF-05, RF-06, RF-10 |
| EP-05 | Gestión y asignación de proveedores | Permitir al Administrador gestionar los proveedores y al Administrativo asignar los reclamos directamente al proveedor correspondiente. | RF-07, RF-17, RF-18 |
| EP-06 | Gestión de usuarios de proveedores | Permitir al Administrador registrar y gestionar las personas que trabajan para cada proveedor y utilizan el sistema en representación de la empresa. | RF-22, RF-23 |
| EP-07 | Gestión de tareas y resolución | Permitir que los Usuarios de proveedor consulten las tareas asignadas, registren la finalización de los trabajos y reprocesen tareas que requieran correcciones. | RF-13, RF-14, RF-24 |
| EP-08 | Evidencias y notificaciones | Permitir gestionar las evidencias asociadas a los reclamos y comunicar al Usuario de edificio las actualizaciones y la resolución de sus reclamos. | RF-09, RF-11, RF-12, RF-24 |


## Estimación por épica

#### Escala de estimación

- **1 punto:** tarea muy pequeña.
- **3 puntos:** tarea simple, con cierta lógica.
- **5 puntos:** tarea media.
- **8 puntos:** tarea compleja.
- **13 puntos:** tarea grande o riesgosa.

| Código | Épica | Estimación en puntos |
|---|---|---:|
| EP-01 | Gestión de usuarios y acceso | 13 |
| EP-02 | Gestión de edificios y usuarios de edificio | 13 |
| EP-03 | Registro y seguimiento de reclamos | 13 |
| EP-04 | Moderación y gestión interna de reclamos | 13 |
| EP-05 | Gestión y asignación de proveedores | 8 |
| EP-06 | Gestión de usuarios de proveedores | 8 |
| EP-07 | Gestión de tareas y resolución | 13 |
| EP-08 | Evidencias y notificaciones | 8 |
| **Total** | | **89 puntos** |


La estimación total (112 puntos) queda por debajo de la capacidad de 6 sprints a 20 puntos promedio (120 puntos), dejando un margen de 8 puntos como buffer ante imprevistos — precisamente el espacio liberado al cancelar RF-11/HU11.

## Propuesta presentada al cliente

El equipo presenta la siguiente propuesta:

| Elemento | Propuesta |
|---|---|
| Producto | Portal Ciudadano, sistema web de gestión de reclamos ciudadanos. |
| Duración | 12 semanas (aprox. 3 meses). |
| Metodología | Scrum, con 6 sprints de 2 semanas. |
| Entregas | Incremento funcional al final de cada sprint. |
| Esfuerzo estimado | 72 horas. |
| Forma de trabajo | Reporte quincenal de actividad y trazabilidad Git obligatoria. |
| Primera versión | Registro y validación de identidad de ciudadanos, roles y permisos, creación y seguimiento de reclamos, asignación y derivación a equipos/proveedores, registro de finalización con evidencias, aprobación/rechazo de cierre, moderación manual, gestión de proveedores y clasificaciones. |
| Exclusiones | Integración con TuID de Antel, asignación automática de prioridad por tipo de incidencia, registro de intentos fraudulentos, historial completo de cambios, reapertura de reclamos cerrados, registro de inicio de trabajo de equipos (solo finalización), estadísticas/indicadores, moderación automática con IA, detección automática de reclamos inválidos o fraude, visualización en tiempo real del recorrido del equipo, notificaciones push al celular. |


## Control de cambios

**Cambio:** Se cancela RF-11 (Gestión mediante Kanban) y, en consecuencia, la historia HU11 (Tablero Kanban) queda fuera del alcance del proyecto.

**Justificación:** El equipo ya cuenta con las tres interfaces definidas para la Intendencia (PWA Ciudadanía, Dashboard Comuna, Frontend Equipos/Proveedores), por lo que agregar una vista adicional de tablero Kanban dentro del Dashboard Comuna resulta redundante y poco práctico dado el plazo ajustado del proyecto. La visualización y gestión de reclamos por parte del personal de la comuna se seguirá cubriendo mediante RF-10 (listado de reclamos con filtro por área) y el campo de estado de cada reclamo (Ingreso, Validado, En proceso, Completado), sin necesidad de una representación visual tipo tablero.

**Impacto:**
- Se elimina HU11 (8 puntos) del backlog priorizado.
- La épica EP-04 (Gestión interna de reclamos) pasa a cubrirse únicamente con HU10 y HU12.
- El Sprint 4, que incluía HU11, libera 8 puntos de capacidad, que pueden reasignarse a otra historia pendiente o usarse como colchón ante retrasos.
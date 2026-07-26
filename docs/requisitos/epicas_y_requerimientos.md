## Requerimientos Funcionales


| ID | Requerimiento funcional | Descripción | Fuente | Observaciones |
|----|-------------------------|-------------|---------|---------------|
| RF-01 | Registro de ciudadanos | El sistema deberá permitir que un ciudadano se registre mediante correo electrónico. | Doc. proyecto 2.1 – PWA Ciudadanía | |
| RF-02 | Inicio de sesión | El sistema deberá permitir que los usuarios autenticados inicien sesión. | Doc. proyecto 2.1 – Backend; POST /auth/login | |
| RF-03 | Validación de identidad | Durante el alta, el backend deberá validar la identidad del ciudadano antes de habilitar el acceso. | Doc. proyecto Apéndice 1; Backend POST /auth/verify-ci; Entrevista P13, P18 | Se excluye la integración con TuID de Antel. |
| RF-04 | Crear reclamos | El ciudadano podrá crear reclamos indicando tipo de incidente, descripción, categoría, prioridad, evidencias y geolocalización automática. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend POST /reclamos; Entrevista P10, P11, P13 | |
| RF-05 | Categorías de reclamo | El sistema deberá ofrecer categorías predefinidas asociadas a áreas responsables y una opción "Otro". | Entrevista P4, P10, P17 | |
| RF-06 | Asignar prioridad | El sistema deberá permitir asignar una prioridad al reclamo en una escala de 1 a 5. | Entrevista P7, P8 | |
| RF-07 | Consultar reclamos propios | El ciudadano podrá consultar el estado y avance de sus reclamos. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend GET /reclamos/my; Entrevista P14, P24 | |
| RF-08 | Recibir notificaciones | El ciudadano recibirá notificaciones dentro de la aplicación ante cambios de estado del reclamo. | Doc. proyecto 2.1 – PWA Ciudadanía; Entrevista P14, P24 | |
| RF-09 | Visualizar reclamos públicos | El ciudadano podrá visualizar reclamos ajenos con diferente nivel de exposición según su estado. | Entrevista P20 | |
| RF-10 | Visualizar todos los reclamos | El personal de la comuna podrá visualizar todos los reclamos registrados. | Doc. proyecto 2.1 – Dashboard Comuna; Backend GET /reclamos | |
| RF-11 | Gestión mediante Kanban | El dashboard organizará los reclamos en estados: Ingreso, Asignado, En proceso, Pendiente de aprobación, Resuelto y Rechazado. | Doc. proyecto 2.1 – Dashboard Comuna | |
| RF-12 | Asignar reclamos | La comuna podrá asignar reclamos a equipos internos o proveedores. | Doc. proyecto 2.1 – Dashboard Comuna; PATCH /reclamos/{id}/assign | |
| RF-13 | Derivación automática | El sistema deberá derivar automáticamente el reclamo al área o proveedor correspondiente según categoría. | Entrevista P12, P29 | |
| RF-14 | Visualizar evidencias | La comuna podrá visualizar evidencias antes y después de la resolución. | Doc. proyecto 2.1 – Dashboard Comuna; Entrevista P16 | |
| RF-15 | Validar y cerrar reclamo | La comuna aprobará o rechazará el trabajo realizado antes del cierre definitivo. | Doc. proyecto 2.1 – Dashboard Comuna; PATCH approve/reject; Entrevista P26 | |
| RF-16 | Evidencia obligatoria de cierre | El equipo deberá registrar evidencia del trabajo realizado antes de marcar un reclamo como resuelto. | Entrevista P25 | |
| RF-17 | Consultar tareas asignadas | Los equipos o proveedores podrán visualizar únicamente las tareas asignadas. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; Entrevista P15 | |
| RF-18 | Registrar finalización | Los equipos podrán finalizar tareas registrando materiales, observaciones, evidencias, fecha y hora. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; PATCH /reclamos/{id}/finish; Entrevista P30 | |
| RF-19 | Reprocesar tareas rechazadas | Los equipos podrán volver a trabajar sobre tareas rechazadas con prioridad. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores | |
| RF-20 | Administrar evidencias | El sistema permitirá almacenar y consultar archivos multimedia asociados a un reclamo. | Doc. proyecto 2.1 – Backend Evidencias; 3 – Modelo de Datos | |
| RF-21 | Roles de usuario | El sistema deberá manejar distintos roles de usuario con permisos específicos. | Entrevista P15, P21 | |
| RF-22 | Restricción de información por rol | El sistema deberá restringir la información visible según el rol del usuario. | Entrevista P15, P16, P21 | |
| RF-23 | Moderación manual de contenido | El sistema deberá permitir que un funcionario modere el contenido ingresado por ciudadanos. | Entrevista P22, P23 | Rol: Moderador. |                                                                    |                                                                                         |

## Requerimientos no funcionales
| ID | Requerimiento no funcional | Descripción | Fuente | Observaciones |
|---|---|---|---|---|
| RNF-01 | Control de acceso | El sistema deberá implementar control de roles y permisos para ciudadanos, personal de la comuna y proveedores. | Doc. proyecto 4; Entrevista P15, P21 | |
| RNF-02 | Validación de datos | El sistema deberá validar todas las entradas recibidas antes de procesarlas. | Doc. proyecto 4 | |
| RNF-04 | Protección de datos personales | El sistema deberá proteger los datos personales de los ciudadanos y restringir el acceso a información sensible según el rol. | Doc. proyecto 4; Entrevista P21 | |
| RNF-05 | Usabilidad móvil | La interfaz de ciudadanía deberá estar diseñada con enfoque mobile-first y funcionar como una PWA. | Doc. proyecto 4; Entrevista P14 | Marcado como pendiente de confirmación en el documento fuente. |
| RNF-06 | Arquitectura base | El sistema deberá utilizar una arquitectura basada en backend PHP, base de datos MySQL, comunicación mediante API REST y almacenamiento de archivos en filesystem. | Doc. proyecto 2.1 – Backend | |
| RNF-07 | Persistencia | La información del sistema deberá almacenarse de forma persistente en una base de datos. | Doc. proyecto 6 – Producto Funcional | |
| RNF-10 | Integración externa segura | La validación de identidad deberá realizarse exclusivamente desde el backend, evitando llamadas directas desde el cliente. | Doc. proyecto Apéndice 1 | |
| RNF-12 | Centralización | El sistema deberá centralizar la gestión de reclamos en una única plataforma, evitando la dispersión de información en múltiples canales. | Entrevista P9, P14; Doc. proyecto 1 – Fundamentación | |
| RNF-14 | Experiencia de registro sencilla | El sistema deberá ofrecer un proceso simple de registro de reclamos mediante categorías predefinidas. | Entrevista P17 | |
| RNF-15 | Tratamiento ético de datos | El sistema deberá garantizar un tratamiento ético y responsable de los datos personales almacenados. | Doc. proyecto – Justificación pedagógica; 7.1 – Evaluación | |


## Epicas

| ID | Épica | Objetivo | Requerimientos relacionados |
|----|--------|----------|-----------------------------|
| EP-01 | Gestión de usuarios y acceso | Permitir el registro, inicio de sesión, validación de identidad y acceso según rol. | RF-01, RF-02, RF-03, RF-21, RF-22 |
| EP-02 | Registro de reclamos ciudadanos | Permitir que el ciudadano cree reclamos completos con categoría, prioridad, ubicación y evidencias. | RF-04, RF-05, RF-06, RF-20 |
| EP-03 | Seguimiento ciudadano y notificaciones | Permitir que el ciudadano consulte sus reclamos, vea reclamos públicos y reciba notificaciones. | RF-07, RF-08, RF-09 |
| EP-04 | Gestión interna de reclamos | Permitir que la comuna visualice y organice reclamos mediante dashboard y tablero Kanban. | RF-10, RF-11, RF-14 |
| EP-05 | Asignación y derivación | Permitir asignar reclamos a equipos o proveedores y derivarlos automáticamente según categoría. | RF-12, RF-13 |
| EP-06 | Gestión de tareas de equipos/proveedores | Permitir que equipos y proveedores consulten sus tareas, registren finalizaciones y reprocesen tareas rechazadas. | RF-17, RF-18, RF-19 |
| EP-07 | Evidencias del reclamo | Permitir cargar, almacenar, consultar y visualizar evidencias asociadas a reclamos y resoluciones. | RF-14, RF-16, RF-20 |
| EP-08 | Validación y cierre de reclamos | Permitir aprobar, rechazar y cerrar reclamos luego de revisar el trabajo realizado. | RF-15, RF-16, RF-18, RF-19 |
| EP-09 | Moderación manual de contenido | Permitir que un funcionario con rol de moderador revise el contenido ingresado por los ciudadanos. | RF-23 |
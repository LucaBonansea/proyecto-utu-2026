## Requerimientos Funcionales


| ID | Requerimiento funcional | Descripción | Fuente | Observaciones |
|----|-------------------------|-------------|---------|---------------|
| RF-01 | Registro de ciudadanos | El sistema deberá permitir que un ciudadano se registre mediante número telefónico. | Doc. proyecto 2.1 – PWA Ciudadanía | |
| RF-02 | Inicio de sesión | El sistema deberá permitir que los usuarios autenticados inicien sesión. | Doc. proyecto 2.1 – Backend; POST /auth/login | |
| RF-03 | Validación de identidad | Durante el alta, el backend deberá validar la identidad del ciudadano antes de habilitar el acceso. | Doc. proyecto Apéndice 1; Backend POST /auth/verify-ci; Entrevista P13, P18 | Se excluye la integración con TuID de Antel. |
| RF-04 | Crear reclamos | El ciudadano podrá crear reclamos indicando descripción, evidencias y geolocalización automática. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend POST /reclamos; Entrevista P10, P11, P13 | |
| RF-05 | Clasificar reclamos | El administrativo podrá clasificar los reclamos para asignarlos al área correspondiente. | Entrevista P36 | |
| RF-06 | Asignar prioridad | El administrativo podrá asignar una prioridad al reclamo cuando considere que requiere atención urgente. | Entrevista P7, P8 | |
| RF-07 | Consultar reclamos propios | El ciudadano podrá consultar el estado y avance de sus reclamos. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend GET /reclamos/my; Entrevista P14, P24 | |
| RF-08 | Recibir notificaciones | El ciudadano recibirá notificaciones dentro de la aplicación ante cambios de estado del reclamo. | Doc. proyecto 2.1 – PWA Ciudadanía; Entrevista P14, P24 | |
| RF-09 | Visualizar reclamos públicos | El ciudadano podrá visualizar reclamos ajenos con diferente nivel de exposición según su estado. | Entrevista P20 | |
| RF-10 | Visualizar todos los reclamos | El personal de la comuna podrá visualizar todos los reclamos registrados. Los usuarios de cada área dispondrán de un filtro para visualizar únicamente los reclamos correspondientes. | Doc. proyecto 2.1 – Dashboard Comuna; Backend GET /reclamos | |
| RF-11 *(Cancelado)* | Gestión mediante Kanban | El dashboard organizará los reclamos en estados: Ingreso, En proceso, Resuelto y Rechazado. | Doc. proyecto 2.1 – Dashboard Comuna | |
| RF-12 | Asignar reclamos | La comuna podrá asignar reclamos a equipos internos o proveedores luego de ser clasificados por el administrativo. | Doc. proyecto 2.1 – Dashboard Comuna; PATCH /reclamos/{id}/assign | |
| RF-13 | Derivación automática |El sistema deberá derivar automáticamente el reclamo al área o proveedor correspondiente según la clasificación realizada por el administrativo. | Entrevista P12, P29| |
| RF-14 | Visualizar evidencias | La comuna podrá visualizar evidencias antes y después de la resolución. | Doc. proyecto 2.1 – Dashboard Comuna; Entrevista P16 | |
| RF-15 | Validar y cerrar reclamo | La comuna aprobará o rechazará el trabajo realizado antes del cierre definitivo. | Doc. proyecto 2.1 – Dashboard Comuna; PATCH approve/reject; Entrevista P26 | |
| RF-16 | Evidencia obligatoria de cierre | El equipo deberá registrar evidencia del trabajo realizado antes de marcar un reclamo como resuelto. | Entrevista P25 | |
| RF-17 | Consultar tareas asignadas | Los equipos o proveedores podrán visualizar únicamente las tareas asignadas. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; Entrevista P15 | |
| RF-18 | Registrar finalización | Los equipos podrán finalizar tareas registrando materiales, observaciones, evidencias, fecha y hora. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; PATCH /reclamos/{id}/finish; Entrevista P30 | |
| RF-19 | Reprocesar tareas rechazadas | Los equipos podrán volver a trabajar sobre tareas rechazadas con prioridad. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores | |
| RF-20 | Administrar evidencias | El sistema permitirá almacenar y consultar archivos multimedia asociados a un reclamo. | Doc. proyecto 2.1 – Backend Evidencias; 3 – Modelo de Datos | |
| RF-21 | Roles de usuario | El sistema deberá manejar distintos roles como ciudadano, administrador, administrativo, usuario de área y proveedor. | Entrevista P15, P21 | |
| RF-22 | Restricción de información por rol | El sistema deberá restringir la información visible según el rol del usuario. | Entrevista P15, P16, P21 | |
| RF-23 | Moderación manual de contenido | El administrativo deberá moderar el contenido ingresado por los ciudadanos antes de clasificar y derivar el reclamo al área correspondiente. | Entrevista P22, P23, P36 | Rol: Administrativo. | | |
| RF-24 | Gestionar proveedores | El administrativo podrá registrar, modificar y administrar los proveedores del sistema. | Entrevista P37 |  | | |
| RF-25 | Gestionar clasificaciones | El administrador o administrativo podrá crear, editar, modificar y administrar las categorías y clasificaciones disponibles en el sistema.  | Notas del proyecto; Alcance 9.6 |  | | |


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
| RNF-14 | Experiencia de registro sencilla | El sistema deberá ofrecer un proceso simple e intuitivo para el registro de reclamos, sin requerir que el ciudadano seleccione una clasificación, ya que esta será asignada posteriormente por el administrativo. | Entrevista  | |
| RNF-15 | Tratamiento ético de datos | El sistema deberá garantizar un tratamiento ético y responsable de los datos personales almacenados. | Doc. proyecto – Justificación pedagógica; 7.1 – Evaluación | |


## Epicas

| ID | Épica | Objetivo | Requerimientos relacionados |
|----|--------|----------|-----------------------------|
| EP-01 | Gestión de usuarios y acceso | Permitir el registro, inicio de sesión, validación de identidad y acceso según rol. | RF-01, RF-02, RF-03, RF-21, RF-22 |
| EP-02 | Registro de reclamos ciudadanos | Permitir que el ciudadano cree reclamos completos con ubicación y evidencias.| RF-04, RF-05, RF-06, RF-20 |
| EP-03 | Seguimiento ciudadano y notificaciones | Permitir que el ciudadano consulte sus reclamos, vea reclamos públicos y reciba notificaciones. | RF-07, RF-08, RF-09 |
| EP-04 | Gestión interna de reclamos | Permitir que la comuna visualice y organice reclamos. | RF-10, RF-14 |
| EP-05 | Asignación y derivación | Permitir asignar reclamos a equipos o proveedores y derivarlos automáticamente según la clasificación realizada por el administrativo. | RF-12, RF-13 |
| EP-06 | Gestión de tareas de equipos/proveedores | Permitir que equipos y proveedores consulten sus tareas, registren finalizaciones y reprocesen tareas rechazadas. | RF-17, RF-18, RF-19 |
| EP-07 | Evidencias del reclamo | Permitir cargar, almacenar, consultar y visualizar evidencias asociadas a reclamos y resoluciones. | RF-14, RF-16, RF-20 |
| EP-08 | Validación y cierre de reclamos | Permitir aprobar, rechazar y cerrar reclamos luego de revisar el trabajo realizado. | RF-15, RF-16, RF-18, RF-19 |
| EP-09 | Moderación manual y administración del sistema  | Permitir que el funcionario administrativo revise el contenido ingresado por los ciudadanos, gestione las clasificaciones del sistema y administre el catálogo de proveedores.  | RF-23, RF-24, RF-25 |

## Estimación por épica

#### Escala de estimación

- **1 punto:** tarea muy pequeña.
- **3 puntos:** tarea simple, con cierta lógica.
- **5 puntos:** tarea media.
- **8 puntos:** tarea compleja.
- **13 puntos:** tarea grande o riesgosa.

| Código | Épica | Estimación en puntos |
| --- | --- | --- |
| EP-01 | Gestión de usuarios y acceso | 16 |
| EP-02 | Registro de reclamos ciudadanos | 16 |
| EP-03 | Seguimiento ciudadano y notificaciones | 15 |
| EP-04 | Gestión interna de reclamos | 10 |
| EP-05 | Asignación y derivación | 13 |
| EP-06 | Gestión de tareas de equipos/proveedores | 16 |
| EP-07 | Evidencias del reclamo | 5 |
| EP-08 | Validación y cierre de reclamos | 8 |
| EP-09 | Moderación manual y administración del sistema | 13 |
| **Total** | | **112 puntos** |


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
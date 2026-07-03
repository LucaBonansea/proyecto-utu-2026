# 🚀 Proyecto UTU 2026

Proyecto académico desarrollado para UTU 2026.

El proyecto consiste en desarrollar una plataforma que permita gestionar reclamos ciudadanos relacionados con problemas urbanos, facilitando la comunicación entre ciudadanos, la comuna y los equipos encargados de resolver incidencias.

## Descripción

El proyecto consiste en desarrollar una plataforma que permita gestionar reclamos ciudadanos relacionados con problemas urbanos, facilitando la comunicación entre ciudadanos, la comuna y los equipos encargados de resolver incidencias.

El sistema permitirá:

* Registrar reclamos ciudadanos.
* Gestionar reclamos desde la comuna.
* Asignar tareas a equipos o proveedores.
* Realizar seguimiento del estado de los reclamos.
* Adjuntar evidencias multimedia.
* Mantener trazabilidad completa de cada reclamo.

---

# Objetivos

## Ciudadanía

* Registro e inicio de sesión.
* Validación de identidad.
* Creación de reclamos.
* Adjuntar evidencias.
* Geolocalización.
* Seguimiento de estados.

## Comuna

* Visualización de reclamos.
* Gestión mediante tablero Kanban.
* Asignación de tareas.
* Aprobación o rechazo de trabajos.
* Seguimiento de actividades.

## Equipos / Proveedores

* Visualizar tareas asignadas.
* Iniciar y finalizar trabajos.
* Registrar materiales utilizados.
* Adjuntar evidencias.

---

# Tecnologías

## Frontend

* HTML5
* CSS3
* JavaScript

## Backend

* Laravel

## Base de Datos

* MySQL

## Gestión del Proyecto

* Git
* GitHub
* GitHub Projects
* GitHub Issues

---

# Estructura del Proyecto

```bash
.
├── README.md
├── docs
│   ├── analisis
│   ├── diseno
│   ├── requisitos
│   └── entregas
├── src
├── tests
└── .github
```

## Carpetas

### docs/

Documentación del proyecto.

* análisis del problema
* requerimientos
* diseño
* entregas

### src/

Código fuente del sistema.

### tests/

Pruebas y validaciones.

### .github/

Templates para Issues y Pull Requests.

---

# Roles del Sistema

## Ciudadano

* Crear reclamos.
* Consultar estados.
* Visualizar historial.

## Comuna / Administrador

* Gestionar reclamos.
* Asignar tareas.
* Aprobar o rechazar trabajos.

## Equipo / Proveedor

* Gestionar tareas asignadas.
* Registrar avances.
* Adjuntar evidencias.

---

# Estados del Reclamo

* Ingreso
* Asignado
* En proceso
* Pendiente de aprobación
* Resuelto
* Rechazado

Todos los cambios de estado serán registrados en el historial del sistema.

---

# Épicas

## EP1 - Seguridad

Autenticación, control de acceso, roles, permisos y validaciones de identidad.

## EP2 - Reclamos

Creación, registro, validación y seguimiento de reclamos ciudadanos.

## EP3 - Dashboard

Visualización, filtro y gestión de reclamos para la comuna y los equipos.

## EP4 - Equipos

Asignación de tareas, control de avance y organización del trabajo en equipos.

## EP5 - Evidencias

Carga, almacenamiento y gestión de fotos, videos y archivos asociados a reclamos.

## EP6 - Historial

Registro de estados, trazabilidad de cambios y consulta del historial de reclamos.

## EP7 - Testing y Documentación

Pruebas, documentación, entrega y preparación para defensa.

## Estimación por épicas

| Épica | Descripción | Estimación aproximada (Story Points) |
| --- | --- | --- |
| EP1 - Seguridad | Autenticación, roles y permisos. | 10 |
| EP2 - Reclamos | Gestión completa del ciclo de reclamos. | 45 |
| EP3 - Dashboard | Visualización y control de reclamos para la comuna. | 30 |
| EP4 - Equipos | Asignación y seguimiento de tareas. | 25 |
| EP5 - Evidencias | Manejo de fotografías, videos y archivos. | 20 |
| EP6 - Historial | Seguimiento de cambios y estados del reclamo. | 15 |
| EP7 - Testing y Documentación | Pruebas y entrega de documentación. | 8 |

---

# Planificación

## Sprint 0

Duración estimada: 1 semana.
- Consolidar requisitos, priorizar el backlog y definir el alcance de la primera versión.
- Diseñar la arquitectura técnica y el modelo de datos.
- Configurar el repositorio, ramas principales y el entorno de desarrollo.
- Preparar plantillas de documentación y criterios de aceptación.

## Sprint 1

Duración estimada: 2 semanas.
Objetivo: Entregar la base del sistema con autenticación, roles y gestión inicial de reclamos.
Historias clave: HU1, HU4 y HU2.
- Registro y validación de usuarios.
- Inicio de sesión y control de acceso por roles.
- Creación de reclamos con descripción, ubicación y evidencia.
- Visualización de reclamos registrados.

## Sprint 2

Duración estimada: 2 semanas.
Objetivo: Implementar la gestión de estados y la coordinación entre comuna y equipos.
Historias clave: HU5, HU6 y HU2.
- Asignación de reclamos a equipos de trabajo.
- Gestión del ciclo de vida del reclamo.
- Aprobación o rechazo de reclamos resueltos.
- Seguimiento básico del estado del reclamo.

## Sprint 3

Duración estimada: 2 semanas.
Objetivo: Entregar soporte operativo para los equipos de trabajo.
Historias clave: HU7, HU8 y HU9.
- Visualización de tareas asignadas.
- Registro del inicio de tareas.
- Registro de finalización con observaciones y evidencias.
- Historial de actividad asociado a cada reclamo.

## Sprint 4

Duración estimada: 2 semanas.
Objetivo: Completar mejoras de valor, pruebas y documentación para la entrega final.
Historias clave: HU3 y actividades de cierre.
- Notificaciones sobre cambios de estado de reclamos.
- Reportes estadísticos y auditoría.
- Pruebas, correcciones y documentación final.
- Preparar presentación y entregables de cierre.

## Observaciones

- El backlog inicial está validado y ordenado en `docs/requisitos/priorizacion-backlog.md`.
- Las historias de mayor valor y riesgo se colocan en los primeros sprints.
- La funcionalidad de notificaciones es un valor agregado que puede quedar para Sprint 4 si hay restricciones de capacidad.
- Se recomienda una capacidad inicial de 20 puntos por sprint y ajustar según la velocidad real del equipo.
- Mantener reuniones de Sprint Review y Retrospective para adaptar el plan.

---

# Flujo de Trabajo

## Ramas

* main → versión estable.
* develop → integración de cambios.
* feature/* → nuevas funcionalidades.

## Proceso

1. Crear rama desde develop.
2. Implementar cambios.
3. Realizar commits descriptivos.
4. Crear Pull Request.
5. Revisar cambios.
6. Realizar merge.

---

# Kanban

El proyecto se organiza mediante GitHub Projects.

Columnas:

* Backlog
* Ready
* In Progress
* Blocked
* In Review
* Done

---

# Reglas del Equipo

* No trabajar directamente sobre main.
* Utilizar Pull Requests.
* Mantener actualizado el tablero Kanban.
* Documentar cambios importantes.
* Utilizar Issues para nuevas tareas.
* Comprender el código desarrollado antes de integrarlo.
* Todos los integrantes deben conocer el funcionamiento general del sistema para la defensa.

---

# Estado Actual

Actualmente el proyecto se encuentra en fase de análisis, planificación y diseño inicial.

---

# Licencia

Proyecto académico desarrollado para UTU 2026.
CAMBIO
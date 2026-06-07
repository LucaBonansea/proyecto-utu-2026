# Sistema de Gestión de Reclamos Ciudadanos

Proyecto académico desarrollado para UTU 2026.

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

Autenticación, roles, permisos y validaciones.

## EP2 - Reclamos

Creación y gestión de reclamos ciudadanos.

## EP3 - Dashboard

Gestión y visualización de reclamos por la comuna.

## EP4 - Equipos

Gestión de tareas para equipos y proveedores.

## EP5 - Evidencias

Carga y gestión de fotos, videos y archivos.

## EP6 - Historial

Seguimiento de estados y actividades.

## EP7 - Testing y Documentación

Testing, documentación y preparación para la defensa.

---

# Planificación

## Sprint 0

Planificación, análisis, backlog, alcance, arquitectura y diseño.

## Sprint 1

Seguridad, autenticación, validaciones y gestión de usuarios.

## Sprint 2

Gestión de reclamos ciudadanos.

## Sprint 3

Dashboard de la comuna e historial de estados.

## Sprint 4

Equipos, evidencias, testing y documentación final.

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
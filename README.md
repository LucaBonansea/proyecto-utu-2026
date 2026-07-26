# 🚀 Proyecto UTU 2026

Proyecto académico desarrollado para la asignatura de Programación Full-Stack en UTU 2026.

El sistema consiste en una plataforma web para la gestión de reclamos ciudadanos, orientada a centralizar la comunicación entre la ciudadanía, la comuna y los equipos o proveedores responsables de resolver incidencias urbanas.

## Descripción

El objetivo principal del proyecto es permitir que los ciudadanos registren reclamos, que la comuna los administre mediante un tablero de control y que los equipos puedan resolverlos con trazabilidad completa.

El sistema contempla:

- Registro de reclamos ciudadanos.
- Gestión interna de reclamos desde la comuna.
- Asignación de tareas a equipos o proveedores.
- Seguimiento del estado de cada reclamo.
- Carga de evidencias multimedia.
- Historial completo de cambios y actividades.

---

# Objetivos del proyecto

## Ciudadanía

- Registro e inicio de sesión.
- Validación de identidad.
- Creación de reclamos.
- Adjuntar evidencias.
- Geolocalización.
- Seguimiento del estado del reclamo.

## Comuna / Administración

- Visualización de reclamos.
- Gestión mediante tablero Kanban.
- Asignación de tareas.
- Aprobación o rechazo de trabajos.
- Seguimiento de actividades y auditoría.

## Equipos / Proveedores

- Visualizar tareas asignadas.
- Iniciar y finalizar trabajos.
- Registrar materiales utilizados.
- Adjuntar evidencias de resolución.

---

# Tecnologías

## Frontend

- HTML5
- CSS3
- JavaScript
- jQuery

## Backend

- Laravel
- PHP

## Base de datos

- MySQL

## Gestión del proyecto

- Git
- GitHub
- GitHub Projects
- GitHub Issues

---

# Estructura del proyecto

```bash
.
├── README.md
├── docs
│   ├── actas
│   ├── analisis
│   ├── diseno
│   ├── requisitos
│   └── entregas
├── src
│   └── frontend
├── tests
└── .github
```

## Carpetas

### docs/

Documentación del proyecto, incluyendo análisis, requisitos, diseño, actas y entregas.

### src/

Código fuente del sistema. Actualmente se encuentra organizada la parte frontend en la carpeta src/frontend.

### tests/

Pruebas y validaciones del sistema.

### .github/

Plantillas y configuraciones para Issues, Pull Requests y flujo de trabajo del repositorio.

---

# Roles del sistema

## Ciudadano

- Crear reclamos.
- Consultar estados.
- Visualizar historial.

## Comuna / Administrador

- Gestionar reclamos.
- Asignar tareas.
- Aprobar o rechazar trabajos.
- Supervisar trazabilidad y auditoría.

## Equipo / Proveedor

- Gestionar tareas asignadas.
- Registrar avances.
- Adjuntar evidencias.

---

# Estados del reclamo

- Ingreso
- Asignado
- En proceso
- Pendiente de aprobación
- Resuelto
- Rechazado

Todos los cambios de estado serán registrados en el historial del sistema.

---

# Épicas principales

## EP1 - Identidad y acceso

Registro, autenticación, validación de identidad y control de permisos.

## EP2 - Creación y configuración de reclamos

Registro de ciudadanos, creación de reclamos con evidencias, categoría, prioridad y geolocalización.

## EP3 - Seguimiento ciudadano

Consulta del estado de reclamos, notificaciones y trazabilidad para la ciudadanía.

## EP4 - Gestión interna de reclamos

Administración de reclamos desde la comuna, asignación y aprobación de tareas.

## EP5 - Gestión de equipos y proveedores

Visualización de tareas, inicio y cierre de trabajo, y registro de evidencias.

## EP6 - Moderación y prevención de fraude

Detección de contenido inválido, riesgos de fraude y comportamiento sospechoso.

## EP7 - Infraestructura y soporte tecnológico

Arquitectura, persistencia, seguridad básica, documentación y gestión del desarrollo.

---

# Estado actual

El proyecto se encuentra en una etapa de análisis, planificación y documentación inicial para la primera entrega académica.

Actualmente cuentan con:

- requisitos funcionales y no funcionales,
- épicas y backlog inicial,
- arquitectura propuesta,
- acta de reunión,
- análisis de riesgos y restricciones.

Se continúa avanzando en la documentación formal y en la base técnica para poder pasar a la implementación.

---

# Primera entrega

La primera entrega del proyecto incluye, entre otros aspectos, la documentación formal del proyecto, el análisis de requerimientos, el alcance inicial, el backlog, la arquitectura propuesta, las actas y la base de seguridad y trazabilidad requerida por la asignatura.

---

# Flujo de trabajo

## Ramas

- main → versión estable.
- develop → integración de cambios.
- feature/* → nuevas funcionalidades.

## Proceso

1. Crear una rama a partir de develop.
2. Desarrollar cambios de forma ordenada.
3. Realizar commits descriptivos.
4. Crear Pull Request.
5. Revisar y validar cambios.
6. Integrar en la rama correspondiente.

---

# Kanban

El proyecto se organiza mediante GitHub Projects.

Columnas sugeridas:

- Backlog
- Ready
- In Progress
- Blocked
- In Review
- Done

---

# Reglas del equipo

- No trabajar directamente sobre main.
- Utilizar Pull Requests.
- Mantener actualizado el tablero Kanban.
- Documentar cambios importantes.
- Utilizar Issues para nuevas tareas.
- Comprender el código desarrollado antes de integrarlo.
- Todos los integrantes deben conocer el funcionamiento general del sistema para la defensa.

---

# Licencia

Proyecto académico desarrollado para UTU 2026.
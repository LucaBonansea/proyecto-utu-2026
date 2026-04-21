# Proyecto UTU 2026

## Sistema de Gestión de Reclamos Ciudadanos

---

## Descripción

Este proyecto consiste en el desarrollo de un sistema para gestionar reclamos ciudadanos relacionados con problemas urbanos (baches, alumbrado, etc.).

El objetivo es crear una solución que permita:

* A los ciudadanos registrar reclamos
* A la comuna gestionarlos
* A los equipos resolverlos

---

## Estructura del proyecto

```bash
.
├── README.md
├── docs
│   ├── analisis
│   │   └── analisis.md
│   ├── diseno
│   │   └── diseno.md
│   ├── entregas
│   │   └── entrega-1.md
│   └── requisitos
│       └── requisitos.md
├── src
└── tests
```

### Descripción de carpetas

* `docs/` → documentación del proyecto

  * `analisis/` → análisis del problema y sistema
  * `diseno/` → diseño (UI, arquitectura, etc.)
  * `requisitos/` → requerimientos funcionales y no funcionales
  * `entregas/` → entregas formales del proyecto

* `src/` → código fuente (frontend y backend)

* `tests/` → pruebas del sistema

---

## Flujo de trabajo (Git)

Se trabaja con ramas:

* `main` → versión estable
* `develop` → integración de cambios
* `feature/*` → nuevas funcionalidades

### Proceso de trabajo

1. Crear una rama desde `develop`
2. Realizar cambios
3. Subir commits
4. Crear Pull Request
5. Revisar y hacer merge

---

## Organización (Kanban)

El proyecto se organiza con un tablero:

* **Backlog** → tareas pendientes
* **En progreso** → tareas en desarrollo
* **Bloqueado** → tareas detenidas
* **En revisión** → esperando aprobación
* **Terminado** → tareas finalizadas

---

## Etiquetas (Issues)

Se utilizan labels para organizar tareas:

* `frontend` → interfaz
* `backend` → lógica
* `analysis` → análisis
* `docs` → documentación
* `design` → diseño visual
* `feature` → funcionalidad nueva
* `bloqueado` → tarea detenida

---

## 👥 Organización del equipo

Roles del equipo:

* Líder → organización y control
* Analista → requisitos y documentación
* Frontend (design) → prototipos
* Frontend developer → implementación
* Backend → lógica y API

---

## Estado actual

Actualmente el proyecto se encuentra en fase de:

* Definición de requisitos
* Análisis del sistema
* Diseño de interfaces (prototipos)

---

## Reglas del equipo

* No trabajar directamente en `main`
* Usar siempre Pull Requests
* Mantener el kanban actualizado
* Documentar los cambios

---

## Notas

* Existe una carpeta `.github/` con templates para:

  * Issues
  * Pull Requests

Esto ayuda a mantener consistencia en el trabajo del equipo.

---

**Proyecto académico – UTU 2026**

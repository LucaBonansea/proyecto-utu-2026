# Parte 9: Planificación de sprints

## 23. Sprint 0: Preparación del proyecto y definición

### Objetivo del sprint
Completar la documentación y las definiciones técnicas para la primera entrega.

### Historias seleccionadas
| ID | Historia / Tarea |
| --- | ---------------- |
| HU1 | Registrar un reclamo: definir alcance, criterios de aceptación y campos obligatorios. |
| HU2 | Consultar estado de reclamos: definir pantalla y requisitos de seguimiento. |
| HU4 | Visualizar reclamos registrados: definir consultas y permisos de la comuna. |
| T0 | Definir la arquitectura general del sistema y el modelo ER. |
| T1 | Priorizar el backlog y ordenar las historias por valor. |
| T2 | Documentar la estructura del repositorio y los entregables de la primera entrega. |

### Incremento esperado
Al terminar Sprint 0, el equipo debe tener:
- Alcance de la primera versión validado.
- Backlog priorizado y estimado en `docs/requisitos/priorizacion-backlog.md`.
- Requisitos funcionales y no funcionales en `docs/requisitos/requisitos.md`.
- Modelo entidad-relación inicial y diagrama de flujo en `docs/diseno`.
- Definición preliminar de la API REST.
- Estructura de carpetas para frontend y backend.
- Plan para los documentos de infraestructura y burndown chart.

### Sprint Review 0
El equipo y el cliente revisan:
- Si la documentación cubre los requisitos académicos de la primera entrega.
- Si el alcance está claro y las historias HU1, HU2 y HU4 se pueden desarrollar.
- Si la arquitectura y el modelo ER son suficientes para avanzar.

### Resultado del sprint
**Sprint aprobado sin correcciones mayores** si:
- El alcance está documentado.
- El backlog está ordenado y estimado.
- El diseño técnico preliminar está definido.

### Tareas detalladas
- Completar `docs/requisitos/alcance-inicial.md` con funcionalidades incluidas y excluidas.
- Generar y revisar el acta de reunión en `docs/actas/acta-reunion-2026-06-07.md`.
- Definir claramente los criterios de aceptación para HU1, HU2 y HU4.
- Crear el modelo ER inicial y el diagrama de flujo en `docs/diseno`.
- Escribir la versión preliminar de la API REST con endpoints y métodos.
- Definir la estructura de carpetas en el repositorio y documentarla en `README.md`.
- Crear una plantilla de seguimiento tipo burndown en `docs/burndown.md`.

---

## 24. Sprint 1: Prototipo frontend y diseño técnico

### Objetivo del sprint
Entregar un prototipo visual funcional del frontend y completar la definición técnica del backend.

### Historias seleccionadas
| ID | Historia | Puntos |
| --- | ------------------------------------------------ | ------ |
| HU1 | Registrar un reclamo | 17 |
| HU4 | Visualizar reclamos registrados | 11 |
| HU2 | Consultar estado de reclamos | 4 |
| HU7 | Visualizar tareas asignadas | 10 |
| **Total** | | **42** |

### Incremento esperado
Al finalizar Sprint 1, se debe tener:
- Prototipo de interfaz de login y pantalla de reclamos.
- Pantalla de creación de reclamos con validaciones básicas.
- Diseño de pantalla de seguimiento de reclamos.
- Documento técnico de API REST con endpoints iniciales.
- Esquema de base de datos preliminar con tablas principales.
- Documento de infraestructura inicial.

### Sprint Review 1
El cliente revisa:
- Si el diseño UI cubre el flujo de ingreso y la gestión de reclamos.
- Si los endpoints propuestos cubren las necesidades del backlog.
- Si el esquema DB incluye entidades clave como `usuarios`, `reclamos`, `estados`, `historial` y `evidencias`.

### Resultado del sprint
**Sprint aprobado** si:
- El prototipo frontend puede usarse para pruebas de usuario.
- La API REST está claramente definida.
- El modelo de datos y la estructura técnica son coherentes.

### Tareas detalladas
- Mejorar `src/frontend/index.html`, `src/frontend/style.css` y `src/frontend/script.js` para el flujo de login.
- Añadir prototipos de pantalla de creación de reclamos y seguimiento.
- Elaborar documento de endpoints: `POST /login`, `POST /reclamos`, `GET /reclamos`, `GET /reclamos/{id}`.
- Definir el esquema DB inicial y documentarlo en `database/schema.sql` o `docs/diseno`.
- Escribir la justificación tecnológica y la propuesta de infraestructura.
- Revisar los requisitos de seguridad y validación de datos en frontend y backend.

---

## 25. Sprint 2: Backend e integración AJAX

### Objetivo del sprint
Implementar la API REST en PHP y conectar el frontend al backend mediante AJAX.

### Historias seleccionadas
| ID | Historia | Puntos |
| --- | -------------------------------------------------------------- | ------ |
| HU1 | Registrar un reclamo | 17 |
| HU4 | Visualizar reclamos registrados | 11 |
| HU5 | Asignar reclamos a equipos | 11 |
| HU6 | Aprobar o rechazar reclamos resueltos | 14 |
| **Total** | | **53** |

### Incremento esperado
Al terminar Sprint 2:
- API REST básica en PHP disponible.
- Conexión a MySQL funcionando.
- CRUD mínimo de reclamos desde el frontend.
- Autenticación básica con hashing de contraseñas.
- Integración AJAX entre frontend y backend.
- Archivo de esquema SQL disponible.

### Sprint Review 2
El cliente revisa:
- Si la creación y consulta de reclamos funcionan en el sistema.
- Si el login y el control de roles están implementados.
- Si los endpoints responden correctamente y los datos persisten.

### Resultado del sprint
**Sprint funcional** si:
- El flujo de reclamos se puede ejecutar en la aplicación.
- El frontend recibe datos reales del backend.
- La seguridad básica de login está presente.

### Tareas detalladas
- Crear `src/backend/` con controladores, modelos y servicios en PHP.
- Implementar autenticación con hashing de contraseñas.
- Desarrollar endpoints de `login`, `registro de reclamo`, `listar reclamos`, `ver estado` y `asignar reclamos`.
- Crear `database/schema.sql` con tablas y relaciones.
- Implementar llamadas AJAX en `src/frontend/script.js`.
- Mostrar mensajes de error y validación de campos.
- Documentar cómo levantar la base de datos y el backend.

---

## 26. Sprint 3: Pruebas, documentación e infraestructura

### Objetivo del sprint
Completar la documentación de la primera entrega, ejecutar pruebas y dejar el proyecto listo para presentación.

### Historias seleccionadas
| ID | Historia / Tarea | Prioridad |
| --- | --------------------------------------------------------- | --------- |
| D1 | Documentar infraestructura y dockerización | Alta |
| D2 | Crear acta de cierre y burndown chart | Alta |
| D3 | Ejecutar pruebas funcionales y corregir errores críticos | Alta |
| D4 | Ajustar la experiencia de usuario y el flujo principal | Media |

### Incremento esperado
Al acabar Sprint 3:
- Documentación de entrega completa.
- Guía de reconstrucción de infraestructura.
- Acta de cierre de la primera entrega.
- Burndown chart o registro de avance.
- Pruebas funcionales realizadas.
- Issues clave cerradas o actualizadas.

### Sprint Review 3
El cliente revisa:
- Si el proyecto puede levantarse siguiendo la documentación.
- Si la entrega incluye acta de cierre y burndown chart.
- Si las pruebas principales demuestran el funcionamiento del sistema.

### Resultado del sprint
**Sprint aprobado** si:
- La entrega documental está completa.
- La infraestructura está descrita y reproducible.
- El flujo principal de reclamos funciona.

### Tareas detalladas
- Crear `docker-compose.yml` y/o documentar el entorno local.
- Documentar `Dockerfile`, scripts e infraestructura en `docs/analisis` o `docs/diseno`.
- Redactar acta de cierre en `docs/actas`.
- Generar `docs/burndown.md` con seguimiento del sprint.
- Realizar pruebas de login, creación de reclamos y seguimiento.
- Cerrar issues relacionadas con la primera entrega.
- Ajustar backlog y dejar claros los pendientes.

---

## Observaciones generales
- El foco de la primera entrega debe ser la documentación sólida y la definición técnica.
- Las historias de mayor valor son HU1, HU2, HU4, HU5 y HU6.
- El backend PHP y el esquema SQL son los elementos más urgentes pendientes.
- Las issues abiertas deben vincularse a cada sprint para medir avance.
- Si no se completa todo el backend, deje al menos la API y el esquema definidos en documentación.

## Resumen de sprints
| Sprint | Objetivo | Entregables clave |
| --- | --- | --- |
| Sprint 0 | Definición y análisis | Alcance, backlog, requisitos, modelo ER, API preliminar |
| Sprint 1 | Prototipo UI y diseño | Prototipo frontend, API definida, esquema DB inicial |
| Sprint 2 | Backend e integración | API PHP, MySQL, AJAX, CRUD de reclamos |
| Sprint 3 | Documentación y cierre | Acta de cierre, burndown, infraestructura, pruebas |

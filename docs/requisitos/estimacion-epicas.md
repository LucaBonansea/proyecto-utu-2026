# Estimación por Épicas

## Descripción

Estimar el esfuerzo requerido para cada épica del proyecto.

## Objetivo

Mejorar la planificación y distribución del trabajo del equipo.

## Criterios de Estimación

La estimación se realizó utilizando Story Points, considerando la complejidad técnica, el esfuerzo de desarrollo, la cantidad de funcionalidades incluidas y los riesgos asociados.

| Story Points | Nivel de Esfuerzo | Descripción |
|-------------|-------------------|-------------|
| 1 - 5 | Bajo | Épica simple, con poca complejidad técnica. |
| 6 - 10 | Medio | Épica moderada, requiere varias tareas pero con bajo riesgo. |
| 11 - 15 | Alto | Épica compleja, con varias funcionalidades o integraciones. |
| 16 o más | Muy Alto | Épica muy compleja, crítica o con alto riesgo técnico. |

## Tabla de Estimación por Épicas

| ID | Épica | Descripción | Story Points | Nivel de Esfuerzo | Prioridad | Responsable | Observaciones |
|----|-------|-------------|--------------|-------------------|-----------|-------------|---------------|
| EP1 | Gestión de Ciudadanos y Autenticación | Registro de usuarios, inicio de sesión, validación de identidad mediante API externa y control de accesos. | 14 | Alto | Alta | A definir | Promedio de votación del equipo. |
| EP2 | Gestión de Reclamos Ciudadanos | Creación de reclamos, carga de evidencias multimedia, geolocalización y seguimiento de estados. | 16 | Muy Alto | Alta | A definir | Funcionalidad principal del sistema. |
| EP3 | Gestión Administrativa de la Comuna | Dashboard administrativo, tablero Kanban, visualización, asignación y gestión de reclamos. | 18 | Muy Alto | Alta | A definir | Alta complejidad de interfaz y lógica de negocio. |
| EP4 | Gestión de Equipos y Proveedores | Gestión de tareas asignadas, inicio y finalización de trabajos, observaciones y evidencias. | 11 | Alto | Media | A definir | Flujo operativo de los equipos de trabajo. |
| EP5 | Notificaciones y Seguimiento | Notificaciones automáticas y seguimiento del avance de los reclamos. | 6 | Medio | Media | A definir | Dependencia de eventos generados por otras épicas. |
| EP6 | Reportes Estadísticos | Generación de métricas, reportes de gestión, tiempos de resolución y desempeño. | 10 | Medio | Media | A definir | Requiere consultas complejas y análisis de datos. |
| EP7 | Auditoría, Seguridad y Protección de Datos | Historial de actividad, trazabilidad, validaciones y protección de información sensible. | 14 | Alto | Alta | A definir | Fundamental para garantizar seguridad y transparencia. |
| EP8 | Infraestructura, Backend y API | Configuración de Laravel y MySQL, migraciones, modelo de datos, API REST, autenticación y almacenamiento multimedia. | 18 | Muy Alto | Alta | A definir | Base técnica de todo el proyecto; involucra arquitectura, persistencia de datos e integración de todos los módulos. |
| EP9 | Testing y Documentación Técnica | Pruebas funcionales, pruebas de seguridad, documentación de requisitos, API, testing y aspectos técnicos. | 13 | Alto | Media | A definir | Requiere validar el funcionamiento completo del sistema y documentar cada componente para la entrega final. |

## Resumen de Estimación

| Nivel de Esfuerzo | Cantidad de Épicas |
|-------------------|--------------------|
| Bajo | 0 |
| Medio | 2 |
| Alto | 4 |
| Muy Alto | 3 |

## Conclusión

La estimación realizada permite identificar que las épicas más complejas son aquellas relacionadas con la gestión de reclamos, la administración de la comuna y la construcción de la infraestructura técnica del sistema. Estas áreas concentran la mayor cantidad de funcionalidades críticas y representan el mayor esfuerzo de desarrollo.

Las épicas de testing, documentación, seguridad y reportes presentan una complejidad moderada a alta debido a su impacto transversal sobre todo el proyecto y su importancia para la calidad final del producto.
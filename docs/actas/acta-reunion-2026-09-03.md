# Acta de Reunión — Ingeniería de Software

**Proyecto 3ro BT — 2026**

**Fecha:** 03/09/2026
**Hora de inicio:** 14:00
**Hora de finalización:** 19:00
**Lugar / Contexto:** Polo Tecnológico de San José de Mayo (IAE)

---

## Asistentes

* Thiago Carbajal
* Luca Bonansea
* Ariana Blanco
* Nicolas Perez
* Emanuel Trapolini

**Participantes e Invitados:**
* Martín Ponzetti (Coordinador del Área de Innovación y Tecnología — Intendencia de San José)
* Diego Verra (Profesor Referente)
* Hernán Mérida (Profesor Referente de Matemática)

---

## Objetivo de la Reunión

Resolver la problemática de duplicidad de propuesta identificada durante la visita previa al HUB frente al bot "Clara", analizando las alternativas de integración del documento técnico y acordando la reorientación definitiva del proyecto para la Intendencia de San José.

---

## Temas Tratados

1. **Análisis de superposición con el chatbot "Clara":**
   Se debatió la pérdida de valor de innovación de la propuesta inicial frente a "Clara" (bot de WhatsApp para reclamos urbanos generales) y se presentaron las alternativas de integración preparadas en el documento de propuesta.

2. **Resolución y Pivote del Proyecto (Público Objetivo y Alcance):**
   Tras evaluar las opciones presentadas con Martín Ponzetti y los docentes referentes, se resolvió redirigir el alcance del sistema (*Portal Ciudadano*). El proyecto pasará a centrarse exclusivamente en la **Gestión de Reclamos en Edificios Públicos de la Intendencia de San José**.

3. **Redefinición de Roles, Funcionalidades y Reglas de Negocio:**
   Se revisaron y aprobaron los cambios estructurales registrados en el Control de Cambios:
   * **Usuario de Edificio (ex "Ciudadano"):** Usuarios habilitados por el Administrador que pertenecen a un edificio público específico. Clasificarán reclamos (Iluminación, Infraestructura, etc.) dentro del inmueble asignado.
   * **Eliminación de Geolocalización:** Deja de ser necesaria ya que cada edificio público está previamente registrado y georreferenciado en el sistema.
   * **Eliminación del Usuario de Área:** Se elimina esta figura intermedia, simplificando la cadena de asignación.
   * **Rol del Administrador:** Podrá gestionar proveedores, edificios públicos y usuarios pertenecientes a cada edificio (alta, asignación y reseteo de contraseñas), además de supervisar la totalidad de reclamos.
   * **Nuevo Flujo de Proveedores:** El proveedor enviará la solución/evidencia de su trabajo directamente al denunciante del edificio.

4. **Actualización de Documentación Técnica:**
   Se comenzó la reestructuración del modelado de datos (MER), Diagrama UML y Control de Cambios para reflejar la nueva arquitectura y reglas de negocio.

---

## Acuerdos

* Definir de manera oficial el nuevo enfoque del sistema hacia la **gestión interna de reclamos en edificios públicos** de la Intendencia.
* Formalizar el **Control de Cambios #2 (03/09/2026)** en la documentación del proyecto.
* Reestructurar el backlog, casos de uso, diagrama UML y MER eliminando el rol de Usuario de Área y la geolocalización, e incorporando las nuevas facultades del Administrador y del Usuario de Edificio.
* Ajustar las interfaces de Frontend y Backend según los nuevos flujos acordados.

---

## Revisión de Avances y Tareas Asignadas

| Integrante | Avances Realizados |
| :--- | :--- |
| **Thiago Carbajal** | • Redactó y formalizó el Control de Cambios #2 en la documentación.<br>• Actualizó la documentación general junto a Luca Bonansea.<br>• Inició el rediseño del Diagrama UML y el Modelo Entidad-Relación (MER) adaptados al modelo de edificios públicos.<br>• Participó en la sesión de resolución con Martín Ponzetti, Diego Verra y Hernán Mérida. |
| **Luca Bonansea** | • Actualizó la documentación técnica del proyecto junto a Thiago Carbajal.<br>• Participó colaborativamente en la definición de las nuevas reglas de negocio con el equipo y docentes. |
| **Ariana Blanco** | • Actualizó el Frontend en las secciones necesarias para adaptarse a la interfaz de Usuario de Edificio y Administrador.<br>• Participó colaborativamente en la reunión de redefinición funcional. |
| **Nicolas Perez** | • Trabajos de actualización del Frontend junto a Ariana Blanco para adecuar las vistas del sistema.<br>• Participó colaborativamente en la reunión de redefinición funcional. |
| **Emanuel Trapolini** | • Modificó y actualizó los criterios de ciberseguridad, contemplando la gestión segura de credenciales/usuarios por edificio y los accesos de proveedores.<br>• Participó en la sesión de revisión técnica. |

---

## Próximos Pasos

* Finalizar la actualización de los diagramas UML y MER reflejando las entidades *Edificio*, *Usuario de Edificio* y *Proveedor*.
* Adaptar las pantallas del Frontend (sustituir vistas ciudadanas por las vistas de Usuario de Edificio y panel de gestión de Administrador).
* Ajustar la lógica del Backend para el envío de soluciones desde el Proveedor hacia el Usuario de Edificio denunciante.
* Actualizar las historias de usuario y criterios de aceptación en el backlog.

---

## Observaciones

* La reunión permitió resolver de forma satisfactoria el conflicto de innovación con el bot "Clara", encontrando un nicho de necesidad real dentro de la Intendencia (mantenimiento y reclamos en edificios públicos).
* La presencia de Martín Ponzetti y de los profesores referentes Diego Verra y Hernán Mérida garantizó la validación tanto institucional como académica del nuevo alcance.

Sin más asuntos que tratar, se da por finalizada la sesión a las **19:00 horas** en el Polo Tecnológico de San José de Mayo (IAE).
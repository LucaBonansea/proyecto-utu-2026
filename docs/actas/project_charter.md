**Nombre del proyecto:** Portal Ciudadano
**Cliente / patrocinador (sponsor):** Andrea(Representante de la Intendencia)
**Director del proyecto / Scrum Master:** Luca Bonansea (Lider)
**Equipo:** Thiago Carbajal, Ariana Blanco, Nicolas Perez y Emanuel Trapolini
**Fecha de inicio:** 6/8/2026
**Duración estimada:**  3 meses aproximadamente

**Situación inicial del cliente:**
La Intendencia Departamental es el organismo responsable de la administración y gestión de los servicios públicos del departamento, teniendo entre sus principales cometidos el mantenimiento de la infraestructura urbana, el alumbrado público, los espacios verdes, la limpieza, el tránsito y otras tareas orientadas a mejorar la calidad de vida de la ciudadanía. Para cumplir con estas funciones, coordina el trabajo de diferentes áreas y equipos técnicos que intervienen diariamente en la atención de las necesidades de la población.

**Necesidad planteada por el cliente:**
> "Queremos contar con un sistema que nos permita mejorar la organización y el control de la información
> relacionada con los reclamos ciudadanos. Actualmente, la diversidad de canales de comunicación y la falta
> de una estructura formal para la gestión de las incidencias dificultan el seguimiento de cada caso, la coordinación entre las áreas involucradas y el acceso a información confiable sobre el estado de los reclamos. Por este motivo, necesitamos una herramienta que nos ayude a ordenar estos procesos y mejorar la gestión interna."

**Objetivo del proyecto:**
Desarrollar un sistema web para la gestión de reclamos ciudadanos que permita optimizar el registro, seguimiento y administración de las incidencias reportadas, mejorando la organización interna de la Intendencia y la comunicación con la ciudadanía.

**Justificación del proyecto:**
La implementación de este proyecto permitirá mejorar la gestión de los reclamos ciudadanos mediante un proceso más organizado, trazable y eficiente. Contar con una plataforma centralizada facilitará la coordinación entre las distintas áreas de la Intendencia, reducirá la dispersión de la información y permitirá realizar un seguimiento adecuado de cada incidencia desde su registro hasta su resolución.

En caso de no llevarse a cabo, la gestión de los reclamos continuará dependiendo de múltiples canales de comunicación y procesos manuales, lo que puede generar demoras, pérdida de información, dificultades pa

**Visión del producto:**
El producto consiste en un sistema de gestión de reclamos ciudadanos compuesto por una aplicación web para la ciudadanía, un panel administrativo para la Intendencia y una interfaz para los equipos o proveedores encargados de resolver las incidencias. La solución permitirá registrar, asignar, gestionar y dar seguimiento a los reclamos mediante una plataforma centralizada, con control de estados, evidencias multimedia, geolocalización e historial de actividades, facilitando una gestión más eficiente y transparente.

## Alcance incluido (Primera versión)

La primera versión del sistema incluirá las siguientes funcionalidades:

1. Registro de reclamos con descripción, categoría, prioridad, ubicación geográfica y evidencias fotográficas.
2. Inicio de sesión con diferentes roles de usuario: **Administrador**, **Funcionario**, **Proveedor** y **Moderador**.
3. Registro de ciudadanos mediante correo electrónico, con validación de identidad desde el backend.
4. Asignación de prioridad al reclamo en una escala definida.
5. Asignación automática del reclamo al área o proveedor responsable según su categoría.
6. Seguimiento del estado de cada reclamo por parte del ciudadano.
7. Visualización de reclamos públicos con distinto nivel de exposición según su estado.
8. Gestión interna de los reclamos mediante un dashboard para el personal de la comuna.
9. Organización de los reclamos mediante un tablero **Kanban**, utilizando los estados:
   - Ingreso
   - En proceso
   - Resuelto
   - Rechazado
10. Visualización de evidencias antes y después de la resolución del reclamo por parte del personal autorizado.
11. Notificaciones dentro de la aplicación ante cambios de estado del reclamo.
12. Moderación manual de contenido por parte de un funcionario con rol **Moderador**.
13. Registro de evidencias de resolución, incluyendo fotografías y observaciones, antes del cierre del reclamo.
14. Validación del cierre del reclamo por un funcionario autorizado.
15. Consulta de tareas asignadas por parte de equipos internos o proveedores.



## Alcance excluido (Etapas futuras)

Las siguientes funcionalidades no serán desarrolladas en la primera versión del sistema:

1. **Integración con TuID de Antel para autenticación de usuarios.**  
   **Justificación:** Requiere un convenio o acceso formal a la plataforma de identidad digital de Antel, credenciales de aplicación, entorno de pruebas oficial y cumplimiento de sus políticas de integración. Esto excede los tiempos y recursos del proyecto. En su lugar, se mantiene una validación de identidad definida para el sistema desde el backend.

2. **Asignación automática inicial de prioridad según el tipo de incidencia.**  
   **Justificación:** Aunque el sistema permitirá asignar prioridad al reclamo, la automatización de esa decisión requiere definir reglas más complejas, validar criterios con la Intendencia y contemplar excepciones. Para la primera versión se prioriza una gestión más controlada y simple.

3. **Registro de intentos fraudulentos cuando falla la validación de identidad.**  
   **Justificación:** Implica almacenar y gestionar eventos de seguridad adicionales, definir criterios de fraude y posibles acciones posteriores sobre el usuario. Se excluye para limitar el alcance inicial a la validación de identidad necesaria para habilitar el acceso.

4. **Registro completo del historial de cambios realizados sobre cada reclamo.**  
   **Justificación:** Conservar la trazabilidad completa implica registrar cada modificación, estado anterior, usuario responsable, fecha y detalle del cambio. Esto agrega complejidad al modelo de datos y al backend. En la primera versión se prioriza la gestión operativa del reclamo.

5. **Posibilidad de reabrir un reclamo cerrado conservando su historial.**  
   **Justificación:** La reapertura depende del historial completo del reclamo y de reglas adicionales para definir cuándo corresponde reabrirlo, quién puede hacerlo y cómo se refleja en el flujo de estados. Al excluirse la trazabilidad completa, esta funcionalidad también queda fuera de la primera versión.

6. **Registro del inicio de trabajo por parte de los equipos.**  
   **Justificación:** La versión inicial permitirá consultar tareas asignadas y registrar su finalización, pero no contemplará un evento separado de inicio. Esto simplifica el flujo de trabajo de equipos y proveedores, reduciendo estados intermedios y operaciones obligatorias.

7. **Generación de estadísticas e indicadores básicos o avanzados.**  
   **Justificación:** Aunque los indicadores pueden aportar valor a la Intendencia, requieren consultas, filtros, cálculos y vistas adicionales. Para esta primera versión se prioriza el flujo principal del reclamo por encima del módulo de reportes. Los indicadores podrán incorporarse en una etapa futura.

8. **Moderación automática de reclamos falsos o contenido inapropiado mediante inteligencia artificial.**  
   **Justificación:** Implica clasificación de texto e imágenes mediante técnicas de procesamiento de lenguaje natural (NLP) o visión por computadora, lo cual requiere tecnologías de IA/ML que no forman parte de las tecnologías permitidas para el proyecto ni de los contenidos vistos en el curso. Se prioriza la moderación manual.

9. **Detección automática de reclamos inválidos.**  
   **Justificación:** Requiere analizar evidencias, descripciones y posiblemente patrones previos para determinar si un reclamo es válido. Esta lógica automática excede el alcance técnico de la primera versión, por lo que la validación queda a cargo del personal autorizado.

10. **Clasificación automática de reclamos inválidos con baja prioridad, eliminación o respuesta automática.**  
    **Justificación:** Depende de la detección automática de reclamos inválidos y de reglas de decisión que podrían afectar reclamos legítimos si no están correctamente calibradas. Por ello se deja para una etapa futura.

11. **Detección automática de comportamientos fraudulentos de los usuarios.**  
    **Justificación:** Supone construir un modelo de análisis de patrones de comportamiento a partir de datos históricos, lo cual corresponde a analítica avanzada o ciencia de datos. Esto excede las tecnologías permitidas y el tiempo disponible para el proyecto.

12. **Advertencia, suspensión o bloqueo automático de usuarios con reclamos inválidos reiterados.**  
    **Justificación:** Esta funcionalidad depende de la detección confiable de reclamos inválidos y de comportamiento fraudulento. Además, requiere definir reglas administrativas y criterios de sanción. Por ese motivo queda fuera de la primera versión.

13. **Análisis automático de fotografías para validar la autenticidad de un reclamo.**  
    **Justificación:** Requiere técnicas de visión por computadora para comparar una imagen con el tipo de incidente reportado. En esta versión, esa revisión quedará a cargo del personal mediante la moderación manual.

14. **Visualización en tiempo real del recorrido del equipo responsable.**  
    **Justificación:** Necesita geolocalización continua del dispositivo del proveedor, actualización en tiempo real e infraestructura adicional, como WebSockets o mecanismos de actualización constante. Esto agrega complejidad y costo de desarrollo no viables para el plazo del proyecto.

**Plazo y metodología:**
Scrum, 6 sprints de 2 semanas (12 semanas totales), con revisión del incremento junto al cliente al final de cada sprint. Fecha aproximada de finalizacion: 29 de octubre

**Presupuesto / esfuerzo estimado:**
72 horas de esfuerzo aproximadas

**Criterios de éxito:**
El sistema permite gestionar todo el ciclo de vida de un reclamo ciudadano, desde su creación hasta su resolución final. Los ciudadanos pueden registrar sus reclamos incorporando información como categoría, descripción, evidencias fotográficas y ubicación geográfica. Luego, el sistema facilita la asignación automática al área o proveedor correspondiente y realiza el seguimiento de cada etapa del proceso.

Además, mantiene un historial completo y consultable de todos los cambios de estado, brindando trazabilidad y transparencia durante la gestión. La Intendencia valida la solución mediante la revisión del flujo completo, asegurando que el proceso funcione correctamente de principio a fin antes de aceptar la entrega final.
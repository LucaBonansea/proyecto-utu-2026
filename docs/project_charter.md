**Nombre del proyecto:** Sistema de Gestión de Reclamos en Edificios Públicos
**Cliente / patrocinador (sponsor):** Andrea(Representante de la Intendencia)
**Director del proyecto / Scrum Master:** Luca Bonansea (Lider)
**Equipo:** Thiago Carbajal, Ariana Blanco, Nicolas Perez y Emanuel Trapolini
**Fecha de inicio:** 6/8/2026
**Duración estimada:**  3 meses aproximadamente

**Situación inicial del cliente:**
La Intendencia Departamental administra distintos edificios públicos y coordina al personal administrativo y a los proveedores responsables de su mantenimiento. La información sobre problemas de iluminación, infraestructura, mantenimiento y otras incidencias de esos edificios se recibe por distintos canales, lo que dificulta su organización y seguimiento.

**Necesidad planteada por el cliente:**
Contar con un sistema que centralice los reclamos relacionados con edificios públicos, permita identificar el edificio afectado y facilite la coordinación entre Usuarios de edificio, personal administrativo y proveedores. La herramienta debe ofrecer información confiable sobre el estado de cada reclamo desde su registro hasta su resolución.

**Objetivo del proyecto:**
Desarrollar un sistema web para la gestión de reclamos asociados a edificios públicos que permita optimizar el registro, seguimiento y administración de las incidencias reportadas, mejorando la organización interna de la Intendencia y la comunicación con los Usuarios de edificio.

**Justificación del proyecto:**
La implementación de este proyecto permitirá mejorar la gestión de los reclamos de edificios públicos mediante un proceso más organizado, trazable y eficiente. Contar con una plataforma centralizada facilitará la coordinación entre los Usuarios de edificio, el personal administrativo y los proveedores, reducirá la dispersión de la información y permitirá realizar un seguimiento adecuado de cada incidencia desde su registro hasta su resolución.

En caso de no llevarse a cabo, la gestión de los reclamos continuará dependiendo de múltiples canales de comunicación y procesos manuales, lo que puede generar demoras, pérdida de información, dificultades para el seguimiento de los reclamos y una menor eficiencia en la gestión interna.

**Visión del producto:**
El producto consiste en un sistema de gestión de reclamos de edificios públicos compuesto por una aplicación web para los Usuarios de edificio, un panel administrativo para la Intendencia y una interfaz para los Usuarios de proveedor encargados de resolver las incidencias. La solución permitirá registrar, asignar, gestionar y dar seguimiento a los reclamos mediante una plataforma centralizada, con asociación obligatoria a un edificio, control de estados y evidencias multimedia. La versión 1.0 no utilizará geolocalización, mapas ni coordenadas GPS.

## Alcance incluido (Primera versión)

La primera versión del sistema incluirá las siguientes funcionalidades:

1. Registro de reclamos con descripción, edificio obligatorio y evidencias fotográficas. El edificio deberá pertenecer al Usuario de edificio que crea el reclamo.
2. Inicio de sesión con diferentes roles de usuario: **Administrador**, **Administrativo**, **Usuario de proveedor** y **Usuario de edificio**.
3. Registro de Usuarios de edificio por parte del Administrador mediante número telefónico, cédula, nombre y contraseña. La asociación con uno o más edificios podrá realizarse posteriormente.
4. Asignación de prioridad al reclamo por parte del Administrativo cuando corresponda.
5. Asignación manual del reclamo por parte del Administrativo, seleccionando un proveedor de la lista correspondiente a la clasificación.
6. Seguimiento del estado de sus propios reclamos por parte del Usuario de edificio.
7. Gestión interna de los reclamos mediante listados, filtros y búsqueda para el personal administrativo.
8. Aplicación de la máquina de estados formal definida en `epicas_y_requerimientos.md`:
   - `INGRESADO`
   - `INVALIDO`
   - `MODERADO`
   - `ASIGNADO`
   - `PENDIENTE_APROBACION`
   - `COMPLETADO`
   - `RECHAZADO`
9. Visualización de evidencias antes y después de la resolución del reclamo por parte del personal autorizado.
10. Notificaciones dentro de la aplicación, almacenadas en MySQL y consultadas mediante la API REST. No se utilizará Web Push.
11. Moderación manual de contenido por parte de un funcionario con rol **Administrativo**.
12. Registro de evidencias de resolución, incluyendo fotografías y observaciones, antes del cierre del reclamo.
13. Aprobación o rechazo de la resolución por el Usuario de edificio. Cuando rechace una resolución, deberá indicar el motivo y el reclamo permanecerá asignado al mismo proveedor.
14. Consulta de tareas asignadas por parte de los Usuarios de proveedor.
15. Gestión de clasificaciones: módulo para que el Administrador pueda crear, editar y administrar las clasificaciones disponibles.
16. Administración de proveedores: módulo para que el Administrador registre, modifique y administre proveedores.



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

15. **Geolocalización, mapas y coordenadas GPS para ubicar reclamos.**
    **Justificación:** La ubicación de cada reclamo se determina mediante la relación obligatoria con un edificio público registrado. La versión 1.0 no contempla incidencias generales en la vía pública ni campos genéricos de ubicación.

**Plazo y metodología:**
Scrum, 6 sprints de 2 semanas (12 semanas totales), con revisión del incremento junto al cliente al final de cada sprint. Fecha aproximada de finalizacion: 29 de octubre

**Presupuesto / esfuerzo estimado:**
72 horas de esfuerzo aproximadas

**Criterios de éxito:**
El sistema permite gestionar todo el ciclo de vida de un reclamo asociado a un edificio público, desde su creación hasta su resolución final. Los Usuarios de edificio pueden registrar sus reclamos incorporando una descripción, evidencias fotográficas y uno de los edificios a los que están asociados. Luego, el sistema facilita la clasificación del reclamo por parte del Administrativo, la asignación manual mediante una lista de proveedores correspondientes a la clasificación y el seguimiento de cada etapa del proceso.

Además, la Intendencia valida la solución mediante la revisión del flujo completo, asegurando que el proceso funcione correctamente de principio a fin antes de aceptar la entrega final.

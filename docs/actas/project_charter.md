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

**Alcance incluido (primera versión):**
El proyecto incluirá las siguientes funcionalidades para la primera versión del sistema:

1. **Registro de reclamos con título, descripción, categoría, ubicación geográfica y evidencias fotográficas.**
   

2. **Inicio de sesión con diferentes roles de usuario (administrador, funcionario, proveedor y moderador).**
   

3. **Registro de ciudadanos mediante usuario y contraseña, validando formato y dígito verificador de la cédula uruguaya.**
   

4. **Asignación automática de un nivel de prioridad a cada reclamo según criterios definidos por la Intendencia.**
   

5. **Asignación automática del reclamo al área o proveedor responsable según su categoría.**
   

6. **Seguimiento del estado de cada reclamo por parte del ciudadano.**
   

7. **Gestión interna de los reclamos, visualizando la ubicación exacta únicamente al personal autorizado.**
   

8. **Notificaciones dentro de la aplicación ante cambios de estado y avisos importantes.**
   

9. **Moderación manual de los reclamos por parte de la Intendencia antes de hacer visible determinada información.**
   

10. **Registro de evidencias de resolución (fotografías y observaciones) antes del cierre del reclamo.**
    

11. **Validación del cierre del reclamo por un funcionario autorizado antes de notificar al ciudadano.**
    

12. **Posibilidad de reabrir un reclamo cuando el problema vuelva a presentarse, conservando su historial.**
    
13. **Registro del historial de cambios realizados sobre cada reclamo.**
   

14. **Generación de estadísticas e indicadores básicos: reclamos recibidos, resueltos, pendientes y tiempos promedio de resolución.**
    



**Alcance excluido (queda para etapas futuras):**
Las siguientes funcionalidades no serán desarrolladas en la primera versión del sistema:

* **Integración con TuID de Antel para autenticación de usuarios.**
  *Justificación:* requiere un convenio o acceso formal a la plataforma de identidad digital de Antel (credenciales de aplicación, entorno de pruebas oficial, cumplimiento de sus políticas de integración), algo que un equipo estudiantil no puede gestionar en los tiempos del proyecto. En su lugar se implementa la validación de formato y dígito verificador de cédula (punto 3 del alcance incluido).

* **Moderación automática de reclamos falsos o contenido inapropiado mediante inteligencia artificial.**
  *Justificación:* implica clasificación de texto e imágenes (NLP / visión por computadora), lo cual requiere lenguajes, librerías y frameworks de IA/ML que no forman parte de las tecnologías permitidas para el proyecto (Laravel/PHP + MySQL) ni de los contenidos vistos en el curso. Se prioriza la moderación manual (punto 9 del alcance incluido), que cumple el mismo objetivo sin esa complejidad técnica.

* **Detección automática de comportamientos fraudulentos de los usuarios.**
  *Justificación:* supone construir un modelo de análisis de patrones de comportamiento a partir de datos históricos (analítica de comportamiento / detección de anomalías), disciplina de ciencia de datos que excede tanto las tecnologías permitidas como el tiempo disponible (julio–octubre, equipo de 5 personas). Queda pendiente para una etapa futura con recursos y plazos mayores.

* **Análisis automático de fotografías para validar la autenticidad de un reclamo.**
  *Justificación:* requiere visión por computadora para comparar una imagen con el tipo de incidente reportado, lo cual conlleva lenguajes y modelos de IA que no están contemplados entre las tecnologías permitidas para el desarrollo de la aplicación. En esta versión, esa validación queda a cargo del personal durante la moderación manual.

* **Visualización en tiempo real del recorrido del equipo responsable (similar a apps de entrega).**
  *Justificación:* necesita geolocalización continua del dispositivo del proveedor, actualización en vivo (websockets o polling constante) e infraestructura adicional para sostenerlo, lo que agrega una complejidad y un costo de desarrollo que no son viables en el plazo del proyecto. La propia entrevista con el cliente la plantea como una mejora deseable, no como una necesidad de la primera versión.

* **Reportes avanzados con análisis estadísticos personalizados para la Intendencia.**
  *Justificación:* un módulo de indicadores configurables (filtros personalizados, cruces de datos a demanda) implica un desarrollo de reporting adicional al de las estadísticas básicas ya contempladas (punto 14 del alcance incluido), que sí cubren la necesidad principal planteada por el cliente dentro del tiempo disponible.

*Justificación general:* Dado el plazo del proyecto (julio–octubre) y el tamaño del equipo, se prioriza el flujo transaccional completo del reclamo (creación → asignación → resolución → cierre) sobre funcionalidades de automatización inteligente, visibilidad pública y analítica avanzada, que no son bloqueantes para que el sistema cumpla su objetivo principal y pueden incorporarse en una segunda etapa sin rediseñar la arquitectura base.

**Stakeholders principales:**

| Rol | Persona / referente | Responsabilidad |
|---|---|---|
| Sponsor | Superior de Andrea (dentro de la Intendencia) | Aprueba el proyecto, define prioridades y autoriza cambios importantes. |
| Usuario experto | Andrea (referente de la Intendencia) | Explica el proceso actual de gestión de reclamos, brinda los requerimientos y valida el funcionamiento del sistema. |
| Usuario operativo | Personal de la Intendencia (administradores) | Gestiona los reclamos desde el Dashboard Comuna: asigna, aprueba o rechaza trabajos, administra usuarios y permisos. |
| Usuario operativo | Proveedores / equipos de trabajo | Reciben los reclamos asignados, registran inicio y finalización de tareas con evidencias, y resuelven las incidencias. |
| Usuario operativo | Ciudadanos | Cargan reclamos en el sistema (descripción, categoría, evidencias, ubicación) y hacen seguimiento de su estado. |
| Equipo de desarrollo | Luca Bonansea (Líder/SM), Thiago Carbajal, Ariana Blanco, Nicolas Perez, Emanuel Trapolini | Releva los requerimientos y construye el producto (backend, frontend, documentación, testing). |

**Riesgos iniciales:**

| Riesgo | Impacto posible |
|---|---|
| Atraso respecto al cronograma (entrevista recién realizada en julio, entrega fines de octubre) | Entrega incompleta o con funcionalidades del alcance incluido sin terminar. |
| Dependencia de la API docente para validación de identidad (Apéndice 1) | Si no está disponible a tiempo o cambia su especificación, se bloquea el registro de ciudadanos (RF-01, RF-03, RF-04) y todo lo que depende de un ciudadano validado. |
| Disponibilidad limitada de Andrea para validar avances y resolver dudas | Decisiones de alcance o prioridad demoradas, reclamos ambiguos sin resolver, retrabajo si se avanza sobre supuestos incorrectos. |
| Alcance amplio (35 RF) para el tiempo y equipo disponibles | Riesgo de dispersar esfuerzo en funcionalidades secundarias y no llegar con el flujo principal (creación → asignación → resolución → cierre) sólido y probado. |
| Complejidad técnica de PWA, geolocalización y carga de evidencias multimedia | Curva de aprendizaje mayor a la esperada, atrasando sprints si el equipo no tiene experiencia previa con estas tecnologías. |
| Compatibilización del proyecto con otras materias/obligaciones académicas del equipo | Menor disponibilidad horaria real que la planificada por sprint, afectando la velocidad del equipo. |
| Concentración de tareas críticas en pocas personas (ej. backend) | Cuello de botella si esa persona se atrasa o falta; el resto del equipo queda bloqueado. |
| Ausencia o baja disponibilidad de algún integrante del equipo | Sobrecarga sobre el resto del grupo (equipo de 5) y riesgo de no cubrir todas las funcionalidades asignadas. |
| Flujo de Git con PRs obligatorios en equipo sin experiencia previa en trabajo colaborativo | Conflictos de merge, demoras en la integración de features, código sin revisar por falta de tiempo. |
| Falta de manual de identidad institucional (P6) | Retrabajo de diseño/UI si la Intendencia define una imagen institucional a mitad de proyecto. |

**Plazo y metodología:**
Scrum, 6 sprints de 2 semanas (12 semanas totales), con revisión del incremento junto al cliente al final de cada sprint. Fecha aproximada de finalizacion: 29 de octubre

**Presupuesto / esfuerzo estimado:**
72 horas de esfuerzo aproximadas

**Criterios de éxito:**
El sistema permite gestionar todo el ciclo de vida de un reclamo ciudadano, desde su creación hasta su resolución final. Los ciudadanos pueden registrar sus reclamos incorporando información como categoría, descripción, evidencias fotográficas y ubicación geográfica. Luego, el sistema facilita la asignación automática al área o proveedor correspondiente y realiza el seguimiento de cada etapa del proceso.

Además, mantiene un historial completo y consultable de todos los cambios de estado, brindando trazabilidad y transparencia durante la gestión. La Intendencia valida la solución mediante la revisión del flujo completo, asegurando que el proceso funcione correctamente de principio a fin antes de aceptar la entrega final.
# Preguntas para Entrevista: Sistema de Gestión de Reclamos Ciudadanos

**Contexto del proyecto:**
* **Interlocutor principal:** Usuario experto / Stakeholder
* **Usuarios destino:** Usuarios operativos y ciudadanía

---

## 1. Gobernanza, Toma de Decisiones y Marco Normativo
* ¿Usted es la persona encargada de tomar las decisiones finales sobre el proyecto?
* En caso contrario, ¿quién define y aprueba los aspectos relacionados con alcance, presupuesto y prioridades?
* ¿Quién será el responsable de validar y aprobar las entregas parciales y la versión final del sistema?
* ¿Qué áreas u organismos internos participan en la toma de decisiones respecto a la gestión de reclamos?
* ¿Quién validará que las funcionalidades implementadas cumplan con las necesidades operativas del negocio?
* ¿La organización cuenta con un manual de identidad visual o imagen institucional para definir la estética de la plataforma?
* ¿Existen normativas, leyes o políticas institucionales específicas que el sistema deba cumplir? *(Ej. Protección de Datos Personales, Ley de Transparencia, Estándares de Accesibilidad).*

---

## 2. Situación Actual y Diagnóstico del Proceso
* ¿Cómo se gestionan y canalizan actualmente los reclamos ciudadanos?
* ¿Cuáles son las principales dificultades, cuellos de botella o fallas detectadas en el proceso actual?
* ¿Cuáles son los tipos de reclamos o incidencias registrados con mayor frecuencia?
* ¿Qué datos e información se recopilan obligatoriamente al ingresar un nuevo reclamo?
* ¿Cuál es el flujo de trabajo (workflow) estándar desde que se recibe un caso hasta su resolución final?

---

## 3. Perfiles de Usuario Operativo y Permisos
* ¿Quiénes serán los usuarios operativos que interactuarán diariamente con la aplicación web?
* ¿Qué funciones y tareas específicas desempeñará cada rol dentro de la plataforma?
* ¿Todos los usuarios tendrán el mismo nivel de acceso o se requiere una estructura jerárquica de permisos/roles?
* ¿Qué información y vistas consolidadas necesita cada rol para realizar su trabajo eficientemente?
* ¿Qué acciones clave (crear, editar, derivar, reasignar) requiere ejecutar cada nivel de usuario?
* ¿Qué atributos y datos personales o institucionales se deben guardar en el perfil de cada usuario?

---

## 4. Experiencia y Portal de la Ciudadanía
### 4.1. Alta y Registro de Reclamos
* ¿Qué campos e información básica debe completar el ciudadano al registrar un reclamo?
* ¿Se requiere adjuntar evidencia multimedia (fotos, videos, documentos) o la ubicación del incidente?
* ¿Cómo registrará el usuario la ubicación del incidente: mediante mapa (geolocalización) o texto libre/dirección exacta?

### 4.2. Visibilidad y Privacidad
* ¿Los ciudadanos podrán visualizar reclamos ingresados por otras personas (mapa público o lista general) o únicamente los propios?
* Si los reclamos son visibles públicamente, ¿se requiere un flujo de moderación previa para filtrar contenido sensible o lenguaje inapropiado?
* ¿Qué datos y estados del reclamo estarán visibles para el ciudadano?

### 4.3. Seguimiento y Cierre
* ¿A través de qué canales se notificará a la ciudadanía sobre avances o cambios de estado (Email, SMS, App)?
* ¿Bajo qué condiciones específicas o criterios de aceptación se considera que un caso está cerrado?

---

## 5. Gestión Interna y Flujo de Trabajo
* ¿Qué dependencias, direcciones u oficinas de la intendencia/comuna intervendrán en el sistema?
* ¿Qué reglas o criterios se aplican para priorizar la atención de los reclamos?
* ¿Cuáles son los estados formales por los que debe pasar un reclamo (*Ej.: Ingresado, En Revisión, En Curso, Resuelto, Rechazado*)?
* ¿Qué información estratégica requiere el operador para tomar decisiones durante el seguimiento?
* ¿Cuáles son los formatos de visualización preferidos por el equipo (tableros Kanban, listados filtrables, mapas de calor)?
* ¿Se requiere una trazabilidad completa o auditoría de cambios (*log* de quién modificó qué y cuándo)?
* ¿Un caso finalizado o cerrado puede ser reabierto si el ciudadano reporta disconformidad o reincidencia?

---

## 6. Equipos de Campo, Proveedores y Verificación
* ¿La resolución de los casos se ejecuta con personal técnico propio, contratistas o proveedores externos?
* ¿Qué detalles de la orden de trabajo o tarea necesitan visualizar los equipos en terreno cuando se les asigna un caso?
* ¿Cuál es el procedimiento de verificación o control de calidad para validar que un trabajo fue resuelto adecuadamente antes del cierre?
* ¿Qué datos, firmas o evidencias (*fotos del antes/después, insumos utilizados*) deben registrar los equipos al finalizar la tarea?
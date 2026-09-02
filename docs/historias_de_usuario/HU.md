# Historias de Usuario
## Historias detalladas

**ID: HU1**
**Historia:** Como ciudadano, quiero registrarme mediante mi número telefónico, para poder acceder al sistema y reportar reclamos.
**Criterios de aceptación:**
- [ ] Puedo ingresar mi número telefónico para iniciar el registro.
- [ ] El Sistema te pide tu nombre como dato de tu cuenta.
- [ ] El sistema valida mi identidad desde el backend antes de habilitar el acceso.
- [ ] Si la validación falla, no se crea la cuenta y se me muestra un mensaje claro.
- [ ] Una vez validado, puedo iniciar sesión normalmente sin repetir la validación.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-01

---

**ID: HU2**
**Historia:** Como usuario registrado, quiero iniciar sesión, para acceder a las funciones según mi rol.
**Criterios de aceptación:**
- [ ] Puedo iniciar sesión con mis credenciales válidas.
- [ ] Si las credenciales son incorrectas, el sistema me muestra un error claro.
- [ ] Al iniciar sesión, accedo únicamente a las funciones habilitadas para mi rol.
- [ ] Mi sesión se mantiene activa hasta que cierro sesión.

**Puntos:** 3 **Prioridad:** Alta **Épica:** EP-01

---

**ID: HU3**
**Historia:** Como sistema, quiero manejar distintos roles de usuario (ciudadano, administrador, administrativo, usuario de área, proveedor) y restringir la información visible según cada rol, para controlar qué puede hacer y ver cada uno.
**Criterios de aceptación:**
- [ ] Cada usuario tiene asignado un único rol al momento de crearse.
- [ ] Las pantallas y acciones disponibles cambian según el rol del usuario autenticado.
- [ ] Un usuario no puede acceder a datos o funciones fuera de su rol, ni siquiera manipulando la URL directamente.
- [ ] Los intentos de acceso no autorizado son rechazados por el backend, no solo ocultados en el frontend.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-01

---

**ID: HU4**
**Historia:** Como ciudadano, quiero crear un reclamo con descripción, evidencias y ubicación automática, para reportar un problema de infraestructura urbana.
**Criterios de aceptación:**
- [ ] Puedo escribir una descripción del problema.
- [ ] Puedo adjuntar una foto como evidencia.
- [ ] El sistema detecta mi ubicación automáticamente sin que tenga que ingresarla a mano.
- [ ] No se me pide seleccionar una clasificación: el reclamo se guarda directamente para que lo clasifique el administrativo.
- [ ] El reclamo queda con estado inicial "Ingreso".

**Puntos:** 8 **Prioridad:** Media **Épica:** EP-02

---

**ID: HU5**
**Historia:** Como administrativo, quiero clasificar los reclamos ingresados, para asignarlos al área correspondiente.
**Criterios de aceptación:**
- [ ] Puedo ver el listado de reclamos con estado "Ingreso".
- [ ] Puedo seleccionar una clasificación de las disponibles en el sistema.
- [ ] Un reclamo no puede avanzar de estado sin haber sido clasificado.
- [ ] El sistema registra qué clasificación se le asignó a cada reclamo.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-02

---

**ID: HU6**
**Historia:** Como administrativo, quiero asignar una prioridad a un reclamo, para que se atienda con mayor urgencia cuando corresponda.
**Criterios de aceptación:**
- [ ] Puedo marcar *Urgente* al revisar un reclamo clasificado.
- [ ] La prioridad asignada es visible para el personal de la comuna.
- [ ] Un reclamo sin prioridad asignada se trata con prioridad estándar por defecto.

**Puntos:** 3 **Prioridad:** Baja **Épica:** EP-02

---

**ID: HU7**
**Historia:** Como ciudadano, quiero consultar el estado y avance de mis reclamos, para saber en qué etapa se encuentran.
**Criterios de aceptación:**
- [ ] Puedo ver un listado con todos los reclamos que yo creé.
- [ ] Cada reclamo muestra su estado actual (Ingreso, Validado, En proceso, Completado).
- [ ] Solo puedo ver mis propios reclamos en esta sección, no los de otros ciudadanos.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-03

---

**ID: HU8**
**Historia:** Como ciudadano, quiero recibir notificaciones dentro de la app cuando cambia el estado de reclamo hacia *Rechazado* o *Completado*, para mantenerme informado.
**Criterios de aceptación:**
- [ ] Puedo ver un listado de mis notificaciones ordenadas por fecha.
- [ ] La notificación indica claramente a qué reclamo corresponde y cuál es el nuevo estado.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-03

---

**ID: HU9**
**Historia:** Como ciudadano, quiero visualizar reclamos públicos de otros vecinos, con distinto nivel de exposición según su estado, para conocer los problemas reportados en mi zona.
**Criterios de aceptación:**
- [ ] Puedo ver un listado de reclamos de otros ciudadanos, no solo los míos.
- [ ] La información visible de cada reclamo varía según su estado (por ejemplo, menos detalle si está recién ingresado).
- [ ] No se muestran datos personales del ciudadano que hizo el reclamo.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-03

---

**ID: HU10**
**Historia:** Como personal de la comuna, quiero visualizar todos los reclamos registrados, con un filtro por área, para gestionar únicamente los que me corresponden.
**Criterios de aceptación:**
- [ ] Puedo ver el listado completo de reclamos si tengo permisos para ello.
- [ ] Puedo aplicar un filtro para ver solo los reclamos de mi área.
- [ ] El listado muestra estado, prioridad y clasificación de cada reclamo.
- [ ] Puedo ordenar o buscar reclamos dentro del listado.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-04

---

**ID: HU11** *(Cancelado)*
**Historia:** Como personal de la comuna, quiero organizar los reclamos en un tablero Kanban (Ingreso, En proceso, Resuelto, Rechazado), para tener una visión clara del flujo de trabajo.
**Criterios de aceptación:**
- [ ] El tablero muestra columnas correspondientes a cada estado del reclamo.
- [ ] Cada reclamo aparece como una tarjeta dentro de la columna de su estado actual.
- [ ] Puedo hacer click en una tarjeta para ver el detalle del reclamo.
- [ ] El tablero se actualiza reflejando cambios de estado recientes.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-04

---

**ID: HU12**
**Historia:** Como personal de la comuna, quiero visualizar las evidencias de la resolución de un reclamo, para verificar que el trabajo se haya realizado correctamente.
**Criterios de aceptación:**
- [ ] Puedo ver las fotos originales adjuntadas por el ciudadano al crear el reclamo.
- [ ] Puedo ver las fotos de evidencia cargadas por el equipo o proveedor al finalizar el trabajo.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-04

---

**ID: HU13**
**Historia:** Como comuna, quiero asignar reclamos ya clasificados a equipos internos o proveedores, para que se encarguen de resolverlos.
**Criterios de aceptación:**
- [ ] Puedo ver el listado de reclamos clasificados y sin asignar.
- [ ] Puedo elegir un equipo interno o un proveedor para asignar el reclamo.
- [ ] El reclamo cambia su estado a "Asignado" tras la asignación.
- [ ] Solo puedo asignar reclamos que ya fueron clasificados por el administrativo.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-05

---

**ID: HU14**
**Historia:** Como sistema, quiero derivar automáticamente el reclamo al área o proveedor correspondiente según la clasificación realizada, para agilizar la asignación sin intervención manual adicional.
**Criterios de aceptación:**
- [ ] La derivación es manual que respeta la relación entre clasificación y área definida en el sistema.
- [ ] Si no existe una relación definida para una clasificación, el sistema lo indica en vez de fallar silenciosamente.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-05

---

**ID: HU15**
**Historia:** Como equipo o proveedor, quiero consultar únicamente las tareas que tengo asignadas, para organizar mi trabajo diario.
**Criterios de aceptación:**
- [ ] Puedo ver un listado de los reclamos asignados a mi equipo/proveedor.
- [ ] No puedo ver reclamos asignados a otros equipos o proveedores.
- [ ] Cada tarea muestra descripción, ubicación, evidencias y prioridad del reclamo.

**Puntos:** 3 **Prioridad:** Media **Épica:** EP-06

---

**ID: HU16**
**Historia:** Como equipo o proveedor, quiero registrar la finalización de una tarea con materiales, observaciones, evidencias, fecha y hora, para documentar el trabajo realizado.
**Criterios de aceptación:**
- [ ] Puedo marcar una tarea como finalizada solo desde una tarea que tengo asignada.
- [ ] Debo adjuntar al menos una evidencia fotográfica del trabajo realizado.
- [ ] El sistema registra automáticamente fecha y hora de finalización.
- [ ] El reclamo pasa a estado "En Proceso" tras la finalización.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-06

---

**ID: HU17**
**Historia:** Como equipo o proveedor, quiero volver a trabajar sobre una tarea rechazada con prioridad, para corregir lo que no fue aprobado por la comuna.
**Criterios de aceptación:**
- [ ] El reclamo vuelve a pasar a "Ingresado" tras la corrección.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-06

---

**ID: HU18**
**Historia:** Como sistema, quiero almacenar y permitir consultar archivos multimedia asociados a cada reclamo, para mantener un respaldo visual de todo el proceso.
**Criterios de aceptación:**
- [ ] Los archivos multimedia se guardan asociados al reclamo correspondiente.
- [ ] Los archivos son accesibles únicamente por usuarios con permiso sobre ese reclamo.
- [ ] El sistema soporta al menos formatos de imagen comunes (jpg, png).

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-07

---

**ID: HU19**
**Historia:** Como equipo o proveedor, quiero registrar evidencia obligatoria del trabajo realizado, para poder marcar un reclamo como resuelto.
**Criterios de aceptación:**
- [ ] No puedo finalizar una tarea sin adjuntar al menos una evidencia fotográfica.
- [ ] El sistema bloquea el envío del formulario de finalización si falta evidencia.
- [ ] La evidencia queda asociada al reclamo como parte del registro de resolución.

**Puntos:** 3 **Prioridad:** Media  **Épica:** EP-07 / EP-08

---

**ID: HU20**
**Historia:** Como comuna, quiero aprobar o rechazar el trabajo realizado antes del cierre definitivo de un reclamo, para garantizar que la resolución sea satisfactoria.
**Criterios de aceptación:**
- [ ] Puedo ver los reclamos pendientes.
- [ ] Puedo revisar la evidencia y observaciones cargadas por el equipo/proveedor.
- [ ] Puedo aprobar el trabajo, cerrando el reclamo como "Completado".
- [ ] Puedo rechazar el trabajo indicando un motivo, devolviendo el reclamo al equipo/proveedor.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-08

---

**ID: HU21**
**Historia:** Como administrativo, quiero moderar manualmente el contenido ingresado por los ciudadanos antes de clasificar y derivar el reclamo, para filtrar contenido inapropiado o inválido.
**Criterios de aceptación:**
- [ ] Puedo revisar la descripción y evidencias de un reclamo antes de clasificarlo.
- [ ] Puedo marcar un reclamo como inválido o inapropiado si corresponde.
- [ ] Un reclamo marcado como inválido no avanza en el flujo normal de clasificación.
- [ ] La moderación queda registrada junto con el reclamo.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-09

---

**ID: HU22**
**Historia:** Como administrativo, quiero registrar, modificar y administrar los proveedores del sistema, para mantener actualizado el catálogo de quienes resuelven reclamos.
**Criterios de aceptación:**
- [ ] Puedo dar de alta un nuevo proveedor con sus datos básicos.
- [ ] Puedo dar de baja o desactivar un proveedor.
- [ ] Los proveedores desactivados no aparecen como opción al asignar nuevos reclamos.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-09

---

**ID: HU23**
**Historia:** Como administrador, quiero crear, editar y administrar las clasificaciones disponibles en el sistema, para mantener actualizadas las categorías de reclamos.
**Criterios de aceptación:**
- [ ] Puedo crear una nueva clasificación con nombre, área asociada y descripción breve.
- [ ] Puedo editar una clasificación existente.
- [ ] Las clasificaciones activas son las únicas disponibles al clasificar un nuevo reclamo.

**Puntos:** 3 **Prioridad:** Media **Épica:** EP-09

## Listado completo de historias

| ID | Historia de usuario | Puntos | Prioridad | Épica |
|---|---|---|---|---|
| HU1 | Como ciudadano, quiero registrarme mediante mi número telefónico, para poder acceder al sistema y reportar reclamos. | 8 | Alta | EP-01 |
| HU2 | Como usuario registrado, quiero iniciar sesión, para acceder a las funciones según mi rol. | 3 | Alta | EP-01 |
| HU3 | Como sistema, quiero manejar distintos roles de usuario y restringir la información visible según cada rol, para controlar qué puede hacer y ver cada uno. | 5 | Alta | EP-01 |
| HU4 | Como ciudadano, quiero crear un reclamo con descripción, evidencias y ubicación automática, para reportar un problema de infraestructura urbana. | 8 | Media | EP-02 |
| HU5 | Como administrativo, quiero clasificar los reclamos ingresados, para asignarlos al área correspondiente. | 5 | Media | EP-02 |
| HU6 | Como administrativo, quiero asignar una prioridad a un reclamo, para que se atienda con mayor urgencia cuando corresponda. | 3 | Baja | EP-02 |
| HU7 | Como ciudadano, quiero consultar el estado y avance de mis reclamos, para saber en qué etapa se encuentran. | 5 | Media | EP-03 |
| HU8a | Como ciudadano, quiero recibir notificaciones dentro de la app cuando cambia el estado de mi reclamo, para mantenerme informado sin tener que consultar manualmente. | 5 | Baja | EP-03 |
| HU8b | Como ciudadano, quiero visualizar reclamos públicos de otros vecinos, con distinto nivel de exposición según su estado, para conocer los problemas reportados en mi zona. | 5 | Media | EP-03 |
| HU10 | Como personal de la comuna, quiero visualizar todos los reclamos registrados, con un filtro por área, para gestionar únicamente los que me corresponden. | 5 | Baja | EP-04 |
| HU11 | Como personal de la comuna, quiero organizar los reclamos en un tablero Kanban, para tener una visión clara del flujo de trabajo. | 8 | Alta | EP-04 |
| HU12 | Como personal de la comuna, quiero visualizar las evidencias antes y después de la resolución de un reclamo, para verificar que el trabajo se haya realizado correctamente. | 5 | Media | EP-04 |
| HU9 | Como comuna, quiero asignar reclamos ya clasificados a equipos internos o proveedores, para que se encarguen de resolverlos. | 8 | Alta | EP-05 |
| HU13 | Como sistema, quiero derivar automáticamente el reclamo al área o proveedor correspondiente según la clasificación realizada, para agilizar la asignación. | 5 | Alta | EP-05 |
| HU14 | Como equipo o proveedor, quiero consultar únicamente las tareas que tengo asignadas, para organizar mi trabajo diario. | 3 | Media | EP-06 |
| HU15 | Como equipo o proveedor, quiero registrar la finalización de una tarea con materiales, observaciones, evidencias, fecha y hora, para documentar el trabajo realizado. | 8 | Alta | EP-06 |
| HU16 | Como equipo o proveedor, quiero volver a trabajar sobre una tarea rechazada con prioridad, para corregir lo que no fue aprobado por la comuna. | 5 | Baja | EP-06 |
| HU17 | Como sistema, quiero almacenar y permitir consultar archivos multimedia asociados a cada reclamo, para mantener un respaldo visual de todo el proceso. | 5 | Alta | EP-07 |
| HU18 | Como equipo o proveedor, quiero registrar evidencia obligatoria del trabajo realizado, para poder marcar un reclamo como resuelto. | 3 | Media | EP-07 / EP-08 |
| HU19 | Como comuna, quiero aprobar o rechazar el trabajo realizado antes del cierre definitivo de un reclamo, para garantizar que la resolución sea satisfactoria. | 5 | Alta | EP-08 |
| HU20 | Como administrativo, quiero moderar manualmente el contenido ingresado por los ciudadanos antes de clasificar y derivar el reclamo, para filtrar contenido inapropiado o inválido. | 5 | Media | EP-09 |
| HU21 | Como administrativo, quiero registrar, modificar y administrar los proveedores del sistema, para mantener actualizado el catálogo de quienes resuelven reclamos. | 5 | Media | EP-09 |
| HU22 | Como administrador o administrativo, quiero crear, editar y administrar las clasificaciones disponibles en el sistema, para mantener actualizadas las categorías de reclamos. | 3 | Media | EP-09 |

## Product Backlog inicial

### Backlog priorizado

| Orden | ID | Historia | Puntos | Sprint estimado |
|---|---|---|---|---|
| 1 | HU1 | Registro de ciudadano mediante teléfono | 8 | Sprint 1 |
| 2 | HU2 | Inicio de sesión | 3 | Sprint 1 |
| 3 | HU3 | Roles de usuario y restricción de información | 5 | Sprint 1 |
| 4 | HU4 | Creación de reclamo (descripción, evidencias, ubicación) | 8 | Sprint 2 |
| 5 | HU23 | Gestión de clasificaciones | 3 | Sprint 2 |
| 6 | HU5 | Clasificación de reclamos | 5 | Sprint 2 |
| 7 | HU6 | Asignación de prioridad | 3 | Sprint 2 |
| 8 | HU7 | Consulta de reclamos propios | 5 | Sprint 3 |
| 9 | HU8 | Notificaciones de cambio de estado | 5 | Sprint 3 |
| 10 | HU9 | Visualización de reclamos públicos | 5 | Sprint 3 |
| 11 | HU21 | Moderación manual de contenido | 5 | Sprint 3 |
| 12 | HU10 | Visualización de todos los reclamos (con filtro por área) | 5 | Sprint 4 |
| 13 | HU12 | Visualización de evidencias antes/después | 5 | Sprint 4 |
| 14 | HU15 | Consulta de tareas asignadas | 3 | Sprint 4 |
| 15 | HU22 | Gestión de proveedores | 5 | Sprint 5 |
| 16 | HU13 | Asignación de reclamos a equipos/proveedores | 8 | Sprint 5 |
| 17 | HU14 | Derivación automática | 5 | Sprint 5 |
| 18 | HU19 | Evidencia obligatoria de cierre | 3 | Sprint 5 |
| 19 | HU16 | Registro de finalización de tarea | 8 | Sprint 6 |
| 20 | HU20 | Aprobación/rechazo de cierre de reclamo | 5 | Sprint 6 |
| 21 | HU18 | Almacenamiento de archivos multimedia | 5 | Sprint 6 |
| 22 | HU17 | Reproceso de tareas rechazadas | 5 | Sprint 6 |

## Planificación de sprints

### Sprint 1: Acceso al sistema y gestión de roles

**Objetivo del sprint**
Construir la base inicial del sistema: registro y autenticación segura de ciudadanos, y manejo de roles para todo el resto del proyecto.

**Historias seleccionadas**

| ID | Historia | Puntos |
|---|---|---|
| HU1 | Registro de ciudadano mediante teléfono | 8 |
| HU2 | Inicio de sesión | 3 |
| HU3 | Roles de usuario y restricción de información | 5 |
| **Total** | | **16** |

**Incremento esperado**
Al finalizar el sprint, el cliente podrá:
- Registrarse como ciudadano validando su identidad contra el servicio simulado.
- Iniciar sesión con su cuenta.
- Ver que el acceso a pantallas y funciones cambia según el rol (ciudadano, administrativo, etc.).



**Resultado del sprint**


---

### Sprint 2: Creación y clasificación de reclamos

**Objetivo del sprint**
Permitir que el ciudadano cree reclamos y que el administrativo los clasifique y priorice.

**Historias seleccionadas**

| ID | Historia | Puntos |
|---|---|---|
| HU4 | Creación de reclamo (descripción, evidencias, ubicación) | 8 |
| HU23 | Gestión de clasificaciones | 3 |
| HU5 | Clasificación de reclamos | 5 |
| HU6 | Asignación de prioridad | 3 |
| **Total** | | **19** |

**Incremento esperado**
Al finalizar el sprint, el cliente podrá:
- Crear un reclamo con descripción, foto y ubicación automática.
- Ver el reclamo ingresar con estado "Ingresado".
- Clasificar reclamos en categorías administradas por el sistema.
- Marcar un reclamo como urgente.

**Sprint Review 2**
El cliente revisa el incremento y responde:


**Resultado del sprint**


---

### Sprint 3: Seguimiento ciudadano y moderación

**Objetivo del sprint**
Permitir que el ciudadano haga seguimiento de sus reclamos y vea los de otros vecinos, y que el administrativo modere contenido antes de clasificar.

**Historias seleccionadas**

| ID | Historia | Puntos |
|---|---|---|
| HU7 | Consulta de reclamos propios | 5 |
| HU8 | Notificaciones de cambio de estado | 5 |
| HU9 | Visualización de reclamos públicos | 5 |
| HU21 | Moderación manual de contenido | 5 |
| **Total** | | **20** |

**Incremento esperado**
Al finalizar el sprint, el cliente podrá:
- Ver el listado y detalle de sus propios reclamos con su estado actual.
- Recibir notificaciones dentro de la app ante cambios de estado.
- Ver reclamos de otros ciudadanos con nivel de detalle según su estado.
- Revisar y moderar el contenido de un reclamo antes de que avance.

**Sprint Review 3**
El cliente revisa el incremento y responde:


**Resultado del sprint**


---

### Sprint 4: Gestión interna de reclamos por parte de la comuna

**Objetivo del sprint**
Dar al personal de la comuna una vista completa de los reclamos, con evidencias y filtros por área.

**Historias seleccionadas**

| ID | Historia | Puntos |
|---|---|---|
| HU10 | Visualización de todos los reclamos (con filtro por área) | 5 |
| HU12 | Visualización de evidencias antes/después | 5 |
| HU15 | Consulta de tareas asignadas | 3 |
| **Total** | | **13** |

**Incremento esperado**
Al finalizar el sprint, el cliente podrá:
- Ver el listado completo de reclamos, filtrado por área.
- Comparar evidencias antes y después de la resolución.
- Ver, desde el rol de equipo/proveedor, únicamente las tareas asignadas.

**Sprint Review 4**
El cliente revisa el incremento y responde:


**Resultado del sprint**


---

### Sprint 5: Asignación, derivación y gestión de proveedores

**Objetivo del sprint**
Permitir que la comuna asigne y derive reclamos a equipos o proveedores, y administre el catálogo de proveedores.

**Historias seleccionadas**

| ID | Historia | Puntos |
|---|---|---|
| HU22 | Gestión de proveedores | 5 |
| HU13 | Asignación de reclamos a equipos/proveedores | 8 |
| HU14 | Derivación automática | 5 |
| HU19 | Evidencia obligatoria de cierre | 3 |
| **Total** | | **21** |

**Incremento esperado**
Al finalizar el sprint, el cliente podrá:
- Dar de alta, editar y desactivar proveedores.
- Asignar reclamos clasificados a un equipo interno o proveedor.
- Ver la derivación automática sugerida según la clasificación.
- Verificar que un equipo no pueda cerrar una tarea sin evidencia.

**Sprint Review 5**
El cliente revisa el incremento y responde:


**Resultado del sprint**


---

### Sprint 6: Cierre del ciclo de resolución

**Objetivo del sprint**
Cerrar el flujo completo del reclamo: finalización de tareas, aprobación/rechazo, reproceso y almacenamiento de evidencias.

**Historias seleccionadas**

| ID | Historia | Puntos |
|---|---|---|
| HU16 | Registro de finalización de tarea | 8 |
| HU20 | Aprobación/rechazo de cierre de reclamo | 5 |
| HU18 | Almacenamiento de archivos multimedia | 5 |
| HU17 | Reproceso de tareas rechazadas | 5 |
| **Total** | | **23** |

**Incremento esperado**
Al finalizar el sprint, el cliente podrá:
- Registrar la finalización de una tarea con materiales, observaciones y evidencias.
- Aprobar o rechazar el trabajo realizado, cerrando o devolviendo el reclamo.
- Ver que las tareas rechazadas quedan priorizadas para su equipo/proveedor.
- Confirmar que todo archivo multimedia queda correctamente asociado y accesible según permisos.
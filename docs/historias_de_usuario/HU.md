# Historias de Usuario

## Historias detalladas

**ID: HU1**

**Historia:** Como Administrador, quiero registrar usuarios de edificio mediante sus datos personales y credenciales, para darles acceso al sistema.

**Criterios de aceptación:**

* [ ] Puedo registrar un usuario de edificio ingresando nombre, cédula, número telefónico y contraseña.
* [ ] El sistema valida que el número telefónico tenga 9 dígitos y comience con 09 antes de completar el registro.
* [ ] Si los datos ingresados no cumplen con las validaciones requeridas, la cuenta no se crea y el sistema muestra un mensaje de error claro.
* [ ] El usuario registrado queda habilitado para acceder al sistema con el rol Usuario de edificio.

**Puntos:** 8
**Prioridad:** Alta
**Épica:** EP-01

---

**ID: HU2**

**Historia:** Como usuario registrado, quiero iniciar sesión con mis credenciales, para acceder a las funciones habilitadas según mi rol.

**Criterios de aceptación:**

* [ ] Puedo iniciar sesión con credenciales válidas.
* [ ] Si las credenciales son incorrectas, el sistema muestra un mensaje de error claro.
* [ ] Al iniciar sesión, accedo únicamente a las funciones habilitadas para mi rol.
* [ ] El sistema identifica correctamente el rol asociado al usuario autenticado.

**Puntos:** 8
**Prioridad:** Alta
**Épica:** EP-01

---

**ID: HU3**

**Historia:** Como sistema, quiero manejar distintos roles de usuario y restringir las funcionalidades e información visible según cada rol, para controlar qué puede hacer y ver cada usuario.

**Criterios de aceptación:**

* [ ] El sistema contempla los roles Usuario de edificio, Administrador, Administrativo y Usuario de proveedor.
* [ ] Cada usuario tiene asignado un rol.
* [ ] Las pantallas, funcionalidades y acciones disponibles cambian según el rol del usuario autenticado.
* [ ] Un usuario no puede acceder a información o funcionalidades fuera de los permisos correspondientes a su rol.
* [ ] Los intentos de acceso no autorizado son rechazados por el backend, aunque se intente acceder directamente mediante una URL o una solicitud a la API.

**Puntos:** 13
**Prioridad:** Alta
**Épica:** EP-01

---

**ID: HU4**

**Historia:** Como Usuario de edificio, quiero crear un reclamo indicando una descripción, evidencia fotográfica y una clasificación, para reportar un problema relacionado con mi edificio.

**Criterios de aceptación:**

* [ ] Puedo ingresar una descripción del problema.
* [ ] Puedo adjuntar una fotografía como evidencia.
* [ ] El sistema muestra las clasificaciones disponibles para que pueda seleccionar la correspondiente al tipo de problema.
* [ ] El reclamo queda asociado al edificio correspondiente al usuario que lo realiza.
* [ ] El reclamo queda registrado con su estado inicial correspondiente.

**Puntos:** 8
**Prioridad:** Alta
**Épica:** EP-03

---

**ID: HU5**

**Historia:** Como Administrativo, quiero moderar y clasificar los reclamos ingresados, para validar o modificar su clasificación antes de continuar con su gestión.

**Criterios de aceptación:**

* [ ] Puedo visualizar los reclamos registrados que requieren moderación.
* [ ] Puedo revisar la clasificación seleccionada inicialmente por el Usuario de edificio.
* [ ] Puedo validar la clasificación existente o modificarla por otra disponible en el sistema.
* [ ] El sistema registra la clasificación definitiva asignada al reclamo.
* [ ] El reclamo debe estar correctamente clasificado antes de ser asignado a un proveedor.

**Puntos:** 5
**Prioridad:** Baja
**Épica:** EP-04

---

**ID: HU6**

**Historia:** Como Administrativo, quiero asignar prioridad a un reclamo, para identificar aquellos casos que requieren una atención más urgente.

**Criterios de aceptación:**

* [ ] Puedo asignar una prioridad al revisar un reclamo.
* [ ] Puedo identificar un reclamo como urgente cuando corresponda.
* [ ] La prioridad asignada queda registrada en el reclamo.
* [ ] Los reclamos sin una prioridad especial asignada mantienen la prioridad estándar definida por el sistema.

**Puntos:** 3
**Prioridad:** Media
**Épica:** EP-04

---

**ID: HU7**

**Historia:** Como Usuario de edificio, quiero consultar el estado y avance de mis reclamos, para saber en qué etapa se encuentran.

**Criterios de aceptación:**

* [ ] Puedo visualizar un listado de todos los reclamos que realicé.
* [ ] Cada reclamo muestra su estado actual.
* [ ] Puedo consultar la información necesaria para conocer el avance de cada reclamo.
* [ ] Solo puedo acceder a mis propios reclamos desde esta sección.

**Puntos:** 5
**Prioridad:** Alta
**Épica:** EP-03

---

**ID: HU8**

**Historia:** Como Usuario de edificio, quiero recibir notificaciones dentro de la aplicación cuando se produzcan actualizaciones relevantes sobre mis reclamos, para mantenerme informado sobre su avance y resolución.

**Criterios de aceptación:**

* [ ] Puedo visualizar las notificaciones relacionadas con mis reclamos dentro de la aplicación.
* [ ] Cada notificación identifica claramente el reclamo al que corresponde.
* [ ] La notificación informa el cambio o actualización relevante producida sobre el reclamo.
* [ ] Recibo una notificación cuando se registra la finalización del trabajo asociado a uno de mis reclamos.

**Puntos:** 5
**Prioridad:** Media
**Épica:** EP-08

---

**ID: HU9**

**Historia:** Como Usuario de edificio, quiero visualizar las evidencias asociadas a mis reclamos, para consultar tanto la evidencia inicial como la registrada durante su resolución.

**Criterios de aceptación:**

* [ ] Puedo visualizar la evidencia fotográfica que adjunté al crear un reclamo.
* [ ] Puedo visualizar las evidencias registradas posteriormente durante la resolución del reclamo.
* [ ] Las evidencias se muestran asociadas al reclamo correspondiente.
* [ ] Solo puedo consultar las evidencias de los reclamos a los que tengo acceso.

**Puntos:** 5
**Prioridad:** Baja
**Épica:** EP-08

---

**ID: HU10**
**Historia:** Como administrativo, quiero visualizar todos los reclamos registrados, con un filtro por categoria.
**Criterios de aceptación:**
- [ ] Puedo ver el listado completo de reclamos.
- [ ] Puedo aplicar un filtro para ver solo los reclamos de una categoria en especifico.
- [ ] El listado muestra estado, prioridad, categoria, edificio de cada reclamo.
- [ ] Puedo buscar reclamos dentro del listado.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-04

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
**Historia:** Como personal de la comuna, quiero visualizar las evidencias antes y después de la resolución de un reclamo, para verificar que el trabajo se haya realizado correctamente.

**Criterios de aceptación:**
- [ ] Puedo ver las fotos originales adjuntadas por el ciudadano al crear el reclamo.
- [ ] Puedo ver las fotos de evidencia cargadas por el equipo o proveedor al finalizar el trabajo.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-04

---

**ID: HU13**
**Historia:** Como Administrativo, quiero asignar reclamos ya clasificados a proveedores, para que se encarguen de resolverlos.
**Criterios de aceptación:**
- [ ] Puedo ver el listado de reclamos clasificados y sin asignar.
- [ ] Puedo elegir proveedor para asignar el reclamo.
- [ ] El reclamo cambia su estado a "Asignado" tras la asignación.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-05

---

**ID: HU14**
**Historia:** Como sistema, quiero derivar automáticamente el reclamo al proveedor correspondiente según la clasificación realizada, para agilizar la asignación sin intervención manual adicional.
**Criterios de aceptación:**
- [ ] Al clasificar un reclamo, el sistema sugiere o deriva automáticamente el área/proveedor correspondiente.
- [ ] La derivación automática respeta la relación entre clasificación y área definida en el sistema.
- [ ] El personal de la comuna puede ver qué área fue derivada automáticamente antes de confirmar la asignación.
- [ ] Si no existe una relación definida para una clasificación, el sistema lo indica en vez de fallar silenciosamente.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-05

---

**ID: HU15**
**Historia:** Como proveedor, quiero consultar únicamente las tareas que tengo asignadas, para organizar mi trabajo diario.
**Criterios de aceptación:**
- [ ] Puedo ver un listado de los reclamos asignados a mi proveedor.
- [ ] No puedo ver reclamos asignados a otros proveedores.
- [ ] Cada tarea muestra descripción, evidencia fotografica, prioridad y del reclamo.
- [ ] Puedo entrar al detalle de una tarea puntual.

**Puntos:** 3 **Prioridad:** Alta **Épica:** EP-06

---

**ID: HU16**

**Historia:** Como usuario de proveedor, quiero registrar la finalización de una tarea con materiales utilizados, observaciones, evidencias, fecha y hora, para documentar el trabajo realizado sobre un reclamo asignado al proveedor al que pertenezco.

**Criterios de aceptación:**

* [ ] Puedo registrar la finalización únicamente de tareas asignadas al proveedor al que pertenezco.
* [ ] Debo completar los materiales utilizados y las observaciones antes de finalizar la tarea.
* [ ] Debo adjuntar al menos una evidencia fotográfica del trabajo realizado.
* [ ] La solución y las evidencias quedan asociadas al reclamo correspondiente.
* [ ] El reclamo pasa al estado "Pendiente de aprobación" tras registrar la finalización.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-06

---

**ID: HU17**

**Historia:** Como usuario de proveedor, quiero volver a trabajar sobre una tarea cuya resolución fue rechazada, para corregir las observaciones indicadas y registrar nuevamente el trabajo realizado.

**Criterios de aceptación:**

* [ ] Las tareas rechazadas aparecen identificadas en el listado de tareas del proveedor.
* [ ] Puedo visualizar el motivo del rechazo indicado por el personal responsable de la Intendencia.
* [ ] Puedo registrar nuevamente observaciones y evidencia fotografica sobre la misma tarea.
* [ ] El reclamo vuelve al estado "Pendiente de aprobación" después de registrar la corrección.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-06

---

**ID: HU18**

**Historia:** Como sistema, quiero almacenar y permitir consultar los archivos multimedia asociados a cada reclamo, para mantener un respaldo visual de las evidencias registradas durante todo el proceso.

**Criterios de aceptación:**

* [ ] Los archivos multimedia quedan asociados al reclamo correspondiente.
* [ ] Los archivos son accesibles únicamente para los usuarios que tengan permisos sobre el reclamo.
* [ ] El Usuario de edificio que realizó el reclamo puede visualizar las evidencias de resolución cuando estén disponibles.
* [ ] El sistema soporta al menos formatos de imagen comunes, como JPG y PNG.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-07

---

**ID: HU19**

**Historia:** Como usuario de proveedor, quiero registrar evidencia obligatoria del trabajo realizado, para dejar constancia de la solución aplicada al reclamo.

**Criterios de aceptación:**

* [ ] No puedo registrar la finalización de una tarea sin adjuntar al menos una evidencia fotográfica.
* [ ] El sistema bloquea el registro de la finalización si no se adjunta la evidencia requerida.
* [ ] La evidencia queda asociada al reclamo correspondiente.
* [ ] La evidencia queda identificada como evidencia de resolución.
* [ ] La evidencia puede ser consultada posteriormente por los usuarios autorizados.

**Puntos:** 3 **Prioridad:** Alta **Épica:** EP-07 / EP-08

---

**ID: HU20**

**Historia:** Como administrativo, quiero aprobar o rechazar el trabajo realizado por un usuario de proveedor antes del cierre definitivo de un reclamo, para verificar que la resolución sea satisfactoria.

**Criterios de aceptación:**

* [ ] Puedo visualizar los reclamos que se encuentran en estado "Pendiente de aprobación".
* [ ] Puedo revisar las observaciones y evidencia fotografica registrados por el usuario de proveedor.
* [ ] Puedo aprobar el trabajo realizado y cerrar el reclamo como "Completado".
* [ ] Puedo rechazar el trabajo indicando obligatoriamente un motivo.
* [ ] Si el trabajo es rechazado, el reclamo vuelve a quedar disponible para el proveedor correspondiente.
* [ ] Una vez aprobado el trabajo, la solución y sus evidencias quedan disponibles para el Usuario de edificio que realizó el reclamo.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-08

---

**ID: HU21**

**Historia:** Como administrativo, quiero moderar el contenido ingresado por los usuarios de edificio, para identificar reclamos inválidos o inapropiados antes de continuar con su gestión y asignación.

**Criterios de aceptación:**

* [ ] Puedo revisar la descripción y las evidencias de un reclamo.
* [ ] Puedo verificar el edificio desde el cual fue realizado el reclamo.
* [ ] Puedo marcar un reclamo como inválido o inapropiado cuando corresponda.
* [ ] Un reclamo marcado como inválido no continúa con el flujo de asignación a proveedores.
* [ ] La decisión de moderación queda registrada junto con el reclamo.
* [ ] Los reclamos válidos pueden continuar con su revisión, clasificación y posterior asignación.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-09

---

**ID: HU22**

**Historia:** Como administrador, quiero registrar, modificar y administrar los proveedores del sistema, para mantener actualizada la información de las empresas u organizaciones encargadas de resolver los reclamos.

**Criterios de aceptación:**

* [ ] Puedo registrar un nuevo proveedor indicando su RUT.
* [ ] Puedo registrar su nombre y teléfono con el edificio.
* [ ] Puedo editar la información de un proveedor existente.
* [ ] Los proveedores desactivados no aparecen disponibles al asignar nuevos reclamos.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-09

---

**ID: HU23**

**Historia:** Como administrador, quiero crear, editar y administrar las clasificaciones disponibles en el sistema, para mantener actualizados los tipos de problemas que pueden seleccionarse al registrar un reclamo.

**Criterios de aceptación:**

* [ ] Puedo crear una nueva clasificación indicando su nombre.
* [ ] Puedo editar una clasificación existente.
* [ ] Puedo desactivar una clasificación sin eliminar el historial de los reclamos que ya la utilizaron.
* [ ] Las clasificaciones activas son las únicas disponibles al crear o revisar un reclamo.
* [ ] Entre las clasificaciones pueden existir categorías como iluminación, infraestructura, mantenimiento u otras definidas por el Administrativo.

**Puntos:** 3 **Prioridad:** Media **Épica:** EP-09

---


## Listado completo de historias

| ID | Historia de usuario | Puntos | Prioridad | Épica |
|---|---|---|---|---|
| HU1 | Como ciudadano, quiero registrarme mediante mi número telefónico, para poder acceder al sistema y reportar reclamos. | 8 | Alta | EP-01 |
| HU2 | Como usuario registrado, quiero iniciar sesión, para acceder a las funciones según mi rol. | 3 | Alta | EP-01 |
| HU3 | Como sistema, quiero manejar distintos roles de usuario y restringir la información visible según cada rol, para controlar qué puede hacer y ver cada uno. | 5 | Alta | EP-01 |
| HU4 | Como ciudadano, quiero crear un reclamo con descripción, evidencias y ubicación automática, para reportar un problema de infraestructura urbana. | 8 | Alta | EP-02 |
| HU5 | Como administrativo, quiero clasificar los reclamos ingresados, para asignarlos al área correspondiente. | 5 | Alta | EP-02 |
| HU6 | Como administrativo, quiero asignar una prioridad a un reclamo, para que se atienda con mayor urgencia cuando corresponda. | 3 | Media | EP-02 |
| HU7 | Como ciudadano, quiero consultar el estado y avance de mis reclamos, para saber en qué etapa se encuentran. | 5 | Alta | EP-03 |
| HU8 | Como ciudadano, quiero recibir notificaciones dentro de la app cuando cambia el estado de mi reclamo, para mantenerme informado sin tener que consultar manualmente. | 5 | Media | EP-03 |
| HU9 | Como ciudadano, quiero visualizar reclamos públicos de otros vecinos, con distinto nivel de exposición según su estado, para conocer los problemas reportados en mi zona. | 5 | Baja | EP-03 |
| HU10 | Como personal de la comuna, quiero visualizar todos los reclamos registrados, con un filtro por área, para gestionar únicamente los que me corresponden. | 5 | Alta | EP-04 |
| HU11 | Como personal de la comuna, quiero organizar los reclamos en un tablero Kanban, para tener una visión clara del flujo de trabajo. | 8 | Alta | EP-04 |
| HU12 | Como personal de la comuna, quiero visualizar las evidencias antes y después de la resolución de un reclamo, para verificar que el trabajo se haya realizado correctamente. | 5 | Baja | EP-04 |
| HU13 | Como comuna, quiero asignar reclamos ya clasificados a equipos internos o proveedores, para que se encarguen de resolverlos. | 8 | Alta | EP-05 |
| HU14 | Como sistema, quiero derivar automáticamente el reclamo al área o proveedor correspondiente según la clasificación realizada, para agilizar la asignación. | 5 | Media | EP-05 |
| HU15 | Como equipo o proveedor, quiero consultar únicamente las tareas que tengo asignadas, para organizar mi trabajo diario. | 3 | Alta | EP-06 |
| HU16 | Como equipo o proveedor, quiero registrar la finalización de una tarea con materiales, observaciones, evidencias, fecha y hora, para documentar el trabajo realizado. | 8 | Alta | EP-06 |
| HU17 | Como equipo o proveedor, quiero volver a trabajar sobre una tarea rechazada con prioridad, para corregir lo que no fue aprobado por la comuna. | 5 | Media | EP-06 |
| HU18 | Como sistema, quiero almacenar y permitir consultar archivos multimedia asociados a cada reclamo, para mantener un respaldo visual de todo el proceso. | 5 | Alta | EP-07 |
| HU19 | Como equipo o proveedor, quiero registrar evidencia obligatoria del trabajo realizado, para poder marcar un reclamo como resuelto. | 3 | Alta | EP-07 / EP-08 |
| HU20 | Como comuna, quiero aprobar o rechazar el trabajo realizado antes del cierre definitivo de un reclamo, para garantizar que la resolución sea satisfactoria. | 5 | Alta | EP-08 |
| HU21 | Como administrativo, quiero moderar manualmente el contenido ingresado por los ciudadanos antes de clasificar y derivar el reclamo, para filtrar contenido inapropiado o inválido. | 5 | Media | EP-09 |
| HU22 | Como administrativo, quiero registrar, modificar y administrar los proveedores del sistema, para mantener actualizado el catálogo de quienes resuelven reclamos. | 5 | Baja | EP-09 |
| HU23 | Como administrador o administrativo, quiero crear, editar y administrar las clasificaciones disponibles en el sistema, para mantener actualizadas las categorías de reclamos. | 3 | Media | EP-09 |

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

**Sprint Review 1**
El cliente revisa el incremento y responde:


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
- Ver el reclamo ingresar con estado "Ingreso".
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

**Sprint Review 6**


**Resultado del sprint**
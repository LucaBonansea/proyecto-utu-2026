# Historias de Usuario

**ID: HU1**
 
**Historia:** Como Administrador, quiero registrar usuarios de edificio mediante sus datos personales y credenciales, para darles acceso al sistema.
 
**Criterios de aceptación:**
 
* [ ] Puedo registrar un usuario de edificio ingresando nombre, cédula, número telefónico y contraseña.
* [ ] El sistema valida que el número telefónico tenga 9 dígitos y comience con 09 antes de completar el registro.
* [ ] El usuario registrado queda habilitado para acceder al sistema con el rol Usuario de edificio.
**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-01
 
---
 
**ID: HU2**
 
**Historia:** Como usuario registrado, quiero iniciar sesión con mis credenciales, para acceder a las funciones habilitadas según mi rol.
 
**Criterios de aceptación:**
 
* [ ] Puedo iniciar sesión con credenciales válidas.
* [ ] Al iniciar sesión, accedo únicamente a las funciones habilitadas para mi rol.
**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-01
 
---
 
**ID: HU3**
 
**Historia:** Como sistema, quiero manejar distintos roles de usuario y restringir las funcionalidades e información visible según cada rol, para controlar qué puede hacer y ver cada usuario.
 
**Criterios de aceptación:**
 
* [ ] El sistema contempla los roles Usuario de edificio, Administrador, Administrativo y Usuario de proveedor.
* [ ] Las pantallas, funcionalidades y acciones disponibles cambian según el rol del usuario autenticado.

**Puntos:** 13 **Prioridad:** Alta **Épica:** EP-01
 
---
 
**ID: HU4**
 
**Historia:** Como Usuario de edificio, quiero crear un reclamo indicando una descripción, evidencia fotográfica y una clasificación, para reportar un problema relacionado con mi edificio.
 
**Criterios de aceptación:**
 
* [ ] Puedo ingresar una descripción del problema.
* [ ] Puedo adjuntar una fotografía como evidencia.
* [ ] El sistema muestra las clasificaciones disponibles para que pueda seleccionar la correspondiente al tipo de problema.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-03
 
---
 
**ID: HU5**
 
**Historia:** Como Administrativo, quiero moderar y clasificar los reclamos ingresados, para validar o modificar su clasificación antes de continuar con su gestión.
 
**Criterios de aceptación:**
 
* [ ] Puedo visualizar los reclamos registrados que requieren moderación.
* [ ] Puedo revisar la clasificación seleccionada inicialmente por el Usuario de edificio.
* [ ] Puedo validar la clasificación existente o modificarla por otra disponible en el sistema.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-04
 
---
 
**ID: HU6**
 
**Historia:** Como Administrativo, quiero asignar prioridad a un reclamo, para identificar aquellos casos que requieren una atención más urgente.
 
**Criterios de aceptación:**
 
* [ ] Puedo asignar una prioridad al revisar un reclamo.
* [ ] Puedo identificar un reclamo como urgente cuando corresponda.

**Puntos:** 3 **Prioridad:** Baja **Épica:** EP-04
 
---
 
**ID: HU7**
 
**Historia:** Como Usuario de edificio, quiero consultar el estado y avance de mis reclamos, para saber en qué etapa se encuentran.
 
**Criterios de aceptación:**
 
* [ ] Puedo visualizar un listado de todos los reclamos que realicé.
* [ ] Puedo consultar la información necesaria para conocer el avance de cada reclamo.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-03
 
---
 
**ID: HU8**
 
**Historia:** Como Usuario de edificio, quiero recibir notificaciones dentro de la aplicación cuando se produzcan actualizaciones relevantes sobre mis reclamos, para mantenerme informado sobre su avance y resolución.
 
**Criterios de aceptación:**
 
* [ ] La notificación informa el cambio o actualización relevante producida sobre el reclamo.
* [ ] Recibo una notificación cuando se registra la finalización del trabajo asociado a uno de mis reclamos.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-08
 
---
 
**ID: HU9**
 
**Historia:** Como Usuario de edificio, quiero visualizar las evidencias asociadas a mis reclamos, para consultar tanto la evidencia inicial como la registrada durante su resolución.
 
**Criterios de aceptación:**
 
* [ ] Puedo visualizar la evidencia fotográfica que adjunté al crear un reclamo.
* [ ] Solo puedo consultar las evidencias de los reclamos a los que tengo acceso.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-08
 
---
 
**ID: HU10**
 
**Historia:** Como Administrativo, quiero visualizar todos los reclamos registrados, con un filtro por categoría, para facilitar su búsqueda y gestión.
 
**Criterios de aceptación:**
 
* [ ] Puedo ver el listado completo de reclamos.
* [ ] Puedo aplicar un filtro para ver solo los reclamos de una categoría en específico.
* [ ] El listado muestra estado, prioridad, categoría y edificio de cada reclamo.
* [ ] Puedo buscar reclamos dentro del listado.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-04
 
---
 
**ID: HU11** *(Cancelado)*
 
**Historia:** Como personal de la comuna, quiero organizar los reclamos en un tablero Kanban (Ingreso, En proceso, Resuelto, Rechazado), para tener una visión clara del flujo de trabajo.
 
**Criterios de aceptación:**
 
* [ ] El tablero muestra columnas correspondientes a cada estado del reclamo.
* [ ] Cada reclamo aparece como una tarjeta dentro de la columna de su estado actual.
* [ ] Puedo hacer click en una tarjeta para ver el detalle del reclamo.
* [ ] El tablero se actualiza reflejando cambios de estado recientes.
**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-04
 
---
 
**ID: HU12**
 
**Historia:** Como Usuario del Edificio, quiero visualizar las evidencias antes y después de la resolución de un reclamo, para verificar que el trabajo se haya realizado correctamente.
 
**Criterios de aceptación:**
 
* [ ] Puedo ver las fotos originales adjuntadas al crear el reclamo.
* [ ] Puedo ver las fotos de evidencia cargadas por el proveedor al finalizar el trabajo.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-03
 
---
 
**ID: HU13**
 
**Historia:** Como Administrativo, quiero asignar reclamos ya clasificados a proveedores, para que se encarguen de resolverlos.
 
**Criterios de aceptación:**
 
* [ ] Puedo ver el listado de reclamos clasificados y sin asignar.
* [ ] Puedo elegir proveedor para asignar el reclamo.

**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-05
 
---
 
**ID: HU14**
 
**Historia:** Como sistema, quiero sugerir automáticamente el proveedor correspondiente según la clasificación realizada, para agilizar la asignación que hace el Administrativo.
 
**Criterios de aceptación:**

* [ ] La sugerencia respeta la relación entre clasificación y proveedor definida en el sistema.
* [ ] Si no existe una relación definida para una clasificación, el sistema lo indica en vez de fallar silenciosamente.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-05
 
---
 
**ID: HU15**
 
**Historia:** Como Usuario de proveedor, quiero consultar únicamente las tareas que tengo asignadas, para organizar mi trabajo diario.
 
**Criterios de aceptación:**
 
* [ ] No puedo ver reclamos asignados a otros proveedores.
* [ ] Cada tarea muestra descripción, evidencia fotográfica y prioridad del reclamo.

**Puntos:** 3 **Prioridad:** Alta **Épica:** EP-07
 
---
 
**ID: HU16**
 
**Historia:** Como Usuario de proveedor, quiero registrar la finalización de una tarea con observaciones, evidencia fotografica, fecha y hora, para documentar el trabajo realizado sobre un reclamo asignado al proveedor al que pertenezco.
 
**Criterios de aceptación:**
 
* [ ] Debo completar los materiales utilizados y las observaciones antes de finalizar la tarea.
* [ ] Debo adjuntar al menos una evidencia fotográfica del trabajo realizado.
* [ ] La solución y las evidencias quedan asociadas al reclamo correspondiente.


**Puntos:** 8 **Prioridad:** Alta **Épica:** EP-07
 
---
 
**ID: HU17**
 
**Historia:** Como Usuario de proveedor, quiero volver a trabajar sobre una tarea cuya resolución fue rechazada, para corregir las observaciones indicadas y registrar nuevamente el trabajo realizado.
 
**Criterios de aceptación:**
 
* [ ] Las tareas rechazadas aparecen identificadas en el listado de tareas del proveedor.
* [ ] Puedo visualizar el motivo del rechazo indicado por el Administrativo.
* [ ] Puedo registrar nuevamente observaciones y evidencia fotográfica sobre la misma tarea.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-07
 
---
 
**ID: HU18**
 
**Historia:** Como sistema, quiero almacenar y permitir consultar los archivos multimedia asociados a cada reclamo, para mantener un respaldo visual de las evidencias registradas durante todo el proceso.
 
**Criterios de aceptación:**
 
* [ ] Los archivos multimedia quedan asociados al reclamo correspondiente.
* [ ] Los archivos son accesibles únicamente para los usuarios que tengan permisos sobre el reclamo.
* [ ] El Usuario de edificio que realizó el reclamo puede visualizar las evidencias de resolución cuando estén disponibles.

**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-08
 
---
 
**ID: HU19**
 
**Historia:** Como Proveedor, quiero registrar evidencia obligatoria del trabajo realizado, para dejar constancia de la solución aplicada al reclamo.
 
**Criterios de aceptación:**
 
* [ ] No puedo registrar la finalización de una tarea sin adjuntar al menos una evidencia fotográfica.
* [ ] El sistema bloquea el registro de la finalización si no se adjunta la evidencia requerida.
* [ ] La evidencia queda asociada al reclamo correspondiente.

**Puntos:** 3 **Prioridad:** Alta **Épica:** EP-08
 
---
 
**ID: HU20**
 
**Historia:** Como Usuario de Edificio, quiero aprobar o rechazar el trabajo realizado por un Usuario de proveedor antes del cierre definitivo de un reclamo, para verificar que la resolución sea satisfactoria.
 
**Criterios de aceptación:**
 
* [ ] Puedo revisar las observaciones y evidencia fotográfica registradas por el Usuario de proveedor.
* [ ] Puedo aprobar el trabajo realizado y cerrar el reclamo como "Completado".
* [ ] Puedo rechazar el trabajo indicando obligatoriamente un motivo.
* [ ] Si el trabajo es rechazado, el reclamo vuelve a quedar disponible para el proveedor correspondiente.


**Puntos:** 5 **Prioridad:** Alta **Épica:** EP-08
 
---
 
**ID: HU21**
 
**Historia:** Como Administrativo, quiero moderar el contenido ingresado por los usuarios de edificio, para identificar reclamos inválidos o inapropiados antes de continuar con su gestión y asignación.
 
**Criterios de aceptación:**
 
* [ ] Puedo revisar la descripción y las evidencias de un reclamo..
* [ ] Puedo marcar un reclamo como inválido o inapropiado cuando corresponda.
* [ ] Un reclamo marcado como inválido no continúa con el flujo de asignación a proveedores.
* [ ] Los reclamos válidos pueden continuar con su revisión, clasificación y posterior asignación.
**Puntos:** 5 **Prioridad:** Media **Épica:** EP-04
 
---
 
**ID: HU22**
 
**Historia:** Como Administrador, quiero registrar, modificar y administrar los proveedores del sistema, para mantener actualizada la información de las empresas u organizaciones encargadas de resolver los reclamos.
 
**Criterios de aceptación:**
 
* [ ] Puedo editar la información de un proveedor existente.
* [ ] Puedo desactivar un proveedor.
* [ ] Los proveedores desactivados no aparecen disponibles al asignar nuevos reclamos.

**Puntos:** 5 **Prioridad:** Baja **Épica:** EP-05
 
---
 
**ID: HU23**
 
**Historia:** Como Administrador, quiero crear, editar y administrar las clasificaciones disponibles en el sistema, para mantener actualizados los tipos de problemas que pueden seleccionarse al registrar un reclamo.
 
**Criterios de aceptación:**
 
* [ ] Puedo crear una nueva clasificación indicando su nombre.
* [ ] Entre las clasificaciones pueden existir categorías como iluminación, infraestructura, mantenimiento u otras definidas por el Administrativo.

**Puntos:** 3 **Prioridad:** Media **Épica:** EP-09
 
---
 
**ID: HU24** 
 
**Historia:** Como Administrador, quiero registrar y administrar los edificios públicos del sistema, para mantener actualizada la lista de edificios sobre los que se pueden reportar reclamos.
 
**Criterios de aceptación:**
 
* [ ] Puedo registrar un nuevo edificio indicando al menos ID, nombre y dirección.
* [ ] Puedo editar los datos de un edificio existente.
* [ ] Puedo consultar el listado completo de edificios registrados.


**Puntos:** 5 **Prioridad:** Media **Épica:** EP-02
 
---
 
**ID: HU25** 
 
**Historia:** Como Administrador, quiero asociar usuarios de edificio a uno o más edificios, para reflejar su pertenencia real y habilitar sus reclamos sobre esos edificios.
 
**Criterios de aceptación:**
 
* [ ] Puedo asociar un usuario de edificio existente a un edificio.
* [ ] Puedo modificar o quitar la asociación de un usuario a un edificio.
* [ ] Un reclamo creado por el usuario solo puede asociarse a alguno de los edificios a los que pertenece.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-02
 
---
 
**ID: HU26** *(Nueva — cierra hueco de RF-21 en EP-01)*
 
**Historia:** Como Administrador, quiero restablecer la contraseña de un usuario de edificio o de un Usuario de proveedor, para ayudarlos a recuperar el acceso cuando la olviden o quede comprometida.
 
**Criterios de aceptación:**
 
* [ ] Puedo buscar un usuario de edificio o Usuario de proveedor por su identificador.
* [ ] Puedo asignar una nueva contraseña para ese usuario.
* [ ] El usuario puede iniciar sesión con la nueva contraseña inmediatamente después del restablecimiento.
* [ ] La contraseña anterior deja de ser válida tras el restablecimiento.

**Puntos:** 3 **Prioridad:** Baja **Épica:** EP-01
 
---
 
**ID: HU27** 
 
**Historia:** Como Administrador, quiero registrar y administrar los Usuarios de proveedor, asociándolos al proveedor correspondiente, para habilitar a las personas que trabajarán en representación de cada empresa.
 
**Criterios de aceptación:**
 
* [ ] Puedo registrar un nuevo Usuario de proveedor indicando cédula, nombre, teléfono y contraseña.
* [ ] Puedo editar los datos de un Usuario de proveedor existente.
* [ ] Los Usuarios de proveedor desactivados no pueden iniciar sesión en el sistema.

**Puntos:** 5 **Prioridad:** Media **Épica:** EP-06
 
---


| ID | Historia de usuario | Puntos | Prioridad | Épica |
|---|---|---:|---|---|
| HU1 | Registrar usuarios de edificio (Administrador). | 8 | Alta | EP-01 |
| HU2 | Iniciar sesión según rol. | 8 | Alta | EP-01 |
| HU3 | Manejo y restricción de roles. | 13 | Alta | EP-01 |
| HU26 | Restablecer contraseñas. | 3 | Baja | EP-01 |
| HU24 | Registrar y administrar edificios. | 5 | Media | EP-02 |
| HU25 | Asociar usuarios a uno o más edificios. | 5 | Media | EP-02 |
| HU4 | Crear reclamo (Usuario de edificio). | 8 | Alta | EP-03 |
| HU7 | Consultar estado y avance de mis reclamos. | 5 | Alta | EP-03 |
| HU5 | Moderar y clasificar reclamos. | 5 | Baja | EP-04 |
| HU6 | Asignar prioridad a un reclamo. | 3 | Baja | EP-04 |
| HU10 | Visualizar reclamos con filtro por categoría. | 5 | Alta | EP-04 |
| HU12 | Visualizar evidencias antes/después de resolución. | 5 | Media | EP-03 |
| HU21 | Moderar contenido inválido o inapropiado. | 5 | Media | EP-04 |
| HU13 | Asignar reclamos clasificados a proveedores. | 8 | Alta | EP-05 |
| HU14 | Sugerencia automática de proveedor según clasificación. | 5 | Media | EP-05 |
| HU22 | Registrar y administrar proveedores. | 5 | Baja | EP-05 |
| HU27 | Registrar y administrar Usuarios de proveedor. | 5 | Media | EP-06 |
| HU15 | Consultar tareas asignadas (proveedor). | 3 | Alta | EP-07 |
| HU16 | Registrar finalización de una tarea. | 8 | Alta | EP-07 |
| HU17 | Reprocesar tarea rechazada. | 5 | Media | EP-07 |
| HU8 | Notificaciones dentro de la aplicación. | 5 | Media | EP-08 |
| HU9 | Visualizar evidencias de mis reclamos. | 5 | Baja | EP-08 |
| HU18 | Almacenar y consultar archivos multimedia. | 5 | Alta | EP-08 |
| HU19 | Evidencia obligatoria del trabajo realizado. | 3 | Alta | EP-08 |
| HU20 | Aprobar o rechazar el trabajo del proveedor. | 5 | Alta | EP-08 |
| HU23 | Gestionar clasificaciones del sistema. | 3 | Media | EP-09 |
 
*HU11 fue cancelada (tablero Kanban) y no se incluye en este resumen.*


# Product Backlog inicial

## Backlog priorizado

| Orden | ID | Historia | Puntos | Prioridad | Épica | Sprint estimado |
|---:|---|---|---:|---|---|---|
| 1 | HU2 | Iniciar sesión según rol | 8 | Alta | EP-01 | Sprint 1 |
| 2 | HU3 | Manejo y restricción de roles | 13 | Alta | EP-01 | Sprint 1 |
| 3 | HU1 | Registrar usuarios de edificio | 8 | Alta | EP-01 | Sprint 1 |
| 4 | HU24 | Registrar y administrar edificios | 5 | Media | EP-02 | Sprint 1 |
| 5 | HU25 | Asociar usuarios a uno o más edificios | 5 | Media | EP-02 | Sprint 1 |
| 6 | HU26 | Restablecer contraseñas | 3 | Baja | EP-01 | Sprint 1 |
| 7 | HU4 | Crear reclamo con descripción, evidencia y clasificación | 8 | Alta | EP-03 | Sprint 2 |
| 8 | HU23 | Gestionar clasificaciones del sistema | 3 | Media | EP-09 | Sprint 2 |
| 9 | HU5 | Moderar y clasificar reclamos | 5 | Baja | EP-04 | Sprint 2 |
| 10 | HU21 | Moderar contenido inválido o inapropiado | 5 | Media | EP-04 | Sprint 2 |
| 11 | HU6 | Asignar prioridad a un reclamo | 3 | Baja | EP-04 | Sprint 2 |
| 12 | HU10 | Visualizar reclamos con filtros y búsqueda | 5 | Alta | EP-04 | Sprint 3 |
| 13 | HU7 | Consultar estado y avance de reclamos propios | 5 | Alta | EP-03 | Sprint 3 |
| 14 | HU13 | Asignar reclamos clasificados a proveedores | 8 | Alta | EP-05 | Sprint 3 |
| 15 | HU14 | Sugerir proveedor según clasificación | 5 | Media | EP-05 | Sprint 3 |
| 16 | HU22 | Registrar y administrar proveedores | 5 | Baja | EP-05 | Sprint 3 |
| 17 | HU27 | Registrar y administrar usuarios de proveedor | 5 | Media | EP-06 | Sprint 4 |
| 18 | HU15 | Consultar tareas asignadas | 3 | Alta | EP-07 | Sprint 4 |
| 19 | HU16 | Registrar finalización de una tarea | 8 | Alta | EP-07 | Sprint 4 |
| 20 | HU19 | Registrar evidencia obligatoria del trabajo | 3 | Alta | EP-08 | Sprint 4 |
| 21 | HU18 | Almacenar y consultar archivos multimedia | 5 | Alta | EP-08 | Sprint 5 |
| 22 | HU20 | Aprobar o rechazar el trabajo del proveedor | 5 | Alta | EP-08 | Sprint 5 |
| 23 | HU12 | Visualizar evidencias antes y después | 5 | Media | EP-03 | Sprint 5 |
| 24 | HU8 | Recibir notificaciones dentro de la aplicación | 5 | Media | EP-08 | Sprint 5 |
| 25 | HU9 | Visualizar evidencias de los reclamos propios | 5 | Baja | EP-08 | Sprint 6 |
| 26 | HU17 | Reprocesar tarea rechazada | 5 | Media | EP-07 | Sprint 6 |

> **HU11 fue cancelada y no se incluye en el Product Backlog.**

---

# Planificación de sprints

## Sprint 1: Acceso al sistema, usuarios, edificios y roles

### Objetivo del sprint

Construir la base inicial del sistema, incorporando autenticación, gestión de usuarios, manejo de roles y administración de edificios.

### Historias seleccionadas

| ID | Historia | Puntos |
|---|---|---:|
| HU1 | Registrar usuarios de edificio | 8 |
| HU2 | Iniciar sesión según rol | 8 |
| HU3 | Manejo y restricción de roles | 13 |
| HU24 | Registrar y administrar edificios | 5 |
| HU25 | Asociar usuarios a uno o más edificios | 5 |
| HU26 | Restablecer contraseñas | 3 |
| **Total** | | **42** |

### Incremento esperado

Al finalizar el sprint, el cliente podrá:

- Registrar usuarios de edificio.
- Iniciar sesión con credenciales válidas.
- Acceder a las funcionalidades correspondientes según el rol.
- Gestionar los diferentes roles del sistema.
- Registrar, editar y consultar edificios.
- Asociar usuarios de edificio a uno o más edificios.
- Restablecer contraseñas.

### Sprint Review 1

El cliente revisa el incremento y responde:

### Feedback del cliente



### Resultado del sprint



---

## Sprint 2: Registro y moderación de reclamos

### Objetivo del sprint

Implementar el flujo de creación, clasificación, moderación y priorización de reclamos.

### Historias seleccionadas

| ID | Historia | Puntos |
|---|---|---:|
| HU4 | Crear reclamo con descripción, evidencia y clasificación | 8 |
| HU23 | Gestionar clasificaciones del sistema | 3 |
| HU5 | Moderar y clasificar reclamos | 5 |
| HU21 | Moderar contenido inválido o inapropiado | 5 |
| HU6 | Asignar prioridad a un reclamo | 3 |
| **Total** | | **24** |

### Incremento esperado

Al finalizar el sprint, el cliente podrá:

- Crear reclamos.
- Ingresar una descripción del problema.
- Adjuntar evidencia fotográfica.
- Seleccionar una clasificación.
- Administrar las clasificaciones disponibles.
- Revisar y modificar la clasificación de un reclamo.
- Moderar contenido inválido o inapropiado.
- Asignar prioridad a los reclamos.
- Evitar que los reclamos inválidos continúen con el proceso de asignación.

### Sprint Review 2

El cliente revisa el incremento y responde:

### Feedback del cliente



### Resultado del sprint



---

## Sprint 3: Gestión administrativa y proveedores

### Objetivo del sprint

Implementar las funcionalidades administrativas necesarias para consultar, buscar y gestionar reclamos, además de administrar proveedores y asignarles reclamos.

### Historias seleccionadas

| ID | Historia | Puntos |
|---|---|---:|
| HU7 | Consultar estado y avance de reclamos propios | 5 |
| HU10 | Visualizar reclamos con filtros y búsqueda | 5 |
| HU13 | Asignar reclamos clasificados a proveedores | 8 |
| HU14 | Sugerir proveedor según clasificación | 5 |
| HU22 | Registrar y administrar proveedores | 5 |
| **Total** | | **28** |

### Incremento esperado

Al finalizar el sprint, el cliente podrá:

- Consultar sus propios reclamos.
- Consultar el estado y avance de cada reclamo.
- Visualizar todos los reclamos desde el perfil administrativo.
- Buscar reclamos.
- Filtrar reclamos por categoría.
- Visualizar estado, prioridad, categoría y edificio.
- Registrar y administrar proveedores.
- Desactivar proveedores.
- Asignar reclamos clasificados a proveedores.
- Recibir una sugerencia automática de proveedor según la clasificación.

### Sprint Review 3

El cliente revisa el incremento y responde:

### Feedback del cliente



### Resultado del sprint



---

## Sprint 4: Usuarios de proveedor y ejecución de tareas

### Objetivo del sprint

Implementar la gestión de usuarios de proveedor y permitir que los proveedores consulten sus tareas y registren la finalización de los trabajos realizados.

### Historias seleccionadas

| ID | Historia | Puntos |
|---|---|---:|
| HU27 | Registrar y administrar usuarios de proveedor | 5 |
| HU15 | Consultar tareas asignadas | 3 |
| HU16 | Registrar finalización de una tarea | 8 |
| HU19 | Registrar evidencia obligatoria del trabajo | 3 |
| **Total** | | **19** |

### Incremento esperado

Al finalizar el sprint, el cliente podrá:

- Registrar usuarios de proveedor.
- Asociar usuarios al proveedor correspondiente.
- Editar los datos de los usuarios de proveedor.
- Desactivar usuarios de proveedor.
- Consultar únicamente las tareas asignadas al proveedor.
- Visualizar descripción, evidencia y prioridad de cada tarea.
- Registrar materiales utilizados y observaciones.
- Registrar la finalización de una tarea.
- Adjuntar evidencia fotográfica obligatoria.
- Asociar la solución y las evidencias al reclamo correspondiente.

### Sprint Review 4

El cliente revisa el incremento y responde:

### Feedback del cliente



### Resultado del sprint



---

## Sprint 5: Evidencias, aprobación y notificaciones

### Objetivo del sprint

Completar el proceso de resolución de reclamos mediante la gestión de evidencias, aprobación o rechazo del trabajo realizado y notificaciones al usuario de edificio.

### Historias seleccionadas

| ID | Historia | Puntos |
|---|---|---:|
| HU8 | Recibir notificaciones dentro de la aplicación | 5 |
| HU12 | Visualizar evidencias antes y después | 5 |
| HU18 | Almacenar y consultar archivos multimedia | 5 |
| HU20 | Aprobar o rechazar el trabajo del proveedor | 5 |
| **Total** | | **20** |

### Incremento esperado

Al finalizar el sprint, el cliente podrá:

- Almacenar los archivos multimedia asociados a cada reclamo.
- Consultar las evidencias iniciales y las evidencias de resolución.
- Revisar las observaciones y evidencias del proveedor.
- Aprobar el trabajo y cerrar el reclamo como completado.
- Rechazar el trabajo indicando obligatoriamente el motivo.
- Devolver un reclamo rechazado al proveedor correspondiente.
- Recibir notificaciones sobre actualizaciones relevantes.
- Recibir una notificación cuando se registre la finalización del trabajo.

### Sprint Review 5

El cliente revisa el incremento y responde:

### Feedback del cliente



### Resultado del sprint



---

## Sprint 6: Reprocesamiento y cierre del flujo

### Objetivo del sprint

Completar los casos de rechazo y reprocesamiento, consolidar la consulta de evidencias y realizar las pruebas finales de integración y validación.

### Historias seleccionadas

| ID | Historia | Puntos |
|---|---|---:|
| HU9 | Visualizar evidencias de los reclamos propios | 5 |
| HU17 | Reprocesar tarea rechazada | 5 |
| **Total** | | **10** |

### Incremento esperado

Al finalizar el sprint, el cliente podrá:

- Consultar las evidencias asociadas a sus propios reclamos.
- Visualizar las evidencias originales.
- Visualizar las evidencias registradas durante la resolución.
- Identificar las tareas rechazadas.
- Consultar el motivo del rechazo.
- Volver a trabajar sobre una tarea rechazada.
- Registrar nuevamente observaciones y evidencias.
- Completar el flujo de un reclamo desde su creación hasta su resolución.

Además, durante este sprint se realizarán:

- Pruebas de integración.
- Validación de criterios de aceptación.
- Pruebas de permisos y roles.
- Corrección de errores.
- Validación del flujo completo.
- Ajustes finales.

### Sprint Review 6

El cliente revisa el incremento y responde:

### Feedback del cliente



### Resultado del sprint



---



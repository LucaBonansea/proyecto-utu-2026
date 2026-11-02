# Justificación del Modelo Entidad-Relación

## 1. Objetivo y fuentes

Este documento justifica el [Modelo Entidad-Relación](MER_proyecto_final.drawio.pdf) de **Portal Ciudadano**. Cada entidad, campo y cardinalidad se relaciona con la documentación vigente:

- [Épicas y requerimientos](../requerimientos/epicas_y_requerimientos.md).
- [Historias de usuario](../historias_de_usuario/HU.md).
- [Control de cambios](../Control_de_cambios.md), especialmente el Cambio 2.
- [Entrevista al cliente](../entrevista/Entrevista_Reclamos_Ciudadanos.md).
- [Project Charter](../project_charter.md).

## 2. Metodología de análisis

Se aplicó el método de derivación en cinco pasos:

| Paso | Técnica | Resultado |
|---|---|---|
| 1 | Sustantivos relevantes en RF y HU → entidades | Usuario, Proveedor, Edificio, Área, Clasificación, Reclamo, Evidencia y Notificación. |
| 2 | Datos nombrados para cada entidad → atributos | Por ejemplo, RF-18 especifica RUT, razón social, dirección, teléfono, correo y contacto para `Proveedor`. |
| 3 | Acciones y reglas del negocio → restricciones y estados | La máquina de estados define los valores posibles de `Reclamo.estado`. |
| 4 | Vínculos entre entidades y expresiones de cantidad → relaciones y cardinalidades | RF-20 indica que un usuario puede pertenecer a uno o más edificios; por tanto, la relación es N:M. |
| 5 | Entidades persistentes → tablas; relaciones N:M → tablas intermedias | `UsuarioEdificio` y `ProveedorClasificacion` deben implementarse como tablas asociativas. |

Este método permite relacionar cada elemento con un requerimiento o historia de usuario, manteniendo trazabilidad.

---

## 3. Tabla de trazabilidad general

| Entidad | RF de origen | HU de origen | Épica |
|---|---|---|---|
| `Usuario` | RF-01, RF-02, RF-03, RF-15, RF-16, RF-20, RF-21, RF-22, RF-23 | HU1, HU2, HU3, HU25, HU26, HU27 | EP-01, EP-02, EP-06 |
| `Proveedor` | RF-07, RF-17, RF-18, RF-22 | HU13, HU14, HU22, HU27 | EP-05, EP-06 |
| `Edificio` | RF-19, RF-20, RF-25 | HU4, HU24, HU25 | EP-02, EP-03 |
| `Area` | RF-26, RF-29, RF-30 | HU28, HU31 | Ampliación funcional |
| `Clasificacion` | RF-04, RF-05, RF-07 | HU4, HU5, HU13, HU14, HU23 | EP-03, EP-04, EP-05, EP-09 |
| `Reclamo` | RF-04 a RF-14, RF-24 a RF-30 | HU4 a HU21, HU28, HU29, HU31 | EP-03, EP-04, EP-05, EP-07, EP-08 |
| `Evidencia` | RF-04, RF-11, RF-12, RF-24 | HU4, HU9, HU12, HU16, HU18, HU19, HU20 | EP-03, EP-07, EP-08 |
| `Notificacion` | RF-09 | HU8 | EP-08 |

---

## 5. Justificación de entidades y atributos

### 5.1 Usuario

| Elemento | Justificación |
|---|---|
| Entidad `Usuario` | RF-01, RF-03, RF-15, RF-22 y RF-23 requieren registrar personas que acceden al sistema: usuarios de edificio, administradores, administrativos y usuarios de proveedor. |
| `cedula` | RF-01 y RF-23 la incluyen como dato de registro del usuario. Debe ser única para identificar a cada persona. |
| `nombre` | RF-01 y RF-23 exigen registrar el nombre de los usuarios. |
| `password` | RF-01, RF-03 y RF-21 requieren credenciales para acceder y restablecer el acceso. En la implementación debe guardarse como `password_hash`, no como contraseña en texto plano, por RNF-03. |
| `telefono` | RF-01, RF-02 y RF-23 exigen el número telefónico. RF-02 establece que debe tener nueve dígitos y comenzar con `09`. |
| `email` | Dato de contacto |
| `rol` | RF-15 y HU3 establecen los roles: Usuario de edificio, Administrador, Administrativo y Usuario de proveedor. |
| `activo` | HU22 y HU27 indican que proveedores y usuarios de proveedor pueden desactivarse. Permite bloquear acceso sin borrar información histórica. |
| `proveedor_id` | RF-22 y RF-23 establecen que cada Usuario de proveedor debe estar asociado al proveedor correspondiente. Es opcional para los demás roles. |
| `politicas_aceptadas` | Requiere poder aceptar politicas ppr temas legales |
| `fecha_aceptacion_politicas` | Depende del atributo anterior. Permite registrar cuándo el usuario aceptó las políticas. |

### 5.2 Proveedor

| Elemento | Justificación |
|---|---|
| Entidad `Proveedor` | RF-17 establece la gestión de empresas u organizaciones que resolverán reclamos. HU22 contempla su administración. |
| `nombre` | RF-18 permite registrar razón social o nombre comercial. Este atributo representa el nombre comercial. |
| `razon_social` | RF-18 lo menciona expresamente como dato del proveedor. |
| `rut` | RF-18 exige registrar el RUT de cada proveedor. Debe ser único. |
| `telefono` | RF-18 lo define como dato de contacto empresarial. |
| `direccion` | RF-18 lo exige para identificar la ubicación del proveedor. |
| `email` | RF-18 exige correo electrónico del proveedor. |
| `contacto_responsable` | RF-18 indica que se deben registrar los datos de un contacto responsable, como propietario, encargado o representante. |
| `telefono_contacto` | Complementa los datos del contacto responsable definidos en RF-18. |
| `email_contacto` | Complementa los datos del contacto responsable definidos en RF-18. |
| `estado` | HU22 indica que un proveedor puede desactivarse y que los proveedores desactivados no deben aparecer al asignar nuevos reclamos. Es preferible usar valores como `ACTIVO` e `INACTIVO`. |

### 5.3 Edificio

| Elemento | Justificación |
|---|---|
| Entidad `Edificio` | RF-19 exige administrar los edificios públicos sobre los que se realizarán reclamos. |
| `id` | RF-19 exige que cada edificio tenga identificador. Funciona como clave primaria. |
| `nombre` | RF-19 exige registrar el nombre del edificio. |
| `direccion` | RF-19 exige registrar la dirección del edificio. |

### 5.4 Area

| Elemento | Justificación |
|---|---|
| Entidad `Area` | RF-29 y HU31 requieren asociar reclamos a áreas específicas dentro de un edificio, para ubicar mejor el problema. |
| `id` | Identificador técnico y clave primaria necesaria para distinguir cada área. |
| `id_edificio` | Cada área pertenece a un edificio. Es la clave foránea que implementa la relación Edificio–Área. |
| `nombre` | RF-29 requiere identificar el área afectada; por ejemplo, “Baño”, “Pasillo”, “Salón de actos” o “Entrada”. |

### 5.5 Clasificacion

| Elemento | Justificación |
|---|---|
| Entidad `Clasificacion` | RF-04 permite clasificar reclamos; HU23 permite administrar las clasificaciones disponibles. |
| `id` | Identificador técnico de cada clasificación. |
| `clasificacion` | HU23 establece que el administrador crea clasificaciones indicando su nombre. Ejemplos: iluminación, infraestructura y mantenimiento. |

### 5.6 Reclamo

| Elemento | Justificación |
|---|---|
| Entidad `Reclamo` | Es la entidad principal del sistema. RF-04 permite crearlo; RF-05, RF-06 y RF-07 permiten moderarlo, priorizarlo y asignarlo; RF-08 permite consultarlo. |
| `id` | Identificador único del reclamo. |
| `usuario_cedula` | RF-04, RF-08 y RF-25 indican que todo reclamo es creado por un Usuario de edificio. |
| `proveedor_id` | RF-07 exige asignar manualmente un proveedor. Debe permitir `NULL` mientras el reclamo está en estados `INGRESADO` o `MODERADO`. |
| `clasificacion_id` | RF-04 exige seleccionar una clasificación al crear el reclamo; |
| `edificio_id` | RF-25 establece que es obligatorio y debe pertenecer al usuario creador del reclamo. |
| `descripcion` | RF-04 exige que el Usuario de edificio ingrese una descripción del problema. |
| `estado` | La máquina de estados define los valores: `INGRESADO`, `INVALIDO`, `MODERADO`, `ASIGNADO`, `PENDIENTE_APROBACION`, `COMPLETADO` y `RECHAZADO`. |
| `prioridad` | RF-06 y HU6 requieren identificar reclamos urgentes. |
| `motivo_rechazo` | HU20 exige indicar obligatoriamente el motivo cuando un Usuario de edificio rechaza una resolución. |
| `costo_mano_de_obra` | RF-28 exige registrar los costos de mano de obra al finalizar una tarea. |
| `costo_materiales` | RF-27 exige registrar los costos de materiales utilizados por el proveedor. |
| `area_id`| RF-29 y HU31: cada reclamo debe poder asociarse a un área del edificio afectado. |

### 5.7 Evidencia

| Elemento | Justificación |
|---|---|
| Entidad `Evidencia` | RF-04 permite adjuntar evidencia inicial; RF-11 permite visualizarla; RF-12, RF-24 y HU19 exigen evidencia de resolución. |
| `id` | Identificador único de cada archivo de evidencia. |
| `reclamo_id` | RF-18, HU18 y HU19 requieren que los archivos queden asociados al reclamo correspondiente. |
| `ruta_archivo` | RNF-05 establece almacenamiento de archivos en filesystem; este atributo guarda la ruta o referencia del archivo almacenado. |
| `observaciones` | RF-24 y HU16 exigen registrar observaciones al finalizar el trabajo. Puede utilizarse para describir una evidencia, aunque también podría modelarse como atributo de `Reclamo` o de una entidad `Resolucion`. |
| `fecha_carga` | HU16 exige registrar fecha y hora de la finalización; el modelo funcional mínimo usa `created_at`. |


### 5.8 Notificacion

| Elemento | Justificación |
|---|---|
| Entidad `Notificacion` | RF-09 y HU8 exigen almacenar notificaciones internas sobre actualizaciones relevantes de los reclamos. |
| `id` | Identificador único de la notificación. |
| `usuario_cedula` | RF-09 indica que la notificación se dirige al Usuario de edificio. |
| `reclamo_id` | Permite vincular la actualización notificada con el reclamo correspondiente. |
| `titulo` | No se define expresamente en RF-09, pero permite resumir la notificación; por ejemplo, “Reclamo finalizado”. |
| `mensaje` | RF-09 y HU8 requieren informar el cambio o actualización producida sobre el reclamo. |
| `tipo` | Permite clasificar notificaciones como `FINALIZACION`, `RECHAZO` o `CAMBIO_ESTADO`. Es una decisión de diseño válida. |
| `leida` |Para distinguir notificaciones consultadas de pendientes. |


---

## 6. Justificación de relaciones y cardinalidades

| Relación | Cardinalidad correcta | Justificación |
|---|---|---|
| Usuario — Proveedor (`Trabaja para`) | Usuario N -Trabaja para- 1 Proveedor | RF-22 y RF-23 indican que un proveedor puede tener uno o más Usuarios de proveedor y que cada uno pertenece a un proveedor. La relación no aplica a administradores, administrativos ni usuarios de edificio, por eso `proveedor_id` es opcional. |
| Usuario — Edificio (`Gestiona` o `Pertenece a`) | Usuario N -Gestiona- N Edificio | RF-20 y HU25 establecen que un usuario puede asociarse a uno o más edificios y que un edificio puede tener varios usuarios. |
| Edificio — Area (`Contiene`) | Edificio 1 -Tiene- N Área | RF-29 y HU31 requieren áreas internas de cada edificio. Cada área pertenece a un único edificio. |
| Edificio — Reclamo (`Corresponde a`) | Edificio 1 -Corresponde a- N Reclamo | RF-25 exige que todo reclamo se asocie obligatoriamente con un edificio al que pertenece el usuario creador. |
| Clasificacion — Reclamo (`Clasifica`) | Clasificación 1 -Clasifica- N Reclamo | RF-04 requiere seleccionar una clasificación y RF-05 permite validarla o modificarla. Cada reclamo mantiene una clasificación vigente. |
| Proveedor — Reclamo (`Atiende`) | Proveedor 1 -Atiende- N Reclamo;| RF-07 exige asignar un proveedor manualmente. |
| Usuario — Reclamo (`Crea`) | Usuario 1 -Crea- N Reclamo | RF-04 y RF-08 indican que un Usuario de edificio crea y consulta sus propios reclamos. Cada reclamo posee un único creador. |
| Reclamo — Evidencia (`Tiene`) | Reclamo 1 -Tiene- N Evidencia | RF-04 solicita evidencia fotográfica inicial y RF-12 exige evidencia de resolución. |
| Reclamo — Notificacion (`Genera`) | Reclamo 1 Genera N Notificación | RF-09 indica que se generan notificaciones cuando hay actualizaciones relevantes. Un reclamo puede no tener notificaciones al inicio y generar varias durante su ciclo de vida. |
| Usuario — Notificacion (`Recibe`) | Usuario 1 -Recibe- N Notificación | RF-09 y HU8 indican que el Usuario de edificio recibe notificaciones sobre sus reclamos. Cada notificación corresponde a un destinatario. |

# Justificación del diagrama UML

## 1. Objetivo y fuentes

Este documento justifica el [diagrama de clases UML](UML_Proyecto.drawio.pdf) de **SIRED** mediante su relación con la documentación vigente:

- [Épicas y requerimientos](../requerimientos/epicas_y_requerimientos.md).
- [Historias de usuario](../historias_de_usuario/HU.md).
- [Control de cambios](../Control_de_cambios.md), especialmente el Cambio 2.
- [Entrevista al cliente](../entrevista/Entrevista_Reclamos_Ciudadanos.md).
- [Project Charter](../project_charter.md).

El análisis toma los sustantivos del dominio como candidatos a clases, los datos solicitados como atributos, las acciones de las historias como métodos y las reglas que vinculan elementos como asociaciones. Cuando existe una contradicción, las decisiones posteriores del Control de cambios y los RF/HU vigentes prevalecen sobre la entrevista o el alcance inicial.

## 2. Trazabilidad general

| Clase | Requerimientos | Historias de usuario | Épica | Motivo de inclusión |
|---|---|---|---|---|
| `Usuario` y `Roles` | RF-01, RF-02, RF-03, RF-15, RF-16, RF-21, RF-22, RF-23 | HU1, HU2, HU3, HU26, HU27 | EP-01 y EP-06 | Identificación, autenticación y autorización de quienes utilizan el sistema |
| `Edificio` | RF-19, RF-20, RF-25 | HU24, HU25 | EP-02 | Representa el edificio al que pertenece el usuario y sobre el que se informa un problema |
| `Reclamo`, `EstadoReclamo` y `Prioridad` | RF-04, RF-05, RF-06, RF-08, RF-10, RF-25 | HU4, HU5, HU6, HU7, HU10, HU21 | EP-03 y EP-04 | Representan la incidencia y su ciclo de gestión |
| `Clasificacion` | RF-04, RF-05 | HU4, HU5, HU10, HU14, HU23 | EP-04 y EP-09 | Organiza los reclamos y orienta su asignación |
| `Proveedor` | RF-07, RF-13, RF-17, RF-18, RF-22 | HU13, HU14, HU15, HU22, HU27 | EP-05 y EP-06 | Representa la empresa responsable de atender reclamos |
| `Evidencia` | RF-04, RF-11, RF-12, RF-24 | HU4, HU9, HU12, HU16, HU18, HU19 | EP-03, EP-07 y EP-08 | Permite almacenar y consultar los archivos fotográficos asociados a los reclamos, tanto al registrarlos como durante su resolución. |
| `Notificacion` | RF-09 | HU8 | EP-08 | Informa actualizaciones relevantes al usuario |

## 3. Justificación de clases, atributos y métodos

### 3.1 `Usuario` y `Roles`

| Elemento | Justificación |
|---|---|
| Clase `Usuario` | RF-01/HU1 requieren registrar usuarios y RF-03/HU2 permiten iniciar sesión. Una clase común reúne la identidad y las credenciales compartidas por los cuatro perfiles. |
| `nombre` | RF-01/HU1 y RF-23/HU27 lo exigen para usuarios de edificio y de proveedor. |
| `cedula` | RF-01 y RF-23 la incluyen como dato de identificación. La entrevista P13 y P18 también plantea identificar a la persona que origina el reclamo. |
| `telefono` | RF-01, RF-02 y HU1. Debe tener nueve dígitos y comenzar con `09`. |
| `passwordHash` | RF-01, RF-03 y RF-23 requieren credenciales. Almacenar un hash en lugar de la contraseña es coherente con la protección de datos de RNF-03 y RNF-10. |
| `activo` | HU27 establece que los Usuarios de proveedor desactivados no pueden iniciar sesión. Permite controlar el acceso sin eliminar su información histórica. |
| `rol: Roles` | RF-15/HU3 definen `Administrador`, `Administrativo`, `Usuario_edificio` y `Usuario_proveedor`. El enum evita valores arbitrarios y permite aplicar RF-16/RNF-01. |
| `iniciarSesion()` | RF-03/HU2. Autentica las credenciales y habilita las funciones correspondientes al rol. |
| `cerrarSesion()` | Operación complementaria para terminar el acceso autenticado y proteger la sesión, de acuerdo con RNF-01. |
| `crearReclamo()` | RF-04/HU4. Debe estar disponible únicamente para `Usuario_edificio`. |
| `consultarReclamosPropios()` | RF-08/HU7. Restringe la consulta a los reclamos creados por el usuario. |
| `validarSolucion()` | HU20. Permite al Usuario de edificio aprobar o rechazar el trabajo. |
| `moderarReclamo()` | RF-05, HU5 y HU21. Es responsabilidad del `Administrativo`. |
| `asignarPrioridad()` | RF-06/HU6. Permite identificar reclamos urgentes. |
| `asignarProveedor()` | RF-07/HU13. Es una acción del `Administrativo`. |
| `verReclamos()` | RF-10/HU10. Administrador y Administrativo visualizan los reclamos según sus permisos. |
| `gestionarEdificios()` | RF-19/HU24. |
| `gestionarClasificaciones()` | RF-05/HU23. |
| `gestionarProveedores()` | RF-17/HU22. |
| `gestionarUsuariosProveedor()` | RF-22/HU27. |
| `gestionarUsuariosEdificio()` | RF-01, RF-20, HU1 y HU25. |
| `restablecerContrasena()` | RF-21/HU26. |
| `consultarTareasAsignadas()` | RF-13/HU15. Debe limitarse a `Usuario_proveedor` y a su empresa. |
| `finalizarTarea()` | RF-24/HU16. Registra el trabajo y su evidencia. |

Los roles se representan mediante un enum y no como cuatro subclases porque comparten los mismos datos personales y credenciales. La diferencia está principalmente en los permisos. Aunque el UML concentra los métodos en `Usuario`, RF-16 y RNF-01 obligan a restringir cada operación según el rol autenticado.

De acuerdo con RF-01, RF-20, HU1 y HU25, el registro de un Usuario de edificio no requiere que tenga edificios asociados inicialmente. La asociación puede realizarse posteriormente por el Administrador. Sin embargo, para crear un Reclamo, el usuario debe estar asociado al menos a un edificio y seleccionar uno de ellos, conforme a RF-25 y HU4.

### 3.2 `Edificio`

| Elemento | Justificación |
|---|---|
| Clase `Edificio` | RF-19/HU24 y el Control de cambios 2 requieren administrar edificios públicos. |
| `idEdificio` | HU24 exige como mínimo un identificador. |
| `nombre` y `direccion` | RF-19/HU24 indican que cada edificio debe contar con ID, nombre y dirección. |

La clase Edificio representa los edificios públicos registrados en el sistema. Su asociación con Usuario permite que un Usuario de edificio pertenezca a varios edificios y que cada edificio tenga múltiples usuarios asociados. Esta asociación puede establecerse después del registro, conforme a RF-20 y HU25. La relación con Reclamo garantiza que cada reclamo corresponda obligatoriamente a uno de los edificios del usuario que lo creó, según RF-25.

### 3.3 `Reclamo`, `EstadoReclamo` y `Prioridad`

| Elemento | Justificación |
|---|---|
| Clase `Reclamo` | RF-04/HU4. Es la clase central porque conecta al creador, edificio, clasificación, proveedor, soluciones y notificaciones. |
| `idReclamo` | Identifica cada incidencia durante su creación, asignación, resolución y consulta. |
| `descripcion` | RF-04/HU4 y entrevista P10, P13 y P16. |
| `fechaCreacion` | Permite ordenar los reclamos y consultar su avance según RF-08/HU7. |
| `nombreArchivo`, `ruta` y `tipo` | Representan la evidencia inicial exigida por RF-04/HU4. `ruta` es coherente con el almacenamiento en filesystem de RNF-05. |
| `estado: EstadoReclamo` | RF-08, RF-09, RF-24 y HU7, HU8, HU16, HU17 y HU20 requieren identificar y consultar las diferentes etapas de gestión del reclamo. |
| `prioridad: Prioridad` | RF-06/HU6 permiten identificar casos urgentes. La entrevista P7 y P8 explica esta necesidad. |
| Enum `Prioridad` | `ESTANDAR` y `URGENTE` representan el alcance vigente. El Project Charter excluye la asignación automática de prioridad. |
| Enum `EstadoReclamo` | Define los estados INGRESADO, INVALIDO, MODERADO, ASIGNADO, PENDIENTE_APROBACION, COMPLETADO y RECHAZADO, conforme a la máquina de estados establecida en los requerimientos funcionales actualizados. |

El uso de una enumeración permite restringir los estados a los valores establecidos y facilita el control de sus transiciones. La finalización del trabajo por parte del proveedor no implica el cierre definitivo del reclamo: primero pasa a PENDIENTE_APROBACION y solo alcanza COMPLETADO cuando el Usuario de edificio aprueba la resolución.

### 3.4 `Clasificacion`

| Elemento | Justificación |
|---|---|
| Clase `Clasificacion` | RF-04 permite seleccionarla, RF-05 permite validarla o modificarla y HU23 exige administrar las opciones disponibles. |
| `idClasificacion` | Mantiene la identidad aunque se edite el nombre. |
| `nombre` | HU23 exige crear clasificaciones por nombre y menciona iluminación, infraestructura y mantenimiento. |

La clase evita guardar categorías como texto libre y facilita los filtros de HU10 y la sugerencia de proveedor de HU14.

### 3.5 `Proveedor`

| Elemento | Justificación |
|---|---|
| Clase `Proveedor` | RF-17/HU22. Representa a la empresa u organización que resuelve reclamos, no a una cuenta de acceso. |
| `rut` | Identificación empresarial solicitada por RF-18. |
| `razonSocial` | RF-18 solicita razón social o nombre comercial. |
| `direccion`, `telefono` y `correo` | Datos empresariales requeridos por RF-18. |
| `activo` | HU22 permite desactivar proveedores sin borrar su información histórica. |
| `nombreContacto`, `telefonoContacto`, `correoContacto` y `direccionContacto` | Representan al contacto responsable solicitado en RF-18 y el Control de cambios 2. `direccionContacto` debe considerarse opcional mientras no sea confirmada expresamente. |

La relación entre Proveedor y Clasificacion permite identificar las empresas que pueden atender un determinado tipo de reclamo, conforme a RF-07, HU13 y HU14. El sistema muestra los proveedores correspondientes a la clasificación seleccionada y el Administrativo elige y confirma manualmente la asignación. Si no existen proveedores relacionados con la clasificación, el sistema debe informarlo. No se contempla la asignación automática de reclamos.
### 3.6 `Solucion`

| Elemento | Justificación |
|---|---|
| Clase `Solucion` | RF-24/HU16 registran la finalización; HU20 revisa el resultado y HU17 permite reprocesarlo. |
| `idSolucion` | Distingue cada intento de resolución. |
| `observaciones` | RF-24/HU16. |
| `materialesUtilizados` | Criterio de aceptación explícito de HU16. |
| `fechaHora` | HU16 y entrevista P30. |
| `estadoRevision` | HU20 distingue una solución pendiente, aprobada o rechazada. |
| `motivoRechazo` | HU20 lo exige al rechazar y HU17 permite consultarlo para corregir el trabajo. |
| `nombreArchivo`, `ruta` y `tipo` | RF-12, RF-24, HU16 y HU19 exigen evidencia de la resolución. |

La clase Solucion representa el registro del trabajo realizado por un Usuario de proveedor sobre un Reclamo. De acuerdo con RF-24 y HU16, al registrar la finalización deben incluirse observaciones, materiales utilizados y al menos una evidencia fotográfica. Esta acción cambia el estado del reclamo a `PENDIENTE_APROBACION`, sin cerrarlo definitivamente.

Según HU20, el Usuario de edificio puede aprobar la solución, pasando el reclamo a `COMPLETADO`, o rechazarla indicando obligatoriamente un motivo, pasando a `RECHAZADO`. Conforme a RF-14 y HU17, el reclamo conserva al mismo proveedor, quien puede registrar una nueva resolución. De esta manera, pueden conservarse los distintos intentos de solución sin sobrescribir los anteriores.

### 3.7 `Evidencia`

| Elemento | Justificación |
|---|---|
| Clase `Evidencia` | RF-04, RF-11, RF-12, RF-24 y HU4, HU9, HU12, HU16, HU18 y HU19 requieren registrar, almacenar y consultar evidencias fotográficas durante el ciclo de vida del reclamo. |
| `id` | Identifica individualmente cada evidencia almacenada. |
| `reclamo_id` | Permite asociar la evidencia al reclamo correspondiente. |
| `ruta_del_archivo` | Almacena la referencia al archivo, de acuerdo con el almacenamiento en filesystem establecido en RNF-05. |
| `observaciones` | Permite complementar la evidencia con información descriptiva. |
| `fechaCarga` | Registra cuándo fue incorporada la evidencia al sistema. |

La clase Evidencia se modela de forma independiente porque un reclamo puede tener múltiples archivos asociados, tanto iniciales como registrados durante la resolución. Las evidencias deben ser accesibles únicamente para los usuarios que tengan permisos sobre el reclamo, conforme a HU9 y HU18.

Además, el modelo de datos funcional mínimo establece una distinción entre evidencias de tipo `INICIAL` y `RESOLUCION`, permitiendo identificar su origen dentro del proceso.

### 3.8 `Notificacion`

| Elemento | Justificación |
|---|---|
| Clase `Notificacion` | RF-09/HU8 requieren avisos internos ante actualizaciones y finalización del trabajo. |
| `idNotificacion` | Identifica cada aviso persistido. |
| `mensaje` | Comunica el cambio relevante exigido por HU8. |
| `fechaHora` | Permite ordenar y contextualizar los avisos. |

Se modela como clase porque debe permanecer disponible dentro de la aplicación entre sesiones, de acuerdo con RNF-06.

## 4. Justificación de relaciones y multiplicidades

| Relación | Multiplicidad | Justificación |
|---|---|---|
| `Usuario` crea `Reclamo` | Un usuario crea `0..*`; cada reclamo tiene `1` creador | RF-04/HU4 y RF-08/HU7. |
| `Usuario` pertenece a `Edificio` | Un usuario puede pertenecer a `0..*` edificios y un edificio puede tener `0..*` usuarios | RF-01, RF-20 y HU25 permiten asociar usuarios a edificios posteriormente al registro. RF-25 exige seleccionar un edificio asociado para crear un reclamo. | 
| `Edificio` tiene `Reclamo` | Un edificio tiene `0..*` reclamos y cada reclamo corresponde a `1` edificio | RF-25/HU25. El edificio sustituye la geolocalización eliminada por el Cambio 2. |
| `Usuario` pertenece a `Proveedor` | Un proveedor tiene `1..*` Usuarios de proveedor; cada uno pertenece a `1` proveedor | RF-22, RF-23 y HU27. Para los demás roles la asociación es nula. |
| `Reclamo` se asocia con `Clasificacion` | Una clasificación agrupa `0..*`; cada reclamo tiene `1` | RF-04/HU4, RF-05/HU5 y HU10. |
| `Proveedor` atiende `Reclamo` | Un proveedor atiende `0..*`; un reclamo tiene `0..1` proveedor | RF-07/HU13 contemplan reclamos todavía sin asignar. |
| `Proveedor` se relaciona con `Clasificacion` | Opcional y potencialmente muchos-a-muchos | HU14 requiere relacionarlos para sugerir proveedores, pero no limita ninguno de los lados a un solo elemento. |
| `Reclamo` tiene `Evidencia` | Un reclamo tiene `0..*` evidencias y cada evidencia pertenece a `1` reclamo | HU16 crea la primera y HU17 permite nuevos intentos. |
| `Usuario` registra `Solucion` | Un Usuario de proveedor registra `0..*`; cada solución tiene `1` autor | RF-24/HU16. |
| `Usuario` revisa `Solucion` | Un usuario revisa `0..*`; cada solución tiene `0..1` revisor | HU20. La asociación permanece vacía mientras la revisión está pendiente. |
| `Reclamo` genera `Notificacion` | Un reclamo genera `0..*`; cada notificación corresponde a `1` reclamo | RF-09/HU8. |
| `Usuario` recibe `Notificacion` | Un usuario recibe `0..*`; cada notificación tiene `1` destinatario | HU8 y las restricciones de acceso de RNF-01/RNF-03. |

## 5. Recorrido funcional

1. El Administrador registra un Usuario de edificio con sus datos personales y credenciales, asignándole el rol correspondiente según RF-01, RF-15, HU1 y HU3. El usuario puede registrarse inicialmente sin edificios asociados.

2. El Administrador asocia posteriormente el Usuario de edificio a uno o más edificios, conforme a RF-20 y HU25.

3. El Usuario de edificio crea un Reclamo ingresando una descripción, una clasificación y evidencia fotográfica, y selecciona obligatoriamente uno de los edificios a los que pertenece, según RF-04, RF-25 y HU4. El reclamo comienza en estado `INGRESADO`.

4. El Administrativo revisa el contenido, la clasificación y la prioridad del reclamo. Si el contenido es inválido o inapropiado, el reclamo pasa a `INVALIDO` y no continúa el proceso. Si es válido, pasa a `MODERADO`, conforme a RF-05, RF-06, HU5, HU6 y HU21.

5. El sistema presenta los proveedores relacionados con la clasificación del reclamo, según HU14. El Administrativo selecciona y confirma manualmente uno de ellos, conforme a RF-07 y HU13. El reclamo pasa a `ASIGNADO`.

6. Un Usuario de proveedor consulta las tareas correspondientes a su empresa y registra la finalización del trabajo con observaciones, materiales utilizados y al menos una evidencia fotográfica, según RF-13, RF-24, HU15, HU16 y HU19. El reclamo pasa a `PENDIENTE_APROBACION`.

7. El Usuario de edificio revisa las observaciones y evidencias presentadas por el proveedor. Si aprueba el trabajo, el reclamo pasa a `COMPLETADO`. Si lo rechaza, debe indicar un motivo y el reclamo pasa a `RECHAZADO`, según HU20.

8. Cuando el reclamo es rechazado, permanece asignado al mismo proveedor, quien puede corregir el trabajo y presentar una nueva resolución. En ese caso, el estado vuelve a `PENDIENTE_APROBACION`, conforme a RF-14 y HU17.

9. Durante el proceso, el sistema permite consultar los reclamos y las evidencias correspondientes, y genera notificaciones internas sobre actualizaciones relevantes, incluyendo la finalización del trabajo, conforme a RF-08, RF-09, RF-11, HU7, HU8, HU9, HU12 y HU18.

## 6. Ajustes detectados

| Hallazgo | Referencia | Ajuste recomendado |
|---|---|---|
| El enum `EstadoReclamo` del UML anterior no coincide con la máquina de estados definida en los requerimientos actualizados. | RF-05, RF-24, HU16, HU17, HU20 y máquina de estados. | Actualizar el enum con los estados `INGRESADO`, `INVALIDO`, `MODERADO`, `ASIGNADO`, `PENDIENTE_APROBACION`, `COMPLETADO` y `RECHAZADO`. |
| La relación entre `Usuario` y `Edificio` debe permitir registrar usuarios sin edificios asociados inicialmente. | RF-01, RF-20, RF-25, HU1 y HU25. | Verificar que la asociación sea de `0..*` a `0..*`. La selección de un edificio asociado será obligatoria únicamente al crear un reclamo. |
| La clase `Evidencia` permite almacenar múltiples archivos, pero no identifica explícitamente si corresponden al registro inicial o a la resolución del reclamo. | RF-11, RF-12, HU12, HU16, HU18 y HU19. | Incorporar un atributo `tipo` con los valores `INICIAL` y `RESOLUCION`, de acuerdo con el modelo de datos funcional mínimo. |
| La clase `Evidencia` no identifica explícitamente al usuario que registra cada archivo. | HU18 y modelo de datos funcional mínimo. | Incorporar una asociación con `Usuario` o representar el identificador del usuario responsable de cargar la evidencia. |
| Los métodos de todos los perfiles están concentrados en `Usuario`. | RF-16, HU3 y RNF-01. | Mantenerlo como simplificación del modelo, documentando que las operaciones están restringidas según el rol autenticado. |
| La relación entre `Proveedor` y `Clasificacion` no representa claramente los diferentes proveedores que pueden atender una misma categoría. | RF-07, HU13 y HU14. | Representar una asociación muchos a muchos que permita obtener los proveedores correspondientes a cada clasificación. La asignación del reclamo debe continuar siendo manual. |
| La clase `Solucion` representa los intentos de resolución, pero no aparece como entidad independiente en el modelo de datos funcional mínimo. | RF-14, RF-24, HU16, HU17 y HU20. | Mantenerla como decisión de diseño si se requiere conservar individualmente los intentos de resolución y sus revisiones, evitando sobrescribir información de soluciones rechazadas. |
| El atributo `password` del UML anterior no especifica que las contraseñas deben almacenarse protegidas. | RF-03, RNF-03 y RNF-10. | Utilizar `passwordHash` para representar el almacenamiento seguro de las credenciales y mantener coherencia con la justificación. |
| El modelo de datos funcional mínimo contempla un atributo `activo` para `Edificio`, que no se representa en el UML revisado. | RF-19, HU24 y modelo de datos funcional mínimo. | Evaluar la incorporación de `activo: boolean` para controlar la disponibilidad de los edificios sin eliminar sus registros. |
| La clase `Area` está representada en el UML, pero no aparece como entidad requerida explícitamente en las historias de usuario y los requerimientos funcionales vigentes. | RF-19, RF-25, HU4, HU24 y HU25. | Mantenerla únicamente si representa una necesidad adicional del sistema, documentándola como decisión de diseño, o retirarla para ajustar el modelo al alcance definido. |
| `direccionContacto` no aparece expresamente entre los datos obligatorios de un proveedor. | RF-18. | Mantenerlo como atributo opcional o retirarlo si el cliente no confirma su necesidad. |

## 7. Conclusión

El diagrama de clases UML de **SIRED** representa las principales entidades y relaciones necesarias para implementar el proceso de gestión de reclamos en edificios públicos, conforme a los requerimientos funcionales y las historias de usuario vigentes.

El modelo permite representar la autenticación y autorización de usuarios, su asociación con edificios, la creación y moderación de reclamos, la clasificación y asignación manual a proveedores, el registro de evidencias, la resolución de tareas y la aprobación o rechazo del trabajo realizado.

Los ajustes de los requerimientos establecen un ciclo de vida del reclamo compuesto por siete estados definidos, diferenciando la finalización del trabajo por parte del proveedor de su aprobación definitiva por parte del Usuario de edificio. Asimismo, permiten registrar usuarios sin edificios inicialmente asociados y contemplan el almacenamiento persistente de evidencias y notificaciones.

La estructura UML deberá mantenerse alineada con estas reglas y documentar como decisiones adicionales aquellas clases o atributos que no estén exigidos explícitamente por las historias de usuario. De esta manera, el diagrama conserva su trazabilidad con los requisitos del sistema y sirve como referencia para su implementación.
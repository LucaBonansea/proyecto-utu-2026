# Justificación del diagrama UML

## 1. Objetivo y fuentes

Este documento justifica el [diagrama de clases UML](UML_Proyecto.drawio.pdf) de **Portal Ciudadano** mediante su relación con la documentación vigente:

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
| `Solucion` | RF-12, RF-14, RF-24 | HU16, HU17, HU19, HU20 | EP-07 y EP-08 | Documenta el trabajo, su evidencia y su revisión |
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

### 3.2 `Edificio`

| Elemento | Justificación |
|---|---|
| Clase `Edificio` | RF-19/HU24 y el Control de cambios 2 requieren administrar edificios públicos. |
| `idEdificio` | HU24 exige como mínimo un identificador. |
| `nombre` y `direccion` | RF-19/HU24 indican que cada edificio debe contar con ID, nombre y dirección. |

La clase sustituye la geolocalización planteada inicialmente. El Control de cambios 2 establece que el reclamo debe ubicarse mediante el edificio asociado.

### 3.3 `Reclamo`, `EstadoReclamo` y `Prioridad`

| Elemento | Justificación |
|---|---|
| Clase `Reclamo` | RF-04/HU4. Es la clase central porque conecta al creador, edificio, clasificación, proveedor, soluciones y notificaciones. |
| `idReclamo` | Identifica cada incidencia durante su creación, asignación, resolución y consulta. |
| `descripcion` | RF-04/HU4 y entrevista P10, P13 y P16. |
| `fechaCreacion` | Permite ordenar los reclamos y consultar su avance según RF-08/HU7. |
| `nombreArchivo`, `ruta` y `tipo` | Representan la evidencia inicial exigida por RF-04/HU4. `ruta` es coherente con el almacenamiento en filesystem de RNF-05. |
| `estado: EstadoReclamo` | RF-08/HU7 requieren mostrar el avance; RF-09/HU8 utiliza sus cambios para notificar; HU20 establece el cierre como `Completado`. |
| `prioridad: Prioridad` | RF-06/HU6 permiten identificar casos urgentes. La entrevista P7 y P8 explica esta necesidad. |
| Enum `Prioridad` | `ESTANDAR` y `URGENTE` representan el alcance vigente. El Project Charter excluye la asignación automática de prioridad. |
| Enum `EstadoReclamo` | Mantiene un conjunto controlado de etapas para HU7, HU8, HU15, HU16, HU17 y HU20. |

`Prioridad` y `EstadoReclamo` son enumeraciones porque contienen valores cerrados sin datos propios. `Clasificacion` es una clase porque sus valores pueden administrarse durante la operación del sistema.

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

Separar `Proveedor` de `Usuario` responde a RF-22/RF-23/HU27: una empresa puede tener uno o más Usuarios de proveedor que actúan en su representación.

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

La solución se separa del reclamo porque representa una intervención posterior realizada por otro rol. La relación admite varios intentos para no sobrescribir las soluciones rechazadas contempladas por HU17.

### 3.7 `Notificacion`

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
| `Usuario` pertenece a `Edificio` | Muchos a muchos; un Usuario de edificio pertenece a `1..*` edificios | RF-20/HU25. Un edificio puede agrupar a varios usuarios. |
| `Edificio` tiene `Reclamo` | Un edificio tiene `0..*`; cada reclamo pertenece a `1` edificio | RF-25/HU25. El edificio sustituye la geolocalización eliminada por el Cambio 2. |
| `Usuario` pertenece a `Proveedor` | Un proveedor tiene `1..*` Usuarios de proveedor; cada uno pertenece a `1` proveedor | RF-22, RF-23 y HU27. Para los demás roles la asociación es nula. |
| `Reclamo` se asocia con `Clasificacion` | Una clasificación agrupa `0..*`; cada reclamo tiene `1` | RF-04/HU4, RF-05/HU5 y HU10. |
| `Proveedor` atiende `Reclamo` | Un proveedor atiende `0..*`; un reclamo tiene `0..1` proveedor | RF-07/HU13 contemplan reclamos todavía sin asignar. |
| `Proveedor` se relaciona con `Clasificacion` | Opcional y potencialmente muchos-a-muchos | HU14 requiere relacionarlos para sugerir proveedores, pero no limita ninguno de los lados a un solo elemento. |
| `Reclamo` tiene `Solucion` | Un reclamo tiene `0..*`; cada solución pertenece a `1` reclamo | HU16 crea la primera y HU17 permite nuevos intentos. |
| `Usuario` registra `Solucion` | Un Usuario de proveedor registra `0..*`; cada solución tiene `1` autor | RF-24/HU16. |
| `Usuario` revisa `Solucion` | Un usuario revisa `0..*`; cada solución tiene `0..1` revisor | HU20. La asociación permanece vacía mientras la revisión está pendiente. |
| `Reclamo` genera `Notificacion` | Un reclamo genera `0..*`; cada notificación corresponde a `1` reclamo | RF-09/HU8. |
| `Usuario` recibe `Notificacion` | Un usuario recibe `0..*`; cada notificación tiene `1` destinatario | HU8 y las restricciones de acceso de RNF-01/RNF-03. |

## 5. Recorrido funcional

1. El Administrador registra un `Usuario` y le asigna un rol según RF-01, RF-15, HU1 y HU3.
2. El Usuario de edificio se asocia con uno o más `Edificio` mediante RF-20/HU25.
3. El usuario crea un `Reclamo` con descripción, evidencia, clasificación y uno de sus edificios, según RF-04/HU4 y RF-25/HU25.
4. El Administrativo modera, clasifica y prioriza mediante RF-05, RF-06, HU5, HU6 y HU21.
5. El reclamo se asigna a un `Proveedor` según RF-07/HU13, utilizando la relación con `Clasificacion` para la sugerencia de HU14.
6. Un Usuario de proveedor registra una `Solucion` y su evidencia mediante RF-12, RF-24, HU16 y HU19.
7. El Usuario de edificio aprueba o rechaza la solución según HU20. Un rechazo habilita otro intento conforme a HU17.
8. El sistema genera una `Notificacion` por RF-09/HU8 y permite consultar el estado y las evidencias mediante RF-08, RF-11, HU7, HU9 y HU12.

## 6. Ajustes detectados

| Hallazgo | Referencia | Ajuste recomendado |
|---|---|---|
| El enum usa `ENVIADO`, `ACEPTADO`, `EN_PROCESO` y `TERMINADO`, mientras el Control de cambios 1 menciona `Ingreso`, `Validado`, `En proceso` y `Completado` | Control de cambios 1 y HU20 | Unificar los nombres del ciclo de estados. |
| Los campos de archivo permiten representar una sola evidencia, pero la documentación admite varias | HU9, HU12, HU16, HU18 y HU19 | Incorporar una clase `Evidencia` con relaciones hacia `Reclamo` y, opcionalmente, `Solucion`. El backend ya incluye este modelo. |
| Falta un estado de cuenta para desactivar Usuarios de proveedor | HU27 | Incorporar `activo: boolean` en `Usuario` u otro mecanismo explícito. |
| Los métodos de todos los perfiles están concentrados en `Usuario` | RF-16, HU3 y RNF-01 | Mantenerlo como simplificación, pero documentar las restricciones por rol o separar responsabilidades. |
| La relación `Proveedor`-`Clasificacion` no expresa claramente varios candidatos y especialidades | HU14 | Representarla como muchos-a-muchos; si existe un proveedor predeterminado, modelarlo como una regla adicional. |
| `direccionContacto` no aparece expresamente entre los campos obligatorios | RF-18 | Mantenerla opcional o retirarla si el cliente no la confirma. |

## 7. Conclusión

El UML representa el flujo principal de Portal Ciudadano y sus clases se derivan de necesidades documentadas. Su estructura permite identificar quién crea el reclamo, dónde ocurre, cómo se clasifica y asigna, quién registra la solución y quién recibe las notificaciones. Los ajustes señalados evitan justificar como definitivas decisiones que todavía contradicen las HU o el Control de cambios.

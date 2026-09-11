# Justificación del Modelo Entidad-Relación

## 1. Objetivo y fuentes

Este documento justifica el [Modelo Entidad-Relación](MER_proyecto_final.drawio.pdf) de **Portal Ciudadano**. Cada entidad, campo y cardinalidad se relaciona con la documentación vigente:

- [Épicas y requerimientos](../requerimientos/epicas_y_requerimientos.md).
- [Historias de usuario](../historias_de_usuario/HU.md).
- [Control de cambios](../Control_de_cambios.md), especialmente el Cambio 2.
- [Entrevista al cliente](../entrevista/Entrevista_Reclamos_Ciudadanos.md).
- [Project Charter](../project_charter.md).

El MER transforma en entidades las clases cuyo estado debe conservarse. Esto responde a RNF-06, que exige persistencia entre sesiones, y RNF-08, que exige centralizar reclamos, usuarios, edificios y proveedores.

Las enumeraciones `Roles`, `EstadoReclamo` y `Prioridad` no se convierten en entidades independientes porque representan conjuntos cerrados sin atributos propios. Se almacenan como dominios controlados dentro de `Usuario` y `Reclamo`.

## 2. Trazabilidad general

| Entidad | Requerimientos | Historias de usuario | Motivo de persistencia |
|---|---|---|---|
| `Usuario` | RF-01, RF-02, RF-03, RF-15, RF-16, RF-21, RF-22, RF-23 | HU1, HU2, HU3, HU26, HU27 | Conserva identidad, credenciales y rol |
| `Edificio` | RF-19, RF-20, RF-25 | HU24, HU25 | Conserva edificios públicos y su relación con usuarios y reclamos |
| `Reclamo` | RF-04, RF-05, RF-06, RF-08, RF-10, RF-25 | HU4, HU5, HU6, HU7, HU10, HU21 | Conserva la incidencia y su avance |
| `Clasificacion` | RF-04, RF-05 | HU4, HU5, HU10, HU14, HU23 | Mantiene un catálogo administrable de problemas |
| `Proveedor` | RF-07, RF-13, RF-17, RF-18, RF-22 | HU13, HU14, HU15, HU22, HU27 | Conserva las empresas responsables y sus datos |
| `Solucion` | RF-12, RF-14, RF-24 | HU16, HU17, HU19, HU20 | Conserva cada intento de resolución y su revisión |
| `Notificacion` | RF-09 | HU8 | Conserva avisos vinculados con usuario y reclamo |

## 3. Justificación de entidades y campos

### 3.1 `Usuario`

| Campo | Justificación |
|---|---|
| `cedula` PK | RF-01 y RF-23 requieren registrar la cédula. El diagrama la utiliza para identificar al usuario. |
| `nombre` | RF-01/HU1 y RF-23/HU27. |
| `telefono` | RF-01/RF-02/HU1. `varchar(9)` conserva el cero inicial y permite validar el formato solicitado. |
| `passwordHash` | RF-03/HU2 y protección de credenciales según RNF-03/RNF-10. |
| `rol` | RF-15/HU3. Permite aplicar el control de acceso de RF-16/RNF-01. |

Una sola entidad evita duplicar datos y autenticación. Las asociaciones con `Edificio` y `Proveedor` representan la información específica de los roles Usuario de edificio y Usuario de proveedor.

### 3.2 `Edificio`

| Campo | Justificación |
|---|---|
| `id` PK | Identificador mínimo solicitado por RF-19/HU24. |
| `nombre` | RF-19/HU24 y listado administrativo de HU10. |
| `direccion` | RF-19/HU24. Ubica el reclamo después de eliminar la geolocalización mediante el Control de cambios 2. |

### 3.3 `Reclamo`

| Campo | Justificación |
|---|---|
| `id` PK | Identifica la incidencia durante todo su ciclo. |
| `descripcion` | RF-04/HU4. |
| `fechaCreacion` | Permite ordenar y consultar el avance según RF-08/HU7. |
| `estado` | RF-08/HU7, RF-09/HU8 y HU20. |
| `prioridad` | RF-06/HU6. |
| `rutaArchivo` | Representa la evidencia inicial de RF-04/HU4. Guardar la ruta es coherente con el filesystem definido en RNF-05. |

Las relaciones añaden las referencias al creador, edificio, clasificación y proveedor. En el modelo lógico o físico deben materializarse mediante claves foráneas, aunque el MER conceptual utilice rombos.

### 3.4 `Clasificacion`

| Campo | Justificación |
|---|---|
| `id` PK | Mantiene identidad estable aunque se modifique el nombre. |
| `nombre` | RF-04, RF-05 y HU23. Permite listar, filtrar y modificar las categorías. |

Se utiliza una entidad y no un enum porque HU23 permite crear y editar clasificaciones sin modificar el esquema de la base de datos.

### 3.5 `Proveedor`

| Campo | Justificación |
|---|---|
| `RUT` PK | Identificador empresarial solicitado en RF-18. Se representa como `varchar` porque no se utiliza para cálculos. |
| `Nombre` y `razonSocial` | Nombre comercial y razón social indicados por RF-18. |
| `direccion`, `telefono` y `correo` | Datos de contacto empresarial de RF-18/HU22. |
| `activo` | HU22 exige desactivar proveedores sin eliminar sus asociaciones históricas. |
| Campos terminados en `Contacto` | Representan al contacto responsable solicitado por RF-18 y el Control de cambios 2. |

`Proveedor` se mantiene separado de `Usuario` porque es una empresa. RF-22/RF-23/HU27 indican que una empresa puede tener uno o más usuarios que trabajan en su representación.

### 3.6 `Solucion`

| Campo | Justificación |
|---|---|
| `id` PK | Distingue los distintos intentos de resolución admitidos por HU17. |
| `observaciones` | RF-24/HU16. |
| `materialesUtilizados` | Criterio de aceptación de HU16. |
| `fechaHora` | HU16 y entrevista P30. |
| `estadoRevision` | HU20 requiere distinguir `PENDIENTE`, `APROBADA` y `RECHAZADA`. |
| `motivoRechazo` | Es obligatorio cuando se rechaza según HU20 y debe consultarse durante el reproceso de HU17. |
| `rutaArchivo` | Evidencia obligatoria de RF-12/HU16/HU19 almacenada en filesystem según RNF-05. |

Permitir varias soluciones por reclamo conserva los intentos rechazados en lugar de sobrescribirlos. Esto aporta la trazabilidad necesaria para HU17 sin incorporar el historial completo excluido por el Project Charter.

### 3.7 `Notificacion`

| Campo | Justificación |
|---|---|
| `id` PK | Identifica cada aviso. |
| `mensaje` | Informa el cambio relevante exigido por HU8. |
| `fechaHora` | Permite ordenar y contextualizar las notificaciones. |

Las relaciones con `Usuario` y `Reclamo` indican quién recibe el mensaje y qué incidencia lo generó.

## 4. Justificación de relaciones y cardinalidades

| Relación | Cardinalidad | Implementación relacional esperada | Justificación |
|---|---|---|---|
| `Usuario` - `Edificio` | Muchos a muchos | Tabla intermedia con `usuario_id` y `edificio_id` | RF-20/HU25 permiten varios edificios por usuario y varios usuarios por edificio. |
| `Usuario` - `Proveedor` | Muchos usuarios a un proveedor; opcional para el usuario genérico | FK `proveedor_id` nullable en `Usuario`, obligatoria para `Usuario_proveedor` | RF-22/RF-23/HU27. |
| `Usuario` - `Reclamo` | Uno a muchos | FK no nula del creador en `Reclamo` | RF-04/HU4 y consulta de reclamos propios de RF-08/HU7. |
| `Edificio` - `Reclamo` | Uno a muchos | FK no nula `edificio_id` en `Reclamo` | RF-25/HU25. Cada reclamo corresponde a uno de los edificios del creador. |
| `Clasificacion` - `Reclamo` | Uno a muchos | FK `clasificacion_id` en `Reclamo` | RF-04/HU4, RF-05/HU5 y filtros de HU10. |
| `Proveedor` - `Reclamo` | Un proveedor atiende muchos; un reclamo tiene cero o uno | FK nullable `proveedor_id` en `Reclamo` | HU13 contempla reclamos todavía sin asignar. |
| `Proveedor` - `Clasificacion` | Muchos a muchos y opcional en ambos lados | Tabla intermedia con `proveedor_id` y `clasificacion_id` | HU14 permite sugerir proveedores según la clasificación y contempla que la relación pueda no existir. |
| `Reclamo` - `Solucion` | Uno a muchos | FK no nula `reclamo_id` en `Solucion` | HU16 crea una solución y HU17 permite nuevos intentos. |
| `Usuario` - `Solucion` (`registrar`) | Uno a muchos | FK no nula `registrada_por_id` | RF-24/HU16 permiten identificar al Usuario de proveedor que registró el trabajo. |
| `Usuario` - `Solucion` (`revisar`) | Uno a muchos; cero o un revisor por solución | FK nullable `revisada_por_id` | HU20. La referencia permanece vacía mientras la solución está pendiente. |
| `Reclamo` - `Notificacion` | Uno a muchos | FK no nula `reclamo_id` | RF-09/HU8 vinculan el aviso con un reclamo concreto. |
| `Usuario` - `Notificacion` | Uno a muchos | FK no nula `usuario_id` | HU8 y las restricciones de acceso de RNF-01/RNF-03. |

## 5. Decisiones del modelo relacional

| Decisión | Justificación | Referencia |
|---|---|---|
| Una entidad común `Usuario` | Evita duplicar datos y credenciales; el rol determina los permisos | RF-03, RF-15, RF-16, HU2, HU3 |
| `Proveedor` separado de `Usuario` | El proveedor es una empresa con varias cuentas asociadas | RF-17, RF-18, RF-22, RF-23, HU22, HU27 |
| Relación N:M entre usuario y edificio | Refleja la pertenencia real definida por el cambio de alcance | RF-20, HU25 |
| FK de edificio en reclamo | Ubica la incidencia sin depender de geolocalización | RF-25, HU25, Cambio 2 |
| `Clasificacion` como tabla | Sus valores son administrables y no fijos | HU23 |
| Estado y prioridad como dominios cerrados | No tienen identidad ni atributos propios | RF-06, RF-08, HU6, HU7 |
| FK de proveedor nullable en reclamo | El reclamo existe antes de su asignación | RF-07, HU13 |
| Varias soluciones por reclamo | Conserva cada reproceso rechazado | RF-14, HU17, HU20 |
| `motivoRechazo` nullable | Solo corresponde a soluciones rechazadas | HU17, HU20 |
| Rutas de archivos en lugar de binarios | Los archivos se almacenan en filesystem | RNF-05 |
| `Proveedor.activo` en lugar de borrado físico | Evita nuevas asignaciones sin perder referencias históricas | HU22 |
| Sin historial general | El historial completo y la reapertura están fuera del alcance inicial | Project Charter, alcance excluido 4 y 5 |
| Sin geolocalización | Fue reemplazada por la asociación con edificio | RF-25, HU25, Cambio 2 |
| Sin Kanban | HU11 fue cancelada | Control de cambios 1 |
| Sin estadísticas | Se prioriza el flujo principal en la primera versión | Project Charter, alcance excluido 7 |

## 6. Recorrido funcional del modelo

1. El Administrador registra `Usuario` y establece su rol según RF-01, RF-15, HU1 y HU3.
2. El Usuario de edificio se vincula con uno o más registros de `Edificio` mediante la tabla intermedia requerida por RF-20/HU25.
3. El usuario crea un `Reclamo` vinculado con su cuenta, un edificio y una clasificación según RF-04/HU4 y RF-25/HU25.
4. El Administrativo actualiza clasificación y prioridad mediante RF-05, RF-06, HU5 y HU6.
5. La FK de proveedor comienza vacía y se completa al realizar la asignación de RF-07/HU13.
6. Un Usuario de proveedor crea una `Solucion` con observaciones, materiales, fecha, hora y evidencia según RF-12, RF-24, HU16 y HU19.
7. La solución queda pendiente hasta que el Usuario de edificio la aprueba o rechaza según HU20. Si se rechaza, HU17 permite insertar otra solución sin borrar la anterior.
8. Cada actualización relevante genera una `Notificacion` asociada con el reclamo y su destinatario según RF-09/HU8.

## 7. Ajustes detectados

| Hallazgo | Referencia | Ajuste recomendado |
|---|---|---|
| `cedula` aparece como `int` | RF-01, RF-23 y naturaleza del dato | Usar `varchar`, porque es un identificador y no una magnitud. |
| La cédula es PK, pero documentos anteriores indican teléfono o correo como identificador único | Entrevista P38 y acta del 28/7 | Definir una regla vigente. Se recomienda una PK interna y restricciones `UNIQUE` para cédula y teléfono. |
| Falta un campo para desactivar usuarios individuales | HU27 | Incorporar `activo: boolean` en `Usuario`; `Proveedor.activo` no sustituye el estado de sus cuentas. |
| Los campos de archivo solo representan una evidencia | HU9, HU12, HU16, HU18 y HU19 | Incorporar `Evidencia` con FK obligatoria a `Reclamo` y FK opcional a `Solucion`. El backend ya posee una tabla y un modelo de evidencias. |
| No se muestran explícitamente las claves foráneas | RNF-06 y relaciones del MER | Incorporar las FK descritas en la sección 4 al pasar al modelo lógico/físico. |
| La cardinalidad `Proveedor`-`Reclamo` debe admitir reclamos sin asignar | HU13 | Mantener `proveedor_id` nullable hasta la asignación. |
| La cardinalidad `Proveedor`-`Clasificacion` resulta ambigua | HU14 | Utilizar una tabla intermedia N:M; cualquier proveedor predeterminado debe modelarse como una regla adicional. |
| Los estados no coinciden entre todos los documentos y el UML | Control de cambios 1 y HU20 | Definir un único catálogo de estados compartido por UML, MER y backend. |
| El Project Charter conserva geolocalización y roles anteriores | Control de cambios 2 | Actualizarlo; para el modelo vigente prevalece el Control de cambios 2. |

## 8. Requerimientos no funcionales fuera del MER

| Requerimiento | Tratamiento |
|---|---|
| RNF-01, control de acceso | El campo `rol` colabora con la autorización, pero los permisos se implementan en el backend. |
| RNF-02, validación | Los tipos y longitudes aportan restricciones; las reglas completas se aplican en la aplicación. |
| RNF-03 y RNF-10, protección de datos | Justifican el hash de contraseña, las relaciones con propietarios y el acceso restringido. |
| RNF-04, PWA mobile-first | Corresponde a la interfaz y no genera entidades. |
| RNF-05, arquitectura | Justifica MySQL y el almacenamiento de rutas de archivos. |
| RNF-06, persistencia | Justifica la transformación de objetos con estado en entidades. |
| RNF-07, integración segura | Corresponde al backend; TuID fue excluido. |
| RNF-08, centralización | Se materializa al conservar todas las entidades en una base común. |
| RNF-09, experiencia sencilla | Corresponde principalmente a la interfaz; `Clasificacion` permite ofrecer opciones controladas. |

## 9. Conclusión

El MER conserva la información necesaria para recorrer el reclamo desde su creación hasta su resolución. Las entidades y relaciones principales se encuentran respaldadas por RF, HU y decisiones de alcance. Los ajustes identificados, especialmente la entidad `Evidencia`, las claves foráneas y los identificadores de usuario, deben incorporarse para que el modelo lógico refleje completamente la documentación y la implementación vigente.

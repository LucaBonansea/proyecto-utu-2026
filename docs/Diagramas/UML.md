# 5. Justificación de clases, atributos y métodos

## 5.1 Usuario

| Elemento | Justificación |
|---|---|
| Clase abstracta Usuario | RF-03 y HU2 requieren que las personas registradas inicien sesión. Se modela como abstracta porque comparten datos de acceso, pero los cuatro roles tienen responsabilidades diferentes. |
| cedula, nombre, telefono | RF-01 y HU1 exigen registrar nombre, cédula y teléfono para el Usuario de edificio. RF-23 y HU27 también exigen cédula, nombre y teléfono para el Usuario de proveedor. |
| passwordHash | RF-01, RF-03, RF-21, HU1, HU2 y HU26 requieren contraseña para acceso y restablecimiento. Se almacena un hash, no la contraseña en texto plano, por RNF-03 y RNF-10. |
| iniciarSesion() | RF-03 y HU2. Permite autenticar al usuario y habilitar funcionalidades según el rol. |
| cerrarSesion() | Complementa el inicio de sesión y favorece la protección de datos personales exigida por RNF-03. |

## 5.2 Usuario de edificio

| Elemento | Justificación |
|---|---|
| Clase UsuarioEdificio | RF-01, RF-04, RF-08, RF-09, RF-11 y HU1, HU4, HU7, HU8, HU9 y HU12. Representa a quien reporta problemas vinculados a edificios. |
| Herencia de Usuario | Comparte credenciales y datos personales con los demás tipos de usuario, pero posee funcionalidades específicas de reclamos. |
| crearReclamo() | RF-04 y HU4. El usuario puede crear un reclamo con descripción, evidencia y clasificación. |
| consultarReclamosPropios() | RF-08 y HU7. Permite consultar únicamente los reclamos realizados por el propio usuario. |
| validarSolucion() | HU20. El Usuario de edificio revisa las observaciones y evidencias cargadas por el Usuario de proveedor antes del cierre definitivo del reclamo. |

## 5.3 Administrador

| Elemento | Justificación |
|---|---|
| Clase Administrador | RF-01, RF-10, RF-17 a RF-23, HU1, HU22 a HU27. Es el rol responsable de administrar datos maestros y cuentas. |
| gestionarEdificios() | RF-19 y HU24. El Administrador registra, modifica, consulta y desactiva edificios. |
| gestionarProveedores() | RF-17, RF-18 y HU22. Administra las empresas proveedoras y puede desactivarlas. |
| gestionarUsuariosEdificio() | RF-01, RF-20, HU1 y HU25. Registra usuarios de edificio y administra su pertenencia a edificios. |
| gestionarUsuariosProveedor() | RF-22, RF-23 y HU27. Registra, modifica, asocia y desactiva usuarios de proveedor. |
| gestionarClasificaciones() | HU23. Permite crear y editar las clasificaciones disponibles para los reclamos. |
| restablecerContrasena() | RF-21 y HU26. El Administrador puede restablecer credenciales de usuarios de edificio y usuarios de proveedor. |
| verReclamos() | RF-10. Puede visualizar reclamos de acuerdo con los permisos del rol. |

## 5.4 Administrativo

| Elemento | Justificación |
|---|---|
| Clase Administrativo | RF-05 a RF-07, RF-10, HU5, HU6, HU10, HU13, HU20 y HU21. Representa al personal que gestiona el flujo operativo de los reclamos. |
| moderarReclamo() | RF-05, HU5 y HU21. Permite validar el contenido o marcar un reclamo como inválido o inapropiado. |
| asignarProveedor() | RF-07 y HU13. Asigna un reclamo clasificado a una empresa proveedora. |
| verReclamos() | RF-10 y HU10. Permite listar, buscar y filtrar reclamos por clasificación. |

## 5.5 Proveedor

| Elemento | Justificación |
|---|---|
| Clase Proveedor | RF-17, RF-18 y HU22. Representa a la empresa u organización que presta el servicio de resolución. No debe heredar de Usuario, porque RF-15 establece que no constituye una cuenta de acceso. |
| rut | RF-18. Identifica fiscalmente al proveedor. |
| razonSocial | RF-18. Permite registrar la identidad comercial de la empresa. |
| direccion, telefono, correo, contactoResponsable | RF-18. Son los datos requeridos para administrar y contactar al proveedor. |
| activo | HU22. Un proveedor desactivado no puede recibir nuevas asignaciones. |


## 5.6 Usuario de proveedor

| Elemento | Justificación |
|---|---|
| Clase UsuarioProveedor | RF-15, RF-22, RF-23, RF-24, HU15, HU16, HU17 y HU27. Es la persona que trabaja para una empresa proveedora y posee una cuenta de acceso. |
| Herencia de Usuario | Comparte credenciales y datos personales con los demás usuarios del sistema. |
| consultarTareasAsignadas() | RF-13 y HU15. Permite visualizar sólo reclamos asignados al proveedor al que pertenece. |
| finalizarTarea() | RF-24 y HU16. Registra observaciones, materiales utilizados, fecha, hora y evidencia del trabajo realizado. |


## 5.7 Edificio

| Elemento | Justificación |
|---|---|
| Clase Edificio | RF-19, RF-20, RF-25, HU24 y HU25. Actualmente falta en el diagrama, aunque es central en el dominio. |
| idEdificio, nombre, direccion | RF-19 y HU24 exigen estos datos como mínimo. |

## 5.8 Reclamo

| Elemento | Justificación |
|---|---|
| Clase Reclamo | RF-04 a RF-14, RF-24, RF-25 y HU4 a HU21. Es la entidad central que representa un problema informado en un edificio. |
| idReclamo | Identifica de forma única cada reclamo. |
| descripcion | RF-04 y HU4. Describe el problema reportado. |
| fechaCreacion | Permite registrar cuándo fue creado el reclamo y ordenar o consultar su avance. |
| estado: EstadoReclamo | RF-08, HU7, HU17, HU20 y HU21. Permite conocer y controlar la etapa del flujo. |
| prioridad: Prioridad | RF-06 y HU6. Permite marcar un reclamo como urgente. |
| Asociación con Clasificacion | RF-04, RF-05, HU4, HU5, HU10 y HU23. Todo reclamo debe tener una clasificación seleccionada y validable. |
| Asociación con Edificio | RF-25 y HU25. Cada reclamo pertenece a un edificio al que está asociado su autor. |
| Asociación con Proveedor | RF-07 y HU13. Un reclamo puede estar sin asignar inicialmente y luego ser asignado a una empresa proveedora. |

## 5.9 Clasificación

| Elemento | Justificación |
|---|---|
| Clase Clasificacion | RF-04, RF-05, HU4, HU5 y HU23. Debe existir como entidad independiente porque las categorías son administrables y no valores fijos. |
| idClasificacion, nombre | HU23 exige crear y administrar clasificaciones por nombre. |


## 5.10 Solución

| Elemento | Justificación |
|---|---|
| Clase Solucion | RF-12, RF-14, RF-24, HU16, HU17, HU19 y HU20. Actualmente falta en el diagrama y es necesaria para representar formalmente el trabajo realizado. |
| idSolucion | Identifica cada intento de resolución. |
| observaciones, materialesUtilizados | HU16 exige registrar ambos datos antes de finalizar el trabajo. |
| fechaHora | HU16 exige registrar fecha y hora de finalización. |
| estadoRevision | HU20 requiere que una solución pueda estar pendiente, aprobada o rechazada. |
| motivoRechazo | HU17 y HU20 exigen indicar obligatoriamente el motivo cuando el Administrativo rechaza la solución. |
| Varios registros de solución por reclamo | HU17 permite reprocesar una tarea rechazada y volver a registrar observaciones y evidencias. Mantener soluciones anteriores evita perder trazabilidad. |

## 5.11 Evidencia

| Elemento | Justificación |
|---|---|
| Clase Evidencia | RF-04, RF-11, RF-12, HU4, HU9, HU12, HU16, HU18 y HU19. Permite almacenar las fotografías y archivos asociados al reclamo y a su resolución. |
| idEvidencia | Identifica el archivo registrado. |
| nombreArchivo, rutaArchivo, tipoMime, fechaCarga | RNF-05 establece almacenamiento de archivos en filesystem; estos atributos permiten localizar, identificar y consultar el archivo. |


## 5.12 Notificación

| Elemento | Justificación |
|---|---|
| Clase Notificacion | RF-09 y HU8. Registra los avisos internos enviados al Usuario de edificio. |
| idNotificacion, mensaje, fechaHora | Permiten identificar el aviso, comunicar el cambio ocurrido y conocer cuándo se generó. |



# 6. Justificación de relaciones y multiplicidades

| Relación | Multiplicidad | Justificación |
|---|---|---|
| Usuario — UsuarioEdificio, Administrador, Administrativo, UsuarioProveedor | Generalización | RF-15, RF-16, HU2 y HU3. Todos son usuarios autenticados, pero cada rol tiene permisos y operaciones diferentes. |
| Proveedor — UsuarioProveedor | Un proveedor 0..* usuarios de proveedor; cada UsuarioProveedor 1 proveedor | RF-22, RF-23 y HU27. Una empresa puede tener varias personas trabajando para ella, pero cada UsuarioProveedor debe pertenecer a un único proveedor. |
| UsuarioEdificio — Edificio | Un UsuarioEdificio pertenece a 1..* edificios; un edificio puede tener 0..* usuarios | RF-20 y HU25. El requisito establece expresamente que un usuario puede asociarse a uno o más edificios. Por eso debe eliminarse el atributo único edificio: Edificio de UsuarioEdificio y conservar esta relación. |
| UsuarioEdificio — Reclamo | Un UsuarioEdificio realiza 0..* reclamos; cada Reclamo es realizado por 1 UsuarioEdificio | RF-04, RF-08, HU4 y HU7. Permite identificar al creador del reclamo y consultar únicamente los reclamos propios. |
| Edificio — Reclamo | Un edificio tiene 0..* reclamos; cada Reclamo pertenece a 1 edificio | RF-25 y HU25. Todo reclamo debe estar asociado al edificio sobre el que se informa el problema. |
| Restricción UsuarioEdificio–Edificio–Reclamo | Regla de negocio | HU25. El edificio elegido al crear un reclamo debe ser uno de los edificios a los que pertenece el Usuario de edificio que lo realiza. |
| Clasificacion — Reclamo | Una Clasificacion puede estar asociada a 0..* reclamos; cada Reclamo tiene 1 clasificación | RF-04, RF-05, HU4 y HU5. El usuario selecciona una clasificación al crear el reclamo y el Administrativo puede validarla o modificarla. |
| Proveedor — Clasificacion | Muchos a muchos: un proveedor puede atender 0..* clasificaciones y una clasificación puede ser atendida por 0..* proveedores | HU14. Esta relación permite sugerir proveedores de acuerdo con la clasificación del reclamo. Debe agregarse al MER. |
| Proveedor — Reclamo | Un proveedor puede tener 0..* reclamos asignados; un Reclamo puede tener 0..1 proveedor | RF-07 y HU13. Un reclamo recién creado todavía puede no estar asignado; luego el Administrativo lo asigna a una empresa proveedora. |
| Reclamo — Solucion | Un Reclamo puede tener 0..* soluciones; cada Solucion pertenece a 1 reclamo | RF-24, HU16, HU17 y HU20. Puede haber más de una solución cuando el Usuario de edificio rechaza una resolución y el proveedor debe volver a trabajar. |
| UsuarioProveedor — Solucion | Un UsuarioProveedor puede registrar 0..* soluciones; cada Solucion es enviada por 1 UsuarioProveedor | RF-24 y HU16. Permite saber quién registró las observaciones y evidencias de cada trabajo realizado. |
| UsuarioEdificio — Solucion | Un UsuarioEdificio puede revisar 0..* soluciones; una Solucion puede ser revisada por 0..1 UsuarioEdificio | HU20. Una solución pendiente todavía no fue revisada; al aprobarla o rechazarla, el Usuario de edificio realiza la validación. |
| Restricción UsuarioEdificio–Solucion | Regla de negocio | HU20. Sólo el Usuario de edificio que creó el reclamo asociado puede aprobar o rechazar su solución. |
| Reclamo — Evidencia | Un Reclamo puede contener 0..* evidencias; cada Evidencia pertenece a 1 reclamo | RF-04, RF-11, HU4, HU9 y HU18. Permite conservar y consultar las evidencias iniciales y las de resolución dentro del reclamo correspondiente. |
| Solucion — Evidencia | Una Solucion debe tener 1..* evidencias de resolución; una Evidencia puede pertenecer a 0..1 solución | RF-12, HU16 y HU19. Para finalizar una tarea debe existir al menos una fotografía que documente el trabajo realizado. Las evidencias iniciales pertenecen sólo al reclamo; las de resolución se vinculan además a una solución. |
| UsuarioEdificio — Notificacion | Un UsuarioEdificio recibe 0..* notificaciones; cada Notificacion tiene 1 destinatario | RF-09 y HU8. Cada aviso se dirige al usuario propietario del reclamo actualizado. |
| Reclamo — Notificacion | Un Reclamo puede generar 0..* notificaciones; cada Notificacion se vincula a 1 reclamo | RF-09 y HU8. La notificación informa una actualización específica ocurrida sobre un reclamo. Debe agregarse esta relación al MER. |
| Proveedor — Contacto | Cada Proveedor tiene 1 Contacto responsable; cada Contacto pertenece a 1 proveedor | RF-18. El requisito pide registrar los datos de un contacto responsable de la empresa. Si mantenés la clase Contacto, eliminá el atributo textual contactoResponsable de Proveedor, porque duplicaría la misma información. |

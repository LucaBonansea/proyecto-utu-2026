# Control de cambios

## Cambio 1

### Fecha: 21/8/2026
**Cambio:** Se cancela RF-11 (Gestión mediante Kanban) y, en consecuencia, la historia HU11 (Tablero Kanban) queda fuera del alcance del proyecto.

**Justificación:** El equipo ya cuenta con las tres interfaces definidas para la Intendencia (PWA Ciudadanía, Dashboard Comuna, Frontend Equipos/Proveedores), por lo que agregar una vista adicional de tablero Kanban dentro del Dashboard Comuna resulta redundante y poco práctico dado el plazo ajustado del proyecto. La visualización y gestión de reclamos por parte del personal de la comuna se seguirá cubriendo mediante RF-10 (listado de reclamos con filtro por área) y el campo de estado de cada reclamo (Ingreso, Validado, En proceso, Completado), sin necesidad de una representación visual tipo tablero.

**Impacto:**
- Se elimina HU11 (8 puntos) del backlog priorizado.
- La épica EP-04 (Gestión interna de reclamos) pasa a cubrirse únicamente con HU10 y HU12.
- El Sprint 4, que incluía HU11, libera 8 puntos de capacidad, que pueden reasignarse a otra historia pendiente o usarse como colchón ante retrasos.

## Cambio 2

### Fecha: 3/9/2026

**Cambio:** Modificación del alcance del proyecto.

**Justificación:**  
El proyecto, originalmente orientado a la gestión de reclamos ciudadanos, pasa a enfocarse en la gestión de reclamos realizados por usuarios habilitados pertenecientes a uno o más edificios públicos de la Intendencia.

**Impacto:**

- El sistema estará orientado a la gestión de reclamos realizados por usuarios de edificio previamente registrados y habilitados por el Administrador.
- Cada usuario de edificio podrá pertenecer a uno o más edificios públicos.
- Los reclamos estarán asociados al edificio desde el cual fueron realizados y deberán ser clasificados por el usuario de edificio según el tipo de problema identificado, por ejemplo: iluminación, infraestructura, mantenimiento, entre otros.
- Se elimina el rol de **Usuario de Área**, ya que la función de derivar reclamos a proveedores deja de depender de áreas específicas como Tránsito, Infraestructura u otras.
- El **Administrador** podrá gestionar los usuarios de edificio, incluyendo su registro y actualización. Para cada usuario se podrán registrar datos como número telefónico, cédula, nombre, contraseña y los edificios a los que pertenece.
- El **Administrador** podrá restablecer o actualizar las contraseñas de los usuarios de edificio y las de los Usuarios de proveedor cuando sea necesario.
- El **Administrador** podrá crear y gestionar los edificios públicos registrados en el sistema. Cada edificio deberá contar, como mínimo, con un identificador, nombre y dirección.
- El **Administrador** podrá gestionar la relación entre usuarios de edificio y edificios, permitiendo que un mismo usuario pertenezca a uno o más edificios.
- El **Administrador** podrá registrar y gestionar los **Proveedores** que prestarán servicios para la resolución de los reclamos. El proveedor representará a una empresa u organización y deberá contar con datos propios de la empresa, como **RUT, razón social o nombre comercial, dirección, teléfono, correo electrónico y datos de un contacto responsable**, como el propietario, encargado o representante de la empresa.
- Los **Proveedores** podrán tener uno o más **Usuarios de proveedor** asociados. Estos usuarios serán las personas encargadas de realizar los trabajos y utilizar el sistema en representación del proveedor.
- El **Administrador** podrá registrar y gestionar los **Usuarios de proveedor**, asociándolos al proveedor correspondiente. Para cada usuario se podrán registrar datos como **cédula, nombre, teléfono, correo electrónico y contraseña**.
- Los **Usuarios de proveedor** podrán iniciar sesión en el sistema y visualizar únicamente los reclamos o tareas asignados al proveedor al que pertenecen.
- El antiguo rol de **Ciudadano** pasa a denominarse **Usuario de edificio**, debido al nuevo alcance del sistema.
- Se elimina la necesidad de utilizar **geolocalización** para los reclamos, ya que cada reclamo estará asociado al edificio al que pertenece el usuario.
- El **Administrativo** será responsable de moderar, clasificar y asignar los reclamos al proveedor correspondiente, sin realizar derivaciones hacia áreas internas de la Intendencia.
- Los reclamos serán asignados directamente a los **Proveedores**, eliminando la necesidad de una derivación intermedia hacia un Usuario de Área.
- Los **Usuarios de proveedor** serán los encargados de atender los reclamos asignados al proveedor al que pertenecen, registrar la solución realizada y adjuntar las evidencias correspondientes.
- La solución y las evidencias registradas por el **Usuario de proveedor** serán comunicadas al **Usuario de edificio** que realizó el reclamo.
- El **Usuario de edificio** podrá consultar el estado y avance de sus reclamos y visualizar la información y evidencias relacionadas con la resolución del reclamo.
- Se eliminan del alcance las funcionalidades relacionadas con la visualización pública de reclamos de otros ciudadanos, dado que los reclamos estarán vinculados a usuarios y edificios específicos.

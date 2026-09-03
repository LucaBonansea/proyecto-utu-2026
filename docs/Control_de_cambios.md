# Control de cambios

## 1

### Fecha: 21/8/2026
**Cambio:** Se cancela RF-11 (Gestión mediante Kanban) y, en consecuencia, la historia HU11 (Tablero Kanban) queda fuera del alcance del proyecto.

**Justificación:** El equipo ya cuenta con las tres interfaces definidas para la Intendencia (PWA Ciudadanía, Dashboard Comuna, Frontend Equipos/Proveedores), por lo que agregar una vista adicional de tablero Kanban dentro del Dashboard Comuna resulta redundante y poco práctico dado el plazo ajustado del proyecto. La visualización y gestión de reclamos por parte del personal de la comuna se seguirá cubriendo mediante RF-10 (listado de reclamos con filtro por área) y el campo de estado de cada reclamo (Ingreso, Validado, En proceso, Completado), sin necesidad de una representación visual tipo tablero.

**Impacto:**
- Se elimina HU11 (8 puntos) del backlog priorizado.
- La épica EP-04 (Gestión interna de reclamos) pasa a cubrirse únicamente con HU10 y HU12.
- El Sprint 4, que incluía HU11, libera 8 puntos de capacidad, que pueden reasignarse a otra historia pendiente o usarse como colchón ante retrasos.

## 2

### Fecha:3/9/26

**Cambio:** Ahora el proyecto esta enfocado a la gestion de reclamos dentro de edificios publicos, para la intendencia.

**Justificación:** Nuevos requerimientos por temas de San José Innova.

**Impacto:**

- Ahora el proyecto se trata de raclamos de usuarios habilitados por el administrador los cuales son pertenecientes a un edificio publico.
- El reclamo será clasificado por el usuario de edificio como: Iluminacion, infrestructura, etc sobre el edificio publico
- Usuario de Area es eliminado ya que su funcion de derivar a proveedores no tiene porque ser realizada por alguien de transito, infraestructura, etc.
- El administrador ahora podra ver proveedores y todos los reclamos, podra tener acceso a todos los usuarios, registrando usuarios de cada edificio con datos como numero, contraseña, y edificio correspondiente, tambien podra actualizar sus contraseñas en caso de haberselas olvidado, ademas podra crear nuevos edificios y gestionar quienes pertenecen a cada uno como denunciantes de reclamos.
- El ex "ciudadano" ahora es "usuario de edificio".
- Geolocalizacion ya no es necesaria ya que se sabe a donde pertenece cada edificio.
- Ahora el proveedor mandara la solucion de su trabajo al denunciante no al antiguo usuario de areas





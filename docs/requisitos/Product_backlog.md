# Product Backlog Inicial

## Historias de Usuario

### HU-01 – Registro de ciudadano

Como ciudadano, quiero registrarme con mi cédula y contraseña para poder utilizar el sistema de reclamos.

### HU-02 – Validación de identidad

Como sistema, quiero validar la identidad del ciudadano mediante una API para evitar registros inválidos o fraudulentos.

### HU-03 – Inicio de sesión

Como ciudadano, quiero iniciar sesión con mis credenciales para acceder a mis reclamos.

### HU-04 – Crear reclamo

Como ciudadano, quiero registrar un reclamo indicando tipo de incidente, descripción, ubicación y evidencias para informar un problema a la Intendencia.

### HU-05 – Consultar mis reclamos

Como ciudadano, quiero visualizar mis reclamos para conocer su estado y evolución.

### HU-06 – Visualizar reclamos

Como funcionario de la Intendencia, quiero visualizar todos los reclamos recibidos para gestionarlos.

### HU-07 – Asignar reclamos

Como funcionario de la Intendencia, quiero asignar reclamos a equipos responsables para que sean resueltos.

### HU-08 – Gestionar estados

Como funcionario de la Intendencia, quiero actualizar el estado de los reclamos para reflejar su progreso.

### HU-09 – Aprobar reclamos

Como funcionario de la Intendencia, quiero aprobar reclamos solucionados para cerrar los casos.

### HU-10 – Rechazar reclamos

Como funcionario de la Intendencia, quiero rechazar soluciones incorrectas para solicitar correcciones.

### HU-11 – Registrar evidencias

Como funcionario de la Intendencia, quiero adjuntar evidencias del trabajo realizado para documentar la resolución.

### HU-12 – Consultar historial

Como ciudadano o funcionario, quiero visualizar el historial de estados para conocer todas las acciones realizadas.

### HU-13 – Recibir notificaciones

Como ciudadano, quiero recibir notificaciones sobre cambios de estado para mantenerme informado.

### HU-14 – Generar reportes

Como funcionario de la Intendencia, quiero consultar estadísticas básicas para analizar la gestión de reclamos.

---

## Tareas Técnicas Iniciales

### Infraestructura

* Crear repositorio Git.
* Configurar ramas main y dev.
* Configurar entorno Laravel.
* Configurar base de datos MySQL.
* Definir estructura de carpetas.

### Base de Datos

* Diseñar modelo entidad-relación.
* Crear migraciones.
* Crear tablas de usuarios.
* Crear tablas de reclamos.
* Crear tablas de historial de actividad.
* Crear tablas de multimedia.

### Backend

* Implementar autenticación.
* Integrar API de validación de identidad.
* Implementar endpoints de reclamos.
* Implementar gestión de estados.
* Implementar carga de evidencias.
* Implementar control de roles y permisos.

### Frontend Ciudadanía

* Diseñar interfaz de registro.
* Diseñar inicio de sesión.
* Diseñar formulario de reclamos.
* Implementar seguimiento de reclamos.
* Implementar notificaciones.

### Frontend Intendencia

* Diseñar tablero Kanban.
* Implementar visualización de reclamos.
* Implementar asignación de reclamos.
* Implementar aprobación y rechazo.
* Implementar visualización de evidencias.
* Implementar reportes estadísticos.

### Testing

* Pruebas de autenticación.
* Pruebas de validación de identidad.
* Pruebas de creación de reclamos.
* Pruebas de flujo de estados.
* Pruebas de seguridad.

### Documentación

* Requisitos.
* Modelado.
* API.
* Seguridad.
* Planificación.
* Testing.

---

## Priorización Inicial

### Prioridad Alta

* Registro de ciudadanos.
* Validación de identidad.
* Inicio de sesión.
* Creación de reclamos.
* Gestión de estados.
* Dashboard de Intendencia.
* Base de datos.
* API REST.

### Prioridad Media

* Notificaciones.
* Reportes estadísticos.
* Historial detallado.

### Prioridad Baja

* Mejoras visuales.
* Funcionalidades adicionales no obligatorias.

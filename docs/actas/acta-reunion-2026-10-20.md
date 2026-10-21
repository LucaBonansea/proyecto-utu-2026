# Acta de Reunión — Ingeniería de Software

**Proyecto 3ro BT — 2026**

**Fecha:** 20/10/2026  
**Hora de inicio:** 13:30  
**Hora de finalización:** 17:00  
**Lugar / Contexto:** Polo Tecnológico de San José de Mayo — reunión de seguimiento con el cliente (representante de la Intendencia)

---

## Asistentes

* Thiago Carbajal
* Luca Bonansea
* Ariana Blanco
* Nicolas Perez
* Emanuel Trapolini
* Representante de la Intendencia (cliente)

---

## Objetivo de la Reunión

Presentar al cliente los cambios y avances realizados en el sistema desde la última reunión mantenida con él, obtener su devolución sobre el estado actual del proyecto y relevar nuevas sugerencias funcionales. A partir de lo conversado, establecer criterios para organizar los trabajos pendientes y avanzar hacia una versión del sistema apta para producción.

---

## Temas Tratados

1. **Presentación de avances al cliente:**  
   Se realizó una reunión de seguimiento con el representante de la Intendencia para comunicar los cambios aplicados al proyecto desde el encuentro anterior y recoger observaciones sobre las funcionalidades disponibles y las necesidades de gestión.

2. **Panel de estadísticas para el administrador (Frontend):**  
   El cliente sugirió incorporar un panel de estadísticas en la interfaz administrativa, con filtros por edificio e indicadores que permitan visualizar y analizar gastos. Entre los datos solicitados se encuentran el gasto total por edificio, los costos de materiales y de mano de obra, además de otros indicadores que faciliten el seguimiento y la administración de los recursos.

3. **Costos de materiales y mano de obra en los reclamos (Backend y Frontend):**  
   Se planteó añadir a cada reclamo dos atributos diferenciados: costo de materiales y costo de mano de obra. En el Backend se deberán almacenar y gestionar estos datos, mientras que en el Frontend se deberán incorporar los campos necesarios para que los proveedores puedan informarlos al gestionar un reclamo.

4. **Áreas específicas por edificio (Backend y Frontend):**  
   Se propuso permitir que el administrador cree y gestione áreas propias de cada edificio. Al registrar un reclamo, el usuario deberá seleccionar el edificio y una de las áreas asociadas a este; de esa manera, el reclamo quedará vinculado con ambos elementos para mejorar su identificación y seguimiento.

5. **Desactivación de usuarios desde el administrador (Frontend):**  
   Se señaló la necesidad de incorporar en la interfaz administrativa la opción de desactivar usuarios. La funcionalidad correspondiente ya se encuentra contemplada en el Backend, por lo que resta habilitar su uso desde el Frontend.

6. **Conservación de fotografías del antes y el después (Backend y Frontend):**  
   Se identificó que las imágenes cargadas por el proveedor reemplazaban la evidencia fotográfica original del reclamo. Se acordó corregir este comportamiento para conservar la foto inicial y la foto posterior a la reparación, y mostrarlas de manera independiente a fin de permitir su comparación.

7. **Visualización y filtrado de reclamos en el administrador (Frontend):**  
   Se observó que la vista administrativa solamente mostraba reclamos pendientes. Se solicitó permitir la visualización de reclamos de todos los estados e incorporar filtros por estado, edificio y área para mejorar la búsqueda y organización de la información.

8. **Distribución de responsabilidades entre Backend y Frontend:**  
   Se acordó que Luca Bonansea y Thiago Carbajal concentrarán su trabajo en las funcionalidades del Backend, mientras que Ariana Blanco, Nicolas Perez y Emanuel Trapolini se encargarán de las implementaciones y adaptaciones correspondientes al Frontend.

9. **Revisión de las implementaciones:**  
   Se estableció que cada integrante revise y compruebe el funcionamiento de los componentes y cambios que desarrolla, para detectar errores antes de su integración final.

10. **Preparación para la etapa de producción y cierre documental:**  
    Se planteó como objetivo completar las funcionalidades pendientes y preparar el proyecto para su paso a producción. Asimismo, se indicó la necesidad de finalizar documentación relevante, entre ella el acta de cierre, y otros documentos todavía pendientes.

---

## Acuerdos y Estado del Proyecto

* Tomar las sugerencias del cliente como referencia para los ajustes pendientes del sistema.
* Asignar a **Luca Bonansea y Thiago Carbajal** las tareas principales de **Backend**.
* Asignar a **Ariana Blanco, Nicolas Perez y Emanuel Trapolini** las tareas principales de **Frontend**.
* Incorporar los costos de materiales y mano de obra a la gestión de reclamos y contemplarlos en las estadísticas administrativas.
* Permitir la asociación de reclamos con áreas específicas de cada edificio.
* Completar la desactivación de usuarios desde la interfaz de administración.
* Conservar y presentar por separado las fotografías previas y posteriores a la resolución de los reclamos.
* Ampliar la visualización de reclamos para incluir todos sus estados e incorporar opciones de filtrado.
* Mantener la revisión individual de cada implementación y comprobar la integración entre componentes.
* Completar las funcionalidades restantes, realizar las verificaciones necesarias y preparar el sistema para su **etapa de producción**.
* Finalizar la documentación pendiente, incluida el **acta de cierre**.

**Estado general:** El proyecto continúa en desarrollo e integración, con funcionalidades implementadas y otras pendientes de adaptación o verificación antes de la puesta en producción. Las propuestas del cliente se registran como requerimientos o ajustes a completar; no se consideran automáticamente finalizadas por haber sido tratadas en la reunión.

---

## Revisión de Avances y Tareas Realizadas

| Integrante | Avances Realizados |
| :--- | :--- |
| **Thiago Carbajal** | • Actualizó el **Project Charter** a partir de las sugerencias recibidas en la segunda entrega.<br>• Implementó en el flujo del **Backend** los campos y el tratamiento de los costos de mano de obra y de materiales asociados a los reclamos.<br>• Trabajó en la modificación del Backend para que la fotografía original del reclamo no se sobrescriba cuando el proveedor cargue una nueva imagen. |
| **Luca Bonansea** | • Implementó las **Políticas de Uso** y su interfaz de usuario correspondiente.<br>• Trasladó las rutas de los endpoints `/auth/login` y `/auth/logout` a `web.php` para adecuar su gestión.<br>• Desarrolló **tests** destinados a verificar el funcionamiento del sistema.<br>• Implementó mejoras de seguridad señaladas en los informes de **OWASP ZAP**.<br>• Mejoró el archivo de configuración de **`compose.yaml`**, vinculando configuraciones esenciales, como las credenciales, a variables definidas en `.env`.<br>• Incorporó **middleware** y lógica de desactivación de usuarios en el controlador correspondiente. |
| **Ariana Blanco** | • Trabajó junto con Nicolas Perez en la implementación de los ajustes y mejoras del **Frontend** derivados de las sugerencias del cliente.<br>• Realizó mejoras en la interfaz de **Nuevo Reclamo**, incluyendo ajustes de navegación, la opción de volver al inicio, la actualización de importaciones y el versionado de recursos.<br>• Mejoró la carga de evidencias fotográficas, sus vistas previas y los mensajes de confirmación para el usuario, además de corregir estilos, problemas de codificación y aspectos de accesibilidad.<br>• Participó en los ajustes visuales de las tarjetas de reclamos del administrador y en la unificación de la interfaz y experiencia de usuario de las secciones de reclamos. |
| **Nicolas Perez** | • Trabajó junto con Ariana Blanco en la implementación de los ajustes y mejoras del **Frontend** derivados de las sugerencias del cliente.<br>• Realizó mejoras en la interfaz de **Nuevo Reclamo**, incluyendo ajustes de navegación, la opción de volver al inicio, la actualización de importaciones y el versionado de recursos.<br>• Mejoró la carga de evidencias fotográficas, sus vistas previas y los mensajes de confirmación para el usuario, además de corregir estilos, problemas de codificación y aspectos de accesibilidad.<br>• Participó en los ajustes visuales de las tarjetas de reclamos del administrador y en la unificación de la interfaz y experiencia de usuario de las secciones de reclamos. |
| **Emanuel Trapolini** | • Trabajó en la **unificación de la interfaz y la experiencia de uso de los reclamos**, consolidando mejoras visuales y de interacción.<br>• Mejoró la presentación del panel de administración, incorporando gradientes, sombras, ajustes en la estructura HTML y refinamientos de estilos y transiciones.<br>• Actualizó el versionado de las hojas de estilo del administrador.<br>• Participó en la integración de cambios al repositorio mediante fusiones de ramas y solicitudes de incorporación (*pull requests*).<br>• Realizó un ajuste en la configuración de **`SANCTUM_STATEFUL_DOMAINS`** para mejorar el manejo de sesiones.<br>• Implementó mejoras para la **cancelación de reclamos por parte del usuario**, con actualizaciones de la interfaz, mensajes y diálogos de confirmación; los cambios compartidos también comprenden el endpoint `DELETE`, la eliminación de notificaciones relacionadas y pruebas automatizadas para verificar el comportamiento y las autorizaciones. |
---

## Próximos Pasos

* Completar el panel de estadísticas administrativas, incluyendo filtros por edificio y desglose de costos.
* Integrar en el Frontend la carga y visualización de los costos de materiales y mano de obra de cada reclamo.
* Implementar y vincular las áreas de cada edificio en el Backend y el Frontend.
* Habilitar desde el Frontend administrativo la desactivación de usuarios.
* Completar y verificar la conservación y visualización diferenciada de las imágenes del antes y el después.
* Permitir al administrador consultar reclamos de cualquier estado y filtrarlos por estado, edificio y área.
* Revisar individualmente las implementaciones y realizar pruebas de funcionamiento e integración del sistema.
* Continuar aplicando las correcciones de ciberseguridad y validar su funcionamiento.
* Completar los documentos pendientes, especialmente el **acta de cierre**.
* Preparar y verificar los componentes necesarios para llevar el proyecto a **producción**.

---

## Observaciones

La reunión permitió presentar al representante de la Intendencia los avances realizados desde el último encuentro y recopilar sugerencias centradas principalmente en el control de gastos, la trazabilidad de los reclamos, la organización por edificios y áreas, y la mejora de las herramientas disponibles para el administrador y los proveedores.

A partir de los temas tratados, el equipo definió una distribución de responsabilidades entre Backend y Frontend, manteniendo la revisión de los componentes a cargo de cada integrante. Asimismo, se señaló la importancia de concluir los desarrollos y la documentación pendiente antes de avanzar hacia la etapa de producción.

Sin más asuntos que tratar, se da por finalizada la sesión a las **17:00 horas** en el Polo Tecnológico de San José de Mayo.

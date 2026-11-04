# Acta de Reunión — Ingeniería de Software

**Proyecto 3ro BT — 2026**

**Fecha:** 03/11/2026  
**Hora de inicio:** 16:00  
**Hora de finalización:** 19:00  
**Lugar:** Polo Tecnológico de San José de Mayo

---

## Asistentes

* Thiago Carbajal
* Luca Bonansea
* Ariana Blanco
* Nicolas Perez
* Emanuel Trapolini

**Participación:** Todos los integrantes del equipo estuvieron presentes y participaron en la reunión.

---

## Objetivo de la Reunión

Realizar una reunión de seguimiento del proyecto para presentar y analizar los avances desarrollados desde el encuentro del 20/10/2026, revisar la evolución de las funcionalidades solicitadas, compartir el trabajo realizado por cada integrante y organizar las actividades necesarias para completar las pruebas, la documentación y la preparación del sistema para producción.

---

## Temas Tratados

1. **Gestión de áreas por edificio (Backend y Frontend):**  
   Se revisaron los avances en la administración de áreas asociadas a edificios. Se incorporaron funcionalidades para crear, consultar y eliminar áreas, con restricciones para impedir la eliminación de aquellas vinculadas a reclamos. También se trabajó en la interfaz administrativa, los datos iniciales de áreas y su selección durante la creación de nuevos reclamos.

2. **Costos de materiales y mano de obra:**  
   Se presentó la incorporación de la visualización diferenciada de costos de materiales y de mano de obra en los reclamos. Se analizó su integración con las vistas del sistema y su utilización para el seguimiento de gastos.

3. **Estadísticas para el administrador:**  
   Se repasaron las mejoras realizadas en el panel de administración, incluyendo componentes de estadísticas, estilos adaptables y ajustes al servicio de consulta de reclamos. Se acordó concentrar las próximas verificaciones en los filtros por edificio y en la presentación de los indicadores de gastos requeridos.

4. **Gestión de usuarios y administradores:**  
   Se revisaron las mejoras de las vistas de usuarios y administradores, los controles de gestión de cuentas, los formularios y las búsquedas. Se incorporaron validaciones para cédula uruguaya, nombre y teléfono, así como opciones para mostrar u ocultar contraseñas. También se trataron los cambios relacionados con la eliminación de usuarios y la necesidad de revisar el comportamiento de desactivación de cuentas.

5. **Gestión de proveedores:**  
   Se analizaron los cambios implementados para listar proveedores activos y permitir su consulta desde la administración. Se revisaron mejoras de filtrado, tratamiento de estados, selección de proveedores, mensajes de interfaz y pruebas relacionadas con los listados y cambios de estado.

6. **Interfaz y funcionamiento de los reclamos:**  
   Se presentaron los ajustes destinados a unificar la apariencia y el funcionamiento de las secciones de reclamos, simplificar las búsquedas y mejorar la carga de información y el tratamiento de errores. Se mantuvo como tarea de revisión el comportamiento de los filtros administrativos y la presentación independiente de las fotografías anteriores y posteriores a una reparación.

7. **Documentación del proyecto:**  
   Se revisaron las actualizaciones de requerimientos, historias de usuario y control de cambios, junto con las correcciones de los diagramas MER y UML y sus justificaciones. Se incorporaron avances en el manual de usuario, la documentación de infraestructura y el documento de cierre del proyecto.

8. **Infraestructura, pruebas y seguridad:**  
   Se trataron los ajustes de configuración y de documentación necesarios para reconstruir la infraestructura del sistema, las correcciones relacionadas con puertos y servicios, y las mejoras de seguridad aplicadas a Nginx. Se destacó la importancia de ejecutar las pruebas integrales y revisar el funcionamiento conjunto de Backend y Frontend antes de la puesta en producción.

---

## Acuerdos y Estado del Proyecto

* Continuar con la división principal de tareas: **Luca Bonansea y Thiago Carbajal** en Backend; **Ariana Blanco, Nicolas Perez y Emanuel Trapolini** en Frontend, colaborando entre áreas cuando la integración lo requiera.
* Integrar y revisar el funcionamiento completo de la gestión de áreas por edificio, tanto en la administración como en el registro de reclamos.
* Verificar el registro y la visualización de costos de materiales y mano de obra, y su utilización en las estadísticas administrativas.
* Completar la revisión de los indicadores y filtros del panel de estadísticas.
* Revisar la administración de usuarios y proveedores, con especial atención a la desactivación de cuentas, sus estados y las validaciones de datos.
* Comprobar la visualización de reclamos de todos los estados, los filtros por edificio y área y la conservación de las imágenes del antes y el después.
* Realizar pruebas funcionales, de integración y de seguridad de las modificaciones incorporadas.
* Revisar el manual de usuario y la documentación técnica, y completar la preparación del cierre del proyecto.

**Estado general:** El proyecto avanzó en la implementación de funcionalidades administrativas, gestión de reclamos, documentación e infraestructura. La etapa siguiente se centra en integrar los cambios, completar las verificaciones funcionales y preparar el sistema para producción.

---

## Revisión de Avances y Tareas Realizadas

| Integrante | Avances realizados |
| :--- | :--- |
| **Thiago Carbajal** | • Corrigió los datos iniciales y la configuración de áreas asociadas a edificios.<br>• Ajustó la presentación de áreas en la sección de administrativos.<br>• Incorporó el manual de usuario y el documento de cierre del proyecto. |
| **Luca Bonansea** | • Implementó funciones de creación, consulta y eliminación controlada de áreas por edificio, junto con pruebas y ajustes de integración.<br>• Actualizó requerimientos, historias de usuario, control de cambios y documentación técnica.<br>• Trabajó en los servicios administrativos y en la gestión de proveedores activos y listados administrativos.<br>• Realizó ajustes de infraestructura, configuración y seguridad. |
| **Ariana Blanco** | • Mejoró la gestión de proveedores desde la interfaz administrativa.<br>• Optimizó la presentación y organización del código de dicha sección para facilitar su uso y mantenimiento. |
| **Nicolas Perez** | • Incorporó la visualización de costos de materiales y mano de obra en reclamos.<br>• Desarrolló componentes visuales y estilos del panel de estadísticas del administrador.<br>• Mejoró las validaciones de usuarios, la visualización de contraseñas y los filtros y estados de proveedores.<br>• Realizó ajustes en el inicio de sesión y en campos de formularios administrativos. |
| **Emanuel Trapolini** | • Participó en los trabajos de unificación visual y funcional de las interfaces de reclamos y administración.<br>• Se trataron las mejoras del flujo de selección de áreas en reclamos y los controles de gestión de usuarios y administradores, como parte del trabajo de Frontend del equipo. |

---

## Próximos Pasos

* Probar la creación, consulta, selección y eliminación permitida de áreas por edificio en los distintos perfiles del sistema.
* Verificar que los gastos de materiales y mano de obra se registren y presenten correctamente.
* Completar los filtros e indicadores de estadísticas administrativas.
* Revisar la desactivación de usuarios y el tratamiento de los estados de proveedores.
* Comprobar el acceso a reclamos de todos los estados y los filtros por estado, edificio y área.
* Confirmar que se conserven y muestren por separado las fotografías previas y posteriores a las reparaciones.
* Ejecutar pruebas integrales de Backend y Frontend y revisar los ajustes de seguridad e infraestructura.
* Finalizar las revisiones del manual de usuario, los documentos técnicos y el documento de cierre.
* Preparar el sistema para su puesta en producción una vez concluidas las verificaciones.

---

## Observaciones

Durante la reunión, los cinco integrantes compartieron los avances del período y analizaron su relación con las necesidades del sistema. Se destacaron especialmente la gestión de áreas por edificio, la presentación de costos, las estadísticas administrativas, la administración de usuarios y proveedores y las mejoras generales de las interfaces.

El equipo coincidió en dar prioridad a la integración y las pruebas de las funcionalidades ya desarrolladas, así como a la actualización de la documentación necesaria para completar el proyecto. Las tareas detalladas en los próximos pasos quedaron establecidas como actividades de seguimiento.

Sin más asuntos que tratar, se dio por finalizada la reunión a las **19:00 horas** en el **Polo Tecnológico de San José de Mayo**.

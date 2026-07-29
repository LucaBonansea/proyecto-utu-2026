**Nombre del proyecto**: Portal Ciudadano  
**Cliente / patrocinador (sponsor):** Andrea(Representante de la Intendencia)  
**Director del proyecto / Scrum Master:** Luca Bonansea (Lider)  
**Equipo:** Thiago Carbajal, Ariana Blanco, Nicolas Perez y Emanuel Trapolini  
**Fecha de inicio:** 6/8/2026  
**Duración estimada:** 3 meses aproximadamente

**Situación inicial del cliente**:  
La Intendencia Departamental es el organismo responsable de la administración y gestión de los servicios públicos del departamento, teniendo entre sus principales cometidos el mantenimiento de la infraestructura urbana, el alumbrado público, los espacios verdes, la limpieza, el tránsito y otras tareas orientadas a mejorar la calidad de vida de la ciudadanía. Para cumplir con estas funciones, coordina el trabajo de diferentes áreas y equipos técnicos que intervienen diariamente en la atención de las necesidades de la población.

**Necesidad planteada por el cliente:**

"Queremos contar con un sistema que nos permita mejorar la organización y el control de la información  
relacionada con los reclamos ciudadanos. Actualmente, la diversidad de canales de comunicación y la falta  
de una estructura formal para la gestión de las incidencias dificultan el seguimiento de cada caso, la coordinación entre las áreas involucradas y el acceso a información confiable sobre el estado de los reclamos. Por este motivo, necesitamos una herramienta que nos ayude a ordenar estos procesos y mejorar la gestión interna."

## **3\. Primer análisis del equipo de desarrollo**

| Área a aclarar | Preguntas iniciales del equipo |
| :---- | :---- |
| Usuarios | \- ¿Qué personas o áreas participan en las decisiones sobre los reclamos ciudadanos? \- ¿Quiénes utilizarán diariamente la aplicación web? \- ¿Qué tareas realiza cada tipo de usuario operativo? \- ¿Quiénes van a utilizar el sistema dentro de la intendencia o comuna? |
| Diseño | \- ¿La organización cuenta con un manual de identidad o imagen institucional? |
| Normativas | \- ¿El sistema debe cumplir alguna normativa, ley o política institucional? |
| Gestión de reclamos | \- ¿Cómo gestionan actualmente los reclamos ciudadanos? \- ¿Qué problemas o dificultades tienen con el proceso actual? \- ¿Qué tipos de reclamos reciben con mayor frecuencia? \- ¿Qué información suelen registrar cuando ingresa un reclamo? \- ¿Cuál es el proceso habitual para atender un caso desde que ingresa hasta que se resuelve? \- ¿Qué información necesitan visualizar para realizar su trabajo? \- ¿Qué acciones necesitan realizar dentro del sistema? \- ¿Qué información debería poder ingresar la ciudadanía al crear un reclamo? \- ¿Es necesario adjuntar fotos, videos o ubicación del incidente? \- ¿Cuándo consideran que un caso puede darse por cerrado? \- ¿Qué estados debería tener un reclamo dentro del sistema? \- ¿Qué información necesitan tener disponible para gestionar correctamente un reclamo? \- ¿Un caso cerrado puede volver a abrirse si el problema continúa? \- ¿Cómo verifican que un caso fue correctamente resuelto antes de cerrarlo? |
| Prioridades | \- ¿Qué tipos de reclamos reciben con mayor frecuencia? \- ¿Cómo se priorizan actualmente los casos o reclamos? |
| Toma de decisiones | \- ¿Usted es la persona que toma las decisiones sobre el proyecto? \- En caso contrario, ¿quién toma las decisiones relacionadas con alcance, presupuesto y prioridades? \- ¿Quién aprobará los avances y la versión final del sistema? \- ¿Quién será el responsable de validar que el sistema cumple con las necesidades del negocio? |
| Seguridad | \- ¿Todos los usuarios tendrán los mismos permisos o existirán distintos roles? \- ¿Qué información debería poder visualizar la ciudadanía sobre sus reclamos? \- ¿Los usuarios podrán ver los reclamos realizados por otras personas? \- ¿Habrá algún sistema de moderación para controlar qué información de los reclamos es visible para los demás usuarios? \- ¿Qué estados del reclamo debería poder visualizar la ciudadanía? \- ¿Necesitan saber quién realizó cada cambio dentro del sistema? |
| Modelo de datos | \- ¿Qué datos se guardarán de cada usuario? \- ¿Qué datos deberían registrar los equipos al finalizar un trabajo? |
| Infraestructura | \- Cuando un usuario indique la ubicación de un reclamo, ¿se hará mediante un mapa (geolocalización) o escribiendo la dirección manualmente? |
| Notificaciones | \- ¿Cómo esperan notificar a la ciudadanía sobre cambios o avances en sus reclamos? |
| Usabilidad | \- ¿Cómo les resulta más práctico visualizar la información y los casos? |
| Equipos y proveedores | \- ¿Trabajan con personal propio o proveedores externos para resolver casos? \- ¿Qué información necesitan ver los equipos o proveedores cuando reciben una tarea? |

## 4\. Participantes de la entrevista

| Rol | Participante | Responsabilidad |
| ----- | ----- | ----- |
| Sponsor principal | \[??????????????\] | Aprueba presupuesto, alcance y prioridades. |
| Usuario experto | Referente de la Intendencia de San José \[Andrea\] | Explica el proceso del reclamos y las necesidades de la intendencia. |
| Usuario operativo | \[??????????????\] | \[????????????\] |
| Equipo de desarrollo | Luca Bonansea y Thiago Carbajal | Relevan necesidades y transforman la información en backlog. |

---

## **5\. Entrevista**

## [Entrevista](https://docs.google.com/document/d/1HdpiK9ywZwUTfOfIAkexablMratLBvE-Bm20woJIXow/edit?usp=sharing) Aca esta mejor explicada

**Equipo:** ¿Usted es la persona que toma las  
decisiones sobre el proyecto?

**Cliente:** Si, exactamente

---

**Equipo:** En ese caso, ¿Quien toma las  
decisiones relacionadas con  
alcance presupuesto y prioridades?

**Cliente:** Eso en realidad yo consulto con la persona  
que está sobre mí y ahí terminaría  
resolviendo algunas cuestiones.

---

**Equipo:** ¿Entonces esa persona aprobará los  
avances y la versión final del sistema?

**Cliente:** Si

---

**Equipo:** ¿Qué personas o áreas participan en  
las decisiones sobre los reclamos  
ciudadanos?

**Cliente:** Los reclamos ciudadanos son atendidos por  
diferentes equipos, dependiendo de su  
naturaleza. Por ejemplo, un reclamo  
relacionado con tránsito es gestionado por un  
área distinta a la que atiende problemas de  
infraestructura, como una alcantarilla  
dañada, o incidentes relacionados con  
cables de servicios públicos.

---

**Equipo:** ¿Quién será el responsable de validar  
que el sistema cumple con las  
necesidades del negocio?

**Cliente:** Yo digamos que soy la persona que  
evaluaría la cuestión, obviamente con un  
superior, pero pasaría filtrado por mi persona.

---

**Equipo:** ¿La organización cuenta con un  
manual de identidad o imagen  
institucional?

**Cliente:** En este momento no, no tenemos porque  
en realidad hay una imagen institucional,  
pero no tenemos el manual del diseñador grafico.

---

**Equipo:** ¿El sistema debe cumplir alguna  
normativa, ley o política institucional?

**Cliente:** No se obtuvo una respuesta específica sobre  
normativas o políticas institucionales. Sin  
embargo, el entrevistado indicó que el  
sistema debe gestionar diferentes niveles de  
prioridad según el tipo de reclamo. Por  
ejemplo, un árbol caído que bloquea una ruta  
debe tener mayor prioridad que una papelera  
desbordada, y una inundación causada por  
una alcantarilla puede requerir un nivel de  
prioridad diferente.

---

**Equipo:** En ese caso ¿Ustedes cómo establecen esas prioridades?

**Cliente:** Existe una forma de establecer diferentes niveles de prioridad  
para los reclamos. Algunas incidencias son más importantes o  
urgentes que otras, ya sea por criterios definidos o por el sentido  
común. La idea es que el sistema asigne automáticamente un  
nivel de prioridad, por ejemplo, en una escala del 1 al 5, donde la  
prioridad 5 corresponda a los reclamos que deben resolverse  
con mayor urgencia.

---

**Equipo:** ¿Cómo gestiona actualmente los reclamos ciudadanos, o sea, cómo se hace el proceso en sí?

**Cliente:** Actualmente los reclamos pueden llegar por diferentes canales  
de comunicación, como llamadas telefónicas, WhatsApp, Facebook u otros medios. Existe un equipo de personas encargado de recibir estos reclamos, aunque todavía no están definidas formalmente las áreas responsables para cada tipo de incidencia. La idea es organizar equipos según las áreas correspondientes y centralizar todos los reclamos en una única aplicación.

De esta forma, el ciudadano tendría un solo canal de comunicación y el personal encargado podría gestionar los reclamos de manera más ordenada, evitando la dispersión de información y facilitando el seguimiento mediante el uso de la tecnología.

---

**Equipo:** ¿Qué aspectos o funcionalidades debería cumplir la aplicación  
para lograr la centralización y correcta gestión de los reclamos ciudadanos?

**Cliente:** La aplicación debe permitir centralizar la gestión de los  
reclamos ciudadanos, incluyendo la creación y registro de  
nuevos reclamos. Cada reclamo debe contar con información  
como categoría, prioridad y evidencias asociadas, como  
fotografías. Las categorías deberán estar definidas según las  
áreas responsables (por ejemplo, tránsito, servicios públicos u  
otras). Además, el sistema debería incorporar mecanismos  
automáticos para analizar la validez del reclamo, verificando si la  
evidencia proporcionada corresponde realmente a una  
incidencia reportada. En caso de que un reclamo no sea válido,  
debería poder clasificarse con una prioridad baja (por ejemplo,  
prioridad 0 o 1\) y permitir enviar una respuesta al ciudadano  
indicando que la solicitud no corresponde a un reclamo válido.  
El objetivo es automatizar parte del proceso de evaluación para  
facilitar la gestión y reducir la carga de revisión manual por  
parte del personal.

---

**Equipo:** ¿Además de fotografías, el sistema debería permitir adjuntar videos o registrar la ubicación del incidente?

**Cliente:** El sistema debe permitir adjuntar evidencias del reclamo,  
principalmente fotografías y, de ser necesario, videos. Además,  
debe incorporar la geolocalización automática del incidente,  
obteniendo la ubicación donde se realiza la denuncia. Si bien  
podría existir la posibilidad de ingresar la ubicación  
manualmente, la prioridad es que el sistema capture  
automáticamente la posición mediante los servicios de  
geolocalización del dispositivo del ciudadano.

---

**Equipo:** ¿Cuál es el proceso habitual para atender un caso desde que ingresa hasta que se resuelve?

**Cliente:** Actualmente, cuando ingresa un reclamo por alguno de los  
canales disponibles (por ejemplo, llamadas telefónicas u otros  
medios), se recopilan los datos del ciudadano y del incidente.  
Luego, se debe corroborar la información, trasladarse al lugar  
para verificar la situación y, una vez validado el problema,  
contactar al proveedor o área correspondiente según el tipo de  
reclamo (tránsito, servicios públicos u otros). Este proceso  
genera demoras debido a la cantidad de pasos manuales  
involucrados. La finalidad de la aplicación es agilizar la gestión,  
permitiendo que el reclamo llegue directamente al área o  
proveedor responsable con la información necesaria, incluyendo  
evidencia fotográfica y geolocalización. De esta forma, se podría  
evitar la verificación presencial inicial en aquellos casos donde la  
evidencia permita confirmar el problema, logrando una atención  
más rápida y eficiente.

---

**Equipo:** ¿Qué información se va a registrar cuando ingresa un reclamo?

**Cliente:** Al ingresar un reclamo, el sistema debe registrar información  
que permita identificar al ciudadano y validar que la solicitud  
proviene de una persona real. Se plantea la posibilidad de  
requerir datos de identificación, como la cédula uruguaya,  
aunque aún debe definirse cómo se manejarán casos  
particulares como turistas o menores de edad. Además de los  
datos del ciudadano, el reclamo deberá contener la información  
necesaria para su gestión, como la descripción del incidente,  
categoría, prioridad, ubicación y evidencias asociadas.

---

**Equipo:** ¿Por qué medios se notificará a los ciudadanos sobre el estado de sus reclamos?

**Cliente:** Las notificaciones a los ciudadanos se realizarán directamente a  
través de la aplicación. El objetivo es que toda la comunicación y  
seguimiento del reclamo se centralice dentro de la plataforma,  
evitando depender de otros medios externos.

---

**Equipo:** ¿Los usuarios van a tener distintos permisos dentro del sistema?

**Cliente:** Sí, el sistema deberá manejar diferentes roles de usuario con  
permisos específicos según sus responsabilidades. Los usuarios  
que gestionen la aplicación tendrán acceso a determinadas funcionalidades, mientras que los proveedores podrán visualizar únicamente los reclamos que les correspondan. No todos los usuarios deberán tener acceso a la  
totalidad de la información; por ejemplo, deberá existir un  
equipo con permisos más amplios para supervisar y gestionar  
todos los reclamos. Además, la prioridad asignada a cada  
reclamo será un factor importante para determinar qué  
usuarios o proveedores deben recibir y visualizar cada caso.

---

**Equipo:** ¿Qué información necesitan visualizar para realizar su trabajo?

**Cliente:** Para la correcta gestión de los reclamos, los usuarios necesitan  
visualizar principalmente la evidencia fotográfica asociada al  
caso, ya que permite comprobar la situación reportada. También  
es necesaria la ubicación geográfica del incidente mediante  
geolocalización, para conocer el punto exacto donde ocurre el  
reclamo. Además, se requiere acceder a la descripción o  
comentario realizado por el ciudadano y contar con información  
que permita validar la identidad del usuario que genera la solicitud.

---

**Equipo:** Al registrar un reclamo, ¿el ciudadano debe describir el problema mediante un comentario o seleccionar una categoría predefinida?

**Cliente:** El sistema debería ofrecer categorías u opciones predefinidas  
para facilitar el registro del reclamo y agilizar el proceso para el  
ciudadano. Sin embargo, también debe permitir la opción  
"Otro", acompañada de un campo de texto libre, para que el  
usuario pueda describir situaciones que no se encuentren  
contempladas en las categorías disponibles. El objetivo es  
facilitar tanto la creación del reclamo por parte del ciudadano  
como su posterior gestión por parte del personal responsable.

---

**Equipo:** ¿Qué datos se guardarán de cada usuario?

**Cliente:** El sistema debe permitir la creación de cuentas de usuario para  
identificar a cada ciudadano que realiza un reclamo. Para ello,  
se plantea registrar información básica como nombre de  
usuario y contraseña. Además, se propone solicitar la cédula de  
identidad como mecanismo de verificación de identidad, con el  
fin de validar que el usuario sea un ciudadano uruguayo  
(criterio aún pendiente de confirmación). Una vez resuelto el  
reclamo, el sistema deberá notificar al ciudadano el resultado,  
ya sea informando que fue solucionado o comunicando el  
motivo por el cual no pudo resolverse o requerirá un plazo mayor.

---

**Equipo:** ¿Se utilizará algún sistema de identidad digital, como TuID de Antel, para verificar la identidad de los usuarios?

**Cliente:** Sí. La autenticación y verificación de identidad de los  
ciudadanos se realizará mediante TuID de Antel, con el objetivo  
de garantizar que los reclamos sean realizados por usuarios reales y debidamente identificados.

---

**Equipo:** ¿Qué reclamos podrán visualizar los ciudadanos dentro de la  
aplicación?

**Cliente:** La aplicación permitirá que los ciudadanos visualicen los  
reclamos para conocer el trabajo realizado por la Intendencia. Se  
dará mayor visibilidad a los reclamos resueltos, mientras que los  
reclamos en proceso y pendientes tendrán una menor  
exposición. El objetivo es demostrar el avance en la atención de  
las solicitudes y generar confianza en el funcionamiento del  
sistema.

---

**Equipo:** ¿Existirán distintos niveles de acceso para los usuarios  
del sistema?

**Cliente:** Sí. El sistema deberá manejar diferentes roles de usuario.  
Existirá un grupo de administradores con acceso completo a la  
información, mientras que otros usuarios, como los  
proveedores, solo podrán acceder a la información necesaria  
para realizar sus tareas. Los datos sensibles, como la  
información personal de los ciudadanos, no deberán estar disponibles para todos los usuarios.

---

**Equipo:** ¿Será necesario moderar el contenido de los reclamos antes de que sea visible para otros usuarios?

**Cliente:** Sí. El sistema deberá controlar el contenido enviado por los  
ciudadanos, incluyendo comentarios, fotografías y otros datos,  
para evitar lenguaje inapropiado, información irrelevante o  
contenido que no corresponda a un reclamo válido. El objetivo  
es reducir el tiempo dedicado a la validación manual por parte del personal.

---

**Equipo:** ¿La moderación de los reclamos será realizada por personas o de forma automática?

**Cliente:** La validación y moderación de los reclamos deberá realizarse  
automáticamente. El objetivo es minimizar la intervención del  
personal y automatizar la mayor cantidad posible de tareas  
relacionadas con la revisión del contenido.

---

**Equipo:** ¿Cuándo se considera que un reclamo ha sido resuelto?

**Cliente:** Un reclamo se considerará resuelto únicamente cuando el  
problema haya sido solucionado por el equipo responsable.  
Durante el proceso, el ciudadano deberá recibir notificaciones  
indicando el estado del reclamo, por ejemplo, cuando se  
encuentre en proceso de resolución y cuando haya sido solucionado  
definitivamente.

---

**Equipo:** ¿Qué evidencia debe presentarse para dar un reclamo por finalizado?

**Cliente:** El equipo responsable deberá registrar evidencia de que el  
problema fue solucionado antes de marcar el reclamo como resuelto.

---

**Equipo:** ¿La resolución del reclamo debe ser validada por la Intendencia  
antes de notificar al ciudadano?

**Cliente:** Sí. Antes de cerrar un reclamo, un integrante autorizado de la  
Intendencia deberá verificar que la solución sea correcta. Una  
vez validada, el sistema notificará al ciudadano y registrará el  
cierre definitivo del reclamo. Además, sería conveniente  
mantener un historial de todos los cambios realizados sobre cada reclamo.

---

**Equipo:** ¿Un reclamo cerrado podrá reabrirse si el problema continúa?

**Cliente:** Sí. Si el mismo problema vuelve a presentarse, el reclamo  
podrá reabrirse en lugar de generar uno nuevo, manteniendo  
el historial asociado. Además, el sistema deberá generar  
estadísticas sobre la gestión de los reclamos, como cantidad  
de casos resueltos, pendientes, tiempos de resolución y desempeño de los proveedores.

---

**Equipo:** ¿Quiénes serán los responsables de resolver los reclamos?

**Cliente:** Inicialmente, los reclamos serán atendidos por personal  
interno de la Intendencia. Se prevé que, en el futuro, el sistema  
pueda ampliarse para contemplar un mayor número de usuarios o equipos de trabajo.

---

**Equipo:** ¿Cuántos usuarios participan normalmente en la gestión de un  
reclamo?

**Cliente:** Una vez recibido el reclamo, el sistema deberá derivarlo  
automáticamente al área correspondiente.  
Generalmente intervienen entre dos y cuatro personas,  
considerando al ciudadano, el responsable que recibe el  
reclamo y el equipo encargado de resolverlo.

---

**Equipo:** ¿Qué información debe registrarse al finalizar un trabajo?

**Cliente:** Al finalizar un reclamo, el sistema deberá registrar información  
como la fecha y hora de resolución, si el problema fue  
solucionado, si existieron inconvenientes, demoras u  
observaciones relevantes. Estos datos servirán para generar  
estadísticas y evaluar el desempeño de los equipos. Asimismo,  
el sistema deberá mantener información histórica sobre la  
actividad de los ciudadanos para detectar posibles comportamientos anómalos.

---

**Equipo:** ¿Cómo se detectarán posibles reclamos falsos o comportamientos anómalos de los ciudadanos?

**Cliente:** El sistema deberá incorporar mecanismos automáticos para  
analizar fotografías, comentarios y el comportamiento de los usuarios, con el objetivo de identificar posibles reclamos inválidos, contenido  
inapropiado o actividad sospechosa antes de que el personal intervenga.

---

**Equipo:** ¿El sistema podrá bloquear usuarios que realicen reclamos falsos de manera reiterada?

**Cliente:** Sí. El sistema deberá aplicar medidas automáticas sobre usuarios que acumulen reclamos inválidos, incluyendo advertencias y, eventualmente, la suspensión o bloqueo de la cuenta.

---

**Cliente:** Se plantea la posibilidad de que el ciudadano pueda visualizar  
el estado del equipo responsable mediante un seguimiento  
similar al utilizado por aplicaciones de entrega, mostrando  
cuándo el proveedor se dirige al lugar del incidente. Esta  
funcionalidad queda como una mejora deseable y su  
implementación dependerá de la viabilidad técnica.

**Cliente:** El sistema deberá contar con un módulo de estadísticas e  
indicadores que permita generar reportes sobre la gestión de  
los reclamos. Estos reportes deberán mostrar información  
como la cantidad de reclamos recibidos, resueltos, pendientes,  
rechazados o reabiertos, los tiempos promedio de resolución,  
el desempeño de las diferentes áreas o proveedores y otros  
indicadores relevantes. El objetivo es que, al finalizar un  
período (por ejemplo, mensual o anual), la Intendencia pueda  
evaluar la eficiencia del servicio, identificar áreas de mejora y  
apoyar la toma de decisiones mediante datos históricos y estadísticas.

## **6\. Información obtenida en la entrevista**

| Categoría | Información relevada |
| ----- | ----- |
| **Problema principal** | Los reclamos ciudadanos se reciben por múltiples canales (teléfono, WhatsApp, Facebook, entre otros), lo que genera dispersión de información, procesos manuales y dificultades para realizar el seguimiento de cada caso. |
| **Objetivo de negocio** | Centralizar la gestión de los reclamos en una única plataforma, automatizar la asignación de prioridades, mejorar el seguimiento de los casos y reducir los tiempos de atención. |
| **Alcance inicial** | Registro de ciudadanos, creación de reclamos, categorización, asignación automática de prioridades, carga de evidencias, geolocalización, notificaciones, gestión de estados, asignación a equipos y generación de reportes. |
| **Usuarios** | Ciudadanos, administradores, funcionarios de la Intendencia y proveedores o equipos responsables de atender los reclamos. Cada uno tendrá diferentes permisos según su rol. |
| **Infraestructura** | La aplicación deberá funcionar como plataforma central para todos los usuarios y utilizar la geolocalización del dispositivo del ciudadano. |
| **Seguridad** | Acceso mediante roles, autenticación de ciudadanos con TuID de Antel, protección de datos personales y restricción de información según permisos de cada usuario. |
| **Riesgo operativo** | La gran cantidad de validaciones manuales y la dispersión de los reclamos pueden provocar demoras en la atención. También existe el riesgo de recibir reclamos falsos o contenido inapropiado, por lo que se requieren mecanismos automáticos de detección y moderación. |
| **Restricción técnica** | La validación de identidad deberá realizarse mediante TuID de Antel; el sistema deberá capturar automáticamente la geolocalización y automatizar la clasificación y moderación de los reclamos. |

## 7\. Nombre propuesto del producto

**Portal Ciudadano**

Aplicación web diseñada para facilitar el registro, seguimiento y gestión de reclamos ciudadanos.

## 8\. Visión del producto

El Sistema de Reclamos Ciudadanos será una aplicación web responsive que permitirá a los ciudadanos registrar reclamos, adjuntar evidencias, consultar el estado de sus solicitudes y recibir notificaciones sobre su resolución. Asimismo, brindará a la Intendencia una plataforma centralizada para gestionar, priorizar, asignar y dar seguimiento a los reclamos de forma eficiente.

La primera versión estará orientada a centralizar la recepción y gestión de los reclamos, incorporando funcionalidades como el registro de usuarios, creación de reclamos, geolocalización, asignación de prioridades, gestión de estados y notificaciones, dejando las funcionalidades más avanzadas, como el seguimiento en tiempo real del equipo responsable o mejoras basadas en inteligencia artificial, para futuras versiones.

---

## 9\. Alcance incluido (Primera versión)

La primera versión del sistema incluirá las siguientes funcionalidades:

1. Registro de reclamos con descripción, ubicación geográfica y evidencias fotográficas.  
2. Inicio de sesión con diferentes roles de usuario: **Administrador**, **Administrativo**, **Proveedor** y **Ciudadano**.  
3. Registro de ciudadanos mediante número telefónico, con validación de identidad desde el backend.  
4. Asignación de prioridad al reclamo en una escala definida.  
5. Asignación automática del reclamo al área o proveedor responsable según su categoría.  
6. Seguimiento del estado de cada reclamo por parte del ciudadano.  
7. Visualización de reclamos públicos con distinto nivel de exposición según su estado.  
8. Gestión interna de los reclamos mediante un dashboard para el personal de la comuna.  
9. Organización de los reclamos mediante un tablero **Kanban**, utilizando los estados:  
   * Ingreso  
   * En proceso  
   * Resuelto  
   * Rechazado  
10. Visualización de evidencias antes y después de la resolución del reclamo por parte del personal autorizado.  
11. Notificaciones dentro de la aplicación ante cambios de estado del reclamo.  
12. Moderación manual de contenido por parte de un funcionario con rol **administrativo**.  
13. Registro de evidencias de resolución, incluyendo fotografías y observaciones, antes del cierre del reclamo.  
14. Validación del cierre del reclamo por un funcionario autorizado.  
15. Consulta de tareas asignadas por parte de equipos internos o proveedores.  
16. Gestión de clasificaciones: Módulo para que el Administrador o Administrativo pueda crear, editar, modificar y administrar las clasificaciones y categorías disponibles en el sistema.   
17. Administración de proveedores: Módulo para que el Administrativo pueda registrar, modificar y administrar los proveedores del sistema.

## 10\. Alcance excluido (Etapas futuras)

Las siguientes funcionalidades no serán desarrolladas en la primera versión del sistema:

1. **Integración con TuID de Antel para autenticación de usuarios.**  
   **Justificación:** Requiere un convenio o acceso formal a la plataforma de identidad digital de Antel, credenciales de aplicación, entorno de pruebas oficial y cumplimiento de sus políticas de integración. Esto excede los tiempos y recursos del proyecto. En su lugar, se mantiene una validación de identidad definida para el sistema desde el backend.  
2. **Asignación automática inicial de prioridad según el tipo de incidencia.**  
   **Justificación:** Aunque el sistema permitirá asignar prioridad al reclamo, la automatización de esa decisión requiere definir reglas más complejas, validar criterios con la Intendencia y contemplar excepciones. Para la primera versión se prioriza una gestión más controlada y simple.  
3. **Registro de intentos fraudulentos cuando falla la validación de identidad.**  
   **Justificación:** Implica almacenar y gestionar eventos de seguridad adicionales, definir criterios de fraude y posibles acciones posteriores sobre el usuario. Se excluye para limitar el alcance inicial a la validación de identidad necesaria para habilitar el acceso.  
4. **Registro completo del historial de cambios realizados sobre cada reclamo.**  
   **Justificación:** Conservar la trazabilidad completa implica registrar cada modificación, estado anterior, usuario responsable, fecha y detalle del cambio. Esto agrega complejidad al modelo de datos y al backend. En la primera versión se prioriza la gestión operativa del reclamo.  
5. **Posibilidad de reabrir un reclamo cerrado conservando su historial.**  
   **Justificación:** La reapertura depende del historial completo del reclamo y de reglas adicionales para definir cuándo corresponde reabrirlo, quién puede hacerlo y cómo se refleja en el flujo de estados. Al excluirse la trazabilidad completa, esta funcionalidad también queda fuera de la primera versión.  
6. **Registro del inicio de trabajo por parte de los equipos.**  
   **Justificación:** La versión inicial permitirá consultar tareas asignadas y registrar su finalización, pero no contemplará un evento separado de inicio. Esto simplifica el flujo de trabajo de equipos y proveedores, reduciendo estados intermedios y operaciones obligatorias.  
7. **Generación de estadísticas e indicadores básicos o avanzados.**  
   **Justificación:** Aunque los indicadores pueden aportar valor a la Intendencia, requieren consultas, filtros, cálculos y vistas adicionales. Para esta primera versión se prioriza el flujo principal del reclamo por encima del módulo de reportes. Los indicadores podrán incorporarse en una etapa futura.  
8. **Moderación automática de reclamos falsos o contenido inapropiado mediante inteligencia artificial.**  
   **Justificación:** Implica clasificación de texto e imágenes mediante técnicas de procesamiento de lenguaje natural (NLP) o visión por computadora, lo cual requiere tecnologías de IA/ML que no forman parte de las tecnologías permitidas para el proyecto ni de los contenidos vistos en el curso. Se prioriza la moderación manual.  
9. **Detección automática de reclamos inválidos.**  
   **Justificación:** Requiere analizar evidencias, descripciones y posiblemente patrones previos para determinar si un reclamo es válido. Esta lógica automática excede el alcance técnico de la primera versión, por lo que la validación queda a cargo del personal autorizado.  
10. **Clasificación automática de reclamos inválidos con baja prioridad, eliminación o respuesta automática.**  
    **Justificación:** Depende de la detección automática de reclamos inválidos y de reglas de decisión que podrían afectar reclamos legítimos si no están correctamente calibradas. Por ello se deja para una etapa futura.  
11. **Detección automática de comportamientos fraudulentos de los usuarios.**  
    **Justificación:** Supone construir un modelo de análisis de patrones de comportamiento a partir de datos históricos, lo cual corresponde a analítica avanzada o ciencia de datos. Esto excede las tecnologías permitidas y el tiempo disponible para el proyecto.  
12. **Advertencia, suspensión o bloqueo automático de usuarios con reclamos inválidos reiterados.**  
    **Justificación:** Esta funcionalidad depende de la detección confiable de reclamos inválidos y de comportamiento fraudulento. Además, requiere definir reglas administrativas y criterios de sanción. Por ese motivo queda fuera de la primera versión.  
13. **Análisis automático de fotografías para validar la autenticidad de un reclamo.**  
    **Justificación:** Requiere técnicas de visión por computadora para comparar una imagen con el tipo de incidente reportado. En esta versión, esa revisión quedará a cargo del personal mediante la moderación manual.  
14. **Visualización en tiempo real del recorrido del equipo responsable.**  
    **Justificación:** Necesita geolocalización continua del dispositivo del proveedor, actualización en tiempo real e infraestructura adicional, como WebSockets o mecanismos de actualización constante. Esto agrega complejidad y costo de desarrollo no viables para el plazo del proyecto.

---

## 11\. Requerimientos Funcionales

| ID | Requerimiento funcional | Descripción | Fuente | Observaciones |
| ----- | ----- | ----- | ----- | ----- |
| RF-01 | Registro de ciudadanos | El sistema deberá permitir que un ciudadano se registre mediante número de teléfono. | Doc. proyecto 2.1 – PWA Ciudadanía |  |
| RF-02 | Inicio de sesión | El sistema deberá permitir que los usuarios autenticados inicien sesión. | Doc. proyecto 2.1 – Backend; POST /auth/login |  |
| RF-03 | Validación de identidad | Durante el alta, el backend deberá validar la identidad del ciudadano antes de habilitar el acceso. | Doc. proyecto Apéndice 1; Backend POST /auth/verify-ci; Entrevista P13, P18 | Se excluye la integración con TuID de Antel. |
| RF-04 | Crear reclamos | El ciudadano podrá crear reclamos indicando descripción del incidente, evidencias y geolocalización automática. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend POST /reclamos; Entrevista P10, P11, P13 |  |
| RF-05 | Clasificar reclamos | El administrativo podrá clasificar los reclamos para asignarlos al área correspondiente. | Entrevista P36 |  |
| RF-06 | Asignar prioridad | El administrativo podrá asignar una prioridad al reclamo cuando considere que requiere atención urgente. | Entrevista P7, P8 |  |
| RF-07 | Consultar reclamos propios | El ciudadano podrá consultar el estado y avance de sus reclamos. | Doc. proyecto 2.1 – PWA Ciudadanía; Backend GET /reclamos/my; Entrevista P14, P24 |  |
| RF-08 | Recibir notificaciones | El ciudadano recibirá notificaciones dentro de la aplicación ante cambios de estado del reclamo. | Doc. proyecto 2.1 – PWA Ciudadanía; Entrevista P14, P24 |  |
| RF-09 | Visualizar reclamos públicos | El ciudadano podrá visualizar reclamos ajenos con diferente nivel de exposición según su estado. | Entrevista P20 |  |
| RF-10 | Visualizar todos los reclamos | El personal de la comuna podrá visualizar todos los reclamos registrados. Los usuarios de cada área dispondrán de un filtro que les permitirá visualizar los reclamos correspondientes a su área. | Doc. proyecto 2.1 – Dashboard Comuna; Backend GET /reclamos |  |
| RF-11 | Gestión mediante Kanban | El dashboard organizará los reclamos en estados: Ingreso,, En proceso, Resuelto y Rechazado. | Doc. proyecto 2.1 – Dashboard Comuna |  |
| RF-12 | Asignar reclamos | La comuna podrá asignar reclamos a equipos internos o proveedores luego de ser clasificados por el administrativo. | Doc. proyecto 2.1 – Dashboard Comuna; PATCH /reclamos/{id}/assign |  |
| RF-13 | Derivación automática | El sistema deberá derivar automáticamente el reclamo al área o proveedor correspondiente según la clasificación realizada por el administrativo. | Entrevista P12, P29 |  |
| RF-14 | Visualizar evidencias | La comuna podrá visualizar evidencias antes y después de la resolución. | Doc. proyecto 2.1 – Dashboard Comuna; Entrevista P16 |  |
| RF-15 | Validar y cerrar reclamo | La comuna aprobará o rechazará el trabajo realizado antes del cierre definitivo. | Doc. proyecto 2.1 – Dashboard Comuna; PATCH approve/reject; Entrevista P26 |  |
| RF-16 | Evidencia obligatoria de cierre | El equipo deberá registrar evidencia del trabajo realizado antes de marcar un reclamo como resuelto. | Entrevista P25 |  |
| RF-17 | Consultar tareas asignadas | Los equipos o proveedores podrán visualizar únicamente las tareas asignadas. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; Entrevista P15 |  |
| RF-18 | Registrar finalización | Los equipos podrán finalizar tareas registrando materiales, observaciones, evidencias, fecha y hora. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores; PATCH /reclamos/{id}/finish; Entrevista P30 |  |
| RF-19 | Reprocesar tareas rechazadas | Los equipos podrán volver a trabajar sobre tareas rechazadas con prioridad. | Doc. proyecto 2.1 – Frontend Equipos/Proveedores |  |
| RF-20 | Administrar evidencias | El sistema permitirá almacenar y consultar archivos multimedia asociados a un reclamo. | Doc. proyecto 2.1 – Backend Evidencias; 3 – Modelo de Datos |  |
| RF-21 | Roles de usuario | El sistema deberá manejar distintos roles de usuario (Ciudadano, Administrador, Administrativo, Usuario de Área y Proveedor ). | Entrevista P15, P21 |  |
| RF-22 | Restricción de información por rol | El sistema deberá restringir la información visible según el rol del usuario. | Entrevista P15, P16, P21 |  |
| RF-23 | Moderación manual de contenido | El administrativo deberá moderar el contenido ingresado por los ciudadanos antes de clasificar y derivar el reclamo al área correspondiente. | Entrevista P22, P23, P36 |  |
| RF-24 | Gestionar proveedores | El administrativo podrá registrar, modificar y administrar los proveedores del sistema. | Entrevista P37 |    |
| RF-25 | Gestionar clasificaciones  | El administrador o administrativo podrá crear, editar, modificar y administrar las categorías y clasificaciones disponibles en el sistema.  | Notas del proyecto; Alcance 9.6  |  |

## 12\. Requerimientos no funcionales

| ID | Requerimiento no funcional | Descripción | Fuente | Observaciones |
| ----- | ----- | ----- | ----- | ----- |
| RNF-01 | Control de acceso | El sistema deberá implementar control de roles y permisos para ciudadanos, personal de la comuna y proveedores. | Doc. proyecto 4; Entrevista P15, P21 |  |
| RNF-02 | Validación de datos | El sistema deberá validar todas las entradas recibidas antes de procesarlas. | Doc. proyecto 4 |  |
| RNF-04 | Protección de datos personales | El sistema deberá proteger los datos personales de los ciudadanos y restringir el acceso a información sensible según el rol. | Doc. proyecto 4; Entrevista P21 |  |
| RNF-05 | Usabilidad móvil | La interfaz de ciudadanía deberá estar diseñada con enfoque mobile-first y funcionar como una PWA. | Doc. proyecto 4; Entrevista P14 | Marcado como pendiente de confirmación en el documento fuente. |
| RNF-06 | Arquitectura base | El sistema deberá utilizar una arquitectura basada en backend PHP, base de datos MySQL, comunicación mediante API REST y almacenamiento de archivos en filesystem. | Doc. proyecto 2.1 – Backend |  |
| RNF-07 | Persistencia | La información del sistema deberá almacenarse de forma persistente en una base de datos. | Doc. proyecto 6 – Producto Funcional |  |
| RNF-10 | Integración externa segura | La validación de identidad deberá realizarse exclusivamente desde el backend, evitando llamadas directas desde el cliente. | Doc. proyecto Apéndice 1 |  |
| RNF-12 | Centralización | El sistema deberá centralizar la gestión de reclamos en una única plataforma, evitando la dispersión de información en múltiples canales. | Entrevista P9, P14; Doc. proyecto 1 – Fundamentación |  |
| RNF-14 | Experiencia de registro sencilla | El sistema deberá ofrecer un proceso simple e intuitivo para el registro de reclamos, sin requerir que el ciudadano seleccione una clasificación, ya que esta será asignada posteriormente por el administrativo. | Entrevista |  |
| RNF-15 | Tratamiento ético de datos | El sistema deberá garantizar un tratamiento ético y responsable de los datos personales almacenados. | Doc. proyecto – Justificación pedagógica; 7.1 – Evaluación |  |

## 

## 13\. Epicas

| ID | Épica | Objetivo | Requerimientos relacionados |
| ----- | ----- | ----- | ----- |
| EP-01 | Gestión de usuarios y acceso | Permitir el registro, inicio de sesión, validación de identidad y acceso según rol. | RF-01, RF-02, RF-03, RF-21, RF-22 |
| EP-02 | Registro de reclamos ciudadanos | Permitir que el ciudadano cree reclamos completos con ubicación y evidencias. | RF-04, RF-05, RF-06, RF-20 |
| EP-03 | Seguimiento ciudadano y notificaciones | Permitir que el ciudadano consulte sus reclamos, vea reclamos públicos y reciba notificaciones. | RF-07, RF-08, RF-09 |
| EP-04 | Gestión interna de reclamos | Permitir que la comuna visualice y organice reclamos mediante dashboard y tablero Kanban. | RF-10, RF-11, RF-14 |
| EP-05 | Asignación y derivación | Permitir asignar reclamos a equipos o proveedores y derivarlos automáticamente según categoría. | RF-12, RF-13 |
| EP-06 | Gestión de tareas de equipos/proveedores | Permitir que equipos y proveedores consulten sus tareas, registren finalizaciones y reprocesen tareas rechazadas. | RF-17, RF-18, RF-19 |
| EP-07 | Evidencias del reclamo | Permitir cargar, almacenar, consultar y visualizar evidencias asociadas a reclamos y resoluciones. | RF-14, RF-16, RF-20 |
| EP-08 | Validación y cierre de reclamos | Permitir aprobar, rechazar y cerrar reclamos luego de revisar el trabajo realizado. | RF-15, RF-16, RF-18, RF-19 |
| EP-09 | Moderación manual y administración del sistema  | Permitir que el funcionario administrativo revise el contenido ingresado por los ciudadanos, gestione las clasificaciones del sistema y administre el catálogo de proveedores.  | RF-23, RF-24, RF-25  |

El administrativo clasifica los reclamos al área correspondiente también actúa como moderador  
Los usuarios de cada área solo usaran un filtro para ver los reclamos ya clasificados  
El administrativo o administrador podrá crear nuevas clasificaciones de reclamos   
El administrativo deberá crear los proveedores aunque se podrán dejar ya instalados algunos   
Número telefónico o correo como registro PK   
Sacar categorías ya que el administrador lo clasifica


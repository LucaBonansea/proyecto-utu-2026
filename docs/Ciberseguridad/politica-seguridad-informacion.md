# Política de Seguridad de la Información — Nexaris

## Introducción

Nexaris es una empresa dedicada al desarrollo y venta de soluciones de software. En el desarrollo de sus actividades, Nexaris gestiona información de clientes, usuarios, proveedores, empleados y colaboradores, así como datos internos relacionados con sus productos, proyectos y operaciones.

Esta política tiene como objetivo establecer las reglas, lineamientos y responsabilidades necesarias para proteger la información de Nexaris, reduciendo los riesgos asociados a su pérdida, modificación, divulgación, acceso indebido o indisponibilidad.

Toda la política se fundamenta en los tres principios básicos de la seguridad de la información, conocidos como la tríada CIA:

- **Confidencialidad:** garantizar que la información solamente sea accesible por personas autorizadas.
- **Integridad:** garantizar que la información sea correcta, completa y no sea modificada de manera indebida.
- **Disponibilidad:** garantizar que la información y los recursos necesarios estén disponibles cuando sean requeridos por personas autorizadas.

Cada medida, regla o responsabilidad definida en este documento puede relacionarse con uno o más de estos tres principios.

---

## 1. Diagnóstico de seguridad de la información

Para poder proteger adecuadamente su información, Nexaris debe conocer qué información maneja, cómo debe clasificarse y a qué riesgos está expuesta. Esta sección presenta ese diagnóstico.

### 1.1 Activos de información

Nexaris identifica como activos de información, entre otros, los siguientes:

| Activo de información | Descripción |
|---|---|
| Datos personales de clientes y usuarios | Información que permite identificar a las personas que utilizan los productos o servicios de Nexaris. |
| Credenciales y datos de acceso | Usuarios, contraseñas y demás mecanismos que permiten el acceso a sistemas, cuentas y recursos. |
| Información comercial y contractual | Propuestas, contratos, acuerdos comerciales y condiciones pactadas con clientes o proveedores. |
| Información financiera y administrativa | Registros contables, facturación y demás información relacionada con la gestión económica de la empresa. |
| Código fuente y documentación de software | Desarrollos propios, repositorios y documentación técnica y funcional de los productos de Nexaris. |
| Información de productos y proyectos | Planes, especificaciones, hojas de ruta y demás información asociada a los productos que desarrolla la empresa. |
| Información de empleados y colaboradores | Datos personales, laborales y de contacto del personal de Nexaris. |
| Información de proveedores y socios | Datos y acuerdos correspondientes a las empresas y personas con las que Nexaris trabaja. |
| Comunicaciones internas | Correos electrónicos, mensajería y demás intercambios entre integrantes de la empresa. |
| Documentación empresarial | Políticas, manuales, actas y demás documentos internos de gestión. |
| Copias de seguridad y archivos importantes | Respaldos de información crítica para la continuidad de las actividades de Nexaris. |

Esta lista no es exhaustiva. Cualquier otra información que sea relevante para las actividades de Nexaris debe considerarse un activo de información y debe protegerse conforme a los principios de esta política.

### 1.2 Clasificación de la información

Toda la información de Nexaris debe clasificarse en una de las siguientes categorías, de acuerdo con su nivel de sensibilidad:

| Categoría | Significado | Nivel de protección |
|---|---|---|
| **Pública** | Información que puede divulgarse libremente sin generar un riesgo para Nexaris, sus clientes o su personal. | Protección básica, orientada principalmente a garantizar su integridad. |
| **Interna** | Información de uso exclusivo del personal de Nexaris, sin restricciones especiales entre áreas, pero no destinada a terceros. | Protección moderada; su divulgación externa no está autorizada. |
| **Confidencial** | Información sensible cuya divulgación podría afectar a Nexaris, a sus clientes, empleados o proveedores. | Protección alta; acceso restringido a las personas que la necesiten para cumplir sus funciones. |
| **Restringida** | Información crítica cuyo acceso debe limitarse a un grupo muy reducido de personas expresamente autorizadas. | Protección máxima; requiere autorización explícita y control estricto de acceso. |

Toda persona que maneje información de Nexaris debe conocer su clasificación y tratarla conforme al nivel de protección correspondiente.

### 1.3 Identificación de riesgos

Nexaris reconoce, entre otros, los siguientes riesgos asociados a la seguridad de su información:

| Riesgo | Componente de la tríada CIA afectado | Impacto potencial |
|---|---|---|
| Acceso no autorizado a información o sistemas | Confidencialidad | Exposición de información sensible a personas que no deberían tener acceso a ella. |
| Robo o filtración de información | Confidencialidad | Pérdida de control sobre información sensible, con posibles consecuencias legales, comerciales o reputacionales. |
| Pérdida accidental de datos | Disponibilidad / Integridad | Imposibilidad de acceder a información necesaria para las operaciones de la empresa. |
| Uso indebido de información | Confidencialidad / Integridad | Utilización de información para fines distintos a los autorizados, afectando la confianza de clientes o empleados. |
| Contraseñas comprometidas | Confidencialidad | Acceso no autorizado a cuentas, sistemas o información asociada a la credencial comprometida. |
| Pérdida o robo de dispositivos | Confidencialidad / Disponibilidad | Exposición de información almacenada en el dispositivo y pérdida de acceso a la misma. |
| Errores humanos | Integridad / Disponibilidad | Modificación, eliminación o divulgación accidental de información. |
| Divulgación accidental de información | Confidencialidad | Exposición no intencional de información a personas no autorizadas. |
| Modificación no autorizada de datos | Integridad | Alteración de información que puede generar decisiones erróneas o pérdida de confiabilidad. |
| Indisponibilidad de información | Disponibilidad | Interrupción de actividades que dependen del acceso oportuno a la información. |
| Fraudes o suplantación de identidad | Confidencialidad / Integridad | Uso indebido de la identidad de una persona para acceder a información o realizar acciones no autorizadas. |
| Incumplimiento de las políticas internas | Confidencialidad / Integridad / Disponibilidad | Debilitamiento general de las medidas de protección definidas por Nexaris. |

---

## 2. Roles y responsabilidades

La protección de la información de Nexaris es una responsabilidad compartida. Todas las personas que trabajen con información de la empresa, independientemente de su cargo o función, tienen el deber de protegerla conforme a lo establecido en esta política.

### 2.1 Propietarios y dirección de Nexaris

Los propietarios de Nexaris son:

- Luca Bonansea
- Thiago Carbajal
- Ariana Blanco
- Nicolás Pérez
- Emanuel Trapolini

Los propietarios y la dirección de Nexaris son responsables de:

- Aprobar y respaldar esta política, así como sus futuras actualizaciones.
- Garantizar que se asignen los recursos necesarios para su cumplimiento.
- Definir las responsabilidades generales en materia de seguridad de la información.
- Dar el ejemplo en el cumplimiento de las normas establecidas.

### 2.2 Responsables de gestión

Quienes ocupan roles de gestión o coordinación dentro de Nexaris son responsables de:

- Difundir esta política entre las personas a su cargo.
- Verificar que las tareas del equipo se realicen conforme a los lineamientos definidos.
- Escalar a la dirección cualquier situación que pueda representar un riesgo para la información.
- Colaborar en la revisión periódica de la política.

### 2.3 Empleados y colaboradores

Todos los empleados y colaboradores de Nexaris son responsables de:

- Conocer y cumplir esta política.
- Proteger las credenciales y los dispositivos que utilizan para su trabajo.
- Manejar la información conforme a su clasificación.
- Reportar cualquier incidente de seguridad que detecten.
- Utilizar de forma responsable los recursos y sistemas de la empresa.

### 2.4 Usuarios con acceso a información de la empresa

Toda persona externa que, por su vínculo con Nexaris, tenga acceso a información de la empresa (por ejemplo, proveedores o colaboradores externos) debe:

- Cumplir las condiciones de confidencialidad acordadas con Nexaris.
- Utilizar la información únicamente para los fines autorizados.
- Reportar cualquier incidente relacionado con la información a la que tiene acceso.

### 2.5 Responsables de los sistemas o recursos de información

Las personas responsables de administrar sistemas o recursos de información de Nexaris deben:

- Garantizar que los accesos otorgados correspondan a las autorizaciones definidas.
- Colaborar en la identificación y gestión de incidentes de seguridad.
- Contribuir a mantener la disponibilidad de la información y los recursos necesarios para las actividades de la empresa.

Esta responsabilidad se establece a nivel organizacional y de gestión, sin que ello implique definir aquí procedimientos técnicos específicos.

---

## 3. Lineamientos y normas de seguridad

### 3.1 Contraseñas y autenticación

- Las contraseñas deben tener una longitud mínima adecuada y combinar letras, números y símbolos.
- No deben reutilizarse las mismas contraseñas entre distintos sistemas o cuentas.
- Las credenciales son personales e intransferibles; no deben compartirse bajo ninguna circunstancia.
- Se recomienda el uso de gestores de contraseñas para el almacenamiento seguro de credenciales.
- Ante cualquier sospecha de que una contraseña fue comprometida, debe cambiarse de inmediato y reportarse la situación.
- Debe utilizarse autenticación multifactor en todos los sistemas donde esté disponible.

*Principio principal relacionado: Confidencialidad.*

### 3.2 Uso correcto de dispositivos

- Los dispositivos utilizados para actividades de Nexaris (computadoras, teléfonos u otros) deben usarse exclusivamente para los fines autorizados.
- Los dispositivos deben bloquearse siempre que la persona se aleje de ellos, aunque sea por un momento.
- No deben prestarse dispositivos ni cuentas de acceso sin autorización.
- Los equipos deben protegerse físicamente frente a pérdidas, robos o accesos indebidos.
- La pérdida o el robo de un dispositivo debe reportarse de inmediato.
- No debe almacenarse información sensible de Nexaris en dispositivos no autorizados.

*Principios principales relacionados: Confidencialidad y Disponibilidad.*

### 3.3 Confidencialidad

- No debe divulgarse información confidencial a personas no autorizadas, ya sea interna o externamente.
- La información empresarial no debe compartirse de forma innecesaria, aun dentro de la propia organización.
- Los documentos que contengan información sensible deben manejarse con cuidado, tanto en formato digital como físico.
- Debe evitarse hablar de información sensible en lugares públicos o frente a personas ajenas a Nexaris.
- La obligación de confidencialidad se mantiene incluso después de finalizada la relación laboral o contractual con Nexaris.

*Principio principal relacionado: Confidencialidad.*

### 3.4 Correo electrónico y comunicaciones

- Antes de enviar información, debe verificarse que los destinatarios sean los correctos.
- No deben abrirse enlaces ni archivos adjuntos sospechosos o de origen desconocido.
- La información confidencial no debe enviarse por medios no autorizados por Nexaris.
- Todo el personal debe estar atento a posibles intentos de phishing o suplantación de identidad, y reportarlos si los detecta.
- Las comunicaciones relacionadas con la actividad de Nexaris deben realizarse a través de los canales establecidos por la empresa.

*Principios principales relacionados: Confidencialidad e Integridad.*

### 3.5 Gestión de documentos e información

- La información debe almacenarse en los lugares y sistemas autorizados por Nexaris.
- La compartición de documentos debe limitarse a las personas que efectivamente los necesiten.
- Deben evitarse copias innecesarias de información sensible.
- La eliminación de información debe realizarse de forma que no queden expuestos datos confidenciales.
- Toda la información debe manejarse conforme a la clasificación definida en la sección 1.2.
- El acceso a la información debe otorgarse únicamente cuando sea necesario para el cumplimiento de las funciones correspondientes.

*Principios principales relacionados: Confidencialidad e Integridad.*

### 3.6 Uso de servicios externos

- El uso de servicios en la nube, aplicaciones o herramientas de terceros para almacenar o compartir información de Nexaris debe estar previamente autorizado.
- Antes de utilizar un servicio externo, deben considerarse los riesgos que este puede representar para la confidencialidad, integridad y disponibilidad de la información.
- No debe utilizarse ningún servicio externo no autorizado para el manejo de información de la empresa, aunque resulte más cómodo o conocido para quien lo propone.

*Principios principales relacionados: Confidencialidad, Integridad y Disponibilidad.*

### 3.7 Incidentes de seguridad

Se considera un incidente de seguridad cualquier situación que pueda afectar la confidencialidad, integridad o disponibilidad de la información de Nexaris. Algunos ejemplos son:

- Pérdida de un dispositivo.
- Robo de credenciales.
- Envío accidental de información a un destinatario incorrecto.
- Detección de un acceso sospechoso.
- Filtración de información.
- Alteración no autorizada de datos.
- Indisponibilidad de información importante para las operaciones de la empresa.

Ante cualquiera de estas situaciones, o cualquier otra que genere sospecha, la persona que la detecte debe reportarla de inmediato al responsable correspondiente, sin intentar ocultarla ni resolverla por su cuenta si excede sus posibilidades.

*Principios principales relacionados: Confidencialidad, Integridad y Disponibilidad.*

### 3.8 Copias y disponibilidad de la información

- Nexaris debe identificar cuál es su información crítica para la continuidad de sus actividades.
- Debe existir una copia de respaldo de la información crítica identificada.
- Las copias de seguridad deben protegerse con el mismo nivel de cuidado que la información original.
- Debe existir la capacidad de recuperar información ante su pérdida o daño.
- Las actividades esenciales de Nexaris deben poder continuar aun ante la pérdida de algún recurso de información.

*Principio principal relacionado: Disponibilidad.*

### 3.9 Acceso a la información

Nexaris aplica el principio de mínimo privilegio: cada persona debe acceder únicamente a la información que necesita para realizar sus funciones, ni más ni menos.

- Todo acceso a información debe ser autorizado explícitamente.
- Los accesos otorgados deben revisarse periódicamente.
- Los accesos deben revocarse cuando la persona deje de necesitarlos, por cambio de funciones o desvinculación.
- El acceso de personas externas a información de Nexaris debe estar debidamente autorizado y acotado a lo estrictamente necesario.
- Está prohibido utilizar cuentas de acceso ajenas, aun cuando se cuente con el consentimiento de su titular.

*Principios principales relacionados: Confidencialidad e Integridad.*

---

## 4. Cumplimiento y control

Nexaris supervisará el cumplimiento de esta política a través de las siguientes acciones:

- Revisiones periódicas del cumplimiento de las normas establecidas.
- Identificación de incumplimientos y de sus posibles causas.
- Registro y seguimiento de los incidentes de seguridad reportados.
- Aplicación de medidas proporcionales ante los incumplimientos detectados, las cuales podrán incluir instancias de conversación, capacitación adicional o medidas disciplinarias según la gravedad de la situación.
- Revisión y actualización periódica de esta política, para mantenerla alineada con la realidad de la empresa.

El cumplimiento de esta política es responsabilidad individual de cada persona alcanzada por ella. El desconocimiento de la política no exime de esta responsabilidad.

---

## 5. Principios generales

Los siguientes principios guían toda esta política:

1. **Confidencialidad:** la información solo debe ser accesible por quienes estén autorizados a conocerla.
2. **Integridad:** la información debe mantenerse correcta, completa y libre de modificaciones indebidas.
3. **Disponibilidad:** la información y los recursos necesarios deben estar accesibles cuando se los requiera legítimamente.
4. **Responsabilidad individual:** cada persona es responsable de proteger la información a la que accede.
5. **Mínimo privilegio:** el acceso a la información debe limitarse a lo estrictamente necesario para cumplir cada función.
6. **Necesidad de conocer:** la información debe compartirse únicamente con quienes efectivamente la necesiten.
7. **Prevención:** es preferible prevenir los riesgos antes que corregir sus consecuencias.
8. **Reporte oportuno de incidentes:** cualquier incidente debe comunicarse de inmediato, sin ocultarlo.
9. **Uso responsable de los recursos:** los recursos de información de Nexaris deben utilizarse exclusivamente para los fines autorizados.
10. **Mejora continua:** esta política debe revisarse y perfeccionarse de forma constante.

---

## 6. Vigencia y revisión

- **Alcance:** esta política aplica a toda la información de Nexaris, en cualquier formato o medio en que se encuentre.
- **Personas alcanzadas:** propietarios, dirección, empleados, colaboradores y toda persona externa que tenga acceso a información de Nexaris.
- **Fecha de entrada en vigencia:** [pendiente]
- **Fecha de aprobación:** [pendiente]
- **Frecuencia de revisión:** esta política deberá revisarse periódicamente, y toda vez que se produzcan cambios relevantes en las actividades u operaciones de Nexaris.
- **Responsables de revisión y aprobación:** los propietarios de Nexaris (Luca Bonansea, Thiago Carbajal, Ariana Blanco, Nicolás Pérez y Emanuel Trapolini), junto con los responsables de gestión que ellos designen.

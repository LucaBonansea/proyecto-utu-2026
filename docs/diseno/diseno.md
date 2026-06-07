# Diseño del sistema

## Arquitectura
(A definir)

## Base de datos
(A definir)

## Tecnologías
(A definir)

##Diagrama de flujo

1. Registro de ciudadano

El ciudadano accede a la aplicación y crea una cuenta ingresando su número de cédula de identidad y una contraseña.

2. Validación de identidad

Al registrarse, el backend consume la API de validación de identidad para verificar que la cédula corresponda a un ciudadano válido dentro del entorno de pruebas.

Si la validación es exitosa, la cuenta se crea.
Si la validación falla, el registro es rechazado y el intento queda registrado.
3. Inicio de sesión

Una vez registrado, el ciudadano puede iniciar sesión utilizando su cédula y contraseña.

4. Creación de reclamo

El ciudadano genera un nuevo reclamo indicando:

Tipo de incidente.
Descripción del problema.
Evidencias fotográficas o video.
Ubicación geográfica obtenida automáticamente.

Al confirmar el envío, el reclamo queda registrado en el sistema.

5. Ingreso del reclamo

El sistema asigna automáticamente el estado "Ingreso" al nuevo reclamo.

Desde este momento el ciudadano puede realizar el seguimiento del caso.

6. Revisión por parte de la Intendencia

Los funcionarios de la Intendencia visualizan los reclamos recibidos en el tablero Kanban.

Analizan la información proporcionada y determinan si el reclamo es válido y qué sector debe resolverlo.

7. Asignación del trabajo

La Intendencia asigna el reclamo al equipo responsable de su resolución.

Al momento de la asignación el estado pasa automáticamente a "En proceso", indicando que el trabajo ya fue derivado al área correspondiente.

8. Ejecución de la tarea

El equipo encargado realiza las tareas necesarias para solucionar el problema reportado.

Ejemplos:

Reparación de baches.
Arreglo de luminarias.
Poda de árboles.
Reparación de pérdidas de agua.
Corrección de cableado dañado.
9. Registro de finalización

Cuando el trabajo finaliza, la Intendencia registra:

Fecha de finalización.
Observaciones.
Materiales utilizados (si corresponde).
Evidencias fotográficas del resultado.

El estado cambia a "Pendiente de aprobación".

10. Verificación del resultado

La Intendencia revisa las evidencias y verifica que la solución implementada sea correcta.

11. Aprobación del reclamo

Si el problema fue solucionado correctamente:

El reclamo es aprobado.
El estado cambia a "Resuelto".
El ciudadano es notificado del cierre del caso.
12. Rechazo del reclamo

Si la solución no cumple con los requisitos o la evidencia es insuficiente:

El reclamo es rechazado.
El estado cambia a "Rechazado".
Se registra el motivo del rechazo.
13. Corrección y nueva revisión

Luego del rechazo, la Intendencia coordina una nueva intervención y vuelve a registrar evidencias hasta lograr una solución satisfactoria.

14. Seguimiento ciudadano

Durante todo el proceso el ciudadano puede consultar:

Estado actual.
Fecha de creación.
Historial de cambios.
Evidencias asociadas.
Resolución final del reclamo.

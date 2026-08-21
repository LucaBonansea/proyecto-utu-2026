# Proyecto UTU 2026

Sistema de Gestión de Reclamos Ciudadanos: plataforma para que la ciudadanía registre y haga seguimiento de reclamos urbanos; la administración comunal gestione y asigne tareas mediante un tablero Kanban; y los equipos o proveedores registren avances y evidencias, garantizando trazabilidad y auditoría.

Descripción
-----------
Proyecto académico desarrollado en el marco de la asignatura de Programación Full-Stack (UTU 2026). El repositorio contiene la documentación y el código fuente inicial de una plataforma web para la gestión de reclamos y su trazabilidad, organizada en módulos de frontend, backend y documentación del proyecto.


Estado
------
El proyecto se encuentra en fase de documentación y preparación técnica para las entregas académicas. Hay una implementación inicial del frontend y documentación de análisis, diseño y actas de reunión. El desarrollo backend no se describe en este documento.

Estructura principal
-------------------
- `docs/` — documentación del proyecto: actas, análisis, diseño y entregas.
- `src/frontend/` — recursos estáticos: HTML, CSS, JavaScript y activos.
- `tests/` — pruebas y casos de validación.


Uso y desarrollo (frontend)
---------------------------
El repositorio contiene la interfaz cliente y la documentación asociada. Para trabajar y probar el frontend, abra `src/frontend/html/index.html` en un navegador para pruebas estáticas, o sirva la carpeta `src/frontend` desde un servidor estático para evaluar rutas relativas y solicitudes asíncronas.

Estructura de `src/frontend` relevante:

- `html/` — páginas principales: `index.html`, `inicio.html`, `login-personal.html`.
- `css/` — hojas de estilo: `style.css`, `style-inicio.css`, `style-login-personal.css`.
- `js/` — scripts principales: `home.js`, `reclamos.js`, `nuevo_reclamos.js`, `cuenta.js`, `notifications.js`, `script.js`, `script-inicio.js`.
- `assets/imgs/` — imágenes y recursos estáticos.


Pruebas
------
La carpeta `tests/` contiene casos de prueba y validación. Ejecutar las pruebas que correspondan al componente que se desea validar. Para pruebas de frontend, revisar o crear scripts de pruebas estáticas o de integración según la herramienta elegida (por ejemplo, frameworks de pruebas JavaScript).

Documentación y entregas
-----------------------
La documentación formal, actas y entregas se encuentran en `docs/` y sus subcarpetas (`actas/`, `entregas/`, `analisis/`, `diseno/`). Revisar esas carpetas para la información requerida en las presentaciones y entregas.

Contribución
------------
- Trabajar sobre ramas derivadas de `develop`.
- Abrir Pull Requests para integrar cambios a `develop` o `main` según el flujo acordado.
- Documentar en Issues y actas los cambios relevantes.
- Antes de integrar cambios de interfaz, validar la carga de las páginas HTML y el correcto funcionamiento de los scripts en un servidor estático.

Licencia
--------
Proyecto académico. Consulte el archivo `LICENSE` para detalles.

Contacto
-------
Para consultas sobre el repositorio, utilizar Issues o las actas de reunión dentro de `docs/`.

Notas adicionales
---------------
- Si se requiere una API o capa backend, documentar sus requisitos funcionales en `docs/analisis/` antes de comenzar su implementación.
- Mantener actualizadas las actas en `docs/actas/` con decisiones técnicas relevantes.
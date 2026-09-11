# Estructura del repositorio

**Proyecto:** Portal Ciudadano - UTU 2026  
**Repositorio:** `C:\Users\Luca\Desktop\Folders\info_proyecto\proyecto\proyecto-utu-2026`  
**Arquitectura:** frontend web estático + API REST Laravel + base de datos

## 1. Vista general

El repositorio contiene una plataforma de gestión de reclamos ciudadanos. Está dividido en un frontend independiente desarrollado con HTML, CSS y JavaScript, un backend Laravel que expone una API REST, documentación académica y archivos de infraestructura y análisis de calidad.

```text
proyecto-utu-2026/
├── .github/                    # Plantillas y automatizaciones de GitHub
├── docs/                       # Documentación técnica y académica
├── src/
│   ├── backend/                # API y aplicación Laravel
│   └── frontend/               # Cliente web estático
├── tests/                      # Carpeta reservada para pruebas generales
├── .gitignore                  # Archivos excluidos del control de versiones
├── compose.yaml                # Backend y MySQL mediante Docker Compose
├── LICENSE                     # Condiciones de uso del proyecto
├── README.md                   # Presentación general del proyecto
└── sonar-project.properties    # Configuración del análisis SonarQube
```

## 2. Árbol detallado

El árbol omite el contenido interno de `.git/`, `.scannerwork/`, `vendor/` y `storage/` porque son metadatos, dependencias o archivos generados.

```text
proyecto-utu-2026/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug.md
│   │   ├── feature.md
│   │   └── tarea.md
│   ├── workflows/
│   │   └── sonarqube.yml
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/
│   ├── actas/
│   ├── Ciberseguridad/
│   │   ├── imgs/
│   │   ├── analisis_sonarqube_2026-09-08.md
│   │   └── politica-seguridad-informacion.md
│   ├── Diagramas/
│   │   ├── MER.md
│   │   ├── MER_proyecto_final.drawio.pdf
│   │   ├── UML.md
│   │   └── UML_Proyecto.drawio.pdf
│   ├── entregas/
│   ├── entrevista/
│   │   ├── Entrevista_Reclamos_Ciudadanos.md
│   │   └── preguntas_pre_entrevista.md
│   ├── historias_de_usuario/
│   │   └── HU.md
│   ├── requerimientos/
│   │   ├── epicas_y_requerimientos.md
│   │   └── requerimientos_SSOO.md
│   ├── Control_de_cambios.md
│   ├── Documentación de infraestructura.md
│   ├── Documentación para reconstrucción.md
│   ├── etica_uso_de_ia.md
│   ├── Justificación tecnológica.md
│   ├── project_charter.md
│   └── estructura_repositorio.md
│
├── src/
│   ├── backend/
│   │   ├── app/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/
│   │   │   │   │   ├── AuthController.php
│   │   │   │   │   ├── ClasificacionController.php
│   │   │   │   │   ├── Controller.php
│   │   │   │   │   ├── EdificioController.php
│   │   │   │   │   ├── ProveedorController.php
│   │   │   │   │   ├── ReclamoController.php
│   │   │   │   │   └── UsuarioController.php
│   │   │   │   └── Middleware/
│   │   │   │       └── LocalOnly.php
│   │   │   ├── Models/
│   │   │   │   ├── Clasificacion.php
│   │   │   │   ├── Edificio.php
│   │   │   │   ├── Evidencia.php
│   │   │   │   ├── Proveedor.php
│   │   │   │   ├── Reclamo.php
│   │   │   │   ├── User.php
│   │   │   │   └── Usuario.php
│   │   │   ├── Providers/
│   │   │   │   └── AppServiceProvider.php
│   │   │   └── Services/
│   │   │       └── AuthService.php
│   │   ├── bootstrap/
│   │   │   ├── app.php
│   │   │   └── providers.php
│   │   ├── config/
│   │   │   ├── app.php
│   │   │   ├── auth.php
│   │   │   ├── cache.php
│   │   │   ├── cors.php
│   │   │   ├── database.php
│   │   │   ├── filesystems.php
│   │   │   ├── logging.php
│   │   │   ├── mail.php
│   │   │   ├── queue.php
│   │   │   ├── sanctum.php
│   │   │   ├── services.php
│   │   │   └── session.php
│   │   ├── database/
│   │   │   ├── factories/
│   │   │   │   └── UserFactory.php
│   │   │   ├── migrations/
│   │   │   │   ├── 0001_01_01_000000_create_users_table.php
│   │   │   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   │   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   │   │   ├── 2026_08_18_114818_create_proveedores_table.php
│   │   │   │   ├── 2026_08_18_114819_create_usuarios_table.php
│   │   │   │   ├── 2026_08_18_122509_create_personal_access_tokens_table.php
│   │   │   │   ├── 2026_09_05_170000_create_edificios_table.php
│   │   │   │   ├── 2026_09_05_180657_create_usuario_edificio_edificio_table.php
│   │   │   │   ├── 2026_09_05_210059_create_clasificaciones_table.php
│   │   │   │   ├── 2026_09_05_222358_create_reclamos_table.php
│   │   │   │   └── 2026_09_05_232759_create_evidencias_table.php
│   │   │   ├── seeders/
│   │   │   │   ├── ClasificacionSeeder.php
│   │   │   │   ├── DatabaseSeeder.php
│   │   │   │   ├── EdificioSeeder.php
│   │   │   │   └── UsuarioSeeder.php
│   │   │   └── database.sqlite
│   │   ├── public/
│   │   │   ├── .htaccess
│   │   │   ├── favicon.ico
│   │   │   ├── index.php
│   │   │   └── robots.txt
│   │   ├── resources/
│   │   │   ├── css/app.css
│   │   │   ├── js/app.js
│   │   │   └── views/welcome.blade.php
│   │   ├── routes/
│   │   │   ├── api.php
│   │   │   ├── console.php
│   │   │   └── web.php
│   │   ├── tests/
│   │   │   ├── Feature/ExampleTest.php
│   │   │   ├── Unit/ExampleTest.php
│   │   │   └── TestCase.php
│   │   ├── .env.example
│   │   ├── artisan
│   │   ├── composer.json
│   │   ├── composer.lock
│   │   ├── dockerfile
│   │   ├── package.json
│   │   ├── phpunit.xml
│   │   ├── README.MD
│   │   └── vite.config.js
│   │
│   └── frontend/
│       ├── assets/
│       │   └── imgs/
│       ├── css/
│       │   ├── style.css
│       │   ├── style-administrador.css
│       │   ├── style-administrativos.css
│       │   ├── style-inicio.css
│       │   ├── style-login-personal.css
│       │   ├── style-provedores.css
│       │   └── style-registro.css
│       ├── html/
│       │   ├── index.html
│       │   ├── inicio.html
│       │   ├── login-personal.html
│       │   ├── administrador.html
│       │   ├── Administrativos.html
│       │   └── Provedores.html
│       ├── icons/
│       │   ├── icon-192x192.png
│       │   ├── icon-512x512.png
│       │   └── icon-512x512-maskable.png
│       ├── js/
│       │   ├── cuenta.js
│       │   ├── home.js
│       │   ├── notifications.js
│       │   ├── nuevo_reclamos.js
│       │   ├── reclamos.js
│       │   ├── script.js
│       │   ├── script-administrador.js
│       │   ├── script-administrativos.js
│       │   ├── script-inicio.js
│       │   ├── script-provedores.js
│       │   └── script-registro.js
│       └── manifest.json
│
├── tests/
│   └── .gitkeep
├── .gitignore
├── compose.yaml
├── LICENSE
├── README.md
└── sonar-project.properties
```

## 3. Componentes principales

| Ruta | Propósito |
|---|---|
| `.github/` | Plantillas para issues y pull requests, y ejecución automatizada de SonarQube |
| `docs/` | Documentación del proyecto, requerimientos, diagramas, actas, infraestructura y ciberseguridad |
| `src/backend/` | Aplicación Laravel, lógica de negocio, API REST, autenticación y acceso a datos |
| `src/frontend/` | Interfaz web estática para ciudadanos, administradores, administrativos y proveedores |
| `tests/` | Carpeta reservada para pruebas generales; actualmente solo contiene `.gitkeep` |
| `compose.yaml` | Definición de los contenedores del backend y MySQL |
| `sonar-project.properties` | Parámetros y exclusiones utilizados por SonarQube |

## 4. Backend Laravel

### Aplicación

| Ruta | Responsabilidad |
|---|---|
| `app/Http/Controllers/` | Recibe solicitudes HTTP y coordina autenticación, usuarios, reclamos, edificios, clasificaciones y proveedores |
| `app/Http/Middleware/` | Filtros aplicables a las solicitudes HTTP |
| `app/Models/` | Modelos Eloquent y relaciones de la base de datos |
| `app/Services/` | Lógica reutilizable separada de los controladores |
| `app/Providers/` | Registro y arranque de servicios de Laravel |

### Datos

| Ruta | Responsabilidad |
|---|---|
| `database/migrations/` | Definición versionada del esquema de base de datos |
| `database/seeders/` | Carga de datos iniciales para desarrollo o pruebas |
| `database/factories/` | Creación de datos ficticios para pruebas |
| `database/database.sqlite` | Base SQLite disponible para el entorno local |

### Configuración y ejecución

| Archivo o ruta | Responsabilidad |
|---|---|
| `routes/api.php` | Rutas públicas y protegidas de la API REST |
| `routes/web.php` | Rutas web servidas directamente por Laravel |
| `config/` | Autenticación, CORS, sesiones, base de datos, caché, correo, logs y Sanctum |
| `public/index.php` | Punto de entrada HTTP de Laravel |
| `artisan` | Punto de entrada de la consola de Laravel |
| `composer.json` | Dependencias PHP y comandos del proyecto |
| `package.json` | Dependencias frontend utilizadas por Laravel y Vite |
| `phpunit.xml` | Configuración de PHPUnit |
| `dockerfile` | Construcción y ejecución del backend en un contenedor |

## 5. Frontend

### Páginas

| Archivo | Función principal |
|---|---|
| `html/index.html` | Acceso y autenticación de ciudadanos |
| `html/inicio.html` | Aplicación principal del ciudadano autenticado |
| `html/login-personal.html` | Acceso para personal interno |
| `html/administrador.html` | Panel de administración general |
| `html/Administrativos.html` | Panel del personal administrativo |
| `html/Provedores.html` | Panel destinado a proveedores |

### JavaScript

| Archivo | Función principal |
|---|---|
| `js/script.js` | Inicio de sesión y redirección según rol |
| `js/script-inicio.js` | Coordinación de los módulos de la interfaz ciudadana |
| `js/nuevo_reclamos.js` | Registro de reclamos, clasificación, edificio y evidencia |
| `js/reclamos.js` | Consulta y presentación de reclamos |
| `js/cuenta.js` | Información y acciones de la cuenta del usuario |
| `js/notifications.js` | Notificaciones de la interfaz |
| `js/script-administrador.js` | Gestión de usuarios, edificios, proveedores, roles y estados |
| `js/script-administrativos.js` | Operaciones del perfil administrativo |
| `js/script-provedores.js` | Operaciones del perfil proveedor |
| `js/script-registro.js` | Lógica del formulario de registro |

### Recursos visuales

| Ruta | Contenido |
|---|---|
| `css/` | Estilos generales y específicos de cada panel |
| `assets/imgs/` | Logos e imágenes de la interfaz |
| `icons/` | Iconos de instalación de la aplicación web |
| `manifest.json` | Metadatos de la aplicación web progresiva |

## 6. Documentación

| Ruta | Contenido |
|---|---|
| `docs/actas/` | Registros de reuniones y decisiones |
| `docs/Ciberseguridad/` | Política de seguridad e informes de SonarQube |
| `docs/Diagramas/` | UML y modelo entidad-relación |
| `docs/entregas/` | Entregables académicos |
| `docs/entrevista/` | Preguntas y resultados del relevamiento |
| `docs/historias_de_usuario/` | Historias de usuario |
| `docs/requerimientos/` | Épicas y requerimientos funcionales y técnicos |
| `docs/Documentación de infraestructura.md` | Arquitectura y despliegue de infraestructura |
| `docs/Documentación para reconstrucción.md` | Pasos para reconstruir el entorno |
| `docs/Control_de_cambios.md` | Registro de modificaciones del proyecto |
| `docs/project_charter.md` | Definición y alcance inicial del proyecto |

## 7. Tecnologías

| Área | Tecnologías |
|---|---|
| Frontend | HTML5, CSS, JavaScript ES Modules, Fetch API |
| Mapas | Leaflet mediante CDN |
| Backend | PHP 8.3+, Laravel 13 |
| API y autenticación | API REST, sesiones Laravel, Laravel Sanctum |
| Persistencia | Eloquent ORM, MySQL 8 y SQLite |
| Construcción | Composer, npm y Vite |
| Pruebas | PHPUnit |
| Infraestructura | Docker y Docker Compose |
| Calidad y seguridad estática | SonarQube y SonarScanner CLI |
| Automatización | GitHub Actions |

## 8. Puntos de entrada

| Componente | Punto de entrada |
|---|---|
| Portal ciudadano | `src/frontend/html/index.html` |
| Aplicación ciudadana | `src/frontend/html/inicio.html` |
| Administración | `src/frontend/html/administrador.html` |
| Personal administrativo | `src/frontend/html/Administrativos.html` |
| Proveedores | `src/frontend/html/Provedores.html` |
| API Laravel | `src/backend/routes/api.php` |
| Entrada HTTP de Laravel | `src/backend/public/index.php` |
| Consola Laravel | `src/backend/artisan` |
| Entorno Docker | `compose.yaml` |

## 9. Directorios excluidos del árbol

| Ruta | Motivo de exclusión |
|---|---|
| `.git/` | Metadatos internos de Git |
| `.scannerwork/` | Resultados temporales generados por SonarScanner |
| `src/backend/vendor/` | Dependencias PHP instaladas por Composer |
| `src/backend/storage/` | Logs, caché, sesiones y archivos generados por Laravel |
| `node_modules/` | Dependencias JavaScript generadas por npm, si están instaladas |

## 10. Observaciones

1. El README principal describe el backend como pendiente o no documentado, pero actualmente existe una aplicación Laravel completa.
2. La carpeta raíz `tests/` no contiene pruebas reales. Las pruebas disponibles están en `src/backend/tests/` y todavía corresponden principalmente a ejemplos de Laravel.
3. El frontend incluye paneles de administrador, administrativos y proveedores que no aparecen en el listado original del README.
4. Docker Compose utiliza MySQL, mientras que el backend también incluye una base SQLite y `.env.example` puede estar configurado para SQLite.
5. El frontend consume la API en `http://127.0.0.1:8000/api/`, por lo que requiere que el backend esté levantado y que CORS permita el origen del servidor frontend.
6. Existe configuración de PWA mediante `manifest.json`, pero no se encontró un service worker.
7. `src/backend/README.MD` conserva el contenido genérico generado por Laravel y no documenta el dominio específico del proyecto.

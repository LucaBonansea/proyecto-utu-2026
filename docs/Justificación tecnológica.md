# Justificación tecnológica

## Introducción

El sistema fue desarrollado utilizando una arquitectura separada entre frontend, backend y base de datos. Esta separación permite mantener responsabilidades claras, facilitar el mantenimiento y permitir que cada parte pueda evolucionar de forma independiente.

## Frontend

El frontend utiliza HTML, CSS y JavaScript.

- HTML define la estructura de las páginas.
- CSS se utiliza para la presentación visual y el diseño responsivo.
- JavaScript maneja eventos, modifica el DOM y realiza la comunicación con el backend.

La comunicación con la API se realiza mediante `fetch()`, permitiendo enviar peticiones HTTP de forma asíncrona sin recargar completamente la página.

```text
Usuario interactúa con la interfaz
        ↓
JavaScript captura la acción
        ↓
fetch()
        ↓
API Laravel
        ↓
respuesta JSON
        ↓
JavaScript actualiza la interfaz
```

## Backend

El backend fue desarrollado en PHP utilizando Laravel.

Laravel fue elegido porque proporciona una estructura organizada para desarrollar APIs y aplicaciones web. En el proyecto se utilizan:

- rutas
- controladores
- modelos
- servicios
- validaciones
- middleware
- Eloquent ORM
- autenticación
- sesiones
- Laravel Sanctum

La separación principal es:

```text
Route
↓
Controller
↓
Service
↓
Model
↓
Base de datos
```

El controller recibe la petición HTTP y genera la respuesta. Los services contienen lógica de negocio y los models representan las entidades almacenadas en la base de datos.

## API REST

La comunicación entre frontend y backend se realiza mediante una API REST.

```text
GET     → obtener información
POST    → crear información
PUT     → actualizar información
DELETE  → eliminar información
```

Las respuestas son enviadas principalmente en formato JSON.

Códigos HTTP utilizados:

```text
200 → operación correcta
201 → recurso creado
401 → usuario no autenticado
403 → usuario autenticado pero sin permisos
419 → problema con CSRF
422 → error de validación
500 → error interno del servidor
```

## Autenticación y seguridad

El sistema utiliza Laravel Sanctum y sesiones para mantener autenticados a los usuarios.

```text
Frontend
↓
solicita token CSRF
↓
envía credenciales
↓
Laravel valida CSRF
↓
Auth::attempt()
↓
Laravel autentica al usuario
↓
se genera/regenera la sesión
↓
el navegador mantiene laravel_session
↓
auth:sanctum protege las rutas
```

### CORS

CORS controla qué orígenes del navegador están autorizados a comunicarse con el backend.

Durante el desarrollo:

```text
Frontend: http://127.0.0.1:5500
Backend:  http://127.0.0.1:8000
```

Como usan puertos distintos, se consideran orígenes distintos.

### CSRF

CSRF significa `Cross-Site Request Forgery`.

Laravel utiliza un token CSRF para verificar que determinadas peticiones sean legítimas. El frontend solicita:

```text
GET /sanctum/csrf-cookie
```

y luego envía el token recibido en las peticiones correspondientes.

### Auth::attempt()

`Auth::attempt()` verifica las credenciales del usuario. En el sistema se utiliza la cédula como identificador de inicio de sesión. Si las credenciales son correctas, Laravel autentica al usuario.

### laravel_session

La cookie `laravel_session` permite identificar la sesión del usuario en las peticiones posteriores.

### auth:sanctum

`auth:sanctum` es un middleware utilizado para proteger rutas que requieren autenticación. Si la sesión no es válida, Laravel responde con código `401`.

## Base de datos

La base de datos utiliza MySQL 8 y Laravel se comunica con ella mediante Eloquent ORM.

Entre las tablas utilizadas actualmente se encuentran:

```text
usuarios
edificios
usuario_edificio_edificio
```

La tabla `usuario_edificio_edificio` representa la relación entre usuarios de edificio y edificios.

## Docker

Docker permite ejecutar los componentes del backend dentro de contenedores.

El proyecto utiliza Docker Compose para levantar principalmente:

```text
backend
└── Laravel + PHP

database
└── MySQL
```

Esto permite reconstruir el entorno de forma consistente en distintas computadoras.

## Resumen

```text
Frontend
→ interfaz y experiencia del usuario

Backend
→ lógica, seguridad y API

MySQL
→ persistencia de datos

Docker
→ infraestructura reproducible
```

# Documentación de infraestructura

## Introducción

La infraestructura del proyecto utiliza Docker y Docker Compose para ejecutar el backend Laravel y la base de datos MySQL.

```text
Docker Compose
│
├── backend
│   └── Laravel / PHP
│
└── database
    └── MySQL 8
```

## Servicio backend

El backend se construye utilizando el `Dockerfile` ubicado dentro del proyecto Laravel.

La imagen utiliza PHP 8.5 CLI e instala dependencias como:

```text
git
unzip
libzip-dev
pdo_mysql
zip
Composer
```

La aplicación Laravel se ejecuta con:

```text
php artisan serve --host=0.0.0.0 --port=8000
```

El contenedor expone el puerto `8000`, por lo que desde la máquina anfitriona se accede mediante:

```text
http://127.0.0.1:8000
```

## Servicio de base de datos

La base de datos utiliza MySQL 8.0.

Dentro de Docker, MySQL escucha en el puerto `3306`.

Laravel se conecta usando el nombre del servicio Docker:

```env
DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=proyecto_utu
DB_USERNAME=root
```

Desde Windows se puede exponer MySQL mediante otro puerto, por ejemplo:

```text
3307:3306
```

## Volumen de MySQL

La base de datos utiliza un volumen de Docker para conservar los datos.

Ejemplo conceptual:

```yaml
volumes:
  mysql_data:
```

Y en el servicio:

```yaml
volumes:
  - mysql_data:/var/lib/mysql
```

De esta forma, detener o recrear el contenedor no elimina automáticamente la información almacenada.

## Comunicación interna de Docker

Docker Compose crea una red interna para sus servicios.

Laravel no debe conectarse a MySQL con:

```env
DB_HOST=127.0.0.1
```

Debe usar:

```env
DB_HOST=database
```

porque `database` es el nombre del servicio dentro de la red de Docker Compose.

## Puertos utilizados

```text
Frontend local
127.0.0.1:5500

Backend Laravel
127.0.0.1:8000

MySQL desde host
127.0.0.1:3307

MySQL dentro de Docker
database:3306
```

## Archivos principales de infraestructura

### compose.yaml

Define los servicios del proyecto, principalmente:

```text
backend
database
```

También define puertos, dependencias, variables de entorno y volúmenes.

### Dockerfile

Define cómo construir la imagen del backend Laravel.

Incluye PHP 8.5, extensiones necesarias, Composer, el código del proyecto y el comando de inicio de Laravel.

### .dockerignore

Evita copiar archivos innecesarios al contexto de Docker.

Ejemplos:

```text
.git
node_modules
vendor
storage/logs/*
```

### .env

Contiene configuración específica del entorno.

Ejemplo:

```env
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=proyecto_utu

SESSION_DRIVER=database
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=false

SANCTUM_STATEFUL_DOMAINS=127.0.0.1:5500
```

El archivo `.env` no debe subirse al repositorio si contiene información sensible.

### .env.example

Sirve como plantilla para reconstruir la configuración sin publicar secretos.

## Archivos relacionados con autenticación

### config/auth.php

Define el modelo utilizado por Laravel para autenticar usuarios.

El provider utiliza:

```text
App\Models\Usuario
```

### config/cors.php

Define qué orígenes pueden comunicarse con el backend desde el navegador.

Durante desarrollo se permite:

```text
http://127.0.0.1:5500
```

También se habilita:

```php
'supports_credentials' => true
```

para permitir el uso de cookies.

### bootstrap/app.php

Configura middleware global. Sanctum utiliza:

```php
$middleware->statefulApi();
```

para tratar las peticiones del frontend como autenticación basada en sesión/cookies.

### routes/api.php

Contiene las rutas de la API.

Ejemplo:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

La ruta `/api/auth/me` está protegida mediante `auth:sanctum`.

## Consideración sobre el código dentro de Docker

En la configuración actual no se utiliza un bind mount permanente del backend debido a problemas de rendimiento entre Windows y el filesystem de Docker.

Por este motivo, después de modificar código PHP localmente es necesario reconstruir la imagen:

```powershell
docker compose up -d --build
```

## Arquitectura final de desarrollo

```text
Navegador
│
├── Frontend
│   http://127.0.0.1:5500
│
│        fetch()
│           ↓
│
├── Laravel API
│   http://127.0.0.1:8000
│
│        Eloquent
│           ↓
│
└── MySQL
    database:3306
```

# Reconstrucción de la infraestructura

## Objetivo

Este documento explica cómo levantar nuevamente la infraestructura del proyecto desde una computadora nueva.

## Requisitos

Se necesita tener instalado:

```text
Git
Docker Desktop
Docker Compose
```

Para ejecutar el frontend localmente también se puede utilizar Visual Studio Code con Live Server.

## 1. Clonar el repositorio

```powershell
git clone <URL_DEL_REPOSITORIO>
cd proyecto-utu-2026
```

## 2. Crear el archivo .env

Dentro del backend se debe crear un archivo `.env` a partir de `.env.example`.

Configuración mínima esperada:

```env
APP_NAME="Proyecto UTU"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=proyecto_utu
DB_USERNAME=root
DB_PASSWORD=root

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_PATH=/
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=false

SANCTUM_STATEFUL_DOMAINS=127.0.0.1:5500
```

No se debe copiar una `APP_KEY` de producción.

## 3. Construir y levantar Docker

Desde la raíz del proyecto:

```powershell
docker compose up -d --build
```

Docker realizará:

```text
1. construcción de la imagen de Laravel
2. instalación de dependencias PHP
3. inicio del backend
4. inicio de MySQL
5. creación de la red interna
6. creación del volumen de datos
```

## 4. Comprobar los contenedores

```powershell
docker compose ps
```

Se deberían visualizar al menos:

```text
backend
database
```

## 5. Generar APP_KEY

Si el `.env` no tiene una clave válida:

```powershell
docker compose exec backend php artisan key:generate
```

## 6. Limpiar configuración

```powershell
docker compose exec backend php artisan config:clear
```

## 7. Ejecutar las migrations

Para crear las tablas:

```powershell
docker compose exec backend php artisan migrate
```

Durante desarrollo, para reconstruir completamente la base:

```powershell
docker compose exec backend php artisan migrate:fresh
```

`migrate:fresh` elimina las tablas y los datos existentes.

## 8. Comprobar la base de datos

```powershell
docker compose exec database mysql -u root -proot proyecto_utu
```

Dentro de MySQL:

```sql
SHOW TABLES;
```

Entre las tablas principales deberían encontrarse:

```text
usuarios
edificios
usuario_edificio_edificio
```

Para salir:

```sql
exit;
```

## 9. Crear datos iniciales si son necesarios

Si todavía no existe un sistema administrativo para cargar edificios, durante desarrollo puede crearse uno temporalmente:

```sql
INSERT INTO edificios
(nombre, direccion, created_at, updated_at)
VALUES
('Palacio Municipal', 'Dirección de prueba', NOW(), NOW());
```

Después verificar:

```sql
SELECT * FROM edificios;
```

## 10. Verificar las rutas Laravel

```powershell
docker compose exec backend php artisan route:list
```

Deberían aparecer rutas similares a:

```text
POST      api/auth/register
POST      api/auth/login
GET|HEAD  api/auth/me
GET|HEAD  sanctum/csrf-cookie
```

## 11. Ejecutar el frontend

Abrir la carpeta del frontend con Visual Studio Code y utilizar Live Server.

```text
http://127.0.0.1:5500
```

Es importante utilizar el mismo origen configurado en:

```env
SANCTUM_STATEFUL_DOMAINS=127.0.0.1:5500
```

## 12. Verificar CORS

En `config/cors.php` se debe permitir el frontend:

```php
'allowed_origins' => [
    'http://127.0.0.1:5500',
],
```

Y:

```php
'supports_credentials' => true,
```

## 13. Probar CSRF

El frontend debe poder solicitar:

```text
GET http://127.0.0.1:8000/sanctum/csrf-cookie
```

Una respuesta normal es:

```text
204 No Content
```

## 14. Probar login

El frontend realiza:

```text
POST /api/auth/login
```

Enviando:

```json
{
  "cedula": "CEDULA_DEL_USUARIO",
  "password": "CONTRASEÑA"
}
```

Además debe enviar cookies mediante:

```javascript
credentials: "include"
```

Y el token CSRF correspondiente.

Un login correcto devuelve:

```text
200
```

## 15. Verificar la sesión

Después del login se consulta:

```text
GET /api/auth/me
```

Esta ruta utiliza `auth:sanctum`.

Si existe una sesión válida devuelve:

```text
200
```

Si no existe una sesión autenticada válida devuelve:

```text
401
```

## 16. Flujo completo de autenticación

```text
Frontend
↓
GET /sanctum/csrf-cookie
↓
Laravel entrega XSRF-TOKEN
↓
Frontend envía login
↓
Laravel valida CSRF
↓
Auth::attempt()
↓
credenciales correctas
↓
Laravel autentica
↓
session()->regenerate()
↓
navegador mantiene laravel_session
↓
GET /api/auth/me
↓
auth:sanctum
↓
200 → acceso permitido
401 → volver al login
```

## 17. Modificaciones posteriores del backend

Debido a que el backend no utiliza un bind mount permanente, después de modificar archivos PHP se debe reconstruir el contenedor:

```powershell
docker compose up -d --build
```

Si se modificó configuración:

```powershell
docker compose exec backend php artisan config:clear
```

Si se modificaron migrations:

```powershell
docker compose exec backend php artisan migrate
```

O durante desarrollo:

```powershell
docker compose exec backend php artisan migrate:fresh
```

## 18. Detener la infraestructura

```powershell
docker compose down
```

Para volver a iniciarla:

```powershell
docker compose up -d
```

## Resultado esperado

```text
Frontend
http://127.0.0.1:5500
        ↓
Laravel
http://127.0.0.1:8000
        ↓
MySQL
database:3306
```

Con estos pasos la infraestructura queda reconstruida y preparada para continuar el desarrollo.

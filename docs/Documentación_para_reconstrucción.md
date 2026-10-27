# Reconstrucción de la infraestructura

## Índice

> El documento está separado entre localhost, aplicación y el apéndice específico de máquina virtual.

  - [Objetivo](#objetivo)
- **[Parte 0 — Ejecución local / localhost](#parte-0-—-ejecucion-local-localhost)**
  - [1. Esquema local](#1-esquema-local)
  - [2. `.env` orientativo para localhost](#2-env-orientativo-para-localhost)
  - [3. Acceso local](#3-acceso-local)
- **[Parte A — Proyecto y Docker](#parte-a-—-proyecto-y-docker)**
  - [7. Clonar el repositorio](#7-clonar-el-repositorio)
  - [8. Archivo `.env` del backend](#8-archivo-env-del-backend)
  - [9. Construir y levantar Docker](#9-construir-y-levantar-docker)
  - [10. Diagnosticar un build lento](#10-diagnosticar-un-build-lento)
  - [11. Comprobar contenedores](#11-comprobar-contenedores)
  - [12. Comprobar Nginx](#12-comprobar-nginx)
  - [13. Proxy Nginx hacia Laravel](#13-proxy-nginx-hacia-laravel)
- **[Parte B — Laravel](#parte-b-—-laravel)**
  - [14. Generar `APP_KEY`](#14-generar-appkey)
  - [15. Migraciones](#15-migraciones)
  - [16. Seeders](#16-seeders)
  - [17. Verificar rutas Laravel](#17-verificar-rutas-laravel)
  - [18. Publicar imágenes y archivos de `storage`](#18-publicar-imagenes-y-archivos-de-storage)
- **[Parte C — Sanctum, sesión y CSRF](#parte-c-—-sanctum-sesion-y-csrf)**
  - [19. Flujo correcto de autenticación](#19-flujo-correcto-de-autenticacion)
  - [20. Comprobar CSRF](#20-comprobar-csrf)
  - [21. Frontend y credenciales](#21-frontend-y-credenciales)
  - [22. Verificar sesión](#22-verificar-sesion)
  - [23. Aceptar políticas](#23-aceptar-politicas)
- **[Parte D — Actualizar el proyecto](#parte-d-—-actualizar-el-proyecto)**
  - [24. Actualizar código](#24-actualizar-codigo)
  - [25. Después de modificar configuración Laravel](#25-despues-de-modificar-configuracion-laravel)
  - [26. Después de modificar migraciones](#26-despues-de-modificar-migraciones)
  - [27. Comprobar salud después de actualizar](#27-comprobar-salud-despues-de-actualizar)
- **[Parte E — Opcional: backups, monitoreo y protección en producción](#parte-e-—-opcional-backups-monitoreo-y-proteccion-en-produccion)**
  - [28. Backups automáticos con `cron`](#28-backups-automaticos-con-cron)
  - [29. Monitoreo y detección temprana](#29-monitoreo-y-deteccion-temprana)
  - [30. Trampas defensivas y detección de comportamiento sospechoso](#30-trampas-defensivas-y-deteccion-de-comportamiento-sospechoso)
  - [31. Cloudflare, WAF y protección contra DDoS](#31-cloudflare-waf-y-proteccion-contra-ddos)
  - [32. Principio de defensa en profundidad](#32-principio-de-defensa-en-profundidad)
- **[Parte F — Detener y recuperar](#parte-f-—-detener-y-recuperar)**
  - [33. Detener Docker](#33-detener-docker)
  - [34. Reconstruir imágenes](#34-reconstruir-imagenes)
  - [35. Reinicio del servidor](#35-reinicio-del-servidor)
- **[Resultado esperado](#resultado-esperado)**
- **[Apéndice A — Máquina virtual con VirtualBox](#apendice-a-—-maquina-virtual-con-virtualbox)**
  - [A.1. Arquitectura de red de la VM](#a1-arquitectura-de-red-de-la-vm)
  - [A.2. Crear la VM en VirtualBox](#a2-crear-la-vm-en-virtualbox)
  - [A.3. Red Host-Only de Windows](#a3-red-host-only-de-windows)
  - [A.4. Configurar Netplan en Ubuntu](#a4-configurar-netplan-en-ubuntu)
  - [A.5. Verificar comunicación Windows ↔ VM](#a5-verificar-comunicacion-windows-↔-vm)
  - [A.6. Conectarse por SSH](#a6-conectarse-por-ssh)
  - [A.7. Accesos principales de la VM](#a7-accesos-principales-de-la-vm)

---

## Objetivo

Este documento explica cómo reconstruir y mantener la infraestructura del proyecto.

El flujo principal está separado para una ejecución **local/localhost**, junto con la configuración de Docker, Laravel, Nginx, MySQL, Sanctum, almacenamiento, actualizaciones, backups y seguridad.

Toda la configuración específica de **VirtualBox y Ubuntu Server dentro de una máquina virtual** se encuentra al final en el **Apéndice A**, evitando mezclar IPs y pasos de red de la VM con el entorno localhost.

> Los conceptos de la aplicación son los mismos en ambos escenarios. Lo que cambia principalmente es la red y la forma de acceso al servidor.


---

# Parte 0 — Ejecución local / localhost

Esta es la ruta recomendada cuando se quiere reconstruir y probar el proyecto **sin utilizar una máquina virtual**, directamente desde la computadora de desarrollo.

En este escenario los servicios se consumen mediante `localhost` o `127.0.0.1`.

## 1. Esquema local

```text
Computadora local
   │
   ├── Frontend / Nginx
   │      http://localhost
   │
   ├── Laravel
   │      red interna Docker
   │
   └── MySQL
          red interna Docker
```

Si el frontend se ejecuta con Live Server en lugar del contenedor Nginx, puede utilizarse:

```text
http://127.0.0.1:5500
```

En ese caso se deben adaptar correctamente:

```text
APP_URL
SANCTUM_STATEFUL_DOMAINS
CORS
cookies de sesión
CSRF
```

## 2. `.env` orientativo para localhost

```env
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

SESSION_DOMAIN=
SESSION_SECURE_COOKIE=false

SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,localhost:5500,127.0.0.1:5500
```

> El origen real utilizado por el navegador debe coincidir con la configuración de Sanctum, sesión y CORS.

## 3. Acceso local

Con Nginx publicado en el puerto 80:

```text
http://localhost
```

Con Live Server:

```text
http://127.0.0.1:5500
```

Las llamadas del frontend deben preferir rutas relativas:

```text
/api/auth/login
/api/auth/me
/sanctum/csrf-cookie
```

Esto evita hardcodear IPs y facilita mover la misma aplicación entre localhost, VM y producción.


---

# Parte A — Proyecto y Docker

## 7. Clonar el repositorio

Ubicación utilizada en el servidor:

```text
/opt/proyecto-utu-2026/proyecto-utu-2026
```

Ejemplo:

```bash
cd /opt
sudo git clone <URL_DEL_REPOSITORIO> proyecto-utu-2026
cd /opt/proyecto-utu-2026/proyecto-utu-2026
```

Si el repositorio ya existe:

```bash
cd /opt/proyecto-utu-2026/proyecto-utu-2026
git pull
```

---

## 8. Archivo `.env` del backend

Crear el `.env` a partir de `.env.example`.

Ejemplo de configuración Docker:

```env
APP_NAME="Proyecto UTU"
APP_ENV=production
APP_DEBUG=false

DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=<USUARIO_DB>
DB_PASSWORD=<PASSWORD_DB>

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_PATH=/
SESSION_DOMAIN=
SESSION_SECURE_COOKIE=false
```

### Sanctum

El dominio stateful debe coincidir con el origen desde el cual se accede al sistema.

Para acceso local:

```env
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1
```

Si el frontend se sirve desde otro host o puerto, agregar ese origen explícitamente, por ejemplo:

```env
SANCTUM_STATEFUL_DOMAINS=localhost,127.0.0.1,127.0.0.1:5500,localhost:5500
```

Cuando cambia la IP Wi‑Fi del host Windows, esa IP puede requerir actualización si se utiliza como origen de Sanctum.

Después de modificar el `.env`:

```bash
docker compose exec backend php artisan optimize:clear
```

y si es necesario:

```bash
docker compose restart backend
```

---

## 9. Construir y levantar Docker

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

La infraestructura actual contiene al menos:

```text
frontend-beta
backend
database
```

También se crean:

```text
red Docker interna
volumen MySQL
volumen backend_storage
volumen backend_vendor
```

---

## 10. Diagnosticar un build lento

Para ver el detalle del build:

```bash
docker compose --progress=plain build
```

Ver recursos:

```bash
htop
```

Espacio y Docker:

```bash
df -h
docker system df
```

Prueba rápida de velocidad:

```bash
curl -o /dev/null -s -w '%{speed_download}\n' 'https://speed.cloudflare.com/__down?bytes=1000000'
```

En la configuración final, Internet debe salir por la interfaz NAT.

---

## 11. Comprobar contenedores

```bash
docker compose ps
```

Resultado esperado similar a:

```text
backend         Up
database        Up (healthy)
frontend-beta   Up (healthy)
```

Puertos actuales:

```text
frontend-beta   0.0.0.0:80->80/tcp
backend         8000/tcp
database        3306/tcp
```

El backend y MySQL no necesitan estar publicados directamente al host.

---

## 12. Comprobar Nginx

Desde Ubuntu:

```bash
curl -I http://localhost
```

Respuesta esperada:

```text
HTTP/1.1 302 Moved Temporarily
Location: /proyecto-utu-2026/src/frontend/html/index.html
```

Desde Windows:

```powershell
curl.exe -I http://localhost
```

---

## 13. Proxy Nginx hacia Laravel

La configuración actual del frontend utiliza Nginx como proxy.

Ejemplo:

```nginx
location /api/ {
    proxy_pass http://backend:8000;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /sanctum/ {
    proxy_pass http://backend:8000;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

También existe proxy para `/storage/`.

Para inspeccionar la configuración cargada:

```bash
docker compose exec frontend-beta nginx -T
```

Gracias a esto, desde el navegador se utilizan rutas del mismo origen:

```text
/api/...
/sanctum/...
/storage/...
```

No es necesario publicar el puerto `8000` del backend hacia Windows.

### Nginx, CORS y Sanctum: configuración crítica en producción

En producción, una gran parte de los errores que parecen ser "fallos de autenticación" o "fallos del backend" en realidad pueden originarse en una configuración incorrecta de **Nginx, CORS o Laravel Sanctum**.

#### Nginx

Nginx debe reenviar correctamente al backend las rutas que no pertenecen al frontend estático, especialmente:

```text
/api/
/sanctum/
/storage/
```

Una configuración incorrecta puede provocar:

```text
404
401
419
rutas que terminan en el frontend en vez de Laravel
cookies o cabeceras que no llegan al backend
```

Comprobar la configuración activa con:

```bash
docker compose exec frontend-beta nginx -T
```

Es importante que el proxy conserve las cabeceras necesarias:

```nginx
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

#### CORS

Si frontend y backend se consumen desde orígenes diferentes, `config/cors.php` debe permitir únicamente los orígenes necesarios y debe habilitar credenciales cuando se utilizan cookies de sesión:

```php
'supports_credentials' => true,
```

Una mala configuración de CORS puede hacer que el navegador bloquee peticiones aunque Laravel esté funcionando correctamente.

#### Sanctum y sesiones

Sanctum depende especialmente de:

```text
SANCTUM_STATEFUL_DOMAINS
SESSION_DOMAIN
SESSION_SECURE_COOKIE
APP_URL
```

Los valores deben corresponder al dominio, IP, puerto y protocolo reales desde los que se abre el frontend.

Errores típicos por una configuración incorrecta:

```text
XSRF-TOKEN no reconocido
laravel_session no enviada
/api/auth/me devuelve 401
POST devuelve 419
login correcto pero la sesión no permanece
aceptar políticas falla porque el usuario ya no está autenticado
```

Después de modificar `.env` o configuración relacionada con Sanctum, sesión, CORS o URL de la aplicación:

```bash
docker compose exec backend php artisan optimize:clear
```

y, si es necesario:

```bash
docker compose restart backend
```

En producción, antes de buscar un error en controladores o en la base de datos, conviene verificar primero este recorrido:

```text
Navegador
→ Nginx
→ /sanctum/csrf-cookie
→ XSRF-TOKEN
→ login
→ laravel_session
→ /api/auth/me
```

---

# Parte B — Laravel

## 14. Generar `APP_KEY`

Si no existe:

```bash
docker compose exec backend php artisan key:generate
```

Después:

```bash
docker compose exec backend php artisan optimize:clear
```

---

## 15. Migraciones

Estado:

```bash
docker compose exec backend php artisan migrate:status
```

Aplicar:

```bash
docker compose exec backend php artisan migrate
```

> **Importante sobre `--force`:** en Laravel, `--force` permite ejecutar ciertos comandos incluso cuando la aplicación está en entorno `production`. No debe agregarse de forma automática ni por costumbre.
>
> Antes de usar un comando con `--force`, comprobar qué operación va a realizar y asegurarse de que existe un respaldo reciente de la base de datos si hay información importante. En especial, cualquier comando destructivo debe tratarse con extremo cuidado.

### Reconstrucción total de la base

Solo cuando se quiera **eliminar por completo la base actual y reconstruirla desde cero**:

```bash
docker compose exec backend php artisan migrate:fresh --seed
```

> **PELIGRO:** `migrate:fresh` elimina todas las tablas y todos los datos existentes.
>
> No debe ejecutarse si la base contiene información importante, datos reales de usuarios, datos de producción o información que no tenga respaldo.
>
> Si Laravel exige `--force` por estar en producción, utilizarlo únicamente después de confirmar que se desea realizar esa operación destructiva y que los datos pueden perderse o ya están respaldados.

Ejemplo únicamente para una reconstrucción controlada y sin datos importantes:

```bash
docker compose exec backend php artisan migrate:fresh --seed --force
```

---

## 16. Seeders

Ejecutar todos los seeders:

```bash
docker compose exec backend php artisan db:seed
```

Migraciones + seeders:

```bash
docker compose exec backend php artisan migrate --seed
```

Un seeder concreto:

```bash
docker compose exec backend php artisan db:seed --class=NombreDelSeeder
```

> **Uso de `--force`:** solo debe agregarse cuando Laravel lo requiera por estar en entorno `production` y después de comprobar que el seeder o la migración no va a sobrescribir, duplicar, borrar o alterar datos importantes.
>
> En una base con información real, primero se debe revisar el código del seeder y realizar un respaldo. Un seeder mal diseñado puede provocar duplicados, cambios no deseados o errores de integridad.

### Importante: seeders idempotentes

Se encontró un caso donde `ProveedorSeeder` intentaba insertar nuevamente un RUT único y MySQL devolvía:

```text
SQLSTATE[23000]
Integrity constraint violation
Duplicate entry
```

Para seeders que puedan ejecutarse varias veces se recomienda utilizar:

```php
Proveedor::updateOrCreate(
    ['rut' => 'RUT_UNICO'],
    [
        // datos
    ]
);
```

o:

```php
Proveedor::firstOrCreate(
    ['rut' => 'RUT_UNICO'],
    [
        // datos
    ]
);
```

en lugar de utilizar siempre `create()` para registros con claves únicas.

---

## 17. Verificar rutas Laravel

```bash
docker compose exec backend php artisan route:list
```

Rutas importantes actuales:

```text
POST      api/auth/login
POST      api/auth/logout
POST      api/auth/aceptar-politicas
GET|HEAD  api/auth/me
GET|HEAD  sanctum/csrf-cookie

GET|HEAD  api/areas
POST      api/areas

GET|HEAD  api/edificios
POST      api/edificios
GET|HEAD  api/edificios/{edificio}/areas

GET|HEAD  api/proveedores
POST      api/proveedores

GET|HEAD  api/reclamos
POST      api/reclamos

GET|HEAD  api/usuarios
POST      api/usuarios
```

Para filtrar solamente API:

```bash
docker compose exec backend php artisan route:list --path=api
```


---

## 18. Publicar imágenes y archivos de `storage`

Si las imágenes o archivos guardados por Laravel no se muestran correctamente en producción, una causa frecuente es que todavía no exista el enlace público hacia `storage`.

Laravel guarda normalmente los archivos públicos en:

```text
storage/app/public
```

pero el navegador necesita acceder a ellos desde:

```text
public/storage
```

Para crear ese enlace simbólico ejecutar:

```bash
docker compose exec backend php artisan storage:link
```

Este comando crea el enlace:

```text
public/storage → storage/app/public
```

De esta forma, los archivos almacenados en el disco `public` pueden ser servidos mediante rutas públicas como:

```text
/storage/imagen.jpg
```

En este proyecto Nginx también debe estar configurado para permitir o reenviar correctamente las solicitudes a:

```text
/storage/
```

Si una imagen existe en el servidor pero no se visualiza en el navegador, revisar:

```text
1. que el archivo exista dentro de storage/app/public
2. que se haya ejecutado php artisan storage:link
3. que public/storage exista y apunte correctamente al storage público
4. que Nginx permita o haga proxy de /storage/
5. que los permisos del archivo permitan su lectura
6. que la URL generada por Laravel coincida con APP_URL y con el origen real de producción
```

Para verificar el enlace dentro del contenedor:

```bash
docker compose exec backend ls -la public/storage
```

Si el enlace ya existe, Laravel puede mostrar un mensaje indicando que el link ya fue creado; en ese caso no es necesario recrearlo.

> `storage:link` no vuelve público todo el directorio `storage`. Expone únicamente el contenido configurado para el disco público, normalmente `storage/app/public`, mediante `public/storage`.


---

# Parte C — Sanctum, sesión y CSRF

## 19. Flujo correcto de autenticación

```text
Navegador
   ↓
GET /sanctum/csrf-cookie
   ↓
Laravel entrega XSRF-TOKEN
   ↓
POST /api/auth/login
   ↓
Laravel valida CSRF
   ↓
Auth::attempt()
   ↓
session()->regenerate()
   ↓
navegador conserva laravel_session
   ↓
GET /api/auth/me
   ↓
auth:sanctum
   ↓
200 → autenticado
401 → sesión no válida
```

---

## 20. Comprobar CSRF

Desde el mismo origen del frontend:

```text
GET /sanctum/csrf-cookie
```

Por ejemplo:

```bash
curl -i http://localhost/sanctum/csrf-cookie
```

Se deben observar cookies similares a:

```text
XSRF-TOKEN
laravel_session
```

---

## 21. Frontend y credenciales

Con `fetch`:

```javascript
fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include'
});
```

Con Axios:

```javascript
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
```

Se recomienda utilizar rutas relativas:

```javascript
/api/auth/login
/api/auth/me
/api/auth/aceptar-politicas
```

y evitar direcciones hardcodeadas como:

```text
http://localhost/...
http://192.168.1.34/...
```

Así la aplicación puede funcionar detrás de Nginx independientemente de la IP utilizada para abrir el sitio.

---

## 22. Verificar sesión

Después del login:

```text
GET /api/auth/me
```

Respuesta:

```text
200 → sesión válida
401 → sesión no válida
```

El `401` puede indicar:

```text
cookie de sesión ausente
cookie no enviada
SANCTUM_STATEFUL_DOMAINS incorrecto
origen distinto al esperado
sesión inválida
```

---

## 23. Aceptar políticas

Endpoint:

```text
POST /api/auth/aceptar-politicas
```

Debe realizarse con una sesión Sanctum válida.

Si falla, revisar simultáneamente:

```bash
docker compose exec backend tail -f storage/logs/laravel.log
```

y realizar nuevamente la petición desde el navegador.

---


# Parte D — Actualizar el proyecto

## 24. Actualizar código

### Opción adicional: conectar el servidor con el repositorio Git

Conectar el servidor directamente con el repositorio remoto es **opcional**, pero puede simplificar las actualizaciones.

Si se decide utilizar este flujo, el proyecto puede clonarse desde Git y mantenerse vinculado al repositorio. De esta forma, cuando existan cambios aprobados en el repositorio remoto, se pueden descargar con:

```bash
cd /opt/proyecto-utu-2026/proyecto-utu-2026
git pull
```

Esto permite mantener el código del servidor actualizado con respecto al repositorio configurado.

Antes de utilizar `git pull` en producción conviene:

```text
confirmar la rama correcta
confirmar que los cambios están probados
revisar cambios de .env, migraciones y Docker
tener un respaldo si la actualización afecta datos
```

Después de actualizar el código, debido a que el backend no utiliza un bind mount permanente para todo el código, si los archivos modificados forman parte de la imagen se debe reconstruir:

```bash
docker compose up -d --build
```

Este mecanismo puede integrarse más adelante con un flujo de despliegue automático o CI/CD, pero no es obligatorio para reconstruir la infraestructura.

---

## 25. Después de modificar configuración Laravel

```bash
docker compose exec backend php artisan optimize:clear
```

Si es necesario:

```bash
docker compose restart backend
```

---

## 26. Después de modificar migraciones

```bash
docker compose exec backend php artisan migrate --force
```

En una reconstrucción completa de desarrollo/pruebas:

```bash
docker compose exec backend php artisan migrate:fresh --seed --force
```

---

## 27. Comprobar salud después de actualizar

```bash
docker compose ps
```

Después:

```bash
curl -I http://localhost
```

y desde Windows:

```powershell
curl.exe -I http://localhost
```

---



# Parte E — Opcional: backups, monitoreo y protección en producción

Esta sección es **opcional**, pero es altamente recomendable si el sistema va a contener información importante o va a quedar expuesto a una red real o a Internet.

La idea es no depender únicamente de que el servidor "siga funcionando", sino preparar mecanismos para:

```text
recuperar información ante fallas
detectar comportamientos sospechosos
reaccionar antes de que un incidente sea grave
reducir el impacto de ataques externos
```

---

## 28. Backups automáticos con `cron`

Una base de datos en producción puede perder información por:

```text
errores humanos
fallas de disco
migraciones incorrectas
eliminaciones accidentales
corrupción de datos
problemas del sistema operativo
errores en Docker o volúmenes
incidentes de seguridad
```

Por eso es recomendable implementar backups automáticos.

### Crear un directorio de backups

Ejemplo:

```bash
sudo mkdir -p /opt/backups/proyecto-utu
sudo chown -R $USER:$USER /opt/backups/proyecto-utu
```

### Backup manual de MySQL

Antes de automatizar el proceso, comprobar que un backup manual funciona.

Ejemplo:

```bash
docker compose exec -T database \
  mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" laravel \
  > /opt/backups/proyecto-utu/laravel_$(date +%F_%H-%M-%S).sql
```

> No conviene escribir contraseñas directamente en scripts que puedan ser leídos por otros usuarios. En producción se recomienda utilizar variables de entorno, archivos protegidos o un sistema de secretos.

También puede comprimirse:

```bash
gzip /opt/backups/proyecto-utu/laravel_*.sql
```

### Script de backup

Se puede crear, por ejemplo:

```text
/opt/proyecto-utu-2026/backup.sh
```

El script puede:

```text
1. generar un dump de MySQL
2. comprimirlo
3. guardar fecha y hora en el nombre
4. eliminar backups locales demasiado antiguos
5. registrar si el proceso terminó correctamente
```

Dar permiso de ejecución:

```bash
chmod +x /opt/proyecto-utu-2026/backup.sh
```

### Automatizar con `crontab`

Editar:

```bash
crontab -e
```

Ejemplo: ejecutar todos los días a las 03:00:

```cron
0 3 * * * /opt/proyecto-utu-2026/backup.sh >> /var/log/proyecto-utu-backup.log 2>&1
```

La frecuencia debe elegirse según la importancia y cantidad de cambios de los datos.

Ejemplos:

```text
sistema con pocos cambios → backup diario
sistema con cambios frecuentes → varias veces por día
información crítica → estrategia más frecuente y/o replicación adicional
```

### No guardar todos los backups únicamente en el mismo servidor

Un backup que se encuentra solamente en el mismo disco que la aplicación puede perderse junto con el servidor.

Se recomienda aplicar una estrategia parecida a:

```text
copia local
+
copia en otro equipo o almacenamiento
+
copia externa/off-site
```

Por ejemplo:

```text
NAS
otro servidor
almacenamiento S3 compatible
servicio cloud de backups
disco externo administrado
```

### Rotación de backups

Para evitar llenar el disco, se pueden conservar solo los backups recientes.

Ejemplo: borrar archivos `.sql.gz` con más de 14 días:

```bash
find /opt/backups/proyecto-utu -type f -name "*.sql.gz" -mtime +14 -delete
```

> Antes de automatizar eliminaciones, verificar cuidadosamente la ruta utilizada.

### Un backup no sirve si nunca se probó la restauración

Periódicamente se debe comprobar que el archivo puede restaurarse correctamente en una base de prueba.

Ejemplo conceptual:

```bash
gunzip -c backup.sql.gz | docker compose exec -T database mysql -u root -p laravel
```

> Nunca realizar una prueba de restauración directamente sobre una base de producción con datos importantes. Utilizar una base o entorno de prueba.

---

## 29. Monitoreo y detección temprana

Además de realizar backups, es recomendable detectar problemas antes de que produzcan una caída completa.

Se pueden monitorear:

```text
uso de CPU
uso de RAM
espacio en disco
estado de contenedores
errores HTTP 4xx y 5xx
reinicios inesperados
intentos fallidos de autenticación
errores de Laravel
actividad anormal sobre endpoints sensibles
```

Comandos básicos de diagnóstico:

```bash
docker compose ps
docker compose logs --tail=100
df -h
free -h
```

Para un entorno más avanzado pueden utilizarse herramientas como:

```text
Prometheus
Grafana
Uptime Kuma
Zabbix
Sentry
servicios externos de monitoreo
```

---

## 30. Trampas defensivas y detección de comportamiento sospechoso

También se pueden implementar mecanismos defensivos para detectar intentos de ataque de forma temprana.

Estas "trampas" no deberían atacar al usuario ni ejecutar acciones ofensivas. Su objetivo es:

```text
detectar
registrar
alertar
limitar
bloquear temporalmente
```

### Ejemplos de mecanismos defensivos

Se pueden crear rutas o recursos que ningún usuario legítimo debería utilizar, por ejemplo endpoints internos falsos o rutas administrativas inexistentes controladas.

Si alguien intenta acceder repetidamente a ellos, el sistema puede:

```text
registrar IP
registrar fecha y hora
registrar User-Agent
generar una alerta
aumentar un contador de riesgo
aplicar rate limiting
bloquear temporalmente mediante firewall o WAF
```

También pueden utilizarse campos honeypot invisibles en formularios para detectar bots automatizados.

> Las trampas defensivas deben diseñarse para detectar actividad sospechosa, no para ejecutar código dañino contra quien las active.

### Rate limiting

Laravel permite aplicar límites a rutas sensibles.

Es especialmente importante proteger:

```text
login
recuperación de contraseña
registro
endpoints administrativos
carga de archivos
búsquedas costosas
```

Esto reduce ataques de fuerza bruta y abuso automatizado.

### Fail2ban

En servidores Linux también puede utilizarse `fail2ban` para analizar logs y bloquear temporalmente direcciones que generan demasiados intentos fallidos.

Debe configurarse con cuidado para evitar bloquear usuarios legítimos.

---

## 31. Cloudflare, WAF y protección contra DDoS

Cuando el proyecto se publique en Internet mediante un dominio, puede colocarse un servicio de protección delante del servidor.

Un ejemplo conocido es Cloudflare.

El flujo sería conceptualmente:

```text
Internet
   ↓
Cloudflare / WAF
   ↓
servidor público
   ↓
Nginx
   ↓
Laravel
```

Servicios de este tipo pueden aportar, según el plan y la configuración:

```text
protección y mitigación de DDoS
Web Application Firewall (WAF)
rate limiting
filtrado de bots
reglas por IP, país o patrón
TLS/HTTPS
CDN y caché
ocultamiento de la IP de origen cuando está correctamente configurado
registro de eventos y tráfico sospechoso
```

genui{"learning_viz":{"type_id":"DENIAL_OF_SERVICE_OVERLOAD","initial_values":{"server_capacity":120,"legitimate_request_rate":40}}}

### Importante

Cloudflare no sustituye:

```text
una aplicación segura
actualizaciones del servidor
backups
contraseñas robustas
configuración correcta de Laravel
configuración correcta de Nginx
CORS y Sanctum
firewall
control de permisos
```

Es una capa adicional de defensa.

Si se utiliza un proxy/WAF externo, también es importante configurar correctamente Nginx y Laravel para reconocer las IP reales del cliente y confiar únicamente en proxies conocidos.

### Esta protección no aplica directamente al Host-Only local

La IP:

```text
192.168.56.10
```

es privada y solamente pertenece a la red Host-Only.

Cloudflare cobra sentido cuando exista:

```text
dominio público
DNS configurado
servidor accesible desde Internet
HTTPS
puertos públicos necesarios
```

---

## 32. Principio de defensa en profundidad

Una infraestructura de producción no debería depender de una sola medida.

Una estrategia más sólida combina:

```text
backups automáticos
+
backups externos
+
pruebas de restauración
+
actualizaciones
+
firewall
+
Nginx correctamente configurado
+
CORS y Sanctum correctamente configurados
+
rate limiting
+
monitoreo y alertas
+
detección de actividad sospechosa
+
WAF / protección DDoS cuando corresponda
```

El objetivo es que una sola falla no provoque pérdida total de información o caída completa del servicio.

---

# Parte F — Detener y recuperar

## 33. Detener Docker

```bash
docker compose down
```

Volver a iniciar:

```bash
docker compose up -d
```

---

## 34. Reconstruir imágenes

```bash
docker compose up -d --build
```

Para observar el proceso detalladamente:

```bash
docker compose --progress=plain build
docker compose up -d
```

---

## 35. Reinicio del servidor

Después de reiniciar Ubuntu:

```bash
docker compose ps
```

Si los servicios tienen una política de reinicio como:

```yaml
restart: unless-stopped
```

deberían volver a levantarse automáticamente.

---

---

# Resultado esperado

La infraestructura final debe quedar conceptualmente así:

```text
Windows
192.168.56.1
     │
     │ Host-Only
     ▼
Ubuntu Server
192.168.56.10
     │
     ├── Docker frontend / Nginx :80
     │       │
     │       ├── archivos frontend
     │       ├── /api/     → backend:8000
     │       ├── /sanctum/ → backend:8000
     │       └── /storage/ → backend:8000
     │
     ├── Laravel backend:8000
     │
     └── MySQL database:3306

Ubuntu enp0s3
     │
     │ NAT
     ▼
Internet
```

Acceso principal desde Windows:

```text
http://localhost
```

SSH:

```powershell
ssh luca@192.168.56.10
```

Rutas de aplicación:

```text
http://localhost/api/...
http://localhost/sanctum/...
```

Con estos pasos la infraestructura puede reconstruirse manteniendo separadas:

```text
la salida a Internet
la administración de la VM
la red interna de Docker
la exposición del frontend
la autenticación Laravel/Sanctum
```

---

# Apéndice A — Máquina virtual con VirtualBox

Este apéndice contiene únicamente la configuración específica para ejecutar el proyecto en una **VM Ubuntu Server en VirtualBox**.

El cuerpo principal del documento explica Docker, Laravel, Nginx, MySQL, Sanctum, seeders, storage, backups y seguridad. Esos conceptos se mantienen iguales tanto en localhost como en la VM.

Lo que cambia en la VM es principalmente:

```text
red
IP fija de administración
Netplan
SSH
acceso desde el host
```

## A.1. Arquitectura de red de la VM

```text
                         Internet
                            │
                            ▼
                  VirtualBox - Adaptador 1
                           NAT
                            │
                        enp0s3
                     DHCP / 10.0.2.x
                            │
                    Ubuntu Server VM
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
       enp0s8                              Docker
  192.168.56.10/24                           │
       Host-Only                 ┌────────────┼────────────┐
          │                      │            │            │
          ▼                      ▼            ▼            ▼
 Windows Host              frontend-beta   backend       MySQL
 192.168.56.1               Nginx :80      :8000        :3306
```

La IP fija utilizada para administrar la VM desde Windows es:

```text
192.168.56.10
```

SSH:

```powershell
ssh luca@192.168.56.10
```

Frontend desde Windows:

```text
http://192.168.56.10
```

---


## A.2. Crear la VM en VirtualBox

Crear una máquina virtual con Ubuntu Server.

Configuración recomendada:

```text
CPU: 4 vCPU
RAM: 6 GB aproximadamente
Disco: según disponibilidad
Sistema: Ubuntu Server
```

### Adaptador 1

```text
Habilitado: Sí
Conectado a: NAT
Cable conectado: Sí
```

Este adaptador se utiliza para:

```text
Internet
apt
Docker Hub
descarga de imágenes
actualizaciones
```

### Adaptador 2

```text
Habilitado: Sí
Conectado a: Adaptador solo-anfitrión / Host-Only
Nombre: VirtualBox Host-Only Ethernet Adapter
Cable conectado: Sí
```

Este adaptador se utiliza para:

```text
Windows ↔ VM
SSH
administración
acceso al frontend desde el host
```

---

## A.3. Red Host-Only de Windows

En Windows verificar:

```powershell
ipconfig
```

Debe existir un adaptador similar a:

```text
VirtualBox Host-Only Ethernet Adapter

IPv4:    192.168.56.1
Máscara: 255.255.255.0
```

También puede verificarse con:

```powershell
Get-NetAdapter | Where-Object {$_.InterfaceDescription -like "*VirtualBox*"}
```

y:

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.56.*"}
```

---

## A.4. Configurar Netplan en Ubuntu

Archivo:

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

La interfaz NAT debe utilizar DHCP.

La interfaz Host-Only debe conservar:

```text
192.168.56.10/24
```

Configuración base:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: true

    enp0s8:
      dhcp4: false
      addresses:
        - 192.168.56.10/24
```

### Configuración utilizada en la práctica del curso

Si se requiere mantener `192.168.56.1` como gateway de la interfaz Host-Only según la configuración indicada en clase:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: true

    enp0s8:
      dhcp4: false
      addresses:
        - 192.168.56.10/24
      routes:
        - to: default
          via: 192.168.56.1
      nameservers:
        addresses:
          - 1.1.1.1
          - 8.8.8.8
```

Después de cualquier cambio:

```bash
sudo chmod 600 /etc/netplan/00-installer-config.yaml
sudo netplan generate
sudo netplan try
```

Si la configuración funciona:

```bash
sudo netplan apply
```

Verificar:

```bash
ip -br addr
ip route
```

Resultado esperado de interfaces:

```text
enp0s3   UP   10.0.2.x/24
enp0s8   UP   192.168.56.10/24
```

Comprobar la ruta utilizada hacia Internet:

```bash
ip route get 1.1.1.1
```

---

## A.5. Verificar comunicación Windows ↔ VM

Desde Windows:

```powershell
ping 192.168.56.10
```

Para verificar HTTP:

```powershell
Test-NetConnection 192.168.56.10 -Port 80
```

Desde Ubuntu:

```bash
ping -c 4 192.168.56.1
```

Si se necesita verificar ARP:

Ubuntu:

```bash
ip neigh show 192.168.56.1
```

Windows:

```powershell
arp -a | findstr 192.168.56.10
```

---

## A.6. Conectarse por SSH

Desde Windows:

```powershell
ssh luca@192.168.56.10
```

Si la huella SSH cambió después de reconstruir la VM:

```powershell
ssh-keygen -R 192.168.56.10
```

y volver a conectar:

```powershell
ssh luca@192.168.56.10
```

---

## A.7. Accesos principales de la VM

Con la configuración Host-Only utilizada:

```text
Windows Host: 192.168.56.1
Ubuntu VM:    192.168.56.10
```

SSH:

```powershell
ssh luca@192.168.56.10
```

Frontend desde el equipo host:

```text
http://192.168.56.10
```

La interfaz NAT (`enp0s3`) se utiliza principalmente para la salida a Internet, actualizaciones y descargas de Docker.

> No conviene hardcodear `192.168.56.10` dentro del frontend. Siempre que sea posible usar rutas relativas como `/api/...` y `/sanctum/...`.

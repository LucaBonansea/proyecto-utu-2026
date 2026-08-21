# Requerimientos del Sistema (PWA - Portal Ciudadano)

## Requerimientos del Servidor (Backend)

| Componente | Requerimiento mínimo |
|---|---|
| Sistema operativo | Linux (Ubuntu Server 20.04+ recomendado) o Windows Server con soporte para PHP |
| Lenguaje | PHP 8.1 o superior |
| Framework | Laravel 10+ |
| Base de datos | MySQL 8.0+ (o MariaDB 10.5+) |
| Servidor web | Apache 2.4+ o Nginx 1.18+ |
| Memoria RAM | 2 GB mínimo (4 GB recomendado) |
| Almacenamiento | 20 GB mínimo (depende del volumen de evidencias multimedia almacenadas) |
| Conexión | Acceso a internet estable, HTTPS habilitado (certificado SSL) |
| Otros | Composer (gestor de dependencias PHP), soporte para extensión PHP `pdo_mysql` |

## Requerimientos del Usuario (Ciudadano / Cliente)

Al tratarse de una PWA (Progressive Web App), no requiere instalación desde una tienda de aplicaciones ni cumplir con requisitos de hardware específicos más allá de los de un navegador moderno.

| Componente | Requerimiento mínimo |
|---|---|
| Dispositivo | Smartphone, tablet o computadora con navegador web |
| Sistema operativo | Android 8+, iOS 13+, o cualquier SO de escritorio (Windows, macOS, Linux) con navegador actualizado |
| Navegador | Chrome, Safari, Firefox o Edge en versión reciente (con soporte para Service Workers) |
| Conexión a internet | Requerida para cargar y sincronizar reclamos; algunas PWA permiten uso limitado offline |
| Permisos del dispositivo | Acceso a cámara (evidencias fotográficas) y geolocalización (ubicación automática del reclamo) |
| Espacio de almacenamiento | Mínimo, ya que no se instala como app nativa (solo caché del navegador) |

## Observaciones

- No se requiere instalación tradicional: el usuario accede desde el navegador y puede opcionalmente "agregar a la pantalla de inicio" para una experiencia similar a una app nativa.
- El enfoque mobile-first implica que el diseño prioriza la experiencia en dispositivos móviles, aunque debe funcionar correctamente también en escritorio.
# Informe de Análisis de Seguridad y Calidad — Portal Ciudadano (UTU 2026)

**Herramienta:** SonarQube 26.8.0.126808 + SonarScanner CLI 8.1.0.6389
**Proyecto:** Portal_Ciudadano
**Fecha del análisis:** 2026-09-08
**Tecnologías:** PHP/Laravel (backend) · HTML/CSS/JavaScript (frontend)
**Dashboard:** http://localhost:9000/dashboard?id=Portal_Ciudadano

---

## 1. Resumen ejecutivo

| Indicador | Valor | Estado |
|---|---|---|
| **Quality Gate** | OK | ✔ Cumple |
| **Vulnerabilidades** | **6** | ⚠ Revisar |
| **Security Hotspots** | 0 | ✔ Ninguno |
| **Nota de seguridad** | D | 🔴 Baja |
| **Bugs** | 9 | ⚠ (1 ya corregido localmente) |
| **Code Smells** | 91 | ⚠ Mantenibilidad |
| **Cobertura de tests** | 0.0 % | ⚠ Sin tests |
| **Duplicación de código** | 1.7 % | ✔ Baja |
| **Líneas de código (NCLOC)** | 10 922 | — |

> El Quality Gate está en **OK**, pero la calificación de seguridad (E) y la ausencia total de
> cobertura de tests indican riesgos que deben atenderse. El análisis excluye `vendor/`, `storage/`
> y directorios de terceros (representaban 63 MB de los 65 MB totales del proyecto).

---

## 2. 🔴 Hallazgos de seguridad (Vulnerabilidades)

### 2.1 Críticas

| # | Severidad | Archivo | Línea | Descripción |
|---|---|---|---|---|
| 1 | **CRITICAL** | `src/backend/dockerfile` | 13 | `COPY` recursivo indiscriminado: puede incluir datos sensibles (p. ej. `.env`, credenciales, backups) dentro de la imagen del contenedor |

### 2.2 Menores

| # | Severidad | Archivo | Línea | Descripción |
|---|---|---|---|---|
| 2 | MINOR | `src/backend/dockerfile` | 1 | La imagen `php` ejecuta como **root** el contenedor; compromiso equivale a control total del host si hay escape |
| 3 | MINOR | `src/frontend/html/index.html` | 78 | Recurso CDN sin atributos `integrity` y `crossorigin="anonymous"` (riesgo de ataque a la cadena de suministro) |
| 4 | MINOR | `src/frontend/html/registro.html` | 89 | Ídem: CDN sin `integrity` / `crossorigin` |
| 5 | MINOR | `src/frontend/html/Provedores.html` | 14 | Ídem: CDN sin `integrity` / `crossorigin` |
| 6 | MINOR | `src/frontend/html/Provedores.html` | 121 | Ídem: CDN sin `integrity` / `crossorigin` |

---

## 3. 🟠 Bugs detectados (9)

| # | Severidad | Archivo | Línea | Regla | Descripción |
|---|---|---|---|---|---|
| 1 | **BLOCKER** | `src/frontend/css/style-administrador.css` | 721 | css:S4650 | `calc(100% -50px)` sin espacio tras el operador `-` → CSS inválido. **✅ Ya corregido localmente** (ahora `calc(100% - 50px)`) |
| 2 | MAJOR | `src/frontend/html/index.html` | 43 | Web:InputWithoutLabelCheck | Input sin `id` ni `label` asociada (accesibilidad) |
| 3 | MAJOR | `src/frontend/html/registro.html` | 45 | Web:InputWithoutLabelCheck | Input sin `id` ni `label` asociada |
| 4 | MAJOR | `src/frontend/html/registro.html` | 55 | Web:InputWithoutLabelCheck | Input sin `id` ni `label` asociada |
| 5 | MAJOR | `src/frontend/html/registro.html` | 62 | Web:InputWithoutLabelCheck | Input sin `id` ni `label` asociada |
| 6 | MAJOR | `src/frontend/html/login-personal.html` | 34 | Web:InputWithoutLabelCheck | Input sin `id` ni `label` asociada |
| 7 | MAJOR | `src/frontend/html/login-personal.html` | 53 | Web:InputWithoutLabelCheck | Input sin `id` ni `label` asociada |
| 8 | MAJOR | `src/frontend/css/style-administrador.css` | 1701 | css:S4656 | Propiedad `border-radius` duplicada |
| 9 | MAJOR | `src/frontend/css/style-provedores.css` | 155 | css:S4656 | Propiedad `cursor` duplicada |

---

## 4. 🟡 Code smells (91) — mantenibilidad

### Distribución por severidad

| Severidad | Cantidad |
|---|---|
| CRITICAL | 4 |
| MAJOR | 61 |
| MINOR | 24 |
| INFO | 2 |
| BLOCKER | 0 |

### Problemas más frecuentes

| Regla | Cantidad | Descripción | Ejemplo |
|---|---|---|---|
| `css:S4666` | 36 | Selectores CSS duplicados | `style-administrador.css` repite bloques (p. ej. `.proveedor-estado`, `.form-proveedor`, `.contenedor-usuarios`) |
| `css:S7924` | 20 | Texto sin contraste mínimo con el fondo (WCAG AA) | Varias reglas en `style-administrador.css` |
| `php:S113` | 18 | Archivos PHP sin nueva línea final (EOF) | Backend Laravel |
| `php:S1192` | 3 | Literales de string duplicados | Backend |
| `php:S125` | 2 | Código comentado sin uso | Backend |
| `php:S1780` | 2 | Controlador/DTOs sin docblocks (estiramiento del alcance) | Backend |
| `css:S1874` | 2 | Propiedad CSS deprecada | CSS |
| `javascript:S4123` | 1 | `await` sobre un valor que no es Promise (posible bug lógico) — **CRITICAL** en `src/frontend/js/script-administrador.js:281` | JS |
| `javascript:S101` | 1 | Nombre de clase no respeta convención | JS |
| `php:S1142` | 1 | Método con demasiados `return` (4 > 3) | `src/backend/app/Services/AuthService.php:23` |
| `css:S1116` | 1 | Regla vacía | CSS |
| `javascript:S1135` | 1 | TODO pendiente en el código | JS |

---

## 5. 🔵 Security Hotspots

| Estado | Cantidad |
|---|---|
| **Abiertos** | **0** |
| Para revisar | 0 |
| Seguros | 0 |

No hay hotspots de seguridad pendientes de revisión en este análisis.

---

## 6. Métricas de calidad

| Métrica | Valor |
|---|---|
| Cobertura de tests | 0.0 % |
| Duplicación | 1.7 % |
| Líneas de código | 14 349 |
| NCLOC (código efectivo) | 10 922 |
| Calificación de mantenibilidad | A (sqale_rating 1.0) |
| Calificación de fiabilidad | E (reliability_rating 5.0) |
| Calificación de seguridad | D (security_rating 4.0) |
| Calificación de revisión de seguridad | A (security_review_rating 1.0) |

---

## 7. Recomendaciones priorizadas

### 🔴 Alta prioridad
1. **`src/backend/dockerfile`**:
   - Usar una imagen con usuario no root (p. ej. `php:8.x-fpm-alpine` + `USER www-data`).
   - Reemplazar `COPY . .` por copias selectivas (`COPY composer.json composer.lock .`, `COPY app ./app`, etc.) o añadir un `.dockerignore` con `.env`, `vendor`, `storage/logs`, `node_modules`.
2. **Firma de recursos CDN** en `index.html`, `registro.html` y `Provedores.html`: agregar `integrity="sha384-..."` y `crossorigin="anonymous"` (generar hash SRI oficial del proveedor).
3. **Cobertura de tests**: incorporar pruebas (PHPUnit ya presente en backend) y reportar cobertura para detectar regresiones de seguridad.

### 🟠 Media prioridad
4. Revisar `await` innecesario en `src/frontend/js/script-administrador.js:281` (await sobre valor no-Promise → comportamiento inesperado).
5. Asociar `id` + `<label>` a los inputs de `index.html`, `registro.html` y `login-personal.html`.
6. Correr un análisis con SonarQube tras los fixes para verificar que la calificación de seguridad suba.

### 🟡 Baja prioridad
7. Eliminar selectores CSS duplicados y corregir contrastes de color (accesibilidad WCAG AA).
8. Aplicar `php-cs-fixer`/nueva línea final en archivos PHP y quitar código comentado.

---

## 8. Notas metodológicas

- **Servidor:** SonarQube Community 26.8.0 en `http://localhost:9000` (estado UP).
- **Scanner:** SonarScanner CLI 8.1.0.6389 (Windows x64), instalado en `C:\sonar-scanner`.
- **Configuración** (`sonar-project.properties`): projectKey `Portal_Ciudadano`, `sonar.sources=.`,
  exclusiones de `**/vendor/**`, `**/storage/**`, `**/node_modules/**`, assets y binarios.
- **Análisis:** 84 archivos de código fuente (PHP + JS/CSS/HTML), duración aprox. 56 s, `EXECUTION SUCCESS`.
- **Reporte procesado:** tarea de Compute Engine en estado `SUCCESS`.

### Reproducir el análisis

```powershell
# desde la raíz del proyecto
& "C:\sonar-scanner\sonar-scanner-8.1.0.6389-windows-x64\bin\sonar-scanner.bat" "-Dsonar.token=<TU_TOKEN>"
```

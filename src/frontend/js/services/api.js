/**
 * INFRAESTRUCTURA HTTP COMPARTIDA
 * Es el último archivo frontend antes de Laravel. Centraliza URL, cookies de
 * sesión y CSRF; cada servicio de dominio indica el endpoint concreto.
 * Ejemplo: login.js -> auth-service.js -> apiFetchConCsrf() -> /api/auth/login.
 */
const USA_PROXY_DEL_CONTENEDOR = window.location.port === "5501";
// Reutiliza una solicitud CSRF en curso para no enviar varias simultáneas.
let preparacionCsrf = null;

// Con Nginx se usa el mismo origen; en desarrollo directo se apunta a Laravel.
export const API_URL = USA_PROXY_DEL_CONTENEDOR
    ? window.location.origin
    : "http://127.0.0.1:8000";

/**
 * Punto único de acceso HTTP al backend.
 * Los servicios de dominio definen los endpoints; el código de DOM no usa fetch.
 */
export function apiFetch(ruta, opciones = {}) {
    const url = ruta.startsWith("http") ? ruta : `${API_URL}${ruta}`;

    return fetch(url, {
        credentials: "include",
        ...opciones
    });
}

export function obtenerCookie(nombre) {
    const prefijo = `${nombre}=`;
    const cookie = document.cookie
        .split("; ")
        .find(item => item.startsWith(prefijo));

    return cookie
        ? decodeURIComponent(cookie.substring(prefijo.length))
        : null;
}

export async function prepararCsrf() {
    // Sanctum entrega la cookie XSRF-TOKEN para peticiones de escritura.
    const response = await apiFetch("/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener la cookie CSRF");
    }
}

export async function obtenerTokenCsrf() {
    let token = obtenerCookie("XSRF-TOKEN");

    if (token) return token;

    // ??= conserva una preparación que ya esté en curso.
    preparacionCsrf ??= prepararCsrf().finally(() => {
        preparacionCsrf = null;
    });

    await preparacionCsrf;

    token = obtenerCookie("XSRF-TOKEN");

    if (!token) {
        throw new Error("No se encontró el token CSRF");
    }

    return token;
}

export async function apiFetchConCsrf(ruta, opciones = {}) {
    const token = await obtenerTokenCsrf();

    // Laravel compara este encabezado con la cookie antes de aceptar la acción.
    return apiFetch(ruta, {
        ...opciones,
        credentials: "include",
        headers: {
            "Accept": "application/json",
            ...opciones.headers,
            "X-XSRF-TOKEN": token
        }
    });
}

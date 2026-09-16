const USA_PROXY_DEL_CONTENEDOR = window.location.port === "5501";

export const API_URL = USA_PROXY_DEL_CONTENEDOR
    ? window.location.origin
    : "http://127.0.0.1:8000";

/**
 * Punto único de acceso HTTP al backend.
 * Los servicios de dominio definen los endpoints; el código de DOM no usa fetch.
 */
export function apiFetch(ruta, opciones = {}) {
    const url = ruta.startsWith("http") ? ruta : `${API_URL}${ruta}`;

    return fetch(url, opciones);
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
    await prepararCsrf();

    const token = obtenerCookie("XSRF-TOKEN");

    if (!token) {
        throw new Error("No se encontró el token CSRF");
    }

    return token;
}

export async function apiFetchConCsrf(ruta, opciones = {}) {
    const token = await obtenerTokenCsrf();

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

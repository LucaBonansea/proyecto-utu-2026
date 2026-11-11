import { apiFetch, apiFetchConCsrf } from "./api.js";

/**
 * SERVICIO DE AUTENTICACIÓN
 * Traduce acciones de la interfaz a endpoints. No toca el DOM ni decide qué
 * pantalla mostrar: devuelve Response para que login.js o inicio.js la procesen.
 */

// Comprueba la sesión actual; inicio.js usa el usuario y el rol de la respuesta.
export function obtenerSesion() {
    return apiFetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
            "Accept": "application/json"
        }
    });
}

export function iniciarSesion(datos) {
    // Escribe estado en el servidor, por eso incluye protección CSRF.
    return apiFetchConCsrf("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
}

export function aceptarPoliticas() {
    return apiFetchConCsrf("/api/auth/aceptar-politicas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ acepta: true })
    });
}


export function cerrarSesion() {
    return apiFetchConCsrf("/api/auth/logout", {
        method: "POST"
    });
}

import { apiFetch, apiFetchConCsrf } from "./api.js";

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

export function registrarUsuario(datos) {
    return apiFetchConCsrf("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(datos)
    });
}

export function cerrarSesion() {
    return apiFetchConCsrf("/api/auth/logout", {
        method: "POST"
    });
}

import { apiFetch, apiFetchConCsrf } from "./api.js";

export function obtenerNotificaciones() {
    return apiFetch("/api/notificaciones", {
        credentials: "include",
        headers: {
            "Accept": "application/json"
        }
    });
}

export function marcarNotificacionLeida(id) {
    return apiFetchConCsrf(`/api/notificaciones/${id}/leer`, {
        method: "PUT"
    });
}

export function marcarTodasNotificacionesLeidas() {
    return apiFetchConCsrf("/api/notificaciones/leer-todas", {
        method: "PUT"
    });
}

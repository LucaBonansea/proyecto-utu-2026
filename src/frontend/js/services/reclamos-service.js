import { apiFetch, apiFetchConCsrf } from "./api.js";

export function obtenerClasificaciones() {
    return apiFetch("/api/clasificaciones", {
        headers: { "Accept": "application/json" }
    });
}

export function obtenerEdificios() {
    return apiFetch("/api/edificios", {
        headers: { "Accept": "application/json" }
    });
}

export function crearReclamo(formData) {
    return apiFetchConCsrf("/api/reclamos", {
        method: "POST",
        body: formData
    });
}

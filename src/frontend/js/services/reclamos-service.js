import { API_URL, apiFetch, apiFetchConCsrf } from "./api.js";

export function obtenerClasificaciones() {
    return apiFetch("/api/clasificaciones", {
        credentials: "include",
        headers: { "Accept": "application/json" }
    });
}

export function obtenerEdificios() {
    return apiFetch("/api/mis-edificios", {
        credentials: "include",
        headers: { "Accept": "application/json" }
    });
}

export function obtenerReclamos({ pagina = 1, filtro = "todos" } = {}) {
    const parametros = new URLSearchParams({
        page: pagina,
        filtro
    });

    return apiFetch(`/api/reclamos?${parametros.toString()}`, {
        credentials: "include",
        headers: { "Accept": "application/json" }
    });
}

export function obtenerUrlEvidencia(rutaArchivo) {
    if (!rutaArchivo) {
        return "";
    }

    const rutaSinBarraInicial = rutaArchivo.replace(/^\/+/, "");

    return `${API_URL}/storage/${rutaSinBarraInicial}`;
}

export function crearReclamo(formData) {
    return apiFetchConCsrf("/api/reclamos", {
        method: "POST",
        body: formData
    });
}

export function confirmarFinalizacion(id) {
    return apiFetchConCsrf(
        `/api/reclamos/${id}/confirmar-finalizacion`,
        {
            method: "PUT"
        }
    );
}

export function rechazarFinalizacion(id, motivo) {
    return apiFetchConCsrf(
        `/api/reclamos/${id}/rechazar-finalizacion`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                motivo_rechazo: motivo
            })
        }
    );
}

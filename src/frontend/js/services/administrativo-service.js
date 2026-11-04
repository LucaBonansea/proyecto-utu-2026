import { apiFetch, apiFetchConCsrf } from "./api.js";

const obtenerListado = ruta => apiFetch(ruta, {
    method: "GET",
    credentials: "include",
    headers: {
        "Accept": "application/json"
    }
});

export const obtenerReclamosAdministrativo = (pagina = 1) =>
    obtenerListado(`/api/admin/reclamos?page=${encodeURIComponent(pagina)}`);

export const obtenerProveedoresAdministrativo = () =>
    obtenerListado("/api/proveedores");

export const actualizarReclamo = (
    reclamoId,
    description,
    prioridad,
    proveedorId
) =>
    apiFetchConCsrf(`/api/admin/reclamos/${reclamoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description,
            prioridad,
            proveedor_id: proveedorId
        })
    });

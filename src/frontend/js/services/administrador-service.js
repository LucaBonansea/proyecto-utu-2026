import { apiFetch, apiFetchConCsrf } from "./api.js";

const obtenerListado = ruta => apiFetch(ruta, {
    method: "GET",
    credentials: "include",
    headers: {
        "Accept": "application/json"
    }
});

const enviarJsonConCsrf = (ruta, method, datos) => apiFetchConCsrf(ruta, {
    method,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
});

export const obtenerEdificios = () => obtenerListado("/api/edificios");
export const obtenerAreas = edificioId => obtenerListado(
    edificioId ? `/api/areas?edificio_id=${encodeURIComponent(edificioId)}` : "/api/areas"
);
export const obtenerUsuarios = () => obtenerListado("/api/usuarios");
export const obtenerProveedores = () => obtenerListado("/api/proveedores");
export const obtenerClasificaciones = () =>
    obtenerListado("/api/clasificaciones");
export const obtenerReclamosAdministrador = () =>
    obtenerListado("/api/admin/reclamos");

export const crearProveedor = datos =>
    enviarJsonConCsrf("/api/proveedores", "POST", datos);

export const cambiarEstadoProveedor = id =>
    apiFetchConCsrf(`/api/proveedores/${id}/estado`, { method: "PUT" });

export const crearEdificio = datos =>
    enviarJsonConCsrf("/api/edificios", "POST", datos);

export const crearArea = datos =>
    enviarJsonConCsrf("/api/areas", "POST", datos);

export const eliminarArea = id =>
    apiFetchConCsrf(`/api/areas/${encodeURIComponent(id)}`, { method: "DELETE" });

export const crearClasificacion = clasificacion =>
    enviarJsonConCsrf("/api/clasificaciones", "POST", { clasificacion });

export const crearUsuario = datos =>
    enviarJsonConCsrf("/api/usuarios", "POST", datos);

export const actualizarUsuario = (cedula, datos) =>
    enviarJsonConCsrf(`/api/usuarios/${encodeURIComponent(cedula)}`, "PUT", datos);

export const eliminarUsuario = (cedula, passwordActual, nuevoSuperAdminCedula = null) =>
    enviarJsonConCsrf(
        `/api/usuarios/${encodeURIComponent(cedula)}`,
        "DELETE",
        {
            password_actual: passwordActual,
            ...(nuevoSuperAdminCedula
                ? { nuevo_super_admin_cedula: nuevoSuperAdminCedula }
                : {})
        }
    );

export const cambiarPasswordUsuario = (cedula, password, passwordActual) =>
    enviarJsonConCsrf(`/api/usuarios/${cedula}/password`, "PUT", {
        password,
        password_actual: passwordActual
    });

export const cambiarRolUsuario = (cedula, datos) =>
    enviarJsonConCsrf(`/api/usuarios/${cedula}/rol`, "PUT", datos);

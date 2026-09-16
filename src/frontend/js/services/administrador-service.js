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
export const obtenerUsuarios = () => obtenerListado("/api/usuarios");
export const obtenerProveedores = () => obtenerListado("/api/proveedores");

export const crearProveedor = datos =>
    enviarJsonConCsrf("/api/proveedores", "POST", datos);

export const cambiarEstadoProveedor = id =>
    apiFetchConCsrf(`/api/proveedores/${id}/estado`, { method: "PUT" });

export const crearEdificio = datos =>
    enviarJsonConCsrf("/api/edificios", "POST", datos);

export const crearUsuario = datos =>
    enviarJsonConCsrf("/api/usuarios", "POST", datos);

export const cambiarPasswordUsuario = (cedula, password) =>
    enviarJsonConCsrf(`/api/usuarios/${cedula}/password`, "PUT", { password });

export const cambiarRolUsuario = (cedula, datos) =>
    enviarJsonConCsrf(`/api/usuarios/${cedula}/rol`, "PUT", datos);

import {
    aceptarPoliticas,
    cerrarSesion,
    iniciarSesion
} from "../services/auth-service.js";
import { notify } from "../utils/toast.js";

const $form_login = document.querySelector(".login-form");
const $input_ci = document.querySelector(".ci-input");
const $input_password = document.querySelector(".pass-input");
const $btn_login = document.querySelector(".btn-login");
const $link_politicas = document.querySelector(".politicas-link");
const $modal_politicas = document.querySelector(".politicas-modal");
const $btn_cerrar_modal = document.querySelector(".politicas-cerrar");
const $contenido_politicas = document.querySelector(".politicas-contenido");
const $aceptacion_politicas = document.querySelector(".politicas-aceptacion");
const $checkbox_politicas = document.querySelector(".politicas-checkbox");
const $btn_secundario = document.querySelector(".btn-politicas-secundario");
const $btn_aceptar = document.querySelector(".btn-politicas-aceptar");

let modo_modal = "lectura";
let usuario_pendiente = null;
let elemento_foco_anterior = null;
let cancelando_acceso = false;

$input_ci.addEventListener("input", () => $input_ci.classList.remove("error"));
$input_password.addEventListener("input", () => $input_password.classList.remove("error"));
$form_login.addEventListener("submit", manejarLogin);
$link_politicas.addEventListener("click", () => abrirModalPoliticas("lectura"));
$checkbox_politicas.addEventListener("change", () => {
    $btn_aceptar.disabled = !$checkbox_politicas.checked;
});
$btn_aceptar.addEventListener("click", aceptarPoliticasPendientes);
$btn_secundario.addEventListener("click", manejarCierreModal);
$btn_cerrar_modal.addEventListener("click", manejarCierreModal);
document.addEventListener("keydown", manejarTeclaModal);

async function manejarLogin(event) {
    event.preventDefault();

    const datos = {
        cedula: $input_ci.value,
        password: $input_password.value
    };

    cambiarEstadoLogin(true, "Iniciando sesión...");

    try {
        const request = await iniciarSesion(datos);
        const response = await leerRespuestaJson(request);

        if (!request.ok) {
            mostrarErrorLogin(request.status, response);
            return;
        }

        $input_ci.classList.remove("error");
        $input_password.classList.remove("error");

        // La base de datos decide si esta cuenta debe aceptar antes de continuar.
        if (response.requiere_aceptar_politicas) {
            usuario_pendiente = response.usuario;
            abrirModalPoliticas("obligatorio");
            return;
        }

        continuarAcceso(response.usuario);
    } catch (error) {
        console.error("No se pudo completar el inicio de sesión.", error);
        cambiarEstadoLogin(false, "[ERROR] Intentar de nuevo");
        notify.error("No se pudo conectar con el servidor");
    }
}

function abrirModalPoliticas(modo) {
    modo_modal = modo;
    elemento_foco_anterior = document.activeElement;

    const es_obligatorio = modo === "obligatorio";
    $aceptacion_politicas.hidden = !es_obligatorio;
    $btn_aceptar.hidden = !es_obligatorio;
    $btn_secundario.textContent = es_obligatorio ? "Cancelar" : "Cerrar";
    $btn_cerrar_modal.setAttribute(
        "aria-label",
        es_obligatorio ? "Cancelar y volver al inicio de sesión" : "Cerrar políticas"
    );
    $checkbox_politicas.checked = false;
    $btn_aceptar.disabled = true;
    $modal_politicas.hidden = false;
    document.body.classList.add("modal-abierto");

    requestAnimationFrame(() => {
        (es_obligatorio ? $checkbox_politicas : $contenido_politicas).focus();
    });
}

function cerrarModalPoliticas() {
    $modal_politicas.hidden = true;
    document.body.classList.remove("modal-abierto");
    elemento_foco_anterior?.focus();
}

async function manejarCierreModal() {
    if (modo_modal === "lectura") {
        cerrarModalPoliticas();
        return;
    }

    await cancelarPoliticasObligatorias();
}

async function cancelarPoliticasObligatorias() {
    if (cancelando_acceso) {
        return;
    }

    cancelando_acceso = true;

    try {
        await cerrarSesion();
    } catch (error) {
        console.error("No se pudo cerrar la sesión pendiente.", error);
    } finally {
        cancelando_acceso = false;
        usuario_pendiente = null;
        $input_password.value = "";
        cerrarModalPoliticas();
        cambiarEstadoLogin(false, "Iniciar sesión");
        $input_password.focus();
    }
}

async function aceptarPoliticasPendientes() {
    if (!$checkbox_politicas.checked || !usuario_pendiente) {
        return;
    }

    $btn_aceptar.disabled = true;
    $btn_aceptar.textContent = "Guardando...";

    try {
        const request = await aceptarPoliticas();
        const response = await leerRespuestaJson(request);

        if (!request.ok) {
            notify.error(response.mensaje || "No se pudo guardar la aceptación.");
            $btn_aceptar.disabled = false;
            return;
        }

        const usuario = response.usuario || usuario_pendiente;
        cerrarModalPoliticas();
        continuarAcceso(usuario);
    } catch (error) {
        console.error("No se pudo guardar la aceptación de políticas.", error);
        notify.error("No se pudo conectar con el servidor");
        $btn_aceptar.disabled = false;
    } finally {
        $btn_aceptar.textContent = "Aceptar y continuar";
    }
}

function manejarTeclaModal(event) {
    if (event.key !== "Escape" || $modal_politicas.hidden) {
        return;
    }

    event.preventDefault();
    manejarCierreModal();
}

function mostrarErrorLogin(status, response) {
    cambiarEstadoLogin(false, "Intentar nuevamente");

    if (status === 401) {
        $input_ci.classList.add("error");
        $input_password.classList.add("error");
        notify.error(response.mensaje);
        return;
    }

    if (status === 422) {
        if (response.errors?.cedula) {
            $input_ci.classList.add("error");
            notify.error(response.errors.cedula[0]);
        }

        if (response.errors?.password) {
            $input_password.classList.add("error");
            notify.error(response.errors.password[0]);
        }
        return;
    }

    if (status === 419) {
        notify.error("La sesión de seguridad expiró. Intentá nuevamente.");
        return;
    }

    notify.error(response.mensaje || "No se pudo iniciar sesión.");
}

function continuarAcceso(usuario) {
    notify.success("Usuario inició sesión correctamente");

    setTimeout(() => redirigirSegunRol(usuario.rol), 800);
}

function redirigirSegunRol(rol) {
    const destinos = {
        administrador: "./administrador.html",
        administrativo: "./Administrativos.html",
        usuario_proveedor: "./Provedores.html"
    };

    window.location.replace(destinos[rol] || "./inicio.html");
}

function cambiarEstadoLogin(cargando, texto) {
    $btn_login.disabled = cargando;
    $btn_login.textContent = texto;
}

async function leerRespuestaJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

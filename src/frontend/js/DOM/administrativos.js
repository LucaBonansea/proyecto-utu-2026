
/**
 * ============================================================================
 * FLUJO GENERAL DE LA APLICACIÓN
 * ============================================================================
 *
 * 1. Verifica la sesión y los permisos del usuario.
 * 2. Obtiene los reclamos pendientes de validación.
 * 3. Muestra tarjetas con edificio, área y clasificación.
 * 4. Permite ver el detalle, editar la descripción y cambiar la prioridad.
 * 5. Permite seleccionar un proveedor y validar el reclamo.
 * ============================================================================
 */

import { cerrarSesion, obtenerSesion } from "../services/auth-service.js";
import {
    obtenerReclamosAdministrativo,
    obtenerProveedoresAdministrativo,
    actualizarReclamo
} from "../services/administrativo-service.js";
import { obtenerUrlEvidencia } from "../services/reclamos-service.js";
import { notify } from "../utils/toast.js?v=20261016-1";
import { inicializarTema } from "../theme.js";
import { inicializarNotificaciones } from "./notifications.js";

// Elementos del DOM.
const section = document.querySelector("main > section");
const filtro_container = document.querySelector("#filtro-container");
const modal = document.querySelector("#modal-reclamo");
const contenidoModal = document.querySelector("#contenido-modal");
const cerrarModal = modal.querySelector(".cerrar-modal");
const fondoModal = modal.querySelector(".fondo-modal");
const logoutbtn = document.querySelector(".logout");
const cuentaButton = document.getElementById("btn-cuenta-administrativo");
const cuentaModal = document.getElementById("cuenta-administrativo");
const cuentaFondo = cuentaModal.querySelector(".cuenta-administrativo-fondo");
const cuentaCerrar = cuentaModal.querySelector(".cuenta-administrativo-cerrar");
const cuentaNombre = document.getElementById("cuenta-administrativo-nombre");
const cuentaCedula = document.getElementById("cuenta-administrativo-cedula");
const cuentaTelefono = document.getElementById("cuenta-administrativo-telefono");
const cuentaEmail = document.getElementById("cuenta-administrativo-email");
const cuentaRol = document.getElementById("cuenta-administrativo-rol");
const cuentaEstado = document.getElementById("cuenta-administrativo-estado");

// Reclamos pendientes en memoria.
let reclamosAValidar = [];
let usuarioActual = null;

function completarCuenta(usuario) {
    cuentaNombre.textContent = usuario.nombre || "No registrado";
    cuentaCedula.textContent = usuario.cedula || "No registrada";
    cuentaTelefono.textContent = usuario.telefono || "No registrado";
    cuentaEmail.textContent = usuario.email || "No registrado";
    cuentaRol.textContent = usuario.rol === "administrativo"
        ? "Administrativo departamental"
        : usuario.rol || "No registrado";
    cuentaEstado.textContent = usuario.activo ? "Activa" : "Inactiva";
}

function abrirCuenta() {
    if (!usuarioActual) return;

    completarCuenta(usuarioActual);
    document.querySelector(".menu-top-notificaciones")?.classList.remove("active");
    document.querySelector(".notificaciones-btn-top")?.setAttribute("aria-expanded", "false");
    cuentaModal.classList.add("activa");
    cuentaModal.setAttribute("aria-hidden", "false");
    cuentaButton.setAttribute("aria-expanded", "true");
    document.body.classList.add("cuenta-administrativo-abierta");
    cuentaCerrar.focus();
}

function cerrarCuenta() {
    if (!cuentaModal.classList.contains("activa")) return;

    cuentaModal.classList.remove("activa");
    cuentaModal.setAttribute("aria-hidden", "true");
    cuentaButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("cuenta-administrativo-abierta");
    cuentaButton.focus();
}

// ============================================================================
// CIERRE DEL MODAL
// ============================================================================

function cerrarDetalle() {
    modal.classList.remove("activo");
    contenidoModal.innerHTML = "";
}

cerrarModal.addEventListener("click", cerrarDetalle);
fondoModal.addEventListener("click", cerrarDetalle);
logoutbtn.addEventListener("click", cerrar_sesion);
cuentaButton.addEventListener("click", abrirCuenta);
cuentaFondo.addEventListener("click", cerrarCuenta);
cuentaCerrar.addEventListener("click", cerrarCuenta);
document.addEventListener("keydown", event => {
    if (event.key === "Escape") cerrarCuenta();
});

// ============================================================================
// VERIFICACIÓN DE SESIÓN
// ============================================================================

async function verificar_sesion() {
    try {
        const request = await obtenerSesion();

        if (!request.ok) {
            window.location.replace("./index.html");
            return null;
        }

        const response = await request.json();
        const usuario = response.usuario;

        switch (usuario.rol) {
            case "administrativo":
                return usuario;

            case "administrador":
                window.location.replace("./administrador.html");
                return null;

            case "usuario_proveedor":
                window.location.replace("./Provedores.html");
                return null;

            default:
                window.location.replace("./inicio.html");
                return null;
        }
    } catch (error) {
        console.error("Error verificando sesión:", error);
        window.location.replace("./index.html");
        return null;
    }
}

// ============================================================================
// CARGA DE RECLAMOS
// ============================================================================

async function iniciarAplicacion() {
    try {
        const request = await obtenerReclamosAdministrativo();

        if (!request.ok) {
            throw new Error(
                `No se pudieron obtener los reclamos (HTTP ${request.status}).`
            );
        }

        const response = await request.json();

        reclamosAValidar = Array.isArray(response.reclamos)
            ? response.reclamos
            : [];

        vistaLista();
    } catch (error) {
        console.error("Error obteniendo reclamos:", error);
        notify.error("No se pudieron cargar los reclamos.");

        section.innerHTML = `
            <p style="padding:20px;">
                No se pudieron cargar los reclamos.
                Recargá la página para intentar de nuevo.
            </p>
        `;
    }
}

// ============================================================================
// CIERRE DE SESIÓN
// ============================================================================

async function cerrar_sesion() {
    logoutbtn.disabled = true;

    try {
        const request = await cerrarSesion();
        const response = await request.json();

        if (!request.ok) {
            throw new Error(
                response.mensaje || "No se pudo cerrar la sesión."
            );
        }

        notify.success(
            response.mensaje || "Sesión cerrada correctamente."
        );

        setTimeout(() => {
            window.location.replace("./index.html");
        }, 800);
    } catch (error) {
        console.error("Error cerrando sesión:", error);
        notify.error(error.message || "No se pudo cerrar la sesión.");
        logoutbtn.disabled = false;
    }
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

async function iniciar() {
    try {
        const usuario = await verificar_sesion();

        if (!usuario) return;

        usuarioActual = usuario;
        inicializarTema();
        inicializarNotificaciones();

        await iniciarAplicacion();
    } finally {
        window.finalizarCargaInterfaz?.();
    }
}

document.addEventListener("DOMContentLoaded", iniciar);

// ============================================================================
// BANDEJA DE RECLAMOS
// ============================================================================

function vistaLista() {
    filtro_container.innerHTML = "";

    section.removeAttribute("style");
    section.style.display = "block";
    section.classList.remove("contenedor-masonry");

    if (reclamosAValidar.length === 0) {
        section.innerHTML = `
            <div class="estado-vacio-administrativo">
                <span class="material-symbols-outlined" aria-hidden="true">fact_check</span>
                <h2>No hay reclamos pendientes</h2>
                <p>Los nuevos reclamos que necesiten validación aparecerán en esta sección.</p>
            </div>
        `;
        return;
    }

    const columnas = [[], [], [], []];

    reclamosAValidar.forEach((reclamo, index) => {
        columnas[index % 4].push(reclamo);
    });

    section.innerHTML = `
        <div class="contenedor-masonry">

            ${columnas.map(columna => `
                <div class="columna-masonry">

                    ${columna.map(reclamo => `
                        <div
                            class="reclamo-card-basica"
                            data-id="${reclamo.id}"
                        >

                            <div class="foto-reclamo-basica">
                                <img
                                    src="${reclamo.evidencia
                                        ? obtenerUrlEvidencia(
                                            reclamo.evidencia.ruta_archivo
                                        )
                                        : ""}"
                                    alt="Evidencia del reclamo"
                                >
                            </div>

                            <div class="info-basica">

                                <p class="reclamo-titulo-basico">
                                    ${reclamo.description ?? "Sin descripción"}
                                </p>

                                <p class="fecha">
                                    ${reclamo.created_at
                                        ? new Date(
                                            reclamo.created_at
                                        ).toLocaleDateString("es-UY")
                                        : "Fecha no disponible"}
                                </p>

                                <p>
                                    Edificio:
                                    ${reclamo.edificio?.nombre
                                        ?? "Edificio no disponible"}
                                </p>

                                <p>
                                    Área:
                                    ${reclamo.area?.nombre
                                        ?? "Sin área asignada"}
                                </p>

                                <p>
                                    Clasificación:
                                    ${reclamo.clasificacion?.clasificacion
                                        ?? "Sin clasificación"}
                                </p>

                            </div>

                            <button class="btn-ver-detalle">
                                Ver detalle
                            </button>

                        </div>
                    `).join("")}

                </div>
            `).join("")}

        </div>
    `;

    document.querySelectorAll(".reclamo-card-basica").forEach(card => {
        const id = card.dataset.id;

        card.querySelector(".btn-ver-detalle")
            .addEventListener("click", () => {
                vistaDetalle(id);
            });
    });
}

// ============================================================================
// MODAL DE DETALLE
// ============================================================================

async function vistaDetalle(id) {
    const reclamo = reclamosAValidar.find(r => r.id == id);

    if (!reclamo) return;

    contenidoModal.innerHTML = `
        <div class="primerdiv-reclamo" data-id="${reclamo.id}">
            <div class="segundodiv-reclamo">
                <div class="foto-reclamo">
                    <div class="evidencia-etiqueta">
                        <span class="material-symbols-outlined" aria-hidden="true">image</span>
                        Evidencia adjunta
                    </div>
                    ${reclamo.evidencia?.ruta_archivo ? `
                        <img
                            src="${obtenerUrlEvidencia(reclamo.evidencia.ruta_archivo)}"
                            alt="Evidencia del reclamo"
                        >
                    ` : `
                        <div class="evidencia-vacia">
                            <span class="material-symbols-outlined" aria-hidden="true">image_not_supported</span>
                            <strong>Sin evidencia adjunta</strong>
                        </div>
                    `}
                </div>

                <div class="info-reclamo">
                    <div class="detalle-reclamo-cabecera">
                        <div class="detalle-reclamo-descripcion">
                            <span class="detalle-reclamo-etiqueta">Descripción del reclamo</span>
                            <p class="reclamo-titulo" contenteditable="false">
                                ${reclamo.description ?? "Sin descripción"}
                            </p>
                        </div>
                        <button class="camb-titulo" type="button" aria-label="Editar descripción">
                            <span class="material-symbols-outlined" aria-hidden="true">edit</span>
                            <span class="camb-titulo-texto">Editar</span>
                        </button>
                    </div>

                    <div class="detalle-reclamo-datos">
                        <div class="detalle-reclamo-dato">
                            <span class="material-symbols-outlined" aria-hidden="true">person</span>
                            <div><small>Usuario</small><strong>${reclamo.usuario?.nombre ?? "No disponible"}</strong></div>
                        </div>
                        <div class="detalle-reclamo-dato">
                            <span class="material-symbols-outlined" aria-hidden="true">apartment</span>
                            <div><small>Edificio</small><strong>${reclamo.edificio?.nombre ?? "No disponible"}</strong></div>
                        </div>
                        <div class="detalle-reclamo-dato">
                            <span class="material-symbols-outlined" aria-hidden="true">meeting_room</span>
                            <div><small>Área</small><strong>${reclamo.area?.nombre ?? "Sin área asignada"}</strong></div>
                        </div>
                        <div class="detalle-reclamo-dato">
                            <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
                            <div><small>Dirección</small><strong>${reclamo.edificio?.direccion ?? "No disponible"}</strong></div>
                        </div>
                        <div class="detalle-reclamo-dato detalle-reclamo-dato-ancho">
                            <span class="material-symbols-outlined" aria-hidden="true">category</span>
                            <div><small>Clasificación</small><strong>${reclamo.clasificacion?.clasificacion ?? "No disponible"}</strong></div>
                        </div>
                    </div>

                    <div class="detalle-reclamo-resumen">
                        <div class="detalle-resumen-item">
                            <span class="material-symbols-outlined" aria-hidden="true">progress_activity</span>
                            <div><small>Estado</small><strong>${reclamo.estado ?? "No disponible"}</strong></div>
                        </div>
                        <div class="detalle-resumen-item">
                            <span class="material-symbols-outlined" aria-hidden="true">calendar_today</span>
                            <div><small>Fecha</small><strong>${reclamo.created_at ? new Date(reclamo.created_at).toLocaleDateString("es-UY") : "No disponible"}</strong></div>
                        </div>
                        <button class="btn-prioridad ${reclamo.prioridad === "Urgente" ? "urgente" : ""}" type="button">
                            <span class="material-symbols-outlined" aria-hidden="true">priority_high</span>
                            <span class="btn-prioridad-texto">${reclamo.prioridad === "Urgente" ? "Quitar urgencia" : "Marcar urgencia"}</span>
                        </button>
                    </div>

                    <div class="detalle-asignacion">
                        <label for="proveedor-reclamo-${reclamo.id}">
                            <span class="material-symbols-outlined" aria-hidden="true">engineering</span>
                            Asignar proveedor
                        </label>
                        <div class="detalle-asignacion-controles">
                            <select id="proveedor-reclamo-${reclamo.id}" class="select-area">
                                <option value="" selected disabled>Seleccionar proveedor</option>
                            </select>
                            <button class="btn-enviar-area" type="button">
                                <span class="material-symbols-outlined" aria-hidden="true">send</span>
                                Validar y asignar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const card = contenidoModal.querySelector(".primerdiv-reclamo");

    const selectProveedor = card.querySelector(".select-area");

    // Mostrar el modal cuando su contenido está listo.
    modal.classList.add("activo");

    // ========================================================================
    // CARGA DE PROVEEDORES
    // ========================================================================

    let proveedores;

    try {
        const requestProveedores =
            await obtenerProveedoresAdministrativo();

        if (!requestProveedores.ok) {
            throw new Error(
                `No se pudieron obtener los proveedores (HTTP ${requestProveedores.status}).`
            );
        }

        proveedores = await requestProveedores.json();

        if (!Array.isArray(proveedores)) {
            throw new Error("Formato de proveedores inesperado.");
        }
    } catch (error) {
        console.error("Error obteniendo proveedores:", error);

        notify.error("No se pudieron cargar los proveedores.");

        selectProveedor.innerHTML = `
            <option value="">
                No se pudieron cargar los proveedores
            </option>
        `;

        return;
    }

    selectProveedor.innerHTML = `
        <option value="" selected disabled>
            Seleccionar proveedor
        </option>

        ${proveedores.map(proveedor => `
            <option value="${proveedor.id}">
                ${proveedor.nombre}
            </option>
        `).join("")}
    `;

    // ========================================================================
    // EDICIÓN DE LA DESCRIPCIÓN
    // ========================================================================

    const btnDescripcion = card.querySelector(".camb-titulo");
    const textoBtnDescripcion = card.querySelector(".camb-titulo-texto");
    const descripcion = card.querySelector(".reclamo-titulo");

    btnDescripcion.addEventListener("click", () => {
        if (descripcion.contentEditable === "true") {
            guardarDescripcion();
        } else {
            descripcion.contentEditable = true;
            descripcion.classList.add("editando");
            descripcion.focus();

            textoBtnDescripcion.textContent = "Guardar";
            btnDescripcion.setAttribute("aria-label", "Guardar descripción");
        }
    });

    descripcion.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            guardarDescripcion();
        }
    });

    function guardarDescripcion() {
        descripcion.contentEditable = false;
        descripcion.classList.remove("editando");

        textoBtnDescripcion.textContent = "Editar";
        btnDescripcion.setAttribute("aria-label", "Editar descripción");

        reclamo.description = descripcion.textContent.trim();

        descripcion.blur();
    }

    // ========================================================================
    // CAMBIO DE PRIORIDAD
    // ========================================================================

    if (!reclamo.prioridad) {
        reclamo.prioridad = "Normal";
    }

    const btnPrioridad = card.querySelector(".btn-prioridad");
    const textoPrioridad = card.querySelector(".btn-prioridad-texto");

    btnPrioridad.addEventListener("click", () => {
        if (reclamo.prioridad === "Urgente") {
            reclamo.prioridad = "Normal";
            textoPrioridad.textContent = "Marcar urgencia";
            btnPrioridad.classList.remove("urgente");
        } else {
            reclamo.prioridad = "Urgente";
            textoPrioridad.textContent = "Quitar urgencia";
            btnPrioridad.classList.add("urgente");
        }
    });

    // ========================================================================
    // VALIDAR RECLAMO Y ASIGNAR PROVEEDOR
    // ========================================================================

    const btnEnviar = card.querySelector(".btn-enviar-area");

    btnEnviar.addEventListener("click", async () => {
        if (btnEnviar.disabled) return;

        if (descripcion.contentEditable === "true") {
            guardarDescripcion();
        }

        const proveedor = selectProveedor.value;

        if (!proveedor) {
            notify.warning(
                "Selecciona un proveedor antes de validar el reclamo."
            );
            return;
        }

        try {
            btnEnviar.disabled = true;

            const request = await actualizarReclamo(
                reclamo.id,
                reclamo.description,
                reclamo.prioridad,
                proveedor
            );

            if (!request.ok) {
                notify.error("No se pudo actualizar el reclamo.");
                return;
            }

            reclamosAValidar = reclamosAValidar.filter(
                r => r.id != reclamo.id
            );

            notify.success("Reclamo validado correctamente.");

            cerrarDetalle();
            vistaLista();

        } catch (error) {
            console.error("Error actualizando reclamo:", error);

            notify.error(
                "Ocurrió un error al actualizar el reclamo."
            );
        } finally {
            btnEnviar.disabled = false;
        }
    });
}

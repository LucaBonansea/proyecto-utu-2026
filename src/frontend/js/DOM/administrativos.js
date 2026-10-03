import { obtenerSesion } from "../services/auth-service.js";
import {
    obtenerReclamosAdministrativo,
    obtenerProveedoresAdministrativo,
    actualizarReclamo
} from "../services/administrativo-service.js";
import { obtenerUrlEvidencia } from "../services/reclamos-service.js";
import { notify } from "../utils/toast.js";

const section = document.querySelector("section");
const filtro_container = document.querySelector("#filtro-container");
const modal = document.querySelector("#modal-reclamo");
const contenidoModal = document.querySelector("#contenido-modal");
const cerrarModal = modal.querySelector(".cerrar-modal");
const fondoModal = modal.querySelector(".fondo-modal");

function cerrarDetalle() {
    modal.classList.remove("activo");
    contenidoModal.innerHTML = "";
}
cerrarModal.addEventListener("click", cerrarDetalle);
fondoModal.addEventListener("click", cerrarDetalle);

let reclamosAValidar = [];

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

async function iniciarAplicacion() {
    try {
        const request = await obtenerReclamosAdministrativo();

        if (!request.ok) {
            notify.error("No se pudieron obtener los reclamos.");
            return;
        }

        const response = await request.json();

        reclamosAValidar = response.reclamos;

        vistaLista();

    } catch (error) {
        console.error("Error obteniendo reclamos:", error);
        notify.error("No se pudieron cargar los reclamos.");
    }
}

async function iniciar() {
    const usuario = await verificar_sesion();

    if (!usuario) {
        return;
    }

    iniciarAplicacion();
}

document.addEventListener("DOMContentLoaded", iniciar);

function vistaLista() {
    filtro_container.innerHTML = "";
    section.removeAttribute("style");
    section.style.display = "block";
    section.classList.remove("contenedor-masonry");

    if (reclamosAValidar.length === 0) {
        section.innerHTML = `
            <p style="padding:20px;">
                No hay reclamos pendientes de validación.
            </p>
        `;
        return;
    }

    const columnas = [[], [], [], []];

    reclamosAValidar.forEach((r, index) => {
        columnas[index % 4].push(r);
    });

    section.innerHTML = `
        <div class="contenedor-masonry">

            ${columnas.map(columna => `
                <div class="columna-masonry">

                    ${columna.map(r => `
                        <div class="reclamo-card-basica" data-id="${r.id}">

                            <div class="foto-reclamo-basica">
                                <img
                                    src="${r.evidencia
                                        ? obtenerUrlEvidencia(r.evidencia.ruta_archivo)
                                        : ""}"
                                    alt="Evidencia del reclamo"
                                >
                            </div>

                            <div class="info-basica">

                                <p class="reclamo-titulo-basico">
                                    ${r.description}
                                </p>

                                <p class="fecha">
                                    ${new Date(r.created_at)
                                        .toLocaleDateString("es-UY")}
                                </p>

                                <p>
                                    ${r.edificio?.nombre ?? "Edificio no disponible"}
                                </p>

                                <p>
                                    ${r.clasificacion?.clasificacion
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

async function vistaDetalle(id) {
    const reclamo = reclamosAValidar.find(r => r.id == id);

    if (!reclamo) {
        return;
    }

    contenidoModal.innerHTML = `
        <div class="primerdiv-reclamo" data-id="${reclamo.id}">

            <div class="segundodiv-reclamo">

                <div class="info-reclamo">

                    <p class="reclamo-titulo" contenteditable="false">
                        ${reclamo.description}
                    </p>

                    <button class="camb-titulo">
                        Editar descripción
                    </button>

                    <p class="user-p">
                        Usuario:
                        ${reclamo.usuario?.nombre ?? "No disponible"}
                    </p>

                    <p class="user-p">
                        Edificio:
                        ${reclamo.edificio?.nombre ?? "No disponible"}
                    </p>

                    <p class="user-p">
                        Dirección:
                        ${reclamo.edificio?.direccion ?? "No disponible"}
                    </p>

                    <p class="user-p">
                        Clasificación:
                        ${reclamo.clasificacion?.clasificacion
                            ?? "No disponible"}
                    </p>

                    <div class="estado">

                        Estado: ${reclamo.estado}
                        
                    </div>
                    <div class="acciones-reclamo">

                        <button class="btn-prioridad">
                            ${reclamo.prioridad === "Urgente"
                                ? "Quitar urgencia"
                                : "Marcar urgencia"}
                        </button>

                        <button class="denegar">
                            Denegar
                        </button>

                    </div>

                    <p class="fecha">
                        ${new Date(reclamo.created_at)
                            .toLocaleDateString("es-UY")}
                    </p>

                    <select class="select-area">

                        <option value="" selected disabled>
                            Seleccionar proveedor
                        </option>

                    </select>
                    <div class="enviar-area">

                        <button class="btn-enviar-area">

                            <span class="material-symbols-outlined">
                                send
                            </span>

                            Validar y asignar proveedor

                        </button>

                    </div>

                </div>

                <div class="foto-reclamo">

                    <img
                        src="${reclamo.evidencia
                            ? obtenerUrlEvidencia(
                                reclamo.evidencia.ruta_archivo
                            )
                            : ""}"
                        alt="Evidencia del reclamo"
                    >

                </div>

            </div>

        </div>
    `;

    const card = contenidoModal.querySelector(
        ".primerdiv-reclamo"
    );

    const selectProveedor = card.querySelector(
        ".select-area"
    );

    /*
     * Abrimos el modal después de colocar
     * el contenido.
     */
    modal.classList.add("activo");

    /*
     * Cargar proveedores
     */
    const requestProveedores =
        await obtenerProveedoresAdministrativo();

    if (!requestProveedores.ok) {
        notify.error(
            "No se pudieron obtener los proveedores."
        );
        return;
    }

    const proveedores =
        await requestProveedores.json();

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

    /*
     * Editar descripción
     */
    const btnDescripcion =
        card.querySelector(".camb-titulo");

    const descripcion =
        card.querySelector(".reclamo-titulo");

    btnDescripcion.addEventListener("click", () => {

        if (descripcion.contentEditable === "true") {

            guardarDescripcion();

        } else {

            descripcion.contentEditable = true;

            descripcion.classList.add("editando");

            descripcion.focus();

            btnDescripcion.textContent =
                "Guardar descripción";
        }
    });

    descripcion.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            guardarDescripcion();
        }
    });

    function guardarDescripcion() {

        descripcion.contentEditable = false;

        descripcion.classList.remove("editando");

        btnDescripcion.textContent =
            "Editar descripción";

        reclamo.description =
            descripcion.textContent.trim();

        descripcion.blur();
    }

    /*
     * Prioridad
     */
    if (!reclamo.prioridad) {
        reclamo.prioridad = "Normal";
    }

    const btnPrioridad =
        card.querySelector(".btn-prioridad");

    btnPrioridad.addEventListener("click", () => {

        if (reclamo.prioridad === "Urgente") {

            reclamo.prioridad = "Normal";

            btnPrioridad.textContent =
                "Marcar urgencia";

        } else {

            reclamo.prioridad = "Urgente";

            btnPrioridad.textContent =
                "Quitar urgencia";
        }
    });

    /*
     * Denegar
     */
    card.querySelector(".denegar")
        .addEventListener("click", () => {

            if (confirm("¿Denegar este reclamo?")) {

                reclamosAValidar =
                    reclamosAValidar.filter(
                        r => r.id != reclamo.id
                    );

                cerrarDetalle();

                vistaLista();
            }
        });

    /*
     * Validar y asignar proveedor
     */
    card.querySelector(".btn-enviar-area")
        .addEventListener("click", async () => {

            const proveedor =
                selectProveedor.value;

            if (!proveedor) {

                notify.warning(
                    "Selecciona un proveedor antes de validar el reclamo."
                );

                return;
            }

            try {

                const request =
                    await actualizarReclamo(
                        reclamo.id,
                        reclamo.description,
                        reclamo.prioridad,
                        proveedor
                    );

                if (!request.ok) {

                    notify.error(
                        "No se pudo actualizar el reclamo."
                    );

                    return;
                }

                reclamosAValidar =
                    reclamosAValidar.filter(
                        r => r.id != reclamo.id
                    );

                notify.success(
                    "Reclamo validado correctamente."
                );

                cerrarDetalle();

                vistaLista();

            } catch (error) {

                console.error(
                    "Error actualizando reclamo:",
                    error
                );

                notify.error(
                    "Ocurrió un error al actualizar el reclamo."
                );
            }
        });
}
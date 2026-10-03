import {
    apiFetch,
    apiFetchConCsrf
} from "../services/api.js";

import {
    obtenerUrlEvidencia
} from "../services/reclamos-service.js";

let reclamos = [];
let reclamoActual = null;
let filtroActual = "todos";
let datosUsuario = null;

const listaReclamos = document.getElementById("lista-reclamos");
const containerReclamos = document.getElementById("container-reclamos");

const containerUrgentes = document.getElementById("container-urgentes");
const cantidadUrgentes = document.getElementById("cantidad-urgentes");

const detalleReclamo = document.getElementById("detalle-reclamo");
const btnVolver = document.getElementById("btn-volver");

const btnCuenta = document.getElementById("btn-cuenta");
const btnLogout = document.getElementById("btn-logout");

const cuentaPanel = document.getElementById("cuenta-panel");
const btnVolverCuenta = document.getElementById("btn-volver-cuenta");

const cuentaMensaje = document.getElementById("cuenta-mensaje");
const cuentaNombre = document.getElementById("cuenta-nombre");
const cuentaCedula = document.getElementById("cuenta-cedula");
const cuentaEmail = document.getElementById("cuenta-email");
const cuentaTelefono = document.getElementById("cuenta-telefono");
const cuentaProveedor = document.getElementById("cuenta-proveedor");
const cuentaRol = document.getElementById("cuenta-rol");

const mensajePagina = document.getElementById("mensaje-pagina");

const detalleImagen = document.getElementById("detalle-imagen");
const detalleTitulo = document.getElementById("detalle-titulo");
const detallePrioridad = document.getElementById("detalle-prioridad");
const detalleEstado = document.getElementById("detalle-estado");
const detalleFecha = document.getElementById("detalle-fecha");
const detalleDescripcion = document.getElementById("detalle-descripcion");
const detalleEdificio = document.getElementById("detalle-edificio");
const detalleDireccion = document.getElementById("detalle-direccion");
const detalleClasificacion = document.getElementById("detalle-clasificacion");

const aceptarContainer = document.getElementById("aceptar-container");
const btnAceptar = document.getElementById("btn-aceptar");

const formResolver = document.getElementById("form-resolver");

const fotoResolucion = document.getElementById("foto-resolucion");
const previewContainer = document.getElementById("preview-container");
const previewResolucion = document.getElementById("preview-resolucion");

const observaciones = document.getElementById("observaciones");
const btnFinalizar = document.getElementById("btn-finalizar");

function mostrarMensaje(texto, error = false) {
    if (!mensajePagina) {
        return;
    }

    mensajePagina.textContent = texto;

    mensajePagina.classList.remove("oculto");

    mensajePagina.classList.toggle(
        "error",
        error
    );

    setTimeout(() => {
        mensajePagina.classList.add("oculto");
    }, 3000);
}

function mostrarLista() {
    listaReclamos.classList.remove("oculto");
    detalleReclamo.classList.add("oculto");

    if (cuentaPanel) {
        cuentaPanel.classList.add("oculto");
    }

    reclamoActual = null;

    renderizarReclamos();
    renderizarUrgentes();
}

function mostrarDetalle() {
    listaReclamos.classList.add("oculto");

    if (cuentaPanel) {
        cuentaPanel.classList.add("oculto");
    }

    detalleReclamo.classList.remove("oculto");
}

function mostrarCuenta() {
    listaReclamos.classList.add("oculto");
    detalleReclamo.classList.add("oculto");

    if (cuentaPanel) {
        cuentaPanel.classList.remove("oculto");
    }

    cargarDatosCuenta();
}

function ocultarCuenta() {
    if (cuentaPanel) {
        cuentaPanel.classList.add("oculto");
    }

    listaReclamos.classList.remove("oculto");

    renderizarReclamos();
    renderizarUrgentes();
}

function escaparTexto(texto) {
    if (texto === null || texto === undefined) {
        return "";
    }

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function obtenerNombreEdificio(reclamo) {
    if (!reclamo.edificio) {
        return "Sin edificio";
    }

    return (
        reclamo.edificio.nombre ||
        reclamo.edificio.nombre_edificio ||
        "Sin edificio"
    );
}

function obtenerDireccionEdificio(reclamo) {
    if (!reclamo.edificio) {
        return "Sin dirección";
    }

    return reclamo.edificio.direccion || "Sin dirección";
}

function obtenerNombreClasificacion(reclamo) {
    if (!reclamo.clasificacion) {
        return "Sin clasificación";
    }

    return reclamo.clasificacion.clasificacion || "Sin clasificación";
}

function obtenerEstadoTexto(estado) {
    switch (estado) {
        case "pendiente":
            return "Pendiente";

        case "aceptado":
            return "Pendiente de aceptación";

        case "en_proceso":
            return "En proceso";

        case "completado":
            return "Completado";

        default:
            return estado || "Sin estado";
    }
}

function obtenerClaseEstado(estado) {
    switch (estado) {
        case "pendiente":
            return "estado-pendiente";

        case "aceptado":
            return "estado-aceptado";

        case "en_proceso":
            return "estado-en-proceso";

        case "completado":
            return "estado-completado";

        default:
            return "";
    }
}

function obtenerClasePrioridad(prioridad) {
    if (prioridad === "Urgente") {
        return "reclamos-Ur";
    }

    return "reclamos-normal";
}

function formatearFecha(fecha) {
    if (!fecha) {
        return "Fecha desconocida";
    }

    const fechaObjeto = new Date(fecha);

    if (Number.isNaN(fechaObjeto.getTime())) {
        return fecha;
    }

    return fechaObjeto.toLocaleDateString("es-UY", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function obtenerImagenReclamo(reclamo) {
    if (!reclamo.evidencia) {
        return "";
    }

    const ruta =
        reclamo.evidencia.ruta_archivo ||
        reclamo.evidencia.archivo ||
        reclamo.evidencia.path ||
        reclamo.evidencia.url;

    if (!ruta) {
        return "";
    }

    if (ruta.startsWith("http")) {
        return ruta;
    }

    return obtenerUrlEvidencia(ruta);
}

function obtenerReclamosFiltrados() {
    switch (filtroActual) {
        case "pendientes":
            return reclamos.filter(
                reclamo => reclamo.estado === "aceptado"
            );

        case "en_proceso":
            return reclamos.filter(
                reclamo => reclamo.estado === "en_proceso"
            );

        case "todos":
        default:
            return reclamos.filter(
                reclamo =>
                    reclamo.estado === "aceptado" ||
                    reclamo.estado === "en_proceso" ||
                    reclamo.estado === "completado"
            );
    }
}

function obtenerReclamosUrgentes() {
    return reclamos.filter(
        reclamo =>
            reclamo.prioridad === "Urgente" &&
            (
                reclamo.estado === "aceptado" ||
                reclamo.estado === "en_proceso"
            )
    );
}

function renderizarUrgentes() {
    if (!containerUrgentes || !cantidadUrgentes) {
        return;
    }

    const urgentes = obtenerReclamosUrgentes();

    cantidadUrgentes.textContent =
        urgentes.length === 1
            ? "1 reclamo requiere atención prioritaria"
            : `${urgentes.length} reclamos requieren atención prioritaria`;

    containerUrgentes.innerHTML = "";

    if (urgentes.length === 0) {
        containerUrgentes.innerHTML = `
            <div class="sin-urgentes">
                No hay reclamos urgentes pendientes.
            </div>
        `;

        return;
    }

    urgentes.forEach(reclamo => {
        const item =
            document.createElement("article");

        item.className = "urgente-item";

        item.innerHTML = `
            <div class="urgente-info">

                <div class="urgente-icono">
                    <span class="material-symbols-outlined">
                        priority_high
                    </span>
                </div>

                <div class="urgente-texto">

                    <p class="urgente-titulo">
                        ${escaparTexto(
                            obtenerNombreEdificio(reclamo)
                        )}
                    </p>

                    <p class="urgente-edificio">
                        ${escaparTexto(
                            reclamo.description ||
                            "Sin descripción"
                        )}
                    </p>

                </div>

            </div>

            <div class="urgente-flecha">
                <span class="material-symbols-outlined">
                    chevron_right
                </span>
            </div>
        `;

        item.addEventListener(
            "click",
            () => abrirDetalle(reclamo)
        );

        containerUrgentes.appendChild(item);
    });
}

function renderizarReclamos() {
    containerReclamos.innerHTML = "";

    const reclamosFiltrados =
        obtenerReclamosFiltrados();

    if (reclamosFiltrados.length === 0) {
        containerReclamos.innerHTML = `
            <div class="reclamo-vacio">
                <h2>No hay reclamos</h2>
                <p>No hay reclamos en este estado.</p>
            </div>
        `;

        return;
    }

    reclamosFiltrados.forEach(reclamo => {
        const tarjeta =
            document.createElement("article");

        tarjeta.className =
            "reclamo-card";

        const imagen =
            obtenerImagenReclamo(reclamo);

        const nombreEdificio =
            obtenerNombreEdificio(reclamo);

        const clasificacion =
            obtenerNombreClasificacion(reclamo);

        const prioridad =
            reclamo.prioridad || "Normal";

        const estado =
            reclamo.estado || "pendiente";

        tarjeta.innerHTML = `
            <div class="top-container">

                <div class="foto-reclamo">
                    ${
                        imagen
                            ? `<img src="${escaparTexto(imagen)}" alt="Evidencia del reclamo">`
                            : `<div class="sin-foto">Sin foto</div>`
                    }
                </div>

                <div class="info-reclamo">

                    <h2 class="reclamos-title">
                        ${escaparTexto(nombreEdificio)}
                    </h2>

                    <p class="reclamos-text">
                        ${escaparTexto(
                            reclamo.description ||
                            "Sin descripción"
                        )}
                    </p>

                    <div class="reclamos-datos">

                        <span class="${obtenerClasePrioridad(prioridad)}">
                            ${escaparTexto(prioridad)}
                        </span>

                        <span class="${obtenerClaseEstado(estado)}">
                            ${escaparTexto(
                                obtenerEstadoTexto(estado)
                            )}
                        </span>

                    </div>

                    <p class="reclamos-clasificacion">
                        ${escaparTexto(clasificacion)}
                    </p>

                    <button
                        type="button"
                        class="btn-resolver"
                    >
                        Ver reclamo
                    </button>

                </div>

            </div>
        `;

        const boton =
            tarjeta.querySelector(".btn-resolver");

        boton.addEventListener(
            "click",
            () => abrirDetalle(reclamo)
        );

        containerReclamos.appendChild(tarjeta);
    });
}

function abrirDetalle(reclamo) {
    reclamoActual = reclamo;

    const imagen =
        obtenerImagenReclamo(reclamo);

    detalleTitulo.textContent =
        obtenerNombreEdificio(reclamo);

    detallePrioridad.textContent =
        reclamo.prioridad || "Normal";

    detallePrioridad.className =
        obtenerClasePrioridad(
            reclamo.prioridad || "Normal"
        );

    detalleEstado.textContent =
        obtenerEstadoTexto(reclamo.estado);

    detalleEstado.className =
        obtenerClaseEstado(reclamo.estado);

    detalleFecha.textContent =
        `Fecha: ${formatearFecha(
            reclamo.created_at
        )}`;

    detalleDescripcion.textContent =
        reclamo.description ||
        "Sin descripción";

    detalleEdificio.textContent =
        obtenerNombreEdificio(reclamo);

    detalleDireccion.textContent =
        obtenerDireccionEdificio(reclamo);

    detalleClasificacion.textContent =
        obtenerNombreClasificacion(reclamo);

    if (imagen) {
        detalleImagen.src = imagen;
        detalleImagen.style.display = "block";
    } else {
        detalleImagen.removeAttribute("src");
        detalleImagen.style.display = "none";
    }

    actualizarFormularioSegunEstado();

    mostrarDetalle();
}

function actualizarFormularioSegunEstado() {
    if (!reclamoActual) {
        return;
    }

    const estado =
        reclamoActual.estado;

    aceptarContainer.classList.add("oculto");
    formResolver.classList.add("oculto");

    if (estado === "aceptado") {
        aceptarContainer.classList.remove("oculto");
    }

    if (estado === "en_proceso") {
        formResolver.classList.remove("oculto");
    }

    limpiarFormulario();
}

function limpiarFormulario() {
    if (fotoResolucion) {
        fotoResolucion.value = "";
    }

    if (previewResolucion) {
        previewResolucion.src = "";
    }

    if (previewContainer) {
        previewContainer.classList.add("oculto");
    }

    if (observaciones) {
        observaciones.value = "";
    }
}

async function cargarReclamos() {
    containerReclamos.innerHTML = `
        <div class="cargando">
            Cargando reclamos...
        </div>
    `;

    try {
        const response =
            await apiFetch(
                "/api/proveedor/reclamos",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

        if (response.status === 401) {
            window.location.href =
                "/proyecto-utu-2026/src/frontend/html/index.html";

            return;
        }

        if (response.status === 403) {
            containerReclamos.innerHTML = `
                <div class="reclamo-vacio">
                    <h2>Acceso denegado</h2>
                    <p>No tenés permisos para acceder a esta sección.</p>
                </div>
            `;

            return;
        }

        if (!response.ok) {
            throw new Error(
                "No se pudieron obtener los reclamos."
            );
        }

        const datos =
            await response.json();

        reclamos =
            Array.isArray(datos.reclamos)
                ? datos.reclamos
                : [];

        renderizarUrgentes();
        renderizarReclamos();

    } catch (error) {
        console.error(
            "Error cargando reclamos:",
            error
        );

        containerReclamos.innerHTML = `
            <div class="reclamo-vacio">
                <h2>Error</h2>
                <p>No se pudieron cargar los reclamos.</p>
            </div>
        `;
    }
}

async function verificarSesion() {
    try {
        const response =
            await apiFetch(
                "/api/auth/me",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

        if (!response.ok) {
            window.location.href =
                "/proyecto-utu-2026/src/frontend/html/index.html";

            return false;
        }

        const usuario =
            await response.json();

        datosUsuario =
            usuario.usuario || usuario;

        if (
            datosUsuario.rol !==
            "usuario_proveedor"
        ) {
            mostrarMensaje(
                "No tenés permisos para acceder a esta página.",
                true
            );

            setTimeout(() => {
                window.location.href =
                    "/proyecto-utu-2026/src/frontend/html/index.html";
            }, 1800);

            return false;
        }

        return true;

    } catch (error) {
        console.error(
            "Error verificando sesión:",
            error
        );

        window.location.href =
            "/proyecto-utu-2026/src/frontend/html/index.html";

        return false;
    }
}

async function cargarDatosCuenta() {
    if (!cuentaPanel || !datosUsuario) {
        return;
    }

    cuentaMensaje.classList.add("oculto");

    cuentaNombre.textContent =
        datosUsuario.nombre || "-";

    cuentaCedula.textContent =
        datosUsuario.cedula || "-";

    cuentaEmail.textContent =
        datosUsuario.email || "-";

    cuentaTelefono.textContent =
        datosUsuario.telefono || "-";

    const proveedor =
        datosUsuario.proveedor;

    cuentaProveedor.textContent =
        proveedor?.nombre ||
        proveedor?.razon_social ||
        "Proveedor";

    cuentaRol.textContent =
        datosUsuario.rol === "usuario_proveedor"
            ? "Usuario proveedor"
            : datosUsuario.rol || "-";
}

async function cerrarSesion() {
    btnLogout.disabled = true;

    try {
        const response =
            await apiFetchConCsrf(
                "/api/auth/logout",
                {
                    method: "POST"
                }
            );

        if (!response.ok) {
            const datos =
                await response.json().catch(
                    () => ({})
                );

            throw new Error(
                datos.message ||
                "No se pudo cerrar la sesión."
            );
        }

        window.location.href =
            "/proyecto-utu-2026/src/frontend/html/index.html";

    } catch (error) {
        console.error(
            "Error cerrando sesión:",
            error
        );

        mostrarMensaje(
            error.message ||
            "No se pudo cerrar la sesión.",
            true
        );

        btnLogout.disabled = false;
    }
}

document.querySelectorAll(
    ".filtros-reclamos button"
).forEach(boton => {

    boton.addEventListener(
        "click",
        () => {

            document.querySelectorAll(
                ".filtros-reclamos button"
            ).forEach(
                botonFiltro =>
                    botonFiltro.classList.remove(
                        "filtro-activo"
                    )
            );

            boton.classList.add(
                "filtro-activo"
            );

            filtroActual =
                boton.dataset.filtro;

            renderizarReclamos();
        }
    );
});

btnVolver.addEventListener(
    "click",
    () => {
        mostrarLista();
    }
);

if (btnCuenta) {
    btnCuenta.addEventListener(
        "click",
        () => {
            mostrarCuenta();
        }
    );
}

if (btnVolverCuenta) {
    btnVolverCuenta.addEventListener(
        "click",
        () => {
            ocultarCuenta();
        }
    );
}

btnLogout.addEventListener(
    "click",
    async () => {
        await cerrarSesion();
    }
);

btnAceptar.addEventListener(
    "click",
    async () => {

        if (!reclamoActual) {
            return;
        }

        btnAceptar.disabled = true;

        try {
            const response =
                await apiFetchConCsrf(
                    `/api/proveedor/reclamos/${reclamoActual.id}/aceptar`,
                    {
                        method: "PUT"
                    }
                );

            const datos =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    datos.message ||
                    "No se pudo aceptar el reclamo."
                );
            }

            const reclamoActualizado =
                datos.reclamo;

            const indice =
                reclamos.findIndex(
                    reclamo =>
                        reclamo.id ===
                        reclamoActual.id
                );

            if (indice !== -1) {
                reclamos[indice] =
                    reclamoActualizado;
            }

            reclamoActual =
                reclamoActualizado;

            abrirDetalle(reclamoActual);

            renderizarUrgentes();

            mostrarMensaje(
                "✓ Reclamo aceptado correctamente."
            );

        } catch (error) {

            console.error(
                "Error aceptando reclamo:",
                error
            );

            mostrarMensaje(
                error.message ||
                "Ocurrió un error al aceptar el reclamo.",
                true
            );

            btnAceptar.disabled = false;
        }
    }
);

fotoResolucion.addEventListener(
    "change",
    () => {

        const archivo =
            fotoResolucion.files[0];

        if (!archivo) {
            previewResolucion.src = "";

            previewContainer.classList.add(
                "oculto"
            );

            return;
        }

        if (!archivo.type.startsWith("image/")) {

            mostrarMensaje(
                "Seleccioná una imagen válida.",
                true
            );

            fotoResolucion.value = "";

            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            event => {

                previewResolucion.src =
                    event.target.result;

                previewContainer.classList.remove(
                    "oculto"
                );
            };

        reader.readAsDataURL(archivo);
    }
);

formResolver.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        if (!reclamoActual) {
            return;
        }

        const foto =
            fotoResolucion.files[0];

        const observacion =
            observaciones.value.trim();

        if (!foto) {

            mostrarMensaje(
                "Seleccioná una foto de evidencia.",
                true
            );

            return;
        }

        if (!observacion) {

            mostrarMensaje(
                "Agregá una observación sobre la resolución.",
                true
            );

            return;
        }

        btnFinalizar.disabled = true;

        try {
            const formData =
                new FormData();

            formData.append(
                "foto",
                foto
            );

            formData.append(
                "observaciones",
                observacion
            );

            const response =
                await apiFetchConCsrf(
                    `/api/proveedor/reclamos/${reclamoActual.id}/finalizar`,
                    {
                        method: "POST",
                        body: formData
                    }
                );

            const datos =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    datos.message ||
                    "No se pudo finalizar el reclamo."
                );
            }

            const reclamoActualizado =
                datos.reclamo;

            const indice =
                reclamos.findIndex(
                    reclamo =>
                        reclamo.id ===
                        reclamoActual.id
                );

            if (indice !== -1) {
                reclamos[indice] =
                    reclamoActualizado;
            }

            reclamoActual =
                reclamoActualizado;

            mostrarLista();

            renderizarReclamos();
            renderizarUrgentes();

            mostrarMensaje(
                "✓ Reclamo finalizado correctamente."
            );

        } catch (error) {

            console.error(
                "Error finalizando reclamo:",
                error
            );

            mostrarMensaje(
                error.message ||
                "Ocurrió un error al finalizar el reclamo.",
                true
            );

        } finally {
            btnFinalizar.disabled = false;
        }
    }
);

async function iniciar() {
    const sesionValida =
        await verificarSesion();

    if (!sesionValida) {
        return;
    }

    await cargarReclamos();
}

iniciar();
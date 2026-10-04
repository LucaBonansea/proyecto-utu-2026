import {
    confirmarFinalizacion,
    rechazarFinalizacion,
    obtenerReclamos,
    obtenerUrlEvidencia
} from "../services/reclamos-service.js";
import { notify } from "../utils/toast.js";

const FILTROS = [
    { id: "todos", label: "Todos" },
    { id: "resueltos", label: "Resueltos" },
    { id: "proceso", label: "En proceso" }
];

const ESTADOS = [
    { id: "pendiente", label: "Enviado" },
    { id: "aceptado", label: "Aceptado" },
    { id: "en_proceso", label: "En proceso" },
    { id: "completado", label: "Terminado" }
];

const ALIAS_ESTADOS = {
    enviado: "pendiente",
    validado: "aceptado",
    proceso: "en_proceso",
    terminado: "completado"
};

const CLASES_ESTADO = {
    pendiente: "estado-enviado",
    aceptado: "estado-aceptado",
    en_proceso: "estado-proceso",
    completado: "estado-resuelto",
    finalizacion_confirmada: "estado-confirmado",
    rechazada: "estado-rechazado"
};

const ETIQUETAS_ESTADO = {
    pendiente: "Enviado",
    aceptado: "Aceptado",
    en_proceso: "En proceso",
    completado: "Esperando revisión",
    finalizacion_confirmada: "Solución confirmada",
    rechazada: "Solución rechazada"
};

function escaparHtml(valor = "") {
    const elemento = document.createElement("div");
    elemento.textContent = String(valor);
    return elemento.innerHTML;
}

function normalizarEstado(estado) {
    return ALIAS_ESTADOS[estado] ?? estado ?? "pendiente";
}

function formatearFecha(fecha) {
    if (!fecha) {
        return "Fecha no disponible";
    }

    const fechaReclamo = new Date(fecha);

    if (Number.isNaN(fechaReclamo.getTime())) {
        return "Fecha no disponible";
    }

    return new Intl.DateTimeFormat("es-UY", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(fechaReclamo);
}

function validarEstadisticas(estadisticas) {
    const campos = ["total", "resueltos", "en_proceso"];

    if (!estadisticas || campos.some(campo => (
        !Number.isInteger(estadisticas[campo]) || estadisticas[campo] < 0
    ))) {
        throw new Error("La respuesta no contiene estadísticas válidas de reclamos.");
    }

    return Object.fromEntries(
        campos.map(campo => [campo, estadisticas[campo]])
    );
}

export class Reclamos {
    constructor(main) {
        this.main = main;
        this.reclamos = [];
        this.estadisticas = {
            total: 0,
            resueltos: 0,
            en_proceso: 0
        };
        this.filtroActual = "todos";
        this.paginacion = {
            pagina_actual: 1,
            ultima_pagina: 1,
            por_pagina: 12,
            total: 0,
            desde: 0,
            hasta: 0
        };
    }

    async second_view(filtro = "todos", pagina = 1) {
        this.renderCargando();

        try {
            await this.cargarReclamos(filtro, pagina);
            this.renderVista(filtro);
        } catch (error) {
            console.error("Error al cargar los reclamos:", error);
            this.renderError();
            notify.error("No se pudieron cargar tus reclamos.");
        }
    }

    async cargarReclamos(filtro, pagina) {
        const response = await obtenerReclamos({ filtro, pagina });

        if (response.status === 401) {
            window.location.replace("./index.html");
            return;
        }

        if (!response.ok) {
            throw new Error(`La API respondió con estado ${response.status}`);
        }

        const data = await response.json();
        this.reclamos = Array.isArray(data.reclamos) ? data.reclamos : [];
        this.estadisticas = validarEstadisticas(data.estadisticas);
        this.filtroActual = filtro;
        this.paginacion = {
            ...this.paginacion,
            ...data.paginacion
        };
    }

    async actualizarEstadisticas() {
        const response = await obtenerReclamos({ filtro: "todos", pagina: 1 });

        if (response.status === 401) {
            window.location.replace("./index.html");
            throw new Error("La sesión expiró al actualizar las estadísticas.");
        }

        if (!response.ok) {
            throw new Error(`La API respondió con estado ${response.status}`);
        }

        const data = await response.json();
        this.estadisticas = validarEstadisticas(data.estadisticas);

        return this.obtenerEstadisticas();
    }

    obtenerEstadisticas() {
        return { ...this.estadisticas };
    }

    renderCargando() {
        this.main.innerHTML = `
            <div class="div-inicial">
                <h2>Tus Reclamos</h2>
            </div>
            <p class="sin-reclamos">Cargando reclamos...</p>
        `;
    }

    renderError() {
        this.main.innerHTML = `
            <div class="div-inicial">
                <h2>Tus Reclamos</h2>
            </div>
            <p class="sin-reclamos">
                No fue posible cargar los reclamos. Intentá nuevamente.
            </p>
        `;
    }

    renderVista(filtro) {
        const titulo = this.obtenerTitulo(filtro);
        const chips = FILTROS
            .map(item => this.renderFiltro(item, filtro))
            .join("");
        const tarjetas = this.reclamos.length > 0
            ? this.reclamos
                .map((reclamo, indice) => (
                    this.renderTarjeta(
                        reclamo,
                        indice,
                        this.paginacion.total
                    )
                ))
                .join("")
            : `<p class="sin-reclamos">No hay reclamos en esta categoría.</p>`;

        this.main.innerHTML = `
            <div class="div-inicial">
                <h2>${titulo}</h2>
            </div>

            <div class="edificios-chips">
                ${chips}
            </div>

            <div class="reclamos-seccion">
                ${tarjetas}
            </div>

            ${this.renderPaginacion()}
        `;

        this.conectarEventos();
    }

    obtenerTitulo(filtro) {
        if (filtro === "resueltos") {
            return "Reclamos Resueltos";
        }

        if (filtro === "proceso") {
            return "Reclamos en Proceso";
        }

        return "Tus Reclamos";
    }

    renderFiltro(filtro, filtroActivo) {
        const claseActiva = filtro.id === filtroActivo ? "active" : "";

        return `
            <button
                class="edificio-chip ${claseActiva}"
                data-filtro="${filtro.id}"
                aria-label="${filtro.label}"
                title="${filtro.label}"
            >
                ${filtro.label}
            </button>
        `;
    }

    renderTarjeta(reclamo, indice, total) {
        const estado = normalizarEstado(reclamo.estado);
        const claseEstado = CLASES_ESTADO[estado] ?? "estado-enviado";
        const descripcion = escaparHtml(reclamo.description || "Sin descripción");
        const nombreEdificio = reclamo.edificio?.nombre || "Edificio no disponible";
        const clasificacion = (
            reclamo.clasificacion?.clasificacion || "Sin clasificación"
        );
        const etiquetaEstado = ETIQUETAS_ESTADO[estado] ?? estado;
        const imagen = obtenerUrlEvidencia(reclamo.evidencia?.ruta_archivo);
        const imagenHtml = imagen
            ? `<img src="${escaparHtml(imagen)}" alt="Evidencia del reclamo" loading="lazy">`
            : `<span class="material-symbols-outlined" aria-hidden="true">
                image_not_supported
            </span>`;
        const edificioHtml = `
            <p class="reclamo-edificio">
                <span class="material-symbols-outlined">
                    location_city
                </span>
                ${escaparHtml(nombreEdificio)}
            </p>
        `;
        const motivoRechazoHtml = (
            reclamo.estado === "rechazada" && reclamo.motivo_rechazo
        )
            ? `<p class="motivo-rechazo">
                Motivo: ${escaparHtml(reclamo.motivo_rechazo)}
            </p>`
            : "";
        const posicion = (
            (this.paginacion.pagina_actual - 1)
            * this.paginacion.por_pagina
        ) + indice + 1;

        return `
            <article class="primerdiv-reclamo ${claseEstado}">
                <div class="foto-reclamo ${imagen ? "" : "sin-imagen"}">
                    ${imagenHtml}
                </div>

                <div class="info-reclamo">
                    <div class="reclamo-card-meta">
                        <span class="reclamo-tipo">
                            ${escaparHtml(clasificacion)}
                        </span>
                        <span class="reclamo-estado-actual">
                            ${escaparHtml(etiquetaEstado)}
                        </span>
                    </div>
                    <h3 class="reclamo-titulo">${descripcion}</h3>
                    ${edificioHtml}
                    ${this.renderEstado(estado)}
                    ${motivoRechazoHtml}
                    ${this.renderAccionesFinalizacion(reclamo)}
                    <p class="fecha-misreclamos">
                        <span class="fecha-reclamo">
                            <span class="material-symbols-outlined" aria-hidden="true">
                                calendar_today
                            </span>
                            ${formatearFecha(reclamo.created_at)}
                        </span>
                        <span>Reclamo ${posicion} de ${total}</span>
                    </p>
                </div>
            </article>
        `;
    }

    renderEstado(estadoActual) {
        const estadoFinal = [
            "finalizacion_confirmada",
            "rechazada"
        ].includes(estadoActual);
        const indiceEstado = estadoFinal
            ? ESTADOS.length - 1
            : ESTADOS.findIndex(estado => estado.id === estadoActual);
        const ultimoEstadoActivo = indiceEstado >= 0 ? indiceEstado : 0;

        const pasos = ESTADOS.map((estado, indice) => {
            const pasoActivo = indice <= ultimoEstadoActivo ? "active" : "";
            const lineaActiva = indice < ultimoEstadoActivo ? "active" : "";
            const linea = indice < ESTADOS.length - 1
                ? `<div class="line ${lineaActiva}"></div>`
                : "";

            return `
                <div class="step ${pasoActivo}">
                    <div class="circle"></div>
                    <span>${estado.label}</span>
                </div>
                ${linea}
            `;
        }).join("");

        return `
            <div
                class="stepper"
                aria-label="Progreso del reclamo: ${escaparHtml(
                    ETIQUETAS_ESTADO[estadoActual] ?? estadoActual
                )}"
            >
                ${pasos}
            </div>
        `;
    }

    renderAccionesFinalizacion(reclamo) {
        if (reclamo.estado !== "completado") {
            return "";
        }

        return `
            <div
                class="acciones-finalizacion"
                data-reclamo-id="${escaparHtml(reclamo.id)}"
            >
                <div class="botones-finalizacion">
                    <button
                        type="button"
                        class="btn-confirmar-solucion"
                        data-accion="confirmar"
                    >
                        Confirmar solución
                    </button>
                    <button
                        type="button"
                        class="btn-rechazar-solucion"
                        data-accion="mostrar-rechazo"
                        aria-expanded="false"
                    >
                        Rechazar solución
                    </button>
                </div>

                <form class="form-rechazo-solucion" hidden>
                    <label>
                        Motivo del rechazo
                        <textarea
                            name="motivo"
                            maxlength="500"
                            required
                            placeholder="Explicá por qué la solución no es satisfactoria"
                        ></textarea>
                    </label>
                    <div class="botones-rechazo">
                        <button type="submit">Enviar rechazo</button>
                        <button
                            type="button"
                            data-accion="cancelar-rechazo"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    renderPaginacion() {
        const {
            pagina_actual: paginaActual,
            ultima_pagina: ultimaPagina,
            total
        } = this.paginacion;

        if (total <= this.paginacion.por_pagina) {
            return "";
        }

        const anteriorDeshabilitado = paginaActual <= 1 ? "disabled" : "";
        const siguienteDeshabilitado = (
            paginaActual >= ultimaPagina
        ) ? "disabled" : "";

        return `
            <nav class="paginacion-reclamos" aria-label="Paginación de reclamos">
                <button
                    class="pagina-anterior"
                    type="button"
                    ${anteriorDeshabilitado}
                >
                    Anterior
                </button>

                <span>
                    Página ${paginaActual} de ${ultimaPagina}
                    · ${total} reclamo${total === 1 ? "" : "s"}
                </span>

                <button
                    class="pagina-siguiente"
                    type="button"
                    ${siguienteDeshabilitado}
                >
                    Siguiente
                </button>
            </nav>
        `;
    }

    conectarEventos() {
        this.main.querySelectorAll(".foto-reclamo img").forEach(imagen => {
            imagen.addEventListener("error", () => {
                const contenedor = imagen.closest(".foto-reclamo");
                contenedor.classList.add("sin-imagen");
                contenedor.innerHTML = `
                    <span class="material-symbols-outlined" aria-hidden="true">
                        broken_image
                    </span>
                `;
            });
        });

        this.main.querySelectorAll(".edificio-chip").forEach(chip => {
            chip.addEventListener("click", () => {
                this.second_view(chip.dataset.filtro, 1);
            });
        });

        this.main.querySelectorAll(".acciones-finalizacion").forEach(
            acciones => this.conectarAccionesFinalizacion(acciones)
        );

        this.main.querySelector(".pagina-anterior")?.addEventListener(
            "click",
            () => {
                this.second_view(
                    this.filtroActual,
                    this.paginacion.pagina_actual - 1
                );
            }
        );

        this.main.querySelector(".pagina-siguiente")?.addEventListener(
            "click",
            () => {
                this.second_view(
                    this.filtroActual,
                    this.paginacion.pagina_actual + 1
                );
            }
        );

    }

    conectarAccionesFinalizacion(acciones) {
        const reclamo = this.reclamos.find(item => (
            String(item.id) === acciones.dataset.reclamoId
        ));

        if (!reclamo || reclamo.estado !== "completado") {
            return;
        }

        const botonConfirmar = acciones.querySelector(
            '[data-accion="confirmar"]'
        );
        const botonMostrarRechazo = acciones.querySelector(
            '[data-accion="mostrar-rechazo"]'
        );
        const botonCancelarRechazo = acciones.querySelector(
            '[data-accion="cancelar-rechazo"]'
        );
        const formularioRechazo = acciones.querySelector(
            ".form-rechazo-solucion"
        );
        const campoMotivo = formularioRechazo.querySelector(
            '[name="motivo"]'
        );

        botonConfirmar.addEventListener("click", () => {
            this.confirmarSolucion(reclamo, acciones);
        });

        botonMostrarRechazo.addEventListener("click", () => {
            formularioRechazo.hidden = false;
            botonMostrarRechazo.setAttribute("aria-expanded", "true");
            campoMotivo.focus();
        });

        botonCancelarRechazo.addEventListener("click", () => {
            formularioRechazo.reset();
            formularioRechazo.hidden = true;
            botonMostrarRechazo.setAttribute("aria-expanded", "false");
        });

        formularioRechazo.addEventListener("submit", event => {
            event.preventDefault();

            const motivo = campoMotivo.value.trim();

            if (!motivo) {
                notify.warning("Ingresá el motivo del rechazo.");
                campoMotivo.focus();
                return;
            }

            this.rechazarSolucion(reclamo, motivo, acciones);
        });
    }

    async confirmarSolucion(reclamo, acciones) {
        this.cambiarEstadoAcciones(acciones, true);

        try {
            const response = await confirmarFinalizacion(reclamo.id);
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo confirmar la solución."
                );
            }

            notify.success(
                data.message || "Solución confirmada correctamente."
            );
            await this.refrescarListaActual();
        } catch (error) {
            console.error("Error al confirmar la solución:", error);
            notify.error(
                error.message || "No se pudo confirmar la solución."
            );
        } finally {
            this.cambiarEstadoAcciones(acciones, false);
        }
    }

    async rechazarSolucion(reclamo, motivo, acciones) {
        this.cambiarEstadoAcciones(acciones, true);

        try {
            const response = await rechazarFinalizacion(reclamo.id, motivo);
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo rechazar la solución."
                );
            }

            notify.success(
                data.message || "Solución rechazada correctamente."
            );
            await this.refrescarListaActual();
        } catch (error) {
            console.error("Error al rechazar la solución:", error);
            notify.error(
                error.message || "No se pudo rechazar la solución."
            );
        } finally {
            this.cambiarEstadoAcciones(acciones, false);
        }
    }

    cambiarEstadoAcciones(acciones, procesando) {
        acciones.querySelectorAll("button, textarea").forEach(control => {
            control.disabled = procesando;
        });
    }

    refrescarListaActual() {
        return this.second_view(
            this.filtroActual,
            this.paginacion.pagina_actual
        );
    }
}

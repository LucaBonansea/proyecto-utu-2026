import {
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
    { id: "validado", label: "Aceptado" },
    { id: "en_proceso", label: "En proceso" },
    { id: "completado", label: "Terminado" }
];

const ALIAS_ESTADOS = {
    enviado: "pendiente",
    aceptado: "validado",
    proceso: "en_proceso",
    terminado: "completado"
};

const CLASES_ESTADO = {
    pendiente: "estado-enviado",
    validado: "estado-aceptado",
    en_proceso: "estado-proceso",
    completado: "estado-resuelto"
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

export class Reclamos {
    constructor(main) {
        this.main = main;
        this.reclamos = [];
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
        this.filtroActual = filtro;
        this.paginacion = {
            ...this.paginacion,
            ...data.paginacion
        };
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
        const imagen = obtenerUrlEvidencia(reclamo.evidencia?.ruta_archivo);
        const imagenHtml = imagen
            ? `<img src="${escaparHtml(imagen)}" alt="Evidencia del reclamo" loading="lazy">`
            : "";
        const edificioHtml = `
            <p class="reclamo-edificio">
                <span class="material-symbols-outlined">
                    location_city
                </span>
                ${escaparHtml(nombreEdificio)}
            </p>
        `;
        const posicion = (
            (this.paginacion.pagina_actual - 1)
            * this.paginacion.por_pagina
        ) + indice + 1;

        return `
            <div class="primerdiv-reclamo ${claseEstado}">
                <div class="foto-reclamo">
                    ${imagenHtml}
                </div>

                <div class="info-reclamo">
                    <p class="reclamo-titulo">${descripcion}</p>
                    ${edificioHtml}
                    ${this.renderEstado(estado)}
                    <p class="fecha-misreclamos">
                        ${formatearFecha(reclamo.created_at)}
                        <span>${posicion}/${total}</span>
                    </p>
                </div>
            </div>
        `;
    }

    renderEstado(estadoActual) {
        const indiceEstado = ESTADOS.findIndex(estado => (
            estado.id === estadoActual
        ));
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

        return `<div class="stepper">${pasos}</div>`;
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
                imagen.closest(".foto-reclamo").hidden = true;
            });
        });

        this.main.querySelectorAll(".edificio-chip").forEach(chip => {
            chip.addEventListener("click", () => {
                this.second_view(chip.dataset.filtro, 1);
            });
        });

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
}

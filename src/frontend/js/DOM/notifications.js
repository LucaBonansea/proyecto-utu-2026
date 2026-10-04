import {
    marcarNotificacionLeida,
    marcarTodasNotificacionesLeidas,
    obtenerNotificaciones
} from "../services/notificaciones-service.js";

const ICONOS_POR_TIPO = {
    reclamo_creado: "info",
    reclamo_aceptado: "fact_check",
    nuevo_trabajo_asignado: "assignment",
    trabajo_iniciado: "engineering",
    trabajo_completado: "task_alt",
    reclamo_rechazado: "warning",
    devolucion: "replay",
    finalizacion_confirmada: "check_circle"
};

function escaparHtml(valor) {
    const elemento = document.createElement("span");
    elemento.textContent = String(valor ?? "");
    return elemento.innerHTML;
}

function formatearFecha(fecha) {
    const instante = new Date(fecha);
    if (Number.isNaN(instante.getTime())) {
        return "Fecha no disponible";
    }

    const minutos = Math.floor((Date.now() - instante.getTime()) / 60000);
    if (minutos < 1) {
        return "Ahora";
    }
    if (minutos < 60) {
        return `Hace ${minutos} min`;
    }

    const horas = Math.floor(minutos / 60);
    if (horas < 24) {
        return horas === 1 ? "Hace 1 hora" : `Hace ${horas} horas`;
    }

    const dias = Math.floor(horas / 24);
    if (dias === 1) {
        return "Ayer";
    }
    if (dias < 7) {
        return `Hace ${dias} días`;
    }

    return new Intl.DateTimeFormat("es-UY", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(instante);
}

class Notificaciones {
    constructor(boton, panel, lista) {
        this.boton = boton;
        this.panel = panel;
        this.lista = lista;
        this.notificaciones = [];
        this.idsConocidos = new Set();
        this.cargaInicial = true;
        this.timer = null;
        this.estadoPermisoError = "";
    }

    async inicializar() {
        await this.cargar();
        this.timer = window.setInterval(() => this.cargar(), 60000);
    }

    async cargar() {
        try {
            const respuesta = await obtenerNotificaciones();
            if (!respuesta.ok) {
                throw new Error(`No se pudieron cargar las notificaciones (HTTP ${respuesta.status}).`);
            }

            const datos = await respuesta.json();
            const lista = Array.isArray(datos.notificaciones) ? datos.notificaciones : [];
            const notificaciones = lista.map((notificacion) => ({
                ...notificacion,
                leida: Boolean(notificacion.leida)
            }));

            this.mostrarNuevasNotificaciones(notificaciones);
            const huboCambios = JSON.stringify(notificaciones) !== JSON.stringify(this.notificaciones);
            this.notificaciones = notificaciones;
            this.actualizarBadge();

            if (huboCambios || this.cargaInicial) {
                this.renderizarLista();
            }
            this.cargaInicial = false;
        } catch (error) {
            console.error("Error cargando notificaciones:", error);
        }
    }

    mostrarNuevasNotificaciones(notificaciones) {
        const nuevas = this.cargaInicial
            ? []
            : notificaciones.filter((notificacion) =>
                !this.idsConocidos.has(Number(notificacion.id)) && !notificacion.leida
            );

        if ("Notification" in window && Notification.permission === "granted") {
            nuevas.forEach((notificacion) => {
                new Notification(notificacion.titulo, {
                    body: notificacion.mensaje,
                    icon: "/proyecto-utu-2026/src/frontend/assets/imgs/logo_reclamos.png"
                });
            });
        }

        this.idsConocidos = new Set(notificaciones.map((notificacion) => Number(notificacion.id)));
    }

    actualizarBadge() {
        const noLeidas = this.notificaciones.filter((notificacion) => !notificacion.leida).length;
        let badge = this.boton.querySelector(".notificacion-badge");

        if (noLeidas === 0) {
            badge?.remove();
            this.boton.removeAttribute("aria-label");
            this.boton.setAttribute("aria-label", "Notificaciones");
            this.boton.removeAttribute("data-unread-count");
            return;
        }

        if (!badge) {
            badge = document.createElement("span");
            badge.className = "notificacion-badge";
            badge.setAttribute("aria-hidden", "true");
            this.boton.appendChild(badge);
        }

        badge.textContent = String(noLeidas);
        this.boton.setAttribute(
            "aria-label",
            `Notificaciones, ${noLeidas} sin leer`
        );
        this.boton.dataset.unreadCount = String(noLeidas);
    }

    crearItem(notificacion) {
        const icono = ICONOS_POR_TIPO[notificacion.tipo] || "notifications";
        const clase = notificacion.leida ? "leida" : "no-leida";

        return `
            <button class="notificacion-item ${clase}" data-id="${escaparHtml(notificacion.id)}" type="button">
                <span class="notificacion-header">
                    <span class="notificacion-tipo-icono material-symbols-outlined" aria-hidden="true">${icono}</span>
                    <strong>${escaparHtml(notificacion.titulo)}</strong>
                    ${notificacion.leida ? "" : '<span class="notificacion-punto" aria-label="No leída"></span>'}
                </span>
                <span class="notificacion-item-mensaje">${escaparHtml(notificacion.mensaje)}</span>
                <small>${escaparHtml(formatearFecha(notificacion.created_at))}</small>
            </button>
        `;
    }

    renderizarLista() {
        const cantidadNoLeidas = this.notificaciones.filter((notificacion) => !notificacion.leida).length;
        const acciones = cantidadNoLeidas > 0
            ? '<button class="notificaciones-marcar-todas" type="button">Marcar todas como leídas</button>'
            : "";
        let permiso = "";

        if (!("Notification" in window)) {
            permiso = "";
        } else if (Notification.permission === "granted") {
            permiso = '<p class="notificaciones-estado-permiso" role="status">Notificaciones del navegador activadas.</p>';
        } else if (Notification.permission === "denied") {
            permiso = '<p class="notificaciones-estado-permiso" role="status">Las notificaciones están bloqueadas por el navegador.</p>';
        } else {
            permiso = '<button class="notificaciones-activar-permiso" type="button">Activar notificaciones del navegador</button>';
        }

        if (this.estadoPermisoError) {
            permiso = `<p class="notificaciones-estado-permiso" role="status">${escaparHtml(this.estadoPermisoError)}</p>`;
        }

        const items = this.notificaciones.length
            ? this.notificaciones.map((notificacion) => this.crearItem(notificacion)).join("")
            : '<p class="notificacion-vacia">No tenés notificaciones.</p>';

        this.lista.innerHTML = `
            <div class="notificaciones-toolbar">
                <span>${this.notificaciones.length} notificaciones</span>
                ${acciones}
            </div>
            ${permiso}
            ${items}
        `;

        this.lista.querySelector(".notificaciones-marcar-todas")
            ?.addEventListener("click", () => this.marcarTodasLeidas());
        this.lista.querySelector(".notificaciones-activar-permiso")
            ?.addEventListener("click", () => this.solicitarPermiso());
        this.lista.querySelectorAll(".notificacion-item").forEach((boton) => {
            boton.addEventListener("click", () => this.marcarLeida(Number(boton.dataset.id)));
        });
    }

    async solicitarPermiso() {
        try {
            await Notification.requestPermission();
            this.estadoPermisoError = "";
        } catch (error) {
            console.error("No se pudo solicitar permiso para las notificaciones del navegador:", error);
            this.estadoPermisoError = "No se pudo solicitar el permiso del navegador.";
        }

        this.renderizarLista();
    }

    async marcarLeida(id) {
        try {
            const respuesta = await marcarNotificacionLeida(id);
            if (!respuesta.ok) {
                throw new Error(`No se pudo marcar la notificación como leída (HTTP ${respuesta.status}).`);
            }

            this.notificaciones = this.notificaciones.map((notificacion) =>
                Number(notificacion.id) === id
                    ? { ...notificacion, leida: true }
                    : notificacion
            );
            this.actualizarBadge();
            this.renderizarLista();
        } catch (error) {
            console.error("Error marcando notificación como leída:", error);
        }
    }

    async marcarTodasLeidas() {
        try {
            const respuesta = await marcarTodasNotificacionesLeidas();
            if (!respuesta.ok) {
                throw new Error(`No se pudieron marcar las notificaciones como leídas (HTTP ${respuesta.status}).`);
            }

            this.notificaciones = this.notificaciones.map((notificacion) => ({
                ...notificacion,
                leida: true
            }));
            this.actualizarBadge();
            this.renderizarLista();
        } catch (error) {
            console.error("Error marcando todas las notificaciones como leídas:", error);
        }
    }

    abrir() {
        this.panel.classList.add("active");
        this.panel.setAttribute("aria-hidden", "false");
        this.boton.setAttribute("aria-expanded", "true");
        this.renderizarLista();
    }

    cerrar() {
        this.panel.classList.remove("active");
        this.panel.setAttribute("aria-hidden", "true");
        this.boton.setAttribute("aria-expanded", "false");
    }
}

export function inicializarNotificaciones() {
    const boton = document.querySelector(".notificaciones-btn-top");
    const panel = document.querySelector(".menu-top-notificaciones");
    const lista = panel?.querySelector(".notificaciones-lista");

    if (!boton || !panel || !lista || boton.dataset.notificationsReady === "true") {
        return null;
    }

    boton.dataset.notificationsReady = "true";
    panel.id ||= "panel-notificaciones";
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("aria-label", "Notificaciones");
    boton.setAttribute("aria-controls", panel.id);
    boton.setAttribute("aria-expanded", "false");

    const component = new Notificaciones(boton, panel, lista);
    component.inicializar();

    boton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (panel.classList.contains("active")) {
            component.cerrar();
        } else {
            component.abrir();
        }
    });
    panel.addEventListener("click", (event) => event.stopPropagation());
    document.addEventListener("click", () => component.cerrar());
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && panel.classList.contains("active")) {
            component.cerrar();
            boton.focus();
        }
    });

    return component;
}

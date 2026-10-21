¡Claro que sí, Ariana! Poner un diagrama de flujo esquemático arriba del todo es una idea excelente. Te va a servir muchísimo para entender la "gran foto" de cómo se mueve el código de arriba a abajo antes de leer detalle por detalle.

Aquí tienes el código completo con el **flujo general esquematizado al inicio** y todas tus etiquetas conceptuales a lo largo de las funciones:

```javascript
/**
 * ============================================================================
 * 🚀 FLUJO GENERAL DE LA APLICACIÓN (CÓMO FUNCIONA DE PUNTA A PUNTA)
 * ============================================================================
 * 
 * 1. ARRANQUE (DOMContentLoaded):
 *    - El navegador carga el HTML y dispara la función principal `iniciar()`.
 *    - Se ejecuta `verificar_sesion()`: comprueba si el usuario está logueado y 
 *      qué rol tiene (si es administrativo entra; si es otro rol, se lo redirige).
 *    - Si pasa la seguridad, se cargan el tema, las notificaciones y se llama a `iniciarAplicacion()`.
 * 
 * 2. CARGA DE LA BANDEJA (iniciarAplicacion -> vistaLista):
 *    - Se piden los reclamos pendientes al servidor mediante una petición asíncrona.
 *    - Se dibujan las tarjetas en pantalla usando columnas (tipo Masonry) con `.map()`.
 *    - Cada tarjeta tiene un botón "Ver detalle" que escucha clics.
 * 
 * 3. INTERACCIÓN Y DETALLE (vistaDetalle):
 *    - Al hacer clic en un reclamo, se busca su ID y se inyecta su HTML en un modal (oculto).
 *    - Se abre el modal agregándole la clase CSS 'activo'.
 *    - Se piden los proveedores al servidor y se llenan las opciones del `<select>`.
 *    - El administrativo puede editar la descripción (con el botón o presionando 'Enter') 
 *      y alternar la prioridad entre "Normal" y "Urgente".
 * 
 * 4. VALIDACIÓN Y CIERRE (btn-enviar-area):
 *    - Se valida que se haya seleccionado un proveedor. Si no, frena con un aviso.
 *    - Se envían los datos actualizados al servidor mediante un método PUT.
 *    - Si el servidor responde OK: se remueve el reclamo de la lista local, se notifica 
 *      el éxito, se cierra el modal y se redibuja la bandeja actualizada.
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

// Selección de elementos globales del DOM que el controlador utilizará en toda la interfaz.
const section = document.querySelector("main > section");
const filtro_container = document.querySelector("#filtro-container");
const modal = document.querySelector("#modal-reclamo");
const contenidoModal = document.querySelector("#contenido-modal");
const cerrarModal = modal.querySelector(".cerrar-modal");
const fondoModal = modal.querySelector(".fondo-modal");
const logoutbtn = document.querySelector(".logout");

/**
 * ============================================================================
 * CONCEPTO CLAVE: CIERRE Y LIMPIEZA DE MODALES
 * ============================================================================
 * Explicación: Para cerrar el modal de detalle, quitamos la clase CSS 'activo' 
 * que lo hace visible y vaciamos el contenido HTML interno (innerHTML = ""). 
 * Esto es una buena práctica para que, si el usuario abre otro reclamo después, 
 * no queden "rastros" ni datos visuales superpuestos del reclamo anterior.
 */
function cerrarDetalle() {
    modal.classList.remove("activo");
    contenidoModal.innerHTML = "";
}
cerrarModal.addEventListener("click", cerrarDetalle);
fondoModal.addEventListener("click", cerrarDetalle);
logoutbtn.addEventListener("click", cerrar_sesion);

// Arreglo en memoria donde almacenamos temporalmente los reclamos pendientes traídos del servidor.
let reclamosAValidar = [];

/**
 * ============================================================================
 * CONCEPTO CLAVE: SEGURIDAD Y CONTROL DE ACCESO POR ROLES (Authentication & RBAC)
 * ============================================================================
 * Explicación: Esta función actúa como un "patovica" o guardia de seguridad. 
 * Consulta al backend si la cookie o token de sesión son válidos. 
 * 1. Si no hay sesión válida (!request.ok), expulsa al usuario al login (index.html).
 * 2. Si la sesión es válida, lee el rol del usuario y lo redirige estrictamente 
 * a su pantalla correspondiente (administrativo, administrador o proveedor), 
 * evitando que entren a secciones que no les corresponden.
 */
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

/**
 * ============================================================================
 * CONCEPTO CLAVE: PETICIÓN ASÍNCRONA DE DATOS (Async/Await & Try/Catch)
 * ============================================================================
 * Explicación: Como la comunicación con el servidor toma tiempo (latencia de red), 
 * usamos async/await para pausar la ejecución hasta que el servidor responda. 
 * El bloque try/catch nos protege ante caídas de internet o errores del servidor, 
 * evitando que la aplicación se rompa y mostrando una notificación amigable al usuario.
 */
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

/**
 * ============================================================================
 * CONCEPTO CLAVE: DESTRUCCIÓN DE SESIÓN Y LIMPIEZA DE ESTADO
 * ============================================================================
 * Explicación: Desactiva temporalmente el botón de salir para prevenir clics dobles, 
 * le ordena al backend destruir la sesión actual, avisa mediante una notificación 
 * flotante de éxito y utiliza un temporizador (setTimeout) para dar tiempo a que 
 * el usuario lea el mensaje antes de redirigirlo al inicio de sesión.
 */
async function cerrar_sesion() {
    logoutbtn.disabled = true;

    try {
        const request = await cerrarSesion();
        const response = await request.json();

        if (!request.ok) {
            throw new Error(response.mensaje || "No se pudo cerrar la sesión.");
        }

        notify.success(response.mensaje || "Sesión cerrada correctamente.");

        setTimeout(() => {
            window.location.replace("./index.html");
        }, 800);
    } catch (error) {
        console.error("Error cerrando sesión:", error);
        notify.error(error.message || "No se pudo cerrar la sesión.");
        logoutbtn.disabled = false;
    }
}

/**
 * ============================================================================
 * CONCEPTO CLAVE: CICLO DE VIDA Y PUNTO DE ENTRADA (Initialization Pipeline)
 * ============================================================================
 * Explicación: Es la función principal que coordina el arranque de la vista. 
 * Primero valida la identidad y permisos del usuario. Si todo es correcto, 
 * inicializa el tema visual de la plataforma, enciende el sistema de notificaciones 
 * y finalmente dispara la carga de los reclamos pendientes.
 */
async function iniciar() {
    const usuario = await verificar_sesion();

    if (!usuario) {
        return;
    }

    inicializarTema();
    inicializarNotificaciones();
    iniciarAplicacion();
}

// Disparador global: espera a que el navegador termine de construir todo el HTML.
document.addEventListener("DOMContentLoaded", iniciar);

/**
 * ============================================================================
 * CONCEPTO CLAVE: RENDERIZADO DINÁMICO DE BANDEJA (Grid/Masonry & Templating)
 * ============================================================================
 * Explicación: Transforma los datos crudos (JSON) en elementos visuales dentro del DOM. 
 * 1. Verifica si hay elementos; si la lista está vacía, muestra un mensaje amigable.
 * 2. Distribuye los reclamos en columnas usando el operador módulo (%) para equilibrar el diseño.
 * 3. Utiliza plantillas de texto con .map().join("") para generar HTML masivo de forma eficiente.
 * 4. Asocia eventos de escucha a cada tarjeta para que el botón "Ver detalle" sepa qué ID abrir.
 */
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

/**
 * ============================================================================
 * CONCEPTO CLAVE: MODAL DE DETALLE Y GESTIÓN DE ESTADO LOCAL (State Management)
 * ============================================================================
 * Explicación: Busca el reclamo específico dentro del arreglo local usando su ID. 
 * Inyecta dinámicamente todo el HTML del modal en segundo plano (oculto) y, 
 * una vez que los elementos ya existen en el DOM, activa el modal agregando la clase 'activo'. 
 * A partir de ahí, inicializa los componentes interactivos del modal: proveedores, edición y prioridades.
 */
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
                    </p><p class="user-p">
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

    // Activamos la visibilidad del modal recién cuando su estructura HTML fue completamente inyectada.
    modal.classList.add("activo");

    /**
     * ============================================================================
     * CONCEPTO CLAVE: POBLACIÓN DINÁMICA DE SELECTORES (Dropdown Data Binding)
     * ============================================================================
     * Explicación: Solicita al backend la lista actualizada de proveedores disponibles. 
     * Una vez obtenidos, utiliza el método .map() para transformar cada objeto proveedor 
     * en una etiqueta HTML <option value="id">nombre</option>, permitiendo que el administrativo 
     * elija a quién derivar el reclamo.
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

    /**
     * ============================================================================
     * CONCEPTO CLAVE: CONTROLADOR DE ESTADO EDITABLE (Toggle contentEditable)
     * ============================================================================
     * Explicación: Permite alternar la caja de texto entre modo lectura (false) y modo escritura (true). 
     * Funciona como un interruptor: si el usuario hace clic, desbloquea el texto para que el administrativo 
     * pueda corregir la descripción del reclamo, cambiando dinámicamente el texto del botón entre 
     * "Editar descripción" y "Guardar descripción".
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

    // Accesibilidad por teclado: Permite presionar la tecla 'Enter' para confirmar y guardar la edición instantáneamente.
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

    /**
     * ============================================================================
     * CONCEPTO CLAVE: INTERRUPTOR DE PRIORIDAD (State Toggle Pattern)
     * ============================================================================
     * Explicación: Garantiza que el reclamo tenga un nivel de prioridad por defecto ("Normal") 
     * si viene vacío. Al hacer clic en el botón de prioridad, el sistema evalúa el estado actual 
     * e invierte el valor (de Normal a Urgente, o viceversa), actualizando también el texto 
     * visible del botón para darle feedback inmediato al usuario.
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

    /**
     * ============================================================================
     * CONCEPTO CLAVE: VALIDACIÓN DE NEGOCIO Y PERSISTENCIA (Frontend Validation & PUT Request)
     * ============================================================================
     * Explicación: Es el proceso de cierre y guardado definitivo del reclamo. Consta de 3 fases:
     * 1. Validación en el Frontend: Verifica que se haya seleccionado un proveedor válido. 
     *    Si está vacío, frena la ejecución con un aviso (`return`) para evitar datos incompletos.
     * 2. Comunicación HTTP (PUT): Empaqueta los cambios (ID, descripción editada, prioridad y proveedor) 
     *    y se los envía al servidor mediante una petición asíncrona.
     * 3. Control de Respuesta: Evalúa `request.ok`. Si el servidor responde con éxito, remueve el reclamo 
     *    de la lista local, muestra una notificación de éxito, cierra el modal y refresca la bandeja.
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

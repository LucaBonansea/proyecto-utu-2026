/**
 * ============================================================================
 * 🚀 FLUJO GENERAL DEL PANEL ADMINISTRADOR (CÓMO FUNCIONA DE PUNTA A PUNTA)
 * ============================================================================
 * 
 * 1. ARRANQUE Y SEGURIDAD (DOMContentLoaded -> iniciar):
 *    - Se comprueba la sesión con `verificar_sesion()`. Si el rol es "administrador", 
 *      entra al panel; si es otro rol, se le redirige a su pantalla correspondiente.
 *    - Se inicializan el tema visual, las notificaciones y `iniciarAplicacion()`.
 * 
 * 2. CARGA MASIVA DE DATOS INICIALES (iniciarAplicacion):
 *    - Se consultan en paralelo los datos maestros desde el backend: 
 *      Edificios, Usuarios y Proveedores, guardándolos en cachés de memoria locales.
 *    - Se configuran los eventos de la barra lateral (sidebar) para cambiar de sección.
 * 
 * 3. GESTIÓN DE SECCIONES (Vistas dinámicas del Administrador):
 *    - **Reclamos (`vistaReclamos`):** Muestra todos los reclamos con buscador y filtros de estado.
 *    - **Clasificaciones (`vistaClasificaciones`):** Permite listar y crear nuevas categorías.
 *    - **Proveedores (`vistaProveedores`):** Listado con paginación, filtros de activos/inactivos, 
 *      creación de nuevos proveedores y cambio de estado (activar/desactivar).
 *    - **Edificios (`vistaEdificios`):** Permite agregar edificios y ver sus detalles y usuarios asociados.
 *    - **Usuarios (`vistaUsuarios`):** Gestión completa de cuentas, cambio de roles, asignación 
 *      de edificios/proveedores y actualización de contraseñas.
 * ============================================================================
 */

/*
 * CONTROLADOR DEL PANEL ADMINISTRADOR.
 * Coordina la interfaz y llama a los servicios (capa que habla con el backend).
   extrae y trae todo lo necesario de otros archivos para que el proyecto quede bien dividido, ordenado y listo para usar en el momento en que la interfaz lo necesite.   
 * Flujo general: validar sesión -> cargar datos -> mostrar sección ->
 * responder a búsquedas, cambios y formularios.
 */
import { cerrarSesion, obtenerSesion } from "../services/auth-service.js";
import { notify } from "../utils/toast.js?v=20261023-9";
import { inicializarTema } from '../theme.js';
import { inicializarNotificaciones } from './notifications.js';
import {
    actualizarUsuario,
    cambiarEstadoProveedor as actualizarEstadoProveedor,
    cambiarPasswordUsuario,
    crearArea,
    crearClasificacion,
    crearEdificio,
    crearProveedor,
    crearUsuario,
    eliminarArea,
    eliminarUsuario,
    obtenerEdificios,
    obtenerAreas,
    obtenerClasificaciones,
    obtenerProveedores,
    obtenerReclamosAdministrador,
    obtenerUsuarios
} from "../services/administrador-service.js?v=20261027-1";
import { obtenerUrlEvidencia } from "../services/reclamos-service.js";

// Referencias a elementos HTML que se actualizan desde JavaScript.
const section = document.querySelector("main > section");
const filtro_container = document.querySelector("#filtro-container");
const proveedoresbtn = document.querySelector(".proveedores-btn");
const usuariosbtn = document.querySelector(".usuarios-btn");
const botones = document.querySelectorAll(".sidebar-btn:not(.logout)");
const edificiosbtn = document.querySelector(".edificios-btn");
const reclamosbtn = document.querySelector(".reclamos-btn");
const clasificacionesbtn = document.querySelector(".clasificaciones-btn");
const accountMenuWrapper = document.querySelector(".account-menu-wrapper");
const accountTrigger = document.querySelector(".account-trigger");
const accountMenu = document.querySelector(".account-menu");
const accountMenuContent = document.querySelector(".account-menu-content");
const logoutbtn = document.querySelector(".account-logout");
const estadisticasbtn = document.querySelector(".estadisticas-btn");

// Normaliza texto para comparar búsquedas aunque el usuario omita tildes.
function quitarTildes(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}



// Caché en memoria: aquí se guardan las respuestas del servidor durante la vista.
// Se llenan al iniciar (cargarEdificios, etc.): Justo cuando la aplicación arranca (iniciarAplicacion), el sistema va a la base de datos de Laravel, trae la información y "llena" estos arreglos con los datos reales.
let edificios = [];
let usuarios = [];
let proveedores = [];
let reclamos = [];
let clasificaciones = [];
let usuarioActual = null;
let filtroEstadoProveedor = "todos";
const LIMITE_PAGINACION_ADMIN = 6;
let paginaReclamos = 1;
let paginaProveedores = 1;
let paginaEdificios = 1;
let observadorAlturaUsuarios = null;
let intervaloEstadisticas = null;
let generacionEstadisticas = 0;
let observadorWidgetsEstadisticas = null;
const htmlWidgetsEstadisticas = new Map();

function detenerActualizacionEstadisticas() {
    window.clearInterval(intervaloEstadisticas);
    intervaloEstadisticas = null;
    observadorWidgetsEstadisticas?.disconnect();
    observadorWidgetsEstadisticas = null;
    generacionEstadisticas += 1;
}

function observarAnimacionesEstadisticas(contenedor) {
    if (!observadorWidgetsEstadisticas) return;
    contenedor.querySelectorAll('[data-stats-widget]:not(.stats-en-vista)')
        .forEach(widget => observadorWidgetsEstadisticas.observe(widget));
}

const NOMBRES_ESTADO_RECLAMO = {
    pendiente: "Pendiente",
    enviado: "Pendiente",
    validado: "Validado",
    aceptado: "Validado",
    en_proceso: "En proceso",
    proceso: "En proceso",
    completado: "Completado",
    terminado: "Completado",
    rechazado: "Rechazado"
};

// Convierte texto en texto seguro antes de insertarlo en plantillas HTML.
function escaparHtml(valor = "") {
    const elemento = document.createElement("div");
    elemento.textContent = String(valor);
    return elemento.innerHTML;
}
// Recibe la fecha cruda que viene de la base de datos (que suele verse fea o en formato ISO como 2026-10-16T...)
//  y la transforma usando Intl.DateTimeFormat al formato uruguayo (es-UY) con fecha y hora cortas, manejando posibles errores si la fecha viene vacía o inválida.
function formatearFechaReclamo(fecha) {
    if (!fecha) return "Fecha no disponible";

    const fechaReclamo = new Date(fecha);

    if (Number.isNaN(fechaReclamo.getTime())) {
        return "Fecha no disponible";
    }

    return new Intl.DateTimeFormat("es-UY", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(fechaReclamo);
}
//Toma el estado que venga de la base de datos, lo pasa a minúsculas y se asegura de que, si viene vacío, por defecto tome el valor "pendiente".
//  Esto evita que el código falle por un error de mayúsculas o minúsculas al compararlo.
function normalizarEstadoReclamo(estado) {
    return String(estado || "pendiente").toLowerCase();
}

// Divide una lista en páginas y calcula qué elementos mostrar.
function paginarElementos(elementos, paginaSolicitada) {
    const totalPaginas = Math.max(
        1,
        Math.ceil(elementos.length / LIMITE_PAGINACION_ADMIN)
    );
    //Valida y frena que la página solicitada nunca sea menor a 1 ni mayor al total real
    //(evita que la app rompa si filtras datos o pones una página que no existe).
    const paginaActual = Math.min(
        Math.max(Number(paginaSolicitada) || 1, 1),
        totalPaginas
    );
    // Calcula la posición numérica exacta en la lista donde debe empezar a recortar los elementos para la página actual
    //(teniendo en cuenta que en programación se empieza a contar desde el 0).
    const inicio = (paginaActual - 1) * LIMITE_PAGINACION_ADMIN;

    // Devuelve el "paquete" listo para la interfaz, conteniendo la sub-lista recortada con los elementos exactos de la página
    //(elementosPagina), la página en la que estás (paginaActual), el total de páginas (totalPaginas) y el punto de partida (inicio).
    return {
        elementosPagina: elementos.slice(
            inicio,
            inicio + LIMITE_PAGINACION_ADMIN
        ),
        paginaActual,
        totalPaginas,
        inicio
    };
}
function renderPaginacionAdministrador(
    totalElementos,
    paginaActual,
    totalPaginas,
    nombreSingular,
    nombrePlural
) {
//Si los elementos entran todos en una sola pantalla, oculta los botones de paginación para limpiar la interfaz.
    if (totalElementos <= LIMITE_PAGINACION_ADMIN) return "";

    const nombre = totalElementos === 1 ? nombreSingular : nombrePlural;

    return `
        <nav class="paginacion-admin" aria-label="Paginación de ${nombrePlural}">
            <button
                class="btn-pagina-admin"
                type="button"
                data-pagina="${paginaActual - 1}"
                ${paginaActual === 1 ? "disabled" : ""}
            >
                <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                Anterior
            </button>

            <span class="resumen-paginacion-admin">
                Página ${paginaActual} de ${totalPaginas} · ${totalElementos} ${nombre}
            </span>

            <button
                class="btn-pagina-admin"
                type="button"
                data-pagina="${paginaActual + 1}"
                ${paginaActual === totalPaginas ? "disabled" : ""}
            >
                Siguiente
                <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            </button>
        </nav>
    `;
}
//Detecta cuando el usuario hace clic en los botones de "Siguiente" o "Anterior" 
// para cambiar de página y redibujar la tabla.
function conectarPaginacionAdministrador(contenedor, cambiarPagina) {
    contenedor?.querySelectorAll(".btn-pagina-admin").forEach(boton => {
        boton.addEventListener("click", () => {
            cambiarPagina(Number(boton.dataset.pagina));
        });
    });
}


/**
 * ============================================================================
 *  CARGA INICIAL DE DATOS MAESTROS (Caché local)
 * ============================================================================
 Realiza peticiones al backend al iniciar la aplicación para traer y almacenar en memoria toda la información principal,
  evitando esperas innecesarias cuando el usuario navegue por las distintas secciones.
 */
async function cargarEdificios() {
    try {
        const response = await obtenerEdificios();

        if (!response.ok) {
            throw new Error("Error al obtener los edificios");
        }

        const data = await response.json();

        console.log("Edificios cargados desde la BD:", data);

        edificios = data;

    } catch (error) {

        console.error(
            "Error al cargar edificios:",
            error
        );

        edificios = [];

        notify.error("No se pudieron cargar los edificios.");
    }
}
async function cargarUsuarios() {

    try {

        const response = await obtenerUsuarios();

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();

        console.log("Usuarios cargados desde la BD:", data);

        usuarios = data;

    } catch (error) {

        console.error(
            "Error al cargar usuarios:",
            error
        );

        usuarios = [];

        notify.error("No se pudieron cargar los usuarios.");
    }
}

async function cargarProveedores() {

    try {

        const response = await obtenerProveedores();

        if (!response.ok) {
            throw new Error("Error al obtener los proveedores");
        }

        const data = await response.json();

        console.log(
            "Proveedores cargados desde la BD:",
            data
        );

        proveedores = data;

    } catch (error) {

        console.error(
            "Error al cargar proveedores:",
            error
        );

        proveedores = [];

        notify.error(
            "No se pudieron cargar los proveedores."
        );

    }
}

// ==========================================
// INICIAR APLICACIÓN
// ==========================================

/**
 * ============================================================================
 *  SEGURIDAD Y CONTROL DE ACCESO (Verificación de sesión y redirección según rol)
 * ============================================================================
 * Valida con el backend si el usuario está autenticado. Si es válido,
 * lo redirige a la pantalla que le corresponde según su rol (admin, proveedor, etc.); si no, lo expulsa de vuelta al inicio de sesión por seguridad
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

        if (usuario.rol === "administrador") {
            return usuario;
        }

        if (usuario.rol === "usuario_proveedor") {
            window.location.replace("./Provedores.html");
            return null;
        }

        window.location.replace("./inicio.html");
        return null;
    } catch (error) {
        console.error("Error verificando sesión:", error);
        window.location.replace("./index.html");
        return null;
    }
}

// Organiza la secuencia de inicio verificando la sesión, precargando los datos en caché y preparando todos los componentes visuales.
async function iniciarAplicacion() {

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            if (boton !== estadisticasbtn) detenerActualizacionEstadisticas();
            botones.forEach(item =>
                item.classList.remove("active")
            );

            boton.classList.add("active");
        });
    });

    estadisticasbtn?.addEventListener("click", vistaEstadisticas);

    proveedoresbtn.addEventListener(
        "click",
        () => {
            paginaProveedores = 1;
            vistaProveedores();
        }
    );

    edificiosbtn.addEventListener(
        "click",
        () => {
            paginaEdificios = 1;
            vistaEdificios();
        }
    );

    usuariosbtn.addEventListener(
        "click",
        () => vistaUsuarios()
    );

    reclamosbtn.addEventListener(
        "click",
        () => {
            paginaReclamos = 1;
            vistaReclamos();
        }
    );

    clasificacionesbtn.addEventListener(
        "click",
        () => vistaClasificaciones()
    );

    accountTrigger.addEventListener("click", alternarMenuCuenta);

    document.addEventListener("click", cerrarMenuCuentaAlHacerClickFuera);
    document.addEventListener("keydown", cerrarMenuCuentaConEscape);

    logoutbtn.addEventListener("click", cerrar_sesion);

    await Promise.all([
        cargarEdificios(),
        cargarUsuarios(),
        cargarProveedores()
    ]);

    // Si el usuario cambió de sección mientras cargaban los catálogos,
    // actualizar esa vista sin reemplazar Reclamos u otra sección abierta.
    if (proveedoresbtn.classList.contains("active")) {
        vistaProveedores();
    } else if (edificiosbtn.classList.contains("active")) {
        vistaEdificios();
    } else if (usuariosbtn.classList.contains("active")) {
        vistaUsuarios();
    }

}

// Menú de cuenta: abrir/cerrar, cargar perfil y cerrar ante clic externo o Escape.
function alternarMenuCuenta(event) {
    event.stopPropagation();

    const estaAbierto = accountMenu.classList.toggle("open");
    accountMenu.setAttribute("aria-hidden", String(!estaAbierto));
    accountTrigger.setAttribute("aria-expanded", String(estaAbierto));

    if (estaAbierto) {
        cargarCuentaMenu();
    }
}
//Abre o cierra el menú flotante de la esquina superior derecha al hacer clic en el avatar,
//carga los datos del usuario y detecta clics externos o la tecla Escape para cerrarlo automáticamente por prolijidad
function cerrarMenuCuenta() {
    accountMenu.classList.remove("open");
    accountMenu.setAttribute("aria-hidden", "true");
    accountTrigger.setAttribute("aria-expanded", "false");
}

function cerrarMenuCuentaAlHacerClickFuera(event) {
    if (!accountMenuWrapper.contains(event.target)) {
        cerrarMenuCuenta();
    }
}

function cerrarMenuCuentaConEscape(event) {
    if (event.key === "Escape") {
        cerrarMenuCuenta();
        accountTrigger.focus();
    }
}

async function cargarCuentaMenu() {
    accountMenuContent.innerHTML = `
        <div class="account-loading">
            Cargando cuenta...
        </div>
    `;

    try {
        const response = await obtenerSesion();

        if (response.status === 401) {
            window.location.replace("./index.html");
            return;
        }

        if (!response.ok) {
            throw new Error("No se pudieron obtener los datos de la cuenta.");
        }

        const data = await response.json();

        if (!data.usuario) {
            throw new Error("La respuesta no contiene los datos del usuario.");
        }

        renderCuentaMenu(data.usuario);
    } catch (error) {
        console.error("Error cargando la cuenta:", error);
        notify.error(error.message || "No se pudo cargar la cuenta.");

        accountMenuContent.innerHTML = `
            <div class="account-error">
                <span class="material-symbols-outlined" aria-hidden="true">error</span>
                <p>No se pudieron cargar los datos.</p>
                <button type="button" class="account-retry">Reintentar</button>
            </div>
        `;

        accountMenuContent
            .querySelector(".account-retry")
            .addEventListener("click", cargarCuentaMenu);
    }
}

function renderCuentaMenu(usuario) {
    const nombresRol = {
        administrador: "Administrador departamental",
        administrativo: "Administrativo",
        usuario_edificio: "Usuario de edificio",
        usuario_proveedor: "Usuario de proveedor"
    };

    accountMenuContent.innerHTML = `
        <div class="account-profile">
            <div class="account-avatar" aria-hidden="true">
                <span class="material-symbols-outlined">person</span>
            </div>
            <div class="account-identity">
                <strong class="account-name"></strong>
                <span class="account-role"></span>
            </div>
        </div>

        <div class="account-details">
            <div class="account-detail">
                <span class="material-symbols-outlined" aria-hidden="true">badge</span>
                <div><small>Cédula</small><strong class="account-id"></strong></div>
            </div>
            <div class="account-detail">
                <span class="material-symbols-outlined" aria-hidden="true">phone</span>
                <div><small>Teléfono</small><strong class="account-phone"></strong></div>
            </div>
            <div class="account-detail">
                <span class="material-symbols-outlined" aria-hidden="true">mail</span>
                <div><small>Correo electrónico</small><strong class="account-email"></strong></div>
            </div>
            <div class="account-detail">
                <span class="material-symbols-outlined" aria-hidden="true">verified_user</span>
                <div><small>Estado</small><strong class="account-status"></strong></div>
            </div>
        </div>
    `;

    accountMenuContent.querySelector(".account-name").textContent = usuario.nombre || "Nombre no registrado";
    accountMenuContent.querySelector(".account-role").textContent = nombresRol[usuario.rol] || usuario.rol;
    accountMenuContent.querySelector(".account-id").textContent = usuario.cedula || "No registrada";
    accountMenuContent.querySelector(".account-phone").textContent = usuario.telefono || "No registrado";
    accountMenuContent.querySelector(".account-email").textContent = usuario.email || "No registrado";
    accountMenuContent.querySelector(".account-status").textContent = usuario.activo ? "Activa" : "Inactiva";
}

// Pide al backend cerrar la sesión y luego vuelve al inicio de sesión.
async function cerrar_sesion() {
    logoutbtn.disabled = true;

    try {
        const response = await cerrarSesion();
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || "No se pudo cerrar la sesión.");
        }

        notify.success(data.mensaje || "Sesión cerrada correctamente.");

        setTimeout(() => {
            window.location.replace("./index.html");
        }, 800);
    } catch (error) {
        console.error("Error cerrando sesión:", error);
        notify.error(error.message || "No se pudo cerrar la sesión.");
        logoutbtn.disabled = false;
    }
}


// Punto de entrada: comprueba identidad, prepara componentes compartidos e inicia.
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

// Espera a que el HTML exista antes de buscar elementos y conectar eventos.
document.addEventListener("DOMContentLoaded", iniciar);


/**
 * ============================================================================
 * CONCEPTO CLAVE: SECCIÓN RECLAMOS (Vista global del Administrador)
 * ============================================================================
 * Explicación: Obtiene todos los reclamos registrados en el sistema, incorporando 
 * herramientas de filtrado en tiempo real por texto y selector de estados.
 */
async function vistaReclamos() {
    filtro_container.innerHTML = "";
    section.style.display = "grid";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    section.innerHTML = `
        <div class="lista-reclamos-admin">
            <div class="titulo-reclamos-admin">
                <div>
                    <h2>Reclamos</h2>
                    <p>Todos los reclamos registrados en el sistema</p>
                </div>
            </div>
            <div class="estado-carga-reclamos">
                Cargando reclamos...
            </div>
        </div>
    `;

    try {
        const response = await obtenerReclamosAdministrador();

        if (response.status === 401) {
            window.location.replace("./index.html");
            return;
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || "No se pudieron obtener los reclamos.");
        }

        if (!reclamosbtn.classList.contains("active")) return;

        reclamos = Array.isArray(data.reclamos) ? data.reclamos : [];
        renderVistaReclamos();
    } catch (error) {
        if (!reclamosbtn.classList.contains("active")) return;

        console.error("Error al cargar los reclamos:", error);
        notify.error(error.message || "No se pudieron cargar los reclamos.");

        const contenedor = section.querySelector(".lista-reclamos-admin");

        if (contenedor) {
            contenedor.innerHTML = `
                <div class="titulo-reclamos-admin">
                    <div>
                        <h2>Reclamos</h2>
                        <p>Todos los reclamos registrados en el sistema</p>
                    </div>
                </div>
                <div class="estado-carga-reclamos estado-error-reclamos">
                    <span class="material-symbols-outlined" aria-hidden="true">error</span>
                    <p>${escaparHtml(error.message || "No se pudieron cargar los reclamos.")}</p>
                    <button class="btn-reintentar-reclamos" type="button">Reintentar</button>
                </div>
            `;

            contenedor
                .querySelector(".btn-reintentar-reclamos")
                .addEventListener("click", vistaReclamos);
        }
    }
}

function renderVistaReclamos() {
    const estados = [...new Set(
        reclamos.map(reclamo => normalizarEstadoReclamo(reclamo.estado))
    )];

    section.innerHTML = `
        <div class="lista-reclamos-admin">
            <div class="titulo-reclamos-admin">
                <div>
                    <h2>Reclamos</h2>
                    <p class="resumen-reclamos-admin"></p>
                </div>
            </div>

            <div class="controles-reclamos-admin">
                <div class="buscador-usuarios buscador-reclamos-admin">
                    <input type="search" placeholder="Buscar por descripción, usuario, edificio o clasificación" aria-label="Buscar reclamos">
                    <button class="btn-buscar-usuario" type="button">
                        <span class="material-symbols-outlined" aria-hidden="true">search</span>
                        Buscar
                    </button>
                </div>

                <label class="selector-estado-reclamos">
                    <span class="material-symbols-outlined" aria-hidden="true">filter_list</span>
                    <select>
                        <option value="todos">Todos los estados</option>
                        ${estados.map(estado => `
                            <option value="${escaparHtml(estado)}">
                                ${escaparHtml(NOMBRES_ESTADO_RECLAMO[estado] || estado)}
                            </option>
                        `).join("")}
                    </select>
                </label>
            </div>

            <div class="contenedor-reclamos-admin"></div>
        </div>
    `;

    const inputBuscar = section.querySelector(".buscador-reclamos-admin input");
    const botonBuscar = section.querySelector(".buscador-reclamos-admin .btn-buscar-usuario");
    const selectEstado = section.querySelector(".selector-estado-reclamos select");

    const aplicarFiltros = () => {
        paginaReclamos = 1;
        renderListaReclamos(inputBuscar.value, selectEstado.value);
    };

    inputBuscar.addEventListener("input", aplicarFiltros);
    botonBuscar.addEventListener("click", aplicarFiltros);
    selectEstado.addEventListener("change", aplicarFiltros);
    renderListaReclamos("", "todos");
}

// Filtra los reclamos por texto y estado y vuelve a dibujar sus tarjetas.
function renderListaReclamos(busqueda, estadoSeleccionado) {
    const contenedor = section.querySelector(".contenedor-reclamos-admin");

    if (!contenedor) return;

    const termino = quitarTildes(String(busqueda || "").toLowerCase());
    const filtrados = reclamos.filter(reclamo => {
        const estado = normalizarEstadoReclamo(reclamo.estado);
        const coincideEstado = estadoSeleccionado === "todos"
            || estado === estadoSeleccionado;
        const texto = quitarTildes([
            reclamo.id,
            reclamo.description,
            reclamo.usuario?.nombre,
            reclamo.usuario?.cedula,
            reclamo.edificio?.nombre,
            reclamo.edificio?.direccion,
            reclamo.clasificacion?.clasificacion,
            NOMBRES_ESTADO_RECLAMO[estado] || estado
        ].filter(Boolean).join(" ").toLowerCase());

        return coincideEstado && texto.includes(termino);
    });

    const paginacion = paginarElementos(filtrados, paginaReclamos);
    paginaReclamos = paginacion.paginaActual;
    const resumen = section.querySelector(".resumen-reclamos-admin");

    if (resumen) {
        const nombre = filtrados.length === 1 ? "reclamo" : "reclamos";
        const desde = filtrados.length === 0 ? 0 : paginacion.inicio + 1;
        const hasta = Math.min(
            paginacion.inicio + LIMITE_PAGINACION_ADMIN,
            filtrados.length
        );
        resumen.textContent = `Mostrando ${desde}–${hasta} de ${filtrados.length} ${nombre}`;
    }

    if (filtrados.length === 0) {
        const piePaginacion = section.querySelector(
            ".paginacion-reclamos-admin"
        );

        if (piePaginacion) piePaginacion.innerHTML = "";

        contenedor.innerHTML = `
            <div class="sin-reclamos-admin">
                <span class="material-symbols-outlined" aria-hidden="true">inbox</span>
                <p>No hay reclamos que coincidan con los filtros.</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = paginacion.elementosPagina
        .map(renderCardReclamo)
        .join("");

    let piePaginacion = section.querySelector(".paginacion-reclamos-admin");

    if (!piePaginacion) {
        piePaginacion = document.createElement("div");
        piePaginacion.className = "paginacion-reclamos-admin";
        contenedor.insertAdjacentElement("afterend", piePaginacion);
    }

    piePaginacion.innerHTML = renderPaginacionAdministrador(
        filtrados.length,
        paginacion.paginaActual,
        paginacion.totalPaginas,
        "reclamo",
        "reclamos"
    );

    conectarPaginacionAdministrador(piePaginacion, nuevaPagina => {
        paginaReclamos = nuevaPagina;
        renderListaReclamos(busqueda, estadoSeleccionado);
    });

    contenedor.querySelectorAll(".reclamo-admin-imagen img").forEach(imagen => {
        imagen.addEventListener("error", () => {
            const marco = imagen.closest(".reclamo-admin-imagen");
            marco.classList.add("sin-imagen");
            marco.innerHTML = `
                <span class="material-symbols-outlined" aria-hidden="true">image_not_supported</span>
            `;
        });
    });
}

function renderCardReclamo(reclamo) {
    const estado = normalizarEstadoReclamo(reclamo.estado);
    const nombreEstado = NOMBRES_ESTADO_RECLAMO[estado] || estado;
    const rutaEvidencia = reclamo.evidencia?.ruta_archivo;
    const urlEvidencia = obtenerUrlEvidencia(rutaEvidencia);
    const evidencia = urlEvidencia
        ? `<img src="${escaparHtml(urlEvidencia)}" alt="Evidencia del reclamo ${escaparHtml(reclamo.id)}" loading="lazy">`
        : `<span class="material-symbols-outlined" aria-hidden="true">image_not_supported</span>`;

    // Costos de mano de obra y materiales
    const manoObra = reclamo.costo_mano_obra !== null && reclamo.costo_mano_obra !== undefined ? Number(reclamo.costo_mano_obra) : null;
    const materiales = reclamo.costo_materiales !== null && reclamo.costo_materiales !== undefined ? Number(reclamo.costo_materiales) : null;
    
    const formatoMoneda = (valor) => {
        if (valor === null || Number.isNaN(valor)) return "No registrado";
        return new Intl.NumberFormat("es-UY", {
            style: "currency",
            currency: "UYU",
            maximumFractionDigits: 2
        }).format(valor);
    };

    const totalCalculado = (manoObra !== null && materiales !== null) ? (manoObra + materiales) : null;

    return `
        <article class="reclamo-admin-card">
            <div class="reclamo-admin-imagen ${urlEvidencia ? "" : "sin-imagen"}">
                ${evidencia}
            </div>

            <div class="reclamo-admin-contenido">
                <div class="reclamo-admin-encabezado">
                    <span class="reclamo-admin-id">Reclamo #${escaparHtml(reclamo.id)}</span>
                    <span class="reclamo-admin-estado estado-${escaparHtml(estado)}">
                        ${escaparHtml(nombreEstado)}
                    </span>
                </div>

                <p class="reclamo-admin-descripcion">
                    ${escaparHtml(reclamo.description || "Sin descripción")}
                </p>

                <dl class="reclamo-admin-datos">
                    <div>
                        <dt><span class="material-symbols-outlined" aria-hidden="true">person</span> Usuario</dt>
                        <dd>${escaparHtml(reclamo.usuario?.nombre || reclamo.usuario_cedula || "No disponible")}</dd>
                    </div>
                    <div>
                        <dt><span class="material-symbols-outlined" aria-hidden="true">apartment</span> Edificio</dt>
                        <dd>${escaparHtml(reclamo.edificio?.nombre || "No disponible")}</dd>
                    </div>
                    <div>
                        <dt><span class="material-symbols-outlined" aria-hidden="true">category</span> Clasificación</dt>
                        <dd>${escaparHtml(reclamo.clasificacion?.clasificacion || "Sin clasificar")}</dd>
                    </div>
                    <div>
                        <dt><span class="material-symbols-outlined" aria-hidden="true">calendar_today</span> Fecha</dt>
                        <dd>${escaparHtml(formatearFechaReclamo(reclamo.created_at))}</dd>
                    </div>
                    <div>
                        <dt><span class="material-symbols-outlined" aria-hidden="true">engineering</span> Mano de obra</dt>
                        <dd>${escaparHtml(formatoMoneda(manoObra))}</dd>
                    </div>
                    <div>
                        <dt><span class="material-symbols-outlined" aria-hidden="true">inventory_2</span> Materiales</dt>
                        <dd>${escaparHtml(formatoMoneda(materiales))}</dd>
                    </div>
                    <div class="reclamo-admin-gasto-total">
                        <dt><span class="material-symbols-outlined" aria-hidden="true">payments</span> Costo Total</dt>
                        <dd><strong>${escaparHtml(formatoMoneda(totalCalculado))}</strong></dd>
                    </div>
                </dl>
            </div>
        </article>
    `;
}

function renderTarjetaArea(area) {
    const tieneReclamos = Number(area.reclamos_count) > 0;
    return `
        <article class="tarjeta-area-admin">
            <div class="tarjeta-area-encabezado">
                <span class="material-symbols-outlined" aria-hidden="true">meeting_room</span>
                <span class="cantidad-reclamos-area">${escaparHtml(area.reclamos_count ?? 0)} ${Number(area.reclamos_count) === 1 ? "reclamo" : "reclamos"}</span>
            </div>
            <h4>${escaparHtml(area.nombre)}</h4>
            <p class="edificio-tarjeta-area">${escaparHtml(area.edificio?.nombre || "Edificio no disponible")}</p>
            <p class="descripcion-tarjeta-area">${escaparHtml(area.descripcion || "Sin descripción")}</p>
            <div class="acciones-tarjeta-area">
                ${tieneReclamos ? '<span class="aviso-area-con-reclamos">No se puede eliminar: tiene reclamos asociados.</span>' : ''}
                <button type="button" class="btn-eliminar-area" data-area-id="${escaparHtml(area.id)}" ${tieneReclamos ? 'disabled title="No se puede eliminar un área con reclamos asociados"' : ''}>
                    <span class="material-symbols-outlined" aria-hidden="true">delete</span> Eliminar
                </button>
            </div>
        </article>
    `;
}

function conectarFormularioArea(formulario, despuesDeCrear) {
    const edificioInput = formulario.querySelector('[name="edificio_id"]');
    const nombreInput = formulario.querySelector('[name="nombre"]');
    const descripcionInput = formulario.querySelector('[name="descripcion"]');
    const boton = formulario.querySelector('button[type="submit"]');
    const estado = formulario.querySelector(".estado-area-admin");
    const contador = formulario.querySelector(".contador-descripcion-area");
    const actualizarContador = () => {
        contador.textContent = `${descripcionInput.value.length}/200`;
    };

    descripcionInput.addEventListener("input", actualizarContador);
    actualizarContador();

    formulario.addEventListener("submit", async event => {
        event.preventDefault();

        const edificio_id = Number(edificioInput.value);
        const nombre = nombreInput.value.trim();
        const descripcion = descripcionInput.value.trim();

        if (!edificio_id) {
            notify.error("No se pudo identificar el edificio.");
            return;
        }

        if (!nombre) {
            notify.warning("Escribí el nombre del área.");
            return;
        }

        boton.disabled = true;
        boton.textContent = "Creando...";
        estado.textContent = "";

        try {
            const response = await crearArea({ edificio_id, nombre, descripcion });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const mensajeValidacion = ["edificio_id", "nombre", "descripcion"]
                    .map(campo => data.errors?.[campo]?.[0])
                    .find(Boolean);
                throw new Error(mensajeValidacion || data.message || "No se pudo crear el área.");
            }

            nombreInput.value = "";
            descripcionInput.value = "";
            actualizarContador();
            estado.textContent = data.message || "Área creada correctamente.";
            notify.success(estado.textContent);
            await despuesDeCrear(edificio_id);
            nombreInput.focus();
        } catch (error) {
            console.error("Error al crear área:", error);
            estado.textContent = error.message || "No se pudo crear el área.";
            notify.error(estado.textContent);
        } finally {
            boton.disabled = false;
            boton.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">add</span> Crear área';
        }
    });
}

/**
 * Lista y crea clasificaciones de los reclamos.
 */
async function vistaClasificaciones() {
    filtro_container.innerHTML = "";
    section.style.display = "grid";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    section.innerHTML = `
        <div class="lista-clasificaciones-admin">
            <div class="titulo-clasificaciones-admin">
                <div>
                    <h2>Clasificaciones</h2>
                    <p>Categorías disponibles para los reclamos</p>
                </div>
            </div>

            <form class="form-clasificacion-admin">
                <label for="nombre-clasificacion">Nueva clasificación</label>
                <div>
                    <input
                        id="nombre-clasificacion"
                        type="text"
                        maxlength="255"
                        placeholder="Ej. Electricidad"
                        required
                    >
                    <button type="submit">Crear clasificación</button>
                </div>
            </form>

            <div class="contenedor-clasificaciones-admin">
                Cargando clasificaciones...
            </div>
        </div>
    `;

    const formulario = section.querySelector(".form-clasificacion-admin");
    const input = formulario.querySelector("input");
    const boton = formulario.querySelector("button");

    const cargarClasificaciones = async () => {
        const contenedor = section.querySelector(".contenedor-clasificaciones-admin");

        try {
            const response = await obtenerClasificaciones();
            const data = await response.json().catch(() => []);

            if (!response.ok) {
                throw new Error(data.message || "No se pudieron obtener las clasificaciones.");
            }

            clasificaciones = Array.isArray(data) ? data : [];
            contenedor.innerHTML = clasificaciones.length
                ? clasificaciones.map(item => `
                    <div class="clasificacion-admin-item">
                        <span class="material-symbols-outlined" aria-hidden="true">label</span>
                        <span>${escaparHtml(item.clasificacion)}</span>
                    </div>
                `).join("")
                : "<p>No hay clasificaciones registradas.</p>";
        } catch (error) {
            console.error("Error al cargar clasificaciones:", error);
            contenedor.innerHTML = "<p>No se pudieron cargar las clasificaciones.</p>";
            notify.error(error.message || "No se pudieron cargar las clasificaciones.");
        }
    };

    formulario.addEventListener("submit", async event => {
        event.preventDefault();
        const nombre = input.value.trim();

        if (!nombre) {
            notify.warning("Escribe un nombre para la clasificación.");
            return;
        }

        try {
            boton.disabled = true;
            boton.textContent = "Creando...";
            const response = await crearClasificacion(nombre);
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const mensajeValidacion = data.errors?.clasificacion?.[0];
                throw new Error(mensajeValidacion || data.message || "No se pudo crear la clasificación.");
            }

            input.value = "";
            notify.success(data.message || "Clasificación creada correctamente.");
            await cargarClasificaciones();
        } catch (error) {
            console.error("Error al crear clasificación:", error);
            notify.error(error.message || "No se pudo crear la clasificación.");
        } finally {
            boton.disabled = false;
            boton.textContent = "Crear clasificación";
        }
    });

    await cargarClasificaciones();
}



/**
 * ============================================================================
 * CONCEPTO CLAVE: SECCIÓN PROVEEDORES (CRUD y Gestión de Estados)
 * ============================================================================
 * Explicación: Administra los proveedores mediante paginación, filtros por estado (Activo/Inactivo), 
 * un formulario de alta completa y botones para alternar su estado o ver detalles específicos.
 */
function vistaProveedores(){
    section.style.display = "grid";
    filtro_container.innerHTML = "";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    const hayProveedores = proveedores.length > 0;

    const proveedoresFiltrados = proveedores.filter(p =>
        filtroEstadoProveedor === "todos" ||
        p.estado === filtroEstadoProveedor
    );
    const paginacion = paginarElementos(
        proveedoresFiltrados,
        paginaProveedores
    );
    paginaProveedores = paginacion.paginaActual;

    section.innerHTML = `
        <div class="lista-proveedores">

            <div class="titulo-proveedores">
                <h2>Proveedores</h2>

                <button class="btn-agregar-proveedor">
                    <span class="material-symbols-outlined">add</span>
                    Agregar proveedor
                </button>
            </div>
            ${hayProveedores ? `<div class="filtro-estado-proveedores">

                <button class="filtro-estado-btn" data-estado="todos">
                    Todos
                </button>

                <button class="filtro-estado-btn" data-estado="Activo">
                    Activos
                </button>

                <button class="filtro-estado-btn" data-estado="Inactivo">
                    Desactivados
                </button>

            </div>` : ""}


          

            <div class="form-proveedor oculto">

                <div class="form-proveedor-grid">

                    <div class="campo-proveedor">
                        <label>Nombre comercial</label>
                        <input
                            class="nombre-proveedor"
                            type="text"
                            placeholder="Ej. SERVIAM"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Razón social</label>
                        <input
                            class="razon-social-proveedor"
                            type="text"
                            placeholder="Ej. SERVIAM S.R.L."
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>RUT</label>
                        <input
                            class="rut-proveedor"
                            type="text"
                            placeholder="Ej. 21-100342-001-7"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Teléfono de la empresa</label>
                        <input
                            class="telefono-proveedor"
                            type="text"
                            placeholder="Ej. 4342 5678"
                        >
                    </div>

                    <div class="campo-proveedor campo-completo">
                        <label>Dirección</label>
                        <input
                            class="direccion-proveedor"
                            type="text"
                            placeholder="Dirección de la empresa"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Correo electrónico</label>
                        <input
                            class="email-proveedor"
                            type="email"
                            placeholder="Correo de la empresa"
                        >
                    </div>


                    <div class="campo-proveedor">
                        <label>Contacto responsable</label>
                        <input
                            class="contacto-responsable-proveedor"
                            type="text"
                            placeholder="Nombre del responsable"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Teléfono del contacto</label>
                        <input
                            class="telefono-contacto-proveedor"
                            type="text"
                            placeholder="Teléfono del responsable"
                        >
                    </div>

                    <div class="campo-proveedor">
                        <label>Correo del contacto</label>
                        <input
                            class="email-contacto-proveedor"
                            type="email"
                            placeholder="Correo del responsable"
                        >
                    </div>

                </div>


                <div class="acciones-form-proveedor">

                    <button class="cancelar-proveedor">
                        Cancelar
                    </button>

                    <button class="guardar-proveedor">
                        Guardar proveedor
                    </button>

                </div>

            </div>



            <div class="contenedor-proveedores">

                ${
                    !hayProveedores
                        ? `
                            <div class="estado-vacio-proveedores">
                                <span class="material-symbols-outlined" aria-hidden="true">local_shipping</span>
                                <h3>Todavía no hay proveedores</h3>
                                <p>Agregá el primer proveedor para comenzar a asignar y gestionar reclamos.</p>
                            </div>
                        `
                        : paginacion.elementosPagina.length
                            ? paginacion.elementosPagina.map(renderCardProveedor).join("")
                            : `
                                <div class="estado-vacio-proveedores estado-vacio-proveedores-filtrado">
                                    <span class="material-symbols-outlined" aria-hidden="true">filter_alt_off</span>
                                    <h3>No hay proveedores en este estado</h3>
                                    <p>Probá seleccionando otro filtro.</p>
                                </div>
                            `
                }

            </div>

            ${hayProveedores ? `<div class="paginacion-proveedores-admin">
                ${renderPaginacionAdministrador(
                    proveedoresFiltrados.length,
                    paginacion.paginaActual,
                    paginacion.totalPaginas,
                    "proveedor",
                    "proveedores"
                )}
            </div>` : ""}

        </div>
    `;

    document
        .querySelectorAll(".filtro-estado-btn")
        .forEach(boton => {

            if (boton.dataset.estado === filtroEstadoProveedor) {
                boton.classList.add("activo");
            }

            boton.addEventListener("click", () => {

                filtroEstadoProveedor = boton.dataset.estado;
                paginaProveedores = 1;

                vistaProveedores();

        });

    });
    conectarPaginacionAdministrador(
        section.querySelector(".paginacion-proveedores-admin"),
        nuevaPagina => {
            paginaProveedores = nuevaPagina;
            vistaProveedores();
        }
    );
    const btnAgregar =
        document.querySelector(".btn-agregar-proveedor");

    const formulario =
        document.querySelector(".form-proveedor");

    const btnGuardar =
        document.querySelector(".guardar-proveedor");

    const btnCancelar =
        document.querySelector(".cancelar-proveedor");


    const nombreInput =
        document.querySelector(".nombre-proveedor");

    const razonSocialInput =
        document.querySelector(".razon-social-proveedor");

    const rutInput =
        document.querySelector(".rut-proveedor");

    const telefonoInput =
        document.querySelector(".telefono-proveedor");

    const direccionInput =
        document.querySelector(".direccion-proveedor");

    const emailInput =
        document.querySelector(".email-proveedor");

    const contactoInput =
        document.querySelector(".contacto-responsable-proveedor");

    const telefonoContactoInput =
        document.querySelector(".telefono-contacto-proveedor");

    const emailContactoInput =
        document.querySelector(".email-contacto-proveedor");



    btnAgregar.addEventListener("click", () => {

        formulario.classList.toggle("oculto");

    });



    btnCancelar.addEventListener("click", () => {

        formulario.classList.add("oculto");

    });



    btnGuardar.addEventListener("click", async () => {

        const nombre =
            nombreInput.value.trim();

        const razonSocial =
            razonSocialInput.value.trim();

        const RUT =
            rutInput.value.trim();

        const telefono =
            telefonoInput.value.trim();

        const direccion =
            direccionInput.value.trim();

        const email =
            emailInput.value.trim();

        const contactoResponsable =
            contactoInput.value.trim();

        const telefonoContacto =
            telefonoContactoInput.value.trim();

        const emailContacto =
            emailContactoInput.value.trim();


        if (
            nombre === "" ||
            razonSocial === "" ||
            RUT === "" ||
            telefono === "" ||
            direccion === "" ||
            email === "" ||
            contactoResponsable === "" ||
            telefonoContacto === "" ||
            emailContacto === ""
        ) {

            notify.warning("Completa todos los campos.");

            return;

        }


        try {

            btnGuardar.disabled = true;
            btnGuardar.textContent = "Guardando...";

            const response = await crearProveedor({
                nombre: nombre,
                razon_social: razonSocial,
                rut: RUT,
                telefono: telefono,
                direccion: direccion,
                email: email,
                contacto_responsable: contactoResponsable,
                telefono_contacto: telefonoContacto,
                email_contacto: emailContacto
            });


            const data = await response.json();


            console.log("STATUS:", response.status);
            console.log("RESPUESTA:", data);


            if (!response.ok) {

                notify.error(
                    data.message ||
                    "Error al crear el proveedor."
                );

                return;
            }


            notify.success("Proveedor agregado correctamente.");


            formulario.classList.add("oculto");


            // Volver a cargar desde la BD

            await cargarProveedores();

            vistaProveedores();


        } catch (error) {

            console.error(
                "Error al crear proveedor:",
                error
            );

            notify.error(
                "No se pudo conectar con el servidor."
            );

        } finally {

            btnGuardar.disabled = false;
            btnGuardar.textContent =
                "Guardar proveedor";

        }

    });
    document
        .querySelectorAll(".btn-detalle-proveedor")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const id =
                    Number(boton.dataset.id);

                vistaDetalleProveedor(id);

            });


        });
    
        document
        .querySelectorAll(".btn-toggle-estado-proveedor")
        .forEach(boton => {

            boton.addEventListener("click", () => {

                const id = Number(boton.dataset.id);

                cambiarEstadoProveedor(id);

            });

        });

}


function renderCardProveedor(p){

    const usuariosDelProveedor =
        usuarios.filter(
            u =>
                u.rol === "usuario_proveedor" &&
                u.proveedor &&
                Number(u.proveedor.id) === Number(p.id)
        );

    const esActivo = p.estado === "Activo";

    return `

        <div class="proveedor-card ${esActivo ? "" : "proveedor-inactivo"}">

            <div class="proveedor-card-top">

                <div>

                    <h3>${p.nombre}</h3>

                    <span class="proveedor-razon-social">
                        ${p.razon_social}
                    </span>

                </div>


                <span class="proveedor-estado ${esActivo ? "estado-activo" : "estado-inactivo"}">
                    ${p.estado}
                </span>

            </div>


            <div class="proveedor-info-resumen">

                <p>
                    <strong>RUT:</strong>
                    ${p.rut}
                </p>

                <p>
                    <strong>Contacto:</strong>
                    ${p.contacto_responsable}
                </p>

                <p>
                    <strong>Usuarios:</strong>
                    ${usuariosDelProveedor.length}
                </p>

            </div>


            <div class="proveedor-card-acciones">

                <button class="btn-detalle-proveedor" data-id="${p.id}">
                    Ver detalles →
                </button>

                <button
                    class="btn-toggle-estado-proveedor"
                    data-id="${p.id}"
                >
                    ${esActivo ? "Desactivar" : "Activar"}
                </button>

            </div>

        </div>

    `;

}
// Envía el cambio de estado al backend y sincroniza la vista local.
async function cambiarEstadoProveedor(id) {

    try {

        const response = await actualizarEstadoProveedor(id);

        const data = await response.json();

        console.log("STATUS:", response.status);
        console.log("RESPUESTA:", data);

        if (!response.ok) {
            notify.error(
                data.message ||
                "No se pudo actualizar el estado."
            );
            return;
        }

        await cargarProveedores();

        vistaProveedores();

    } catch (error) {

        console.error(
            "Error al cambiar estado del proveedor:",
            error
        );

        notify.error("No se pudo conectar con el servidor.");

    }

}


function vistaDetalleProveedor(id){

    const proveedor =
        proveedores.find(p => p.id === id);

    if(!proveedor) return;


    // ✅ corregido
    const usuariosDelProveedor =
    usuarios.filter(
        u =>
            u.rol === "usuario_proveedor" &&
            u.proveedor &&
            Number(u.proveedor.id) === Number(id)
    );


    section.innerHTML = `

        <div class="lista-proveedores">

            <button class="btn-volver-proveedores">
                ← Volver a Proveedores
            </button>


            <div class="titulo-proveedores">

                <div>
                    <h2>${proveedor.nombre}</h2>
                    <span class="proveedor-razon-social">
                        ${proveedor.razon_social}
                    </span>
                </div>

                

            </div>


            

            <div class="proveedor-detalle-info">

                <h3>Datos de la empresa</h3>

                <div class="detalle-proveedor-grid">

                    <p>
                        <strong>RUT</strong>
                        ${proveedor.rut}
                    </p>

                    <p>
                        <strong>Teléfono</strong>
                        ${proveedor.telefono}
                    </p>

                    <p>
                        <strong>Correo</strong>
                        ${proveedor.email}
                    </p>

                    <p>
                        <strong>Dirección</strong>
                        ${proveedor.direccion}
                    </p>

                    <p>
                        <strong>Contacto responsable</strong>
                        ${proveedor.contacto_responsable}
                    </p>

                    <p>
                        <strong>Teléfono del contacto</strong>
                        ${proveedor.telefono_contacto}
                    </p>

                    <p>
                        <strong>Correo del contacto</strong>
                        ${proveedor.email_contacto}
                    </p>

                    <p>
                        <strong>Estado</strong>
                        ${proveedor.estado}
                    </p>

                </div>

            </div>

            <h3 class="proveedor-detalle-subtitulo">
                Usuarios de proveedor
            </h3>


            <div class="contenedor-usuarios">

                ${
                    usuariosDelProveedor.length > 0

                    ?

                    usuariosDelProveedor.map(u => `

                        <div class="usuario-card">

                            <div class="usuario-info">

                                <h3>${u.nombre}</h3>

                                <p>
                                    Tel: ${u.telefono}
                                </p>

                                ${
                                    u.email
                                    ?
                                    `<p>Email: ${u.email}</p>`
                                    :
                                    ""
                                }

                                <span class="usuario-rol-actual rol-usuario-proveedor">
                                    Usuario de proveedor
                                </span>

                            </div>

                        </div>

                    `).join("")

                    :

                    `
                        <p style="padding:10px;">
                            Este proveedor todavía no tiene
                            usuarios asignados.
                        </p>
                    `
                }

            </div>

        </div>

    `;


    document
        .querySelector(".btn-volver-proveedores")
        .addEventListener(
            "click",
            vistaProveedores
        );

}

/**
 * ============================================================================
 * CONCEPTO CLAVE: SECCIÓN EDIFICIOS (Listado y Detalle con Usuarios)
 * ============================================================================
 * Explicación: Permite registrar nuevos edificios y consultar su información detallada, 
 * filtrando qué usuarios de tipo edificio están vinculados a cada sede.
 */
function vistaEdificios(){

    section.style.display = "grid";
    filtro_container.innerHTML = "";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";

    const paginacion = paginarElementos(edificios, paginaEdificios);
    paginaEdificios = paginacion.paginaActual;

    section.innerHTML = `

        <div class="lista-edificios">

            <div class="titulo-edificios">

                <h2>Edificios</h2>

                <button class="btn-agregar-edificio">
                    <span class="material-symbols-outlined">add</span>
                    Agregar edificio
                </button>

            </div>



            <div class="form-edificio oculto">

                <div class="form-edificio-grid">

                    <div class="campo-edificio campo-edificio-completo">

                        <label>Nombre del edificio</label>

                        <input
                            class="nombre-edificio"
                            type="text"
                            placeholder="Ej. Edificio Central de la Intendencia"
                        >

                    </div>


                    <div class="campo-edificio campo-edificio-completo">

                        <label>Dirección</label>

                        <input
                            class="direccion-edificio"
                            type="text"
                            placeholder="Ej. 18 de Julio 1825, San José"
                        >

                    </div>

                </div>


                <div class="acciones-form-edificio">

                    <button class="cancelar-edificio">
                        Cancelar
                    </button>

                    <button class="guardar-edificio">
                        Guardar edificio
                    </button>

                </div>

            </div>


            <div class="contenedor-edificios">

                ${paginacion.elementosPagina.map(renderCardEdificio).join("")}

            </div>

            <div class="paginacion-edificios-admin">
                ${renderPaginacionAdministrador(
                    edificios.length,
                    paginacion.paginaActual,
                    paginacion.totalPaginas,
                    "edificio",
                    "edificios"
                )}
            </div>

        </div>

    `;


    const btnAgregar =
        document.querySelector(".btn-agregar-edificio");

    const formulario =
        document.querySelector(".form-edificio");

    const btnGuardar =
        document.querySelector(".guardar-edificio");

    const btnCancelar =
        document.querySelector(".cancelar-edificio");

    const nombreInput =
        document.querySelector(".nombre-edificio");

    const direccionInput =
        document.querySelector(".direccion-edificio");

    conectarPaginacionAdministrador(
        section.querySelector(".paginacion-edificios-admin"),
        nuevaPagina => {
            paginaEdificios = nuevaPagina;
            vistaEdificios();
        }
    );

    btnAgregar.addEventListener("click", () => {

        formulario.classList.toggle("oculto");

    });

    btnCancelar.addEventListener("click", () => {

        formulario.classList.add("oculto");

    });

    btnGuardar.addEventListener("click", async () => {

        const nombre =
            nombreInput.value.trim();

        const direccion =
            direccionInput.value.trim();


        if (nombre === "" || direccion === "") {

            notify.warning("Completa todos los campos.");

            return;
        }


        try {

            btnGuardar.disabled = true;
            btnGuardar.textContent = "Guardando...";

            const response = await crearEdificio({
                nombre: nombre,
                direccion: direccion
            });


            const data = await response.json();


            console.log("STATUS:", response.status);
            console.log("RESPUESTA:", data);


            if (!response.ok) {

                notify.error(
                    data.message ||
                    "Error al crear el edificio."
                );

                return;
            }


            notify.success("Edificio agregado correctamente.");


            formulario.classList.add("oculto");


            nombreInput.value = "";
            direccionInput.value = "";


            // Volver a cargar desde la BD

            await cargarEdificios();

            vistaEdificios();


        } catch (error) {

            console.error(
                "Error al crear edificio:",
                error
            );

            notify.error(
                "No se pudo conectar con el servidor."
            );

        } finally {

            btnGuardar.disabled = false;
            btnGuardar.textContent =
                "Guardar edificio";

        }

    });

    document
    .querySelectorAll(".btn-detalle-edificio")
    .forEach(boton => {

        boton.addEventListener("click", () => {

            const id = Number(boton.dataset.id);

            vistaDetalleEdificio(id);

        });

    });


}
function renderCardEdificio(edificio){

    return `
        <div class="edificio-card">

            <div class="edificio-card-header">

                <div class="edificio-icono-div">
                    <span class="material-symbols-outlined">
                        home_work
                    </span>
                </div>

                <div>
                    <h3>${edificio.nombre}</h3>
                </div>

            </div>

            <div class="edificio-info">

                <p>
                    <strong>Dirección:</strong>
                    ${edificio.direccion}
                </p>

                <p>
                    <strong>ID del edificio:</strong>
                    ${edificio.id}
                </p>

            </div>

            <button
                class="btn-detalle-edificio"
                data-id="${edificio.id}">
                Ver detalles →
            </button>

        </div>
    `;
}

function vistaDetalleEdificio(id) {

    // ==========================================
    // BUSCAR EDIFICIO
    // ==========================================

    const edificio = edificios.find(
        e => Number(e.id) === Number(id)
    );

    if (!edificio) {
        console.error(
            "No se encontró el edificio:",
            id
        );

        return;
    }


    // ==========================================
    // BUSCAR USUARIOS DEL EDIFICIO
    // ==========================================

    /*
     * IMPORTANTE:
     *
     * Ya NO usamos:
     *
     * u.edificioId === id
     *
     * porque los usuarios vienen desde Laravel
     * con una propiedad:
     *
     * u.edificios
     *
     * Ejemplo:
     *
     * {
     *     cedula: "12345678",
     *     nombre: "Juan Pérez",
     *     rol: "Usuario de edificio",
     *     edificios: [
     *         {
     *             id: 1,
     *             nombre: "Edificio Administrativo"
     *         }
     *     ]
     * }
     */


    const usuariosDelEdificio =
        usuarios.filter(usuario => {

            // Primero verificamos que sea
            // usuario de edificio

            if (
                usuario.rol !==
                "usuario_edificio"
            ) {
                return false;
            }


            // Verificamos que tenga edificios

            if (
                !Array.isArray(usuario.edificios)
            ) {
                return false;
            }


            // Buscamos el edificio dentro
            // de los edificios del usuario

            return usuario.edificios.some(
                edificioUsuario =>
                    Number(edificioUsuario.id) ===
                    Number(id)
            );

        });


    console.log(
        "Edificio seleccionado:",
        edificio
    );

    console.log(
        "Usuarios de este edificio:",
        usuariosDelEdificio
    );


    // ==========================================
    // CONFIGURAR SECCIÓN
    // ==========================================

    section.style.display = "grid";

    filtro_container.innerHTML = "";

    section.style.gridTemplateColumns =
        "repeat(1, 1fr)";


    // ==========================================
    // HTML
    // ==========================================

    section.innerHTML = `

        <div class="lista-edificios">


            <!-- =================================
                 VOLVER
            ================================== -->

            <button class="btn-volver-edificios">

                ← Volver a Edificios

            </button>


            <!-- =================================
                 TITULO
            ================================== -->

            <div class="titulo-edificios">

                <div>

                    <h2>
                        ${edificio.nombre}
                    </h2>

                    <p class="subtitulo-edificios">
                        Información del edificio
                    </p>

                </div>

            </div>


            <!-- =================================
                 INFORMACIÓN DEL EDIFICIO
            ================================== -->

            <div class="edificio-detalle-info">

                <h3>
                    Datos del edificio
                </h3>


                <div class="detalle-edificio-grid">


                    <p>

                        <strong>
                            Nombre
                        </strong>

                        ${edificio.nombre}

                    </p>


                    <p>

                        <strong>
                            ID del edificio
                        </strong>

                        ${edificio.id}

                    </p>


                    <p>

                        <strong>
                            Dirección
                        </strong>

                        ${edificio.direccion}

                    </p>


                </div>

            </div>


            <div class="edificio-areas">
                <div class="encabezado-areas-registradas">
                    <div>
                        <h3>Áreas del edificio</h3>
                        <p class="resumen-areas-edificio">Cargando áreas...</p>
                    </div>
                </div>

                <form class="form-area-admin form-area-edificio">
                    <input type="hidden" name="edificio_id" value="${escaparHtml(edificio.id)}">
                    <div class="encabezado-form-area-admin">
                        <span class="material-symbols-outlined" aria-hidden="true">add_circle</span>
                        <div>
                            <h3>Nueva área</h3>
                            <p>Agregá un espacio a ${escaparHtml(edificio.nombre)}.</p>
                        </div>
                    </div>
                    <div class="campos-form-area-admin">
                        <div class="campo-area-admin">
                            <label for="detalle-area-nombre">Nombre del área</label>
                            <input id="detalle-area-nombre" name="nombre" type="text" maxlength="255" placeholder="Ej. Recepción" required>
                        </div>
                        <div class="campo-area-admin">
                            <label for="detalle-area-descripcion">Descripción <span>(opcional)</span></label>
                            <textarea id="detalle-area-descripcion" name="descripcion" maxlength="200" placeholder="Ubicación o detalle del área" aria-describedby="detalle-area-contador"></textarea>
                            <span id="detalle-area-contador" class="contador-descripcion-area" aria-live="off">0/200</span>
                        </div>
                    </div>
                    <div class="acciones-form-area-admin">
                        <button type="submit">
                            <span class="material-symbols-outlined" aria-hidden="true">add</span>
                            Crear área
                        </button>
                        <p class="estado-area-admin" role="status" aria-live="polite"></p>
                    </div>
                </form>

                <div class="contenedor-areas-admin" aria-live="polite"></div>
            </div>


            <!-- =================================
                 USUARIOS
            ================================== -->

            <h3 class="edificio-detalle-subtitulo">

                Usuarios del edificio

            </h3>


            <div class="contenedor-usuarios-edificio">


                ${
                    usuariosDelEdificio.length > 0

                    ?

                    usuariosDelEdificio.map(usuario => `

                        <div
                            class="usuario-card"
                        >


                            <div class="usuario-info">


                                <h3>
                                    ${usuario.nombre}
                                </h3>


                                <p>

                                    Cédula:
                                    ${usuario.cedula}

                                </p>


                                <p>

                                    Tel:
                                    ${
                                        usuario.telefono
                                        ||
                                        "Sin teléfono"
                                    }

                                </p>


                                ${
                                    usuario.email

                                    ?

                                    `
                                    <p>

                                        Email:
                                        ${usuario.email}

                                    </p>
                                    `

                                    :

                                    ""
                                }


                                <span
                                    class="usuario-rol-actual rol-usuario-edificio"
                                >

                                    Usuario de edificio

                                </span>


                            </div>


                        </div>

                    `).join("")


                    :

                    `

                    <p class="sin-usuarios">

                        Este edificio todavía no tiene
                        usuarios asignados.

                    </p>

                    `

                }


            </div>


        </div>

    `;


    const formularioArea = section.querySelector(".form-area-edificio");
    const listaAreas = section.querySelector(".edificio-areas .contenedor-areas-admin");
    const resumenAreas = section.querySelector(".resumen-areas-edificio");

    listaAreas.addEventListener("click", async event => {
        const boton = event.target.closest(".btn-eliminar-area");
        if (!boton || boton.disabled) return;

        const nombreArea = boton.closest(".tarjeta-area-admin").querySelector("h4").textContent;
        const confirmado = await notify.confirm(
            `¿Querés eliminar el área «${nombreArea}»?`,
            { title: "Eliminar área", confirmText: "Sí, eliminar", cancelText: "No, volver" }
        );
        if (!confirmado || !boton.isConnected) return;

        boton.disabled = true;
        try {
            const response = await eliminarArea(boton.dataset.areaId);
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.message || "No se pudo eliminar el área.");

            notify.success(data.message || "Área eliminada correctamente.");
            await cargarAreasEdificio();
        } catch (error) {
            console.error("Error al eliminar área:", error);
            notify.error(error.message || "No se pudo eliminar el área.");
            boton.disabled = false;
        }
    });

    async function cargarAreasEdificio() {
        listaAreas.innerHTML = '<p class="mensaje-areas-admin">Cargando áreas...</p>';

        try {
            const response = await obtenerAreas(edificio.id);
            const data = await response.json().catch(() => ({}));
            if (!response.ok || !Array.isArray(data)) {
                throw new Error(data?.message || "No se pudieron cargar las áreas.");
            }

            if (!listaAreas.isConnected) return;
            resumenAreas.textContent = `${data.length} ${data.length === 1 ? "área registrada" : "áreas registradas"}`;
            listaAreas.innerHTML = data.length
                ? data.map(renderTarjetaArea).join("")
                : '<div class="sin-areas-admin">Este edificio todavía no tiene áreas. Creá la primera arriba.</div>';
        } catch (error) {
            console.error("Error al cargar las áreas del edificio:", error);
            if (!listaAreas.isConnected) return;
            resumenAreas.textContent = "No se pudieron cargar las áreas";
            listaAreas.innerHTML = '<div class="sin-areas-admin">No se pudieron cargar las áreas. <button type="button" class="reintentar-areas-admin">Reintentar</button></div>';
            listaAreas.querySelector(".reintentar-areas-admin").addEventListener("click", cargarAreasEdificio);
        }
    }

    conectarFormularioArea(formularioArea, cargarAreasEdificio);
    cargarAreasEdificio();

    // ==========================================
    // BOTÓN VOLVER
    // ==========================================

    const btnVolver =
        document.querySelector(
            ".btn-volver-edificios"
        );


    if (btnVolver) {

        btnVolver.addEventListener(
            "click",
            () => {

                vistaEdificios();

            }
        );

    }

}


/**
 * ============================================================================
 * CONCEPTO CLAVE: SECCIÓN USUARIOS (Gestión integral de cuentas y permisos)
 * ============================================================================
 * Explicación: Es la vista más robusta del administrador. Permite filtrar usuarios por rol y texto, 
 * crear nuevas cuentas (vinculándolas dinámicamente a edificios o proveedores según corresponda), 
 * cambiar roles sobre la marcha, y actualizar credenciales de acceso de forma segura.
 */
function vistaUsuarios(filtro = "") {

    section.style.display = "grid";
    section.style.gridTemplateColumns = "repeat(1, 1fr)";
    filtro_container.innerHTML = "";

    const etiquetasRoles = {
        administrador: "Administrador",
        administrativo: "Administrativo",
        usuario_edificio: "Usuario de edificio",
        usuario_proveedor: "Usuario de proveedor"
    };

    const rolesDisponibles = [...new Set([
        ...Object.keys(etiquetasRoles),
        ...usuarios.map(usuario => String(usuario.rol || "").trim()).filter(Boolean)
    ])].sort();

    const opcionesFiltroRoles = rolesDisponibles.map(rol => `
        <option value="${escaparHtml(rol)}">
            ${escaparHtml(etiquetasRoles[rol] || rol.replaceAll("_", " "))}
        </option>
    `).join("");

    section.innerHTML = `
        <div class="lista-usuarios">

            <div class="titulo-usuarios">

                <div>
                    <h2>Usuarios</h2>

                    <p class="subtitulo-usuarios">
                        Gestiona los usuarios y sus asociaciones.
                    </p>
                </div>

                <button class="btn-agregar-usuario">
                    <span class="material-symbols-outlined">add</span>
                    Agregar usuario
                </button>

            </div>


            <!-- ==============================
                 FORMULARIO AGREGAR USUARIO
            =============================== -->

            <div class="form-usuario oculto">

                <div class="form-usuario-grid">

                    <div class="campo-usuario">

                        <label>Cédula</label>

                        <input
                            class="cedula-usuario"
                            type="text"
                            inputmode="numeric"
                            maxlength="8"
                            placeholder="Ej. 56789123"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Nombre completo</label>

                        <input
                            class="nombre-usuario"
                            type="text"
                            maxlength="60"
                            placeholder="Ej. Juan Pérez"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Teléfono</label>

                        <input
                            class="telefono-usuario"
                            type="text"
                            inputmode="numeric"
                            maxlength="9"
                            placeholder="Ej. 098123456"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Correo electrónico</label>

                        <input
                            class="email-usuario"
                            type="email"
                            maxlength="255"
                            placeholder="Ej. usuario@gmail.com"
                        >

                    </div>

                 <div class="campo-usuario">
                      <label>Contraseña</label>
                        <div class="campo-password-wrapper">
                            <input
                         class="password-usuario"
                            type="password"
                         placeholder="Contraseña"
                          >
                         <button type="button" class="btn-toggle-password-input" aria-label="Mostrar contraseña">
                       <span class="material-symbols-outlined">visibility</span>
                     </button>
                   </div>
                  </div>

                    <div class="campo-usuario">
                        <label>Repetir contraseña</label>
                            <div class="campo-password-wrapper">
                               <input
                              class="confirm-password-usuario"
                                 type="password"
                               placeholder="Repetir contraseña"
                                >
                         <button type="button" class="btn-toggle-password-input" aria-label="Mostrar contraseña">
                              <span class="material-symbols-outlined">visibility</span>
                          </button>
                      </div>
                    </div>
                    <div class="campo-usuario">

                        <label>Tipo de usuario</label>

                        <select class="rol-usuario">

                            <option value="" selected disabled>
                                Seleccionar tipo de usuario
                            </option>

                            <option value="usuario_edificio">
                                Usuario de edificio
                            </option>

                            <option value="usuario_proveedor">
                                Usuario de proveedor
                            </option>

                            <option value="administrativo">
                                Administrativo
                            </option>

                            ${usuarioActual?.es_super_admin ? `
                                <option value="administrador">
                                    Administrador
                                </option>
                            ` : ""}


                        </select>

                    </div>


                    <!-- ==============================
                         EDIFICIO
                    =============================== -->

                    

                        <div class="campo-usuario campo-asociacion oculto campo-completo">

                            <label>Edificios</label>

                            <div class="checkboxes-edificios">

                                ${
                                    edificios.map(e => `
                                        <label class="checkbox-edificio">
                                            <input
                                                type="checkbox"
                                                class="chk-edificio"
                                                value="${e.id}"
                                            >
                                            ${e.nombre}
                                        </label>
                                    `).join("")
                                }

                            </div>

                        </div>

                    


                    <!-- ==============================
                         PROVEEDOR
                    =============================== -->

                    <div class="campo-usuario campo-proveedor-usuario oculto">

                        <label>Proveedor</label>

                        <select class="proveedor-usuario">

                            <option value="" selected disabled>
                                Seleccionar proveedor
                            </option>

                            ${
                                proveedores.map(p => `
                                    <option value="${p.id}">
                                        ${p.nombre}
                                    </option>
                                `).join("")
                            }

                        </select>

                    </div>

                </div>


                <div class="acciones-form-usuario">

                    <button class="cancelar-usuario">
                        Cancelar
                    </button>

                    <button class="guardar-usuario">
                        Guardar usuario
                    </button>

                </div>

            </div>


            <!-- ==============================
                 BUSCADOR
            =============================== -->

            <div class="buscador-usuarios">

                <input
                    class="input-buscar-usuario"
                    type="search"
                    name="admin-search-query"
                    autocomplete="one-time-code"
                    readonly
                    role="searchbox"
                    aria-label="Buscar usuarios"
                    autocapitalize="none"
                    spellcheck="false"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    placeholder="Buscar por nombre, teléfono o cédula"
                    value="${filtro}"
                >

                <button class="btn-buscar-usuario">

                    <span class="material-symbols-outlined">
                        search
                    </span>

                    Buscar

                </button>

                <label class="filtro-rol-usuarios">
                    <span class="material-symbols-outlined" aria-hidden="true">filter_list</span>
                    <select class="filtro-rol-usuario" aria-label="Filtrar por tipo de usuario">
                        <option value="todos">Todos los tipos</option>
                        ${opcionesFiltroRoles}
                    </select>
                </label>

            </div>


            <!-- ==============================
                 LISTADO
            =============================== -->

            <div class="contenedor-usuarios contenedor-usuarios-gestion"></div>

        </div>
    `;


    // ==========================================
    // ELEMENTOS DEL DOM
    // ==========================================


    
    const cedulaInput =
        document.querySelector(".cedula-usuario");

    cedulaInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
    });

    const nombreInput =
        document.querySelector(".nombre-usuario");
       
        nombreInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    });
        

    const telefonoInput =
        document.querySelector(".telefono-usuario");

    telefonoInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 9);
    });

    const emailInput =
        document.querySelector(".email-usuario");


    const passwordInput =
        document.querySelector(".password-usuario");


    const confirmPasswordInput = document.querySelector(".confirm-password-usuario");


    const rolSelect =
        document.querySelector(".rol-usuario");


    const proveedorSelect =
        document.querySelector(".proveedor-usuario");

    const campoEdificio =
        document.querySelector(".campo-asociacion");

    const campoProveedor =
        document.querySelector(".campo-proveedor-usuario");

    const btnAgregar =
        document.querySelector(".btn-agregar-usuario");

    const formulario =
        document.querySelector(".form-usuario");

    const btnCancelar =
        document.querySelector(".cancelar-usuario");

    const btnGuardar =
        document.querySelector(".guardar-usuario");

    const inputBuscar =
        document.querySelector(".input-buscar-usuario");

    const habilitarBuscador = () => {
        inputBuscar.removeAttribute("readonly");
    };

    inputBuscar.addEventListener("pointerdown", habilitarBuscador, { once: true });
    inputBuscar.addEventListener("focus", habilitarBuscador, { once: true });

    const btnBuscar =
        document.querySelector(".btn-buscar-usuario");

    const filtroRolSelect =
        document.querySelector(".filtro-rol-usuario");

    const contenedor =
        document.querySelector(".contenedor-usuarios");

    const igualarAlturaTarjetas = () => {
        const tarjetas = Array.from(
            contenedor.querySelectorAll(".usuario-card")
        );

        if (!tarjetas.length || contenedor.querySelector(".usuario-card-editando")) {
            return;
        }

        contenedor.style.removeProperty("--altura-tarjeta-usuario");
        tarjetas.forEach(tarjeta => {
            tarjeta.style.height = "auto";
        });

        const alturaMaxima = Math.max(
            ...tarjetas.map(tarjeta => Math.ceil(tarjeta.getBoundingClientRect().height))
        );

        tarjetas.forEach(tarjeta => {
            tarjeta.style.removeProperty("height");
        });
        contenedor.style.setProperty(
            "--altura-tarjeta-usuario",
            `${alturaMaxima}px`
        );
    };

    observadorAlturaUsuarios?.disconnect();
    let anchoContenedorUsuarios = Math.round(contenedor.getBoundingClientRect().width);
    observadorAlturaUsuarios = new ResizeObserver(() => {
        const nuevoAncho = Math.round(contenedor.getBoundingClientRect().width);

        if (nuevoAncho === anchoContenedorUsuarios) {
            return;
        }

        anchoContenedorUsuarios = nuevoAncho;
        requestAnimationFrame(igualarAlturaTarjetas);
    });
    observadorAlturaUsuarios.observe(contenedor);


    // ==========================================
    // MOSTRAR FORMULARIO
    // ==========================================

    btnAgregar.addEventListener("click", () => {

        formulario.classList.toggle("oculto");

    });


    // ==========================================
    // CANCELAR
    // ==========================================

    btnCancelar.addEventListener("click", () => {

        formulario.classList.add("oculto");

        cedulaInput.value = "";
        nombreInput.value = "";
        telefonoInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        confirmPasswordInput.value = ""; 
        rolSelect.selectedIndex = 0;

        document
            .querySelectorAll(".chk-edificio")
            .forEach(chk => chk.checked = false);

        proveedorSelect.selectedIndex = 0;

        campoEdificio.classList.add("oculto");
        campoProveedor.classList.add("oculto");

    });

    // ==========================================
    // CAMBIAR TIPO DE USUARIO
    // ==========================================

    rolSelect.addEventListener("change", () => {

        const rol = rolSelect.value;

        campoEdificio.classList.add("oculto");
        campoProveedor.classList.add("oculto");

        document
            .querySelectorAll(".chk-edificio")
            .forEach(chk => chk.checked = false);

        proveedorSelect.value = "";

        if (rol === "usuario_edificio") {
            campoEdificio.classList.remove("oculto");
        }

        if (rol === "usuario_proveedor") {
            campoProveedor.classList.remove("oculto");
        }

    });


    // ==========================================
    // GUARDAR NUEVO USUARIO
    // ==========================================

    btnGuardar.addEventListener("click", async () => {

        const cedula =
            cedulaInput.value.trim();

        const nombre =
            nombreInput.value.trim();

        const telefono =
            telefonoInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();

        const rol =
            rolSelect.value;


        // ======================================
        // VALIDACIONES
        // ======================================

        if (
            cedula === "" ||
            nombre === "" ||
            password === "" ||
            !rol
        ) {

            notify.warning("Completa los campos obligatorios.");

            return;

        }

        if (!validarCedulaUruguaya(cedula)) {
            notify.error("La cédula de identidad ingresada no es válida.");
            cedulaInput.focus();
            return;
        }

        if (!validarCedulaUruguaya(cedula)) {
            notify.error("La cédula de identidad ingresada no es válida.");
            cedulaInput.focus();
            return;
        }
        
        if (!/^\d{7,8}$/.test(cedula)) {
            notify.warning("La cédula debe tener entre 7 y 8 números.");
            return;
        }

        if (telefono !== "" && !/^09\d{7}$/.test(telefono)) {
            notify.warning("El teléfono debe tener 9 números y comenzar con 09.");
            return;
        }

        if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            notify.warning("Ingresa un correo electrónico válido, por ejemplo usuario@gmail.com.");
            return;
        }

        if (
            password !==
             confirmPasswordInput.value.trim()
        ) {
            notify.warning("Las contraseñas no coinciden.");
            return;
        }

        // ======================================
        // VALIDAR EDIFICIO
        // ======================================

        const edificiosSeleccionados =
            Array.from(
                document.querySelectorAll(".chk-edificio:checked")
            ).map(chk => Number(chk.value));

        if (rol === "usuario_edificio") {

            if (edificiosSeleccionados.length === 0) {

                notify.warning(
                    "Selecciona al menos un edificio para el usuario."
                );

                return;

            }

        }


        // ======================================
        // VALIDAR PROVEEDOR
        // ======================================

        if (rol === "usuario_proveedor"){

            if (!proveedorSelect.value) {

                notify.warning(
                    "Selecciona el proveedor al que pertenece el usuario."
                );

                return;

            }

        }


        // ======================================
        // DATOS PARA LARAVEL
        // ======================================

        const datos = {
            cedula: cedula,
            nombre: nombre,
            telefono: telefono,
            email: email,
            password: password,
            rol: rol
        };



        /*
         * IMPORTANTE:
         *
         * El backend actualmente recibe:
         *
         * edificio
         *
         * Por eso enviamos solamente eso.
         */

        if (rol === "usuario_edificio") {
            datos.edificios = edificiosSeleccionados;
        }

        if (rol === "usuario_proveedor") {
            datos.proveedor = Number(proveedorSelect.value);
        }

        try {

            btnGuardar.disabled = true;
            btnGuardar.textContent = "Guardando...";

            const response = await crearUsuario(datos);


            const data =
                await response.json();


            console.log(
                "STATUS:",
                response.status
            );

            console.log(
                "RESPUESTA:",
                data
            );


            // ==================================
            // ERROR
            // ==================================

            if (!response.ok) {

                console.error(
                    "Error del servidor:",
                    data
                );

                notify.error(
                    data.message ||
                    "Error al crear el usuario."
                );

                return;

            }


            // ==================================
            // ÉXITO
            // ==================================

            notify.success(
                "Usuario agregado correctamente."
            );


            // ==================================
            // ACTUALIZAR ARRAY LOCAL
            // ==================================

            usuarios.push(data.usuario);


            // ==================================
            // LIMPIAR FORMULARIO
            // ==================================

            formulario.classList.add("oculto");

            cedulaInput.value = "";
            nombreInput.value = "";
            telefonoInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";

            rolSelect.selectedIndex = 0;
            document
                .querySelectorAll(".chk-edificio")
                .forEach(chk => chk.checked = false);
            proveedorSelect.selectedIndex = 0;

            campoEdificio.classList.add("oculto");
            campoProveedor.classList.add("oculto");


            // ==================================
            // VOLVER A MOSTRAR LISTA
            // ==================================

            renderLista(
                inputBuscar.value.trim(),
                filtroRolSelect.value
            );


        } catch (error) {

            console.error(
                "Error al crear usuario:",
                error
            );

            notify.error(
                "No se pudo conectar con el servidor."
            );

        } finally {

            btnGuardar.disabled = false;
            btnGuardar.textContent =
                "Guardar usuario";

        }

    });


    // ==========================================
    // RENDERIZAR LISTA
    // ==========================================

    function renderLista(valorFiltro = "", filtroRol = "todos") {

        const filtroNormalizado =
            quitarTildes(
                valorFiltro.toLowerCase()
            );


        const usuariosFiltrados = usuarios.filter(u => {
            const coincideRol = filtroRol === "todos" || u.rol === filtroRol;

            if (!coincideRol) return false;

            if (!valorFiltro) return true;

                const nombre =
                    quitarTildes(
                        (u.nombre || "").toLowerCase()
                    );

                const telefono =
                    (u.telefono || "");

                const cedula =
                    (u.cedula || "");


                return (
                    nombre.includes(filtroNormalizado) ||
                    telefono.includes(valorFiltro) ||
                    cedula.includes(valorFiltro)
                );

        });


        // ======================================
        // NO HAY USUARIOS
        // ======================================

        if (!usuariosFiltrados.length) {

            contenedor.innerHTML = `
                <p class="sin-usuarios">
                    No se encontraron usuarios.
                </p>
            `;

            return;

        }


        // ======================================
        // CREAR CARDS
        // ======================================

        contenedor.innerHTML =
            usuariosFiltrados.map(usuario => {

                /*
                 * IMPORTANTE:
                 *
                 * Laravel devuelve:
                 *
                 * usuario.edificios
                 *
                 * y NO:
                 *
                 * usuario.edificioId
                 */

                const edificiosDelUsuario =
                    usuario.rol === "usuario_edificio"
                        ? (usuario.edificios || [])
                        : [];

                const edificioPrincipal = edificiosDelUsuario[0] || null;
                const edificiosAdicionales = edificiosDelUsuario.slice(1);
                const idEdificiosUsuario = `edificios-usuario-${String(usuario.cedula).replace(/[^a-zA-Z0-9_-]/g, "")}`;
                const resumenEdificios = edificioPrincipal
                    ? `
                        <div class="usuario-edificios-resumen">
                            <span class="usuario-asociacion">
                                <span class="material-symbols-outlined" aria-hidden="true">apartment</span>
                                <span>Edificio: ${escaparHtml(edificioPrincipal.nombre)}</span>
                            </span>
                            ${edificiosAdicionales.length ? `
                                <button
                                    class="btn-ver-edificios-usuario"
                                    type="button"
                                    aria-label="Ver ${edificiosAdicionales.length} edificio${edificiosAdicionales.length === 1 ? "" : "s"} adicional${edificiosAdicionales.length === 1 ? "" : "es"}"
                                    aria-expanded="false"
                                    aria-controls="${idEdificiosUsuario}"
                                    title="Ver otros edificios asociados"
                                >
                                    <span class="material-symbols-outlined" aria-hidden="true">apartment</span>
                                    <span>+${edificiosAdicionales.length}</span>
                                </button>
                                <div class="usuario-edificios-popover oculto" id="${idEdificiosUsuario}">
                                    <strong>Otros edificios asociados</strong>
                                    <ul>
                                        ${edificiosAdicionales.map(edificio => `
                                            <li>
                                                <span class="material-symbols-outlined" aria-hidden="true">apartment</span>
                                                <span>${escaparHtml(edificio.nombre)}</span>
                                            </li>
                                        `).join("")}
                                    </ul>
                                </div>
                            ` : ""}
                        </div>
                    `
                    : "";

                const esUsuarioActual =
                    String(usuario.cedula) === String(usuarioActual?.cedula);
                const esAdministrador = usuario.rol === "administrador";
                const estaProtegido =
                    esAdministrador &&
                    !usuarioActual?.es_super_admin &&
                    !esUsuarioActual;
                const puedeEditarDatos = !estaProtegido;
                const puedeEliminar =
                    !esAdministrador || Boolean(usuarioActual?.es_super_admin);
                const administradoresDisponibles = usuarios.filter(candidato =>
                    candidato.rol === "administrador" &&
                    candidato.activo &&
                    String(candidato.cedula) !== String(usuario.cedula)
                );
                const claseRol = `rol-${String(usuario.rol || "").replaceAll("_", "-")}`;
                const etiquetaRol = etiquetasRoles[usuario.rol] || usuario.rol;


                return `

                    <div
                        class="usuario-card ${estaProtegido ? "usuario-card-protegida" : ""}"
                        data-cedula="${usuario.cedula}"
                    >

                        <div class="acciones-usuario-superiores">
                                <button
                                    class="btn-editar-usuario"
                                    type="button"
                                    aria-label="Editar datos de ${escaparHtml(usuario.nombre)}"
                                    aria-expanded="false"
                                    title="Editar datos"
                                    ${puedeEditarDatos ? "" : "disabled"}
                                >
                                    <span class="material-symbols-outlined" aria-hidden="true">edit</span>
                                </button>
                                <button
                                    class="btn-password-usuario"
                                    type="button"
                                    aria-label="Cambiar contraseña de ${escaparHtml(usuario.nombre)}"
                                    aria-expanded="false"
                                    title="Cambiar contraseña"
                                    ${puedeEditarDatos ? "" : "disabled"}
                                >
                                    <span class="material-symbols-outlined" aria-hidden="true">key</span>
                                </button>
                                ${puedeEliminar ? `
                                    <button
                                        class="btn-eliminar-usuario"
                                        type="button"
                                        aria-label="Borrar usuario ${escaparHtml(usuario.nombre)}"
                                        title="Borrar usuario"
                                    >
                                        <span class="material-symbols-outlined" aria-hidden="true">delete</span>
                                    </button>
                                ` : ""}
                                <button
                                    class="btn-confirmar-edicion-usuario oculto"
                                    type="button"
                                    aria-label="Guardar cambios"
                                    title="Guardar cambios"
                                >
                                    <span class="material-symbols-outlined" aria-hidden="true">check</span>
                                </button>
                                <button
                                    class="btn-cancelar-edicion-usuario oculto"
                                    type="button"
                                    aria-label="Cancelar edición"
                                    title="Cancelar edición"
                                >
                                    <span class="material-symbols-outlined" aria-hidden="true">close</span>
                                </button>
                        </div>

                        <div class="usuario-info">

                            <h3 class="usuario-dato-inline usuario-nombre-inline">
                                <span class="usuario-dato-etiqueta usuario-etiqueta-nombre">
                                    <span class="material-symbols-outlined usuario-dato-icono" aria-hidden="true">person</span>
                                    Nombre
                                </span>
                                <span class="dato-visual">${escaparHtml(usuario.nombre)}</span>
                                <input
                                    class="editar-nombre campo-edicion-inline oculto"
                                    type="text"
                                    maxlength="100"
                                    aria-label="Nombre completo"
                                    value="${escaparHtml(usuario.nombre || "")}"
                                >
                            </h3>

                            <p class="usuario-dato-inline usuario-cedula-inline">
                                <span class="usuario-dato-etiqueta">
                                    <span class="material-symbols-outlined usuario-dato-icono" aria-hidden="true">badge</span>
                                    Cédula
                                </span>
                                <span class="dato-visual">${escaparHtml(usuario.cedula)}</span>
                                <input
                                    class="campo-edicion-inline campo-cedula-bloqueada oculto"
                                    type="text"
                                    value="${escaparHtml(usuario.cedula)}"
                                    aria-label="Cédula, no editable"
                                    disabled
                                >
                            </p>


                            <p class="usuario-dato-inline">
                                <span class="usuario-dato-etiqueta">
                                    <span class="material-symbols-outlined usuario-dato-icono" aria-hidden="true">phone</span>
                                    Teléfono
                                </span>
                                <span class="dato-visual">${escaparHtml(usuario.telefono || "Sin teléfono")}</span>
                                <input
                                    class="editar-telefono campo-edicion-inline oculto"
                                    type="text"
                                    inputmode="numeric"
                                    maxlength="9"
                                    aria-label="Teléfono"
                                    value="${escaparHtml(usuario.telefono || "")}"
                                >
                            </p>

                            <p class="usuario-dato-inline">
                                <span class="usuario-dato-etiqueta">
                                    <span class="material-symbols-outlined usuario-dato-icono" aria-hidden="true">mail</span>
                                    Correo
                                </span>
                                <span class="dato-visual">${escaparHtml(usuario.email || "Sin correo")}</span>
                                <input
                                    class="editar-email campo-edicion-inline oculto"
                                    type="email"
                                    maxlength="255"
                                    aria-label="Correo electrónico"
                                    value="${escaparHtml(usuario.email || "")}"
                                >
                            </p>

                            <p class="usuario-dato-inline">
                                <span class="usuario-dato-etiqueta">
                                    <span class="material-symbols-outlined usuario-dato-icono" aria-hidden="true">${usuario.activo ? "check_circle" : "cancel"}</span>
                                    Estado
                                </span>
                                <span class="dato-visual">${usuario.activo ? "Activo" : "Inactivo"}</span>
                                <select
                                    class="editar-activo campo-edicion-inline oculto"
                                    aria-label="Estado del usuario"
                                    ${usuario.es_super_admin || esUsuarioActual ? "disabled" : ""}
                                >
                                    <option value="1" ${usuario.activo ? "selected" : ""}>Activo</option>
                                    <option value="0" ${usuario.activo ? "" : "selected"}>Inactivo</option>
                                </select>
                            </p>

                            <div class="usuario-insignias">
                                <span class="usuario-rol-actual ${claseRol}">
                                    ${escaparHtml(etiquetaRol)}
                                </span>

                                ${usuario.es_super_admin ? `
                                    <span class="usuario-super-admin">
                                        <span class="material-symbols-outlined" aria-hidden="true">verified_user</span>
                                        <span>Administrador superior</span>
                                    </span>
                                ` : ""}
                            </div>


                            ${resumenEdificios}

                        </div>

                        ${estaProtegido ? `
                            <p class="usuario-protegido-mensaje">
                                Solo el administrador superior puede modificar esta cuenta.
                            </p>
                        ` : ""}

                        <div class="mensaje-editor-usuario oculto" role="status" aria-live="polite">
                            <span class="material-symbols-outlined mensaje-editor-icono" aria-hidden="true">info</span>
                            <span class="mensaje-editor-texto"></span>
                        </div>

                        <div class="confirmacion-editor-usuario oculto" role="alertdialog" aria-modal="false">
                            <span class="material-symbols-outlined" aria-hidden="true">help</span>
                            <p class="confirmacion-editor-texto"></p>
                            <label class="confirmacion-editor-password">
                                Contraseña del administrador
                                <span class="control-password-editor">
                                    <input class="password-confirmacion-editor" type="password" autocomplete="current-password">
                                    <button class="alternar-password-editor" type="button" data-password-nombre="contraseña del administrador" aria-label="Mostrar contraseña del administrador" aria-pressed="false">
                                        <span class="material-symbols-outlined" aria-hidden="true">visibility</span>
                                    </button>
                                </span>
                                <span class="confirmacion-editor-password-error oculto">Ingresa la contraseña del administrador.</span>
                            </label>
                            <div class="confirmacion-editor-acciones">
                                <button class="cancelar-confirmacion-editor" type="button">No, volver</button>
                                <button class="aceptar-confirmacion-editor" type="button">Sí, confirmar</button>
                            </div>
                        </div>


                        <div class="panel-editor-usuario oculto">
                            <input
                                type="hidden"
                                autocomplete="username"
                                value="${escaparHtml(usuarioActual?.cedula || "")}"
                            >
                            <div class="panel-password-editor">
                                <div class="encabezado-password-editor">
                                    <span class="material-symbols-outlined" aria-hidden="true">key</span>
                                    <div>
                                        <h4>Cambiar contraseña</h4>
                                        <p>Ingresa la nueva contraseña para este usuario.</p>
                                    </div>
                                </div>
                                <label class="campo-autorizacion-usuario">
                                    Nueva contraseña
                                    <span class="control-password-editor">
                                        <input
                                            class="nueva-password"
                                            type="password"
                                            autocomplete="new-password"
                                        >
                                        <button class="alternar-password-editor" type="button" data-password-nombre="contraseña nueva" data-controla-confirmacion="true" aria-label="Mostrar contraseña nueva" aria-pressed="false">
                                            <span class="material-symbols-outlined" aria-hidden="true">visibility</span>
                                        </button>
                                    </span>
                                </label>
                                <label class="campo-autorizacion-usuario campo-confirmar-password">
                                    Confirmar nueva contraseña
                                    <input
                                        class="confirmar-password"
                                        type="password"
                                        autocomplete="new-password"
                                    >
                                </label>
                            </div>
                        </div>

                        ${usuario.es_super_admin && esUsuarioActual ? `
                            <div class="form-transferir-super-admin oculto">
                                <label>
                                    Delegar administrador superior a
                                    <select class="nuevo-super-admin" ${administradoresDisponibles.length ? "" : "disabled"}>
                                        <option value="" selected disabled>
                                            ${administradoresDisponibles.length
                                                ? "Seleccionar administrador"
                                                : "No hay otros administradores disponibles"}
                                        </option>
                                        ${administradoresDisponibles.map(administrador => `
                                            <option value="${escaparHtml(administrador.cedula)}">
                                                ${escaparHtml(administrador.nombre)} (${escaparHtml(administrador.cedula)})
                                            </option>
                                        `).join("")}
                                    </select>
                                </label>
                                <div class="acciones-transferir-super-admin">
                                    <button class="cancelar-transferencia" type="button">Cancelar</button>
                                    <button class="confirmar-transferencia" type="button" ${administradoresDisponibles.length ? "" : "disabled"}>
                                        Delegar y borrar mi cuenta
                                    </button>
                                </div>
                            </div>
                        ` : ""}

                    </div>

                `;

            }).join("");


        // ==========================================
        // EVENTOS DE CADA CARD
        // ==========================================

        contenedor
            .querySelectorAll(".usuario-card")
            .forEach(card => {
                const cedula =
                    card.dataset.cedula;


                const usuario =
                    usuarios.find(
                        u => String(u.cedula) === String(cedula)
                    );


                if (!usuario) return;

                const administradoresDisponibles = usuarios.filter(candidato =>
                    candidato.rol === "administrador" &&
                    candidato.activo &&
                    String(candidato.cedula) !== String(usuario.cedula)
                );

                const btnVerEdificios = card.querySelector(".btn-ver-edificios-usuario");
                const panelEdificios = card.querySelector(".usuario-edificios-popover");

                btnVerEdificios?.addEventListener("click", () => {
                    const debeAbrir = panelEdificios.classList.contains("oculto");

                    contenedor.querySelectorAll(".usuario-edificios-popover").forEach(panel => {
                        panel.classList.add("oculto");
                        panel.closest(".usuario-card")?.classList.remove("usuario-edificios-abiertos");
                    });
                    contenedor.querySelectorAll(".btn-ver-edificios-usuario").forEach(boton => {
                        boton.setAttribute("aria-expanded", "false");
                    });

                    if (debeAbrir) {
                        panelEdificios.classList.remove("oculto");
                        card.classList.add("usuario-edificios-abiertos");
                        btnVerEdificios.setAttribute("aria-expanded", "true");
                    }
                });

                const btnEditarUsuario = card.querySelector(".btn-editar-usuario");
                const btnPasswordUsuario = card.querySelector(".btn-password-usuario");
                const btnEliminarUsuario = card.querySelector(".btn-eliminar-usuario");
                const btnConfirmarEdicionUsuario = card.querySelector(".btn-confirmar-edicion-usuario");
                const iconoConfirmarEdicion = btnConfirmarEdicionUsuario.querySelector(".material-symbols-outlined");
                const btnCancelarEdicionUsuario = card.querySelector(".btn-cancelar-edicion-usuario");
                const panelEditorUsuario = card.querySelector(".panel-editor-usuario");
                const panelPasswordEditor = card.querySelector(".panel-password-editor");
                const inputEditarNombre = card.querySelector(".editar-nombre");
                const inputEditarTelefono = card.querySelector(".editar-telefono");
                const inputEditarEmail = card.querySelector(".editar-email");
                const selectEditarActivo = card.querySelector(".editar-activo");
                const nuevaPasswordInput = card.querySelector(".nueva-password");
                const confirmarPasswordInput = card.querySelector(".confirmar-password");
                const campoConfirmarPassword = card.querySelector(".campo-confirmar-password");
                const datosVisuales = card.querySelectorAll(".dato-visual");
                const camposEdicion = card.querySelectorAll(".campo-edicion-inline");
                const botonesAlternarPassword = card.querySelectorAll(".alternar-password-editor");
                const mensajeEditor = card.querySelector(".mensaje-editor-usuario");
                const iconoMensajeEditor = card.querySelector(".mensaje-editor-icono");
                const textoMensajeEditor = card.querySelector(".mensaje-editor-texto");
                const confirmacionEditor = card.querySelector(".confirmacion-editor-usuario");
                const iconoConfirmacionEditor = confirmacionEditor.querySelector(
                    ":scope > .material-symbols-outlined"
                );
                const textoConfirmacionEditor = card.querySelector(".confirmacion-editor-texto");
                const btnAceptarConfirmacionEditor = card.querySelector(".aceptar-confirmacion-editor");
                const btnCancelarConfirmacionEditor = card.querySelector(".cancelar-confirmacion-editor");
                const passwordConfirmacionEditor = card.querySelector(".password-confirmacion-editor");
                const errorPasswordConfirmacion = card.querySelector(".confirmacion-editor-password-error");
                const campoPasswordConfirmacion = card.querySelector(".confirmacion-editor-password");
                const accionesConfirmacionEditor = card.querySelector(".confirmacion-editor-acciones");
                const btnAlternarPasswordConfirmacion = card.querySelector(
                    ".confirmacion-editor-password .alternar-password-editor"
                );
                let fondoModalEditor = null;
                let marcadorCard = null;
                let resolverConfirmacionEditor = null;
                let modoEditorActivo = null;

                btnEliminarUsuario?.addEventListener("click", manejarEliminacionUsuario);

                const limpiarMensajeEditor = () => {
                    mensajeEditor.className = "mensaje-editor-usuario oculto";
                    textoMensajeEditor.textContent = "";
                };

                const mostrarMensajeEditor = (tipo, mensaje) => {
                    const iconos = {
                        error: "error",
                        advertencia: "warning",
                        exito: "check_circle",
                        info: "info"
                    };

                    mensajeEditor.className = `mensaje-editor-usuario mensaje-editor-${tipo}`;
                    iconoMensajeEditor.textContent = iconos[tipo] || iconos.info;
                    textoMensajeEditor.textContent = mensaje;
                    mensajeEditor.scrollIntoView({ behavior: "smooth", block: "nearest" });
                };

                const resolverConfirmacion = resultado => {
                    if (!resolverConfirmacionEditor) return;

                    if (resultado && !passwordConfirmacionEditor.value) {
                        passwordConfirmacionEditor.setAttribute("aria-invalid", "true");
                        errorPasswordConfirmacion.classList.remove("oculto");
                        passwordConfirmacionEditor.focus();
                        return;
                    }

                    const resolver = resolverConfirmacionEditor;
                    const passwordAdministrador = resultado
                        ? passwordConfirmacionEditor.value
                        : null;
                    resolverConfirmacionEditor = null;

                    if (resultado) {
                        passwordConfirmacionEditor.disabled = true;
                        btnAlternarPasswordConfirmacion.disabled = true;
                        btnAceptarConfirmacionEditor.disabled = true;
                        btnCancelarConfirmacionEditor.disabled = true;
                        btnAceptarConfirmacionEditor.textContent = "Guardando...";
                    } else {
                        confirmacionEditor.classList.add("oculto");
                        card.classList.remove("usuario-card-confirmando");
                        btnConfirmarEdicionUsuario.disabled = false;
                    }

                    resolver(passwordAdministrador);
                };

                const restaurarFormularioEditor = mensaje => {
                    confirmacionEditor.classList.add("oculto");
                    card.classList.remove("usuario-card-confirmando");
                    passwordConfirmacionEditor.disabled = false;
                    btnAlternarPasswordConfirmacion.disabled = false;
                    btnAceptarConfirmacionEditor.disabled = false;
                    btnCancelarConfirmacionEditor.disabled = false;
                    btnConfirmarEdicionUsuario.disabled = false;
                    iconoConfirmarEdicion.textContent = "check";
                    mostrarMensajeEditor("error", mensaje);
                };

                const mostrarExitoConfirmacion = mensaje => {
                    textoConfirmacionEditor.textContent = mensaje;
                    iconoConfirmacionEditor.textContent = "check_circle";
                    campoPasswordConfirmacion.classList.add("oculto");
                    accionesConfirmacionEditor.classList.add("oculto");
                    confirmacionEditor.classList.add("confirmacion-editor-exito");
                };

                const confirmarEnEditor = (mensaje, textoConfirmar) => {
                    resolverConfirmacion(false);
                    limpiarMensajeEditor();
                    textoConfirmacionEditor.textContent = mensaje;
                    btnAceptarConfirmacionEditor.textContent = textoConfirmar;
                    iconoConfirmacionEditor.textContent = "lock";
                    passwordConfirmacionEditor.value = "";
                    passwordConfirmacionEditor.type = "password";
                    passwordConfirmacionEditor.disabled = false;
                    passwordConfirmacionEditor.removeAttribute("aria-invalid");
                    errorPasswordConfirmacion.classList.add("oculto");
                    campoPasswordConfirmacion.classList.remove("oculto");
                    accionesConfirmacionEditor.classList.remove("oculto");
                    confirmacionEditor.classList.remove("confirmacion-editor-exito");
                    btnAlternarPasswordConfirmacion.disabled = false;
                    btnAceptarConfirmacionEditor.disabled = false;
                    btnCancelarConfirmacionEditor.disabled = false;
                    btnAlternarPasswordConfirmacion.setAttribute("aria-pressed", "false");
                    btnAlternarPasswordConfirmacion.setAttribute(
                        "aria-label",
                        "Mostrar contraseña del administrador"
                    );
                    btnAlternarPasswordConfirmacion.querySelector(
                        ".material-symbols-outlined"
                    ).textContent = "visibility";
                    confirmacionEditor.classList.remove("oculto");
                    card.classList.add("usuario-card-confirmando");
                    btnConfirmarEdicionUsuario.disabled = true;
                    passwordConfirmacionEditor.focus();

                    return new Promise(resolve => {
                        resolverConfirmacionEditor = resolve;
                    });
                };

                btnAceptarConfirmacionEditor.addEventListener("click", () => {
                    resolverConfirmacion(true);
                });

                btnCancelarConfirmacionEditor.addEventListener("click", () => {
                    resolverConfirmacion(false);
                });

                passwordConfirmacionEditor.addEventListener("input", () => {
                    passwordConfirmacionEditor.removeAttribute("aria-invalid");
                    errorPasswordConfirmacion.classList.add("oculto");
                });

                botonesAlternarPassword.forEach(boton => {
                    boton.addEventListener("click", () => {
                        const input = boton.previousElementSibling;
                        const mostrar = input.type === "password";
                        input.type = mostrar ? "text" : "password";
                        boton.setAttribute("aria-pressed", String(mostrar));
                        boton.setAttribute(
                            "aria-label",
                            `${mostrar ? "Ocultar" : "Mostrar"} ${boton.dataset.passwordNombre}`
                        );
                        boton.querySelector(".material-symbols-outlined").textContent =
                            mostrar ? "visibility_off" : "visibility";

                        if (boton.dataset.controlaConfirmacion === "true") {
                            campoConfirmarPassword.classList.toggle("oculto", mostrar);
                            if (mostrar) confirmarPasswordInput.value = "";
                        }

                        input.focus();
                    });
                });

                const manejarTeclaEditor = event => {
                    if (
                        event.key === "Escape" &&
                        !document.querySelector(".confirmacion-toast-container")
                    ) {
                        cambiarModoEdicion(false, true);
                    }
                };

                const abrirModalEditor = () => {
                    if (fondoModalEditor) return;

                    marcadorCard = document.createElement("span");
                    marcadorCard.hidden = true;
                    card.before(marcadorCard);

                    fondoModalEditor = document.createElement("div");
                    fondoModalEditor.className = "modal-editor-usuario";
                    fondoModalEditor.addEventListener("mousedown", event => {
                        if (event.target === fondoModalEditor) {
                            cambiarModoEdicion(false, true);
                        }
                    });

                    document.body.appendChild(fondoModalEditor);
                    fondoModalEditor.appendChild(card);
                    document.body.classList.add("editor-usuario-modal-abierto");
                    card.setAttribute("role", "dialog");
                    card.setAttribute("aria-modal", "true");
                    card.setAttribute("aria-label", `Editar usuario ${usuario.nombre}`);
                    document.addEventListener("keydown", manejarTeclaEditor);
                };

                const cerrarModalEditor = () => {
                    document.removeEventListener("keydown", manejarTeclaEditor);

                    if (marcadorCard?.parentNode) {
                        marcadorCard.replaceWith(card);
                    } else if (!contenedor.contains(card)) {
                        contenedor.appendChild(card);
                    }

                    fondoModalEditor?.remove();
                    fondoModalEditor = null;
                    marcadorCard = null;
                    document.body.classList.remove("editor-usuario-modal-abierto");
                    card.removeAttribute("role");
                    card.removeAttribute("aria-modal");
                    card.removeAttribute("aria-label");
                };

                const cambiarModoEdicion = (modo, restaurar = false) => {
                    const activo = modo === "datos" || modo === "password";
                    card.scrollTop = 0;

                    if (restaurar) {
                        inputEditarNombre.value = usuario.nombre || "";
                        inputEditarTelefono.value = usuario.telefono || "";
                        inputEditarEmail.value = usuario.email || "";
                        selectEditarActivo.value = usuario.activo ? "1" : "0";
                    }

                    modoEditorActivo = activo ? modo : null;
                    card.classList.toggle("usuario-card-editando", activo);
                    panelEditorUsuario.classList.toggle("oculto", !activo);
                    btnEditarUsuario.setAttribute("aria-expanded", String(modo === "datos"));
                    btnPasswordUsuario.setAttribute("aria-expanded", String(modo === "password"));
                    btnEditarUsuario.classList.toggle("oculto", activo);
                    btnPasswordUsuario.classList.toggle("oculto", activo);
                    btnConfirmarEdicionUsuario.classList.toggle("oculto", !activo);
                    btnCancelarEdicionUsuario.classList.toggle("oculto", !activo);
                    btnConfirmarEdicionUsuario.disabled = false;
                    iconoConfirmarEdicion.textContent = "check";

                    if (btnEliminarUsuario) {
                        btnEliminarUsuario.classList.toggle("oculto", activo);
                    }

                    if (activo) {
                        abrirModalEditor();
                        limpiarMensajeEditor();
                        confirmacionEditor.classList.add("oculto");
                        card.classList.toggle("usuario-card-datos", modo === "datos");
                        card.classList.toggle("usuario-card-password", modo === "password");
                        card.classList.remove("usuario-card-confirmando");
                        panelPasswordEditor.classList.toggle("oculto", modo !== "password");
                        datosVisuales.forEach(dato => dato.classList.toggle("oculto", modo === "datos"));
                        camposEdicion.forEach(campo => campo.classList.toggle("oculto", modo !== "datos"));

                        if (modo === "datos") {
                            inputEditarNombre.focus();
                        } else {
                            nuevaPasswordInput.focus();
                        }
                    } else {
                        card.classList.remove(
                            "usuario-card-datos",
                            "usuario-card-password",
                            "usuario-card-confirmando"
                        );
                        datosVisuales.forEach(dato => dato.classList.remove("oculto"));
                        camposEdicion.forEach(campo => campo.classList.add("oculto"));
                        nuevaPasswordInput.value = "";
                        confirmarPasswordInput.value = "";
                        campoConfirmarPassword.classList.remove("oculto");
                        resolverConfirmacion(false);
                        botonesAlternarPassword.forEach(boton => {
                            const input = boton.previousElementSibling;
                            input.type = "password";
                            boton.setAttribute("aria-pressed", "false");
                            boton.setAttribute("aria-label", `Mostrar ${boton.dataset.passwordNombre}`);
                            boton.querySelector(".material-symbols-outlined").textContent = "visibility";
                        });
                        limpiarMensajeEditor();
                        cerrarModalEditor();
                        requestAnimationFrame(igualarAlturaTarjetas);
                    }
                };

                inputEditarTelefono?.addEventListener("input", event => {
                    event.target.value = event.target.value.replace(/[^0-9]/g, "").slice(0, 9);
                });

                btnCancelarEdicionUsuario.addEventListener("click", () => {
                    cambiarModoEdicion(null, true);
                });

                btnEditarUsuario?.addEventListener("click", () => {
                    cambiarModoEdicion("datos", true);
                });

                btnPasswordUsuario?.addEventListener("click", () => {
                    cambiarModoEdicion("password", true);
                });

                btnConfirmarEdicionUsuario.addEventListener("click", async () => {
                    if (!modoEditorActivo) return;

                    limpiarMensajeEditor();

                    if (modoEditorActivo === "password") {
                        const nuevaPassword = nuevaPasswordInput.value;
                        const confirmarPassword = confirmarPasswordInput.value;
                        const requiereConfirmacion = nuevaPasswordInput.type === "password";

                        if (!nuevaPassword) {
                            mostrarMensajeEditor("advertencia", "Ingresa la nueva contraseña.");
                            return;
                        }

                        if (nuevaPassword.length < 8) {
                            mostrarMensajeEditor("advertencia", "La nueva contraseña debe tener al menos 8 caracteres.");
                            return;
                        }

                        if (requiereConfirmacion && !confirmarPassword) {
                            mostrarMensajeEditor("advertencia", "Confirma la nueva contraseña o presiona el ojo para verificarla visualmente.");
                            return;
                        }

                        if (requiereConfirmacion && nuevaPassword !== confirmarPassword) {
                            mostrarMensajeEditor("advertencia", "La nueva contraseña y su confirmación no coinciden.");
                            return;
                        }

                        const passwordActual = await confirmarEnEditor(
                            `¿Querés cambiar la contraseña de ${usuario.nombre}?`,
                            "Sí, cambiar"
                        );

                        if (passwordActual === null) return;

                        try {
                            btnConfirmarEdicionUsuario.disabled = true;
                            iconoConfirmarEdicion.textContent = "hourglass_top";
                            const response = await cambiarPasswordUsuario(
                                usuario.cedula,
                                nuevaPassword,
                                passwordActual
                            );
                            const data = await response.json().catch(() => ({}));

                            if (!response.ok) {
                                throw new Error(data.errors?.password_actual?.[0] || data.message || "No se pudo cambiar la contraseña.");
                            }

                            mostrarExitoConfirmacion(data.message || "Contraseña actualizada correctamente.");
                            await new Promise(resolve => setTimeout(resolve, 650));
                            cambiarModoEdicion(null, true);
                        } catch (error) {
                            restaurarFormularioEditor(error.message || "No se pudo cambiar la contraseña.");
                        } finally {
                            btnConfirmarEdicionUsuario.disabled = false;
                            iconoConfirmarEdicion.textContent = "check";
                        }
                        return;
                    }

                    const nombre = inputEditarNombre.value.trim();
                    const telefono = inputEditarTelefono.value.trim();
                    const email = inputEditarEmail.value.trim();
                    const activo = selectEditarActivo.value === "1";

                    if (!nombre) {
                        mostrarMensajeEditor("advertencia", "El nombre es obligatorio.");
                        return;
                    }

                    if (telefono !== "" && !/^09\d{7}$/.test(telefono)) {
                        mostrarMensajeEditor("advertencia", "El teléfono debe tener 9 números y comenzar con 09.");
                        return;
                    }

                    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        mostrarMensajeEditor("advertencia", "Ingresa un correo electrónico válido.");
                        return;
                    }

                    const passwordActual = await confirmarEnEditor(
                        `¿Querés guardar los cambios de ${usuario.nombre}?`,
                        "Sí, guardar"
                    );

                    if (passwordActual === null) return;

                    const datos = {
                        nombre,
                        telefono,
                        email,
                        activo,
                        password_actual: passwordActual
                    };

                    try {
                        btnConfirmarEdicionUsuario.disabled = true;
                        iconoConfirmarEdicion.textContent = "hourglass_top";

                        const responseDatos = await actualizarUsuario(usuario.cedula, datos);
                        const dataDatos = await responseDatos.json().catch(() => ({}));

                        if (!responseDatos.ok) {
                            throw new Error(dataDatos.errors?.password_actual?.[0] || dataDatos.message || "No se pudo actualizar el usuario.");
                        }

                        const usuarioActualizado = dataDatos.usuario;

                        const indice = usuarios.findIndex(item =>
                            String(item.cedula) === String(usuario.cedula)
                        );

                        if (indice !== -1) {
                            usuarios[indice] = usuarioActualizado;
                        }

                        if (String(usuarioActual?.cedula) === String(usuario.cedula)) {
                            usuarioActual = usuarioActualizado;
                        }

                        mostrarExitoConfirmacion("Usuario actualizado correctamente.");
                        await new Promise(resolve => setTimeout(resolve, 650));
                        cambiarModoEdicion(false);
                        renderLista(inputBuscar.value.trim(), filtroRolSelect.value);
                    } catch (error) {
                        console.error("Error al actualizar usuario:", error);
                        restaurarFormularioEditor(error.message || "No se pudo actualizar el usuario.");
                    } finally {
                        btnConfirmarEdicionUsuario.disabled = false;
                        iconoConfirmarEdicion.textContent = "check";
                    }
                });

                const formTransferencia = card.querySelector(".form-transferir-super-admin");
                const btnCancelarTransferencia = card.querySelector(".cancelar-transferencia");
                const btnConfirmarTransferencia = card.querySelector(".confirmar-transferencia");
                const selectNuevoSuperAdmin = card.querySelector(".nuevo-super-admin");

                function solicitarPasswordEliminacion(mensaje, opciones = {}) {
                    return new Promise(resolve => {
                        const administradoresSucesores = Array.isArray(opciones.administradores)
                            ? opciones.administradores
                            : [];
                        const fondo = document.createElement("div");
                        fondo.className = "modal-eliminar-usuario";
                        fondo.innerHTML = `
                            <section class="dialogo-eliminar-usuario" role="alertdialog" aria-modal="true" aria-labelledby="titulo-eliminar-usuario">
                                <div class="icono-eliminar-usuario" aria-hidden="true">
                                    <span class="material-symbols-outlined">warning</span>
                                </div>
                                <div class="contenido-eliminar-usuario">
                                    <h3 id="titulo-eliminar-usuario">${escaparHtml(opciones.titulo || "Eliminar usuario")}</h3>
                                    <p>${escaparHtml(mensaje)}</p>
                                </div>
                                ${administradoresSucesores.length ? `
                                    <label class="sucesor-eliminar-usuario">
                                        Delegar administrador superior a
                                        <select>
                                            <option value="" ${administradoresSucesores.length === 1 ? "" : "selected"} disabled>Selecciona un administrador</option>
                                            ${administradoresSucesores.map((administrador, indice) => `
                                                <option value="${escaparHtml(administrador.cedula)}" ${administradoresSucesores.length === 1 && indice === 0 ? "selected" : ""}>
                                                    ${escaparHtml(administrador.nombre)} (${escaparHtml(administrador.cedula)})
                                                </option>
                                            `).join("")}
                                        </select>
                                        <span class="error-sucesor-eliminar oculto">Selecciona el nuevo administrador superior.</span>
                                    </label>
                                ` : ""}
                                <label class="password-eliminar-usuario">
                                    Contraseña del administrador actual
                                    <span class="control-password-eliminar">
                                        <input type="password" autocomplete="current-password">
                                        <button type="button" aria-label="Mostrar contraseña" aria-pressed="false">
                                            <span class="material-symbols-outlined" aria-hidden="true">visibility</span>
                                        </button>
                                    </span>
                                    <span class="error-password-eliminar oculto">Ingresa la contraseña del administrador.</span>
                                </label>
                                <div class="acciones-eliminar-usuario">
                                    <button class="cancelar-eliminacion-usuario" type="button">${escaparHtml(opciones.cancelar || "No, volver")}</button>
                                    <button class="confirmar-eliminacion-usuario" type="button">${escaparHtml(opciones.confirmar || "Sí, eliminar")}</button>
                                </div>
                            </section>
                        `;

                        const input = fondo.querySelector(".password-eliminar-usuario input");
                        const error = fondo.querySelector(".error-password-eliminar");
                        const selectorSucesor = fondo.querySelector(".sucesor-eliminar-usuario select");
                        const errorSucesor = fondo.querySelector(".error-sucesor-eliminar");
                        const alternar = fondo.querySelector(".control-password-eliminar button");
                        const cancelar = fondo.querySelector(".cancelar-eliminacion-usuario");
                        const confirmar = fondo.querySelector(".confirmar-eliminacion-usuario");

                        const cerrar = resultado => {
                            document.removeEventListener("keydown", manejarEscape);
                            fondo.remove();
                            document.body.classList.remove("modal-eliminar-usuario-abierto");
                            resolve(resultado);
                        };

                        const aceptar = () => {
                            if (selectorSucesor && !selectorSucesor.value) {
                                selectorSucesor.setAttribute("aria-invalid", "true");
                                errorSucesor.classList.remove("oculto");
                                selectorSucesor.focus();
                                return;
                            }

                            if (!input.value) {
                                input.setAttribute("aria-invalid", "true");
                                error.classList.remove("oculto");
                                input.focus();
                                return;
                            }

                            cerrar(selectorSucesor
                                ? {
                                    passwordActual: input.value,
                                    nuevoSuperAdminCedula: selectorSucesor.value
                                }
                                : input.value
                            );
                        };

                        const manejarEscape = event => {
                            if (event.key === "Escape") cerrar(null);
                        };

                        alternar.addEventListener("click", () => {
                            const mostrar = input.type === "password";
                            input.type = mostrar ? "text" : "password";
                            alternar.setAttribute("aria-pressed", String(mostrar));
                            alternar.setAttribute("aria-label", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
                            alternar.querySelector(".material-symbols-outlined").textContent =
                                mostrar ? "visibility_off" : "visibility";
                            input.focus();
                        });

                        input.addEventListener("input", () => {
                            input.removeAttribute("aria-invalid");
                            error.classList.add("oculto");
                        });
                        selectorSucesor?.addEventListener("change", () => {
                            selectorSucesor.removeAttribute("aria-invalid");
                            errorSucesor.classList.add("oculto");
                        });
                        input.addEventListener("keydown", event => {
                            if (event.key === "Enter") aceptar();
                        });
                        cancelar.addEventListener("click", () => cerrar(null));
                        confirmar.addEventListener("click", aceptar);
                        fondo.addEventListener("mousedown", event => {
                            if (event.target === fondo) cerrar(null);
                        });
                        document.addEventListener("keydown", manejarEscape);
                        document.body.appendChild(fondo);
                        document.body.classList.add("modal-eliminar-usuario-abierto");
                        input.focus();
                    });
                }

                async function ejecutarEliminacion(nuevoSuperAdminCedula, passwordActual) {
                    try {
                        if (btnEliminarUsuario) btnEliminarUsuario.disabled = true;
                        if (btnConfirmarTransferencia) btnConfirmarTransferencia.disabled = true;

                        const response = await eliminarUsuario(
                            usuario.cedula,
                            passwordActual,
                            nuevoSuperAdminCedula
                        );
                        const data = await response.json().catch(() => ({}));

                        if (!response.ok) {
                            throw new Error(
                                data.errors?.password_actual?.[0] ||
                                data.message ||
                                "No se pudo eliminar el usuario."
                            );
                        }

                        notify.success(data.message || "Usuario eliminado correctamente.");

                        if (data.sesion_cerrada) {
                            setTimeout(() => window.location.replace("./index.html"), 900);
                            return;
                        }

                        usuarios = usuarios.filter(item =>
                            String(item.cedula) !== String(usuario.cedula)
                        );
                        renderLista(inputBuscar.value.trim(), filtroRolSelect.value);
                    } catch (error) {
                        console.error("Error al eliminar usuario:", error);
                        notify.error(error.message || "No se pudo eliminar el usuario.");
                    } finally {
                        if (btnEliminarUsuario) btnEliminarUsuario.disabled = false;
                        if (btnConfirmarTransferencia) btnConfirmarTransferencia.disabled = false;
                    }
                }

                async function manejarEliminacionUsuario(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    if (usuario.es_super_admin) {
                        if (!administradoresDisponibles.length) {
                            notify.warning("Primero crea otro administrador para poder delegarle el permiso superior.");
                            return;
                        }

                        const autorizacion = await solicitarPasswordEliminacion(
                            "Para eliminar tu cuenta debes delegar el permiso superior. Esta acción no se puede revertir.",
                            {
                                titulo: "Delegar y eliminar administrador",
                                confirmar: "Sí, delegar y eliminar",
                                cancelar: "No, volver",
                                administradores: administradoresDisponibles
                            }
                        );

                        if (autorizacion !== null) {
                            await ejecutarEliminacion(
                                autorizacion.nuevoSuperAdminCedula,
                                autorizacion.passwordActual
                            );
                        }
                        return;
                    }

                    const passwordActual = await solicitarPasswordEliminacion(
                        `¿Querés eliminar al usuario ${usuario.nombre}? Esta acción no se puede revertir.`,
                        {
                            titulo: "Eliminar usuario definitivamente",
                            confirmar: "Sí, eliminar",
                            cancelar: "No, volver"
                        }
                    );

                    if (passwordActual !== null) {
                        await ejecutarEliminacion(null, passwordActual);
                    }
                }

                btnCancelarTransferencia?.addEventListener("click", () => {
                    formTransferencia.classList.add("oculto");
                    selectNuevoSuperAdmin.value = "";
                });

                btnConfirmarTransferencia?.addEventListener("click", async () => {
                    const nuevoSuperAdminCedula = selectNuevoSuperAdmin.value;

                    if (!nuevoSuperAdminCedula) {
                        notify.warning("Selecciona el nuevo administrador superior.");
                        return;
                    }

                    const passwordActual = await solicitarPasswordEliminacion(
                        "¿Querés delegar el permiso superior y eliminar tu cuenta? Esta acción no se puede revertir.",
                        {
                            titulo: "Delegar administración superior",
                            confirmar: "Sí, delegar y eliminar",
                            cancelar: "No, volver"
                        }
                    );

                    if (passwordActual !== null) {
                        await ejecutarEliminacion(nuevoSuperAdminCedula, passwordActual);
                    }
                });

            });

        requestAnimationFrame(igualarAlturaTarjetas);
        document.fonts?.ready.then(() => {
            if (contenedor.isConnected) {
                igualarAlturaTarjetas();
            }
        });

    }


    // ==========================================
    // PRIMER RENDER
    // ==========================================

    renderLista(filtro);


    // ==========================================
    // BUSCAR MIENTRAS ESCRIBE
    // ==========================================

    inputBuscar.addEventListener(
        "input",
        () => {

            renderLista(
                inputBuscar.value.trim(),
                filtroRolSelect.value
            );

        }
    );


    // ==========================================
    // BOTÓN BUSCAR
    // ==========================================

    btnBuscar.addEventListener(
        "click",
        () => {

            renderLista(
                inputBuscar.value.trim(),
                filtroRolSelect.value
            );

        }
    );


    // ==========================================
    // ENTER PARA BUSCAR
    // ==========================================

    inputBuscar.addEventListener(
        "keydown",
        (e) => {

            if (e.key === "Enter") {

                renderLista(
                    inputBuscar.value.trim(),
                    filtroRolSelect.value
                );

            }

        }
    );

    filtroRolSelect.addEventListener("change", () => {
        renderLista(inputBuscar.value.trim(), filtroRolSelect.value);
    });


    }
/* ==========================================================
   ESTADÍSTICAS DEL ADMINISTRADOR
   ========================================================== */

async function vistaEstadisticas() {
    detenerActualizacionEstadisticas();
    const generacion = generacionEstadisticas;
    filtro_container.innerHTML = "";
    section.style.display = "grid";
    section.style.gridTemplateColumns = "minmax(0, 1fr)";

    section.innerHTML = `
        <div class="estadisticas-admin">
            <header class="estadisticas-header">
                <div>
                    <h2>Estadísticas de gestión</h2>
                </div>

                <button type="button" class="btn-actualizar-estadisticas">
                    <span class="material-symbols-outlined">refresh</span>
                    Actualizar
                </button>
            </header>

            <div class="estadisticas-cargando">
                <span class="material-symbols-outlined">monitoring</span>
                <p>Cargando estadísticas...</p>
            </div>
        </div>
    `;

    const contenedor = section.querySelector(".estadisticas-admin");
    let cargando = false;
    let inicializada = false;
    const vistaActiva = () => generacion === generacionEstadisticas
        && estadisticasbtn?.classList.contains("active")
        && section.querySelector(".estadisticas-admin") === contenedor;

    if (typeof IntersectionObserver === "function"
        && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        contenedor.classList.add("animacion-por-scroll");
        const pendientes = new WeakSet();
        let proximoInicio = 0;
        const observador = new IntersectionObserver(entradas => {
            entradas.filter(entrada => entrada.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top
                    || a.boundingClientRect.left - b.boundingClientRect.left)
                .forEach(entrada => {
                    const widget = entrada.target;
                    if (pendientes.has(widget) || widget.classList.contains("stats-en-vista")) return;
                    pendientes.add(widget);
                    const ahora = performance.now();
                    const demora = Math.max(0, proximoInicio - ahora);
                    proximoInicio = Math.max(proximoInicio, ahora) + 140;
                    window.setTimeout(() => {
                        pendientes.delete(widget);
                        if (!vistaActiva() || !widget.isConnected) return;
                        const limites = widget.getBoundingClientRect();
                        const zona = section.getBoundingClientRect();
                        if (limites.bottom <= zona.top || limites.top >= zona.bottom) return;
                        widget.classList.add("stats-en-vista");
                        observador.unobserve(widget);
                    }, demora);
                });
        }, { root: section, rootMargin: "0px 0px -4% 0px", threshold: .08 });
        observadorWidgetsEstadisticas = observador;
    }

    const cargar = async ({ manual = false } = {}) => {
        if (!vistaActiva() || cargando) return;
        cargando = true;
        const boton = contenedor.querySelector(
            ".btn-actualizar-estadisticas"
        );
        if (boton) boton.disabled = true;

        try {
            const response = await obtenerReclamosAdministrador();
            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                window.location.replace("./index.html");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudieron cargar los reclamos."
                );
            }

            if (!vistaActiva()) return;

            reclamos = Array.isArray(data.reclamos) ? data.reclamos : [];
            const filtro = contenedor.querySelector("#filtro-edificio-estadisticas");
            const huboCambios = renderEstadisticasAdmin(
                reclamos, filtro?.value || "todos", inicializada
            );
            if (inicializada && huboCambios) {
                notify.success("Estadísticas actualizadas.");
            } else if (manual && inicializada) {
                notify.success("Las estadísticas están al día.");
            }
            inicializada = true;
        } catch (error) {
            console.error("Error al cargar estadísticas:", error);
            if (!vistaActiva()) return;
            const carga = contenedor.querySelector(".estadisticas-cargando");
            if (carga) {
                carga.innerHTML = `
                    <span class="material-symbols-outlined">error</span>
                    <p>${escaparHtml(error.message)}</p>
                    <button type="button" class="btn-reintentar-estadisticas">
                        Reintentar
                    </button>
                `;
            } else if (manual) {
                notify.error(error.message || "No se pudieron actualizar las estadísticas.");
            }
        } finally {
            if (boton?.isConnected) boton.disabled = false;
            cargando = false;
        }
    };

    contenedor.addEventListener("click", event => {
        if (event.target.closest(".btn-actualizar-estadisticas")) {
            cargar({ manual: true });
        } else if (event.target.closest(".btn-reintentar-estadisticas")) {
            cargar();
        }
    });
    contenedor.addEventListener("change", event => {
        if (event.target.matches("#filtro-edificio-estadisticas")) {
            renderEstadisticasAdmin(reclamos, event.target.value, true);
        }
    });

    const mostrarPuntoEvolucion = punto => {
        const lienzo = punto.closest(".grafico-linea-lienzo");
        const svg = lienzo?.querySelector(".grafico-linea");
        const tooltip = lienzo?.querySelector(".grafico-linea-tooltip");
        if (!svg || !tooltip) return;
        const dimensiones = svg.getBoundingClientRect();
        const cantidad = Number(punto.dataset.cantidad);
        tooltip.textContent = `${punto.dataset.mes}: ${cantidad} ${cantidad === 1 ? "reclamo" : "reclamos"}`;
        tooltip.style.left = `${Math.max(70, Math.min(dimensiones.width - 70,
            Number(punto.dataset.x) / 720 * dimensiones.width))}px`;
        tooltip.style.top = `${Number(punto.dataset.y) / 224 * dimensiones.height
            + (Number(punto.dataset.y) < 65 ? 12 : -10)}px`;
        tooltip.classList.toggle("debajo", Number(punto.dataset.y) < 65);
        tooltip.hidden = false;
        punto.classList.add("activa");
    };
    const ocultarPuntoEvolucion = punto => {
        punto.classList.remove("activa");
        const tooltip = punto.closest(".grafico-linea-lienzo")
            ?.querySelector(".grafico-linea-tooltip");
        if (tooltip) tooltip.hidden = true;
    };

    const mostrarEstado = (elemento, event = null) => {
        const grafico = elemento.closest(".grafico-sectores");
        if (!grafico) return;
        const indice = elemento.dataset.indice;
        const porcion = [...grafico.querySelectorAll(".grafico-sectores-porcion")]
            .find(item => item.dataset.indice === indice);
        const leyenda = [...grafico.querySelectorAll(".grafico-sectores-leyenda-item")]
            .find(item => item.dataset.indice === indice);
        if (!porcion || !leyenda) return;

        grafico.querySelectorAll(".grafico-sectores-porcion, .grafico-sectores-leyenda-item")
            .forEach(item => item.classList.toggle("activa", item === porcion || item === leyenda));

        const visual = grafico.querySelector(".grafico-sectores-visual");
        const svg = visual.querySelector("svg");
        const color = leyenda.querySelector(".grafico-sectores-color");
        const conector = grafico.querySelector(".grafico-sectores-conector");
        const linea = conector.querySelector("line");
        const extremo = conector.querySelector("circle");
        const limites = grafico.getBoundingClientRect();
        const limitesSvg = svg.getBoundingClientRect();
        const limitesColor = color.getBoundingClientRect();
        const x1 = limitesSvg.left - limites.left + Number(porcion.dataset.centroX) / 300 * limitesSvg.width;
        const y1 = limitesSvg.top - limites.top + Number(porcion.dataset.centroY) / 300 * limitesSvg.height;
        const x2 = limitesColor.left - limites.left + limitesColor.width / 2;
        const y2 = limitesColor.top - limites.top + limitesColor.height / 2;
        linea.setAttribute("x1", x1);
        linea.setAttribute("y1", y1);
        linea.setAttribute("x2", x2);
        linea.setAttribute("y2", y2);
        extremo.setAttribute("cx", x2);
        extremo.setAttribute("cy", y2);
        conector.removeAttribute("hidden");

        const tooltip = visual.querySelector(".grafico-sectores-tooltip");
        if (elemento !== porcion) {
            tooltip.hidden = true;
            return;
        }
        tooltip.textContent = `${porcion.dataset.nombre}: ${porcion.dataset.cantidad} reclamos`;
        const limitesVisual = visual.getBoundingClientRect();
        tooltip.style.left = event
            ? `${Math.max(62, Math.min(limitesVisual.width - 62, event.clientX - limitesVisual.left))}px`
            : "50%";
        tooltip.style.top = event
            ? `${Math.max(20, event.clientY - limitesVisual.top - 8)}px`
            : "46%";
        tooltip.hidden = false;
    };
    const ocultarEstado = elemento => {
        const grafico = elemento.closest(".grafico-sectores");
        if (!grafico) return;
        grafico.querySelectorAll(".grafico-sectores-porcion, .grafico-sectores-leyenda-item")
            .forEach(item => item.classList.remove("activa"));
        grafico.querySelector(".grafico-sectores-conector").setAttribute("hidden", "");
        grafico.querySelector(".grafico-sectores-tooltip").hidden = true;
    };

    const activarGrafico = (event, conCursor) => {
        const punto = event.target.closest?.(".grafico-linea-punto");
        if (punto) mostrarPuntoEvolucion(punto);
        const estado = event.target.closest?.(
            ".grafico-sectores-porcion, .grafico-sectores-leyenda-item"
        );
        if (estado) mostrarEstado(estado, conCursor ? event : null);
    };
    contenedor.addEventListener("pointerover", event => activarGrafico(event, true));
    contenedor.addEventListener("pointermove", event => activarGrafico(event, true));
    contenedor.addEventListener("focusin", event => {
        if (event.target.matches?.(":focus-visible")) activarGrafico(event, false);
    });
    const desactivarGrafico = event => {
        const punto = event.target.closest?.(".grafico-linea-punto");
        if (punto && !punto.contains(event.relatedTarget)) ocultarPuntoEvolucion(punto);
        const estado = event.target.closest?.(
            ".grafico-sectores-porcion, .grafico-sectores-leyenda-item"
        );
        if (estado && !estado.contains(event.relatedTarget)) ocultarEstado(estado);
    };
    contenedor.addEventListener("pointerout", desactivarGrafico);
    contenedor.addEventListener("focusout", desactivarGrafico);

    await cargar();
    if (vistaActiva()) {
        intervaloEstadisticas = window.setInterval(() => {
            if (!document.hidden) cargar();
        }, 60000);
    }
}

// Convierte un valor a número sin considerar null como un costo real.
function numeroEstadistica(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return null;
    }

    const numero = Number(valor);
    return Number.isFinite(numero) && numero >= 0 ? numero : null;
}

function monedaEstadistica(valor) {
    return new Intl.NumberFormat("es-UY", {
        style: "currency",
        currency: "UYU",
        maximumFractionDigits: 2
    }).format(valor);
}

function porcentajeEstadistica(valor, total) {
    return total > 0 ? Math.round((valor / total) * 100) : 0;
}

function contarPorEstadistica(lista, obtenerClave) {
    const resultado = new Map();

    lista.forEach(item => {
        const clave = obtenerClave(item) || "Sin clasificar";
        resultado.set(clave, (resultado.get(clave) || 0) + 1);
    });

    return [...resultado.entries()]
        .map(([nombre, cantidad]) => ({ nombre, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad);
}

const coloresSectoresEstadisticas = ["#377eb3", "#5a9cc6", "#8dbdd8", "#b7d3e6"];

function renderAnilloEstadistica(icono, porcentaje = 100, demora = 0) {
    const progreso = Math.max(0, Math.min(100, Number(porcentaje) || 0));
    return `<span class="estadistica-kpi-anillo" aria-hidden="true">
        <svg viewBox="0 0 64 64" focusable="false">
            <circle class="estadistica-kpi-anillo-pista" cx="32" cy="32" r="25" />
            <circle class="estadistica-kpi-anillo-valor" cx="32" cy="32" r="25"
                    pathLength="100" stroke-dasharray="${progreso} 100"
                    style="--anillo-meta:${progreso};--anillo-demora:${demora}ms" />
        </svg>
        <span class="material-symbols-outlined">${icono}</span>
    </span>`;
}

function renderGraficoSectores(
    datos,
    formatearValor = valor => String(valor),
    colores = coloresSectoresEstadisticas
) {
    const partes = datos.filter(item => Number.isFinite(item.cantidad) && item.cantidad >= 0);
    const sectoresConDatos = partes.map((item, indice) => ({ ...item, indice }))
        .filter(item => item.cantidad > 0);
    const total = partes.reduce((suma, item) => suma + item.cantidad, 0);

    if (!total) {
        return '<p class="estadistica-vacia">No hay valores positivos para representar.</p>';
    }

    let angulo = 0;
    const sectores = sectoresConDatos.map(item => {
        const inicio = angulo;
        const barrido = (item.cantidad / total) * 360;
        angulo += barrido;
        const color = colores[item.indice % colores.length];
        const centroX = 150;
        const centroY = 150;
        const punto = (grados, radio) => {
            const rad = (grados - 90) * Math.PI / 180;
            return [centroX + Math.cos(rad) * radio, centroY + Math.sin(rad) * radio];
        };
        const separacion = Math.min(.7, barrido / 8);
        const [xInicio, yInicio] = punto(inicio + separacion, 105);
        const [xFin, yFin] = punto(inicio + barrido - separacion, 105);
        const [xCentro, yCentro] = punto(inicio + barrido / 2, 107);
        const camino = sectoresConDatos.length === 1
            ? `<circle cx="150" cy="150" r="105" fill="${color}" />`
            : `<path d="M ${centroX} ${centroY} L ${xInicio} ${yInicio} A 105 105 0 ${barrido - separacion * 2 > 180 ? 1 : 0} 1 ${xFin} ${yFin} Z" fill="${color}" />`;
        return `<g class="grafico-sectores-porcion" tabindex="0"
            style="--sector-demora:${item.indice * 110}ms"
            role="img" aria-label="${escaparHtml(item.nombre)}: ${escaparHtml(formatearValor(item.cantidad))} reclamos"
            data-indice="${item.indice}" data-centro-x="${xCentro}" data-centro-y="${yCentro}"
            data-nombre="${escaparHtml(item.nombre)}" data-cantidad="${item.cantidad}">
            ${camino}
        </g>`;
    }).join("");

    const leyenda = partes.map((item, indice) => {
        const color = colores[indice % colores.length];
        const porcentaje = new Intl.NumberFormat("es-UY", {
            maximumFractionDigits: 1
        }).format((item.cantidad / total) * 100);

        return `<li class="grafico-sectores-leyenda-item" data-indice="${indice}"
            ${item.cantidad > 0 ? 'tabindex="0"' : ""}>
            <span class="grafico-sectores-color" style="background:${color}" aria-hidden="true"></span>
            <span class="grafico-sectores-nombre">${escaparHtml(item.nombre)}
                <small>${porcentaje}% de los datos mostrados</small>
            </span>
            <strong>${escaparHtml(formatearValor(item.cantidad))}</strong>
        </li>`;
    }).join("");

    return `<div class="grafico-sectores">
        <div class="grafico-sectores-visual">
            <svg viewBox="0 0 300 300" aria-label="Distribución de reclamos por estado">
                ${sectores}
                <circle cx="150" cy="150" r="61" class="grafico-sectores-centro" />
            </svg>
            <span class="grafico-sectores-tooltip" hidden></span>
        </div>
        <ul class="grafico-sectores-leyenda">${leyenda}</ul>
        <svg class="grafico-sectores-conector" aria-hidden="true" hidden>
            <line />
            <circle r="3" />
        </svg>
    </div>`;
}

function renderGraficoBarras(datos) {
    if (!datos.length) {
        return '<p class="estadistica-vacia">Todavía no hay reclamos para mostrar.</p>';
    }

    const maximo = Math.max(...datos.map(item => item.cantidad));
    return `<div class="grafico-barras">
        ${datos.map((item, indice) => `
            <div class="grafico-barras-fila">
                <div class="grafico-barras-datos">
                    <span>${escaparHtml(item.nombre)}</span>
                    <strong>${item.cantidad}</strong>
                </div>
                <div class="grafico-barras-pista" aria-hidden="true">
                    <span style="width:${maximo ? item.cantidad / maximo * 100 : 0}%;--barra-demora:${indice * 85}ms"></span>
                </div>
            </div>
        `).join("")}
    </div>`;
}

function renderGraficoLineaMensual(lista) {
    const fechas = lista.map(item => new Date(item.created_at))
        .filter(fecha => !Number.isNaN(fecha.getTime()));

    if (!fechas.length) {
        return '<p class="estadistica-vacia">No hay fechas de creación para mostrar la evolución.</p>';
    }

    const ultima = fechas.reduce((mayor, fecha) => fecha > mayor ? fecha : mayor);
    const inicio = new Date(ultima.getFullYear(), ultima.getMonth() - 5, 1);
    const claveMes = fecha => `${fecha.getFullYear()}-${fecha.getMonth()}`;
    const cantidadPorMes = new Map();

    fechas.forEach(fecha => {
        const clave = claveMes(fecha);
        cantidadPorMes.set(clave, (cantidadPorMes.get(clave) || 0) + 1);
    });

    const meses = Array.from({ length: 6 }, (_, indice) => {
        const fecha = new Date(inicio.getFullYear(), inicio.getMonth() + indice, 1);
        return {
            nombre: new Intl.DateTimeFormat("es-UY", {
                month: "short", year: "2-digit"
            }).format(fecha).replace(".", ""),
            cantidad: cantidadPorMes.get(claveMes(fecha)) || 0
        };
    });

    const maximo = Math.max(3, Math.ceil(Math.max(...meses.map(mes => mes.cantidad)) / 3) * 3);
    const puntos = meses.map((mes, indice) => ({
        ...mes,
        x: 56 + indice * 124,
        y: 174 - mes.cantidad / maximo * 144
    }));
    const cuadricula = Array.from({ length: 4 }, (_, indice) => {
        const y = 30 + indice * 48;
        return `<line x1="56" y1="${y}" x2="676" y2="${y}" />
            <text x="43" y="${y + 4}" text-anchor="end">${maximo - indice * maximo / 3}</text>`;
    }).join("");

    return `<div class="grafico-linea-scroll">
        <div class="grafico-linea-lienzo">
            <svg class="grafico-linea" viewBox="0 0 720 224" role="img"
                 aria-label="Reclamos recibidos por mes: ${puntos.map(punto => `${punto.nombre}, ${punto.cantidad}`).join("; ")}">
                <g class="grafico-linea-cuadricula">${cuadricula}</g>
                <polyline points="${puntos.map(punto => `${punto.x},${punto.y}`).join(" ")}" />
                ${puntos.map((punto, indice) => `<g class="grafico-linea-punto" tabindex="0"
                    role="img" aria-label="${punto.nombre}: ${punto.cantidad} reclamos"
                    data-mes="${punto.nombre}" data-cantidad="${punto.cantidad}"
                    data-x="${punto.x}" data-y="${punto.y}">
                    <circle class="grafico-linea-punto-visible" cx="${punto.x}" cy="${punto.y}" r="5"
                            style="--punto-demora:${240 + indice * 115}ms" />
                    <circle class="grafico-linea-punto-hit" cx="${punto.x}" cy="${punto.y}" r="18" />
                </g>`).join("")}
                ${puntos.map(punto => `<text x="${punto.x}" y="209" text-anchor="middle">${punto.nombre}</text>`).join("")}
            </svg>
            <span class="grafico-linea-tooltip" hidden></span>
        </div>
    </div>`;
}

function renderProblemasPorEdificio(detalle) {
    const conReclamos = detalle.filter(item => item.cantidad > 0);
    if (!conReclamos.length) {
        return '<p class="estadistica-vacia">Todavía no hay reclamos por edificio para comparar.</p>';
    }

    const maximo = Math.max(...conReclamos.map(item => item.cantidad));
    const ancho = Math.max(560, conReclamos.length * 76);
    const columnas = conReclamos.map((item, indice) => {
        const proporcion = item.cantidadTipoPrincipal / item.cantidad * 100;
        const numero = String(indice + 1).padStart(2, "0");

        return `<div class="problemas-columna"
                     title="${escaparHtml(item.edificio.nombre)}: ${item.cantidadTipoPrincipal} de ${item.cantidad} reclamos por ${escaparHtml(item.tipoPrincipal)}">
            <div class="problemas-columna-barra" style="height:${item.cantidad / maximo * 100}%;--columna-demora:${indice * 100}ms">
                <span class="problemas-columna-principal" style="height:${proporcion}%"></span>
            </div>
            <span class="problemas-columna-indice">${numero}</span>
        </div>`;
    }).join("");

    const resumen = conReclamos.map((item, indice) => `
        <li class="problemas-resumen-item">
            <span class="problemas-resumen-indice">${String(indice + 1).padStart(2, "0")}</span>
            <div class="problemas-resumen-edificio">
                <strong>${escaparHtml(item.edificio.nombre)}</strong>
                <span>${escaparHtml(item.tipoPrincipal)}</span>
            </div>
            <div class="problemas-resumen-cantidad">
                <strong>${item.cantidadTipoPrincipal} de ${item.cantidad}</strong>
                <span>reclamos</span>
            </div>
        </li>
    `).join("");

    return `<div class="problemas-por-edificio">
        <div class="problemas-leyenda">
            <span><i class="problemas-leyenda-principal" aria-hidden="true"></i>Problema principal</span>
            <span><i class="problemas-leyenda-otros" aria-hidden="true"></i>Otros reclamos</span>
        </div>
        <div class="problemas-grafico-scroll">
            <div class="problemas-grafico" style="width:${ancho}px;--columnas:${conReclamos.length}"
                 aria-hidden="true">
                <div class="problemas-eje">
                    <span>${maximo}</span>
                    <span>${Math.round(maximo / 2)}</span>
                    <span>0</span>
                </div>
                <div class="problemas-columnas">${columnas}</div>
            </div>
        </div>
        <div class="problemas-resumen">
            <h4>Resumen por edificio</h4>
            <ul>${resumen}</ul>
        </div>
    </div>`;
}

function renderEstadisticasAdmin(lista = reclamos, edificioSeleccionado = "todos", soloCambios = false) {
    const contenedor = section.querySelector(".estadisticas-admin");
    if (!contenedor) return false;
    const reclamosVista = edificioSeleccionado === "todos"
        ? lista
        : lista.filter(r => Number(r.edificio_id) === Number(edificioSeleccionado));

    const estadoNormalizado = reclamo => {
        const estado = normalizarEstadoReclamo(reclamo.estado);

        if (["enviado"].includes(estado)) return "pendiente";
        if (["validado", "aceptado"].includes(estado)) return "validado";
        if (["proceso"].includes(estado)) return "en_proceso";
        if (["terminado"].includes(estado)) return "completado";

        return estado;
    };

    const total = reclamosVista.length;
    const pendientes = reclamosVista.filter(
        r => estadoNormalizado(r) === "pendiente"
    ).length;

    const enProceso = reclamosVista.filter(
        r => estadoNormalizado(r) === "en_proceso"
    ).length;

    const completados = reclamosVista.filter(
        r => estadoNormalizado(r) === "completado"
    ).length;

    const rechazados = reclamosVista.filter(
        r => estadoNormalizado(r) === "rechazado"
    ).length;

    const clasificaciones = contarPorEstadistica(
        reclamosVista,
        r => r.clasificacion?.clasificacion
    );

    const edificiosConReclamos = contarPorEstadistica(
        reclamosVista,
        r => r.edificio?.nombre || "Edificio no identificado"
    );

    // Calculamos por edificio qué clasificación aparece con mayor frecuencia.
    const detalleEdificios = edificios.map(edificio => {
        const delEdificio = reclamosVista.filter(
            r => Number(r.edificio_id) === Number(edificio.id)
        );

        const tipos = contarPorEstadistica(
            delEdificio,
            r => r.clasificacion?.clasificacion
        );

        return {
            edificio,
            cantidad: delEdificio.length,
            tipoPrincipal: delEdificio.length
                ? tipos[0].nombre
                : "Sin reclamos",
            cantidadTipoPrincipal: delEdificio.length
                ? tipos[0].cantidad
                : 0
        };
    }).sort((a, b) => b.cantidad - a.cantidad);

    // Sumar los costos que realmente están informados.
    // Los null se cuentan como importes faltantes, no como costos de $0.
    const costos = reclamosVista.map(r => {
        const manoObra = numeroEstadistica(r.costo_mano_obra);
        const materiales = numeroEstadistica(r.costo_materiales);

        return {
            reclamo: r,
            manoObra,
            materiales,
            completo: manoObra !== null && materiales !== null,
            total: (manoObra ?? 0) + (materiales ?? 0)
        };
    });

    const costosCompletos = costos.filter(c => c.completo);
    const costosFaltantes = costos.length - costosCompletos.length;

    const gastoRegistrado = costosCompletos.reduce(
        (suma, c) => suma + c.total, 0
    );
    const gastoMateriales = costosCompletos.reduce(
        (suma, c) => suma + c.materiales, 0
    );
    const gastoManoObra = costosCompletos.reduce(
        (suma, c) => suma + c.manoObra, 0
    );

    const edificiosOptions = edificios.map(edificio => `
        <option value="${Number(edificio.id)}">
            ${escaparHtml(edificio.nombre)}
        </option>
    `).join("");

    const vista = document.createElement("div");
    vista.innerHTML = `
        <header class="estadisticas-header">
            <div>
                <h2>Estadísticas de gestión</h2>
            </div>
            <button type="button" class="btn-actualizar-estadisticas">
                <span class="material-symbols-outlined">refresh</span>
                Actualizar
            </button>
        </header>

        <div class="estadisticas-filtros">
            <label for="filtro-edificio-estadisticas">
                Analizar edificio
            </label>
            <select id="filtro-edificio-estadisticas">
                <option value="todos">Todos los edificios</option>
                ${edificiosOptions}
            </select>
        </div>

        <div class="estadisticas-resumen">
        <div class="estadisticas-kpis">
            <article class="estadistica-kpi" data-stats-widget="total">
                ${renderAnilloEstadistica("assignment", 100, 0)}
                <div>
                    <p>Total de reclamos</p>
                    <strong>${total}</strong>
                    <small>Registrados</small>
                </div>
            </article>

            <article class="estadistica-kpi" data-stats-widget="pendientes">
                ${renderAnilloEstadistica("schedule", porcentajeEstadistica(pendientes, total), 120)}
                <div>
                    <p>Pendientes</p>
                    <strong>${pendientes}</strong>
                    <small>${porcentajeEstadistica(pendientes, total)}% del total</small>
                </div>
            </article>

            <article class="estadistica-kpi" data-stats-widget="en-proceso">
                ${renderAnilloEstadistica("engineering", porcentajeEstadistica(enProceso, total), 240)}
                <div>
                    <p>En proceso</p>
                    <strong>${enProceso}</strong>
                    <small>${porcentajeEstadistica(enProceso, total)}% del total</small>
                </div>
            </article>

            <article class="estadistica-kpi" data-stats-widget="completados">
                ${renderAnilloEstadistica("check", porcentajeEstadistica(completados, total), 360)}
                <div>
                    <p>Completados</p>
                    <strong>${completados}</strong>
                    <small>${porcentajeEstadistica(completados, total)}% del total</small>
                </div>
            </article>
        </div>

        <article class="estadistica-panel estadistica-panel-linea" data-stats-widget="evolucion">
            <div class="estadistica-panel-titulo">
                <div>
                    <h3>Evolución de reclamos</h3>
                    <p>Últimos seis meses hasta el registro más reciente.</p>
                </div>
                <span class="material-symbols-outlined">show_chart</span>
            </div>
            ${renderGraficoLineaMensual(reclamosVista)}
        </article>
        </div>

        <div class="estadisticas-grid">
            <article class="estadistica-panel" data-stats-widget="edificios">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Reclamos por edificio</h3>
                        <p>Edificios con mayor cantidad de incidencias.</p>
                    </div>
                    <span class="material-symbols-outlined">apartment</span>
                </div>
                <div id="grafico-edificios">
                    ${renderGraficoBarras(edificiosConReclamos)}
                </div>
            </article>

            <article class="estadistica-panel" data-stats-widget="clasificaciones">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Tipos de reclamo</h3>
                        <p>Problemas más frecuentes registrados.</p>
                    </div>
                    <span class="material-symbols-outlined">build</span>
                </div>
                <div id="grafico-clasificaciones">
                    ${renderGraficoBarras(clasificaciones)}
                </div>
            </article>
        </div>

        <article class="estadistica-panel estadistica-problemas-panel" data-stats-widget="problemas">
            <div class="estadistica-panel-titulo">
                <div>
                    <h3>Problema más común por edificio</h3>
                    <p>Casos del problema principal respecto del total de cada edificio.</p>
                </div>
                <span class="material-symbols-outlined">domain</span>
            </div>
            ${renderProblemasPorEdificio(detalleEdificios)}
        </article>

        <div class="estadisticas-grid">
            <article class="estadistica-panel" data-stats-widget="estados">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Estado de los reclamos</h3>
                        <p>Distribución actual del trabajo.</p>
                    </div>
                    <span class="material-symbols-outlined">fact_check</span>
                </div>

                <div class="estadistica-estados">
                    ${renderGraficoSectores([
                        { nombre: "Pendientes", cantidad: pendientes },
                        { nombre: "En proceso", cantidad: enProceso },
                        { nombre: "Completados", cantidad: completados },
                        { nombre: "Rechazados", cantidad: rechazados }
                    ])}
                </div>
            </article>

            <article class="estadistica-panel" data-stats-widget="gastos">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Gastos de mantenimiento</h3>
                        <p>Destino del gasto registrado entre materiales y mano de obra.</p>
                    </div>
                    <span class="material-symbols-outlined">payments</span>
                </div>

                <div class="estadistica-gasto-total">
                    <span>Gasto registrado completo</span>
                    <strong>${monedaEstadistica(gastoRegistrado)}</strong>
                </div>

                <div class="estadistica-gasto-grafico">
                    <div class="estadistica-gasto-barra" aria-hidden="true">
                        <span style="width:${gastoRegistrado ? gastoMateriales / gastoRegistrado * 100 : 0}%"></span>
                        <span style="width:${gastoRegistrado ? gastoManoObra / gastoRegistrado * 100 : 0}%"></span>
                    </div>
                    <div class="estadistica-gasto-leyenda">
                        <p><span>Materiales</span><strong>${monedaEstadistica(gastoMateriales)}</strong></p>
                        <p><span>Mano de obra</span><strong>${monedaEstadistica(gastoManoObra)}</strong></p>
                    </div>
                </div>

                <div class="estadistica-gasto-desglose">
                    <p>Reclamos con costos completos:
                        <strong>${costosCompletos.length}</strong>
                    </p>
                    <p>Reclamos con algún costo faltante:
                        <strong>${costosFaltantes}</strong>
                    </p>
                </div>

            </article>
        </div>
    `;

    if (!soloCambios || !contenedor.querySelector("[data-stats-widget]")) {
        contenedor.innerHTML = vista.innerHTML;
        contenedor.querySelector("#filtro-edificio-estadisticas").value = edificioSeleccionado;
        htmlWidgetsEstadisticas.clear();
        vista.querySelectorAll("[data-stats-widget]").forEach(widget => {
            htmlWidgetsEstadisticas.set(widget.dataset.statsWidget, widget.outerHTML);
        });
        observarAnimacionesEstadisticas(contenedor);
        return true;
    }

    let huboCambios = false;
    vista.querySelectorAll("[data-stats-widget]").forEach(siguiente => {
        const actual = [...contenedor.querySelectorAll("[data-stats-widget]")]
            .find(widget => widget.dataset.statsWidget === siguiente.dataset.statsWidget);
        if (!actual) return;
        const htmlSiguiente = siguiente.outerHTML;
        if (htmlWidgetsEstadisticas.get(siguiente.dataset.statsWidget) !== htmlSiguiente) {
            observadorWidgetsEstadisticas?.unobserve(actual);
            actual.replaceWith(siguiente);
            htmlWidgetsEstadisticas.set(siguiente.dataset.statsWidget, htmlSiguiente);
            huboCambios = true;
        }
    });
    if (huboCambios) observarAnimacionesEstadisticas(contenedor);
    return huboCambios;
}

// ==========================================
// MOSTRAR / OCULTAR CONTRASEÑA (GLOBAL)
// ==========================================
document.addEventListener("click", (event) => {
    const btnToggle = event.target.closest(".btn-toggle-password-input");
    if (!btnToggle) return;

    const wrapper = btnToggle.closest(".campo-password-wrapper");
    const input = wrapper?.querySelector("input");
    const icono = btnToggle.querySelector(".material-symbols-outlined");

    if (!input || !icono) return;

    const esPassword = input.type === "password";
    input.type = esPassword ? "text" : "password";
    icono.textContent = esPassword ? "visibility_off" : "visibility";
    btnToggle.setAttribute("aria-label", esPassword ? "Ocultar contraseña" : "Mostrar contraseña");
});

// ==========================================
// FUNCIÓN DE VALIDACIÓN DE CÉDULA URUGUAYA
// ==========================================

function validarCedulaUruguaya(cedula) {
     const limpio = String(cedula || "").replace(/\D/g, "");
     if (limpio.length < 7 || limpio.length > 8) {
        return false;
    }
    const cedulaCompleta = limpio.padStart(8, "0");

    const cuerpo = cedulaCompleta.slice(0, 7);
    const digitoVerificador = Number(cedulaCompleta.slice(7, 8));
    const factores = [2, 9, 8, 7, 6, 3, 4];
    let suma = 0;

    for (let i = 0; i < 7; i++) {
        suma += Number(cuerpo[i]) * factores[i];
    }
    const resto = suma % 10;
    const digitoCalculado = resto === 0 ? 0 : 10 - resto;
    
    return digitoCalculado === digitoVerificador;
}
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
import { notify } from "../utils/toast.js?v=20261016-1";
import { inicializarTema } from '../theme.js';
import { inicializarNotificaciones } from './notifications.js';
import {
    cambiarEstadoProveedor as actualizarEstadoProveedor,
    cambiarPasswordUsuario,
    cambiarRolUsuario,
    crearClasificacion,
    crearEdificio,
    crearProveedor,
    crearUsuario,
    obtenerEdificios,
    obtenerClasificaciones,
    obtenerProveedores,
    obtenerReclamosAdministrador,
    obtenerUsuarios
} from "../services/administrador-service.js";
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
let filtroEstadoProveedor = "todos";
const LIMITE_PAGINACION_ADMIN = 6;
let paginaReclamos = 1;
let paginaProveedores = 1;
let paginaEdificios = 1;

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
estadisticasbtn?.addEventListener("click", () => {
    vistaEstadisticas();
});

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
            botones.forEach(item =>
                item.classList.remove("active")
            );

            boton.classList.add("active");
        });
    });

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
                </dl>
            </div>
        </article>
    `;
}

/**
 * ============================================================================
 * CONCEPTO CLAVE: SECCIÓN CLASIFICACIONES (Creación de categorías)
 * ============================================================================
 * Explicación: Muestra el listado de categorías disponibles para los reclamos 
 * y provee un formulario para registrar nuevas clasificaciones de forma asíncrona.
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
            <div class="filtro-estado-proveedores">

                <button class="filtro-estado-btn" data-estado="todos">
                    Todos
                </button>

                <button class="filtro-estado-btn" data-estado="Activo">
                    Activos
                </button>

                <button class="filtro-estado-btn" data-estado="Inactivo">
                    Desactivados
                </button>

            </div>


          

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
                    paginacion.elementosPagina
                        .map(renderCardProveedor)
                        .join("")
                }

            </div>

            <div class="paginacion-proveedores-admin">
                ${renderPaginacionAdministrador(
                    proveedoresFiltrados.length,
                    paginacion.paginaActual,
                    paginacion.totalPaginas,
                    "proveedor",
                    "proveedores"
                )}
            </div>

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

                                <span class="usuario-rol-actual">
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
                                    class="usuario-rol-actual"
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
                            placeholder="Ej. 12345678"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Nombre completo</label>

                        <input
                            class="nombre-usuario"
                            type="text"
                            placeholder="Ej. Juan Pérez"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Teléfono</label>

                        <input
                            class="telefono-usuario"
                            type="text"
                            placeholder="Ej. 098 123 456"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Correo electrónico</label>

                        <input
                            class="email-usuario"
                            type="email"
                            placeholder="Ej. usuario@gmail.com"
                        >

                    </div>


                    <div class="campo-usuario">

                        <label>Contraseña</label>

                        <input
                            class="password-usuario"
                            type="password"
                            placeholder="Contraseña"
                        >

                    </div>

                     <div class="campo-usuario">
                          <label>Repetir contraseña</label>
                        
                          <input
                              class="confirm-password-usuario"
                              type="password"
                              placeholder="Repetir contraseña"
                          >
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

                            <option value="administrador">
                                Administrador
                            </option>


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
                    type="text"
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

            <div class="contenedor-usuarios"></div>

        </div>
    `;


    // ==========================================
    // ELEMENTOS DEL DOM
    // ==========================================


    
    const cedulaInput =
        document.querySelector(".cedula-usuario");

    const nombreInput =
        document.querySelector(".nombre-usuario");

    const telefonoInput =
        document.querySelector(".telefono-usuario");

    const emailInput =
        document.querySelector(".email-usuario");

    const passwordInput =
        document.querySelector(".password-usuario");

     cedulaInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    });

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

    const btnBuscar =
        document.querySelector(".btn-buscar-usuario");

    const filtroRolSelect =
        document.querySelector(".filtro-rol-usuario");

    const contenedor =
        document.querySelector(".contenedor-usuarios");


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


                return `

                    <div
                        class="usuario-card"
                        data-cedula="${usuario.cedula}"
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
                                ${usuario.telefono || "Sin teléfono"}
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


                            <span class="usuario-rol-actual">
                                ${usuario.rol}
                            </span>


                            ${
                                edificiosDelUsuario.length > 0
                                ?

                                edificiosDelUsuario.map(edificio => `

                                    <span class="usuario-asociacion">

                                        Edificio:
                                        ${edificio.nombre}

                                    </span>

                                `).join("")

                                :

                                ""
                            }

                        </div>


                        <!-- ==========================
                             ACCIONES
                        =========================== -->

                        <div class="usuario-acciones">


                            <select class="select-rol slct-usr">

                                <option value="" selected disabled>
                                    Cambiar tipo...
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

                            </select>


                            <!-- EDIFICIO -->

                            <div class="checkboxes-edificios-cambio oculto">

                                ${
                                    edificios.map(e => {

                                        const yaAsignado =
                                            Array.isArray(usuario.edificios) &&
                                            usuario.edificios.some(
                                                ed => Number(ed.id) === Number(e.id)
                                            );

                                        return `
                                            <label class="checkbox-edificio">
                                                <input
                                                    type="checkbox"
                                                    class="chk-edificio-cambio"
                                                    value="${e.id}"
                                                    ${yaAsignado ? "checked" : ""}
                                                >
                                                ${e.nombre}
                                            </label>
                                        `;

                                    }).join("")
                                }

                            </div>


                            <!-- PROVEEDOR -->

                            <select
                                class="select-proveedor-cambio oculto slct-usr"
                            >

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


                            <button class="btn-guardar-cambio oculto" type="button">

                                Guardar

                            </button>


                        </div>
                        <div class="cambiar-password-container">

                            <button class="btn-cambiar-password">
                                Cambiar contraseña
                            </button>

                            <div class="form-cambiar-password oculto">

                                <input
                                    class="nueva-password"
                                    type="password"
                                    placeholder="Nueva contraseña"
                                >

                                <input
                                    class="confirmar-password"
                                    type="password"
                                    placeholder="Repetir contraseña"
                                >

                                <div class="acciones-cambiar-password">

                                    <button class="cancelar-password" type="button">
                                        Cancelar
                                    </button>

                                    <button class="guardar-password oculto" type="button">
                                        Guardar
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                `;

            }).join("");


        // ==========================================
        // EVENTOS DE CADA CARD
        // ==========================================

        contenedor
            .querySelectorAll(".usuario-card")
            .forEach(card => {
                                // ==================================
                // CAMBIAR CONTRASEÑA
                // ==================================

                const btnCambiarPassword =
                    card.querySelector(".btn-cambiar-password");

                const formPassword =
                    card.querySelector(".form-cambiar-password");

                const nuevaPasswordInput =
                    card.querySelector(".nueva-password");

                const confirmarPasswordInput =
                    card.querySelector(".confirmar-password");

                const btnCancelarPassword =
                    card.querySelector(".cancelar-password");

                const btnGuardarPassword =
                    card.querySelector(".guardar-password");


                btnCambiarPassword.addEventListener(
                    "click",
                    () => {
                        const formularioAbierto = formPassword.classList.toggle("oculto") === false;
                        if (!formularioAbierto) {
                            btnGuardarPassword.classList.add("oculto");
                        }
                    }
                );

                const actualizarVisibilidadGuardarPassword = () => {
                    const hayCambios =
                        nuevaPasswordInput.value.trim() !== "" ||
                        confirmarPasswordInput.value.trim() !== "";

                    btnGuardarPassword.classList.toggle("oculto", !hayCambios);
                };

                nuevaPasswordInput.addEventListener("input", actualizarVisibilidadGuardarPassword);
                confirmarPasswordInput.addEventListener("input", actualizarVisibilidadGuardarPassword);


                btnCancelarPassword.addEventListener(
                    "click",
                    () => {
                        formPassword.classList.add("oculto");
                        nuevaPasswordInput.value = "";
                        confirmarPasswordInput.value = "";
                        btnGuardarPassword.classList.add("oculto");
                    }
                );


                btnGuardarPassword.addEventListener(
                    "click",
                    async () => {

                        const nuevaPassword =
                            nuevaPasswordInput.value.trim();

                        const confirmarPassword =
                            confirmarPasswordInput.value.trim();


                        if (
                            nuevaPassword === "" ||
                            confirmarPassword === ""
                        ) {
                            notify.warning("Completa ambos campos.");
                            return;
                        }

                        if (nuevaPassword.length < 6) {
                            notify.warning("La contraseña debe tener al menos 6 caracteres.");
                            return;
                        }

                        if (nuevaPassword !== confirmarPassword) {
                            notify.warning("Las contraseñas no coinciden.");
                            return;
                        }


                        try {

                            btnGuardarPassword.disabled = true;
                            btnGuardarPassword.textContent = "Guardando...";

                            const response = await cambiarPasswordUsuario(
                                usuario.cedula,
                                nuevaPassword
                            );

                            const data = await response.json();

                            console.log("STATUS:", response.status);
                            console.log("RESPUESTA:", data);

                            if (!response.ok) {
                                notify.error(
                                    data.message ||
                                    "No se pudo actualizar la contraseña."
                                );
                                return;
                            }

                            notify.success("Contraseña actualizada correctamente.");

                            formPassword.classList.add("oculto");
                            nuevaPasswordInput.value = "";
                            confirmarPasswordInput.value = "";
                            btnGuardarPassword.classList.add("oculto");

                        } catch (error) {

                            console.error(
                                "Error al actualizar contraseña:",
                                error
                            );

                            notify.error("No se pudo conectar con el servidor.");

                        } finally {

                            btnGuardarPassword.disabled = false;
                            btnGuardarPassword.textContent = "Guardar";

                        }

                    }
                );
                const cedula =
                    card.dataset.cedula;


                const usuario =
                    usuarios.find(
                        u => String(u.cedula) === String(cedula)
                    );


                if (!usuario) return;


                const selectRol =
                    card.querySelector(".select-rol");

                const contenedorEdificiosCambio =
                    card.querySelector(
                        ".checkboxes-edificios-cambio"
                    );

                const selectProveedor =
                    card.querySelector(
                        ".select-proveedor-cambio"
                    );

                const btnGuardarCambio =
                    card.querySelector(
                        ".btn-guardar-cambio"
                    );

                // ==================================
                // CAMBIAR ROL
                // ==================================

                selectRol.addEventListener("change", () => {

                    const nuevoRol = selectRol.value;

                    btnGuardarCambio.classList.toggle("oculto", nuevoRol === usuario.rol);

                    contenedorEdificiosCambio.classList.add("oculto");
                    selectProveedor.classList.add("oculto");

                    if (nuevoRol === "usuario_edificio") {
                        contenedorEdificiosCambio.classList.remove("oculto");
                    }

                    if (nuevoRol === "usuario_proveedor") {
                        selectProveedor.classList.remove("oculto");
                    }

                });


                // ==================================
                // GUARDAR CAMBIO DE ROL
                // ==================================

                btnGuardarCambio.addEventListener(
                    "click",
                    async () => {

                        const nuevoRol =
                            selectRol.value;


                        if (!nuevoRol) {

                            notify.warning(
                                "Selecciona el nuevo tipo de usuario."
                            );

                            return;

                        }


                        // ==============================
                        // EDIFICIO
                        // ==============================

                        let edificios_ids = [];

                        if (nuevoRol === "usuario_edificio") {

                            edificios_ids = Array.from(
                                contenedorEdificiosCambio.querySelectorAll(
                                    ".chk-edificio-cambio:checked"
                                )
                            ).map(chk => Number(chk.value));

                            if (edificios_ids.length === 0) {
                                notify.warning("Selecciona al menos un edificio.");
                                return;
                            }
                        }


                        // ==============================
                        // PROVEEDOR
                        // ==============================

                        let proveedor = null;

                        if (
                            nuevoRol === "usuario_proveedor"
                        ) {

                            if (!selectProveedor.value) {

                                notify.warning(
                                    "Selecciona el proveedor."
                                );

                                return;

                            }

                            proveedor = Number(
                                selectProveedor.value
                            );

                        }



                        // ==============================
                        // ENVIAR A LARAVEL
                        // ==============================

                        try {

                            btnGuardarCambio.disabled =
                                true;

                            btnGuardarCambio.textContent =
                                "Guardando...";

                            const response = await cambiarRolUsuario(
                                usuario.cedula,
                                {
                                    rol: nuevoRol,
                                    edificios: edificios_ids,
                                    proveedor: proveedor
                                }
                            );


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


                            if (!response.ok) {

                                notify.error(
                                    data.message ||
                                    "No se pudo actualizar el usuario."
                                );

                                return;

                            }


                            // ==========================
                            // ACTUALIZAR USUARIO LOCAL
                            // ==========================

                            const indice =
                                usuarios.findIndex(
                                    u =>
                                        String(u.cedula) ===
                                        String(usuario.cedula)
                                );


                            if (indice !== -1) {

                                usuarios[indice] =
                                    data.usuario;

                            }


                            notify.success(
                                "Usuario actualizado correctamente."
                            );


                            // ==========================
                            // RENDERIZAR NUEVAMENTE
                            // ==========================

                            renderLista(
                                inputBuscar.value.trim(),
                                filtroRolSelect.value
                            );


                        } catch (error) {

                            console.error(
                                "Error al actualizar usuario:",
                                error
                            );

                            notify.error(
                                "No se pudo conectar con el servidor."
                            );

                        } finally {

                            btnGuardarCambio.disabled =
                                false;

                            btnGuardarCambio.textContent =
                                "Guardar";

                        }

                    }
                );

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
    filtro_container.innerHTML = "";
    section.style.display = "grid";
    section.style.gridTemplateColumns = "minmax(0, 1fr)";

    section.innerHTML = `
        <div class="estadisticas-admin">
            <header class="estadisticas-header">
                <div>
                    <span class="estadisticas-etiqueta">PANEL DE CONTROL</span>
                    <h2>Estadísticas de gestión</h2>
                    <p>Indicadores para la gestión y el mantenimiento
                       de los edificios.</p>
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

    const cargar = async () => {
        const contenedor = section.querySelector(".estadisticas-admin");

        if (!contenedor) return;

        const boton = contenedor.querySelector(
            ".btn-actualizar-estadisticas"
        );

        boton.disabled = true;

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

            // No modificar otra sección si el usuario navegó mientras cargaban.
            if (!estadisticasbtn?.classList.contains("active")) return;

            reclamos = Array.isArray(data.reclamos) ? data.reclamos : [];

            renderEstadisticasAdmin();
        } catch (error) {
            console.error("Error al cargar estadísticas:", error);

            if (!estadisticasbtn?.classList.contains("active")) return;

            contenedor.querySelector(".estadisticas-cargando").innerHTML = `
                <span class="material-symbols-outlined">error</span>
                <p>${escaparHtml(error.message)}</p>
                <button type="button" class="btn-reintentar-estadisticas">
                    Reintentar
                </button>
            `;

            contenedor.querySelector(".btn-reintentar-estadisticas")
                ?.addEventListener("click", cargar);
        } finally {
            if (boton?.isConnected) boton.disabled = false;
        }
    };

    section.querySelector(".btn-actualizar-estadisticas")
        ?.addEventListener("click", cargar);

    await cargar();
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

function renderBarraEstadistica(nombre, cantidad, maximo, detalle = "") {
    const ancho = maximo > 0 ? (cantidad / maximo) * 100 : 0;

    return `
        <div class="estadistica-barra-item">
            <div class="estadistica-barra-info">
                <span>${escaparHtml(nombre)}</span>
                <strong>${cantidad}${detalle}</strong>
            </div>
            <div class="estadistica-barra-fondo">
                <div class="estadistica-barra-valor"
                     style="width:${ancho}%"></div>
            </div>
        </div>
    `;
}






function renderEstadisticasAdmin() {
    const contenedor = section.querySelector(".estadisticas-admin");
    if (!contenedor) return;

    const estadoNormalizado = reclamo => {
        const estado = normalizarEstadoReclamo(reclamo.estado);

        if (["enviado"].includes(estado)) return "pendiente";
        if (["validado", "aceptado"].includes(estado)) return "validado";
        if (["proceso"].includes(estado)) return "en_proceso";
        if (["terminado"].includes(estado)) return "completado";

        return estado;
    };

    const total = reclamos.length;
    const pendientes = reclamos.filter(
        r => estadoNormalizado(r) === "pendiente"
    ).length;

    const enProceso = reclamos.filter(
        r => estadoNormalizado(r) === "en_proceso"
    ).length;

    const completados = reclamos.filter(
        r => estadoNormalizado(r) === "completado"
    ).length;

    const rechazados = reclamos.filter(
        r => estadoNormalizado(r) === "rechazado"
    ).length;

    const clasificaciones = contarPorEstadistica(
        reclamos,
        r => r.clasificacion?.clasificacion
    );

    const edificiosConReclamos = contarPorEstadistica(
        reclamos,
        r => r.edificio?.nombre || "Edificio no identificado"
    );

    // Calculamos por edificio qué clasificación aparece con mayor frecuencia.
    const detalleEdificios = edificios.map(edificio => {
        const delEdificio = reclamos.filter(
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
    const costos = reclamos.map(r => {
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

    const edificiosOptions = edificios.map(edificio => `
        <option value="${Number(edificio.id)}">
            ${escaparHtml(edificio.nombre)}
        </option>
    `).join("");

    const maxEdificio = Math.max(
        0, ...edificiosConReclamos.map(e => e.cantidad)
    );

    const maxClasificacion = Math.max(
        0, ...clasificaciones.map(c => c.cantidad)
    );

    contenedor.innerHTML = `
        <header class="estadisticas-header">
            <div>
                <span class="estadisticas-etiqueta">PANEL DE CONTROL</span>
                <h2>Estadísticas de gestión</h2>
                <p>Indicadores generales de reclamos y mantenimiento.</p>
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
            <p>Los indicadores se calculan con los reclamos recibidos.</p>
        </div>

        <div class="estadisticas-kpis">
            <article class="estadistica-kpi">
                <span class="estadistica-kpi-icono azul">
                    <span class="material-symbols-outlined">assignment</span>
                </span>
                <div>
                    <p>Total de reclamos</p>
                    <strong>${total}</strong>
                    <small>Registrados</small>
                </div>
            </article>

            <article class="estadistica-kpi">
                <span class="estadistica-kpi-icono naranja">
                    <span class="material-symbols-outlined">schedule</span>
                </span>
                <div>
                    <p>Pendientes</p>
                    <strong>${pendientes}</strong>
                    <small>${porcentajeEstadistica(pendientes, total)}% del total</small>
                </div>
            </article>

            <article class="estadistica-kpi">
                <span class="estadistica-kpi-icono violeta">
                    <span class="material-symbols-outlined">engineering</span>
                </span>
                <div>
                    <p>En proceso</p>
                    <strong>${enProceso}</strong>
                    <small>En atención</small>
                </div>
            </article>

            <article class="estadistica-kpi">
                <span class="estadistica-kpi-icono verde">
                    <span class="material-symbols-outlined">task_alt</span>
                </span>
                <div>
                    <p>Completados</p>
                    <strong>${completados}</strong>
                    <small>${porcentajeEstadistica(completados, total)}% del total</small>
                </div>
            </article>
        </div>

        <div class="estadisticas-grid">
            <article class="estadistica-panel">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Reclamos por edificio</h3>
                        <p>Edificios con mayor cantidad de incidencias.</p>
                    </div>
                    <span class="material-symbols-outlined">apartment</span>
                </div>
                <div class="estadistica-barras" id="grafico-edificios">
                    ${edificiosConReclamos.length
                        ? edificiosConReclamos.map(e =>
                            renderBarraEstadistica(
                                e.nombre, e.cantidad, maxEdificio
                            )
                        ).join("")
                        : '<p class="estadistica-vacia">Todavía no hay reclamos.</p>'}
                </div>
            </article>

            <article class="estadistica-panel">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Tipos de reclamo</h3>
                        <p>Problemas más frecuentes registrados.</p>
                    </div>
                    <span class="material-symbols-outlined">build</span>
                </div>
                <div class="estadistica-barras" id="grafico-clasificaciones">
                    ${clasificaciones.length
                        ? clasificaciones.map(c =>
                            renderBarraEstadistica(
                                c.nombre, c.cantidad, maxClasificacion
                            )
                        ).join("")
                        : '<p class="estadistica-vacia">Todavía no hay datos.</p>'}
                </div>
            </article>
        </div>

        <article class="estadistica-panel estadistica-tabla-panel">
            <div class="estadistica-panel-titulo">
                <div>
                    <h3>Problema más común por edificio</h3>
                    <p>Clasificación predominante entre los reclamos registrados.</p>
                </div>
                <span class="material-symbols-outlined">domain</span>
            </div>

            <div class="estadistica-tabla-scroll">
                <table class="tabla-estadisticas">
                    <thead>
                        <tr>
                            <th>Edificio</th>
                            <th>Total de reclamos</th>
                            <th>Problema más común</th>
                            <th>Casos del problema principal</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-edificios-estadisticas">
                        ${detalleEdificios.map(item => `
                            <tr data-edificio="${Number(item.edificio.id)}">
                                <td>${escaparHtml(item.edificio.nombre)}</td>
                                <td>${item.cantidad}</td>
                                <td>${escaparHtml(item.tipoPrincipal)}</td>
                                <td>${item.cantidadTipoPrincipal}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </article>

        <div class="estadisticas-grid">
            <article class="estadistica-panel">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Estado de los reclamos</h3>
                        <p>Distribución actual del trabajo.</p>
                    </div>
                    <span class="material-symbols-outlined">fact_check</span>
                </div>

                <div class="estadistica-estados">
                    ${[
                        ["Pendientes", pendientes],
                        ["En proceso", enProceso],
                        ["Completados", completados],
                        ["Rechazados", rechazados]
                    ].map(([nombre, cantidad]) => `
                        <div class="estadistica-estado-item">
                            <span>${nombre}</span>
                            <strong>${cantidad}</strong>
                            <small>${porcentajeEstadistica(cantidad, total)}%</small>
                        </div>
                    `).join("")}
                </div>
            </article>

            <article class="estadistica-panel">
                <div class="estadistica-panel-titulo">
                    <div>
                        <h3>Gastos de mantenimiento</h3>
                        <p>Importes registrados en los reclamos.</p>
                    </div>
                    <span class="material-symbols-outlined">payments</span>
                </div>

                <div class="estadistica-gasto-total">
                    <span>Gasto registrado completo</span>
                    <strong>${monedaEstadistica(gastoRegistrado)}</strong>
                </div>

                <div class="estadistica-gasto-desglose">
                    <p>Reclamos con costos completos:
                        <strong>${costosCompletos.length}</strong>
                    </p>
                    <p>Reclamos con algún costo faltante:
                        <strong>${costosFaltantes}</strong>
                    </p>
                </div>

                <p class="estadistica-nota">
                    El total incluye solamente reclamos con ambos importes
                    registrados. No representa necesariamente el gasto real
                    total si hay costos sin cargar.
                </p>
            </article>
        </div>

        <p class="estadisticas-pie">
            Datos calculados a partir de los reclamos devueltos por el backend.
            Los resultados representan los registros disponibles, no una
            proyección de gastos futuros.
        </p>
    `;

    // Filtro por edificio: actualiza los indicadores y tablas.
    const filtro = contenedor.querySelector("#filtro-edificio-estadisticas");

    filtro.addEventListener("change", () => {
        const id = filtro.value;

        const reclamosFiltrados = id === "todos"
            ? reclamos
            : reclamos.filter(
                r => Number(r.edificio_id) === Number(id)
            );

        // Recalcular el tablero con el conjunto filtrado.
        const reclamosOriginales = reclamos;
        reclamos = reclamosFiltrados;
        renderEstadisticasAdmin();
        reclamos = reclamosOriginales;

        // Conservar la selección tras volver a dibujar.
        const nuevoFiltro = section.querySelector(
            "#filtro-edificio-estadisticas"
        );
        if (nuevoFiltro) nuevoFiltro.value = id;
    });

    contenedor.querySelector(".btn-actualizar-estadisticas")
        ?.addEventListener("click", vistaEstadisticas);
}

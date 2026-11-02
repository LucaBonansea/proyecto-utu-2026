import { cerrarSesion, obtenerSesion } from "../services/auth-service.js";
import { notify } from "../utils/toast.js?v=20261016-1";

export class Cuenta {
    constructor(
        Main,
        button_restart_actives,
        $btn_cuenta_top,
        $btn_cuenta,
        irAInicioFiltrado,
        obtenerEstadisticasReclamos
    ) {
        this.Main = Main;
        this.button_restart_actives = button_restart_actives;
        this.$btn_cuenta_top = $btn_cuenta_top;
        this.$btn_cuenta = $btn_cuenta;
        this.irAInicioFiltrado = irAInicioFiltrado; // función que viene de DOM/inicio.js
        this.obtenerEstadisticasReclamos = obtenerEstadisticasReclamos;
    }


    async obtener_informacion_cuenta() {
        try {
            const request = await obtenerSesion();

            if (!request.ok) {
                throw new Error("No se pudo obtener la información de la cuenta");
            }

            const response = await request.json();

            if (!response.usuario) {
                throw new Error("La respuesta no contiene un usuario");
            }

            return response.usuario;
        } catch (error) {
            console.error("Error obteniendo la información de la cuenta:", error);
            window.location.replace("./index.html");
            return null;
        }
    }

    obtener_nombre_rol(rol) {
        const nombresRoles = {
            administrador: "Administrador",
            administrativo: "Administrativo",
            usuario_edificio: "Usuario de edificio",
            usuario_proveedor: "Usuario de proveedor"
        };

        return nombresRoles[rol] || rol || "Rol no disponible";
    }

    async fifth_view() {
        this.button_restart_actives();

        if(this.$btn_cuenta_top) this.$btn_cuenta_top.classList.add("active");
        if(this.$btn_cuenta) this.$btn_cuenta.classList.add("active");

        this.Main.innerHTML = `
            <section class="vista-cuenta cuenta-usuario-vista">
                <div class="cuenta-usuario-card">
                    <div class="cuenta-usuario-contenido">
                        <div class="cuenta-usuario-cargando">Cargando información de la cuenta...</div>
                    </div>
                </div>
            </section>
        `;

        const vistaCuenta = this.Main.querySelector(".cuenta-usuario-vista");

        const usuario = await this.obtener_informacion_cuenta();

        if (!usuario || !vistaCuenta?.isConnected) {
            return;
        }

        vistaCuenta.querySelector(".cuenta-usuario-contenido").innerHTML = `
            <div class="cuenta-usuario-encabezado">
                <div class="perfil-avatar">
                    <span class="material-symbols-outlined" aria-hidden="true">person</span>
                </div>
                <div>
                    <h2 id="cuenta-usuario-titulo">Mi cuenta</h2>
                    <p>Información de tu cuenta de edificio</p>
                </div>
            </div>

            <div class="cuenta-usuario-datos">
                <div class="cuenta-usuario-dato">
                    <span class="material-symbols-outlined" aria-hidden="true">person</span>
                    <div><small>Nombre completo</small><strong class="perfil-nombre"></strong></div>
                </div>
                <div class="cuenta-usuario-dato">
                    <span class="material-symbols-outlined" aria-hidden="true">badge</span>
                    <div><small>Cédula</small><strong class="perfil-cedula"></strong></div>
                </div>
                <div class="cuenta-usuario-dato">
                    <span class="material-symbols-outlined" aria-hidden="true">phone</span>
                    <div><small>Teléfono</small><strong class="perfil-telefono"></strong></div>
                </div>
                <div class="cuenta-usuario-dato">
                    <span class="material-symbols-outlined" aria-hidden="true">mail</span>
                    <div><small>Correo electrónico</small><strong class="perfil-email"></strong></div>
                </div>
                <div class="cuenta-usuario-dato">
                    <span class="material-symbols-outlined" aria-hidden="true">account_circle</span>
                    <div><small>Rol</small><strong class="perfil-rol"></strong></div>
                </div>
                <div class="cuenta-usuario-dato">
                    <span class="material-symbols-outlined" aria-hidden="true">verified_user</span>
                    <div><small>Estado de la cuenta</small><strong class="perfil-estado"></strong></div>
                </div>
            </div>

            <div class="perfil-stats">
                <button class="stat-item" data-filtro="todos">
                    <p class="stat-numero" data-estadistica="total">…</p>
                    <p class="stat-label">Reclamos totales</p>
                </button>
                <button class="stat-item" data-filtro="resueltos">
                    <p class="stat-numero" data-estadistica="resueltos">…</p>
                    <p class="stat-label">Resueltos</p>
                </button>
                <button class="stat-item" data-filtro="proceso">
                    <p class="stat-numero" data-estadistica="en_proceso">…</p>
                    <p class="stat-label">En proceso</p>
                </button>
            </div>

            <button class="cuenta-opcion cerrar-sesion" id="btn-cerrar-sesion">
                <span class="material-symbols-outlined" aria-hidden="true">logout</span>
                Cerrar sesión
            </button>
        `;

        vistaCuenta.querySelector(".perfil-nombre").textContent =
            usuario.nombre || "Nombre no disponible";
        vistaCuenta.querySelector(".perfil-cedula").textContent =
            usuario.cedula || "No disponible";
        vistaCuenta.querySelector(".perfil-telefono").textContent =
            usuario.telefono || "No registrado";
        vistaCuenta.querySelector(".perfil-email").textContent =
            usuario.email || "No registrado";
        vistaCuenta.querySelector(".perfil-rol").textContent =
            this.obtener_nombre_rol(usuario.rol);
        vistaCuenta.querySelector(".perfil-estado").textContent =
            usuario.activo ? "Activa" : "Inactiva";

        try {
            const estadisticas = await this.obtenerEstadisticasReclamos();

            if (!vistaCuenta.isConnected) return;

            for (const [campo, valor] of Object.entries(estadisticas)) {
                const elemento = vistaCuenta.querySelector(
                    `[data-estadistica="${campo}"]`
                );

                if (elemento) {
                    elemento.textContent = String(valor);
                }
            }
        } catch (error) {
            if (!vistaCuenta.isConnected) return;

            console.error("Error obteniendo estadísticas de reclamos:", error);
            vistaCuenta.querySelectorAll("[data-estadistica]").forEach(elemento => {
                elemento.textContent = "—";
            });
            notify.error("No se pudieron actualizar las estadísticas de reclamos.");
        }

        this.eventos(vistaCuenta);
    }

eventos(vistaCuenta) {
    vistaCuenta.querySelectorAll(".stat-item").forEach(boton => {
        boton.addEventListener("click", () => {
            const filtro = boton.dataset.filtro;
            this.irAInicioFiltrado(filtro);
        });
    });

    const $btn_logout = vistaCuenta.querySelector("#btn-cerrar-sesion");

    if ($btn_logout) {
        $btn_logout.addEventListener(
            "click",
            () => this.cerrar_sesion()
        );
    }
}

async cerrar_sesion() {
    try {
        const response = await cerrarSesion();

        const data = await response.json();

        console.log(
            "LOGOUT STATUS:",
            response.status
        );

        console.log(
            "LOGOUT RESPONSE:",
            data
        );

        if (!response.ok) {
            throw new Error(
                data.mensaje ||
                "No se pudo cerrar la sesión"
            );
        }

        window.location.replace("./index.html");

    } catch (error) {
        console.error(
            "Error cerrando sesión:",
            error
        );
    }
    }

}

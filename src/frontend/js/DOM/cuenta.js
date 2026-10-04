import { cerrarSesion, obtenerSesion } from "../services/auth-service.js";
import { notify } from "../utils/toast.js";

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
            <div class="vista-cuenta">
                <div class="div-inicial">
                    <h2>Cuenta</h2>
                </div>
                <p>Cargando información de la cuenta...</p>
            </div>
        `;

        const usuario = await this.obtener_informacion_cuenta();

        if (!usuario) {
            return;
        }

        this.Main.innerHTML = `
            <div class="vista-cuenta">
                <div class="div-inicial">
                    <h2>Cuenta</h2>
                </div>

                <div class="perfil-card">
                    <div class="perfil-avatar">
                        <span class="material-symbols-outlined">person</span>
                    </div>
                    <p class="perfil-nombre"></p>
                    <p class="perfil-telefono">
                        <span class="material-symbols-outlined">badge</span>
                        <span class="perfil-cedula"></span>
                    </p>
                    <div class="perfil-badge">
                        <span class="material-symbols-outlined">account_circle</span>
                        <span class="perfil-rol"></span>
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

                <div class="cuenta-opciones">
                    <button class="cuenta-opcion cerrar-sesion" id="btn-cerrar-sesion">
                        <span class="material-symbols-outlined">logout</span>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        `;

        this.Main.querySelector(".perfil-nombre").textContent =
            usuario.nombre || "Nombre no disponible";

        this.Main.querySelector(".perfil-cedula").textContent =
            usuario.cedula ? `Cédula: ${usuario.cedula}` : "Cédula no disponible";

        this.Main.querySelector(".perfil-rol").textContent =
            this.obtener_nombre_rol(usuario.rol);

        try {
            const estadisticas = await this.obtenerEstadisticasReclamos();

            for (const [campo, valor] of Object.entries(estadisticas)) {
                const elemento = this.Main.querySelector(
                    `[data-estadistica="${campo}"]`
                );

                if (elemento) {
                    elemento.textContent = String(valor);
                }
            }
        } catch (error) {
            console.error("Error obteniendo estadísticas de reclamos:", error);
            this.Main.querySelectorAll("[data-estadistica]").forEach(elemento => {
                elemento.textContent = "—";
            });
            notify.error("No se pudieron actualizar las estadísticas de reclamos.");
        }

        this.eventos();
    }

    

eventos() {
    this.Main.querySelectorAll(".stat-item").forEach(boton => {
        boton.addEventListener("click", () => {
            this.irAInicioFiltrado(boton.dataset.filtro);
        });
    });

    const $btn_logout = this.Main.querySelector("#btn-cerrar-sesion");

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

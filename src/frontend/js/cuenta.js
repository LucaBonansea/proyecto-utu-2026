export class Cuenta {
    constructor(Main, button_restart_actives, $btn_cuenta_top, $btn_cuenta, irAInicioFiltrado){
        this.Main = Main;
        this.button_restart_actives = button_restart_actives;
        this.$btn_cuenta_top = $btn_cuenta_top;
        this.$btn_cuenta = $btn_cuenta;
        this.irAInicioFiltrado = irAInicioFiltrado; // función que viene de script-inicio.js
    }

    async obtener_informacion_cuenta() {
        try {
            const request = await fetch(
                "http://127.0.0.1:8000/api/auth/me",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

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
                        <p class="stat-numero">12</p>
                        <p class="stat-label">Reclamos totales</p>
                    </button>
                    <button class="stat-item" data-filtro="resueltos">
                        <p class="stat-numero">8</p>
                        <p class="stat-label">Resueltos</p>
                    </button>
                    <button class="stat-item" data-filtro="proceso">
                        <p class="stat-numero">4</p>
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

        this.eventos();
    }

    eventos(){
        const $btn_logout = this.Main.querySelector("#btn-cerrar-sesion");
        $btn_logout.addEventListener("click", () => {
            window.location.href = "/proyecto-utu-2026/src/frontend/html/";
        });

        this.Main.querySelectorAll(".stat-item").forEach(stat => {
            stat.addEventListener("click", () => {
                const filtro = stat.dataset.filtro;
                this.irAInicioFiltrado(filtro);
            });
        });
    }
}

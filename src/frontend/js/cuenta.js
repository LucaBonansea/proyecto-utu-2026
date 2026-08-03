export class Cuenta {
    constructor(Main) {
        this.Main = Main;
    }

    // Vista principal de cuenta
    fifth_view() {
        this.Main.innerHTML = `
            <div class="div-inicial">
                <h2>Cuenta</h2>
            </div>

            <div class="perfil-card">
                <div class="perfil-avatar">
                    <span class="material-symbols-outlined">person</span>
                </div>
                <div class="perfil-info">
                    <p class="perfil-nombre">Nombre Apellido</p>
                    <p class="perfil-telefono">
                        <span class="material-symbols-outlined">call</span>
                        099 123 456
                    </p>
                </div>
            </div>

            <div class="perfil-stats">
                <div class="stat-item">
                    <p class="stat-numero">12</p>
                    <p class="stat-label">Reclamos enviados</p>
                </div>
                <div class="stat-item">
                    <p class="stat-numero">8</p>
                    <p class="stat-label">Resueltos</p>
                </div>
            </div>

            <button class="cuenta-opcion" id="btnConfiguracion">
                <span class="material-symbols-outlined">settings</span>
                Configuración
            </button>

            <button class="cuenta-opcion cerrar-sesion">
                <span class="material-symbols-outlined">logout</span>
                Cerrar sesión
            </button>
        `;

        this.eventos_cuenta();
    }

    eventos_cuenta() {
        document.querySelector(".cerrar-sesion").addEventListener("click", () => {
            window.location.href = "/proyecto-utu-2026/src/frontend/html/";
        });

        document.querySelector("#btnConfiguracion").addEventListener("click", () => {
            this.sixth_view();
        });
    }

    // Vista de configuración
    sixth_view() {
        this.Main.innerHTML = `
            <div class="config-header">
                <button class="config-volver">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 class="config-titulo">Configuración</h2>
            </div>

            <button class="cuenta-opcion" id="cambiarNumero">
                <span class="material-symbols-outlined">call</span>
                Cambiar número
            </button>

            <button class="cuenta-opcion" id="cambiarPin">
                <span class="material-symbols-outlined">lock</span>
                Cambiar PIN
            </button>

            <button class="cuenta-opcion" id="acercaDe">
                <span class="material-symbols-outlined">info</span>
                Acerca de la app
            </button>
        `;

        this.eventos_configuracion();
    }

    eventos_configuracion() {
        document.querySelector(".config-volver").addEventListener("click", () => {
            this.fifth_view();
        });

        document.querySelector("#cambiarNumero").addEventListener("click", () => {
            console.log("Cambiar número clickeado");
        });

        document.querySelector("#cambiarPin").addEventListener("click", () => {
            console.log("Cambiar PIN clickeado");
        });

        document.querySelector("#acercaDe").addEventListener("click", () => {
            console.log("Acerca de la app clickeado");
        });
    }
}
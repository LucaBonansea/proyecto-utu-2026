export class Cuenta {
    constructor(Main, button_restart_actives, $btn_cuenta_top, $btn_cuenta, irAInicioFiltrado){
        this.Main = Main;
        this.button_restart_actives = button_restart_actives;
        this.$btn_cuenta_top = $btn_cuenta_top;
        this.$btn_cuenta = $btn_cuenta;
        this.irAInicioFiltrado = irAInicioFiltrado; // función que viene de script-inicio.js
    }

    fifth_view() {
        this.button_restart_actives();

        if(this.$btn_cuenta_top) this.$btn_cuenta_top.classList.add("active");
        if(this.$btn_cuenta) this.$btn_cuenta.classList.add("active");

        this.Main.innerHTML = `
            <div class="vista-cuenta">
                <div class="div-inicial">
                    <h2>Cuenta</h2>
                </div>

                <div class="perfil-card">
                    <div class="perfil-avatar">
                        <span class="material-symbols-outlined">person</span>
                    </div>
                    <p class="perfil-nombre">Nombre Apellido</p>
                    <p class="perfil-telefono">
                        <span class="material-symbols-outlined">call</span>
                        099 123 456
                    </p>
                    <div class="perfil-badge">
                        <span class="material-symbols-outlined">calendar_month</span>
                        Miembro desde marzo 2026
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
export class Cuenta {
    constructor(Main, button_restart_actives, $btn_cuenta_top, $btn_cuenta){
        this.Main = Main;
        this.button_restart_actives = button_restart_actives;
        this.$btn_cuenta_top = $btn_cuenta_top;
        this.$btn_cuenta = $btn_cuenta;
    }


    // Vista principal de cuenta (desktop y mobile: ya no hay dropdown,
    // "Cuenta" es una vista completa como Inicio y Nuevo Reclamo)
    fifth_view() {
        this.button_restart_actives();

        // button_restart_actives() apaga el "active" de todos los botones
        // del nav; lo volvemos a prender en los dos botones de Cuenta
        // (el de la barra azul y el del bottom-nav), sin importar cuál
        // de los dos disparó esta vista.
        if(this.$btn_cuenta_top) this.$btn_cuenta_top.classList.add("active");
        if(this.$btn_cuenta) this.$btn_cuenta.classList.add("active");

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

            <button class="cuenta-opcion cerrar-sesion" id="btn-cerrar-sesion">
                <span class="material-symbols-outlined">logout</span>
                Cerrar sesión
            </button>
        `;

        this.eventos();
    }

    eventos(){
        const $btn_logout = this.Main.querySelector("#btn-cerrar-sesion");

        $btn_logout.addEventListener("click", () => {
            window.location.href = "/proyecto-utu-2026/src/frontend/html/";
        });
    }

}
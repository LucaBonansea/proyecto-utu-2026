
export class Cuenta {
    constructor(Main,button_restart_actives, home, $user_btn, $menu_top_cuenta){
        this.Main = Main;
        this.button_restart_actives = button_restart_actives;
        this.home = home;
        this.$user_btn = $user_btn;
        this.$menu_top_cuenta = $menu_top_cuenta;
    }
   

    // Vista principal de cuenta
    fifth_view() {
        this.button_restart_actives();
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

            <button class="cuenta-opcion" id="btnConfiguracion">
                <span class="material-symbols-outlined">settings</span>
                Configuración
            </button>

        `;

        this.eventos_cuenta();
    
    }


    eventos_cuenta() {
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

            <button class="cuenta-opcion" id="cambiarNumero-mobile">
                <span class="material-symbols-outlined">call</span>
                Cambiar número
            </button>

            <button class="cuenta-opcion" id="cambiarPin-mobile">
                <span class="material-symbols-outlined">lock</span>
                Cambiar PIN
            </button>

            <button class="cuenta-opcion" id="acercaDe-mobile">
                <span class="material-symbols-outlined">info</span>
                Acerca de la app
            </button>
        `;

        this.eventos_configuracion();
    }

    seven_view(){
        this.Main.innerHTML = `
             <section class="seccion-numero">
            <header class="numero-change-header">
                <div class="container-top-number">
                    <button class="arrow-back-mobile">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h3 class="title">Cambiar Numero</h2>
                </div> 
            </header>
            <main class="main-numero">
                <div class="title-change">
                    <h3>Cambiar numero</h3>
                </div>
                
                <div class="container-change">
                    <div>
                        <p>Número antiguo: </p>
                        <h4>098 765 432</h4>
                    </div>
                    <input placeholder="Número nuevo: ">
                    <div class="container-btn-sms">
                        <button>Enviar SMS</button>
                    </div>
                    <input placeholder="Codigo enviado por SMS: ">
                    <div class="bottom-container-change">
                        <a href="">¿Reenviar Codigo?</a>
                        <button>Confirmar</button>
                    </div>
                </div>
            </main>
       </section>
        `;

        this.eventos_configuracion_menus();

    }

    eventos_configuracion() {
    document.querySelector(".config-volver").addEventListener("click", () => {
        this.fifth_view();
    });

    document.querySelector("#cambiarNumero-mobile").addEventListener("click", ()=>{
        this.seven_view();
    });

   
    document.querySelector("#cambiarPin-mobile").addEventListener("click", () => {
        console.log("Cambiar PIN clickeado");
    });

    document.querySelector("#acercaDe-mobile").addEventListener("click", () => {
        console.log("Acerca de la app clickeado");
    });

    
}

    eventos_configuracion_menus(){
        document.querySelector(".arrow-back-mobile").addEventListener("click", ()=>{
            this.$user_btn.classList.remove("active");
            this.home.first_view();
        });
    }

     
}
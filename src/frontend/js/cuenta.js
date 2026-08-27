
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

                    </div>
                </header>


                <main class="main-numero">

                    <div class="title-change">
                        <span class="material-symbols-outlined">
                            phone_android
                        </span>

                        <div>
                            <h3>Cambiar número</h3>
                            <p>Actualiza tu número de teléfono de forma segura.</p>
                        </div>
                    </div>


                    <div class="container-change">

                        <div class="numero-actual">
                            <span class="material-symbols-outlined">
                                phone
                            </span>

                            <div>
                                <span>Número actual</span>
                                <strong>098 765 432</strong>
                            </div>
                        </div>


                        <div class="campo-numero">

                            <label for="nuevo-numero">
                                Nuevo número
                            </label>

                            <div class="input-wrapper">
                                <span class="material-symbols-outlined">
                                    phone
                                </span>

                                <input
                                    id="nuevo-numero"
                                    type="tel"
                                    placeholder="098 123 456"
                                >
                            </div>

                        </div>


                        <div class="container-btn-sms">
                            <button class="btn-sms">
                                <span class="material-symbols-outlined">
                                    sms
                                </span>

                                Enviar código por SMS
                            </button>
                        </div>


                        <div class="campo-numero">

                            <label for="codigo-sms">
                                Código de verificación
                            </label>

                            <div class="input-wrapper codigo-wrapper">

                                <span class="material-symbols-outlined">
                                    lock
                                </span>

                                <input
                                    id="codigo-sms"
                                    type="text"
                                    inputmode="numeric"
                                    maxlength="6"
                                    placeholder="000000"
                                >

                            </div>

                            <small>
                                Introduce el código de 6 dígitos que recibiste por SMS.
                            </small>

                        </div>


                        <div class="bottom-container-change">

                            <button class="btn-confirmar">
                                <span class="material-symbols-outlined">
                                    check
                                </span>

                                Confirmar cambio
                            </button>

                            <button class="btn-reenviar">
                                Reenviar código
                            </button>

                        </div>

                    </div>

                </main>

            </section>

        `;

        this.eventos_configuracion_menus();

    }

    eight_view(){
        this.Main.innerHTML = `
            <section class="seccion-numero">

                <header class="numero-change-header">
                    <div class="container-top-number">

                        <button class="arrow-back-mobile">
                            <span class="material-symbols-outlined">arrow_back</span>
                        </button>

                    </div>
                </header>


                <main class="main-numero">

                    <div class="title-change">
                        <span class="material-symbols-outlined">
                            lock
                        </span>

                        <div>
                            <h3>Cambiar PIN</h3>
                            <p>Actualiza tu PIN de seguridad.</p>
                        </div>
                    </div>


                    <div class="container-change">

                        <!-- PIN ACTUAL -->
                        <div class="campo-numero">

                            <label for="pin-antiguo">
                                PIN actual
                            </label>

                            <div class="input-wrapper pin-wrapper">

                                <span class="material-symbols-outlined">
                                    lock
                                </span>

                                <input
                                    id="pin-antiguo"
                                    type="password"
                                    inputmode="numeric"
                                    maxlength="4"
                                    placeholder="••••"
                                >

                            </div>

                        </div>


                        <!-- PIN NUEVO -->
                        <div class="campo-numero">

                            <label for="pin-nuevo">
                                PIN nuevo
                            </label>

                            <div class="input-wrapper pin-wrapper">

                                <span class="material-symbols-outlined">
                                    lock
                                </span>

                                <input
                                    id="pin-nuevo"
                                    type="password"
                                    inputmode="numeric"
                                    maxlength="4"
                                    placeholder="••••"
                                >

                            </div>

                            <small>
                                El PIN debe tener 4 dígitos.
                            </small>

                        </div>


                        <!-- CONFIRMAR -->
                        <div class="bottom-container-change pin-confirmar">

                            <button class="btn-confirmar">
                                <span class="material-symbols-outlined">
                                    check
                                </span>

                                Confirmar cambio
                            </button>

                        </div>

                    </div>

                </main>

            </section>

        `;

        this.eventos_configuracion_menus();
    }


    ninth_view(){
        this.Main.innerHTML = `
        <section class="seccion-numero">

            <header class="numero-change-header">
                <div class="container-top-number">
                    <button class="arrow-back-mobile">
                        <span class="material-symbols-outlined">arrow_back</span>
                    </button>
                </div>
            </header>

            <main class="main-acerca">

                <div class="title-change">
                    <span class="material-symbols-outlined">
                        info
                    </span>

                    <div>
                        <h3>Acerca de la app</h3>
                        <p>Portal Ciudadano · Intendencia de San José</p>
                    </div>
                </div>

                <div class="container-acerca">

                    <div class="acerca-logo">
                        <span class="material-symbols-outlined">apartment</span>
                    </div>

                    <p class="acerca-texto">
                        Portal Ciudadano es la plataforma oficial de la Intendencia de San José
                        para la gestión de reclamos ciudadanos. Permite reportar problemas en
                        la vía pública, hacer seguimiento del estado de cada reclamo y acceder
                        a una gestión departamental más cercana y transparente.
                    </p>

                    <ul class="acerca-lista">

                        <li>
                            <span class="material-symbols-outlined">location_on</span>
                            <div>
                                <strong>Reclamos geolocalizados</strong>
                                <span>Cada reporte queda vinculado a una ubicación exacta.</span>
                            </div>
                        </li>

                        <li>
                            <span class="material-symbols-outlined">timeline</span>
                            <div>
                                <strong>Seguimiento en tiempo real</strong>
                                <span>Consultá el estado de tu reclamo en cada etapa.</span>
                            </div>
                        </li>

                        <li>
                            <span class="material-symbols-outlined">groups</span>
                            <div>
                                <strong>Canal directo con la comuna</strong>
                                <span>Un vínculo más cercano entre vecinos e Intendencia.</span>
                            </div>
                        </li>

                    </ul>

                    <div class="acerca-footer">
                        <span>Versión 1.0.0</span>
                        <span>Intendencia de San José</span>
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
            this.eight_view();
        });

        document.querySelector("#acercaDe-mobile").addEventListener("click", () => {
            this.ninth_view();
        });

    
    }

    eventos_configuracion_menus(){
        document.querySelector(".arrow-back-mobile").addEventListener("click", (event)=>{
            // Verificar para que version estoy aplicacindo las acciones
            // Aca primero verifico si es tablet y si no aplico las acciones para desktop
            if(window.innerWidth <= 768){
                this.sixth_view();
            }else{
                event.stopPropagation();
                this.home.first_view();
                this.$menu_top_cuenta.classList.add("active");
            
            }

        });
    }

     
}



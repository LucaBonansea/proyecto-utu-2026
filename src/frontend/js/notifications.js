export class Notificaciones {
    constructor(Main, button_restart_actives) {
        this.Main = Main;
        this.button_restart_actives = button_restart_actives;
    }

    fourth_view() {
        this.button_restart_actives();
        this.Main.innerHTML = `
            <div class="div-inicial">
                <h2>Notificaciones</h2>
            </div>

            <div class="notification critical">
                <div class="notification-title">
                    <span>
                        <span class="material-symbols-outlined">task_alt</span>
                        Reclamo Resuelto
                    </span>
                </div>
                <div class="notification-content">
                    Tu reclamo N.° 6382929 fue resuelto con éxito. ¡Gracias por ayudarnos a mejorar la ciudad!
                </div>
                <div class="notification-time">11:23 AM</div>
            </div>

            <div class="notification critical">
                <div class="notification-title">
                    <span>
                        <span class="material-symbols-outlined">cancel</span>
                        Reclamo Denegado
                    </span>
                </div>
                <div class="notification-content">
                    Tu reclamo N.° 6382930 fue denegado por presentar inconsistencias en la información proporcionada. Podés volver a enviarlo con más detalle.
                </div>
                <div class="notification-time">10:05 AM</div>
            </div>

            <div class="notification critical">
                <div class="notification-title">
                    <span>
                        <span class="material-symbols-outlined">gpp_maybe</span>
                        Advertencia de Contenido
                    </span>
                </div>
                <div class="notification-content">
                    Tu reclamo N.° 6382936 incumple las normas de uso por contener lenguaje ofensivo o imágenes no relacionadas con el problema reportado. Esta es tu primera advertencia: reiterar esta conducta puede derivar en la suspensión de tu cuenta.
                </div>
                <div class="notification-time">3:15 PM</div>
            </div>
        `;
    }
}
export class Notificaciones {
    constructor(Main, button_restart_actives) {
        this.Main = Main;
        this.button_restart_actives = button_restart_actives;
    }

    fourth_view() {
        this.button_restart_actives();

        const notificaciones = [
            {
                icono: "task_alt",
                titulo: "Reclamo Resuelto",
                contenido: "Tu reclamo N.° 6382929 fue resuelto con éxito. ¡Gracias por ayudarnos a mejorar la ciudad!",
                hora: "11:23 AM"
            },
            {
                icono: "cancel",
                titulo: "Reclamo Denegado",
                contenido: "Tu reclamo N.° 6382930 fue denegado por presentar inconsistencias en la información proporcionada. Podés volver a enviarlo con más detalle.",
                hora: "10:05 AM"
            },
            {
                icono: "gpp_maybe",
                titulo: "Advertencia de Contenido",
                contenido: "Tu reclamo N.° 6382936 incumple las normas de uso por contener lenguaje ofensivo o imágenes no relacionadas con el problema reportado. Esta es tu primera advertencia: reiterar esta conducta puede derivar en la suspensión de tu cuenta.",
                hora: "3:15 PM"
            },
            {
                icono: "gpp_maybe",
                titulo: "Advertencia de Contenido",
                contenido: "Tu reclamo N.° 6382936 incumple las normas de uso por contener lenguaje ofensivo o imágenes no relacionadas con el problema reportado. Esta es tu primera advertencia: reiterar esta conducta puede derivar en la suspensión de tu cuenta.",
                hora: "3:15 PM"
            }
        ];

        let contenido = `
            <div class="div-inicial">
                <h2>Notificacion</h2>
            </div>
        `;

        notificaciones.forEach(function(notificacion) {
            contenido += `
                <div class="notification critical">

                    <div class="notification-title">
                        <span>
                            <span class="material-symbols-outlined">
                                ${notificacion.icono}
                            </span>
                            ${notificacion.titulo}
                        </span>
                    </div>

                    <div class="notification-content">
                        ${notificacion.contenido}
                    </div>

                    <div class="notification-time">
                        ${notificacion.hora}
                    </div>

                </div>
            `;
        });

        this.Main.innerHTML = contenido;
    }
}
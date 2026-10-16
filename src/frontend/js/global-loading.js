(() => {
    const RETRASO_MOSTRAR = 350;
    const TIEMPO_MINIMO_VISIBLE = 280;
    const fetchOriginal = window.fetch.bind(window);
    let solicitudesPendientes = 0;
    let temporizadorMostrar = null;
    let temporizadorOcultar = null;
    let visibleDesde = 0;

    function obtenerIndicador() {
        let indicador = document.querySelector(".carga-global");

        if (indicador) {
            return indicador;
        }

        indicador = document.createElement("div");
        indicador.className = "carga-global";
        indicador.hidden = true;
        indicador.setAttribute("role", "status");
        indicador.setAttribute("aria-live", "polite");
        indicador.setAttribute("aria-label", "Cargando");
        indicador.innerHTML = `
            <span class="carga-global-circulo" aria-hidden="true"></span>
        `;
        document.body.appendChild(indicador);

        return indicador;
    }

    function mostrarIndicador() {
        temporizadorMostrar = null;

        if (solicitudesPendientes === 0) {
            return;
        }

        const indicador = obtenerIndicador();
        visibleDesde = performance.now();
        indicador.hidden = false;
    }

    function iniciarCarga() {
        solicitudesPendientes += 1;

        if (temporizadorOcultar) {
            clearTimeout(temporizadorOcultar);
            temporizadorOcultar = null;
        }

        const indicador = document.querySelector(".carga-global");

        if (solicitudesPendientes > 1 || (indicador && !indicador.hidden)) {
            return;
        }

        temporizadorMostrar = window.setTimeout(
            mostrarIndicador,
            RETRASO_MOSTRAR
        );
    }

    function finalizarCarga() {
        solicitudesPendientes = Math.max(0, solicitudesPendientes - 1);

        if (solicitudesPendientes > 0) {
            return;
        }

        if (temporizadorMostrar) {
            clearTimeout(temporizadorMostrar);
            temporizadorMostrar = null;
        }

        const indicador = document.querySelector(".carga-global");

        if (!indicador || indicador.hidden) {
            return;
        }

        const tiempoRestante = Math.max(
            0,
            TIEMPO_MINIMO_VISIBLE - (performance.now() - visibleDesde)
        );

        temporizadorOcultar = window.setTimeout(() => {
            temporizadorOcultar = null;

            if (solicitudesPendientes === 0) {
                indicador.hidden = true;
            }
        }, tiempoRestante);
    }

    window.fetch = (...argumentos) => {
        iniciarCarga();

        try {
            return fetchOriginal(...argumentos).finally(finalizarCarga);
        } catch (error) {
            finalizarCarga();
            throw error;
        }
    };
})();

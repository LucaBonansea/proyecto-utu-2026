(() => {
    // El indicador corresponde al arranque de la interfaz, no a cada petición.
    if (!document.body.hasAttribute("data-carga-interfaz")) return;

    const indicador = document.createElement("div");
    indicador.className = "carga-global";
    indicador.hidden = true;
    indicador.setAttribute("role", "status");
    indicador.setAttribute("aria-live", "polite");
    indicador.setAttribute("aria-label", "Cargando interfaz");
    indicador.innerHTML = '<span class="carga-global-circulo" aria-hidden="true"></span>';
    document.body.appendChild(indicador);

    // Evita un destello cuando la interfaz carga rápido.
    const mostrar = window.setTimeout(() => {
        indicador.hidden = false;
    }, 250);

    // Si falla la carga de un módulo, el indicador no queda bloqueando la página.
    const seguridad = window.setTimeout(finalizar, 15000);

    function finalizar() {
        window.clearTimeout(mostrar);
        window.clearTimeout(seguridad);
        indicador.hidden = true;
    }

    window.finalizarCargaInterfaz = finalizar;
})();

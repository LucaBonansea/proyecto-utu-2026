const sharedOptions = {
    duration: 4000,
    progress: true,
    position: "top-center",
    transition: "swingInverted",
    icon: "",
    sound: false
};

let cerrarConfirmacionActiva = null;

function show(type, message, options = {}) {
    const toastMethod = window.showToast?.[type];

    if (typeof toastMethod !== "function") {
        console.error("No se pudo cargar Nextjs Toast Notify.", message);
        return;
    }

    toastMethod(message, {
        ...sharedOptions,
        ...options,
        sound: options.sound ?? type === "error"
    });
}

function showConfirm(message, {
    confirmText = "Confirmar",
    cancelText = "Cancelar"
} = {}) {
    cerrarConfirmacionActiva?.(false);

    return new Promise(resolve => {
        const focoAnterior = document.activeElement;
        const contenedor = document.createElement("div");
        const tarjeta = document.createElement("section");
        const contenido = document.createElement("div");
        const icono = document.createElement("span");
        const texto = document.createElement("p");
        const acciones = document.createElement("div");
        const botonCancelar = document.createElement("button");
        const botonConfirmar = document.createElement("button");

        contenedor.className = "confirmacion-toast-container";
        tarjeta.className = "confirmacion-toast";
        tarjeta.setAttribute("role", "alertdialog");
        tarjeta.setAttribute("aria-describedby", "confirmacion-toast-mensaje");

        contenido.className = "confirmacion-toast-contenido";
        icono.className = "material-symbols-outlined confirmacion-toast-icono";
        icono.setAttribute("aria-hidden", "true");
        icono.textContent = "warning";
        texto.id = "confirmacion-toast-mensaje";
        texto.textContent = message;

        acciones.className = "confirmacion-toast-acciones";
        botonCancelar.type = "button";
        botonCancelar.className = "confirmacion-toast-cancelar";
        botonCancelar.textContent = cancelText;
        botonConfirmar.type = "button";
        botonConfirmar.className = "confirmacion-toast-confirmar";
        botonConfirmar.textContent = confirmText;

        contenido.append(icono, texto);
        acciones.append(botonCancelar, botonConfirmar);
        tarjeta.append(contenido, acciones);
        contenedor.append(tarjeta);
        document.body.append(contenedor);

        const cerrar = confirmado => {
            document.removeEventListener("keydown", manejarTeclado);
            contenedor.remove();
            cerrarConfirmacionActiva = null;
            resolve(confirmado);

            if (focoAnterior instanceof HTMLElement && focoAnterior.isConnected) {
                focoAnterior.focus();
            }
        };

        const manejarTeclado = event => {
            if (event.key === "Escape") {
                cerrar(false);
            }
        };

        botonCancelar.addEventListener("click", () => cerrar(false));
        botonConfirmar.addEventListener("click", () => cerrar(true));
        document.addEventListener("keydown", manejarTeclado);
        cerrarConfirmacionActiva = cerrar;
        botonCancelar.focus();
    });
}

export const notify = {
    success(message, options) {
        show("success", message, options);
    },
    error(message) {
        show("error", message);
    },
    warning(message) {
        show("warning", message);
    },
    info(message) {
        show("info", message);
    },
    confirm(message, options) {
        return showConfirm(message, options);
    }
};

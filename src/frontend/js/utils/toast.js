const sharedOptions = {
    duration: 4000,
    progress: true,
    position: "bottom-right",
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
    title = "Confirmar acción",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    inputType = null,
    inputLabel = "",
    inputPlaceholder = "",
    inputAutocomplete = "off"
} = {}) {
    cerrarConfirmacionActiva?.(false);

    return new Promise(resolve => {
        const focoAnterior = document.activeElement;
        const contenedor = document.createElement("div");
        const tarjeta = document.createElement("div");
        const contenido = document.createElement("div");
        const icono = document.createElement("span");
        const cuerpo = document.createElement("div");
        const titulo = document.createElement("h2");
        const texto = document.createElement("p");
        const campo = inputType ? document.createElement("label") : null;
        const etiquetaCampo = inputType ? document.createElement("span") : null;
        const entrada = inputType ? document.createElement("input") : null;
        const acciones = document.createElement("div");
        const botonCancelar = document.createElement("button");
        const botonConfirmar = document.createElement("button");

        contenedor.className = "confirmacion-toast-container";
        tarjeta.className = "confirmacion-toast";
        tarjeta.setAttribute("role", "alertdialog");
        tarjeta.setAttribute("aria-labelledby", "confirmacion-toast-titulo");
        tarjeta.setAttribute("aria-describedby", "confirmacion-toast-mensaje");

        contenido.className = "confirmacion-toast-contenido";
        icono.className = "material-symbols-outlined confirmacion-toast-icono";
        icono.setAttribute("aria-hidden", "true");
        icono.textContent = "warning";
        cuerpo.className = "confirmacion-toast-cuerpo";
        titulo.id = "confirmacion-toast-titulo";
        titulo.textContent = title;
        texto.id = "confirmacion-toast-mensaje";
        texto.textContent = message;

        if (campo && etiquetaCampo && entrada) {
            campo.className = "confirmacion-toast-campo";
            etiquetaCampo.textContent = inputLabel;
            entrada.type = inputType;
            entrada.placeholder = inputPlaceholder;
            entrada.autocomplete = inputAutocomplete;
            entrada.required = true;
            campo.append(etiquetaCampo, entrada);
        }

        acciones.className = "confirmacion-toast-acciones";
        botonCancelar.type = "button";
        botonCancelar.className = "confirmacion-toast-cancelar";
        botonCancelar.textContent = cancelText;
        botonConfirmar.type = "button";
        botonConfirmar.className = "confirmacion-toast-confirmar";
        botonConfirmar.textContent = confirmText;

        cuerpo.append(titulo, texto);
        if (campo) cuerpo.append(campo);
        contenido.append(icono, cuerpo);
        acciones.append(botonCancelar, botonConfirmar);
        tarjeta.append(contenido, acciones);
        contenedor.append(tarjeta);
        document.body.append(contenedor);

        const cerrar = confirmado => {
            document.removeEventListener("keydown", manejarTeclado);
            contenedor.remove();
            cerrarConfirmacionActiva = null;
            resolve(entrada ? (confirmado ? entrada.value : null) : confirmado);

            if (focoAnterior instanceof HTMLElement && focoAnterior.isConnected) {
                focoAnterior.focus();
            }
        };

        const manejarTeclado = event => {
            if (event.key === "Escape") {
                cerrar(false);
            }
        };

        const confirmar = () => {
            if (entrada && !entrada.value) {
                entrada.setAttribute("aria-invalid", "true");
                entrada.focus();
                return;
            }

            cerrar(true);
        };

        botonCancelar.addEventListener("click", () => cerrar(false));
        botonConfirmar.addEventListener("click", confirmar);
        entrada?.addEventListener("input", () => entrada.removeAttribute("aria-invalid"));
        entrada?.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                confirmar();
            }
        });
        document.addEventListener("keydown", manejarTeclado);
        cerrarConfirmacionActiva = cerrar;
        (entrada || botonCancelar).focus();
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
    },
    confirmPassword(message, options = {}) {
        return showConfirm(message, {
            ...options,
            inputType: "password",
            inputLabel: options.inputLabel || "Tu contraseña actual",
            inputPlaceholder: options.inputPlaceholder || "Ingresá tu contraseña",
            inputAutocomplete: "current-password"
        });
    }
};

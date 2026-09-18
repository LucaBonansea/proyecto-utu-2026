const defaultOptions = {
    duration: 4000,
    progress: true,
    position: "top-center",
    transition: "swingInverted",
    icon: ""
};

function show(type, message, options = {}) {
    const toastMethod = window.showToast?.[type];

    if (typeof toastMethod !== "function") {
        console.error("No se pudo cargar Nextjs Toast Notify.", message);
        return;
    }

    toastMethod(message, { ...defaultOptions, ...options });
}

export const notify = {
    success(message, options) {
        show("success", message, options);
    },
    error(message, options = {}) {
        show("error", message, { ...options, sound: true });
    },
    warning(message, options) {
        show("warning", message, options);
    },
    info(message, options) {
        show("info", message, options);
    }
};

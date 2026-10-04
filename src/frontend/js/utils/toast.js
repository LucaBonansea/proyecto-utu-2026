const sharedOptions = {
    duration: 4000,
    progress: true,
    position: "top-center",
    transition: "swingInverted",
    icon: "",
    sound: false
};

function show(type, message) {
    const toastMethod = window.showToast?.[type];

    if (typeof toastMethod !== "function") {
        console.error("No se pudo cargar Nextjs Toast Notify.", message);
        return;
    }

    toastMethod(message, {
        ...sharedOptions,
        sound: type === "error"
    });
}

export const notify = {
    success(message) {
        show("success", message);
    },
    error(message) {
        show("error", message);
    },
    warning(message) {
        show("warning", message);
    },
    info(message) {
        show("info", message);
    }
};

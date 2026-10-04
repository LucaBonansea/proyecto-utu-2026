const STORAGE_KEY = "utu-theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function readSavedTheme() {
    try {
        const theme = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("admin-theme");
        return theme === "light" || theme === "dark" ? theme : null;
    } catch (error) {
        console.warn("No se pudo leer la preferencia de tema.", error);
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
        console.warn("No se pudo guardar la preferencia de tema.", error);
    }
}

function aplicarTema(theme, button) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = theme;

    if (!button) {
        return;
    }

    const label = dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-pressed", String(dark));
    button.title = label;

    const icon = button.querySelector(".material-symbols-outlined");
    if (icon) {
        icon.textContent = dark ? "light_mode" : "dark_mode";
    }
}

export function inicializarTema() {
    const button = document.querySelector(".theme-toggle");
    const media = window.matchMedia(DARK_MODE_QUERY);
    let savedTheme = readSavedTheme();
    let currentTheme = savedTheme || (media.matches ? "dark" : "light");

    aplicarTema(currentTheme, button);

    if (button && button.dataset.themeReady !== "true") {
        button.dataset.themeReady = "true";
        button.addEventListener("click", () => {
            currentTheme = currentTheme === "dark" ? "light" : "dark";
            savedTheme = currentTheme;
            aplicarTema(currentTheme, button);
            saveTheme(currentTheme);
        });
    }

    media.addEventListener("change", (event) => {
        if (!savedTheme) {
            currentTheme = event.matches ? "dark" : "light";
            aplicarTema(currentTheme, button);
        }
    });
}

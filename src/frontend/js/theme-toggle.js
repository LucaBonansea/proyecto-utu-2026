const themeToggle = document.querySelector("#theme-toggle");
const storageKey = "admin-theme";

function applyTheme(theme) {
    const isDark = theme === "dark";
    const buttonText = isDark ? "Activar modo claro" : "Activar modo oscuro";

    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", buttonText);
    themeToggle.title = buttonText;
}

if (themeToggle) {
    const savedTheme = localStorage.getItem(storageKey);

    applyTheme(savedTheme === "light" ? "light" : "dark");

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme;
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);
        localStorage.setItem(storageKey, nextTheme);
    });
}

const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

function updateThemeToggle() {
    const isDark = root.dataset.theme === "dark";

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark
        ? "Увімкнути світлу тему"
        : "Увімкнути темну тему";
}

themeToggle.addEventListener("click", () => {
    if (root.dataset.theme === "dark") {
        delete root.dataset.theme;
    } else {
        root.dataset.theme = "dark";
    }

    updateThemeToggle();
});

updateThemeToggle();

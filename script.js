const destinationCards = document.querySelectorAll(".destination-grid article");
const destinationNames = Array.from(destinationCards, (card) => card.querySelector("h3").textContent);
const pageTitle = document.querySelector("h1");
const currentYear = document.querySelector("#current-year");
const homeLink = document.querySelector('nav a[href="#home"]');
const themeToggle = document.querySelector("#theme-toggle");
const contactForm = document.querySelector("#contacts form");
const formMessage = document.querySelector("#form-message");

console.log("Destination names:", destinationNames);
console.log("Destination card count:", destinationCards.length);
console.log("Page title:", pageTitle.textContent);

currentYear.textContent = new Date().getFullYear();
homeLink.classList.add("is-active");

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark-theme");

    if (isDark) {
        document.documentElement.classList.remove("dark-theme");
        themeToggle.setAttribute("aria-pressed", "false");
        themeToggle.textContent = "Увімкнути темну тему";
    } else {
        document.documentElement.classList.add("dark-theme");
        themeToggle.setAttribute("aria-pressed", "true");
        themeToggle.textContent = "Увімкнути світлу тему";
    }
});

contactForm.noValidate = true;

contactForm.addEventListener("input", (event) => {
    event.target.removeAttribute("aria-invalid");
    formMessage.textContent = "";
    formMessage.classList.remove("is-error", "is-success");
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#name");
    const email = contactForm.querySelector("#email");
    const message = contactForm.querySelector("#message");
    const values = {
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
    };
    const invalidField = !values.name
        ? name
        : !values.email || !values.email.includes("@")
            ? email
            : !values.message
                ? message
                : null;

    if (invalidField) {
        invalidField.setAttribute("aria-invalid", "true");
        invalidField.focus();
        formMessage.textContent = invalidField === email
            ? "Введіть email, що містить символ @."
            : "Заповніть усі обов’язкові поля.";
        formMessage.classList.add("is-error");
        return;
    }

    formMessage.textContent = "Дякуємо! Дані форми перевірено.";
    formMessage.classList.add("is-success");
});

const destinationCards = document.querySelectorAll(".destination-grid article");
const destinationNames = Array.from(destinationCards, (card) => card.querySelector("h3").textContent);
const pageTitle = document.querySelector("h1");
const currentYear = document.querySelector("#current-year");
const homeLink = document.querySelector('nav a[href="#home"]');
const themeToggle = document.querySelector("#theme-toggle");
const contactForm = document.querySelector("#contacts form");
const formMessage = document.querySelector("#form-message");
const submitButton = contactForm.querySelector('button[type="submit"]');
const newsList = document.querySelector("#news-list");
const newsMessage = document.querySelector("#news-message");

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

async function loadPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const posts = await response.json();

        if (!Array.isArray(posts)) {
            throw new Error("The posts response is not a list.");
        }

        const items = posts.map((post) => {
            const item = document.createElement("li");
            item.textContent = post.title;
            return item;
        });

        newsList.replaceChildren(...items);
        newsMessage.textContent = `Завантажено публікацій: ${posts.length}.`;
        newsMessage.classList.remove("is-error");
    } catch (error) {
        console.error("Не вдалося завантажити публікації:", error);
        newsMessage.textContent = "Не вдалося завантажити публікації. Спробуйте пізніше.";
        newsMessage.classList.add("is-error");
    }
}

loadPosts();

contactForm.noValidate = true;

contactForm.addEventListener("input", (event) => {
    event.target.removeAttribute("aria-invalid");
    formMessage.textContent = "";
    formMessage.classList.remove("is-error", "is-success");
});

contactForm.addEventListener("submit", async (event) => {
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
        : !email.validity.valid
            ? email
            : !values.message
                ? message
                : null;

    if (invalidField) {
        invalidField.setAttribute("aria-invalid", "true");
        invalidField.focus();
        formMessage.textContent = invalidField === email
            ? "Введіть коректну адресу email."
            : "Заповніть усі обов’язкові поля.";
        formMessage.classList.add("is-error");
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Надсилання...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        formMessage.textContent = `Дякуємо! Звернення надіслано (номер ${result.id}).`;
        formMessage.classList.add("is-success");
    } catch (error) {
        console.error("Не вдалося надіслати форму:", error);
        formMessage.textContent = "Не вдалося надіслати звернення. Спробуйте пізніше.";
        formMessage.classList.add("is-error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Надіслати повідомлення";
    }
});

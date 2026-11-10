const destinationCards = document.querySelectorAll(".destination-grid article");
const destinationNames = Array.from(destinationCards, (card) => card.querySelector("h3").textContent);
const pageTitle = document.querySelector("h1");
const currentYear = document.querySelector("#current-year");
const homeLink = document.querySelector('nav a[href="#home"]');

console.log("Destination names:", destinationNames);
console.log("Destination card count:", destinationCards.length);
console.log("Page title:", pageTitle.textContent);

currentYear.textContent = new Date().getFullYear();
homeLink.classList.add("is-active");

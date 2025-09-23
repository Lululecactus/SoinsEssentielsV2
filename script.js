// main.js

// Menu burger
const burgerMenu = document.getElementById("burger-menu");
const body = document.body;

burgerMenu.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

// Animation slide-in pour mobile sauf homepage
window.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hasHash = window.location.hash; // ex: #calendar
  const isHome =
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("index.html");

  if (isMobile && !hasHash && !isHome) {
    // Forcer un reflow pour Safari
    void document.body.offsetWidth;
    body.classList.add("page-slide-in");
  }
});

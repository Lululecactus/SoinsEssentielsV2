// main.js

// Menu burger
const burgerMenu = document.getElementById("burger-menu");
const body = document.body;

burgerMenu.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

// Animation slide-in pour mobile
window.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hasHash = window.location.hash; // ex: #calendar

  if (isMobile && !hasHash) {
    // Forcer un reflow pour Safari
    void document.body.offsetWidth;
    document.body.classList.add("page-slide-in");
  }
});

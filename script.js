// main.js

// Menu burger
const burgerMenu = document.getElementById("burger-menu");
const body = document.body;

burgerMenu.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});


// Animation slide-in pour mobile
window.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 768) {
    document.body.classList.add("page-slide-in");
  }
});

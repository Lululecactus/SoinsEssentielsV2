// main.js

// Menu burger
const burgerMenu = document.getElementById("burger-menu");
const body = document.body;

burgerMenu.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

window.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hasHash = Boolean(window.location.hash);

  // on anime UNIQUEMENT si :
  // - mobile
  // - pas de hash
  // - pas la homepage (body n'a pas la classe "home")
  if (isMobile && !hasHash && !body.classList.contains("home")) {
    void body.offsetWidth; // Safari reflow
    body.classList.add("page-slide-in");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".soins-section1");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add("in-view");
      }
    });
  }, { threshold: 0.5 }); // déclenche à 30% visible

  observer.observe(section);
});
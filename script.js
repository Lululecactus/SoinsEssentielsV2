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
  const pathname = window.location.pathname.replace(/\/+$/, ""); // enlève slash final
  const isHome = pathname === "" ||
                 pathname === "/" ||
                 /(^|\/)index\.(html?|php)$/.test(pathname);

  console.log("slide-in check:", { pathname, isHome, hasHash, referrer: document.referrer, isMobile });

  if (!isMobile || hasHash || isHome) return;

  // Forcer reflow (Safari)
  void body.offsetWidth;
  document.body.classList.add("page-slide-in");
});


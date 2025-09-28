document.addEventListener("DOMContentLoaded", () => {
  // --- Menu burger ---
  const burgerMenu = document.getElementById("burger-menu");
  burgerMenu?.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  // --- Page slide-in pour mobile ---
  const body = document.body;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hasHash = Boolean(window.location.hash);

  if (isMobile && !hasHash && !body.classList.contains("home")) {
    void body.offsetWidth; // reflow Safari
    body.classList.add("page-slide-in");
  }

  // --- Fonction utilitaire pour IntersectionObserver ---
  const observeElement = (element, className, options = {}) => {
    if (!element) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          void element.offsetWidth; // reflow pour Safari/Chrome mobile
          element.classList.add(className);
          obs.unobserve(element); // animation une seule fois
        }
      });
    }, options);
    observer.observe(element);
  };

  // --- Section 1 : observer la section entière ---
  const section1 = document.querySelector(".soins-section1");
  observeElement(section1, "in-view", {
    threshold: 0.5, // déclenche quand 50% visible
    rootMargin: "0px 0px 0px 0px",
  });

  // --- Section 2 : observer chaque image de la galerie ---
  const section2 = document.querySelector(".soins-section2");
  if (section2) {
    const pics = section2.querySelectorAll(".soins-section2-gallery picture");
    pics.forEach((pic) => {
      observeElement(pic, "in-view", {
        threshold: 0.5, // déclenche quand 50% visible
        rootMargin: "0px 0px 0px 0px",
      });
    });
  }
});

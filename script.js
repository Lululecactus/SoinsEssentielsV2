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

  // --- Fonction utilitaire IntersectionObserver ---
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

  // --- Section 1 : observer l'image ---
  const section1Image = document.querySelector(".soins-section1-image");
  if (section1Image) {
    observeElement(section1Image, "in-view", {
      threshold: 0.1,
      rootMargin: "0px 0px -500px 0px" // déclenche plus tard
    });
  }

  // --- Sections avec galerie (section 2 et 3) ---
  const gallerySections = document.querySelectorAll(".soins-section2, .soins-section3");
  gallerySections.forEach((section) => {
    const pics = section.querySelectorAll(".soins-section2-gallery picture, .soins-section3-gallery picture");
    pics.forEach((pic) => {
      observeElement(pic, "in-view", {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
      });
    });
  });
});

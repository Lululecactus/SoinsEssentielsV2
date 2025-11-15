document.addEventListener("DOMContentLoaded", () => {
  // --- Menu burger (tel que tu l'avais) ---
  const burgerMenu = document.getElementById("burger-menu");
  burgerMenu?.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  // --- Page slide-in pour mobile (comme avant) ---
  const body = document.body;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const hasHash = Boolean(window.location.hash);

  if (isMobile && !hasHash && !body.classList.contains("home")) {
    void body.offsetWidth; // reflow Safari
    body.classList.add("page-slide-in");
  }

  // --- IntersectionObserver utilitaire (ton code) ---
  const observeElement = (element, className, options = {}) => {
    if (!element) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          void element.offsetWidth;
          element.classList.add(className);
          obs.unobserve(element);
        }
      });
    }, options);
    observer.observe(element);
  };

  // --- Section 1 image ---
  const section1Image = document.querySelector(".soins-section1-image");
  if (section1Image) {
    observeElement(section1Image, "in-view", {
      threshold: 0.1,
      rootMargin: "0px 0px -250px 0px"
    });
  }

  // --- Galeries section 2 et 3 ---
  const gallerySections = document.querySelectorAll(".soins-section2, .soins-section3");
  gallerySections.forEach((section) => {
    const pics = section.querySelectorAll(".soins-section2-gallery picture, .soins-section3-gallery picture");
    pics.forEach((pic) => {
      observeElement(pic, "in-view", {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px"
      });
    });
  });

  // --- GESTION SPÉCIALE DU SOUS-MENU "LES SOINS" SUR MOBILE ---

  const mobileQuery = window.matchMedia("(max-width: 768px)");
  const soinsLi = document.querySelector(".nav-bar__has-submenu");
  const soinsLink = soinsLi?.querySelector(":scope > a");
  const subMenu = soinsLi?.querySelector(".nav-bar__sub-menu");

  if (soinsLi && soinsLink && subMenu) {
    let open = false;

    const applyMobileState = () => {
      if (!mobileQuery.matches) {
        // Desktop : on laisse ton CSS faire. On remet les choses propres.
        subMenu.style.display = "";
        subMenu.style.pointerEvents = "";
        open = false;
        return;
      }

      // Mobile : par défaut, sous-menu caché et non cliquable
      if (!open) {
        subMenu.style.display = "none";
        subMenu.style.pointerEvents = "none";
      } else {
        subMenu.style.display = "flex";
        subMenu.style.pointerEvents = "auto";
      }
    };

    // Initialisation selon la taille
    applyMobileState();

    // Si on redimensionne (paysage/portrait), on réapplique
    mobileQuery.addEventListener("change", applyMobileState);

    // Clic sur "Les Soins" : on ne laisse PAS le navigateur gérer
    soinsLink.addEventListener("click", (e) => {
      if (!mobileQuery.matches) {
        // Desktop : on laisse tout se faire (hover)
        return;
      }

      // Mobile : empêcher tout comportement de lien / hover par défaut
      e.preventDefault();
      e.stopPropagation();

      open = !open;
      applyMobileState();
    });

    // Sécurité : on bloque les clics fantômes dans le sous-menu tant qu'il est "fermé"
    subMenu.addEventListener(
      "click",
      (e) => {
        if (!mobileQuery.matches) return;
        if (!open) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true // capture, pour être sûr de l'intercepter avant
    );
  }
});

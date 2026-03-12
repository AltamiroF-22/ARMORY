/* ============================================================
   animations/arsenal.js
   Responsibility : Arsenal section — render product grid + reveal animations.
   Product catalog (image, id)   → js/data/products.js
   Locale text (cat, name, price) → js/locales/*.js arsenal.products[]
   ============================================================ */

import { PRODUCTS } from "../data/products.js";

export class Arsenal {
  /**
   * Renders the product grid from PRODUCTS data, then hides everything
   * for the reveal animation. Call before Loader.init() so i18n can
   * translate the data-i18n attributes on the freshly rendered cards.
   */
  prep() {
    this.#render();
    gsap.set("#arsenal-eyebrow", { opacity: 0, y: 20 });
    gsap.set(".arsenal__title-line", { yPercent: 100 });
    gsap.set("#arsenal-sub", { opacity: 0, y: 20 });
    gsap.set("#arsenal-viewall", { opacity: 0, y: 16 });
    gsap.set(".arsenal-card", { opacity: 0, y: 60 });
  }

  /** Runs ScrollTrigger reveal animations. Call inside the Loader onComplete callback. */
  init() {
    this.#revealHeader();
    this.#revealCards();
    // Re-render cards when user switches language
    document.addEventListener("locale-change", () => {
      this.#render();
      gsap.set(".arsenal-card", { opacity: 1, y: 0 });
    });
  }

  // ─── Private ─────────────────────────────────────────────

  #render() {
    const grid = document.getElementById("arsenal-grid");
    if (!grid) return;

    // Pick current locale (same key i18n uses), fall back to 'en'
    const lang = localStorage.getItem("armory-locale") ?? "en";

    grid.innerHTML = PRODUCTS.map((p, i) => {
      const t = p.locales[lang] ?? p.locales.en;
      const num = String(i + 1).padStart(2, "0");
      return `
        <div class="arsenal-card hoverable">
          <div class="arsenal-card__img-wrap">
            <div class="arsenal-card__img" style="background-image: url('${p.image}')"></div>
            <span class="arsenal-card__badge">${num}</span>
          </div>
          <div class="arsenal-card__body">
            <span class="arsenal-card__cat">${t.cat}</span>
            <h3  class="arsenal-card__name">${t.name}</h3>
            <div class="arsenal-card__footer">
              <span class="arsenal-card__price">${t.price}</span>
              <a href="product.html?id=${p.id}" class="arsenal-card__link hoverable" aria-label="View ${t.name}">
                <i data-lucide="arrow-right" width="13" height="13" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>`;
    }).join("");

    window.lucide?.createIcons({
      nodes: Array.from(grid.querySelectorAll("[data-lucide]")),
    });
  }

  #revealHeader() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#arsenal",
          start: "top 78%",
        },
      })
      .to("#arsenal-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
      })
      .to(
        ".arsenal__title-line",
        { yPercent: 0, duration: 1, stagger: 0.1, ease: "expo.out" },
        "-=0.5",
      )
      .to(
        "#arsenal-sub",
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
        "-=0.6",
      )
      .to(
        "#arsenal-viewall",
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.5",
      );
  }

  #revealCards() {
    gsap.to(".arsenal-card", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#arsenal-grid",
        start: "top 82%",
      },
    });
  }
}

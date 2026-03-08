/* ============================================================
   animations/ammo.js
   Responsibility : Ammo section — render round grid + reveal animations.
   Round catalog (image, id, grain) → js/data/ammo.js
   Locale text (type, name, cal, vel, price) → ammo.js locales map
   ============================================================ */

import { AMMO } from "../data/ammo.js";

export class Ammo {
  /**
   * Renders the ammo grid from AMMO data, then hides everything
   * for the reveal animation. Call before Loader.init().
   */
  prep() {
    this.#render();
    gsap.set("#ammo-eyebrow", { opacity: 0, y: 20 });
    gsap.set(".ammo__title-line", { yPercent: 100 });
    gsap.set("#ammo-sub", { opacity: 0, y: 20 });
    gsap.set("#ammo-viewall", { opacity: 0, y: 16 });
    gsap.set(".ammo-card", { opacity: 0, y: 60 });
  }

  /** Runs ScrollTrigger reveal animations. Call inside the Loader onComplete callback. */
  init() {
    this.#revealHeader();
    this.#revealCards();
    // Re-render cards when user switches language
    document.addEventListener("locale-change", () => {
      this.#render();
      gsap.set(".ammo-card", { opacity: 1, y: 0 });
    });
  }

  // ─── Private ─────────────────────────────────────────────

  #render() {
    const grid = document.getElementById("ammo-grid");
    if (!grid) return;

    const lang = localStorage.getItem("armory-locale") ?? "en";

    grid.innerHTML = AMMO.map((round) => {
      const t = round.locales[lang] ?? round.locales.en;
      return `
        <div class="ammo-card hoverable">
          <div class="ammo-card__img-wrap">
            <div class="ammo-card__img" style="background-image: url('${round.image}')"></div>
            <span class="ammo-card__cal">${t.cal}</span>
          </div>
          <div class="ammo-card__body">
            <span class="ammo-card__type">${t.type}</span>
            <h3 class="ammo-card__name">${t.name}</h3>
            <div class="ammo-card__specs">
              <div class="ammo-card__spec">
                <span class="ammo-card__spec-label">GRAIN</span>
                <span class="ammo-card__spec-val">${round.grain}<span class="ammo-card__spec-unit">gr</span></span>
              </div>
              <div class="ammo-card__spec">
                <span class="ammo-card__spec-label">VELOCITY</span>
                <span class="ammo-card__spec-val">${t.vel}</span>
              </div>
            </div>
            <div class="ammo-card__footer">
              <span class="ammo-card__price">${t.price}</span>
              <a href="#" class="ammo-card__link hoverable" aria-label="View ${t.name}">
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
          trigger: "#ammo",
          start: "top 78%",
        },
      })
      .to("#ammo-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
      })
      .to(
        ".ammo__title-line",
        { yPercent: 0, duration: 1, stagger: 0.1, ease: "expo.out" },
        "-=0.5",
      )
      .to(
        "#ammo-sub",
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
        "-=0.6",
      )
      .to(
        "#ammo-viewall",
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.5",
      );
  }

  #revealCards() {
    gsap.to(".ammo-card", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#ammo-grid",
        start: "top 82%",
      },
    });
  }
}

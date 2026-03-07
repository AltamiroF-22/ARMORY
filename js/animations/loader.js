/* ============================================================
   animations/loader.js
   Responsibility : loading screen sequence only
   ============================================================ */

import { SplitText } from "../lib/SplitText.js";

export class Loader {
  #el = null;
  #countEl = null;
  #bar = null;
  #tagline = null;
  #splitBrand = null;

  #query() {
    this.#el = document.getElementById("loader");
    this.#countEl = document.getElementById("loader-count");
    this.#bar = this.#el.querySelector(".loader__bar");
    this.#tagline = this.#el.querySelector(".loader__tagline");
  }

  #split() {
    const brandEl = this.#el.querySelector('[data-split="brand"]');
    this.#splitBrand = new SplitText(brandEl, { type: "chars" });
  }

  #setInitial() {
    gsap.set(this.#splitBrand.chars, { yPercent: 110, opacity: 0 });
    gsap.set(this.#tagline, { opacity: 0, y: 10 });
  }

  #buildTimeline(onComplete) {
    const countEl = this.#countEl;
    const bar = this.#bar;

    gsap
      .timeline({ onComplete })

      // Brand letters stagger in
      .to(this.#splitBrand.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: { amount: 0.5 },
        ease: "expo.out",
      })

      // Tagline fade in
      .to(
        this.#tagline,
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.3",
      )

      // Fake progress counter + bar
      .to(
        {},
        {
          duration: 2.4,
          ease: "none",
          onUpdate() {
            const p = Math.round(this.progress() * 100);
            countEl.textContent = p;
            gsap.set(bar, { width: p + "%" });
          },
        },
        0.2,
      )

      // Brief pause at 100 %
      .to({}, { duration: 0.3 })

      // Brand letters flicker out
      .to(this.#splitBrand.chars, {
        yPercent: -110,
        opacity: 0,
        duration: 0.8,
        stagger: { amount: 0.3, from: "random" },
        ease: "expo.in",
      })

      // Entire loader slides up — all content clips with it
      .to(
        this.#el,
        { yPercent: -100, duration: 1.2, ease: "expo.inOut" },
        "-=0.2",
      )

      // Remove from DOM flow
      .set(this.#el, { display: "none" });
  }

  init(onComplete) {
    this.#query();
    this.#split();
    this.#setInitial();
    this.#buildTimeline(onComplete);
  }
}

/* ============================================================
   core/lenis.js
   Responsibility : create and wire Lenis smooth scroll
   ============================================================ */

export class LenisScroll {
  #lenis = null;

  init() {
    this.#lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    gsap.ticker.add((time) => this.#lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return this;
  }

  get instance() {
    return this.#lenis;
  }
}

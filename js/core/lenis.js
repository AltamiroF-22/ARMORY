/* ============================================================
   core/lenis.js
   Responsibility : create and wire Lenis smooth scroll
   Exports        : initLenis() → Lenis instance
   ============================================================ */

/**
 * Creates a Lenis instance and hooks it into the GSAP ticker
 * so ScrollTrigger stays perfectly in sync.

 */
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

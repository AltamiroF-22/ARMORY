/* ============================================================
   animations/loader.js
   Responsibility : loading screen sequence only
   Exports        : initLoader(onComplete)
   ============================================================ */

import { SplitText } from "../lib/SplitText.js";

/**
 * Runs the full loading screen animation.
 * Calls `onComplete` when the exit transition finishes.
 * @param {() => void} onComplete
 */
export function initLoader(onComplete) {
  const loader = document.getElementById("loader");
  const countEl = document.getElementById("loader-count");
  const bar = loader.querySelector(".loader__bar");
  const tagline = loader.querySelector(".loader__tagline");

  const brandEl = loader.querySelector('[data-split="brand"]');
  const splitBrand = new SplitText(brandEl, { type: "chars" });

  gsap.set(splitBrand.chars, { yPercent: 110, opacity: 0 });
  gsap.set(tagline, { opacity: 0, y: 10 });

  gsap
    .timeline({ onComplete })

    // Brand letters stagger in
    .to(splitBrand.chars, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: { amount: 0.5 },
      ease: "expo.out",
    })

    // Tagline fade in
    .to(tagline, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, "-=0.3")

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
    .to(splitBrand.chars, {
      yPercent: -110,
      opacity: 0,
      duration: 0.8,
      stagger: { amount: 0.3, from: "random" },
      ease: "expo.in",
    })

    // Entire loader slides up — all content clips with it
    .to(loader, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.2")

    // Remove from DOM flow
    .set(loader, { display: "none" });
}

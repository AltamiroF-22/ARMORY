/* ============================================================
   animations/hero.js
   Responsibility : hero section reveal + interactions only
   Exports        : initHero()
   ============================================================ */

import { SplitText } from "../lib/SplitText.js";

/** Sets all hero elements to their hidden initial states. Call before initLoader(). */
export function prepHero() {
  gsap.set(".nav", { opacity: 0 });
  gsap.set("#hero-eyebrow", { opacity: 0, y: 20 });
  gsap.set(".hero__title-line", { yPercent: 100 });
  gsap.set("#hero-sub", { opacity: 0, y: 30 });
  gsap.set("#hero-actions", { opacity: 0, y: 30 });
  gsap.set("#hero-crosshair", {
    opacity: 0,
    scale: 0.6,
    rotate: -45,
    y: "-50%",
  });
  gsap.set("#hero-scroll", { opacity: 0 });
}

export function initHero() {
  _animateNav();
  _animateContent();
  _animateCrosshair();
  _parallaxOnScroll();
  _parallaxOnMousemove();
  _animateScrollIndicator();
}

/* ── Nav ──────────────────────────────────────────────────── */
function _animateNav() {
  gsap.to(".nav", { opacity: 1, duration: 1, ease: "expo.out" });
}

/* ── Eyebrow + Title lines + Subtitle + CTAs ─────────────── */
function _animateContent() {
  // Eyebrow
  gsap.to("#hero-eyebrow", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "expo.out",
  });

  // Title lines (each has overflow:hidden as clip mask)
  gsap.to(".hero__title-line", {
    yPercent: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: "expo.out",
  });

  // Subtitle — split by words
  const subEl = document.getElementById("hero-sub");
  gsap.set(subEl, { opacity: 1 }); // parent visible; CSS opacity-0 overridden by GSAP
  const splitSub = new SplitText(subEl, { type: "words" });
  gsap.set(splitSub.words, { opacity: 0, y: 20 });
  gsap.to(splitSub.words, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.04,
    ease: "expo.out",
  });

  // CTA buttons
  gsap.to("#hero-actions", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "expo.out",
  });
}

/* ── Crosshair SVG ────────────────────────────────────────── */
function _animateCrosshair() {
  const el = document.getElementById("hero-crosshair");

  gsap
    .timeline()
    .to(el, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: "-50%",
      duration: 1.5,
      ease: "expo.out",
    })
    // Slow idle rotation — chained so no overwrite conflict
    .to(el, {
      rotation: "+=360",
      duration: 40,
      repeat: -1,
      ease: "none",
    });
}

/* ── Scroll indicator ─────────────────────────────────────── */
function _animateScrollIndicator() {
  gsap.to("#hero-scroll", {
    opacity: 1,
    duration: 0.8,
    ease: "expo.out",
  });
}

/* ── Parallax on scroll (ScrollTrigger) ───────────────────── */
function _parallaxOnScroll() {
  gsap.to("#hero-bg", {
    yPercent: 25,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/* ── Parallax on mousemove ────────────────────────────────── */
function _parallaxOnMousemove() {
  const bg = document.getElementById("hero-bg");
  document.addEventListener("mousemove", (e) => {
    gsap.to(bg, {
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 10,
      duration: 2,
      ease: "power2.out",
    });
  });
}

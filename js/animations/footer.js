/* ============================================================
   animations/footer.js
   Footer — infinite marquee, logo clip reveal, column stagger,
   bottom bar fade, back-to-top scroll
   ============================================================ */

export class Footer {
  /** Set all footer elements to their hidden initial states. */
  prep() {
    gsap.set("#footer-logo", { yPercent: 108 });
    gsap.set("#footer-tagline", { opacity: 0 });
    gsap.set(".footer__col-title", { opacity: 0, y: 14 });
    gsap.set(".footer__link", { opacity: 0, y: 10 });
    gsap.set(".footer__copy", { opacity: 0 });
    gsap.set(".footer__back-top", { opacity: 0 });
  }

  init() {
    this.#marquee();
    this.#revealBrand();
    this.#revealColumns();
    this.#revealBottom();
    this.#bindBackToTop();
  }

  /* ── Infinite marquee — driven by CSS animation ─────── */
  #marquee() {
    // Marquee is now handled purely by CSS @keyframes footer-marquee
    // (translateX -50% on the track = exactly one copy-width, seamless loop)
  }

  /* ── Brand logo clip reveal ───────────────────────────── */
  #revealBrand() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#footer",
          start: "top 85%",
          once: true,
        },
      })
      .to("#footer-logo", {
        yPercent: 0,
        duration: 1.5,
        ease: "expo.out",
      })
      .to(
        "#footer-tagline",
        {
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
        },
        "-=0.75"
      );
  }

  /* ── Column titles + links stagger ───────────────────── */
  #revealColumns() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".footer__main",
          start: "top 88%",
          once: true,
        },
      })
      .to(".footer__col-title", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "expo.out",
      })
      .to(
        ".footer__link",
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.035,
          ease: "expo.out",
        },
        "-=0.4"
      );
  }

  /* ── Bottom bar: copyright + back-to-top ─────────────── */
  #revealBottom() {
    gsap.to([".footer__copy", ".footer__back-top"], {
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".footer__bottom",
        start: "top 97%",
        once: true,
      },
    });
  }

  /* ── Back-to-top button ───────────────────────────────── */
  #bindBackToTop() {
    document
      .getElementById("footer-back-top")
      ?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }
}

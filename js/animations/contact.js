/* ============================================================
   animations/contact.js
   Contact section — ScrollTrigger reveals + form handling
   ============================================================ */

export class Contact {
  /** Set all contact elements to their hidden initial states. */
  prep() {
    gsap.set("#contact-eyebrow", { opacity: 0, y: 20 });
    gsap.set(".contact__title-line", { yPercent: 110 });
    gsap.set("#contact-sub", { opacity: 0, y: 24 });
    gsap.set(".contact__info-item", { opacity: 0, x: -28 });
    gsap.set("#contact-form-wrap .auth__field", { opacity: 0, y: 28 });
    gsap.set(".contact__submit", { opacity: 0, y: 16 });
  }

  init() {
    this.#revealHeader();
    this.#revealInfo();
    this.#revealForm();
    this.#handleSubmit();
  }

  /* ── Header: eyebrow + title clip + subtitle ─────────── */
  #revealHeader() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top 72%",
          once: true,
        },
      })
      .to("#contact-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
      })
      .to(
        ".contact__title-line",
        {
          yPercent: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.55"
      )
      .to(
        "#contact-sub",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
        },
        "-=0.75"
      );
  }

  /* ── Info list: stagger from left ───────────────────── */
  #revealInfo() {
    gsap.to(".contact__info-item", {
      opacity: 1,
      x: 0,
      duration: 0.75,
      stagger: 0.09,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".contact__info-list",
        start: "top 80%",
        once: true,
      },
    });
  }

  /* ── Form fields: stagger from below ─────────────────── */
  #revealForm() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#contact-form-wrap",
          start: "top 80%",
          once: true,
        },
      })
      .to("#contact-form-wrap .auth__field", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "expo.out",
      })
      .to(
        ".contact__submit",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "expo.out",
        },
        "-=0.2"
      );
  }

  /* ── Form submit (demo — shake on invalid) ─────────── */
  #handleSubmit() {
    document
      .getElementById("form-contact")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = e.target.querySelector(".contact__submit");
        gsap
          .timeline()
          .to(btn, { x: -7, duration: 0.07, ease: "power1.inOut" })
          .to(btn, { x: 7, duration: 0.07 })
          .to(btn, { x: -4, duration: 0.07 })
          .to(btn, { x: 0, duration: 0.07 });
      });
  }
}

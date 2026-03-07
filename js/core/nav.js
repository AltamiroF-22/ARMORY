/* ============================================================
   core/nav.js
   Responsibility : mobile / tablet nav overlay (GSAP animated)
   ============================================================ */

export class NavMenu {
  #overlay = null;
  #burger = null;
  #textSpans = null;
  #bottomEl = null;
  #isOpen = false;
  #tl = null;

  init() {
    this.#overlay = document.getElementById("nav-overlay");
    this.#burger = document.getElementById("nav-burger");
    this.#textSpans = this.#overlay.querySelectorAll(".nav-overlay__text");
    this.#bottomEl = this.#overlay.querySelector(".nav-overlay__bottom");

    this.#setInitial();
    this.#buildTimeline();
    this.#bindEvents();

    return this;
  }

  #setInitial() {
    gsap.set(this.#overlay, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(this.#textSpans, { yPercent: 110 });
    gsap.set(this.#bottomEl, { opacity: 0, y: 14 });
  }

  #buildTimeline() {
    this.#tl = gsap
      .timeline({ paused: true })
      .to(this.#overlay, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.75,
        ease: "expo.inOut",
      })
      .to(
        this.#textSpans,
        {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "expo.out",
        },
        "-=0.35",
      )
      .to(
        this.#bottomEl,
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "expo.out",
        },
        "-=0.45",
      );
  }

  #bindEvents() {
    this.#burger.addEventListener("click", () => this.#toggle());

    this.#overlay.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => this.#close());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.#isOpen) this.#close();
    });
  }

  #toggle() {
    this.#isOpen ? this.#close() : this.#open();
  }

  #open() {
    this.#isOpen = true;
    document.body.classList.add("nav-open");
    this.#burger.setAttribute("aria-expanded", "true");
    this.#overlay.removeAttribute("aria-hidden");
    this.#tl.play();
  }

  #close() {
    this.#isOpen = false;
    document.body.classList.remove("nav-open");
    this.#burger.setAttribute("aria-expanded", "false");
    this.#overlay.setAttribute("aria-hidden", "true");
    this.#tl.reverse();
  }
}

/* ============================================================
   core/cursor.js
   Responsibility : custom crosshair cursor (dot + ring)
   Only active on pointer devices (hover: hover).
   ============================================================ */

export class Cursor {
  static #HOVER_SEL =
    "a, button, .spec-card, .proj-card, .proj-wide, .team-card, .test-card, .step, .hoverable";

  #dot = null;
  #brackets = null;
  #mx = -200;
  #my = -200;
  #rx = -200;
  #ry = -200;
  #rafId = null;

  init() {
    if (!window.matchMedia("(hover: hover)").matches) return this;

    this.#dot = document.getElementById("cur-dot");
    this.#brackets = document.getElementById("cur-brackets");

    document.addEventListener("mousemove", (e) => {
      this.#mx = e.clientX;
      this.#my = e.clientY;
    });

    this.#tick();
    this.#bindHoverTargets();

    return this;
  }

  #tick() {
    // Dot: snaps directly to mouse
    this.#dot.style.left = this.#mx + "px";
    this.#dot.style.top = this.#my + "px";

    // Brackets: lerp 0.11 per frame
    this.#rx += (this.#mx - this.#rx) * 0.11;
    this.#ry += (this.#my - this.#ry) * 0.11;
    this.#brackets.style.left = this.#rx + "px";
    this.#brackets.style.top = this.#ry + "px";

    this.#rafId = requestAnimationFrame(() => this.#tick());
  }

  #bindHoverTargets() {
    document.querySelectorAll(Cursor.#HOVER_SEL).forEach((el) => {
      el.addEventListener("mouseenter", () =>
        document.body.classList.add("cur-hover"),
      );
      el.addEventListener("mouseleave", () =>
        document.body.classList.remove("cur-hover"),
      );
    });
  }

  destroy() {
    if (this.#rafId != null) cancelAnimationFrame(this.#rafId);
  }
}

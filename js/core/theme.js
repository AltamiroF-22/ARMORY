/* ============================================================
   core/theme.js
   Responsibility : light / dark theme toggle with GSAP wipe transition.
   Dark is default. Preference persists via localStorage.
   ============================================================ */

export class ThemeToggle {
  static #STORAGE_KEY = "armory-theme";
  static #DARK = "dark";
  static #LIGHT = "light";

  #overlay = null;
  #btn = null;
  #locked = false;

  init() {
    this.#overlay = document.getElementById("theme-overlay");
    this.#btn = document.getElementById("theme-btn");

    // The inline <script> in <head> already sets data-theme to prevent FOUC.
    // Here we only need to sync aria-label on the button.
    const current = document.documentElement.dataset.theme ?? ThemeToggle.#DARK;
    this.#syncBtn(current);

    this.#btn?.addEventListener("click", () => this.#toggle());

    return this;
  }

  // ─── Private ─────────────────────────────────────────────

  #toggle() {
    if (this.#locked) return;
    this.#locked = true;

    const current = document.documentElement.dataset.theme ?? ThemeToggle.#DARK;
    const next =
      current === ThemeToggle.#DARK ? ThemeToggle.#LIGHT : ThemeToggle.#DARK;

    // Overlay color matches the incoming theme's background so the wipe
    // "arrives" in the right colour before revealing the new page.
    const color = next === ThemeToggle.#LIGHT ? "#f5f0e8" : "#080808";

    gsap.set(this.#overlay, {
      scaleX: 0,
      transformOrigin: "left center",
      backgroundColor: color,
      opacity: 1,
    });

    gsap
      .timeline({
        onComplete: () => {
          this.#locked = false;
        },
      })
      .to(this.#overlay, {
        scaleX: 1,
        duration: 0.45,
        ease: "expo.inOut",
      })
      .call(() => this.#apply(next))
      .to(this.#overlay, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.45,
        ease: "expo.inOut",
      });
  }

  #apply(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(ThemeToggle.#STORAGE_KEY, theme);
    this.#syncBtn(theme);
  }

  #syncBtn(theme) {
    if (!this.#btn) return;
    this.#btn.setAttribute(
      "aria-label",
      theme === ThemeToggle.#DARK
        ? "Switch to light mode"
        : "Switch to dark mode",
    );
    this.#btn.dataset.theme = theme;
  }
}

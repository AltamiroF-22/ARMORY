/* ============================================================
   core/i18n.js
   Responsibility : locale loading, DOM translation, lang switcher
   ============================================================ */

import { en } from "../locales/en.js";
import { pt } from "../locales/pt.js";
import { de } from "../locales/de.js";
import { jp } from "../locales/jp.js";

export class I18n {
  static #locales = { en, pt, de, jp };
  static #DEFAULT = "en";
  static #STORAGE_KEY = "armory-locale";
  static #meta = {
    en: { label: "EN", flag: "🇺🇸" },
    pt: { label: "PT", flag: "🇧🇷" },
    de: { label: "DE", flag: "🇩🇪" },
    jp: { label: "JP", flag: "🇯🇵" },
  };

  #btn = null;
  #panel = null;

  init() {
    const saved = localStorage.getItem(I18n.#STORAGE_KEY) ?? I18n.#DEFAULT;
    this.#applyLocale(saved);

    this.#btn = document.getElementById("lang-btn");
    this.#panel = document.getElementById("lang-panel");

    // Move panel to <body> so it escapes the nav's mix-blend-mode stacking context
    document.body.appendChild(this.#panel);
    this.#bindEvents();

    return this;
  }

  #applyLocale(lang) {
    const t = I18n.#locales[lang] ?? I18n.#locales[I18n.#DEFAULT];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = el.dataset.i18n.split(".").reduce((o, k) => o?.[k], t);
      if (val != null) el.textContent = val;
    });

    document.documentElement.lang = lang;

    const m = I18n.#meta[lang] ?? I18n.#meta[I18n.#DEFAULT];
    const flagEl = document.getElementById("lang-flag");
    const labelEl = document.getElementById("lang-label");
    if (flagEl) flagEl.textContent = m.flag;
    if (labelEl) labelEl.textContent = m.label;

    document.querySelectorAll("#lang-panel [data-lang]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.lang === lang);
    });
  }

  #positionPanel() {
    const rect = this.#btn.getBoundingClientRect();
    this.#panel.style.top = `${rect.bottom + 8}px`;
    this.#panel.style.right = `${window.innerWidth - rect.right}px`;
  }

  #bindEvents() {
    this.#btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.#positionPanel();
      const isOpen = this.#panel.classList.toggle("is-open");
      this.#btn.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", () => {
      this.#panel?.classList.remove("is-open");
      this.#btn?.setAttribute("aria-expanded", "false");
    });

    this.#panel?.querySelectorAll("[data-lang]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const lang = item.dataset.lang;
        localStorage.setItem(I18n.#STORAGE_KEY, lang);
        this.#applyLocale(lang);
        document.dispatchEvent(new CustomEvent("locale-change", { detail: { lang } }));
        this.#panel.classList.remove("is-open");
        this.#btn?.setAttribute("aria-expanded", "false");
      });
    });
  }
}

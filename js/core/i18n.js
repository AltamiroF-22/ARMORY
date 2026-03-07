/* ============================================================
   core/i18n.js
   Responsibility : locale loading, DOM translation, lang switcher
   Exports        : initI18n()
   ============================================================ */

import { en } from "../locales/en.js";
import { pt } from "../locales/pt.js";
import { de } from "../locales/de.js";
import { jp } from "../locales/jp.js";

const locales = { en, pt, de, jp };
const DEFAULT = "en";

const meta = {
  en: { label: "EN", flag: "🇺🇸" },
  pt: { label: "PT", flag: "🇧🇷" },
  de: { label: "DE", flag: "🇩🇪" },
  jp: { label: "JP", flag: "🇯🇵" },
};

function applyLocale(lang) {
  const t = locales[lang] ?? locales[DEFAULT];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = el.dataset.i18n.split(".").reduce((o, k) => o?.[k], t);
    if (val != null) el.textContent = val;
  });

  document.documentElement.lang = lang;

  const m = meta[lang] ?? meta[DEFAULT];
  const flagEl = document.getElementById("lang-flag");
  const labelEl = document.getElementById("lang-label");
  if (flagEl) flagEl.textContent = m.flag;
  if (labelEl) labelEl.textContent = m.label;

  document.querySelectorAll("#lang-panel [data-lang]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.lang === lang);
  });
}

export function initI18n() {
  const saved = localStorage.getItem("armory-locale") ?? DEFAULT;
  applyLocale(saved);

  const btn = document.getElementById("lang-btn");
  const panel = document.getElementById("lang-panel");

  // Move panel to <body> so it escapes the nav's mix-blend-mode stacking context
  document.body.appendChild(panel);

  function positionPanel() {
    const rect = btn.getBoundingClientRect();
    panel.style.top = `${rect.bottom + 8}px`;
    panel.style.right = `${window.innerWidth - rect.right}px`;
  }

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();
    positionPanel();
    const isOpen = panel.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", () => {
    panel?.classList.remove("is-open");
    btn?.setAttribute("aria-expanded", "false");
  });

  panel?.querySelectorAll("[data-lang]").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = item.dataset.lang;
      localStorage.setItem("armory-locale", lang);
      applyLocale(lang);
      panel.classList.remove("is-open");
      btn?.setAttribute("aria-expanded", "false");
    });
  });
}

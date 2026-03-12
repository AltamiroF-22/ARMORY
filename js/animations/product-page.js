/* ============================================================
   animations/product-page.js
   Product detail page — sticky hero, gallery, specs, overview,
   related products, footer. Reads ?id= from URL to pick product.
   ============================================================ */

import { PRODUCTS } from "../data/products.js";
import { PRODUCT_SPECS } from "../data/product-specs.js";

export class ProductPage {
  #product;
  #specs;
  #qty = 1;

  prep() {
    this.#resolveProduct();
    this.#render();
    this.#setHiddenStates();
  }

  init() {
    this.#revealNav();
    this.#revealHero();
    this.#initGallery();
    this.#initParallax();
    this.#revealSpecs();
    this.#revealOverview();
    this.#revealRelated();
    this.#initFooter();
    this.#initQty();
    this.#initConfig();
    this.#initScrollProgress();

    // Re-render all locale-dependent content when language changes
    document.addEventListener("locale-change", () => {
      this.#render();
      // Re-apply i18n to data-i18n elements handled by I18n module
      gsap.set(".pd-spec-row", { opacity: 1, y: 0 });
      gsap.set(".pd-feature", { opacity: 1, x: 0 });
      gsap.set(".arsenal-card", { opacity: 1, y: 0 });
    });
  }

  // ─── Private ─────────────────────────────────────────────

  #resolveProduct() {
    const id = new URLSearchParams(location.search).get("id") ?? "recce16";
    this.#product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
    this.#specs = PRODUCT_SPECS[this.#product.id] ?? PRODUCT_SPECS["recce16"];
  }

  #render() {
    const lang = localStorage.getItem("armory-locale") ?? "en";
    const t = this.#product.locales[lang] ?? this.#product.locales.en;
    const sl = this.#specs.locales[lang] ?? this.#specs.locales.en;

    // Page title
    document.title = `${t.name} — ARMORY Tactical Store`;

    // Main image panel
    const imgEl = document.getElementById("pd-main-img");
    if (imgEl) imgEl.style.backgroundImage = `url('${this.#product.image}')`;

    // Category badge
    const badge = document.getElementById("pd-badge");
    if (badge) badge.textContent = t.cat;

    // Breadcrumb
    const crumb = document.getElementById("pd-crumb-name");
    if (crumb) crumb.textContent = t.name;

    // Eyebrow category
    const cat = document.getElementById("pd-cat");
    if (cat) cat.textContent = t.cat;

    // Product name — split each word into its own clip span
    const nameEl = document.getElementById("pd-name");
    if (nameEl) {
      const parts = t.name.split(" ");
      nameEl.innerHTML = parts
        .map(
          (word) =>
            `<span class="block overflow-hidden leading-[0.88]"><span class="pd__title-line">${word}</span></span>`
        )
        .join("");
    }

    // Price
    const priceEl = document.getElementById("pd-price");
    if (priceEl) priceEl.textContent = t.price;

    // Description (locale-aware)
    const descEl = document.getElementById("pd-desc");
    if (descEl) descEl.textContent = sl.description;

    // Quick highlights (locale-aware)
    const hlEl = document.getElementById("pd-highlights");
    if (hlEl) {
      hlEl.innerHTML = sl.highlights
        .map(
          (h) => `
        <div class="pd-highlight">
          <span class="pd-highlight__val">${h.value}</span>
          <span class="pd-highlight__label">${h.label}</span>
        </div>`
        )
        .join("");
    }

    // Specs table (locale-aware keys)
    const specsEl = document.getElementById("pd-specs-table");
    if (specsEl) {
      specsEl.innerHTML = sl.specs
        .map(
          (r) => `
        <div class="pd-spec-row">
          <span class="pd-spec__key">${r.key}</span>
          <span class="pd-spec__val">${r.val}</span>
        </div>`
        )
        .join("");
    }

    // Watermark bg text
    const bgText = document.getElementById("pd-specs-bg");
    if (bgText) bgText.textContent = t.name;

    // Features list (locale-aware)
    const featEl = document.getElementById("pd-features");
    if (featEl) {
      featEl.innerHTML = sl.features
        .map((f) => `<li class="pd-feature">${f}</li>`)
        .join("");
    }

    // Overview image
    const ovImg = document.getElementById("pd-overview-img");
    if (ovImg) ovImg.style.backgroundImage = `url('${this.#product.image}')`;

    // Gallery
    const galleryEl = document.getElementById("pd-gallery-track");
    if (galleryEl) {
      galleryEl.innerHTML = this.#specs.gallery
        .map(
          (url) =>
            `<div class="pd-gallery__item" style="background-image:url('${url}')"></div>`
        )
        .join("");
    }

    // Image counter total
    const total = document.getElementById("pd-img-total");
    if (total) total.textContent = String(this.#specs.gallery.length).padStart(2, "0");

    // Related products (exclude current)
    const relatedEl = document.getElementById("pd-related-grid");
    if (relatedEl) {
      const related = PRODUCTS.filter((p) => p.id !== this.#product.id);
      relatedEl.innerHTML = related
        .map((p, i) => {
          const rt = p.locales[lang] ?? p.locales.en;
          const num = String(i + 1).padStart(2, "0");
          return `
          <div class="arsenal-card hoverable">
            <div class="arsenal-card__img-wrap">
              <div class="arsenal-card__img" style="background-image:url('${p.image}')"></div>
              <span class="arsenal-card__badge">${num}</span>
            </div>
            <div class="arsenal-card__body">
              <span class="arsenal-card__cat">${rt.cat}</span>
              <h3 class="arsenal-card__name">${rt.name}</h3>
              <div class="arsenal-card__footer">
                <span class="arsenal-card__price">${rt.price}</span>
                <a href="product.html?id=${p.id}" class="arsenal-card__link hoverable" aria-label="View ${rt.name}">
                  <i data-lucide="arrow-right" width="13" height="13" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>`;
        })
        .join("");

      window.lucide?.createIcons({
        nodes: Array.from(relatedEl.querySelectorAll("[data-lucide]")),
      });
    }
  }

  #setHiddenStates() {
    gsap.set(".nav", { opacity: 0 });
    gsap.set("#pd-breadcrumb", { opacity: 0, y: 10 });
    gsap.set("#pd-eyebrow", { opacity: 0, y: 16 });
    gsap.set(".pd__title-line", { yPercent: 100 });
    gsap.set("#pd-price-row", { opacity: 0, y: 20 });
    gsap.set("#pd-desc", { opacity: 0, y: 20 });
    gsap.set("#pd-highlights", { opacity: 0, y: 20 });
    gsap.set("#pd-config", { opacity: 0, y: 16 });
    gsap.set("#pd-actions", { opacity: 0, y: 16 });
    gsap.set("#pd-wishlist", { opacity: 0 });
    gsap.set("#pd-delivery", { opacity: 0 });
    gsap.set(".pd-img", { scale: 1.06 });
    gsap.set(".pd-specs__label-line", { yPercent: 100 });
    gsap.set(".pd-specs__sub", { opacity: 0, y: 20 });
    gsap.set(".pd-spec-row", { opacity: 0, y: 28 });
    gsap.set(".pd-overview__title-line", { yPercent: 100 });
    gsap.set(".pd-overview__desc", { opacity: 0, y: 20 });
    gsap.set(".pd-feature", { opacity: 0, x: -20 });
    gsap.set(".pd-overview__img-wrap", { opacity: 0, x: 40 });
    gsap.set(".pd-related__title-line", { yPercent: 100 });
    gsap.set(".pd-related__viewall", { opacity: 0 });
    gsap.set(".arsenal-card", { opacity: 0, y: 60 });
    gsap.set("#footer-logo", { yPercent: 108 });
    gsap.set("#footer-tagline", { opacity: 0 });
    gsap.set(".footer__col-title", { opacity: 0, y: 14 });
    gsap.set(".footer__link", { opacity: 0, y: 10 });
    gsap.set(".footer__copy", { opacity: 0 });
    gsap.set(".footer__back-top", { opacity: 0 });
  }

  // ── Nav fade in ──────────────────────────────────────────

  #revealNav() {
    gsap.to(".nav", { opacity: 1, duration: 0.8, ease: "expo.out" });
  }

  // ── Hero staggered reveal ────────────────────────────────

  #revealHero() {
    gsap
      .timeline()
      .to(".pd-img", { scale: 1, duration: 1.8, ease: "expo.out" })
      .to(
        "#pd-breadcrumb",
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=1.4"
      )
      .to(
        "#pd-eyebrow",
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        "-=1.2"
      )
      .to(
        ".pd__title-line",
        { yPercent: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" },
        "-=1.0"
      )
      .to(
        "#pd-price-row",
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        "-=0.8"
      )
      .to(
        "#pd-desc",
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        "-=0.6"
      )
      .to(
        "#pd-highlights",
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.55"
      )
      .to(
        "#pd-config",
        { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" },
        "-=0.5"
      )
      .to(
        "#pd-actions",
        { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" },
        "-=0.45"
      )
      .to(
        "#pd-wishlist",
        { opacity: 1, duration: 0.4, ease: "expo.out" },
        "-=0.35"
      )
      .to(
        "#pd-delivery",
        { opacity: 1, duration: 0.4, ease: "expo.out" },
        "-=0.3"
      );
  }

  // ── Gallery drag + reveal ────────────────────────────────

  #initGallery() {
    const track = document.getElementById("pd-gallery-track");
    if (!track) return;

    gsap.from(track.querySelectorAll(".pd-gallery__item"), {
      opacity: 0,
      x: 60,
      duration: 1,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#pd-gallery",
        start: "top 80%",
        once: true,
      },
    });

    // Draggable horizontal strip — must receive DOM node
    const wrap = document.querySelector(".pd-gallery__track-wrap");
    const refreshBounds = () => {
      const maxX = -(track.scrollWidth - (wrap?.offsetWidth ?? 0));
      Draggable.create(track, {
        type: "x",
        bounds: { minX: Math.min(maxX, 0), maxX: 0 },
        edgeResistance: 0.8,
      });
    };
    // Wait a tick for images to lay out
    requestAnimationFrame(refreshBounds);
  }

  // ── Parallax on overview image ───────────────────────────

  #initParallax() {
    gsap.to(".pd-overview__img", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: "#pd-overview",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // ── Tech specs reveal ────────────────────────────────────

  #revealSpecs() {
    gsap
      .timeline({
        scrollTrigger: { trigger: "#pd-specs", start: "top 75%", once: true },
      })
      .to(".pd-specs__label-line", {
        yPercent: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
      })
      .to(
        ".pd-specs__sub",
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
        "-=0.6"
      );

    gsap.to(".pd-spec-row", {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.06,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#pd-specs-table",
        start: "top 82%",
        once: true,
      },
    });
  }

  // ── Overview reveal ──────────────────────────────────────

  #revealOverview() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#pd-overview",
          start: "top 75%",
          once: true,
        },
      })
      .to(".pd-overview__title-line", {
        yPercent: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
      })
      .to(
        ".pd-overview__desc",
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
        "-=0.6"
      )
      .to(
        ".pd-feature",
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" },
        "-=0.5"
      )
      .to(
        ".pd-overview__img-wrap",
        { opacity: 1, x: 0, duration: 1, ease: "expo.out" },
        "<"
      );
  }

  // ── Related products reveal ──────────────────────────────

  #revealRelated() {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#pd-related",
          start: "top 78%",
          once: true,
        },
      })
      .to(".pd-related__title-line", {
        yPercent: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      })
      .to(
        ".pd-related__viewall",
        { opacity: 1, duration: 0.6, ease: "expo.out" },
        "-=0.5"
      );

    gsap.to(".arsenal-card", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#pd-related-grid",
        start: "top 82%",
        once: true,
      },
    });
  }

  // ── Footer (mirrors Footer class behavior) ───────────────

  #initFooter() {
    gsap
      .timeline({
        scrollTrigger: { trigger: "#footer", start: "top 85%", once: true },
      })
      .to("#footer-logo", { yPercent: 0, duration: 1.5, ease: "expo.out" })
      .to(
        "#footer-tagline",
        { opacity: 1, duration: 0.9, ease: "expo.out" },
        "-=0.75"
      );

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
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.035, ease: "expo.out" },
        "-=0.4"
      );

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

    document
      .getElementById("footer-back-top")
      ?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }

  // ── Quantity selector ────────────────────────────────────

  #initQty() {
    const valEl = document.getElementById("pd-qty-val");

    document.getElementById("pd-qty-plus")?.addEventListener("click", () => {
      this.#qty++;
      if (valEl) valEl.textContent = String(this.#qty);
      gsap.from(valEl, { y: -8, opacity: 0, duration: 0.25, ease: "back.out(1.4)" });
    });

    document.getElementById("pd-qty-minus")?.addEventListener("click", () => {
      if (this.#qty > 1) {
        this.#qty--;
        if (valEl) valEl.textContent = String(this.#qty);
        gsap.from(valEl, { y: 8, opacity: 0, duration: 0.25, ease: "back.out(1.4)" });
      }
    });
  }

  // ── Config option buttons ────────────────────────────────

  #initConfig() {
    document.querySelectorAll(".pd-config__opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".pd-config__opt")
          .forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      });
    });
  }

  // ── Thin scroll progress bar ─────────────────────────────

  #initScrollProgress() {
    const bar = document.getElementById("pd-progress");
    if (!bar) return;

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`;
        },
      },
    });
  }
}

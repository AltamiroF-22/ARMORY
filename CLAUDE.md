# CLAUDE.md — Project Context

## What this project is

A single-page tactical/military-themed website built with **vanilla JS (native ESM)**, **GSAP**, **Lenis**, and **Tailwind CSS v4**. No bundler — the browser loads modules directly.

---

## Project structure

```
root/
├── index.html              # All markup lives here — single entry point
├── css/
│   ├── input.css           # Source — edit this only
│   └── output.css          # Generated — NEVER edit manually
├── js/
│   ├── main.js             # Boot orchestrator — init sequence only
│   ├── core/               # Infrastructure (gsap.setup, lenis, i18n, cursor, nav)
│   ├── animations/         # One class per section/feature
│   ├── lib/                # Vendored: SplitText.js (GSAP Club, local copy)
│   └── locales/            # en.js, pt.js, de.js, jp.js
└── docs/                   # Full reference docs (conventions, design-tokens, structure)
```

---

## Architecture — ES6 classes, OOP

Every module exports **one ES6 class**. No named function exports, no module-level state.

```js
// correct
export class Hero {
  prep() { ... }       // public — set hidden initial states
  init() { ... }       // public — run animations
  #animateNav() { ... } // private — all helpers are #private
}
```

- Public API: only `init()`, `prep()`, `destroy()` (and `static init()` when stateless).
- All helpers: `#privateMethod()` — never exported, never underscore-prefixed.
- State: `#privateFields` only — never module-level variables.
- Shared constants: `static #UPPER_SNAKE` on the owning class.

---

## Boot sequence — `main.js` (order is strict)

```js
GsapSetup.init();     // 1 — register plugins before anything touches GSAP
const hero = new Hero();
hero.prep();          // 2 — hide hero elements (prevents flash)
new Cursor().init();  // 3
new NavMenu().init(); // 4
new I18n().init();    // 5 — translate DOM before visible
new LenisScroll().init(); // 6
new Loader().init(() => {
  hero.init();        // 7 — animations only after loader exits
});
```

`hero.prep()` must always be called before `new Loader().init()`. New sections follow the same `prep()` → `init()` pattern.

---

## Animation rules

- Never use `delay:` on entry animations. Use `stagger` or timeline sequencing instead.
- Never put two separate `gsap.to()` calls on the same property of the same element — use `gsap.timeline()`.
- Reveal → idle loop must share one timeline (no overwrite):

```js
// correct
gsap.timeline()
  .to(el, { rotate: 0, opacity: 1, duration: 1.5, ease: "expo.out" })
  .to(el, { rotation: "+=360", duration: 40, repeat: -1, ease: "none" });

// wrong — second tween overwrites rotate
gsap.to(el, { rotate: 0, duration: 1.5 });
gsap.to(el, { rotate: 360, repeat: -1, delay: 1.5 });
```

- Infinite idle animations: use `rotation: "+=360"` (relative), not `rotate: 360` (absolute).
- `Draggable.create()` always receives DOM nodes — never string selectors.
- `InertiaPlugin` is NOT available (GSAP Club). Do not use `inertia: true`.

---

## GSAP plugins

| Plugin        | Source          | Registered in             |
|---------------|-----------------|---------------------------|
| ScrollTrigger | CDN             | `GsapSetup.init()`        |
| Flip          | CDN             | `GsapSetup.init()`        |
| Draggable     | CDN             | `GsapSetup.init()`        |
| SplitText     | `js/lib/`       | imported in each module   |

---

## CSS — `css/input.css`

Three layers — placement is strict:

| Layer               | What goes here                                                                 |
|---------------------|--------------------------------------------------------------------------------|
| `@theme`            | Design tokens only (colors, fonts, easing)                                     |
| `@layer base`       | Global resets, `html`/`body`, fluid type scale CSS vars                        |
| `@layer components` | `mix-blend-mode`, `will-change`, GSAP initial states, `@keyframes`, gradients |

- Never write component styles inside `index.html` `<style>` tags.
- Use Tailwind utilities in HTML for layout, spacing, responsive.
- Use `@layer components` only when a Tailwind utility genuinely cannot do the job.
- After every `input.css` change run `npm run build`. Never edit `output.css`.

---

## Design tokens (key values)

**Colors:** `black` #080808, `dark` #111111, `mid` #1c1c1c, `surface` #242424, `white` #f0ede8, `gold` #c8a96e, `gold-dim` #8a7249, `red` #b8282a, `border` rgba(255,255,255,0.08)

**Fonts:** `font-display` → Bebas Neue, `font-body` → Inter

**Easing (GSAP):** `"expo.out"` for reveals, `"expo.in"` for exits, `"expo.inOut"` for loader/nav, `"back.out(1.4)"` for spring, `"none"` for scrub/idle.

---

## HTML conventions

- `id` attributes for unique GSAP targets (`#hero-bg`, `#hero-crosshair`).
- Classes for repeated elements with stagger (`.hero__title-line`).
- ScrollTrigger `trigger` uses `#id` selectors.
- Every visible text node needs `data-i18n="section.key"`.
- Title clip pattern: outer `<span class="block overflow-hidden">` clips, inner `<span>` slides. Never put `overflow: hidden` and GSAP `translateY` on the same element.

---

## i18n

- Four locales: `en`, `pt`, `de`, `jp`. All must have identical key structure.
- Add new keys to **all four** locale files at the same time.
- Default: `en`. Persisted in `localStorage` key `armory-locale`.

---

## Naming

| Thing                   | Pattern               | Example                        |
|-------------------------|-----------------------|--------------------------------|
| Module class            | `PascalCase`          | `Hero`, `LenisScroll`          |
| Public method           | `camelCase`           | `init()`, `prep()`, `destroy()`|
| Private method/field    | `#camelCase`          | `#animateNav()`, `#lenis`      |
| Static class constant   | `static #UPPER_SNAKE` | `static #HOVER_SEL`            |
| HTML id (GSAP target)   | `section-element`     | `hero-crosshair`, `cur-dot`    |
| BEM component class     | `block__element`      | `hero__title-line`             |
| Locale key              | `section.element`     | `hero.eyebrow`, `nav.login`    |

---

## Commands

```bash
npm run build   # compile input.css → output.css (one-shot)
npm run dev     # watch mode
```

Full reference docs: [docs/conventions.md](docs/conventions.md) · [docs/design-tokens.md](docs/design-tokens.md) · [docs/structure.md](docs/structure.md)

# Coding Conventions

## Architecture — Object-Oriented JavaScript

All modules export a single **ES6 class**. No named function exports, no module-level state.

```js
// ✅ correct
export class Hero {
  prep() { ... }   // public
  init() { ... }   // public
  #animateNav() { ... }  // private
}

// ❌ wrong
export function initHero() { ... }
export function prepHero() { ... }
```

**Rules:**

- Public API: only `init()`, `prep()`, `destroy()` (and `static init()` where stateless).
- All helpers are `#privateMethod()` — never exported, never underscore-prefixed.
- State lives in `#privateFields`, never in module-level variables.
- Constants shared across methods are `static #CONSTANT` on the class.

---

## Boot sequence — `main.js`

The order is strict and must not be changed:

```js
GsapSetup.init(); // 1 — register plugins before anything touches GSAP

const hero = new Hero();
hero.prep(); // 2 — set hero elements to hidden (prevents flash)

new Cursor().init(); // 3 — cursor active immediately
new NavMenu().init(); // 4 — mobile nav ready
new I18n().init(); // 5 — translate DOM before anything is visible
new LenisScroll().init(); // 6 — smooth scroll running before animations

new Loader().init(() => {
  hero.init(); // 7 — hero animations only fire after loader exits
});
```

**Rule:** `hero.prep()` must always be called before `new Loader().init()`. If you add a new section, create a `SectionName` class with `prep()` / `init()` and call `prep()` in the same pre-loader block.

---

## Animation modules — `js/animations/`

Each section gets its own file with one class. Follow this structure exactly:

```js
// animations/example.js

export class Example {
  /** Sets elements to hidden initial states. Call before Loader.init(). */
  prep() {
    gsap.set("#example-el", { opacity: 0, y: 30 });
  }

  /** Runs the reveal animations. Call inside the Loader onComplete callback. */
  init() {
    this.#animateSomething();
  }

  #animateSomething() {
    gsap.to("#example-el", { opacity: 1, y: 0, duration: 1, ease: "expo.out" });
  }
}
```

**Rules:**

- Only `prep()` and `init()` are public — everything else is `#private`.
- Never use `delay:` on entry animations. All tweens start at `t = 0`; visual hierarchy comes from `stagger` or timeline sequencing.
- Never put two separate `gsap.to()` calls on the same property of the same element. Use `gsap.timeline()` to chain them.
- For infinite idle animations after a reveal, always chain with `.to()` on the same timeline using `rotation: "+=360"` (relative), not `rotate: 360` (absolute).
- Always pass actual DOM nodes to `Draggable.create()` — never string selectors.

---

## GSAP property conflict rule

When one element needs a **reveal** tween followed by an **idle loop**, they must share a timeline:

```js
// ✅ correct — chained, no overwrite
gsap
  .timeline()
  .to(el, { rotate: 0, opacity: 1, duration: 1.5, ease: "expo.out" })
  .to(el, { rotation: "+=360", duration: 40, repeat: -1, ease: "none" });

// ❌ wrong — second tween overwrites rotate at delay:1.5
gsap.to(el, { rotate: 0, duration: 1.5 });
gsap.to(el, { rotate: 360, repeat: -1, delay: 1.5 });
```

---

## CSS — `input.css`

Three layers. Follow the placement rules strictly.

| Layer               | What goes here                                                                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@theme`            | Design tokens only (colors, fonts, easing)                                                                                                                |
| `@layer base`       | Global resets, `html`/`body`, fluid type scale CSS vars                                                                                                   |
| `@layer components` | Component classes that Tailwind utilities cannot express: `mix-blend-mode`, `will-change`, GSAP initial transform states, `@keyframes`, complex gradients |

**Rules:**

- Never write component styles directly in `index.html` `<style>` tags.
- Use Tailwind utilities in HTML for layout, spacing, and responsive design.
- Put a rule in `@layer components` only when a Tailwind utility genuinely cannot do the job (e.g. `mix-blend-mode: difference`, `will-change`, complex `background-image`).
- After every change to `input.css`, run `npm run build` to regenerate `output.css`. Never edit `output.css` directly.

---

## HTML — `index.html`

### Selectors for GSAP

- Use `id` attributes for unique elements targeted by GSAP (`#hero-bg`, `#hero-crosshair`).
- Use classes only for repeated elements targeted with stagger (`.hero__title-line`).
- ScrollTrigger `trigger` uses `#id` selectors, not `.class`.

### i18n — translatable text

Every user-visible text node must have `data-i18n="section.key"`:

```html
<span data-i18n="hero.eyebrow">Limited Edition 2026</span>
```

The key path maps to the locale object structure in `js/locales/*.js`. The value in the HTML is the English fallback and serves as a readable placeholder.

### Title line clip mask pattern

Hero title lines use a two-element wrapper pattern — the outer `<span>` clips, the inner slides:

```html
<span class="block overflow-hidden leading-[0.88]">
  <span class="hero__title-line" data-i18n="hero.line1">FORCE</span>
</span>
```

Never put `overflow: hidden` and a GSAP `translateY` on the same element.

---

## i18n — `js/locales/`

Each locale file exports a single named const matching the filename:

```js
// locales/en.js
export const en = {
  nav: { arsenal: "Arsenal", ... },
  hero: { eyebrow: "...", line1: "...", ... },
  sections: { arsenal: "...", ... },
};
```

**Rules:**

- All locales must have identical key structure. Missing keys silently fall back to `undefined` (no text rendered).
- Add new keys to **all four** locale files at the same time.
- Default language is `en`. The user's choice is persisted in `localStorage` under the key `armory-locale`.

---

## Naming

| Thing                    | Pattern               | Example                                |
| ------------------------ | --------------------- | -------------------------------------- |
| Module class             | `PascalCase`          | `Hero`, `LenisScroll`, `NavMenu`       |
| Public method            | `camelCase`           | `init()`, `prep()`, `destroy()`        |
| Private method / field   | `#camelCase`          | `#animateNav()`, `#lenis`, `#isOpen`   |
| Static class constant    | `static #UPPER_SNAKE` | `static #HOVER_SEL`, `static #DEFAULT` |
| HTML id for GSAP targets | `section-element`     | `hero-crosshair`, `hero-bg`, `cur-dot` |
| BEM component class      | `block__element`      | `hero__title-line`, `loader__bar`      |
| Locale key               | `section.element`     | `hero.eyebrow`, `nav.login`            |

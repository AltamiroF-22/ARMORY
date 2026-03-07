# Design Tokens

All tokens are declared in `css/input.css` inside `@theme` and become Tailwind utilities automatically.

---

## Colors

| Token              | Value                    | Tailwind utility                      | Usage                    |
| ------------------ | ------------------------ | ------------------------------------- | ------------------------ |
| `--color-black`    | `#080808`                | `bg-black`, `text-black`              | Page background          |
| `--color-dark`     | `#111111`                | `bg-dark`                             | Section backgrounds      |
| `--color-mid`      | `#1c1c1c`                | `bg-mid`                              | Cards, elevated surfaces |
| `--color-surface`  | `#242424`                | `bg-surface`                          | Inputs, tooltips         |
| `--color-white`    | `#f0ede8`                | `text-white`, `bg-white`              | Primary text             |
| `--color-gold`     | `#c8a96e`                | `text-gold`, `bg-gold`, `border-gold` | Brand accent, CTAs       |
| `--color-gold-dim` | `#8a7249`                | `text-gold-dim`                       | Secondary/muted gold     |
| `--color-red`      | `#b8282a`                | `text-red`, `bg-red`                  | Danger, alerts           |
| `--color-border`   | `rgba(255,255,255,0.08)` | `border-border`                       | Subtle dividers          |

---

## Typography

| Token            | Value                      | Tailwind utility |
| ---------------- | -------------------------- | ---------------- |
| `--font-display` | `"Bebas Neue", sans-serif` | `font-display`   |
| `--font-body`    | `"Inter", sans-serif`      | `font-body`      |

**Fluid type scale** — calibrated HD (1920px) → QHD (2560px) → 4K (3840px). Use via CSS `var()` or inline Tailwind `text-[var(--fs-h1)]`:

| Variable       | Range                            |
| -------------- | -------------------------------- |
| `--fs-display` | `clamp(3rem, 10vw, 16rem)`       |
| `--fs-h1`      | `clamp(2.25rem, 5vw, 8rem)`      |
| `--fs-h2`      | `clamp(1.75rem, 3.5vw, 5rem)`    |
| `--fs-h3`      | `clamp(1.35rem, 2.4vw, 3.25rem)` |
| `--fs-h4`      | `clamp(1.1rem, 1.8vw, 2.25rem)`  |
| `--fs-body`    | `clamp(0.9rem, 1.1vw, 1.2rem)`   |
| `--fs-small`   | `clamp(0.75rem, 0.85vw, 1rem)`   |
| `--fs-label`   | `clamp(0.6rem, 0.75vw, 0.9rem)`  |

---

## Spacing

CSS custom properties used by component CSS and GSAP modules:

| Variable      | Value   |
| ------------- | ------- |
| `--space-xs`  | `4px`   |
| `--space-s`   | `8px`   |
| `--space-m`   | `16px`  |
| `--space-l`   | `32px`  |
| `--space-xl`  | `64px`  |
| `--space-2xl` | `128px` |

---

## Easing

Declared in `@theme` so they work as CSS `transition-timing-function` values and are available as `var()` references in JS.

| Token             | Curve                           | Use                                          |
| ----------------- | ------------------------------- | -------------------------------------------- |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Nearly all GSAP reveal tweens (`"expo.out"`) |
| `--ease-in-expo`  | `cubic-bezier(0.7, 0, 0.84, 0)` | Exit / out animations                        |

In GSAP, equivalent string aliases are used directly:

```js
ease: "expo.out"; // ← same curve as --ease-out-expo
ease: "expo.in"; // ← same curve as --ease-in-expo
ease: "expo.inOut"; // ← loader slide-up, nav overlay
ease: "back.out(1.4)"; // ← spring/bounce reveals
ease: "power2.out"; // ← mouse-driven parallax (softer)
ease: "none"; // ← scrub-based ScrollTrigger, idle rotations
```

---

## GSAP Plugins (loaded via CDN)

| Plugin          | Source            | Registered in                              |
| --------------- | ----------------- | ------------------------------------------ |
| `ScrollTrigger` | CDN               | `GsapSetup.init()` in `core/gsap.setup.js` |
| `Flip`          | CDN               | `GsapSetup.init()` in `core/gsap.setup.js` |
| `Draggable`     | CDN               | `GsapSetup.init()` in `core/gsap.setup.js` |
| `SplitText`     | Local (`js/lib/`) | imported directly in animation modules     |

> `InertiaPlugin` is **not available** (GSAP Club). Do not use `inertia: true` on `Draggable.create()`.

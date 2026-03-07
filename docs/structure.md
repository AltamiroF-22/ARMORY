# Project Structure

```
root/
├── index.html              # Single-page entry point — all markup lives here
├── package.json            # Tailwind CLI scripts only (build / dev)
├── .gitignore
│
├── css/
│   ├── input.css           # Source — edit this file only
│   └── output.css          # Generated — never edit manually
│
├── js/
│   ├── main.js             # Boot orchestrator — imports + init sequence only
│   │
│   ├── core/               # Infrastructure — framework glue, no animation logic
│   │   ├── gsap.setup.js   # GsapSetup — registers all GSAP plugins once (static)
│   │   ├── lenis.js        # LenisScroll — smooth scroll + GSAP ticker sync
│   │   ├── i18n.js         # I18n — locale loading, DOM translation, lang switcher
│   │   ├── cursor.js       # Cursor — custom tactical targeting brackets cursor
│   │   └── nav.js          # NavMenu — mobile/tablet GSAP overlay menu
│   │
│   ├── animations/         # One class per section/feature
│   │   ├── loader.js       # Loader — loading screen sequence
│   │   └── hero.js         # Hero — reveal + parallax + interactions
│   │
│   ├── lib/                # Vendored third-party files
│   │   └── SplitText.js    # GSAP SplitText (club plugin, local copy)
│   │
│   └── locales/            # i18n string maps — one file per language
│       ├── en.js
│       ├── pt.js
│       ├── de.js
│       └── jp.js
│
└── docs/                   # Project documentation (this folder)
    ├── structure.md        # ← you are here
    ├── conventions.md      # Coding patterns and rules to follow
    └── design-tokens.md    # All design tokens (colors, fonts, spacing)
```

## Architecture — Object-Oriented JavaScript (SRP · DRY · SOLID)

All JS modules are written as **ES6 classes** following OOP principles:

- **SRP (Single Responsibility):** each class owns exactly one concern — `LenisScroll` only manages smooth scroll, `Cursor` only manages the cursor, `Hero` only manages the hero section. No class does two jobs.
- **DRY (Don't Repeat Yourself):** shared config (hover selectors, locale keys, storage keys) lives as `static` private fields on the class that owns it — never duplicated across files.
- **OCP (Open/Closed):** private methods handle internal sub-steps (`#animateNav`, `#animateContent`, etc.) — new behaviour is added by extending, not by modifying existing methods.
- **Private fields (`#`):** all internal state and helper methods use native JS private class fields, preventing external mutation and making the public API explicit (`init()`, `destroy()`).
- **Static where appropriate:** `GsapSetup.init()` is static because it has no instance state. `I18n.#locales`, `I18n.#meta` are static private because they are class-level constants.

### Module responsibilities

| File                   | Class         | Public API               |
| ---------------------- | ------------- | ------------------------ |
| `core/gsap.setup.js`   | `GsapSetup`   | `static init()`          |
| `core/lenis.js`        | `LenisScroll` | `init()`, `get instance` |
| `core/i18n.js`         | `I18n`        | `init()`                 |
| `core/cursor.js`       | `Cursor`      | `init()`, `destroy()`    |
| `core/nav.js`          | `NavMenu`     | `init()`                 |
| `animations/loader.js` | `Loader`      | `init(onComplete)`       |
| `animations/hero.js`   | `Hero`        | `prep()`, `init()`       |

## Key principles

- **No build pipeline beyond Tailwind.** JS is native ESM loaded directly by the browser — no bundler (Vite, Webpack, etc.).
- **GSAP and Lenis are loaded from CDN** via `<script>` tags in `index.html` before `main.js`, making them available as globals (`gsap`, `ScrollTrigger`, `Draggable`, `Lenis`).
- **SplitText** is a GSAP Club plugin vendored locally in `js/lib/`.
- **`output.css` is generated.** Run `npm run build` (one-shot) or `npm run dev` (watch mode) after editing `input.css`.

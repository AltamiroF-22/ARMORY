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
│   ├── main.js             # Boot orchestrator (imports + init sequence)
│   │
│   ├── core/               # Infrastructure — framework glue, no animations
│   │   ├── gsap.setup.js   # Registers all GSAP plugins once
│   │   ├── lenis.js        # Smooth scroll (Lenis + GSAP ticker sync)
│   │   └── i18n.js         # Locale loading, DOM translation, lang switcher
│   │
│   ├── animations/         # One file per section/feature
│   │   ├── loader.js       # Loading screen sequence
│   │   └── hero.js         # Hero reveal + parallax + interactions
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

## Key principles

- **No build pipeline beyond Tailwind.** JS is native ESM loaded directly by the browser — no bundler (Vite, Webpack, etc.).
- **GSAP and Lenis are loaded from CDN** via `<script>` tags in `index.html` before `main.js`, making them available as globals (`gsap`, `ScrollTrigger`, `Draggable`, `Lenis`).
- **SplitText** is a GSAP Club plugin vendored locally in `js/lib/`.
- **`output.css` is generated.** Run `npm run build` (one-shot) or `npm run dev` (watch mode) after editing `input.css`.

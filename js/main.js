/* ============================================================
   main.js — Entry point
   Responsibility : orchestrate module imports and boot sequence
   ============================================================

   Module tree
   ├─ core/gsap.setup.js      → registers GSAP plugins
   ├─ core/lenis.js           → smooth scroll
   ├─ animations/loader.js   → loading screen
   ├─ animations/hero.js     → hero reveal + interactions
   └─ lib/SplitText.js       → (used internally by loader + hero)
   ============================================================ */

import "./core/gsap.setup.js";
import { initLenis } from "./core/lenis.js";
import { initLoader } from "./animations/loader.js";
import { initHero, prepHero } from "./animations/hero.js";
import { initI18n } from "./core/i18n.js";

initI18n();
initLenis();
prepHero();

initLoader(() => {
  initHero();
});

/* ============================================================
   main.js — Entry point
   Responsibility : orchestrate module imports and boot sequence
   ============================================================
*/

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

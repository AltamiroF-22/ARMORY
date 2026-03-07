/* ============================================================
   main.js — Entry point
   Responsibility : orchestrate module imports and boot sequence
   ============================================================
*/

import { GsapSetup } from "./core/gsap.setup.js";
import { LenisScroll } from "./core/lenis.js";
import { I18n } from "./core/i18n.js";
import { Loader } from "./animations/loader.js";
import { Hero } from "./animations/hero.js";
import { Cursor } from "./core/cursor.js";

GsapSetup.init();

const hero = new Hero();

hero.prep();

new Cursor().init();

new I18n().init();

new LenisScroll().init();

new Loader().init(() => {
  hero.init();
});

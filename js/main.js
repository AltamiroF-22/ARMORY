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
import { Arsenal } from "./animations/arsenal.js";
import { Ammo } from "./animations/ammo.js";
import { Contact } from "./animations/contact.js";
import { Footer } from "./animations/footer.js";
import { Cursor } from "./core/cursor.js";
import { NavMenu } from "./core/nav.js";
import { ThemeToggle } from "./core/theme.js";
import { AuthOverlay } from "./core/auth.js";

GsapSetup.init();

const hero = new Hero();

const arsenal = new Arsenal();

const ammo = new Ammo();
const contact = new Contact();
const footer = new Footer();

hero.prep();

arsenal.prep();

ammo.prep();

contact.prep();

footer.prep();

new Cursor().init();

new NavMenu().init();

new ThemeToggle().init();

new AuthOverlay().init();

new I18n().init();

new LenisScroll().init();

new Loader().init(() => {
  hero.init();

  arsenal.init();

  ammo.init();

  contact.init();

  footer.init();
});

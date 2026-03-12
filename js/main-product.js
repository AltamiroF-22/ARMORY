/* ============================================================
   main-product.js — Entry point for product detail page
   Boot sequence mirrors main.js; Hero/Arsenal/Ammo/Contact
   are replaced by ProductPage.
   ============================================================ */

import { GsapSetup } from "./core/gsap.setup.js";
import { LenisScroll } from "./core/lenis.js";
import { I18n } from "./core/i18n.js";
import { Loader } from "./animations/loader.js";
import { ProductPage } from "./animations/product-page.js";
import { Cursor } from "./core/cursor.js";
import { NavMenu } from "./core/nav.js";
import { ThemeToggle } from "./core/theme.js";
import { AuthOverlay } from "./core/auth.js";

GsapSetup.init();

const productPage = new ProductPage();

productPage.prep();

new Cursor().init();

new NavMenu().init();

new ThemeToggle().init();

new AuthOverlay().init();

new I18n().init();

new LenisScroll().init();

new Loader().init(() => {
  productPage.init();
});

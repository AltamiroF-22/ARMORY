/* ============================================================
   core/gsap.setup.js
   Responsibility : register all GSAP plugins once, globally
   ============================================================ */

export class GsapSetup {
  static init() {
    gsap.registerPlugin(ScrollTrigger, Flip, Draggable);
  }
}

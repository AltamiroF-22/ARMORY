/* ============================================================
   lib/SplitText.js
   Lightweight SplitText — API-compatible with GSAP Club SplitText
   Responsibility : split DOM text into .chars[] / .words[] spans
   ============================================================ */

export class SplitText {
  constructor(el, options = {}) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.chars = [];
    this.words = [];
    this._original = this.el.innerHTML;
    this._split(options.type || "chars");
  }

  _split(type) {
    const el = this.el;
    const text = el.textContent.trim();
    el.textContent = "";

    text.split(/\s+/).forEach((word, wi, arr) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.style.cssText = "display:inline-block;";

      if (type === "chars") {
        [...word].forEach((ch) => {
          const s = document.createElement("span");
          s.className = "char";
          s.style.cssText = "display:inline-block;";
          s.textContent = ch;
          wordSpan.appendChild(s);
          this.chars.push(s);
        });
      } else {
        wordSpan.textContent = word;
      }

      this.words.push(wordSpan);
      el.appendChild(wordSpan);
      if (wi < arr.length - 1)
        el.appendChild(document.createTextNode("\u00a0"));
    });
  }

  revert() {
    this.el.innerHTML = this._original;
    this.chars = [];
    this.words = [];
  }
}

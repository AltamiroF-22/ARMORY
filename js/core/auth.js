/* ============================================================
   core/auth.js
   Responsibility : Auth overlay — Login & Register with GSAP
   animations. User data persisted to localStorage.

   localStorage keys:
     armory-users   → JSON array  [{ name, email, password }]
     armory-user    → JSON object { name, email }  (session)

   Passwords are encoded with btoa() — not cryptographically
   secure, but avoids plaintext in DevTools for a demo project.
   ============================================================ */

import { en } from '../locales/en.js';
import { pt } from '../locales/pt.js';
import { de } from '../locales/de.js';
import { jp } from '../locales/jp.js';

const USERS_KEY   = 'armory-users';
const SESSION_KEY = 'armory-user';
const LOCALE_KEY  = 'armory-locale';
const LOCALES     = { en, pt, de, jp };

export class AuthOverlay {
  #mode   = 'login'; // 'login' | 'register'
  #isOpen = false;

  init() {
    this.#setupInitialState();
    this.#bindTriggers();
    this.#bindClose();
    this.#bindSwitch();
    this.#bindForms();
    this.#updateNav();

    // Re-apply logged-in state after locale changes
    document.addEventListener('locale-change', () => {
      if (this.#getSession()) this.#updateNav();
    });
  }

  // ─── Public ──────────────────────────────────────────────

  open(mode = 'login') {
    if (this.#isOpen) return;
    this.#isOpen = true;
    document.body.classList.add('auth-open');

    this.#showForm(mode, false); // instant — no animation before reveal
    this.#updateMemberCount();

    const overlay = document.getElementById('auth-overlay');
    overlay.setAttribute('aria-hidden', 'false');

    const formEls = this.#getActiveFormEls();

    gsap.timeline()
      .to('.auth__backdrop',
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
      .fromTo('.auth__visual',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.out' },
        '-=0.25'
      )
      .to('.auth__panel',
        { opacity: 1, duration: 0.9, ease: 'expo.out' },
        '-=0.85'
      )
      .fromTo(formEls,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.055, ease: 'expo.out' },
        '-=0.55'
      )
      .fromTo('#auth-close',
        { opacity: 0, rotate: -90 },
        { opacity: 1, rotate: 0, duration: 0.45, ease: 'expo.out' },
        '-=0.75'
      );
  }

  close() {
    if (!this.#isOpen) return;
    this.#isOpen = false;

    gsap.timeline({
      onComplete: () => {
        document.getElementById('auth-overlay').setAttribute('aria-hidden', 'true');
        document.body.classList.remove('auth-open');
        // Reset GSAP state for next open
        gsap.set('.auth__visual',   { clipPath: 'inset(0 100% 0 0)', opacity: 1 });
        gsap.set('.auth__panel',    { opacity: 0 });
        gsap.set('.auth__backdrop', { opacity: 0 });
        gsap.set('#auth-close',     { opacity: 0, rotate: -90 });
        // Clear inline pointer-events GSAP set on forms during #showForm()
        // so they properly inherit pointer-events:none from the closed overlay
        gsap.set(['#auth-form-login', '#auth-form-register'], { clearProps: 'pointerEvents' });
        this.#clearErrors();
      },
    })
    .to(['.auth__panel', '#auth-close'],
      { opacity: 0, duration: 0.3, ease: 'power2.in', stagger: 0.04 }
    )
    .to(['.auth__visual', '.auth__backdrop'],
      { opacity: 0, duration: 0.35, ease: 'power2.in', stagger: 0.05 },
      '-=0.15'
    );
  }

  // ─── Private ─────────────────────────────────────────────

  #setupInitialState() {
    gsap.set('.auth__visual',           { clipPath: 'inset(0 100% 0 0)' });
    gsap.set('.auth__panel',            { opacity: 0 });
    gsap.set('.auth__backdrop',         { opacity: 0 });
    gsap.set('#auth-close',             { opacity: 0, rotate: -90 });
    gsap.set('#auth-form-register',     { x: 50, opacity: 0 });
    gsap.set('#auth-form-login',        { x: 0,  opacity: 1 });
  }

  #showForm(mode, animate = true) {
    this.#mode     = mode;
    const enterEl  = document.getElementById(`auth-form-${mode}`);
    const exitMode = mode === 'login' ? 'register' : 'login';
    const exitEl   = document.getElementById(`auth-form-${exitMode}`);
    if (!enterEl || !exitEl) return;

    if (!animate) {
      gsap.set(enterEl, { opacity: 1, x: 0,  pointerEvents: 'auto' });
      gsap.set(exitEl,  { opacity: 0, x: 50, pointerEvents: 'none' });
      enterEl.setAttribute('aria-hidden', 'false');
      exitEl.setAttribute('aria-hidden',  'true');
      return;
    }

    gsap.timeline()
      .to(exitEl,
        { opacity: 0, x: -45, duration: 0.35, ease: 'power2.in',
          onComplete: () => {
            exitEl.setAttribute('aria-hidden', 'true');
            gsap.set(exitEl, { pointerEvents: 'none' });
          },
        }
      )
      .call(() => {
        enterEl.setAttribute('aria-hidden', 'false');
        gsap.set(enterEl, { x: 55, opacity: 0, pointerEvents: 'auto' });
      })
      .to(enterEl,
        { x: 0, opacity: 1, duration: 0.55, ease: 'expo.out' }
      )
      .fromTo(this.#getActiveFormEls(),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0,  duration: 0.5, stagger: 0.05, ease: 'expo.out' },
        '-=0.35'
      );
  }

  #getActiveFormEls() {
    const form = document.getElementById(`auth-form-${this.#mode}`);
    return form
      ? Array.from(form.querySelectorAll(
          '.auth__eyebrow, .auth__title-line, .auth__field, .auth__submit, .auth__switch'
        ))
      : [];
  }

  #bindTriggers() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-auth-open]');
      if (!trigger) return;
      e.preventDefault();

      if (this.#getSession()) {
        this.#logout();
      } else {
        this.open(trigger.dataset.authOpen || 'login');
      }
    });
  }

  #bindClose() {
    document.getElementById('auth-close')?.addEventListener('click', () => this.close());

    // Click on backdrop closes
    document.getElementById('auth-overlay')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget || e.target.classList.contains('auth__backdrop')) {
        this.close();
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.#isOpen) this.close();
    });
  }

  #bindSwitch() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-auth-to]');
      if (!btn) return;
      this.#clearErrors();
      this.#showForm(btn.dataset.authTo, true);
    });
  }

  #bindForms() {
    document.getElementById('form-login')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleLogin();
    });

    document.getElementById('form-register')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleRegister();
    });
  }

  // ─── Form handlers ────────────────────────────────────────

  #handleLogin() {
    const email = document.getElementById('l-email')?.value.trim() ?? '';
    const pass  = document.getElementById('l-pass')?.value ?? '';

    if (!email || !pass) {
      this.#setError('login', 'All fields are required.');
      return;
    }

    const user = this.#getUsers().find(
      (u) => u.email === email.toLowerCase() && u.password === btoa(pass)
    );

    if (!user) {
      this.#setError('login', 'Invalid email or password.');
      this.#shakeField('form-login');
      return;
    }

    this.#setSession({ name: user.name, email: user.email });
    this.#updateNav();
    this.close();
    document.getElementById('form-login')?.reset();
  }

  #handleRegister() {
    const name  = document.getElementById('r-name')?.value.trim()  ?? '';
    const email = document.getElementById('r-email')?.value.trim() ?? '';
    const pass  = document.getElementById('r-pass')?.value         ?? '';

    if (!name || !email || !pass) {
      this.#setError('register', 'All fields are required.');
      return;
    }
    if (pass.length < 6) {
      this.#setError('register', 'Password must be at least 6 characters.');
      return;
    }

    const users = this.#getUsers();
    if (users.find((u) => u.email === email.toLowerCase())) {
      this.#setError('register', 'This email is already registered.');
      this.#shakeField('form-register');
      return;
    }

    const newUser = { name, email: email.toLowerCase(), password: btoa(pass) };
    users.push(newUser);
    this.#saveUsers(users);
    this.#setSession({ name, email: email.toLowerCase() });
    this.#updateMemberCount();
    this.#updateNav();
    this.close();
    document.getElementById('form-register')?.reset();
  }

  #logout() {
    localStorage.removeItem(SESSION_KEY);
    this.#updateNav();
  }

  // ─── UI helpers ───────────────────────────────────────────

  #updateNav() {
    const user = this.#getSession();
    document.querySelectorAll('[data-auth-open]').forEach((btn) => {
      if (user) {
        const first = user.name.trim().split(' ')[0].toUpperCase();
        btn.textContent = `— ${first}`;
        btn.title = 'Click to sign out';
      } else {
        btn.setAttribute('data-i18n', 'nav.login');
        btn.title = '';
        const lang = localStorage.getItem(LOCALE_KEY) ?? 'en';
        btn.textContent = LOCALES[lang]?.nav?.login ?? 'Login';
      }
    });
  }

  #updateMemberCount() {
    const el = document.getElementById('auth-member-count');
    if (!el) return;
    el.textContent = 247 + this.#getUsers().length;
  }

  #setError(formId, msg) {
    const el = document.getElementById(`${formId}-error`);
    if (!el) return;
    el.textContent = msg;
    gsap.fromTo(el, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
  }

  #clearErrors() {
    document.querySelectorAll('.auth__error').forEach((el) => (el.textContent = ''));
  }

  #shakeField(formId) {
    const el = document.getElementById(formId);
    if (!el) return;
    gsap.timeline()
      .to(el, { x: -9,  duration: 0.07, ease: 'power1.inOut' })
      .to(el, { x:  9,  duration: 0.07, ease: 'power1.inOut' })
      .to(el, { x: -5,  duration: 0.07, ease: 'power1.inOut' })
      .to(el, { x:  0,  duration: 0.07, ease: 'power1.out'  });
  }

  // ─── localStorage ─────────────────────────────────────────

  #getUsers()       { return JSON.parse(localStorage.getItem(USERS_KEY)   || '[]');   }
  #saveUsers(u)     { localStorage.setItem(USERS_KEY, JSON.stringify(u));              }
  #getSession()     { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  #setSession(user) { localStorage.setItem(SESSION_KEY, JSON.stringify(user));         }
}

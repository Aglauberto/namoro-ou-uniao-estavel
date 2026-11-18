/* =========================================================
   Namoro ou União Estável? · interações
   ========================================================= */

/* >>> COLE AQUI o link do checkout (Hotmart, Kiwify etc.) quando estiver configurado <<< */
const CHECKOUT_URL = '';

(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Checkout ---------- */
  document.querySelectorAll('.js-checkout').forEach((a) => {
    if (CHECKOUT_URL) {
      a.href = CHECKOUT_URL;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const oferta = document.getElementById('oferta');
        if (oferta) {
          oferta.scrollIntoView({ behavior: 'smooth' });
        }
        console.warn('Defina CHECKOUT_URL em script.js para levar direto ao gateway externo.');
      });
    }
  });

  /* ---------- Feedback no toque (iOS só aplica :active com um listener de touch) ---------- */
  document.addEventListener('touchstart', () => {}, { passive: true });

  /* ---------- Revelação ao rolar, com leve escalonamento entre irmãos ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      let i = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.setProperty('--d', `${Math.min(i, 5) * 60}ms`);
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
        i += 1;
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Barra superior: troca de material ao sair da hero ---------- */
  const topbar = document.getElementById('topbar');
  const hero = document.querySelector('.hero');
  const heroCta = document.getElementById('hero-cta');
  const dock = document.getElementById('dock');
  const offer = document.getElementById('oferta');
  const final = document.querySelector('.final');
  const footer = document.getElementById('rodape');

  const state = { heroGone: false, ctaGone: false, offerIn: false, finalIn: false, footerIn: false };

  const updateDock = () => {
    const show = state.ctaGone && !state.offerIn && !state.finalIn && !state.footerIn;
    dock.classList.toggle('is-visible', show);
    dock.setAttribute('aria-hidden', String(!show));
    dock.querySelector('a').tabIndex = show ? 0 : -1;
  };

  if ('IntersectionObserver' in window) {
    const topH = () => topbar.offsetHeight;

    new IntersectionObserver(([e]) => {
      state.heroGone = !e.isIntersecting;
      topbar.classList.toggle('is-light', state.heroGone);
    }, { rootMargin: `-${topH()}px 0px 0px 0px` }).observe(hero);

    const watch = (el, key) => new IntersectionObserver(([e]) => {
      state[key] = key === 'ctaGone' ? (!e.isIntersecting && e.boundingClientRect.top < 0) : e.isIntersecting;
      updateDock();
    }, { threshold: 0 }).observe(el);

    watch(heroCta, 'ctaGone');
    watch(offer, 'offerIn');
    watch(final, 'finalIn');
    watch(footer, 'footerIn');
  }

  /* ---------- Identificação: perguntas tocáveis ---------- */
  const checks = document.querySelectorAll('.check');
  const status = document.getElementById('check-status');
  const total = checks.length;

  const updateStatus = () => {
    const n = document.querySelectorAll('.check[aria-checked="true"]').length;
    if (n === 0) {
      status.textContent = '';
      status.classList.remove('is-visible');
      return;
    }
    status.innerHTML = n === 1
      ? 'Você marcou 1 dúvida.<br>Ela é tratada no e-book.'
      : `Você marcou ${n} de ${total} dúvidas.<br>Todas são tratadas no e-book.`;
    status.classList.add('is-visible');
  };

  checks.forEach((btn) => {
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-checked') !== 'true';
      btn.setAttribute('aria-checked', String(on));
      if (on && navigator.vibrate) navigator.vibrate(8);
      updateStatus();
    });
  });

  /* ---------- Acordeões (crenças + FAQ): podem ser abertos e fechados a qualquer momento ---------- */
  const bindToggle = (btn, panel) => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('is-open', open);
    });
  };

  document.querySelectorAll('.myth__btn').forEach((btn) => {
    bindToggle(btn, document.getElementById(btn.getAttribute('aria-controls')));
  });

  document.querySelectorAll('.faq__q').forEach((btn, i) => {
    const panel = btn.nextElementSibling;
    const id = `faq-a-${i + 1}`;
    panel.id = id;
    btn.setAttribute('aria-controls', id);
    bindToggle(btn, panel);
  });
})();

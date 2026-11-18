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

  if ('IntersectionObserver' in window && topbar && hero) {
    const topH = () => topbar.offsetHeight;
    new IntersectionObserver(([e]) => {
      topbar.classList.toggle('is-light', !e.isIntersecting);
    }, { rootMargin: `-${topH()}px 0px 0px 0px` }).observe(hero);
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
      ? 'Você marcou 1 dúvida.<br>Ela é tratada no guia prático.'
      : `Você marcou ${n} de ${total} dúvidas.<br>Todas são tratadas no guia prático.`;
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

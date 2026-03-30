/* ================================================
   DR. CARLOS MENDOZA | NEUROCIRUJANO
   main.js — Funcionalidades del sitio
   ================================================ */

// ================================================
// 1. CONFIGURACIÓN
// ================================================
const CONFIG = {
  phone:     '4423679614',
  phoneFmt:  '442 367 9614',
  whatsapp:  '524423679614',
  email:     'drcarlosmendoza90@gmail.com',
  instagram: 'https://www.instagram.com/drcarlosneurocxqro/',
  facebook:  'https://www.facebook.com/Dr.MendozaNeurocirujano/'
};

// ================================================
// 2. HEADER STICKY
// ================================================
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ================================================
// 3. MENÚ MÓVIL
// ================================================
function initMenu() {
  const toggle  = document.getElementById('nav-toggle');
  const menu    = document.getElementById('nav-menu');
  const overlay = document.getElementById('nav-overlay');
  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.add('open');
    overlay?.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    overlay?.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay?.addEventListener('click', closeMenu);

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Cerrar al hacer clic en un link del menú
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ================================================
// 4. SCROLL REVEAL (IntersectionObserver)
// ================================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ================================================
// 5. CONTADOR DE ESTADÍSTICAS
// ================================================
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current  = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ================================================
// 6. FAQ ACCORDION
// ================================================
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Cerrar todos
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Abrir el actual si estaba cerrado
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ================================================
// 7. ACTIVE NAV LINK
// ================================================
function initActiveNav() {
  const path    = window.location.pathname;
  const links   = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normalizar paths
    const normalizedHref = href.replace(/^\.\.\//, '/').replace(/^\.\//, '/');
    const normalizedPath = path.endsWith('/') ? path : path + '/';

    if (normalizedPath.includes(normalizedHref.replace(/\/$/, '')) && normalizedHref !== '/') {
      link.classList.add('active');
    }
  });
}

// ================================================
// 8. INICIALIZACIÓN
// ================================================
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMenu();
  initScrollReveal();
  initCounters();
  initFAQ();
  initActiveNav();
});

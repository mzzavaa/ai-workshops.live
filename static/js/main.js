// ─── Dark mode toggle ───────────────────────────────────────────────────────
const toggle = document.getElementById('theme-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ─── Mobile nav hamburger ────────────────────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ─── Smooth scroll offset for sticky nav ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Nav scroll shadow ───────────────────────────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 8
      ? '0 2px 16px rgba(0,0,0,0.12)'
      : 'none';
  }, { passive: true });
}

// ─── Intersection observer - fade-in on scroll ───────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll(
  '.stat-card, .step, .agent-card, .pricing-card, .who-card, .tech-stat'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

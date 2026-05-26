/* ==========================================================
   Qverse — script.js
   Kept lean: navbar blur on scroll + smooth scroll + active
   nav link highlight based on scroll position.
   ========================================================== */

(function () {
  'use strict';

  const nav   = document.getElementById('mainNav');
  const links = document.querySelectorAll('.qv-nav-link');

  /* ── Navbar blur on scroll ── */
  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  /* ── Smooth scroll for in-page links ── */
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu if open
      const bsCollapse = bootstrap.Collapse.getInstance(
        document.getElementById('navMenu')
      );
      if (bsCollapse) bsCollapse.hide();

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── Active link highlight via IntersectionObserver ── */
  const sections = document.querySelectorAll('section[id], footer[id]');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));

  /* ── Bind scroll listener ── */
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run once on load in case page is mid-scroll

})();
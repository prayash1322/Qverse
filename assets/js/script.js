

(function () {
  'use strict';

  const nav   = document.getElementById('mainNav');
  const links = document.querySelectorAll('.qv-nav-link');

  
  function handleNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      
      const bsCollapse = bootstrap.Collapse.getInstance(
        document.getElementById('navMenu')
      );
      if (bsCollapse) bsCollapse.hide();

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  
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

  
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); 

})();
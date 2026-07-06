document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = 72;

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    navItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setActiveNav(sectionId) {
    navItems.forEach(link => {
      const isActive = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function updateActiveOnScroll() {
    const scrollPos = window.scrollY + headerHeight + 80;
    let currentSection = '';

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      setActiveNav(currentSection);
    } else {
      navItems.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
    }
  }

  navItems.forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        const top = target.offsetTop - headerHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
        setActiveNav(targetId);
      }
    });
  });

  window.addEventListener('scroll', updateActiveOnScroll, { passive: true });
  updateActiveOnScroll();
});

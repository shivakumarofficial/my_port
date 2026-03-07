/* ================================================
   SHIVAKUMAR C — PORTFOLIO | main.js
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* =============================================
     1. NAVBAR — scroll + active link
     ============================================= */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);

    const sections  = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(function (sec) {
      const link = document.querySelector('.nav-link[href="#' + sec.getAttribute('id') + '"]');
      if (link) {
        const inView = scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight;
        if (inView) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });

    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  /* =============================================
     2. SCROLL TO TOP
     ============================================= */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =============================================
     3. SMOOTH SCROLL
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href   = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        const menu    = document.getElementById('navMenu');
        const toggler = document.querySelector('.navbar-toggler');
        if (menu && menu.classList.contains('show') && toggler) toggler.click();
      }
    });
  });

  /* =============================================
     4. SKILL BAR ANIMATION
     ============================================= */
  let skillsAnimated = false;
  function animateSkills() {
    if (skillsAnimated) return;
    const about = document.getElementById('about');
    if (!about) return;
    if (about.getBoundingClientRect().top < window.innerHeight - 60) {
      skillsAnimated = true;
      document.querySelectorAll('.skill-fill').forEach(function (bar) {
        bar.style.width = (bar.getAttribute('data-width') || 0) + '%';
      });
    }
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills();

  /* =============================================
     5. COUNTER ANIMATION
     ============================================= */
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    const stats = document.querySelector('.stats-row');
    if (!stats) return;
    if (stats.getBoundingClientRect().top < window.innerHeight - 40) {
      countersAnimated = true;
      document.querySelectorAll('.counter').forEach(function (el) {
        const target    = parseInt(el.getAttribute('data-target'), 10) || 0;
        const stepTime  = 40;
        const steps     = 1200 / stepTime;
        const increment = Math.ceil(target / steps);
        let current     = 0;
        const timer = setInterval(function () {
          current += increment;
          if (current >= target) { el.textContent = target; clearInterval(timer); }
          else el.textContent = current;
        }, stepTime);
      });
    }
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  /* =============================================
     6. CONTACT FORM
     ============================================= */
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (form && submitBtn) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.innerHTML        = '&#10003; Message Sent!';
      submitBtn.style.background = '#22c55e';
      submitBtn.style.border     = '2px solid #22c55e';
      submitBtn.disabled         = true;
      setTimeout(function () {
        submitBtn.innerHTML        = 'Send Message &nbsp;<i class="fas fa-paper-plane"></i>';
        submitBtn.style.background = '';
        submitBtn.style.border     = '';
        submitBtn.disabled         = false;
        form.reset();
      }, 3000);
    });
  }

});
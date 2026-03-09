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
     3. SMOOTH SCROLL + close mobile menu
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
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
     6. CONTACT FORM — Formspree
     Form ID : xnjgjprr
     Delivers : shivakumarchandrappam@gmail.com
     ============================================= */
  const FORMSPREE_URL = 'https://formspree.io/f/xnjgjprr';

  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusBox = document.getElementById('formStatus');

  if (form && submitBtn) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name    = document.getElementById('senderName')?.value.trim();
      const email   = document.getElementById('senderEmail')?.value.trim();
      const subject = document.getElementById('senderSubject')?.value.trim();
      const message = document.getElementById('senderMessage')?.value.trim();

      // Validate
      if (!name || !email || !message) {
        showStatus('Please fill in Name, Email and Message.', 'warn');
        shakeBtn(submitBtn);
        return;
      }
      if (!isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'warn');
        shakeBtn(submitBtn);
        return;
      }

      // Loading state
      submitBtn.innerHTML     = '<i class="fas fa-spinner fa-spin"></i>&nbsp; Sending…';
      submitBtn.disabled      = true;
      submitBtn.style.opacity = '0.75';
      hideStatus();

      try {
        const response = await fetch(FORMSPREE_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name:     name,
            email:    email,
            subject:  subject || '(No subject)',
            message:  message,
            _replyto: email,
            _subject: 'Portfolio message from ' + name
          })
        });

        if (response.ok) {
          submitBtn.innerHTML         = '&#10003;&nbsp; Message Sent!';
          submitBtn.style.background  = '#22c55e';
          submitBtn.style.borderColor = '#22c55e';
          submitBtn.style.opacity     = '1';
          showStatus('Thanks ' + name + '! Your message was sent. Shivakumar will reply soon.', 'success');
          form.reset();
          setTimeout(function () {
            submitBtn.innerHTML         = 'Send Message &nbsp;<i class="fas fa-paper-plane"></i>';
            submitBtn.style.background  = '';
            submitBtn.style.borderColor = '';
            submitBtn.disabled          = false;
            submitBtn.style.opacity     = '1';
          }, 4000);
        } else {
          const data = await response.json().catch(() => ({}));
          throw new Error((data.errors && data.errors[0] && data.errors[0].message) || 'Server error');
        }

      } catch (err) {
        console.error('Form error:', err);
        submitBtn.innerHTML         = 'Send Message &nbsp;<i class="fas fa-paper-plane"></i>';
        submitBtn.style.background  = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled          = false;
        submitBtn.style.opacity     = '1';
        showStatus('Failed to send. Please email directly: shivakumarchandrappam@gmail.com', 'error');
      }
    });
  }

  function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

  function showStatus(msg, type) {
    if (!statusBox) return;
    statusBox.textContent   = msg;
    statusBox.style.display = 'block';
    statusBox.className     = 'form-status form-status--' + type;
  }

  function hideStatus() {
    if (!statusBox) return;
    statusBox.style.display = 'none';
    statusBox.textContent   = '';
  }

  function shakeBtn(el) {
    let count = 0;
    const shake = setInterval(function () {
      count++;
      el.style.transform = count % 2 === 0 ? 'translateX(-7px)' : 'translateX(7px)';
      if (count >= 6) { clearInterval(shake); el.style.transform = ''; }
    }, 60);
  }

});
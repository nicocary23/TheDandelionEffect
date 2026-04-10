/* ============================================
   THE DANDELION EFFECT — Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky Header Scroll Effect --- */
  const header = document.querySelector('.header--sticky');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* --- Mobile Navigation Toggle --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- FAQ Accordions --- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* --- Scroll Fade-In Animation --- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  /* --- Countdown Timer --- */
  const countdownEl = document.getElementById('countdown-timer');
  if (countdownEl) {
    // Set launch date — 14 days from now by default (update as needed)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);
    launchDate.setHours(23, 59, 59, 0);

    function updateCountdown() {
      const now = new Date();
      const diff = launchDate - now;

      if (diff <= 0) {
        countdownEl.textContent = 'Doors are now open!';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* --- Exit Intent Popup (Sales Page Only) --- */
  const popup = document.querySelector('.popup-overlay');
  if (popup) {
    let popupShown = false;

    // Exit intent — mouse leaves viewport at top
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 10 && !popupShown) {
        popup.classList.add('active');
        popupShown = true;
      }
    });

    // Close popup
    popup.querySelector('.popup-close')?.addEventListener('click', () => {
      popup.classList.remove('active');
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) popup.classList.remove('active');
    });
  }

  /* --- Cookie Banner --- */
  const cookieBanner = document.querySelector('.cookie-banner');
  if (cookieBanner) {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) {
      cookieBanner.classList.add('show');
    }

    cookieBanner.querySelector('.cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      cookieBanner.classList.remove('show');
    });

    cookieBanner.querySelector('.cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'false');
      cookieBanner.classList.remove('show');
    });
  }

  /* --- Simple Form Validation & Submission --- */
  document.querySelectorAll('form[data-action]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const action = form.dataset.action;
      const email = form.querySelector('input[type="email"]');
      const name = form.querySelector('input[name="name"]');

      // Basic validation
      if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.style.borderColor = '#e74c3c';
        return;
      }

      // In production, this would POST to Mailerlite / Stripe / your backend
      // For now, show a success message
      const successMsg = document.createElement('div');
      successMsg.style.cssText = 'padding:1rem;background:#3A5A40;color:#fff;border-radius:4px;text-align:center;margin-top:0.75rem;';
      successMsg.textContent = action === 'waitlist'
        ? "You're on the list! Check your inbox."
        : action === 'freebie'
          ? "Your free guide is on its way! Check your inbox."
          : "Thanks! We'll be in touch soon.";

      form.style.display = 'none';
      form.parentElement.appendChild(successMsg);
    });
  });

  /* --- Stripe Payment Placeholder --- */
  document.querySelectorAll('[data-stripe]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // In production, replace with Stripe Checkout redirect
      // e.g. stripe.redirectToCheckout({ sessionId: '...' })
      alert('This will redirect to Stripe Checkout in production. Replace this with your Stripe integration.');
    });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- Active nav link highlighting --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});

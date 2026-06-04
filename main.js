/* ============================================================
   REST GAMES STUDIO — main.js
   ============================================================ */

'use strict';

/* ---- Custom Cursor ---- */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .game-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorRing.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
});

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ---- Hamburger mobile menu ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Scroll Reveal ---- */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => revealObserver.observe(r));

/* ---- Language Toggle ---- */
let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;

  // Desktop buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Mobile buttons
  document.querySelectorAll('.mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });

  // Update html lang attribute
  document.documentElement.lang = lang;
}

// Expose globally for inline onclick
window.setLang = setLang;

/* ---- Form submit (opens mailto) ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('inputName').value.trim();
    const email   = document.getElementById('inputEmail').value.trim();
    const message = document.getElementById('inputMsg').value.trim();

    if (!name || !email || !message) {
      alert(currentLang === 'tr' ? 'Lütfen tüm alanları doldurun.' : 'Please fill in all fields.');
      return;
    }

    const subject = encodeURIComponent(`Rest Games — Message from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:restgamestudio@gmail.com?subject=${subject}&body=${body}`;
  });
}

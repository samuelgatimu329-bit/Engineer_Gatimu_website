// =========================
// Portfolio — script.js
// Handles mobile menu, reveal animations, typing, lightbox modal, year
// =========================

// ---- Menu toggle (mobile) ----
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    const open = sidebar.style.left === '0px';
    sidebar.style.left = open ? '-320px' : '0px';
    menuToggle.setAttribute('aria-expanded', String(!open));
    sidebar.setAttribute('aria-hidden', String(open));
  });

  document.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      sidebar.style.left = '-320px';
      menuToggle.setAttribute('aria-expanded', 'false');
      sidebar.setAttribute('aria-hidden', 'true');
    });
  });
}

// ---- Auto-update footer year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Typing effect ----
(function typingEffect(){
  const el = document.getElementById('typed-line');
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = '';
  let i = 0;
  const speed = 28;
  function type(){
    if(i <= text.length){
      el.textContent = text.slice(0, i++);
      setTimeout(type, speed);
    } else {
      el.classList.add('typing');
    }
  }
  setTimeout(type, 400);
})();

// ---- Reveal on scroll (IntersectionObserver) ----
(function revealOnScroll(){
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    // fallback: simply show
    reveals.forEach(r => r.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const delay = parseInt(ent.target.dataset.revealDelay || '0', 10);
        setTimeout(() => ent.target.classList.add('visible'), delay);
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));
})();

// ---- Smooth scroll for same-page links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Lightbox (image-focused modal) ----
(function lightboxSetup(){
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lb-image');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  const lbCode = document.getElementById('lb-code');
  const lbVideo = document.getElementById('lb-video');
  const lbDownload = document.getElementById('lb-download');
  const closeBtn = document.querySelector('.lightbox-close');
  const backdrop = document.querySelector('.lightbox-backdrop');

  // helper to open
  function openLightbox(data) {
    if (!lightbox) return;
    lbImage.src = data.img || '';
    lbImage.alt = data.title || 'Project preview';
    lbTitle.textContent = data.title || '';
    lbDesc.textContent = data.desc || '';
    if (data.code) { lbCode.href = data.code; lbCode.style.display = 'inline-flex'; } else { lbCode.style.display = 'none'; }
    if (data.video) { lbVideo.href = data.video; lbVideo.style.display = 'inline-flex'; } else { lbVideo.style.display = 'none'; }
    // download: if code link exists, use that; otherwise hide
    if (data.code) {
      lbDownload.style.display = 'inline-flex';
      lbDownload.onclick = () => { window.open(data.code, '_blank'); };
    } else {
      lbDownload.style.display = 'none';
      lbDownload.onclick = null;
    }

    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.style.display = 'flex';
    // lock focus inside modal (basic)
    const focusable = lightbox.querySelectorAll('a,button,[tabindex]');
    if (focusable && focusable[0]) focusable[0].focus();
    document.body.style.overflow = 'hidden';
  }

  // helper to close
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.style.display = 'none';
    lbImage.src = '';
    document.body.style.overflow = '';
  }

  // wire project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = {
        title: card.dataset.title,
        desc: card.dataset.desc,
        img: card.dataset.img,
        code: card.dataset.code,
        video: card.dataset.video
      };
      openLightbox(data);
    });
    // keyboard accessible: Enter opens
    card.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        card.click();
      }
    });
  });

  // close buttons & backdrop
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', (ev) => { if (ev.target.dataset.close !== undefined) closeLightbox(); });

  // close on ESC
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeLightbox(); });
})();

// Accessibility: focus main when hash navigation occurs
window.addEventListener('hashchange', () => {
  const id = location.hash.replace('#','');
  const el = document.getElementById(id);
  if (el) { el.setAttribute('tabindex','-1'); el.focus(); }
});

/* ==========================================================================
   MOHAMMAD KHALILUR RAHMAN - PORTFOLIO INTERACTIVITY SCRIPT
   - Subtle Floating Sparks & Embers Canvas
   - Dynamic Modals & View More Popups
   - Interactive Certificate Switcher & Full Previews
   - Live Search Filter for 26+ Advanced Technologies
   - Direct WhatsApp / Skype / Email Booking
   - Instant Clipboard Copy with Toast Feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEmbers();
  initHeaderScroll();
  initCertificates();
  initModals();
  initClipboardCopy();
  initBookingForm();
  initTechFilter();
  initMobileMenu();
  initHorizontalTickers();
});

/* ==========================================================================
   1. FLOATING PARTICLES & EMBERS CANVAS
   ========================================================================== */
function initEmbers() {
  const canvas = document.getElementById('ember-canvas');
  if (!canvas) return;
  // Mobile / tablet optimization: skip canvas particles to preserve GPU fillrate & prevent battery drain/lag
  if (window.innerWidth <= 768) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const embers = [];
  const emberCount = 38;
  
  for (let i = 0; i < emberCount; i++) {
    embers.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: Math.random() * 0.008 + 0.003,
      color: Math.random() > 0.4 ? 'rgba(255, 115, 0,' : 'rgba(255, 185, 45,'
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < embers.length; i++) {
      const e = embers[i];
      e.y -= e.speedY;
      e.x += e.speedX;
      e.opacity -= e.fadeSpeed;
      
      if (e.opacity <= 0 || e.y < -10) {
        e.y = height + 10;
        e.x = Math.random() * width;
        e.opacity = Math.random() * 0.7 + 0.3;
      }
      
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fillStyle = `${e.color} ${e.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ff6b00';
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. HEADER SCROLL & SPY
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    
    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE ACADEMIC CERTIFICATE SWITCHER
   ========================================================================== */
const CERTIFICATE_DATA = {
  btech: {
    title: 'Bachelor of Technology (B.Tech)',
    field: 'Electronics & Communication Engineering',
    institution: 'Shankara Institute of Technology, Jaipur',
    affiliation: 'University of Rajasthan, Jaipur',
    score: '65.00%',
    status: 'Graduated / Degree Conferred',
    image: 'assets/images/certs/cert-btech.png?v=2'
  },
  diploma: {
    title: 'Three-Year Diploma in Engineering',
    field: 'Electronics & Communication Engineering',
    institution: 'Al-Kabir Polytechnic, Jamshedpur',
    affiliation: 'State Board of Technical Education (S.B.T.E.), Ranchi',
    score: '74.04% (First Class with Distinction)',
    status: 'Diploma Conferred',
    image: 'assets/images/certs/cert-diploma.jpg?v=2'
  },
  plc: {
    title: 'Advanced Industrial Automation & PLCs',
    field: 'Siemens S7-300 Micro PLCs & Control Systems',
    institution: 'A.K.P. & I.D.T.R., Jamshedpur',
    affiliation: 'Govt. of India Society & Automation Institute',
    score: 'Certified Specialist',
    status: 'Professional Certification',
    image: 'assets/images/certs/cert-plc.jpg'
  },
  inter: {
    title: 'Intermediate (12th Grade)',
    field: 'Science & Mathematics Foundation',
    institution: 'J.I.E.C., Ranchi',
    affiliation: 'Jharkhand Intermediate Education Council',
    score: '61.00% (Year of Passing: 2001)',
    status: 'Higher Secondary Completed',
    image: 'assets/images/certs/cert-btech.png?v=2'
  },
  matric: {
    title: 'Matriculation / S.S.E. (10th Grade)',
    field: 'General Secondary Education',
    institution: 'B.S.E.B., Patna',
    affiliation: 'Bihar School Examination Board',
    score: '59.00% (Year of Passing: 1999)',
    status: 'Secondary School Exam Completed',
    image: 'assets/images/certs/cert-diploma.jpg?v=2'
  }
};

let currentCertKey = 'btech';

function initCertificates() {
  const eduCards = document.querySelectorAll('.edu-card[data-cert]');
  const previewImg = document.getElementById('cert-preview-img');
  const previewTitle = document.getElementById('cert-preview-title');
  const metaInst = document.getElementById('cert-meta-institution');
  const metaAffil = document.getElementById('cert-meta-affiliation');
  const metaGrade = document.getElementById('cert-meta-grade');
  const metaStatus = document.getElementById('cert-meta-status');
  
  eduCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-cert');
      if (!CERTIFICATE_DATA[key]) return;
      
      eduCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      currentCertKey = key;
      const data = CERTIFICATE_DATA[key];
      
      if (previewTitle) previewTitle.textContent = data.title;
      if (metaInst) metaInst.textContent = data.institution;
      if (metaAffil) metaAffil.textContent = data.affiliation;
      if (metaGrade) metaGrade.textContent = data.score;
      if (metaStatus) metaStatus.textContent = data.status;
      if (previewImg) {
        previewImg.style.opacity = '0';
        setTimeout(() => {
          previewImg.src = data.image;
          previewImg.style.opacity = '1';
        }, 150);
      }
    });
  });
  
  // View Full Certificate modal button
  const viewFullCertBtn = document.getElementById('btn-view-full-cert');
  if (viewFullCertBtn) {
    viewFullCertBtn.addEventListener('click', () => {
      const data = CERTIFICATE_DATA[currentCertKey];
      const modal = document.getElementById('modal-cert-viewer');
      const modalImg = document.getElementById('modal-cert-image');
      const modalTitle = document.getElementById('modal-cert-title');
      
      if (modal && modalImg && modalTitle) {
        modalTitle.textContent = `${data.title} - ${data.field}`;
        modalImg.src = data.image;
        openModal('modal-cert-viewer');
      }
    });
  }
}

/* ==========================================================================
   4. MODALS & POPUPS SYSTEM
   ========================================================================== */
function initModals() {
  // Generic trigger buttons with data-modal="id"
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });
  
  // Close buttons
  document.querySelectorAll('.modal-close-btn, [data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });
  
  // Close on backdrop click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });
  
  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    document.body.style.overflow = 'hidden';
    modal.classList.add('open');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

/* ==========================================================================
   5. COPY TO CLIPBOARD WITH TOAST
   ========================================================================== */
function initClipboardCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      } else {
        showToast(`Copied: ${textToCopy}`);
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   6. BOOK A CALL SCHEDULER FORM
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('book-call-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('booking-submit-btn');
    const name    = document.getElementById('booking-name').value.trim();
    const email   = document.getElementById('booking-email').value.trim();
    const phone   = document.getElementById('booking-phone').value.trim();
    const date    = document.getElementById('booking-date').value;
    const message = document.getElementById('booking-message').value.trim();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending notification...';
    }

    const payload = {
      name: name,
      email: email,
      phone: phone,
      preferred_date: date,
      reason: message || '(No additional details provided)',
      _subject: `New Portfolio Booking Request from ${name}`,
      _captcha: 'false',
      _template: 'table'
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/mdkhalil464037@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true) {
        closeAllModals();
        showToast('? Booking sent! Notification delivered to your email.');
        form.reset();
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        closeAllModals();
        alert('?? One-Time Authorization Required:\n\nAn activation link has been sent to mdkhalil464037@gmail.com by FormSubmit.\n\nPlease open your Gmail (check Inbox & Spam) and click "Activate Form" once.\n\nAfter that single click, all submissions will automatically arrive in your inbox!');
        showToast('Activation email sent to mdkhalil464037@gmail.com');
        form.reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('Direct submission error, fallback to email client:', err);
      const subject = encodeURIComponent(`Consultation Booking Request from ${name}`);
      const body = encodeURIComponent(
        `Hello Eng. Mohammad Khalilur Rahman,\n\n` +
        `I would like to schedule a call / consultation with you:\n\n` +
        `� Name: ${name}\n` +
        `� Work Email: ${email}\n` +
        `� Phone/WhatsApp: ${phone}\n` +
        `� Preferred Date: ${date}\n` +
        `� Reason: ${message}\n\n` +
        `Best regards,\n${name}`
      );
      window.location.href = `mailto:mdkhalil464037@gmail.com?subject=${subject}&body=${body}`;
      closeAllModals();
      showToast('Opening email client as backup...');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Confirm &amp; Send Booking &rarr;';
      }
    }
  });
}

/* ==========================================================================
   7. LIVE SEARCH / FILTER FOR ADVANCED TECHNOLOGIES
   ========================================================================== */
function initTechFilter() {
  const searchInput = document.getElementById('tech-search-input');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll('.tech-item-row');
    
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   8. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!toggle || !navMenu) return;
  
  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* =====================================================
   FAULT DETAIL TOGGLE
   ===================================================== */
function toggleFaultDetail() {
  const box    = document.getElementById('fault-detail-box');
  const label  = document.getElementById('fault-toggle-label');
  const arrow  = document.getElementById('fault-toggle-arrow');
  if (!box) return;
  const isOpen = box.style.display !== 'none';
  box.style.display  = isOpen ? 'none' : 'block';
  label.textContent  = isOpen ? 'View Full Details' : 'Hide Details';
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}

/* ==========================================================================
   9. CONTINUOUS HORIZONTAL TICKERS (MOBILE & TABLET ONLY)
   ========================================================================== */
function initHorizontalTickers() {
  const tickerDefs = [
    { selector: '.skills-grid', speed: 1.25 },
    { selector: '.software-grid', speed: 1.2 },
    { selector: '.responsibilities-grid', speed: 1.25 },
    { selector: '.cert-logos-grid', speed: 1.2 }
  ];

  const activeTickers = [];

  tickerDefs.forEach(({ selector, speed }) => {
    const grid = document.querySelector(selector);
    if (!grid) return;

    // Clone original cards once for seamless continuous loop
    const originalCards = Array.from(grid.children);
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      grid.appendChild(clone);
    });

    const state = {
      grid: grid,
      speed: speed,
      pos: 0,
      loopBoundary: 0,
      isVisible: false,
      isInteracting: false,
      resumeTimer: null
    };

    const updateBoundary = () => {
      state.loopBoundary = grid.scrollWidth / 2;
    };

    updateBoundary();

    const pause = () => {
      state.isInteracting = true;
      if (state.resumeTimer) clearTimeout(state.resumeTimer);
      state.pos = grid.scrollLeft;
    };

    const resume = (delay = 2000) => {
      if (state.resumeTimer) clearTimeout(state.resumeTimer);
      state.resumeTimer = setTimeout(() => {
        state.pos = grid.scrollLeft;
        state.isInteracting = false;
      }, delay);
    };

    grid.addEventListener('touchstart', pause, { passive: true });
    grid.addEventListener('touchend', () => resume(2000), { passive: true });
    grid.addEventListener('touchcancel', () => resume(1000), { passive: true });
    grid.addEventListener('mouseenter', pause);
    grid.addEventListener('mouseleave', () => resume(500));

    // IntersectionObserver: Only tick when actually visible in viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        state.isVisible = entries[0].isIntersecting;
        if (state.isVisible && state.loopBoundary === 0) {
          updateBoundary();
        }
      }, { rootMargin: '40px 0px 40px 0px', threshold: 0.05 });
      observer.observe(grid);
    } else {
      state.isVisible = true;
    }

    activeTickers.push(state);
  });

  // Recompute loop boundaries only on resize (never during the animation loop to eliminate layout thrashing)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      activeTickers.forEach(item => {
        item.loopBoundary = item.grid.scrollWidth / 2;
        item.pos = item.grid.scrollLeft;
      });
    }, 250);
  }, { passive: true });

  // Suspend ticker mutations entirely during vertical window scroll for 100% native smooth scrolling
  let isWindowScrolling = false;
  let scrollEndTimer = null;
  window.addEventListener('scroll', () => {
    isWindowScrolling = true;
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      isWindowScrolling = false;
      // Resync positions after scroll
      activeTickers.forEach(item => {
        item.pos = item.grid.scrollLeft;
      });
    }, 150);
  }, { passive: true });

  // Single unified master RAF loop for all tickers: zero forced reflows, zero DOM layout reads in the loop
  function masterLoop() {
    if (window.innerWidth <= 992 && !isWindowScrolling) {
      for (let i = 0; i < activeTickers.length; i++) {
        const item = activeTickers[i];
        if (item.isVisible && !item.isInteracting && item.loopBoundary > 0) {
          item.pos += item.speed;
          if (item.pos >= item.loopBoundary) {
            item.pos -= item.loopBoundary;
          }
          item.grid.scrollLeft = item.pos;
        }
      }
    }
    requestAnimationFrame(masterLoop);
  }

  requestAnimationFrame(masterLoop);
}
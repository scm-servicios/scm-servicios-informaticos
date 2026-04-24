/**
 * SCM Servicios Informáticos — main.js
 * Palpalá, Jujuy, Argentina
 *
 * Incluye:
 *  - Animación de partículas (circuito electrónico) en el Hero
 *  - Navbar scroll effect + hamburger menu
 *  - Fade-in al hacer scroll (Intersection Observer)
 *  - Scroll spy (resaltar link activo según sección)
 *  - Formulario de contacto (simulado)
 *  - Smooth scroll para los links internos
 */

/* ============================================================
   1. CANVAS — PARTÍCULAS DE CIRCUITO ELECTRÓNICO
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let W, H, particles, connectionDist;

  const PARTICLE_COUNT = 55;
  const SPEED          = 0.35;
  const DOT_RADIUS     = 2;
  const CYAN           = 'rgba(0, 200, 255,';

  // Redimensionar canvas al tamaño del hero
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    connectionDist = Math.min(W, H) * 0.22;
  }

  // Crear partículas
  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r:  DOT_RADIUS + Math.random() * 1.2,
      });
    }
  }

  // Loop de animación
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Actualizar posiciones
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    // Líneas de conexión
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDist) {
          const alpha = (1 - dist / connectionDist) * 0.45;
          ctx.beginPath();
          ctx.strokeStyle = `${CYAN} ${alpha})`;
          ctx.lineWidth   = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Puntos
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `${CYAN} 0.7)`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  // Init
  resize();
  createParticles();
  draw();

  // Resize listener
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      createParticles();
    }, 200);
  });
})();


/* ============================================================
   2. NAVBAR — SCROLL EFFECT + HAMBURGER MENU
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-link, .nav-btn');

  // Scroll effect
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial

  // Hamburger toggle
  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevenir scroll del body cuando menú abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Cerrar menú al hacer clic en un link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
})();


/* ============================================================
   3. FADE-IN AL HACER SCROLL (Intersection Observer)
   ============================================================ */
(function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // sólo una vez
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ============================================================
   4. SCROLL SPY — RESALTAR LINK ACTIVO
   ============================================================ */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  function updateActive() {
    const scrollY = window.scrollY + 80; // offset del navbar fijo

    let current = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();


/* ============================================================
   5. SMOOTH SCROLL para links internos
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navbarH = document.getElementById('navbar').offsetHeight;
      const top     = target.getBoundingClientRect().top + window.scrollY - navbarH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   6. FORMULARIO DE CONTACTO — Envía a los 3 vía WhatsApp + muestra éxito
   ============================================================ */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  // Números del equipo SCM
  const TEAM = [
    { name: 'Sergio',   num: '5493884212364' },
    { name: 'Misael',   num: '5493884845088' },
    { name: 'Carolina', num: '5493885191977' },
  ];

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn      = form.querySelector('button[type="submit"]');
    const nombre   = (document.getElementById('nombre')?.value   || '').trim();
    const email    = (document.getElementById('email')?.value    || '').trim();
    const telefono = (document.getElementById('telefono')?.value || '').trim();
    const servicio = (document.getElementById('servicio')?.value || '').trim();
    const mensaje  = (document.getElementById('mensaje')?.value  || '').trim();

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';

    // Armar el mensaje WhatsApp
    let msg = `📩 *NUEVO CONTACTO — SCM Servicios Informáticos*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Nombre:* ${nombre}\n`;
    if (email)    msg += `📧 *Email:* ${email}\n`;
    if (telefono) msg += `📱 *Teléfono:* ${telefono}\n`;
    if (servicio) msg += `🔧 *Servicio:* ${servicio}\n`;
    msg += `\n💬 *Mensaje:*\n${mensaje}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `_Enviado desde el sitio web SCM Servicios Informáticos_`;

    const encodedMsg = encodeURIComponent(msg);

    // Abrir WhatsApp para los 3 integrantes con un pequeño delay entre cada uno
    // para que el navegador pueda abrir las ventanas
    setTimeout(() => {
      TEAM.forEach((member, i) => {
        setTimeout(() => {
          window.open(`https://wa.me/${member.num}?text=${encodedMsg}`, '_blank');
        }, i * 800); // 800ms de diferencia entre cada apertura
      });

      // Mostrar éxito
      btn.innerHTML  = '<i class="fas fa-check"></i> ¡Mensaje enviado al equipo!';
      btn.style.background = '#25d366';
      btn.style.color = '#fff';
      success.classList.add('show');
      form.reset();

      // Restaurar botón después de 5s
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        btn.style.background = '';
        btn.style.color = '';
        success.classList.remove('show');
      }, 5000);
    }, 600);
  });
})();


/* ============================================================
   7. ANIMACIÓN DE NÚMEROS (contadores en sección "Nosotros")
   ============================================================ */
(function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const targets = {
    '5+':   { value: 5,   suffix: '+' },
    '200+': { value: 200, suffix: '+' },
    '3':    { value: 3,   suffix: '' },
    '7':    { value: 7,   suffix: '' },
  };

  function animateCounter(el, target, suffix, duration = 1200) {
    let start     = 0;
    const step    = target / (duration / 16);
    const timer   = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el       = entry.target;
          const text     = el.textContent.trim();
          const config   = targets[text];
          if (config) {
            animateCounter(el, config.value, config.suffix);
          }
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => observer.observe(el));
})();


/* ============================================================
   8. EFECTO DE HOVER EN CARDS DE SERVICIO (tilt sutil)
   ============================================================ */
(function initCardTilt() {
  const cards = document.querySelectorAll('.service-card, .brand-card, .team-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;
      const cx   = rect.width  / 2;
      const cy   = rect.height / 2;
      const rx   = ((y - cy) / cy) * 3;  // máx 3deg
      const ry   = ((x - cx) / cx) * -3;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ============================================================
   9. FILTROS DEL CATÁLOGO
   ============================================================ */
(function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remover active de todos
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
          // Micro-animación de aparición
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeInUp 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


/* ============================================================
   10. BOTÓN SCROLL TO TOP
   ============================================================ */
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   11. YEAR AUTOMÁTICO en el footer
   ============================================================ */
(function setYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const year    = new Date().getFullYear();
  yearEls.forEach(el => { el.textContent = year; });
})();

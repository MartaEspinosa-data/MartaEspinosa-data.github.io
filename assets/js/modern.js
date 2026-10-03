// Modern Interactive Features for Marta Espinosa Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initTypewriter();
  initPortfolioFilter();
  initNavbarScroll();
  initMobileNav();
  initStatsCounter();
});

// Background Particle Canvas (Data Pipeline Network Simulation)
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 20), 60);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw & update particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Hero Typewriter Effect
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Data Engineer',
    'AI & RAG Pipeline Architect',
    'ETL & Pipeline Architect',
    'Data Analytics Engineer',
    'SQL & Python Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      speed = 50;
    } else {
      el.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      speed = 100;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      speed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

// Portfolio Filter
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Navbar Scroll behavior
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section, article');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
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

// Mobile Nav Menu
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('mobile-open');
      });
    });
  }
}

// Stat counter animation
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-num');
  let animated = false;

  function triggerCounter() {
    if (stats.length && !animated) {
      const pos = stats[0].getBoundingClientRect().top;
      if (pos < window.innerHeight + 100) {
        animated = true;
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target') || '0');
          let count = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              stat.textContent = target + (stat.getAttribute('data-suffix') || '');
              clearInterval(timer);
            } else {
              stat.textContent = count + (stat.getAttribute('data-suffix') || '');
            }
          }, 30);
        });
      }
    }
  }

  // Trigger check on load and on scroll
  triggerCounter();
  window.addEventListener('scroll', triggerCounter);
}

/* ============================================================
   PORTAFOLIO · CÉSAR ESPAÑA — THEME.JS
   Comportamiento compartido por index, Analyst y Develop.
   ─────────────────────────────────────────────────────────────
   1. Movimiento (toggle "Motion" + prefers-reduced-motion)
   2. Preloader: bandada de aviones de papel alrededor de la "C"
   3. Hero: título letra por letra, ajuste al ancho, parallax
   4. Header, barra de progreso, scroll-spy, menú móvil
   5. Reveal al hacer scroll, palabras, contadores
   6. Cursor personalizado
   7. Proyectos (desde projects-data.js)
   8. Comparador antes / después
   9. Acordeón, modal de diplomas, formulario de contacto
  10. Asistente IA
   ============================================================ */

(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const page = body.dataset.page || 'home';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
    sget(k) { try { return sessionStorage.getItem(k); } catch (_) { return null; } },
    sset(k, v) { try { sessionStorage.setItem(k, v); } catch (_) {} }
  };

  /* ====== 1. MOVIMIENTO ====== */
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let motionOn = store.get('motion') ? store.get('motion') === 'on' : !prefersReduced;
  root.classList.toggle('no-motion', !motionOn);

  function syncMotionLabels() {
    $$('.motion-toggle').forEach(b => {
      b.setAttribute('aria-pressed', String(motionOn));
      const l = $('span', b); if (l) l.textContent = motionOn ? 'Motion on' : 'Motion off';
    });
  }
  $$('.motion-toggle').forEach(b => b.addEventListener('click', () => {
    motionOn = !motionOn;
    store.set('motion', motionOn ? 'on' : 'off');
    root.classList.toggle('no-motion', !motionOn);
    syncMotionLabels();
  }));
  syncMotionLabels();


  /* ====== 2. PRELOADER — bandada ====== */
  function runPreloader(done) {
    const pl = $('#preloader');
    if (!pl) return done();
    if (!motionOn) { pl.remove(); return done(); }

    body.classList.add('is-locked');
    const canvas = $('canvas', pl);
    const ctx = canvas.getContext('2d');
    const countEl = $('.pl-count', pl);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ['#ff8fa3', '#8fd5e8', '#b9a7ff', '#a8e6cf', '#ffd3a5', '#f4a6b8', '#e32b3c', '#ffffff'];
    let W, H, cx, cy, R;
    const mouse = { x: -999, y: -999 };

    function size() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.max(90, Math.min(W, H) * 0.17);
    }
    size();
    window.addEventListener('resize', size);
    pl.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    // duración: completa la primera vez por sesión, corta después
    const first = !store.sget('seen-loader');
    store.sset('seen-loader', '1');
    const dur = first ? 2600 : 1300;

    const N = W < 700 ? 30 : 48;
    const birds = Array.from({ length: N }, (_, i) => {
      // entran desde fuera y convergen hacia la "C" (más cerca si ya se vio)
      const a = Math.random() * Math.PI * 2;
      const d = first ? R * 1.6 + Math.random() * Math.max(W, H) * 0.45 : R * (0.9 + Math.random() * 0.5);
      return {
        x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d,
        vx: -Math.sin(a) * 3, vy: Math.cos(a) * 3,
        c: COLORS[i % COLORS.length],
        s: 6 + Math.random() * 5,
        r: R * (0.75 + Math.random() * 0.6),
        ph: Math.random() * 6.28,
        a: 1
      };
    });

    let mode = 'flock';
    let raf;
    function step(t) {
      ctx.fillStyle = 'rgba(6,6,6,0.32)';   // estela suave
      ctx.fillRect(0, 0, W, H);

      for (const b of birds) {
        let ax = 0, ay = 0, n = 0, avx = 0, avy = 0, mx = 0, my = 0, sx = 0, sy = 0;
        for (const o of birds) {
          if (o === b) continue;
          const dx = o.x - b.x, dy = o.y - b.y, d = Math.hypot(dx, dy);
          if (d < 70) { n++; avx += o.vx; avy += o.vy; mx += o.x; my += o.y; }
          if (d < 24 && d > 0) { sx -= dx / d; sy -= dy / d; }
        }
        if (mode === 'flock') {
          if (n) {
            ax += (avx / n - b.vx) * 0.045;            // alineación
            ay += (avy / n - b.vy) * 0.045;
            ax += (mx / n - b.x) * 0.0008;             // cohesión
            ay += (my / n - b.y) * 0.0008;
          }
          ax += sx * 0.09; ay += sy * 0.09;            // separación
          // órbita alrededor de la "C"
          const ang = Math.atan2(b.y - cy, b.x - cx) + 0.55;
          const tx = cx + Math.cos(ang) * b.r * (1 + 0.12 * Math.sin(t * 0.0012 + b.ph));
          const ty = cy + Math.sin(ang) * b.r * 0.82;
          ax += (tx - b.x) * 0.003; ay += (ty - b.y) * 0.003;
          // el ratón los espanta
          const md = Math.hypot(b.x - mouse.x, b.y - mouse.y);
          if (md < 110) { ax += (b.x - mouse.x) / md * 0.6; ay += (b.y - mouse.y) / md * 0.6; }
          b.vx += ax; b.vy += ay;
          const sp = Math.hypot(b.vx, b.vy), max = 4.2, min = 1.6;
          if (sp > max) { b.vx *= max / sp; b.vy *= max / sp; }
          if (sp < min) { b.vx *= min / sp; b.vy *= min / sp; }
        } else {
          // dispersión: salen disparados hacia afuera
          const dx = b.x - cx, dy = b.y - cy, d = Math.hypot(dx, dy) || 1;
          b.vx += dx / d * 0.9; b.vy += dy / d * 0.9 - 0.15;
          b.a = Math.max(0, b.a - 0.012);
        }
        b.x += b.vx; b.y += b.vy;
        drawPlane(b, t);
      }
      raf = requestAnimationFrame(step);
    }

    function drawPlane(b, t) {
      const ang = Math.atan2(b.vy, b.vx);
      const s = b.s;
      const flap = 0.62 + 0.38 * Math.abs(Math.sin(t * 0.008 + b.ph));
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(ang);
      ctx.scale(1, flap);
      ctx.globalAlpha = b.a;
      ctx.fillStyle = b.c;
      ctx.beginPath();
      ctx.moveTo(s, 0); ctx.lineTo(-s * 0.75, s * 0.6); ctx.lineTo(-s * 0.35, 0);
      ctx.closePath(); ctx.fill();
      ctx.globalAlpha = b.a * 0.55;
      ctx.beginPath();
      ctx.moveTo(s, 0); ctx.lineTo(-s * 0.35, 0); ctx.lineTo(-s * 0.75, -s * 0.6);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    raf = requestAnimationFrame(step);

    const t0 = performance.now();
    let loaded = document.readyState === 'complete';
    window.addEventListener('load', () => { loaded = true; });

    (function tick(now) {
      const k = Math.min(1, (now - t0) / dur);
      const shown = Math.round((loaded ? k : Math.min(k, 0.9)) * 100);
      countEl.textContent = String(shown).padStart(3, '0');
      pl.style.setProperty('--p', shown / 100);
      if (shown < 100 && now - t0 < 6000) return requestAnimationFrame(tick);
      countEl.textContent = '100';
      pl.style.setProperty('--p', 1);
      pl.classList.add('is-ready');
      setTimeout(() => { mode = 'scatter'; }, 250);
      setTimeout(() => {
        pl.classList.add('is-done');
        body.classList.remove('is-locked');
        done();
      }, 650);
      setTimeout(() => { cancelAnimationFrame(raf); pl.remove(); }, 1800);
    })(t0);
  }


  /* ====== 3. HERO ====== */
  function setupHeroTitle() {
    const title = $('.hero-title');
    if (!title) return;
    const text = title.textContent.trim();
    title.setAttribute('aria-label', text);
    title.innerHTML = '<span class="line" aria-hidden="true">' +
      [...text].map((c, i) => `<span class="ch" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('') +
      '</span>';
    const line = $('.line', title);
    function fit() {
      title.style.setProperty('--fit', '100px');
      const w = line.getBoundingClientRect().width;
      const avail = title.clientWidth - 2 * Math.max(12, window.innerWidth * 0.025);
      const maxByHeight = window.innerHeight * (window.innerWidth < 780 ? 0.24 : 0.36);
      title.style.setProperty('--fit', Math.min(100 * avail / w, maxByHeight) + 'px');
    }
    fit();
    window.addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }


  /* ====== 4. HEADER · PROGRESO · SPY · MENÚ ====== */
  function setupChrome() {
    const header = $('.site-header');
    const hero = $('.hero');
    let lastY = 0, ticking = false;

    function onScroll() {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
      if (header) {
        header.classList.toggle('is-scrolled', y > 20);
        header.classList.toggle('is-hidden', y > 500 && y > lastY && !root.classList.contains('menu-open'));
      }
      if (hero && motionOn && y < window.innerHeight * 1.2) hero.style.setProperty('--sy', y.toFixed(1));
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    // scroll-spy
    const links = $$('.desktop-nav a[href^="#"]');
    const map = links.map(a => [a, document.getElementById(a.getAttribute('href').slice(1))]).filter(p => p[1]);
    if (map.length) {
      const spy = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + e.target.id));
      }), { rootMargin: '-40% 0px -55% 0px' });
      map.forEach(p => spy.observe(p[1]));
    }

    // menú móvil
    const btn = $('.menu-btn');
    btn?.addEventListener('click', () => {
      const open = root.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', String(open));
      body.classList.toggle('is-locked', open);
    });
    $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
      root.classList.remove('menu-open');
      body.classList.remove('is-locked');
      btn?.setAttribute('aria-expanded', 'false');
    }));

    $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  }


  /* ====== 5. REVEAL · PALABRAS · CONTADORES ====== */
  function splitWords() {
    $$('[data-split]').forEach(el => {
      let i = 0;
      const walk = node => {
        [...node.childNodes].forEach(n => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(part => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
              const w = document.createElement('span');
              w.className = 'w';
              w.innerHTML = `<span style="--i:${i++}">${part}</span>`;
              frag.appendChild(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
        });
      };
      walk(el);
    });
  }

  function setupReveal() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal, [data-split], .work').forEach(el => io.observe(el));
  }

  function setupCounters() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const dec = +(el.dataset.dec || 0);
      const fmt = v => v.toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (!motionOn) { el.textContent = fmt(target); return; }
      const t0 = performance.now(), dur = 1600;
      (function step(t) {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = fmt(target * (1 - Math.pow(1 - k, 4)));
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    }), { threshold: 0.5 });
    $$('[data-count]').forEach(el => io.observe(el));
  }


  /* ====== 6. CURSOR ====== */
  function setupCursor() {
    if (!matchMedia('(pointer: fine)').matches) return;
    const dot = document.createElement('div'); dot.className = 'cursor';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    ring.innerHTML = '<span>VER</span>';
    body.append(dot, ring);
    root.classList.add('has-cursor');
    let x = -100, y = -100, rx = -100, ry = -100;
    window.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerover', e => {
      const view = e.target.closest('.work-media');
      const hover = e.target.closest('a, button, .cert, .acc-head, summary, .compare');
      ring.classList.toggle('is-view', !!view);
      ring.classList.toggle('is-hover', !view && !!hover);
    });
  }


  /* ====== 7. PROYECTOS ====== */
  function renderProjects() {
    const grid = $('[data-projects]');
    if (!grid) return;
    const list = grid.dataset.projects === 'dev'
      ? (typeof DEV_PROJECTS !== 'undefined' ? DEV_PROJECTS : [])
      : (typeof ANALYST_PROJECTS !== 'undefined' ? ANALYST_PROJECTS : []);
    const status = {
      live: ['En vivo', ''], wip: ['En desarrollo', 'wip'],
      demo: ['Código', 'wip'], private: ['Privado', 'wip']
    };
    const cta = $('.work-cta', grid);
    list.forEach((p, i) => {
      let [label, cls] = status[p.status] || status.demo;
      if (p.status === 'live' && !p.demo && p.repo) [label, cls] = ['Código abierto', ''];
      const link = p.demo || p.repo;
      const media = p.image
        ? `<img src="Projects/${p.image}" alt="Captura de ${p.title}" loading="lazy">`
        : `<div class="glyph-art" aria-hidden="true">${p.glyph || '◈'}</div>`;
      const art = document.createElement('article');
      art.className = 'work';
      art.innerHTML = `
        <${link ? `a href="${link}" target="_blank" rel="noopener"` : 'div'} class="work-media" aria-label="${p.title}">
          ${media}
          <span class="status ${cls}"><i></i>${label}</span>
          <span class="curtain"></span>
        </${link ? 'a' : 'div'}>
        <div class="work-info">
          <span class="work-num">${String(i + 1).padStart(2, '0')}</span>
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="work-tags">${(p.tags || []).map(t => `<span class="chip">${t}</span>`).join('')}</div>
          <div class="work-foot">
            <span>${[p.year, p.client].filter(Boolean).join(' · ')}</span>
            <span class="work-links">
              ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Demo <span>↗</span></a>` : ''}
              ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">GitHub <span>↗</span></a>` : ''}
            </span>
          </div>
        </div>`;
      grid.insertBefore(art, cta);
    });
  }


  /* ====== 8. COMPARADOR ====== */
  function setupCompare() {
    $$('.compare').forEach(cmp => {
      let dragging = false, demoDone = false;
      const set = clientX => {
        const r = cmp.getBoundingClientRect();
        const p = Math.max(0, Math.min(100, (clientX - r.left) / r.width * 100));
        cmp.style.setProperty('--pos', p + '%');
      };
      cmp.addEventListener('pointerdown', e => { dragging = true; demoDone = true; cmp.setPointerCapture(e.pointerId); set(e.clientX); });
      cmp.addEventListener('pointermove', e => { if (dragging) set(e.clientX); });
      cmp.addEventListener('pointerup', () => { dragging = false; });
      cmp.addEventListener('pointercancel', () => { dragging = false; });
      const div = $('.divider', cmp);
      div?.setAttribute('tabindex', '0');
      div?.setAttribute('role', 'slider');
      div?.setAttribute('aria-label', 'Mover comparador');
      div?.addEventListener('keydown', e => {
        const cur = parseFloat(getComputedStyle(cmp).getPropertyValue('--pos')) || 50;
        if (e.key === 'ArrowLeft') cmp.style.setProperty('--pos', Math.max(0, cur - 5) + '%');
        if (e.key === 'ArrowRight') cmp.style.setProperty('--pos', Math.min(100, cur + 5) + '%');
      });
      // pequeño barrido automático la primera vez que aparece
      const io = new IntersectionObserver(es => {
        if (!es[0].isIntersecting || demoDone || !motionOn) return;
        io.disconnect();
        const t0 = performance.now();
        (function sweep(t) {
          if (demoDone) return;
          const k = Math.min(1, (t - t0) / 2200);
          cmp.style.setProperty('--pos', (50 + Math.sin(k * Math.PI * 2) * 32) + '%');
          if (k < 1) requestAnimationFrame(sweep);
        })(t0);
      }, { threshold: 0.6 });
      io.observe(cmp);
    });
  }


  /* ====== 9. ACORDEÓN · MODAL · FORMULARIO ====== */
  function setupAccordion() {
    $$('.acc-head').forEach(h => {
      h.setAttribute('aria-expanded', String(h.parentElement.classList.contains('open')));
      h.addEventListener('click', () => {
        const item = h.parentElement;
        const open = item.classList.toggle('open');
        h.setAttribute('aria-expanded', String(open));
      });
    });
  }

  function setupPdfModal() {
    const modal = $('#pdfModal');
    if (!modal) return;
    const frame = $('#pdfModalFrame'), title = $('#pdfModalTitle'), dl = $('#pdfModalDownload');
    let lastFocus = null;
    const open = (pdf, name) => {
      lastFocus = document.activeElement;
      frame.src = pdf; title.textContent = name; dl.href = pdf;
      modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
      body.classList.add('is-locked');
      $('#pdfModalClose').focus();
    };
    const close = () => {
      modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
      body.classList.remove('is-locked');
      setTimeout(() => { frame.src = 'about:blank'; }, 400);
      lastFocus?.focus();
    };
    $$('[data-pdf]').forEach(el => {
      const go = () => open(el.dataset.pdf, el.dataset.title || $('h4', el)?.textContent || 'Diploma');
      el.addEventListener('click', go);
      if (el.tagName !== 'BUTTON') {
        el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      }
    });
    $('#pdfModalClose')?.addEventListener('click', close);
    $('.pdf-modal-bg', modal)?.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
  }

  function setupBriefForm() {
    const form = $('#briefForm');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = `Proyecto: ${d.get('tipo') || 'Colaboración'} · ${d.get('nombre') || ''}`.trim();
      const text = `Hola César,\n\n${d.get('mensaje') || ''}\n\n${d.get('nombre') || ''}${d.get('empresa') ? ' · ' + d.get('empresa') : ''}`;
      window.location.href = `mailto:cesarespana.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    });
  }


  /* ====== 10. ASISTENTE IA ====== */
  const PROFILE = `Eres el asistente del portafolio de César Libardo España Salguero. Datos verificados:
- Ingeniero en Sistemas (Universidad de la Amazonia) y Magíster en Inteligencia Artificial (Università degli Studi Guglielmo Marconi · AICAD Business School, Italia). También graduado del Master in AI & Data Science (Dev Senior Code · Florida Global University) y del programa Desarrollador Junior Full-Stack Java (Generation Colombia).
- Experiencia: Analista de Datos y Desarrollador freelance desde marzo de 2024 (más de 1 año): tableros en Power BI con modelo estrella y DAX, datos preparados con Python y Pandas, cada cifra validada contra la fuente. Docente por horas cátedra en POLINTEC (oct 2025 a may 2026): Python, fundamentos de IA y diseño gráfico. Auxiliar Técnico en SAIR (mar 2023 a mar 2025): sistemas, servidores, bases de datos, respaldos y soporte.
- Proyectos: Dashboard SGD para Computadores para Educar (1.895 sedes, 33 departamentos, 34.110 sesiones, 53 medidas DAX, Claude conectado a Power BI vía MCP); TFM de cáncer de pulmón con CNN (1.097 tomografías, 83 grupos de paciente, mostró que partir por imagen infla la exactitud de 85,7% a 99,8%); AI-XRay neumonía con ResNet50 (F1 0,937, AUC 0,987, MLflow, FastAPI); Análisis ICFES Saber Pro (1.22 millones de registros); CesarX Analytics (Spring Boot 3, JWT, Flyway, Angular, FastAPI, scikit-learn; proyecciones validadas a cinco plazos contra la media histórica); PagoClaro (conciliación idempotente con 15 pruebas); monitor de sismos (Airflow, RabbitMQ, MongoDB, Grafana, Docker); AgroConecta (e-commerce en equipo de 4: SPA en JavaScript y API en Spring Boot con JWT; demo en cesarespa.github.io/AgroConecta).
- Stack: Python, Pandas, NumPy, SQL (PostgreSQL, MySQL), MongoDB, Power BI, DAX, Excel avanzado, scikit-learn, TensorFlow/Keras, MLflow, PySpark, FastAPI, Docker, Java, Spring Boot, Spring Security/JWT, JPA, Angular, JavaScript, Git, Claude Code, MCP, Ollama.
- Idiomas: español nativo, inglés B1. Ubicación: Colombia. Prefiere remoto; acepta híbrido o presencial en Bogotá, Medellín u otras ciudades de Colombia.
- Contacto: cesarespana.dev@gmail.com · +57 310 588 5140.
Responde siempre en español, en máximo 3 frases, cercano y profesional. No inventes datos que no estén aquí; si no sabes algo, sugiere escribirle a César.`;

  const FALLBACK = {
    contratar: 'César une datos e ingeniería: es Magíster en IA, construye tableros en Power BI para clientes reales y también APIs con Spring Boot y FastAPI. Valida cada cifra antes de entregar; en su TFM demostró cómo una mala partición infla la exactitud de 85,7% a 99,8%.',
    resumen: 'Ingeniero en Sistemas y Magíster en IA con más de 1 año como analista de datos y desarrollador freelance. Trabaja con Python, Power BI, SQL, machine learning y Java/Spring Boot.',
    stack: page === 'dev'
      ? 'Backend: Java, Spring Boot, Spring Security/JWT, FastAPI. Frontend: Angular y JavaScript. Datos: PostgreSQL, MySQL, MongoDB. IA: scikit-learn, TensorFlow, Claude Code y MCP.'
      : 'Datos: Python, Pandas, SQL, Power BI y DAX. Machine learning: scikit-learn, TensorFlow/Keras, MLflow y PySpark. IA generativa: Claude, MCP y Ollama.',
    email: 'Asunto: Oportunidad para colaborar\n\nHola César,\n\nVi tu portafolio y me interesa tu perfil en datos e IA. Tengo un proyecto donde podrías encajar. ¿Hablamos 15 minutos esta semana?\n\nGracias,',
    default: 'Puedo contarte sobre su experiencia, sus proyectos (Dashboard SGD, TFM, AI-XRay, CesarX), su stack o redactarte un correo para contactarlo.'
  };
  function fallback(q) {
    const t = q.toLowerCase();
    if (/contrat|por qu|porqu/.test(t)) return FALLBACK.contratar;
    if (/resumen|frase|quién|quien/.test(t)) return FALLBACK.resumen;
    if (/stack|herramienta|tecno/.test(t)) return FALLBACK.stack;
    if (/email|correo|redacta|mensaje/.test(t)) return FALLBACK.email;
    return FALLBACK.default;
  }

  function setupAi() {
    const orb = $('#aiOrb'), panel = $('#aiPanel');
    if (!orb || !panel) return;
    const input = $('#aiInput'), out = $('#aiBody');
    const toggle = open => {
      panel.classList.toggle('open', open);
      orb.setAttribute('aria-expanded', String(open));
      if (open) setTimeout(() => input.focus(), 300);
    };
    orb.addEventListener('click', () => toggle(!panel.classList.contains('open')));
    $('#aiClose').addEventListener('click', () => toggle(false));
    const add = (text, who) => {
      const d = document.createElement('div');
      d.className = 'ai-msg ' + who; d.textContent = text;
      out.appendChild(d); out.scrollTop = out.scrollHeight; return d;
    };
    async function ask(q) {
      if (!q.trim()) return;
      add(q, 'user');
      const m = add('…', 'bot');
      try {
        if (window.claude && window.claude.complete) {
          const r = await window.claude.complete({ messages: [{ role: 'user', content: PROFILE + '\n\nPregunta: ' + q }] });
          m.textContent = (r || '').trim() || fallback(q);
        } else m.textContent = fallback(q);
      } catch (_) { m.textContent = fallback(q); }
      out.scrollTop = out.scrollHeight;
    }
    $('#aiForm').addEventListener('submit', e => { e.preventDefault(); const q = input.value; input.value = ''; ask(q); });
    $$('.ai-sugs button').forEach(b => b.addEventListener('click', () => ask(b.textContent)));
  }


  /* ====== ARRANQUE ====== */
  setupHeroTitle();
  renderProjects();
  splitWords();
  setupChrome();
  setupReveal();
  setupCounters();
  setupCursor();
  setupCompare();
  setupAccordion();
  setupPdfModal();
  setupBriefForm();
  setupAi();
  runPreloader(() => root.classList.add('is-loaded'));
})();

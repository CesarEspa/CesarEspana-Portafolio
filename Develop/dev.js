/* ============================================================
   PORTFOLIO DEV · CÉSAR ESPAÑA — DEV.JS
   ─────────────────────────────────────────────────────────────
   Estructura:
     1. Modal de diplomas (PDF lightbox)
     2. Reveal on scroll
     3. Contadores numéricos
     4. Sparklines
     5. Asistente IA
     6. Renderizado de proyectos (desde projects-data.js)
     7. Sidebar: toggle responsive + scroll-spy
     8. Main (entry point)
   ============================================================ */


/* ====== 1. MODAL DE DIPLOMAS ====== */
(function diplomasModal() {
  const modal    = document.getElementById('pdfModal');
  const frame    = document.getElementById('pdfModalFrame');
  const title    = document.getElementById('pdfModalTitle');
  const closeBtn = document.getElementById('pdfModalClose');
  const dl       = document.getElementById('pdfModalDownload');
  const bg       = modal && modal.querySelector('.pdf-modal-bg');
  if (!modal) return;

  function open(pdf, name) {
    frame.src = pdf;
    title.textContent = name;
    dl.href = pdf;
    dl.setAttribute('download', '');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    frame.src = 'about:blank';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cert[data-pdf]').forEach(li => {
    const pdf = li.dataset.pdf;
    const name = li.querySelector('h4')?.textContent || 'Diploma';
    li.addEventListener('click', () => open(pdf, name));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(pdf, name); }
    });
  });

  closeBtn?.addEventListener('click', close);
  bg?.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
})();


/* ====== 2. REVEAL ON SCROLL ====== */
function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}


/* ====== 3. CONTADORES NUMÉRICOS ====== */
function setupCounters() {
  function animateCount(el) {
    const target = +el.dataset.count;
    const dur = 1100;
    const t0 = performance.now();
    function step(t) {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(eased * target);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
}


/* ====== 4. SPARKLINES ====== */
function setupSparklines() {
  document.querySelectorAll('.spark .fg').forEach((p) => {
    try {
      const len = p.getTotalLength();
      p.style.strokeDasharray  = len;
      p.style.strokeDashoffset = len;
      p.style.transition = 'stroke-dashoffset 1.6s ease 0.3s';
      const obs = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            p.style.strokeDashoffset = 0;
            obs.unobserve(p);
          }
        }
      }, { threshold: 0.4 });
      obs.observe(p);
    } catch (_) {}
  });
}


/* ====== 5. ASISTENTE IA ====== */

const AI_CONTEXT = `Eres el asistente conversacional del portafolio personal de César Libardo España Salguero.
Datos clave que conoces:
- Nombre: César Libardo España Salguero. Ubicación: Florencia, Caquetá, Colombia.
- Profesión: Desarrollador Full-Stack (Java Spring Boot, Angular, Node.js, .NET) y Analista/Científico de Datos en formación de IA.
- Email: cesarespana.dev@gmail.com — Tel: +57 310 588 5140.
- Educación activa (en paralelo): Maestría Oficial en Inteligencia Artificial (Università G. Marconi, Roma), Máster en IA & Data Science (Dev Senior Code), Full-Stack Java (Generations Colombia, mar–jun 2026).
- Educación: Ingeniero de Sistemas, Universidad de la Amazonia (2018–2025).
- Stack Dev: Java, Spring Boot, Angular, Node.js, .NET, JavaScript, HTML, CSS, MySQL, SQL Server, Git.
- Stack Data: Python, Pandas, SQL, Power BI, Excel, scikit-learn, ML supervisado y no supervisado.
- Métricas más fuertes: +5 clientes en producción, -40% tiempo de generación de reportes, 3 programas activos en paralelo.
- Idiomas: Español nativo, Inglés B1.
- Disponibilidad: freelance + busca su primer rol full-time junior como desarrollador en 2026.

Responde SIEMPRE en español, en máximo 3 frases, con tono cercano y profesional.
Si te piden redactar un email de contacto, escríbelo cordial, breve y con CTA claro.
No inventes datos que no estén en este contexto.`;

const AI_FALLBACK = {
  contratar: "César combina desarrollo full-stack (Java Spring Boot, Angular, Node.js) con ciencia de datos. Es raro y útil: entiende el problema con datos y construye la solución en producción. Ya tiene +5 clientes activos.",
  resumen:   "Desarrollador full-stack Java Spring Boot con +5 clientes freelance y analista de datos en formación de IA en Roma. Construye apps web completas y APIs REST documentadas.",
  stack:     "Backend: Java/Spring Boot, Node.js, .NET. Frontend: Angular, TypeScript, JavaScript. Datos: MySQL, SQL Server, Python, Power BI.",
  email:     "Asunto: Oportunidad para colaborar\n\nHola César,\n\nVi tu portafolio y me interesa cómo combinas backend Java con datos. Tengo un proyecto donde encajaría tu perfil — ¿te cuento por una llamada de 15 minutos esta semana?\n\nGracias,",
  default:   "Buena pregunta. Puedes preguntarme por su stack, su experiencia con clientes, su formación en IA o pedirme que redacte un email de contacto."
};

function fallbackAnswer(q) {
  const t = q.toLowerCase();
  if (t.includes('contrat') || t.includes('porqu') || t.includes('por qué')) return AI_FALLBACK.contratar;
  if (t.includes('resumen') || t.includes('frase') || t.includes('quién'))   return AI_FALLBACK.resumen;
  if (t.includes('stack')  || t.includes('herramienta') || t.includes('tecn')) return AI_FALLBACK.stack;
  if (t.includes('email')  || t.includes('correo') || t.includes('redacta') || t.includes('mensaje')) return AI_FALLBACK.email;
  return AI_FALLBACK.default;
}

function setupAiAssistant() {
  const orb     = document.getElementById('aiOrb');
  const panel   = document.getElementById('aiPanel');
  const closeBt = document.getElementById('aiClose');
  const form    = document.getElementById('aiForm');
  const input   = document.getElementById('aiInput');
  const body    = document.getElementById('aiBody');
  const sugs    = document.querySelectorAll('.ai-sug');

  if (!orb || !panel) return;

  function open()   { panel.classList.add('open'); setTimeout(() => input.focus(), 80); }
  function close()  { panel.classList.remove('open'); }
  function toggle() { panel.classList.toggle('open'); if (panel.classList.contains('open')) input.focus(); }

  orb.addEventListener('click', toggle);
  closeBt.addEventListener('click', close);

  function addMsg(text, who) {
    const d = document.createElement('div');
    d.className = 'ai-msg ' + who;
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  async function ask(question) {
    if (!question.trim()) return;
    addMsg(question, 'user');
    const thinking = addMsg('...', 'bot');
    try {
      if (window.claude && window.claude.complete) {
        const out = await window.claude.complete({
          messages: [
            { role: 'user', content: AI_CONTEXT + '\n\nPregunta: ' + question }
          ]
        });
        thinking.textContent = (out || '').trim() || fallbackAnswer(question);
      } else {
        thinking.textContent = fallbackAnswer(question);
      }
    } catch (err) {
      thinking.textContent = fallbackAnswer(question);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value;
    input.value = '';
    ask(q);
  });

  sugs.forEach((b) => {
    b.addEventListener('click', () => ask(b.textContent));
  });
}


/* ====== 6. RENDERIZADO DE PROYECTOS ======
   Lee DEV_PROJECTS (definido en ../projects-data.js)
   y genera las tarjetas dentro de #projects-grid. */

function renderProjects(projects, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid || !Array.isArray(projects)) return;

  const statusMap = {
    live:    { label: '● en vivo',       cls: 'live' },
    wip:     { label: '◐ en desarrollo', cls: 'wip'  },
    demo:    { label: '◈ demo',          cls: 'demo' },
    private: { label: '⊘ privado',       cls: 'priv' }
  };

  projects.forEach(p => {
    const st = statusMap[p.status] || statusMap.demo;
    const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    const statusTag = `<span class="tag proj-status ${st.cls}">${st.label}</span>`;

    const demoBtn = p.demo
      ? `<a class="proj-link proj-link--primary" href="${p.demo}" target="_blank" rel="noopener">Ver demo <span class="arrow">↗</span></a>`
      : '';
    const repoBtn = p.repo
      ? `<a class="proj-link" href="${p.repo}" target="_blank" rel="noopener">GitHub <span class="arrow">↗</span></a>`
      : '';

    const metaSpan = p.client
      ? `<span>${p.year} · ${p.client}</span>`
      : `<span>${p.year || ''}</span>`;

    const footHtml = `<div class="foot">
      ${metaSpan}
      ${(demoBtn || repoBtn)
        ? `<div class="proj-links">${demoBtn}${repoBtn}</div>`
        : `<span class="proj-req">solicitar acceso →</span>`}
    </div>`;

    const previewHtml = p.image
      ? `<div class="proj-preview proj-preview--img">
           <img src="Projects/${p.image}" alt="${p.title}" loading="lazy" />
         </div>`
      : `<div class="proj-preview">
           <span class="proj-glyph">${p.glyph || '◈'}</span>
           <span class="proj-preview-label">${(p.tags && p.tags[0]) || ''}</span>
         </div>`;

    const article = document.createElement('article');
    article.className = 'proj reveal';
    article.innerHTML = `
      <div class="tags">${tags}${statusTag}</div>
      ${previewHtml}
      <h3>${p.title || ''}</h3>
      <p>${p.desc || ''}</p>
      ${footHtml}
    `;
    grid.appendChild(article);
  });
}


/* ====== 7. SIDEBAR: toggle responsive + scroll-spy ====== */

function setupSidebar() {
  const sidebar = document.querySelector('.ide-sidebar');
  const toggle  = document.getElementById('sideToggle');
  if (!sidebar) return;

  // toggle responsive (móvil)
  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // scroll-spy: marca el archivo activo según la sección visible
  const links = sidebar.querySelectorAll('.side-files a[data-spy]');
  const sections = [...links]
    .map(a => document.getElementById(a.dataset.spy))
    .filter(Boolean);

  if (!sections.length) return;

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.dataset.spy === id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => spy.observe(s));
}


/* ====== 8. MAIN ====== */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Proyectos dinámicos (antes que reveal para que el observer los pille)
  if (typeof DEV_PROJECTS !== 'undefined') {
    renderProjects(DEV_PROJECTS, 'projects-grid');
  }

  // 2. Animaciones y micro-interacciones
  setupReveal();
  setupCounters();
  setupSparklines();

  // 3. Navegación del sidebar
  setupSidebar();

  // 4. Asistente IA
  setupAiAssistant();
});

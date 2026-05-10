/* ============================================================
   PORTFOLIO DATA · CÉSAR ESPAÑA — ANALYST.JS
   ============================================================ */

/* ====== MODAL DE DIPLOMAS ====== */
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


/* ====== NEURAL-NET ====== */
/* ============================================================
   neural-net.js
   Canvas de fondo: puntos que se mueven y se conectan,
   con pulsos viajando entre ellos.

   Parámetros que puedes tocar (en main.js al llamar):
     density   — qué tan poblado (más = más puntos)
     maxLink   — distancia máxima de conexión (fracción del ancho)
     speed     — velocidad inicial
     pulseRate — probabilidad de que aparezca un pulso por frame
     fixed     — true para que ocupe todo el viewport
   ============================================================ */

function makeNeuralNet(canvas, opts) {
  const cfg = Object.assign({
    density:   0.00012,
    maxLink:   0.15,
    speed:     0.6,
    damping:   0.998,
    wander:    0.018,
    pulseRate: 0.10,
    fixed:     false,
    nodeColor: 'rgba(236,233,245,0.85)',
    colorA:    'rgba(200,168,255,OP)',
    colorB:    'rgba(143,213,232,OP)'
  }, opts || {});

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const mouse = { x: -9999, y: -9999, active: false };

  let w, h, nodes, pulses, raf;

  function resize() {
    let cssW, cssH;
    if (cfg.fixed) {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
    } else {
      const rect = canvas.parentElement.getBoundingClientRect();
      cssW = rect.width;
      cssH = Math.max(540, rect.height);
    }
    canvas.width  = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width  = cssW + 'px';
    canvas.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    w = cssW;
    h = cssH;
  }

  function init() {
    resize();
    const N = Math.max(20, Math.min(180, Math.round(w * h * cfg.density)));
    nodes = [];
    for (let i = 0; i < N; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * cfg.speed,
        vy: (Math.random() - 0.5) * cfg.speed,
        r: Math.random() * 1.4 + 0.6,
        ph: Math.random() * Math.PI * 2
      });
    }
    pulses = [];
  }

  function spawnPulse() {
    if (!nodes || nodes.length < 2) return;
    const a = (Math.random() * nodes.length) | 0;
    let b = (Math.random() * nodes.length) | 0;
    if (a === b) b = (b + 1) % nodes.length;
    pulses.push({ a: a, b: b, t: 0, life: 0.9 + Math.random() * 0.6 });
  }

  function frame(now) {
    ctx.clearRect(0, 0, w, h);
    const maxL = w * cfg.maxLink;

    // edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < maxL) {
          const op = (1 - d / maxL) * 0.42;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, cfg.colorA.replace('OP', op.toFixed(3)));
          grad.addColorStop(1, cfg.colorB.replace('OP', (op * 0.6).toFixed(3)));
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // pulses (señales viajando entre nodos)
    if (Math.random() < cfg.pulseRate) spawnPulse();
    for (let p = pulses.length - 1; p >= 0; p--) {
      const P = pulses[p];
      P.t += 0.012;
      if (P.t >= P.life) { pulses.splice(p, 1); continue; }
      const A = nodes[P.a], B = nodes[P.b];
      if (!A || !B) { pulses.splice(p, 1); continue; }
      const k = Math.min(1, P.t / P.life);
      const x = A.x + (B.x - A.x) * k;
      const y = A.y + (B.y - A.y) * k;
      const fade = Math.sin(k * Math.PI);
      ctx.beginPath();
      ctx.arc(x, y, 1.6 + fade * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,168,255,' + (0.95 * fade).toFixed(2) + ')';
      ctx.shadowColor = 'rgba(200,168,255,0.9)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // nodes
    for (const n of nodes) {
      // repulsión suave del mouse
      if (mouse.active) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (1 - d2 / 14000) * 0.6;
          n.vx += (dx / Math.sqrt(d2 + 0.001)) * f;
          n.vy += (dy / Math.sqrt(d2 + 0.001)) * f;
        }
      }
      n.x += n.vx; n.y += n.vy;
      n.vx *= cfg.damping; n.vy *= cfg.damping;
      n.vx += (Math.random() - 0.5) * cfg.wander;
      n.vy += (Math.random() - 0.5) * cfg.wander;
      if (n.x < 0) { n.x = 0; n.vx *= -1; }
      if (n.x > w) { n.x = w; n.vx *= -1; }
      if (n.y < 0) { n.y = 0; n.vy *= -1; }
      if (n.y > h) { n.y = h; n.vy *= -1; }
      const tw = 0.7 + Math.sin((now || 0) * 0.002 + n.ph) * 0.3;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = cfg.nodeColor.replace('0.85', tw.toFixed(2));
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  }

  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.active = true;
  }
  function onLeave() { mouse.active = false; mouse.x = mouse.y = -9999; }

  const target = cfg.fixed ? window : canvas.parentElement;
  target.addEventListener('mousemove', onMove, { passive: true });
  target.addEventListener('mouseleave', onLeave);

  init();
  frame();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    init();
    frame();
  });
}

/* ====== REVEAL ====== */
/* ============================================================
   reveal.js
   - Aparición al hacer scroll (.reveal → .reveal.in)
   - Conteo de números (data-count)
   - Animación de las sparklines (svg path .spark .fg)
   ============================================================ */

function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.18 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

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

/* ====== AI-ASSISTANT ====== */
/* ============================================================
   ai-assistant.js
   Widget flotante "Pregúntale al portafolio".
   Responde con window.claude.complete (si está disponible)
   y cae a un fallback offline si no hay conexión.
   ============================================================ */

const AI_CONTEXT = `Eres el asistente conversacional del portafolio personal de César Libardo España Salguero.
Datos clave que conoces:
- Nombre: César Libardo España Salguero. Ubicación: Florencia, Caquetá, Colombia.
- Profesión: Analista de Datos y Científico de Datos en formación de IA, y Desarrollador Full-Stack (Java Spring Boot, Node.js, .NET).
- Email: cesarespana.dev@gmail.com — Tel: +57 310 588 5140.
- Educación activa (en paralelo): Maestría Oficial en Inteligencia Artificial (Università G. Marconi, Roma), Máster en IA & Data Science (Dev Senior Code), Full-Stack Java (Generations Colombia, mar–jun 2026).
- Educación: Ingeniero de Sistemas, Universidad de la Amazonia (2018–2025).
- Stack Data: Python, Pandas, SQL, Power BI, Excel, scikit-learn, ML supervisado y no supervisado, feature engineering.
- Stack Dev: Java, Spring Boot, Node.js, .NET, JavaScript, HTML, CSS, MySQL, SQL Server, Git, Figma.
- Métricas más fuertes: -40% tiempo de generación de reportes, +5 clientes en producción, 3 programas activos en paralelo.
- Idiomas: Español nativo, Inglés B1.
- Disponibilidad: freelance + busca su primer rol full-time junior en datos/IA en 2026.

Responde SIEMPRE en español, en máximo 3 frases, con tono cercano y profesional.
Si te piden redactar un email de contacto, escríbelo cordial, breve y con CTA claro.
No inventes datos que no estén en este contexto.`;

const AI_FALLBACK = {
  contratar: "César combina ciencia de datos (Python, ML, Power BI) con desarrollo full-stack (Java Spring Boot, Node.js). Eso es raro y útil: puede entender el problema con datos, y construir la solución en producción. Además entrega — ya tiene +5 clientes activos.",
  resumen: "Analista y científico de datos en formación de IA en Roma, y desarrollador full-stack con +5 clientes freelance. Reduce tiempos de reporte un 40% con Power BI y construye apps con Java Spring Boot y .NET.",
  stack: "Para IA y datos: Python, Pandas, SQL, scikit-learn y Power BI. Para web: JavaScript, Java/Spring Boot, Node.js, .NET, MySQL.",
  email: "Asunto: Oportunidad para colaborar\n\nHola César,\n\nVi tu portafolio y me interesa cómo combinas datos con desarrollo. Tengo un proyecto donde encajaría tu perfil — ¿te cuento por una llamada de 15 minutos esta semana?\n\nGracias,",
  default: "Buena pregunta. Puedes preguntarme por su stack, su experiencia con clientes, su formación en IA o pedirme que redacte un email de contacto."
};

function fallbackAnswer(q) {
  const t = q.toLowerCase();
  if (t.includes('contrat') || t.includes('porqu') || t.includes('por qué')) return AI_FALLBACK.contratar;
  if (t.includes('resumen') || t.includes('frase') || t.includes('quién')) return AI_FALLBACK.resumen;
  if (t.includes('stack') || t.includes('herramienta') || t.includes('tecn')) return AI_FALLBACK.stack;
  if (t.includes('email') || t.includes('correo') || t.includes('redacta') || t.includes('mensaje')) return AI_FALLBACK.email;
  return AI_FALLBACK.default;
}

function setupAiAssistant() {
  const orb     = document.getElementById('aiOrb');
  const panel   = document.getElementById('aiPanel');
  const closeBt = document.getElementById('aiClose');
  const askBt   = document.getElementById('askAi');
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
  if (askBt) askBt.addEventListener('click', open);

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

/* ====== MAIN ====== */
/* ============================================================
   main.js — punto de entrada
   Llama a las demás funciones en orden.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Red neuronal del HERO (densa, viva)
  const heroCanvas = document.getElementById('netCanvas');
  if (heroCanvas) {
    makeNeuralNet(heroCanvas, {
      density:   0.00018,
      maxLink:   0.16,
      speed:     0.85,
      damping:   0.998,
      wander:    0.020,
      pulseRate: 0.18,
      fixed:     false
    });
  }

  // 2. Red neuronal de FONDO global (sutil, todo el viewport)
  const ambientCanvas = document.getElementById('ambientNet');
  if (ambientCanvas) {
    makeNeuralNet(ambientCanvas, {
      density:   0.00005,
      maxLink:   0.20,
      speed:     0.45,
      damping:   0.997,
      wander:    0.012,
      pulseRate: 0.05,
      fixed:     true,
      nodeColor: 'rgba(217,213,229,0.85)',
      colorA:    'rgba(160,128,220,OP)',
      colorB:    'rgba(120,180,205,OP)'
    });
  }

  // 3. Animaciones de aparición y métricas
  setupReveal();
  setupCounters();
  setupSparklines();

  // 4. Widget de IA
  setupAiAssistant();
});


/* ============================================================
   PROJECTS DATA — Portafolio César España
   ─────────────────────────────────────────────────────────────
   Para agregar un proyecto, copia un bloque y pega al final
   del array correspondiente. El orden aquí = orden en pantalla.

   CAMPOS:
     title   — Nombre del proyecto (tarjeta)
     desc    — Descripción breve (1–2 oraciones)
     tags    — Array de etiquetas de tecnología
     glyph   — Símbolo decorativo en la preview: {} / π / λ / ∑ / ◈
     image   — Nombre de archivo de screenshot (ej: "DogEmotion.png").
               Coloca el archivo en Analyst/Proyects/ para páginas de Analyst,
               o en Develop/Proyects/ para páginas de Dev.
               Si es null, se muestra el glyph como antes.
     demo    — URL del demo (null = no muestra botón Demo)
     repo    — URL de GitHub (null = no muestra botón GitHub)
     status  — "live" | "wip" | "demo" | "private"
     year    — Año o rango: "2024" | "2024–25"
     client  — Contexto corto: "+5 clientes" | "cliente educativo" | null
   ============================================================ */


// ═══════════════════════════════════════════════════════════════
//  PROYECTOS DEV — Full-Stack · Backend · APIs
//  Aparecen en dev.html, sección "Proyectos"
// ═══════════════════════════════════════════════════════════════
const DEV_PROJECTS = [

  // ── Ejemplo de proyecto con demo y repo ────────────────────
  // {
  //   title:  "Mi proyecto",
  //   desc:   "Descripción breve del proyecto y qué problema resuelve.",
  //   tags:   ["Java · Spring Boot", "Angular", "MySQL"],
  //   glyph:  "{}",
  //   demo:   "https://mi-demo.com",
  //   repo:   "https://github.com/CesarEspa/mi-repo",
  //   status: "live",
  //   year:   "2025",
  //   client: "nombre cliente"
  // },

  {
    title: "AgroConecta — plataforma SPA para el sector agropecuario",
    desc: "SPA full-stack desarrollada en equipo (Generations Colombia) con Angular en el frontend y Java Spring Boot en el backend. Gestiona usuarios, servicios y flujos de negocio del sector agropecuario con arquitectura REST y despliegue en GitHub Pages.",
    tags: ["Java · Spring Boot", "Angular", "MySQL", "REST API"],
    glyph: "{}",
    image: "AgroConecta.png",
    demo: "https://danielvega825.github.io/AgroConecta-t8-SPAs/#/",
    repo: "https://github.com/DanielVega825/AgroConecta-t8-SPAs",
    status: "live",
    year: "2026",
    client: "Generations CO · Equipo 8"
  },

  {
    title: "API REST — reservas y servicios",
    desc: "Backend en Node.js + Express con autenticación JWT y endpoints documentados, integrado con panel admin web para gestión de reservas.",
    tags: ["Node.js · Express", "MySQL", "REST API"],
    glyph: "/>",
    demo: null,
    repo: null,
    status: "live",
    year: "2024",
    client: "cliente servicios"
  },

  {
    title: "Sistema de inventario — .NET + SQL Server",
    desc: "Aplicación web con .NET para control de stock, generación de reportes y alertas de inventario. Arquitectura en capas con Entity Framework.",
    tags: [".NET", "SQL Server", "Entity Framework"],
    glyph: "[ ]",
    demo: null,
    repo: null,
    status: "wip",
    year: "2025",
    client: "en desarrollo"
  },

];


// ═══════════════════════════════════════════════════════════════
//  PROYECTOS ANALYST — Datos · IA · Dashboards
//  Aparecen en analyst.html, sección "Proyectos"
// ═══════════════════════════════════════════════════════════════
const ANALYST_PROJECTS = [

  // ── Ejemplo con link a Power BI Service ────────────────────
  // {
  //   title:  "Dashboard de ventas",
  //   desc:   "Reporte interactivo conectado a MySQL con drill-down por región y producto.",
  //   tags:   ["Power BI", "SQL", "Excel"],
  //   glyph:  "∑",
  //   demo:   "https://app.powerbi.com/view?r=...",
  //   repo:   null,
  //   status: "live",
  //   year:   "2025",
  //   client: "cliente retail"
  // },

  {
    title: "Análisis ICFES — Power BI Dashboard",
    desc: "Datos ICFES limpiados con Python y Pandas, con dashboards interactivos para analizar rendimiento por región, institución y área.",
    tags: ["Power BI", "Python · Pandas", "EDA"],
    glyph: "π",
    demo: null,
    repo: null,
    status: "demo",
    year: "2024",
    client: "cliente educativo"
  },

  {
    title: "Reconocimiento de Emociones en Perros — CNN",
    desc: "Clasifica la emoción de un perro —enojado, feliz, relajado o triste— directamente en el navegador. La CNN se entrenó en Python con 4 000 imágenes de Kaggle y corre en el cliente con TensorFlow.js. Antes de predecir, COCO-SSD filtra que la imagen realmente contenga un perro.",
    tags: ["Python · Keras", "TensorFlow.js", "CNN", "COCO-SSD"],
    glyph: "⬡",
    image: "DogEmotion.png",
    demo: "https://cesarespa.github.io/DogEmotion-CNN/",
    repo: "https://github.com/CesarEspa/DogEmotion-CNN",
    status: "live",
    year: "2025",
    client: null
  },

  {
    title: "Modelos de clasificación supervisada",
    desc: "Experimentos de ML con feature engineering, selección de variables y validación cruzada, parte de la Maestría en IA (Roma).",
    tags: ["scikit-learn", "Python", "ML supervisado"],
    glyph: "λ",
    demo: null,
    repo: null,
    status: "wip",
    year: "2025 →",
    client: "Maestría IA · Roma"
  },

];

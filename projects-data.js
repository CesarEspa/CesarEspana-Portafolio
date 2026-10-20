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
               Coloca el archivo en Analyst/Projects/ para páginas de Analyst,
               o en Develop/Projects/ para páginas de Dev.
               Si es null, se muestra el glyph como antes.
     embed   — URL para incrustar un iframe en la preview (Power BI, Figma, etc.).
               Tiene prioridad sobre image. Si es null, se usa image o glyph.
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
    title: "AgroConecta — plataforma SPA agro",
    desc: "SPA en equipo con Angular + Java Spring Boot para gestionar usuarios y servicios del sector agropecuario.",
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
    desc: "Backend en Node.js + Express con auth JWT, integrado a un panel admin para gestionar reservas.",
    tags: ["Node.js · Express", "MySQL", "REST API"],
    glyph: "/>",
    demo: null,
    repo: null,
    status: "live",
    year: "2024",
    client: "cliente servicios"
  },

  {
    title: "Sistema de inventario — .NET",
    desc: "App web en .NET + Entity Framework para controlar stock y generar alertas de inventario.",
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
    desc: "Datos de Saber Pro limpiados con Python y Pandas, llevados a un dashboard interactivo por región e institución.",
    tags: ["Power BI", "Python · Pandas", "EDA"],
    glyph: "π",
    image: "ICFES.png",
    embed: null,
    demo: "https://app.powerbi.com/view?r=eyJrIjoiNWFjYTRhMjAtOGNjOC00YjIxLTgxNjktYjY1YWMzMDRkODFmIiwidCI6IjY0ZWJjNzhlLTBhNWYtNDRlMS1hNTA0LTU3MTNlZmY2NGIzMyIsImMiOjR9",
    repo: null,
    status: "live",
    year: "2024",
    client: "cliente educativo"
  },

  {
    title: "Reconocimiento de Emociones en Perros — CNN",
    desc: "CNN entrenada con Kaggle que detecta la emoción de un perro en el navegador, con TensorFlow.js y COCO-SSD.",
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
    title: "Datos que Enseñan — Dashboard SGD",
    desc: "Tablero de 1 895 sedes del programa Computadores para Educar, con modelo DAX en Power BI y mapa en Leaflet.js.",
    tags: ["Power BI", "DAX", "MCP · Claude AI", "Leaflet.js"],
    glyph: "⌬",
    image: "DatosQueEnseñan.png",
    embed: null,
    demo: "https://app.powerbi.com/view?r=eyJrIjoiZjMxNzkzMjQtODEyMS00Mzk3LWFjOWUtM2IzMjAwMzlmYTIyIiwidCI6IjY0ZWJjNzhlLTBhNWYtNDRlMS1hNTA0LTU3MTNlZmY2NGIzMyIsImMiOjR9",
    repo: null,
    status: "live",
    year: "2026",
    client: "Computadores para Educar"
  },

  {
    title: "AI-XRay — Clasificador de Neumonía",
    desc: "CNN con ResNet50 que detecta neumonía en radiografías pediátricas, con tracking en MLflow y API en FastAPI.",
    tags: ["Python · Keras", "ResNet50", "MLflow", "FastAPI"],
    glyph: "✛",
    image: null,
    embed: null,
    demo: null,
    repo: "https://github.com/CesarEspa/Proyecto_DataScience_IA",
    status: "live",
    year: "2026",
    client: "Dev Senior Code"
  },

  {
    title: "TFM — Cáncer de Pulmón en Imágenes de TC",
    desc: "Trabajo de fin de máster: clasifica tomografías en Normal, Benigno o Maligno con CNN y transfer learning, con Grad-CAM y una app web propia.",
    tags: ["Python · TensorFlow", "EfficientNetB0", "Grad-CAM", "FastAPI"],
    glyph: "⊚",
    image: null,
    embed: null,
    demo: null,
    repo: "https://github.com/CesarEspa/Maestria",
    status: "live",
    year: "2026",
    client: "Università G. Marconi · Roma"
  },

];

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
    title:  "Plataformas web para PYMEs",
    desc:   "Apps full-stack con Java Spring Boot + Angular que automatizan inventario, reservas y facturación para clientes del sector servicios en Florencia, Caquetá.",
    tags:   ["Java · Spring Boot", "Angular", "MySQL"],
    glyph:  "{}",
    demo:   null,
    repo:   null,
    status: "live",
    year:   "2024–25",
    client: "+5 clientes"
  },

  {
    title:  "API REST — reservas y servicios",
    desc:   "Backend en Node.js + Express con autenticación JWT y endpoints documentados, integrado con panel admin web para gestión de reservas.",
    tags:   ["Node.js · Express", "MySQL", "REST API"],
    glyph:  "/>",
    demo:   null,
    repo:   null,
    status: "live",
    year:   "2024",
    client: "cliente servicios"
  },

  {
    title:  "Sistema de inventario — .NET + SQL Server",
    desc:   "Aplicación web con .NET para control de stock, generación de reportes y alertas de inventario. Arquitectura en capas con Entity Framework.",
    tags:   [".NET", "SQL Server", "Entity Framework"],
    glyph:  "[ ]",
    demo:   null,
    repo:   null,
    status: "wip",
    year:   "2025",
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
    title:  "Análisis ICFES — Power BI Dashboard",
    desc:   "Datos ICFES limpiados con Python y Pandas, con dashboards interactivos para analizar rendimiento por región, institución y área.",
    tags:   ["Power BI", "Python · Pandas", "EDA"],
    glyph:  "π",
    demo:   null,
    repo:   null,
    status: "demo",
    year:   "2024",
    client: "cliente educativo"
  },

  {
    title:  "Dashboards de ventas y operaciones",
    desc:   "Reportes automáticos en Power BI y Excel integrados con bases SQL — reduciendo el tiempo de generación de reportes en un 40%.",
    tags:   ["Power BI", "Excel avanzado", "SQL"],
    glyph:  "∑",
    demo:   null,
    repo:   null,
    status: "live",
    year:   "2024–25",
    client: "+5 clientes"
  },

  {
    title:  "Modelos de clasificación supervisada",
    desc:   "Experimentos de ML con feature engineering, selección de variables y validación cruzada, parte de la Maestría en IA (Roma).",
    tags:   ["scikit-learn", "Python", "ML supervisado"],
    glyph:  "λ",
    demo:   null,
    repo:   null,
    status: "wip",
    year:   "2025 →",
    client: "Maestría IA · Roma"
  },

];

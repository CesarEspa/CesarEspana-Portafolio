/* ============================================================
   PROJECTS DATA — Portafolio César España
   ─────────────────────────────────────────────────────────────
   Para agregar un proyecto, copia un bloque y pega al final
   del array correspondiente. El orden aquí = orden en pantalla.

   CAMPOS:
     title   — Nombre del proyecto
     desc    — Descripción breve (1–2 oraciones)
     tags    — Array de etiquetas de tecnología
     glyph   — Símbolo grande que se muestra si no hay imagen
     image   — Archivo de screenshot (ej: "DogEmotion.png").
               Va en Analyst/Projects/ o Develop/Projects/ según la página.
     demo    — URL del demo (null = no muestra botón)
     repo    — URL de GitHub (null = no muestra botón)
     status  — "live" | "wip" | "demo" | "private"
     year    — Año o rango: "2026" | "2025–26"
     client  — Contexto corto (null = nada)

   Regla: solo cifras confirmadas en los CV de César.
   ============================================================ */


// ═══════════════════════════════════════════════════════════════
//  PROYECTOS DEV — Full-Stack · Backend · IA aplicada
// ═══════════════════════════════════════════════════════════════
const DEV_PROJECTS = [

  {
    title: "CesarX Analytics — ETFs con LLM",
    desc: "Backend en Spring Boot 3 con JWT y migraciones Flyway, microservicio FastAPI que clasifica el sentimiento de noticias con Claude y un modelo de scikit-learn que predice la tendencia.",
    tags: ["Spring Boot 3 · JWT", "Angular", "PostgreSQL · Flyway", "FastAPI · Claude API"],
    glyph: "X",
    image: null,
    demo: null,   // la demo de GitHub Pages da 404 (nov 2026); poner la URL cuando vuelva a estar en línea
    repo: "https://github.com/CesarEspa/CesarX-Analytics",
    status: "live",
    year: "2026",
    client: "Proyecto personal"
  },

  {
    title: "PagoClaro — conciliación de pagos",
    desc: "Servicio de conciliación idempotente: si un registro llega dos veces, no se duplica. Reglas de negocio, manejo de errores y 15 pruebas, incluida concurrencia.",
    tags: ["Java · Spring Boot", "SQL · Oracle", "JUnit"],
    glyph: "$",
    image: null,
    demo: null,
    repo: "https://github.com/CesarEspa/Prueba-t-cnica---Desarrollador-de-Soporte-Java",
    status: "demo",
    year: "2026",
    client: "Prueba técnica"
  },

  {
    title: "Monitor de sismos en tiempo real",
    desc: "Ingesta cada 3 minutos desde la API del USGS, eventos por RabbitMQ y WebSocket, reporte horario con Airflow y monitoreo con Prometheus y Grafana. Todo en Docker Compose.",
    tags: ["Python · FastAPI", "MongoDB", "Airflow · RabbitMQ", "Docker"],
    glyph: "≈",
    image: null,
    demo: null,
    repo: "https://github.com/CesarEspa/PruebaTecnicaQuipux",
    status: "demo",
    year: "2026",
    client: "Prueba técnica"
  },

  {
    title: "AgroConecta — e-commerce",
    desc: "En equipo de 4: API REST por capas con roles (administrador y comprador), DTOs y manejo global de excepciones para catálogo, carrito, pedidos y panel admin.",
    tags: ["Angular", "Java · Spring Boot", "JPA / Hibernate", "PostgreSQL · JWT"],
    glyph: "{}",
    image: "AgroConecta.png",
    demo: "https://danielvega825.github.io/AgroConecta-t8-SPAs/#/",
    repo: "https://github.com/DanielVega825/AgroConecta-t8-SPAs",
    status: "live",
    year: "2025–26",
    client: "Generation Colombia"
  },

  {
    title: "AI-XRay — neumonía en radiografías",
    desc: "Transfer learning sobre ResNet50 con 5 experimentos en MLflow: F1 de 0,937 y AUC de 0,987 en test. Umbral clínico definido y modelo servido con FastAPI y pruebas.",
    tags: ["Python · Keras", "ResNet50", "MLflow", "FastAPI"],
    glyph: "✛",
    image: null,
    demo: null,
    repo: "https://github.com/CesarEspa/Proyecto_DataScience_IA",
    status: "live",
    year: "2026",
    client: "Master AI & Data Science"
  },

];


// ═══════════════════════════════════════════════════════════════
//  PROYECTOS ANALYST — Datos · IA · Dashboards
// ═══════════════════════════════════════════════════════════════
const ANALYST_PROJECTS = [

  {
    title: "Dashboard SGD — Computadores para Educar",
    desc: "Seguimiento de un programa nacional: 1.895 sedes en 33 departamentos y 34.110 sesiones, con modelo estrella y 53 medidas DAX. Claude conectado a Power BI vía MCP, con validación humana.",
    tags: ["Power BI · DAX", "Modelo estrella", "Python", "Claude · MCP"],
    glyph: "⌬",
    image: "DatosQueEnseñan.png",
    demo: "https://app.powerbi.com/view?r=eyJrIjoiZjMxNzkzMjQtODEyMS00Mzk3LWFjOWUtM2IzMjAwMzlmYTIyIiwidCI6IjY0ZWJjNzhlLTBhNWYtNDRlMS1hNTA0LTU3MTNlZmY2NGIzMyIsImMiOjR9",
    repo: null,
    status: "live",
    year: "2025–26",
    client: "Cliente freelance"
  },

  {
    title: "TFM — cáncer de pulmón con CNN",
    desc: "Ablación de 5 modelos frente a HOG + SVM sobre 1.097 tomografías. Reconstruí 83 grupos de paciente y demostré que partir por imagen infla la exactitud de 85,7% a 99,8%.",
    tags: ["TensorFlow / Keras", "EfficientNetB0", "Bootstrap · McNemar", "Grad-CAM"],
    glyph: "⊚",
    image: null,
    demo: null,
    repo: "https://github.com/CesarEspa/Maestria",
    status: "live",
    year: "2026",
    client: "Trabajo Fin de Máster"
  },

  {
    title: "Análisis ICFES Saber Pro",
    desc: "Limpieza y transformación de 1.22 millones de registros con Python y Pandas, y un dashboard en Power BI para comparar el rendimiento por región, institución y área.",
    tags: ["Python · Pandas", "Power BI", "EDA"],
    glyph: "π",
    image: "ICFES.png",
    demo: "https://app.powerbi.com/view?r=eyJrIjoiNWFjYTRhMjAtOGNjOC00YjIxLTgxNjktYjY1YWMzMDRkODFmIiwidCI6IjY0ZWJjNzhlLTBhNWYtNDRlMS1hNTA0LTU3MTNlZmY2NGIzMyIsImMiOjR9",
    repo: null,
    status: "live",
    year: "2026",
    client: "Cliente freelance"
  },

  {
    title: "AI-XRay — neumonía en radiografías",
    desc: "Transfer learning en dos fases sobre ResNet50; 5 experimentos en MLflow y un criterio fijado de antemano: F1 de 0,937 (IC95% 0,907 a 0,963) y AUC de 0,987.",
    tags: ["Python · Keras", "ResNet50", "MLflow · PySpark", "FastAPI"],
    glyph: "✛",
    image: null,
    demo: null,
    repo: "https://github.com/CesarEspa/Proyecto_DataScience_IA",
    status: "live",
    year: "2026",
    client: "Master AI & Data Science"
  },

  {
    title: "Emociones en perros — CNN",
    desc: "CNN entrenada con datos de Kaggle que detecta la emoción de un perro directamente en el navegador, con TensorFlow.js y COCO-SSD.",
    tags: ["Python · Keras", "TensorFlow.js", "CNN", "COCO-SSD"],
    glyph: "⬡",
    image: "DogEmotion.png",
    demo: "https://cesarespa.github.io/DogEmotion-CNN/",
    repo: "https://github.com/CesarEspa/DogEmotion-CNN",
    status: "live",
    year: "2025",
    client: null
  },

];

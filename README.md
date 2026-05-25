# Portafolio · César L. España S.

Portafolio personal con **dos perspectivas independientes**: desarrollador Full-Stack y Analista/Científico de Datos. Sin framework, sin build step — HTML, CSS y JS nativos, listo para GitHub Pages.

## Vistas

| Ruta | Perfil |
|---|---|
| `index.html` | Landing de selección de perspectiva |
| `dev.html` | Portafolio Full-Stack (Java · Spring Boot · Node.js · .NET) |
| `analyst.html` | Portafolio Data Analyst / Data Science / IA |

## Estructura

```
index.html          ← landing "elige tu perspectiva"
dev.html            ← portafolio dev full-stack
analyst.html        ← portafolio data & IA
style.css           ← estilos landing
app.js              ← lógica landing (canvas neural, animaciones)
projects-data.js    ← datos de proyectos (editar aquí para agregar proyectos)
dev/
  dev.css           ← estilos vista full-stack
  dev.js            ← lógica vista full-stack
analyst/
  analyst.css       ← estilos vista data & IA
  analyst.js        ← lógica vista data & IA
assets/
  cesar.jpg                ← foto de perfil
  Cesar-Espana-CV.pdf      ← CV descargable
  diplomas/                ← certificados y diplomas PDF
```

## Agregar un proyecto

Edita `projects-data.js`. Hay dos arrays:

- `DEV_PROJECTS` — aparece en `dev.html`
- `ANALYST_PROJECTS` — aparece en `analyst.html`

Copia cualquier bloque existente y ajusta los campos:

```js
{
  title:  "Nombre del proyecto",
  desc:   "Descripción breve (1–2 oraciones).",
  tags:   ["Tech 1", "Tech 2"],
  glyph:  "{}",          // {} / π / λ / ∑ / ◈ / />  / [ ]
  demo:   "https://...", // null = sin botón Demo
  repo:   "https://github.com/CesarEspa/...", // null = sin botón GitHub
  status: "live",        // "live" | "wip" | "demo" | "private"
  year:   "2025",
  client: "nombre cliente" // o null
}
```

## Stack de tecnologías

**Dev:** Java · Spring Boot · Angular · Node.js · Express · .NET · MySQL · SQL Server · REST · JWT

**Data:** Python · Pandas · scikit-learn · Power BI · SQL · Excel · EDA · ML supervisado

**Formación:** Maestría en IA (Roma) · DS4A Correlation One · Talento Tech Full-Stack · Oracle / Alura · Misión TIC

## Publicar en GitHub Pages

1. Ve a **Settings → Pages** del repositorio.
2. *Source*: `Deploy from a branch` → Branch: `main` / `/ (root)` → **Save**.
3. Tu sitio estará disponible en `https://CesarEspa.github.io/CesarEspana-Portafolio/` en ~1 minuto.

## Dominio personalizado (opcional)

1. En tu DNS añade un `CNAME` apuntando a `CesarEspa.github.io`.
2. En **Settings → Pages → Custom domain**, escribe el dominio y activa **Enforce HTTPS**.
3. Crea un archivo `CNAME` en la raíz con solo el dominio:
   ```
   cesarespana.dev
   ```

## Personalizar

- **Foto:** reemplaza `assets/cesar.jpg` (mantén el mismo nombre).
- **CV:** reemplaza `assets/Cesar-Espana-CV.pdf`.
- **Diplomas:** agrega PDFs en `assets/diplomas/` y referencia en el HTML correspondiente.
- **Estilos dev:** edita `dev/dev.css`.
- **Estilos data:** edita `analyst/analyst.css`.
- **Disponibilidad:** cambia el pill `Disponible` en cada `<header>` de los tres HTMLs.
- **Redes sociales:** busca `github.com/CesarEspa` y `linkedin.com` en los HTML para actualizar los enlaces del footer.

---

Tipografías: Geist · Geist Mono · Instrument Serif (Google Fonts). Sin dependencias locales.

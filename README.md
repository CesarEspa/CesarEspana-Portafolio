# Portafolio · César L. España S.

Landing personal en HTML estático. Listo para publicar en **GitHub Pages**.

## Publicar en GitHub Pages (5 minutos)

1. Crea un repo nuevo en GitHub: `tu-usuario.github.io` (para dominio `https://tu-usuario.github.io`)
   o cualquier nombre, ej. `portafolio` (será `https://tu-usuario.github.io/portafolio`).
2. Sube `index.html` y este `README.md` al `main` del repo:
   ```bash
   git init
   git add .
   git commit -m "feat: portafolio v1"
   git branch -M main
   git remote add origin git@github.com:TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. En GitHub → **Settings → Pages** → *Source*: `Deploy from a branch` → Branch: `main` / `/ (root)` → **Save**.
4. Espera ~1 min. Tu sitio estará en `https://TU_USUARIO.github.io/TU_REPO/`.

## Dominio personalizado (opcional)

1. Compra un dominio (ej. `cesarespana.dev`).
2. En tu DNS añade un `CNAME` apuntando a `TU_USUARIO.github.io`.
3. En **Settings → Pages → Custom domain**, escribe el dominio y activa **Enforce HTTPS**.
4. Crea un archivo `CNAME` en la raíz con el dominio dentro:
   ```
   cesarespana.dev
   ```

## Estructura

```
index.html
css/
  tokens.css       ← variables (cambia paleta aquí)
  base.css         ← reset + tipografía
  layout.css       ← nav, hero, footer
  components.css   ← botones, pills, widget IA
  sections.css    ← cada sección por separado
js/
  neural-net.js    ← canvas con neuronas + pulsos
  reveal.js        ← animaciones al scroll, contadores
  ai-assistant.js  ← widget "pregúntale al portafolio"
  main.js          ← punto de entrada
assets/
  cesar.jpg
  Cesar-Espana-CV.pdf
```

Sin build step. Tipografías Google: Geist, Geist Mono, Instrument Serif.

## Personalizar

- Edita los enlaces de **GitHub** y **LinkedIn** en el footer (`<a href="https://github.com/...">`).
- Reemplaza el correo `cesarespana.dev@gmail.com` si cambia.
- Las métricas (40 %, +5, 3) están en `<span data-count="…">` dentro de `#metrics`.
- El widget IA usa un proveedor del entorno; en GitHub Pages hace fallback al correo si no hay conexión.

— Construido con cariño, datos y un poco de IA.

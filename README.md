# Portafolio · César L. España S.

Portafolio personal con **dos perspectivas**: Analista / Científico de Datos con IA y Desarrollador Full-Stack con IA.
Sin framework ni build step: HTML, CSS y JS nativos, listo para GitHub Pages.

## Vistas

| Ruta | Perfil |
|---|---|
| `index.html` | Portada: elegir perspectiva |
| `Analyst/analyst.html` | Datos, BI, machine learning e IA |
| `Develop/dev.html` | Full-Stack (Java · Spring Boot · Angular · FastAPI) |

## Estructura

```
index.html
assets/
  theme.css        ← sistema visual compartido (colores, tipografías, secciones)
  theme.js         ← preloader de bandada, animaciones, proyectos, comparador, asistente IA
projects-data.js   ← proyectos de ambas vistas (se editan aquí)
Analyst/           ← analyst.html + Projects/ (capturas)
Develop/           ← dev.html + Projects/ (capturas)
Documentos/        ← CVs, foto y foto recortada (cesar-cutout.webp)
Diplomados/        ← PDFs de certificados
```

## Cómo editar

- **Proyectos:** agrega o cambia bloques en `projects-data.js`. La imagen va en `Analyst/Projects/` o `Develop/Projects/`.
- **Color de acento:** cambia `--accent` y `--accent-2` al inicio de `assets/theme.css`.
- **Animaciones:** el botón "Motion" del header las apaga; también se respetan las preferencias de movimiento reducido del sistema.

## Ver en local

```bash
python -m http.server 5510
```

Luego abre http://localhost:5510

# antoniavonstauffenberg

Personal website for Antonia von Stauffenberg — astrophysicist.

## Features

- **Sleek, modern design** with the *Pacifico* display font for headings
- **Light & dark mode** (respects system preference; toggle in the navbar)
- **Hot-pink headings/titles**; otherwise black & white palette
- **Parallax hero section** with scroll-header background image
- **About section** with portrait photo and research summary
- **CV page** with PDF upload / drag-and-drop viewer
- **Publications page** with filterable list (journal / preprint / proceedings)

## Pages

| File | URL | Description |
|------|-----|-------------|
| `index.html` | `/` | Main landing page |
| `cv.html` | `/cv.html` | CV — upload or auto-load a PDF |
| `publications.html` | `/publications.html` | Publications list |

## Customisation

1. **Images** — add your images to the `images/` directory (see [`images/README.md`](images/README.md)).
2. **Content** — edit the text directly in each HTML file (sections are clearly commented).
3. **CV** — either drag-and-drop a PDF on the CV page, or place your CV at `images/cv.pdf` for it to load automatically.
4. **Publications** — add/edit entries in `publications.html`; each `<div class="pub-item">` represents one paper.
5. **Contact email** — replace `your.email@institution.edu` in `index.html` with your actual address.

## File structure

```
/
├── index.html
├── cv.html
├── publications.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    ├── hero-bg.jpg        ← deep-sky hero image
    ├── research-bg.jpg    ← research banner image
    ├── portrait.jpg       ← your portrait
    └── cv.pdf             ← (optional) auto-loaded CV
```

## Running locally

Open any `.html` file directly in a browser, or serve the root directory with a simple HTTP server:

```bash
# Python 3
python -m http.server 8080
# then visit http://localhost:8080
```

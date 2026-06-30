# Hayley Witherell — Portfolio

A responsive React portfolio built with Vite and deployed to GitHub Pages at [hayw.dev](https://hayw.dev).

## Technology

- React
- Vite
- JavaScript and CSS
- Cypress (end-to-end tests)
- GitHub Actions and GitHub Pages

## Site structure

The page is a single scrolling portfolio with alternating light and dark sections:

1. **Hero** — gradient header with Embark CTA; sticky section nav appears after scrolling
2. **About** (`#intro`) — bio, portrait, and tech stack
3. **Professional & Community Impact** (`#impact`)
4. **Recommendations** (`#recommendations`) — quotes grouped by company
5. **Project Portfolio** (`#projects`) — games and web apps
6. **Public Recognition** (`#recognition`) — awards, panels, and media
7. **Footer** — contact and social links

## Project layout

```
src/
  components/     React section components
  data/           Content datasets (skills, impact, recommendations, projects, etc.)
  styles/         CSS layers imported via index.css (incl. content-groups.css)
public/
  images/         Portrait, favicon, social preview
  assets/         Static overlays and Font Awesome webfonts
cypress/
  e2e/            End-to-end specs grouped by concern
  fixtures/       contracts.js — shared expectations for content tests
```

Content lives in `src/data/` as separate files per dataset. Components import the file they need; `cypress/fixtures/contracts.js` mirrors the public content contracts used by tests.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Quality checks

```bash
npm run lint
npm run build
npm run test:e2e
```

The Cypress suite has **21 spec files** and **80 tests** covering:

| Area | What it checks |
|------|----------------|
| `01-smoke` | Preload timing, portrait loading, top-level render order |
| `02-content` | Section headings, skills, impact, recommendations, projects, recognition, metadata |
| `03-links` | External link security (`noopener`/`noreferrer`) and safe destinations |
| `04-accessibility` | axe WCAG A/AA, keyboard order, landmarks and semantics |
| `05-interactions` | Embark scroll, section navigation, button hover states |
| `06-responsive` | Desktop, tablet, and mobile layouts (320px–1280px) |
| `07-visual` | Section colors and reduced-motion preferences |
| `08-resilience` | Portrait failure and runtime error handling |

Use `npm run cypress:open` for interactive debugging while the Vite dev server is running.

Pushes to `main` trigger the GitHub Pages deployment workflow in `.github/workflows/deploy.yml`.

## Credits

The original visual design is based on Photon by [HTML5 UP](https://html5up.net), licensed under Creative Commons Attribution 3.0. See `LICENSE.txt`.

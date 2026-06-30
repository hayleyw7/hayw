# WARP.md

Guidance for WARP (warp.dev) when working in this repository.

## Project overview

Single-page React portfolio deployed to [hayw.dev](https://hayw.dev) via GitHub Pages. Visual design is based on the Photon template (HTML5 UP, CCA 3.0).

## Tech stack

- React + Vite
- Plain CSS (imported from `src/styles/index.css`)
- Cypress for end-to-end tests
- GitHub Actions for deploy

## Commands

```bash
npm install
npm run dev          # http://localhost:5173
npm run lint
npm run build
npm run test:e2e     # 21 specs, 80 tests
npm run cypress:open # interactive debugging
```

## Architecture

```
src/
  App.jsx              Section order and preload handling
  components/          One component per page section (incl. SectionNav)
  data/                Content datasets (one file per domain)
  styles/              Layered CSS; entry point is index.css
public/
  images/              Portrait, favicon, social preview
  assets/              Overlays and Font Awesome webfonts (woff2 only)
cypress/
  e2e/                 Specs grouped by concern (smoke, content, a11y, etc.)
  fixtures/contracts.js Shared content expectations for tests
```

### Section order (`App.jsx`)

1. `#header` — Hero / Embark
2. `#intro` — About + skills (`#profile`, `#skills`)
3. `#impact` — Professional & Community Impact (dark)
4. `#recommendations` — Quotes by company + LinkedIn button (light)
5. `#projects` — Project Portfolio (dark)
6. `#recognition` — Public Recognition (light)
7. `#footer` — Contact + social links

Alternating backgrounds: light → dark → light → dark → light.

### Content

- Edit copy in `src/data/*.js`, not inline in components.
- Keep `cypress/fixtures/contracts.js` in sync when public content changes.
- Shared card/grid patterns use the `.content-group` class; button styles live in `content-groups.css`.

### Key components

- `ExternalLink.jsx` — external anchors with `target="_blank"` and `rel="noopener noreferrer"`
- `RecognitionCard.jsx` — reused for project portfolio cards (title, description, button)
- `RecommendationCard.jsx` — quote + attribution only

## Testing expectations

When changing UI or content:

1. Run `npm run test:e2e` — all 78 tests should pass.
2. Update `contracts.js` if headings, links, or section content change.
3. Update `metadata.cy.js` if `index.html` meta tags change.
4. Update `keyboard.cy.js` if link order changes.
5. Update `security.cy.js` `_blank` link count if external links are added/removed.

## Accessibility

- axe WCAG A/AA checks in `04-accessibility/axe.cy.js`
- Keyboard tab order enforced in `keyboard.cy.js`
- Section landmarks and semantics in `semantics.cy.js`
- Light-section buttons need ID-scoped hover rules (`#recognition`, `#recommendations`) to beat default color specificity

## Common tasks

| Task | Where |
|------|-------|
| Change section copy | `src/data/` |
| Reorder sections | `App.jsx` |
| Section nav labels | `src/data/sectionNav.js` + `cypress/fixtures/contracts.js` |
| Section-specific styles | `page-sections.css`, `recommendations.css`, `content-groups.css` |
| Shared grid/card buttons | `content-groups.css` |
| Meta / OG tags | `index.html` + `metadata.cy.js` |
| Social links | `src/data/socialLinks.js` |

## Do not assume

- This is **not** a jQuery or single-file HTML site anymore.
- There is no Sass build step; edit CSS files under `src/styles/` directly.
- Do not change `public/images/preview.png` unless explicitly asked.

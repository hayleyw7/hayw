# Hayley Witherell — Portfolio

A responsive React portfolio built with Vite and deployed to GitHub Pages at [hayw.dev](https://hayw.dev).

## Technology

- React
- Vite
- JavaScript and CSS
- GitHub Actions and GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
npm run test:e2e
```

The Cypress suite is split into focused specs under `cypress/e2e`. It covers content
contracts, metadata, loading and failure states, external-link security, WCAG A/AA
checks, keyboard and scroll interaction, hover states, responsive layouts, colors,
reduced motion, and runtime error handling. Use `npm run cypress:open` for interactive
debugging while the Vite development server is running.

Pushes to `main` trigger the GitHub Pages deployment workflow in `.github/workflows/deploy.yml`.

## Credits

The original visual design is based on Photon by [HTML5 UP](https://html5up.net), licensed under Creative Commons Attribution 3.0. See `LICENSE.txt`.
